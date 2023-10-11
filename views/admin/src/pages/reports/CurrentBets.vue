<template>
  <div>
    <PageHeader :title="'Current Bets'" :items="items" />
    <div class="casino-report-tabs">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link" :class="{'active': gtype == 1}" data-toggle="tab"
                    @click="changeReportType(1)" href="javascript:void(0)">Sports</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" :class="{'active': gtype == 2}" data-toggle="tab"
                    @click="changeReportType(2)" href="javascript:void(0)">Casino</a>
            </li>
        </ul>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="report-form mb-3 row align-items-center">
              <div class="col-md-4 col-lg-3">
                <template v-if="gtype == 1">
                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    class="custom-control-input"
                    id="customRadio"
                    name="example"
                    value="matchbet"
                    @change="loadReport($event)"
                    checked
                  />
                  <label class="custom-control-label" for="customRadio">Matched</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    class="custom-control-input"
                    id="customRadio2"
                    name="example"
                    value="deletebet"
                    @change="loadReport($event)"
                  />
                  <label class="custom-control-label" for="customRadio2">Deleted</label>
                </div>
                </template>
              </div>
              <div class="col-md-8  col-lg-4">
                <div class="custom-control custom-radio custom-control-inline pl-0">
                  <div class="custom-control custom-radio custom-control-inline">
                      <input type="radio" class="custom-control-input" id="soda-all" name="bettype" value="all"
                          @change="changeType($event)" checked>
                      <label class="custom-control-label" for="soda-all">All</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                      <input type="radio" class="custom-control-input" id="soda-back" name="bettype" value="back"
                          @change="changeType($event)">
                      <label class="custom-control-label" for="soda-back">Back</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                      <input type="radio" class="custom-control-input" id="soda-lay" name="bettype" value="lay"
                          @change="changeType($event)">
                      <label class="custom-control-label" for="soda-lay">Lay</label>
                  </div>
              </div>
                <div class="custom-control-inline">
                  <b-button
                    variant="primary"
                    @click="loadReport(radioEvent)"
                    type="button"
                    title="Refresh Data" 
                    class="mr-2"
                  >
                    <!-- <i class="fas fa-redo"></i> -->Load
                  </b-button>
                  <downloadexcel
                    :class="{'disabled':reportData.length == 0}"
                    :fetch="fetchExcelData"
                    :fields="listColumns"
                    type="csv"
                    :name="'Current bet.xls'"
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
              <div class="col-md-12 col-lg-5 text-right">
                <div class="custom-control-inlinemr-0 mt-1">
                    <h5>Total Soda: <span class="mr-2">{{ sodaTotal }}</span> Total Amount: <span v-currency="winTotal"></span></h5>
                </div>
              </div>
            </div>

            <div class="row w-100">
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
                
                responsive="sm"
                id="eventsListTbl"
                class="table no-footer"
                :fields="reportFields"
                :items="reportDataFiltered"
                :filter="filter"
                @filtered="onFiltered"
                :current-page="currentPage"
                :per-page="perPage"
                :tbody-tr-class="reportRowClass"
              >
                <template v-slot:table-colgroup="scope">
                  <col
                    v-for="field in scope.fields"
                    :key="field.key"
                    :style="{ width: field.key === 'ename' ? '200px' : 'auto' }"
                  />
                </template>
                <template v-slot:cell(urate)="data">
                  <p class="text-right mb-0">{{data.item.urate}}</p>
                </template>
                <template v-slot:cell(sname)="data">
                  <p class="mb-0" v-if="gtype == 1 && (data.item.gtype.toLowerCase() == 'fancy' || data.item.gtype.toLowerCase() == 'khado')">{{ data.item.sname + ' / ' + data.item.bhav}}</p>
                  <p class="mb-0" v-else>{{ data.item.sname}}</p>
                  
                </template>

                <template v-slot:cell(amt)="data">
                  <p class="text-right mb-0" v-currency="data.item.amt"></p>
                </template>

                
                <template v-slot:cell(ip)="data">
                  <p class="mb-0 pointer" @click="checkIP(data.item.ip)">{{ data.item.ip }}</p>
                </template>

                <template v-slot:cell(pdt)="data">
                  <div v-formatDatetime="{date: data.item.pdt}"></div>

                </template>

                <template v-slot:cell(bdetail)="data">
                 <!--  <a
                    href="javascript:void(0)"
                    data-toggle="tooltip"
                    data-placement="top"
                    :title="data.item.bdetail"
                    class="text-success"
                    :data-original-title="data.item.bdetail"
                  >Detail</a> -->
                  <a class="text-success" href="javascript:void(0)" v-b-tooltip="data.item.bdetail">Detail</a>
                </template>
                <template v-slot:cell(action)="data">
                  <b-form-checkbox :value="data.item" v-model="selectedSoda"></b-form-checkbox>
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
    <b-modal ref="ipdetail" size="sm" header-bg-variant="success" hide-footer class>
      <template slot="modal-header" class>
        <h5 class="modal-title text-uppercase text-white">Ip Detail</h5>
        <button
          type="button"
          class="close text-white"
          data-dismiss="modal"
          @click="hideModal('ipdetail')"
        >&times;</button>
      </template>
      <b-table-simple hover small caption-top responsive>
        <b-thead head-variant="dark">
          <b-tr>
            <b-th>Key</b-th>
            <b-th>Value</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <!-- <b-tr v-bind:key="index" v-for="(value, propertyName, index) in ipdetail">
            <b-th>{{propertyName}}</b-th>
            <b-th>{{value}}</b-th>
          </b-tr> -->
          <b-tr>
            <b-td><b>IP:</b></b-td>
            <b-td>{{ipdetail.query}}</b-td>
          </b-tr>
          <b-tr>
            <b-td><b>City:</b></b-td>
            <b-td>{{ipdetail.city}}</b-td>
          </b-tr>
          <b-tr>
            <b-td><b>Country:</b></b-td>
            <b-td>{{ipdetail.country}}</b-td>
          </b-tr>
          <b-tr>
            <b-td><b>Mobile:</b></b-td>
            <b-td>{{ipdetail.mobile}}</b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-modal>
  </div>
</template>

<script>
import ServiceApi from "@/services/ServiceApi";
import PageHeader from "@/components/page-header";
import downloadexcel from "vue-json-excel";
import moment from "moment-timezone";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  components: {
    PageHeader,
    downloadexcel,
  },
  mounted() {
   // this.loadReport("");
  },
  data() {
    return {
      reportData: [],
      gtype: 1,
      items: [
        {
          text: "Home",
          to: { name: "home" },
        },
        {
          text: "Current Bets",
          active: true,
        },
      ],
      reportFields: [
        {
          key: "etype",
          label: "Event Type",
          sortable: true,
        },
        {
          key: "ename",
          label: "Event Name",
          sortable: true,
        },
        {
          key: "uname",
          label: "User Name",
          sortable: true,
        },
        {
          key: "mname",
          label: "M Name",
          sortable: true,
        },
        {
          key: "sname",
          label: "Nation",
          sortable: true,
        },
        {
          key: "urate",
          label: "U Rate",
          sortable: true,
          thClass: "text-right",
        },
        {
          key: "amt",
          label: "Amount",
          sortable: true,
          thClass: "text-right",
        },
        {
          key: "pdt",
          label: "Place Date",
          sortable: true,
        },
        {
          key: "ip",
          label: "IP",
          sortable: true,
        },
        {
          key: "bdetail",
          label: "Browser",
        },
        {
          key: "action",
          label: "Action",
        },
      ],
      listColumns: {
        "Event Type": "etype",
        "Event Name": "ename",
        "User Name": "uname",
        "M Name": "mname",
        "Nation": "sname",
        "User Rate": "urate",
        "Amount": "amt",
        "Place Date": "pdt",
        "IP": "ip",
        "Browser": "bdetail",
      },
      pdfColumn: [
        { title: "Event Type", dataKey: "etype" },
        { title: "Event Name", dataKey: "ename" },
        { title: "User Name", dataKey: "uname" },
        { title: "M Name", dataKey: "mname" },
        { title: "Nation", dataKey: "sname" },
        { title: "User Rate", dataKey: "urate" },
        { title: "Amount", dataKey: "amt" },
        { title: "Place Date", dataKey: "pdt" },
        { title: "IP", dataKey: "ip" },
        { title: "Browser", dataKey: "bdetail" },
      ],
      ipdetail: {},
      currentPage: 1,
      filter: null,
      oldFilter: null,
      perPage: 25,
      totalLength: 0,
      totalRows: 0,
      pageOptions: [25, 50, 75, 100, 125, 150],
      betType: 'all',
      winTotal: 0,
      sodaTotal:0,
      selectedSoda: [],
      radioEvent:""
    };
  },
  watch: {
    selectedSoda() {
        let self = this;
        if(this.selectedSoda.length > 0){
            this.winTotal = 0;
            this.sodaTotal = 0;
            _.forEach(this.selectedSoda, (o,key) => {
               // if(self.selectedSoda.includes(key)){
                    this.winTotal +=  o.amt;
                    this.sodaTotal++;
                //}
            });
        }else{
            this.calculateTotalWin();
        }
    }
  },
  computed: {
      reportDataFiltered(){
          if(this.betType == 'all')
              return this.reportData;
          else if(this.betType == 'back')
              return _.filter(this.reportData, { 'btype': 'back' });
          else if(this.betType == 'lay')
              return _.filter(this.reportData, { 'btype': 'lay' });
          else
              return []
      }
  },
  methods: {
    getReportFields(){
      this.reportFields = [
        (this.gtype == 1 ? {
          key: "etype",
          label: "Event Type",
          sortable: true,
        } : null),
        {
          key: "ename",
          label: "Event Name",
          sortable: true,
        },
        {
          key: "uname",
          label: "User Name",
          sortable: true,
        },
        (this.gtype == 1 ? {
          key: "mname",
          label: "M Name",
          sortable: true,
        } : null),
        {
          key: "sname",
          label: "Nation",
          sortable: true,
        },
        {
          key: "urate",
          label: "U Rate",
          sortable: true,
          thClass: "text-right",
        },
        {
          key: "amt",
          label: "Amount",
          sortable: true,
          thClass: "text-right",
        },
        {
          key: "pdt",
          label: "Place Date",
          sortable: true,
        },
        {
          key: "ip",
          label: "IP",
          sortable: true,
        },
        {
          key: "bdetail",
          label: "Browser",
        },
        {
          key: "action",
          label: "Action",
        },
      ];

      if(this.gtype == 1){
        this.listColumns =  {
          "Event Type": "etype",
          "Event Name": "ename",
          "User Name": "uname",
          "M Name": "mname",
          "Nation": "sname",
          "User Rate": "urate",
          "Amount": "amt",
          "Place Date": "pdt",
          "IP": "ip",
          "Browser": "bdetail",
        }
        this.pdfColumn = [
          { title: "Event Type", dataKey: "etype" },
          { title: "Event Name", dataKey: "ename" },
          { title: "User Name", dataKey: "uname" },
          { title: "M Name", dataKey: "mname" },
          { title: "Nation", dataKey: "sname" },
          { title: "User Rate", dataKey: "urate" },
          { title: "Amount", dataKey: "amt" },
          { title: "Place Date", dataKey: "pdt" },
          { title: "IP", dataKey: "ip" },
          { title: "Browser", dataKey: "bdetail" },
        ]
      }else{
        this.listColumns =  {
          "Event Name": "ename",
          "User Name": "uname",
          "Nation": "sname",
          "User Rate": "urate",
          "Amount": "amt",
          "Place Date": "pdt",
          "IP": "ip",
          "Browser": "bdetail",
        }

        this.pdfColumn = [
          { title: "Event Name", dataKey: "ename" },
          { title: "User Name", dataKey: "uname" },
          { title: "Nation", dataKey: "sname" },
          { title: "User Rate", dataKey: "urate" },
          { title: "Amount", dataKey: "amt" },
          { title: "Place Date", dataKey: "pdt" },
          { title: "IP", dataKey: "ip" },
          { title: "Browser", dataKey: "bdetail" },
        ] 
      }
      
      

    },
    changeReportType(type) {
        this.reportData = []
        //this.resetFilters()
        this.gtype = type
        this.getReportFields()
        //this.loadReport('')
    },
    async fetchExcelData() {
      const response = _.cloneDeep(this.reportData); 
      let balance = 0;
      let self = this;
      _.forEach(response, function (value, key) {
          response[key].amt = self.$helpers.toCurrency(value.amt);
          response[key].pdt = moment(String(value.pdt), "MM-DD-YYYY hh:mm:ss A").format('DD/MM/YYYY HH:MM:SS A');
        });
      return response;
    },
    async exportPdf() {
     // var self = this;
      var data = await this.fetchExcelData();
      if (data.length !== 0) {
        var doc = new jsPDF("l", "pt");
        doc.text("Current Bets", 380, 25);
        doc.autoTable(this.pdfColumn, data);
        doc.save("current_bet.pdf");
      }
    },
    checkIP(ip) {
      this.$store.state.isLoading = true;
      ServiceApi.callApi("report/checkip", {
        ip: ip,
      })
        .then((response) => {
          this.$store.state.isLoading = false;
          if (response.success) {
            this.ipdetail = response.data;
            this.$refs["ipdetail"].show();
          } else {
            this.ipdetail = [];
          }
        })
        .catch((e) => {
          this.$store.state.isLoading = false;
          this.ipdetail = [];
        });
    },
    loadReport(event) {
      this.$store.state.isLoading = true;
      this.selectedSoda = []
      this.searchText = "";
      this.loading = true;
      let type = "";
      if (event != "") {
        this.radioEvent = event
        type = event.target.value;
      } else {
        type = "matchbet";
      }
      ServiceApi.callApi("report/currentbets", {
        gtype: this.gtype,
        type: type,
      })
        .then((response) => {
          this.$store.state.isLoading = false;
          if (response.status == 200) {
            this.reportData = response.data.t1;
            this.totalRows = this.reportDataFiltered.length;
            this.loading = false;
          } else {
            this.reportData = [];
            this.totalRows = 0;
            this.loading = false;
          }

          this.calculateTotalWin();
        })
        .catch((e) => {
          this.$store.state.isLoading = false;
          this.reportData = [];
          this.totalRows = 0;
          this.loading = false;
        });
    },
    hideModal(ref) {
      this.$refs[ref].hide();
    },
    onFiltered(filteredItems) {
      if(this.filter != this.oldFilter){
        this.oldFilter = this.filter;
        this.selectedSoda = [];
      }
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    reportRowClass(item, type) {
      if (!item) return;
      if (item.btype.toLowerCase() == "back") return "back-border";
      if (item.btype.toLowerCase() == "lay") return "lay-border";
    },
    changeType(event) {
        this.selectedSoda = []
        this.betType = event.target.value
        this.calculateTotalWin()
    },
    calculateTotalWin(){
        this.sodaTotal = this.reportDataFiltered.length;
        this.winTotal = _.sumBy(this.reportDataFiltered, function (o) {
            return o.amt;
        });
    }
  },
};
</script>
