<template>
  <div>
    <PageHeader :title="'Our Casino Result'" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <form method="post" 
            v-on:submit.prevent="loadReport()" 
            data-vv-scope="casinoResult"
            class="ajaxFormSubmit">
            <div class="row row5 mb-3">
              <div class="col-md-3 mb-2">
                 <DatePicker v-model="params.dt" :disabled-date="disabledDt" lang="en"
                    value-type="MM/DD/YYYY" format="DD/MM/YYYY" />
              </div>
              <div class="col-md-3 mb-2">
                 <select class="form-control" name="gtype" v-validate="'required'" v-model="params.gtype" :class="{ 'is-invalid' : verrors.first('casinoResult.gtype')}">
                   <option value="">Select Casino</option>
                   <option :value="value.gtype.toLowerCase()" v-for="(value, key) in casinoList">{{ value.cname }}</option>
                 </select>
              </div>
              <div class="col-md-6 mb-2">
                <button type="submit" class="btn btn-primary" id="loaddata">Load</button>
                <button type="button" class="btn btn-light" id="reset" @click="resetReportForm()">Reset</button>
                <div class="d-inline-block ml-3">                  
                  <downloadexcel
                    :class="{'disabled':reportData.length == 0}"
                    :fetch="fetchExcelData"
                    :fields="listColumns"
                    type="csv"
                    :name="'casinoresults.xls'"
                    class="d-inline-block"
                  >
                    <b-button class="mr-1" variant="success" type="button" :disabled="reportData.length == 0">
                      <i class="fas fa-file-excel"></i>
                    </b-button>
                  </downloadexcel>
                  <b-button
                    variant="danger"
                    @click="exportPdf"
                    type="button"
                    :disabled="reportData.length == 0"
                  >
                    <i class="fas fa-file-pdf"></i>
                  </b-button>
                </div>
              </div>
            </div>
            </form>
            <div class="row">
              <div class="col-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select v-model="perPage" :options="pageOptions" size="sm"></b-form-select>&nbsp;entries
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-6 text-right">
                <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                  <label class="d-inline-flex align-items-center">
                  
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Search..."
                      class="form-control form-control-sm ml-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0">
              <b-table
                show-empty
                bordered
                fixed
                responsive="sm"
                id="eventsListTbl"
                class="table no-footer table-hover"
                :fields="reportFields"
                :items="reportData"
                :filter="filter"
                @filtered="onFiltered"
                :current-page="currentPage"
                :per-page="perPage"
              >
                <template v-slot:cell(mid)="data">
                  <a href="javascript:void(0)" @click="showResult(data.item.mid)" class="link-default">{{ data.item.mid }}</a>
                </template>
               
              </b-table>
            </div>
            <div class="row pt-3">
              <div class="col">
                <div class="dataTables_paginate paging_simple_numbers float-right">
                  <ul class="pagination pagination-rounded mb-0">
                    <!-- pagination -->
                    <b-pagination
                      align="right"
                      :total-rows="totalRows"
                      :per-page="perPage"
                      v-model="currentPage"
                      class="dataTables_paginate paging_simple_numbers my-0"
                    />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal ref="detail-modal" hide-footer size="xl" :title="detailTitle+' Result'">
        <!-- CASINO -->
        <CasinoResult :resultData="gameDetail" />
        <AccountStatementSoda :gameSoda="gameSoda" :isDtypeSS="gameDetail.gType == 'cricketv' || gameDetail.gType == 'cricketv2' || gameDetail.gType == 'cricketv3'? true : false" :desc="gameDetail.rdesc"/>
    </b-modal>
  </div>
</template>

<script>
import ServiceApi from "@/services/ServiceApi";
import PageHeader from "@/components/page-header";
import DatePicker from 'vue2-datepicker'
import downloadexcel from "vue-json-excel";
import moment from "moment-timezone";
import jsPDF from "jspdf";
import "jspdf-autotable";
import CasinoResult from '@/components/casino/results/CasinoResults'
import AccountStatementSoda from '@/components/AccountStatementSoda'

export default {
  components: {
    PageHeader,
    downloadexcel,
    DatePicker,
    CasinoResult,
    AccountStatementSoda
  },
  mounted() {
    this.params.gtype = (this.$route.params.gtype ? this.$route.params.gtype: '') 
    this.getCasinoList();
    if(this.params.gtype != ""){
      this.loadReport();
    }
  },
  data() {
    return {
      reportData: [],
      items: [
        {
          text: "Home",
          to: { name: "home" },
        },
        {
          text: "Our Casino Result",
          active: true,
        },
      ],
      params: {
          dt: moment().tz(DEFAULT_TIMEZONE).format("MM/DD/YYYY"),
          gtype: '',
      },
      reportFields: [
        {
          key: "mid",
          label: "Market Id",
          sortable: true,
        },
        {
          key: "winnat",
          label: "Winner",
          sortable: true,
        }
      ],
      listColumns: {
        "Market Id": "mid",
        "Winner": "winnat"
      },
      pdfColumn: [
        { title: "Market Id", dataKey: "mid" },
        { title: "Winner", dataKey: "winnat" }
      ],
      currentPage: 1,
      filter: null,
      perPage: 25,
      totalLength: 0,
      totalRows: 0,
      pageOptions: [25, 50, 75, 100, 125, 150],
      casinoList: [],
      gameDetail: [],
      gameSoda: [],
      detailTitle: ""
    };
  },
  watch: {
  },
  computed: {
  },
  methods: {
    async fetchExcelData() {
      const response = _.cloneDeep(this.reportData); 
      return response;
    },
    exportPdf() {
      var self = this;
      if (self.reportData.length !== 0) {
        var doc = new jsPDF("l", "pt");
        doc.text("Casino Result Report", 380, 25);
        doc.autoTable(self.pdfColumn, self.reportData);
        doc.save("casinoresults.pdf");
      }
    },
    resetReportForm(){
      this.params ={
          dt: moment().tz(DEFAULT_TIMEZONE).format("MM/DD/YYYY"),
          gtype: ''
      }
      this.reportData = []
      this.currentPage = 1;
      this.totalRows = 0;
    },
    disabledDt(date) {
      const today = new Date(moment().tz(DEFAULT_TIMEZONE).format("YYYY/MM/DD"));
      today.setHours(0, 0, 0, 0);
      return date > today;
    },
    getCasinoList() {
      ServiceApi.callApi("report/casino", {})
        .then((response) => {
          if (response.status == 200) {
            this.casinoList = response.data;
          } else {
            this.casinoList = [];
          }
        })
        .catch((e) => {
          this.casinoList = [];
        });
    },
    loadReport() {
      this.$validator.validateAll("casinoResult").then((valid) => {
        if (valid) {
          this.$store.state.isLoading = true;
          ServiceApi.callApi("report/casinoresult", this.params)
          .then((response) => {
            this.$store.state.isLoading = false;
            if (response.status == 200) {
              this.reportData = response.data;
              this.totalRows = this.reportData.length;
            } else {
              this.reportData = [];
              this.totalRows = 0;
            }
          })
          .catch((e) => {
            this.$store.state.isLoading = false;
            this.reportData = [];
            this.totalRows = 0;
          });
        }
      });
    },
    hideModal(ref) {
      this.$refs[ref].hide();
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    showResult(mid) {
      this.$store.state.isLoading = true
      ServiceApi.callApi("accstatepopup", {
          'gmid': 0,
          'mid': mid,
          'gtype': this.params.gtype,
          'dtype': 'cs'
      })
      .then(response => {
          if (response.status == 200) {
              this.gameDetail = _.get(response.data, 't1') ? _.get(response.data, 't1') : {}
              Vue.set(this.gameDetail, 'gType', this.params.gtype.toLowerCase())
              Vue.set(this.gameDetail, 'dType', 'cs')
              this.detailTitle = this.gameDetail.ename ? this.gameDetail.ename : ""
              this.gameSoda = _.get(response.data, 't2')

              this.$refs['detail-modal'].show()
              
          } else {
              this.gameDetail = {}
              this.gameSoda = []
              
          }
          this.$store.state.isLoading = false
      })
      .catch(e => {
          this.gameDetail = {}
          this.gameSoda = []
          this.$store.state.isLoading = false
      });
    },
  },
};
</script>
