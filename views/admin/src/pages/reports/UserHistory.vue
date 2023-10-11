<template>
  <div>
    <PageHeader :title="'User History'" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <b-tabs active-nav-item-class="tab-bg-primary" content-class="p-2 text-muted">
              <b-tab active @click="setHistoryType('login')">
                <template v-slot:title>
                  <span>Login History</span>
                </template>
                <form @submit.prevent="false" data-vv-scope="InserUserAccount" method="post">
                  <div class="row row5">
                    <div class="form-group col-xl-3">
                      <multiselect
                        @search-change="searchUser"
                        v-model="username"
                        :searchable="true"
                        :internal-search="true"
                        :clear-on-select="false"
                        :close-on-select="true"
                        :select-label="''"
                        :deselect-label="''"
                        label="uname"
                        track-by="uguid"
                        :options="searchedUsers"
                      ></multiselect>
                    </div>
                    <div class="form-group col-xl-3">
                      <date-picker
                        v-model="fromto"
                        format="DD/MM/YYYY"
                        type="date"
                        range
                        :disabled-date="disabledDates"
                        value-type="MM/DD/YYYY"
                        append-to-body
                        lang="en"
                        
                      ></date-picker>
                    </div>
                    <div class="form-group col-xl-6">
                      <b-button variant="primary" type="button" @click="getHistory">Load</b-button>
                      <button type="button" class="btn btn-light" id="reset" @click="resetReportForm()">Reset</button>
                      <downloadexcel
                        :class="{'disabled':history.length == 0}"
                        :fetch="fetchExcelData"
                        :fields="listColumns"
                        type="csv"
                        name="userHistory.xls"
                        class="d-inline-block"
                      >
                        <b-button variant="success" type="button" :disabled="history.length == 0">
                          <i class="fas fa-file-excel"></i>
                        </b-button>
                      </downloadexcel>
                      <b-button
                        variant="danger"
                        @click="exportPdf"
                        type="button"
                        :disabled="history.length == 0"
                      >
                        <i class="fas fa-file-pdf"></i>
                      </b-button>
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
                <div class="table-responsive mb-0">
                  <b-table
                    show-empty
                    responsive="sm"
                    id="eventsListTbl"
                    class="table no-footer table-hover"
                    :fields="reportFields"
                    :items="history"
                    :filter="filter"
                    :current-page="currentPage"
                    :per-page="perPage"
                    @filtered="onFiltered"
                  >
                    <template v-slot:cell(edt)="data">
                      <div v-format-datetime="{date:data.item.edt}"></div>
                    </template>
                    <template v-slot:cell(action)="data">
                      <p class="text-center pointer mb-0" @click="checkIP(data.item.ip)">
                        <i class="fas fa-eye"></i>
                      </p>
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
              </b-tab>
              <b-tab @click="setHistoryType('cp')">
                <template v-slot:title>
                  <span>Change Password History</span>
                </template>
                <form @submit.prevent="false" data-vv-scope="cpAccount" method="post">
                  <div class="row">
                    <div class="form-group col-xl-3">
                      <multiselect
                        @search-change="searchUser"
                        v-model="username"
                        :searchable="true"
                        :internal-search="true"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :select-label="''"
                        :deselect-label="''"
                        label="uname"
                        track-by="uguid"
                        :options="searchedUsers"
                      ></multiselect>
                    </div>
                    <div class="form-group col-xl-3">
                      <date-picker
                        v-model="fromto"
                        format="DD/MM/YYYY"
                        type="date"
                        range
                        value-type="MM/DD/YYYY"
                        append-to-body
                        lang="en"
                        
                        :disabled-date="disabledDates"
                      ></date-picker>
                    </div>
                    <div class="form-group col-xl-4">
                      <b-button variant="primary" type="button" @click="getHistory">Load</b-button>
                      <button type="button" class="btn btn-light" id="reset1" @click="resetReportForm()">Reset</button>
                      <downloadexcel
                        :class="{'disabled':history.length == 0}"
                        :fetch="fetchExcelData"
                        :fields="listColumns"
                        type="csv"
                        name="userHistory.xls"
                        class="d-inline-block"
                      >
                        <b-button variant="success" type="button" :disabled="history.length == 0">
                          <i class="fas fa-file-excel"></i>
                        </b-button>
                      </downloadexcel>
                      <b-button
                        variant="danger"
                        @click="exportPdf"
                        type="button"
                        :disabled="history.length == 0"
                      >
                        <i class="fas fa-file-pdf"></i>
                      </b-button>
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
                <div class="table-responsive mb-0">
                  <b-table
                    show-empty
                    responsive="sm"
                    id="eventsListTbl"
                    class="table no-footer table-hover"
                    :fields="reportFields"
                    :items="history"
                    :filter="filter"
                    :current-page="currentPage"
                    :per-page="perPage"
                    @filtered="onFiltered"
                  >
                    <template v-slot:cell(uname)="data">
                      <p  class=" mb-0">{{ data.item.cuname+" ("+data.item.luname+"/"+data.item.luname+")"}}</p>

                    </template>
                    <template v-slot:cell(edt)="data">
                      <div v-format-datetime="{date:data.item.edt}"></div>
                    </template>
                    <template v-slot:cell(action)="data">
                      <p class="text-center pointer mb-0" @click="checkIP(data.item.ip)">
                        <i class="fas fa-eye"></i>
                      </p>
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
              </b-tab>
            </b-tabs>
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
      <b-table-simple bordered striped hover small caption-top responsive>
        <b-thead head-variant="dark">
          <b-tr>
            <b-th>Key</b-th>
            <b-th>Value</b-th>
          </b-tr>
        </b-thead>
        <b-tbody v-if="ipdetail">
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
import DatePicker from "vue2-datepicker";
import Multiselect from "vue-multiselect";
import moment from "moment-timezone";
import downloadexcel from "vue-json-excel";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  components: {
    PageHeader,
    Multiselect,
    DatePicker,
    downloadexcel,
  },
  mounted() {
    let today = new Date();
    this.fromto = [
      moment().tz(DEFAULT_TIMEZONE).subtract(1, "week").format("MM/DD/YYYY"),
      moment().tz(DEFAULT_TIMEZONE).format("MM/DD/YYYY"),
    ];
  },
  data() {
    return {
      username: null,
      fromto: [],
      searchedUsers: [],
      history: [],
      type: "login",
      items: [
        {
          text: "Home",
          to: { name: "home" },
        },
        {
          text: "User History",
          active: true,
        },
      ],
      reportFields: [
        {
          key: "uname",
          label: "Username",
          sortable: true,
        },
        {
          key: "edt",
          label: "Date",
        },
        {
          key: "ip",
          label: "IP",
        },
        {
          key: "action",
          label: "Detail",
        },
      ],
      listColumns: {
        "User Name": "uname",
        Date: "edt",
        IP: "ip",
      },
      pdfColumn: [
        { title: "User Name", dataKey: "uname" },
        { title: "Date", dataKey: "edt" },
        { title: "IP", dataKey: "ip" },
      ],
      currentPage: 1,
      filter: null,
      perPage: 25,
      totalLength: 0,
      totalRows: 0,
      ipdetail: {},
      pageOptions: [25, 50, 75, 100, 125, 150],
    };
  },
  watch: {},
  methods: {
    resetReportForm(){
      let today = new Date();
      this.fromto = [
        moment().tz(DEFAULT_TIMEZONE).subtract(1, "week").format("MM/DD/YYYY"),
        moment().tz(DEFAULT_TIMEZONE).format("MM/DD/YYYY"),
      ];
      this.username = null
      this.searchedUsers = []
      this.history = []
      this.currentPage = 1;
      this.totalRows = 0;
    },
    disabledDates(date) {
      const today = new Date(moment().tz(DEFAULT_TIMEZONE).format("YYYY/MM/DD"));
      return date > today;
    },

    hideModal(ref) {
      this.$refs[ref].hide();
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
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    setHistoryType(type) {
      this.username = null;
      let today = new Date();
      this.fromto = [
        moment().tz(DEFAULT_TIMEZONE).subtract(1, "week").format("MM/DD/YYYY"),
        moment().tz(DEFAULT_TIMEZONE).format("MM/DD/YYYY"),
      ];
      this.searchedUsers = [];
      this.type = type;
      this.history = [];
    },
    getHistory() {
      if (this.fromto !== null) {
        this.$store.state.isLoading = true;
        let url = this.type == "login" ? "login-history" : "pass-history";
        ServiceApi.callApi("report/" + url, {
          guid: this.username != null ? this.username.uguid : "",
          fdt: this.fromto[0],
          tdt: this.fromto[1],
        })
          .then((response) => {
            this.$store.state.isLoading = false;
            if (response.success) {
              this.history = response.data.t1;
              this.totalRows = this.history.length;
            } else {
              this.history = [];
              this.totalRows = 0;
            }
          })
          .catch((e) => {
            this.$store.state.isLoading = false;
            this.history = [];
            this.totalRows = 0;
          });
      }
    },
    async fetchExcelData() {
      const response = this.history;
      return response;
    },
    exportPdf() {
      var self = this;
      if (self.history.length !== 0) {
        var doc = new jsPDF("p", "pt");
        doc.text("User History Data", 220, 25);
        doc.autoTable(self.pdfColumn, self.history);
        doc.save("userHistory.pdf");
      }
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

<style>
</style>