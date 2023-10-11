<template>
  <div>
    <PageHeader :title="'Turnover Report'" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          
          <div class="card-body">
            <b-alert show variant="info">
            <div direction="right">You will be able to see the data of last 7 days only.</div>
          </b-alert>
            <form method="post" 
            v-on:submit.prevent="loadReport('toReport')" 
            data-vv-scope="toReport"
            class="ajaxFormSubmit">
            <div class="row row5">
              <div class="col-md-4 col-xl-2">
                  <div class="form-group user-lock-search" style="position:relative">
                    <label for="d-inline-block">Search By Client Name</label>
                    
                    <multiselect
                      @search-change="searchUser"
                      v-model="params.username"
                      :searchable="true"
                      :internal-search="true"
                      :clear-on-select="true"
                      :close-on-select="true"
                      :select-label="''"
                      :deselect-label="''"
                      label="uname"
                      track-by="uguid"
                      :options="searchedUsers"
                    ></multiselect>

                   
                  </div>
                </div>
              <!-- <div class="col-md-4 col-xl-3">
                  <label>Select Date Range</label>
                  <date-picker
                    v-model="params.fromto"
                    format="DD/MM/YYYY"
                    type="date"
                    range
                    valueType="MM/DD/YYYY"
                    append-to-body
                    lang="en"
                    class="mb-3"
                    :disabled-date="disabledDates"
                  ></date-picker>
              </div> -->
               <div class="col-2">
                  <label>From Date:</label>
                  <DatePicker
                    v-model="params.fdt"
                    :disabled-date="disabledfDt"
                    lang="en"
                    type="date"
                    :clearable="false"
                    :editable="false"
                    @change="updateToDate"
                    valueType="MM/DD/YYYY"
                    format="DD/MM/YYYY"
                  />
                </div>
                <div class="col-2" v-if="params.fdt">
                  <label>To Date:</label>
                  <DatePicker
                    v-model="params.tdt"
                    :disabled-date="disabledtDt"
                    lang="en"
                    type="date"
                    :clearable="false"
                    :editable="false"
                    valueType="MM/DD/YYYY"
                    format="DD/MM/YYYY"
                  />
                </div>
              <div class="col-md-4 col-xl-2">
                <div class="form-group">
                    <label>Type</label>
                    <select class="form-control" name="type" v-validate="'required'" v-model.number="params.type" :class="{ 'is-invalid' : verrors.first('toReport.type')}" @change="onChangeType()">
                        <option value="">Select Type</option>
                        <option value="1">Sports</option>
                        <option value="2">Casino</option>
                    </select>
                </div>
              </div>
              
              <template v-if="params.type == '1'">
              <div class="col-md-4 col-xl-2" >
                <div class="form-group">
                    <label>Sports List</label>
                    <select class="form-control" name="etid" v-validate="'required'"  v-model.number="params.etid"  :class="{ 'is-invalid' : verrors.first('toReport.etid')}">
                        <option value="">Select Sports List</option>
                        <template v-for="(data, key) in sportList">
                          <option :value="data.eid" >{{ data.ename}}</option>
                        </template>
                    </select>
                </div>
              </div>
              <div class="col-md-4 col-xl-2">
                <div class="form-group">
                    <label>Game Type</label>
                    <select class="form-control" v-model="params.gtype" > 
                        <option value="">Select Game Type</option>
                         <template v-for="(data, key) in gameTypeList">
                          <option :value="data.gtype" >{{ data.gtypename}}</option>
                        </template>
                    </select>
                </div>
              </div>
              </template>
              <template v-if="params.type == '2'">
              <div class="col-md-4 col-xl-2" >
                <div class="form-group">
                    <label>Casino List</label>
                    <select class="form-control" v-model="params.gtype" >
                        <option value="">Select Casino</option>
                         <template v-for="(data, key) in casinoList">
                          <option :value="data.gtype" >{{ data.casino}}</option>
                        </template>
                    </select>
                </div>
              </div>
              </template>
              
            </div>
            <div class="row row5">
              
              <div class="col-md-12 col-xl-3">
                <!-- <label style="width: 100%" class="d-none d-md-inline-block">&nbsp;</label> -->
                <button type="submit" class="btn btn-primary" id="loaddata">Load</button>
                <button type="button" class="btn btn-light" id="reset" @click="resetReportForm()">Reset</button>
                <div class="d-inline-block ml-1">                  
                  <downloadexcel
                    :class="{'disabled':reportData.length == 0}"
                    :fetch="fetchExcelData"
                    :fields="listColumns"
                    type="csv"
                    :name="'turnoverreport.xls'"
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
            <div class="table-responsive mb-0 mt-3">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th class="text-right">Loss Turn Over</th>
                    <th class="text-right">Loss</th>
                    <th class="text-right">Win Turn Over</th>
                    <th class="text-right">Win</th>
                    <th class="text-right">Total Turn Over</th>
                    <th class="text-right">Total P/L</th>
                  </tr>
                </thead>
                <tbody v-if="reportData && reportData.length > 0">
                  <tr>
                    <td class="text-right">
                      {{ reportData[0].tamt }}
                    </td>
                    <td class="text-right">
                      {{ reportData[0].ltamt }}
                    </td>
                    <td class="text-right">
                      {{ reportData[0].tamt1 }}
                    </td>
                    <td class="text-right">
                      {{ reportData[0].ltamt1 }}
                    </td>
                    <td class="text-right">
                      {{ reportData[0].ttotal }}
                    </td>
                    <td class="text-right">
                      {{ reportData[0].pl }}
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="6" class="text-center">
                      There are no records to show
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- <div class="row">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select v-model="perPage" :options="pageOptions" size="sm"></b-form-select>&nbsp;entries
                  </label>
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                  <label class="d-inline-flex align-items-center">
                    Search:
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Search..."
                      class="form-control form-control-sm ml-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
            </div> -->

            <!-- Table -->
            
            <!-- <div class="table-responsive mb-0">
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
                <template v-slot:cell(ltamt)="data">
                  <div class="text-right" v-currency="data.item.ltamt"></div>
                </template>
                <template v-slot:cell(tamt)="data">
                  <div class="text-right" v-currency="data.item.tamt"></div>
                </template>
              </b-table>
            </div> -->
            <!-- <div class="row pt-3">
              <div class="col">
                <div class="dataTables_paginate paging_simple_numbers float-right">
                  <ul class="pagination pagination-rounded mb-0">
                    
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
            </div> -->
          </div>
        </div>
      </div>
    </div>
   
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
import Multiselect from "vue-multiselect";


export default {
  components: {
    PageHeader,
    downloadexcel,
    DatePicker,
    Multiselect
   
  },
  mounted() {
    this.updateStartDate();
    this.getCasinoList();
    this.getSportList();
    this.getGameTypeList();
     
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
          text: "Turnover Report",
          active: true,
        },
      ],
      params: {
        username: null,
        type:'',
        gtype:'',
        etid: '',
        fdt: moment(new Date())
          .tz("Asia/Calcutta")
          .subtract(1, "week")
          .format("MM/DD/YYYY"),
        tdt: moment(new Date()).tz("Asia/Calcutta").format("MM/DD/YYYY"),
        fromto: [moment().tz(DEFAULT_TIMEZONE).subtract(1, 'week').format("MM/DD/YYYY"), moment().tz(DEFAULT_TIMEZONE).format("MM/DD/YYYY")],
      },
      searchedUsers: [],
      
      listColumns: {
        "Loss Turn Over": "tamt",
        "Loss": "ltamt",
        "Win Turn Over": "tamt1",
        "Win": "ltamt1",
        "Total Turn Over": "ttotal",
        "Total P/L": "pl",
      },
      pdfColumn: [
        { title: "Loss Turn Over", dataKey: "tamt" },
        { title: "Loss", dataKey: "ltamt" },
        { title: "Win Turn Over", dataKey: "tamt1" },
        { title: "Win", dataKey: "ltamt1" },
        { title: "Total Turn Over", dataKey: "ttotal" },
        { title: "Total P/L", dataKey: "pl" }    
      ],
      currentPage: 1,
      filter: null,
      perPage: 25,
      totalLength: 0,
      totalRows: 0,
      pageOptions: [25, 50, 75, 100, 125, 150],
      
      gameDetail: [],
      gameSoda: [],
      casinoList:[],
      sportList: [],
      gameTypeList: [],
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
        doc.text("Turnover Report", 380, 25);
        doc.autoTable(self.pdfColumn, self.reportData);
        doc.save("turnoverreport.pdf");
      }
    },
    updateStartDate() {
      const lstdate = new Date(
        moment(this.params.tdt).startOf("month").format("YYYY/MM/DD")
      );
      var nedate = new Date(
        moment(this.params.tdt).subtract(1, "week").format("YYYY/MM/DD")
      );
      if (nedate < lstdate) {
        this.params.fdt = moment(lstdate).format("MM/DD/YYYY");
      } else {
        this.params.fdt = moment(nedate).format("MM/DD/YYYY");
      }
    },
    updateToDate() {
      const today = new Date(moment().tz("Asia/Calcutta").format("YYYY/MM/DD"));
      const lstdate = new Date(
        moment(this.params.fdt).endOf("month").format("YYYY/MM/DD")
      );
      var nedate = new Date(
        moment(this.params.fdt).add(1, "week").format("YYYY/MM/DD")
      );
      if (nedate > lstdate) {
        this.params.tdt = moment(lstdate).format("MM/DD/YYYY");
      } else if(nedate > today){
         this.params.tdt = moment(today).format("MM/DD/YYYY");
      } else {
        this.params.tdt = moment(nedate).format("MM/DD/YYYY");
      }
    },
    disabledfDt(date) {
      const today = new Date(moment().tz("Asia/Calcutta").format("YYYY/MM/DD"));
      return date > today;
    },
    disabledtDt(date) {
      const today = new Date(moment().tz("Asia/Calcutta").format("YYYY/MM/DD"));
      const fdt = new Date(this.params.fdt)
      const lstdate = new Date(
        moment(this.params.fdt).endOf("month").format("MM/DD/YYYY")
      );
      var nedate = new Date(
        moment(this.params.fdt).add(1, 'week').format("MM/DD/YYYY")
      );
      if (nedate > lstdate) {
        return date > lstdate || date < fdt;
      } else if(nedate > today){
        return date > today || date < fdt;
      }else {
        return date > nedate || date < fdt;
      }
    },
    onChangeType(){
      this.params.gtype = ""
      this.params.etid = ""
      this.$validator.reset();
    },
    getCasinoList(){
      ServiceApi.callApi("acccasinolist", {})
        .then(response => {
            if (response.status == 200) {
                this.casinoList = response.data.t1;
            }
        })
        .catch(e => {
            this.casinoList = []
        });
    },
    getSportList(){
      ServiceApi.callApi("sportlist", {})
        .then(response => {
            if (response.status == 200) {
                this.sportList = response.data.t1;
            }
        })
        .catch(e => {
            this.sportList = []
        });
    },
    getGameTypeList(){
      ServiceApi.callApi("gametypelist", {})
        .then(response => {
            if (response.status == 200) {
                this.gameTypeList = response.data.t1;
            }
        })
        .catch(e => {
            this.gameTypeList = []
        });
    },
    resetReportForm(){
      this.params = {
        type:'',
        gtype:'',
        etid: '',
        fdt: moment(new Date())
          .tz("Asia/Calcutta")
          .subtract(1, "week")
          .format("MM/DD/YYYY"),
        tdt: moment(new Date()).tz("Asia/Calcutta").format("MM/DD/YYYY"),
        fromto: [moment().tz(DEFAULT_TIMEZONE).subtract(1, 'week').format("MM/DD/YYYY"), moment().tz(DEFAULT_TIMEZONE).format("MM/DD/YYYY")],
      }
      this.reportData = []
      this.currentPage = 1;
      this.totalRows = 0;
      this.$validator.reset();
      this.updateStartDate();
    },
    disabledDt(date) {
      const today = new Date(moment().format("YYYY/MM/DD"));
      today.setHours(0, 0, 0, 0);
      return date > today;
    },
    
    loadReport(scope) {
      this.$validator.validateAll(scope).then((valid) => {
        if (valid) {
          this.$store.state.isLoading = true;
          /*if(this.params.fromto != null && this.params.fromto.length > 0){
            this.params.fdt = this.params.fromto[0]
            this.params.tdt = this.params.fromto[1]
          }else{
            this.params.fdt = ''
            this.params.tdt = ''
          }*/
          if(this.params.type == 2){
            this.params.etid = 0
          }
          let params = {
            uid: this.params.username != null ? this.params.username.uguid : "",
            etid: this.params.etid,
            fdt: this.params.fdt,
            gtype: this.params.gtype,
            tdt: this.params.tdt,
            type: this.params.type  
          }
          ServiceApi.callApi("report/turnover", params)
          .then((response) => {
            this.$store.state.isLoading = false;
            if (response.status == 200) {

              this.reportData = [];
              this.reportData.push({
                tamt: this.$helpers.toCurrency(response.data.t1[0].tamt),
                ltamt: this.$helpers.toCurrency(response.data.t1[0].ltamt),
                tamt1: this.$helpers.toCurrency(response.data.t2[0].tamt),
                ltamt1: this.$helpers.toCurrency(response.data.t2[0].ltamt),
                ttotal: this.$helpers.toCurrency(response.data.t1[0].tamt + response.data.t2[0].tamt),
                pl: this.$helpers.toCurrency(response.data.t1[0].ltamt + response.data.t2[0].ltamt),
                
              });
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
    disabledDates(date) {
      const today = new Date(moment().tz(DEFAULT_TIMEZONE).format("YYYY/MM/DD"));
      
      return date > today
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
    searchUser(query) {
      if (query.length > 2 && this.searchedUsers.length == 0) {
        ServiceApi.callApi("searchalluser", {
          uname: query,
        })
          .then((response) => {
            if (response.success) {
              this.searchedUsers = response.data.t1;
            } else {
              this.searchedUsers = [];
            }
          })
          .catch((e) => {
            this.searchedUsers = [];
          });
      }
      if (query.length < 3) {
        this.searchedUsers = [];
      }
    },
  },
};
</script>
