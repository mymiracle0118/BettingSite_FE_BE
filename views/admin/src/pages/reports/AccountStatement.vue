<template>
  <div>
    <PageHeader :title="'Account Statement'" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="report-form mb-3">
            <form method="post" v-on:submit.prevent="loadReport()" class="ajaxFormSubmit">
              <div class="row row5">
                <div class="col-lg-3">
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

                    <!-- <input @keyup="searchUser()" @focus="searchOpen()" v-model="searchUserText" type="text" class="form-control d-inline-block user-search-box" placeholder="Search User">
                    <i v-if="searchLoading" class="fa fa-spinner fa-spin" ></i>
                    <div class="search-box" v-if="isSearch">
                        <template v-for="(user, key) in filteredUserList">
                            <div @click="selectSearchedUser(user)" :key="key">{{ user.uname }}</div>
                        </template>
                    </div> -->
                    <!-- <select id="list-ac" v-model="postData.client"  name="list" class="js-data-example-ajax form-control"></select> -->
                  </div>
                </div>
                <div class="col-lg-3">
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
                </div>
                <div class="col-lg-2">
                  <div class="form-group">
                      <label>Type</label>
                      <select class="form-control" v-model.number="params.type" @change="onChangeType()">
                          <option value="1">All</option>
                          <option value="2">Deposit/Withdraw Report</option>
                          <option value="3">Game Report</option>
                      </select>
                  </div>
                </div>
                <div class="col-lg-2" v-if="params.type == 2">
                  <div class="form-group">
                      <label>Statement</label>
                      <select class="form-control" v-model.number="params.stmt">
                          <option value="all">All</option>
                          <option value="allcredit">Credit - All</option>
                          <option value="creditupper">Credit - Upper</option>
                          <option value="creditdown">Credit - Down</option>
                          <option value="allbalance">Pts - All</option>
                          <option value="balanceupper">Pts - Upper</option>
                          <option value="balancedown">Pts - Down</option>
                      </select>
                  </div>
                </div>
                <div class="col-lg-2" v-if="params.type == 3">
                  <div class="form-group">
                      <label>Statement</label>
                      <select class="form-control" v-model.number="params.stmt" @change="onChangeStmt()">
                          <option value="all">All</option>
                          <option value="sport">Sports</option>
                          <option value="casino">Casino</option>
                      </select>
                  </div>
                </div>
                <template v-if="params.stmt == 'sport' || params.stmt == 'casino'">
                  <template v-if="params.stmt == 'sport'">
                <div class="col-lg-2" >
                  <div class="form-group">
                      <label>Sports List</label>
                      <select class="form-control" v-model.number="params.eid">
                          <option value="0">All</option>
                          <template v-for="(data, key) in sportList">
                            <option :value="data.eid" >{{ data.ename}}</option>
                          </template>
                      </select>
                  </div>
                </div>
                <div class="col-lg-2">
                  <div class="form-group">
                      <label>Game Type</label>
                      <select class="form-control" v-model="params.gtype">
                          <option value="all">All</option>
                           <template v-for="(data, key) in gameTypeList">
                            <option :value="data.gtype" >{{ data.gtypename}}</option>
                          </template>
                      </select>
                  </div>
                </div>
                </template>
                <template v-if="params.stmt == 'casino'">
                <div class="col-lg-2" >
                  <div class="form-group">
                      <label>Casino List</label>
                      <select class="form-control" v-model="params.gtype">
                          <option value="all">All</option>
                           <template v-for="(data, key) in casinoList">
                            <option :value="data.gtype" >{{ data.casino}}</option>
                          </template>
                      </select>
                  </div>
                </div>
                </template>
                </template>
                
              </div>
              <div class="row row5">
                
                <div class="col-lg-3">
                  <!-- <label style="width: 100%">&nbsp;</label> -->
                  <button type="submit" class="btn btn-primary" id="loaddata">Load</button>
                  <button type="button" class="btn btn-light" id="reset" @click="resetReportForm()">Reset</button>
                  <downloadexcel
                      :class="{'disabled':reportData.length == 0}"
                      :fetch="fetchExcelData"
                      :fields="listColumns"
                      type="csv"
                      :name="'Account Statements.xls'"
                      class="d-inline-block"
                    >
                      <b-button variant="success" type="button" :disabled="reportData.length == 0">
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
            </form>
          </div>
            <div class="row">
              <div class="col-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select v-model="page.perPage" :options="page.pageOptions" size="sm"></b-form-select>&nbsp;entries
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-6 text-right">
                <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                  <label class="d-inline-flex align-items-center">
                    
                    <b-form-input
                      v-model="page.filter"
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
                id="accStmtTable"
                class="table no-footer table-hover"
                :fields="reportFields"
                :items="reportData"
                :filter="page.filter"
                @filtered="onFiltered"
                :current-page="page.currentPage"
                :per-page="page.perPage"
                @row-clicked="showDetailModal" 
                :tbody-tr-class="rowClass"
              >
              <template v-slot:table-colgroup="scope">
                <col
                  v-for="field in scope.fields"
                  :key="field.key"
                  :style="{ width: getColWidth(field.key) }"
                >
              </template>
            
              <template v-slot:cell(srno)="data">
                  <div class="text-right">{{ data.item.srno }}</div>
              </template>
              <template v-slot:cell(crd)="data">
                <div class="text-right" :class="{'text-success': parseFloat(data.item.crd) > 0, 'text-danger': parseFloat(data.item.crd) < 0}">
                  <span>{{ data.item.crd > 0 ? $helpers.toCurrency(data.item.crd) : '' }}</span>
                </div>
              </template>
              <template v-slot:cell(dbt)="data">
                <div class="text-right" :class="{'text-success': parseFloat(data.item.dbt) > 0, 'text-danger': parseFloat(data.item.dbt) < 0}">
                  <span>{{ data.item.dbt < 0 ? $helpers.toCurrency(data.item.dbt) : '' }}</span>
                </div>
              </template>
              <template v-slot:cell(amt)="data">
                  <div class="text-right" :class="{'text-success': parseFloat(data.item.amt) > 0, 'text-danger': parseFloat(data.item.amt) < 0}">
                    <span>{{ $helpers.toCurrency(data.item.amt) }}</span></div>
              </template>

              <!-- <template v-slot:cell(fromto)="data">
                  <div v-if="data.item.dserver == 'a'">
                    <template v-if="data.item.bal < 0">
                      {{ data.item.uname+" / "+data.item.eby }}
                    </template>
                    <template v-else>
                      {{ data.item.eby+" / "+data.item.uname }}  
                    </template>
                    
                  </div>
              </template> -->

              <template v-slot:cell(bdetail)="data">
                <a href="javascript:void(0)" data-toggle="tooltip" data-placement="top" :title="data.item.bdetail" class="text-success" :data-original-title="data.item.bdetail">Detail</a>
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
                      :total-rows="page.totalRows"
                      :per-page="page.perPage"
                      v-model="page.currentPage"
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
    <b-modal ref="detail-modal" hide-footer size="xl" title="Details">
            <!-- MATCH -->
            <template v-if="gameDetail.dType == 'ss'">
                <div class="mt-1">
                    {{ gameDetail.etype }} -> {{ gameDetail.cname }} -> {{ gameDetail.ename }} -> {{ gameDetail.mname }}
                </div>
                <div class="mt-1">
                    <div class="row">
                        <div class="col-6">
                            Winner: {{ gameDetail.winnat }}
                        </div>
                        <div class="col-6 text-right">
                            Game Time: {{ gameDetail.stime }}
                        </div>
                    </div>
                </div>
                <AccountStatementSoda :gameSoda="gameSoda" :isDtypeSS="true" />
            </template>
            <!-- DABBA -->
            <template v-else-if="gameDetail.dType == 'ds'">
                <div class="mt-1 mb-1">
                    <div class="row">
                        <div class="col-12">
                            {{ gameDetail.ename }} -> {{ gameDetail.ecat }} -> {{ gameDetail.gname }}
                        </div>
                    </div>
                </div>
                <div class="battle-result" v-if="gameSoda && gameSoda.length">
                    <div class="battle-result-container">
                        <div class="battle-header">
                            <div>User Name</div>
                            <div>Team Name</div>
                            <div  class="text-right">User Point</div>
                            <div class="text-right">Computer Point</div>
                            <div class="text-right">Amount</div>
                            <div class="text-right">Toploss Run</div>
                            <div class="text-right">Win/Loss</div>
                            <div class="text-center">Ip Address</div>
                            <div>Browser Details</div>
                        </div>
                        <div class="battle-content" id="accordion">
                            <template v-for="(data, key) in gameSoda">
                                <div class="battle-content-row" data-toggle="collapse" :href="`#collapseOne${key}`"
                                    :key="`row${key}`" @click="getBattlePlayerList(data)">
                                    <div>
                                        {{ data.uname }}
                                    </div>
                                    <div>
                                        <!-- <i class="fas fa-minus-circle text-danger mr-1"></i> -->
                                        {{ data.gsubname }}
                                    </div>
                                    <div class="text-right">{{ data.upoint }}</div>
                                    <div class="text-right">{{ data.apoint }}</div>
                                    <div class="text-right" v-currency="data.maxwinloss"></div>
                                    <div class="text-right" v-currency="data.bamt"></div>
                                    <div class="text-right" :class="{'text-success': data.winamt >= 0, 'text-danger': data.winamt < 0}" v-currency="data.winamt"></div>
                                    <div class="text-center"><i class="fas fa-eye" v-b-tooltip.hover :title="data.ip"></i></div>
                                    <div>
                                        <u v-b-tooltip.hover :title="data.bdetail">Detail</u>
                                    </div>
                                </div>
                                <div class="battle-content-detail collapse" :id="`collapseOne${key}`"
                                    data-parent="#accordion" :key="`player${key}`">
                                    <div class="battle-detail-content" v-if="battlePlayers">
                                        <div class="battle-detail-content-box" v-if="battlePlayers.t1">
                                            <div class="battle-detail-content-title">User</div>
                                            <template v-for="(data, key) in battlePlayers.t1">
                                                <div class="battle-detail-content-row" :key="key">
                                                    <div>{{ data.pname }}</div>
                                                    <div>{{ data.prun }}</div>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="battle-detail-content" v-if="battlePlayers">
                                        <div class="battle-detail-content-box" v-if="battlePlayers.t2">
                                            <div class="battle-detail-content-title">Computer</div>
                                            <template v-for="(data, key) in battlePlayers.t2">
                                                <div class="battle-detail-content-row" :key="key">
                                                    <div>{{ data.pname }}</div>
                                                    <div>{{ data.prun }}</div>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                    <template v-if="battlePlayers">
                                        <div v-if="battlePlayers.t3" class="battle-detail-content-info text-center"
                                            :class="[{'text-danger' : battlePlayers.t3.winamt <= 0}, {'text-success' : battlePlayers.t3.winamt > 0}]">
                                            <template v-if="battlePlayers.t3.winamt <= 0">
                                                <div>OPPS..!</div>
                                                <div>WE ARE SORRY TO KNOW THAT YOU LOST {{ battlePlayers.t3.winamt }}
                                                </div>
                                               <!--  <div>{{ battlePlayers.t3.upoint }} - {{ battlePlayers.t3.apoint }} =
                                                    {{ battlePlayers.t3.upoint-battlePlayers.t3.apoint}}</div>
                                                <div>{{ battlePlayers.t3.upoint-battlePlayers.t3.apoint}} X
                                                    {{ battlePlayers.t3.bamt }} = {{ battlePlayers.t3.winamt }}</div> -->
                                            </template>
                                            <template v-if="battlePlayers.t3.winamt > 0">
                                                <div>YEAH..!</div>
                                                <div>YOUR GAIN IS {{ battlePlayers.t3.winamt }}</div>
                                                <!-- <div>{{ battlePlayers.t3.upoint }} - {{ battlePlayers.t3.apoint }} =
                                                    {{ battlePlayers.t3.upoint-battlePlayers.t3.apoint}}</div>
                                                <div>{{ battlePlayers.t3.upoint-battlePlayers.<t3 class="apoint"></t3>}} X
                                                    {{ battlePlayers.t3.bamt }} = {{ battlePlayers.t3.winamt }}</div> -->
                                            </template>
                                        </div>
                                    </template>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </template>
            <!-- DREAM -->
            <template v-else-if="gameDetail.dType == 'd1s'">
                <div class="mt-1 mb-1">
                    <div class="row">
                        <div class="col-6">
                            {{ gameDetail.ename }} -> {{ gameDetail.ecname }} -> {{ gameDetail.gname }}
                        </div>
                        <div class="col-6 text-right">
                            Game Time: {{ gameDetail.stime }}
                        </div>
                    </div>
                </div>
                <div class="battle-result" v-if="gameSoda && gameSoda.length">
                    <div class="battle-result-container dream-result-container">
                        <div class="battle-header">
                            <div>Team Name</div>
                            <div>Contest Name</div>
                            <div class="text-right">Rank</div>
                            <div class="text-right">Point</div>
                            <div class="text-right">Amount</div>
                            <div class="text-right">Win/Loss</div>
                            <div class="text-center">Ip Address</div>
                            <div>Browser Details</div>
                        </div>
                        <div class="battle-content" id="accordion">
                            <template v-for="(data, key) in gameSoda">
                                <div class="battle-content-row" data-toggle="collapse" :href="`#collapseOne${key}`"
                                    :key="`row${key}`" @click="getDreamPlayerList(data)">
                                    <div>
                                        <!-- <i class="fas fa-minus-circle text-danger mr-1"></i> -->
                                        {{ data.tname }}
                                    </div>
                                    <div>{{ data.conname }}</div>
                                    <div class="text-right">{{ data.rank }}</div>
                                    <div class="text-right">{{ data.point }}</div>
                                    <div class="text-right">{{ data.amt }}</div>
                                    <div class="text-right" :class="{'text-success': data.winamt >= 0, 'text-danger': data.winamt < 0}">{{ data.winamt }}</div>
                                    <div class="text-center"><i class="fas fa-eye" v-b-tooltip.hover :title="data.ip"></i></div>
                                    <div>
                                        <u v-b-tooltip.hover :title="data.bdetail">Detail</u>
                                    </div>
                                </div>
                                <div class="battle-content-detail collapse" :id="`collapseOne${key}`"
                                    data-parent="#accordion" :key="`player${key}`">
                                    <div class="battle-detail-content" v-if="dreamPlayers">
                                        <div class="battle-detail-content-box">
                                            <div class="battle-detail-content-row">
                                                <div class="row row5">
                                                    <template v-for="(data, key) in dreamPlayers">
                                                        <div class="col-6" :key="key">
                                                            <div class="row">
                                                                <div class="col-6">{{ data.pname }}
                                                                    <span class="captain-icon"
                                                                        v-if="data.iscap">C</span>
                                                                    <span class="captain-icon"
                                                                        v-if="data.isvc">VC</span>
                                                                </div>
                                                                <div class="col-6">{{ data.point }}</div>
                                                            </div>
                                                        </div>
                                                    </template>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </template>
            <!-- CASINO -->
            <template v-else>
                <CasinoResult :resultData="gameDetail" />
                <AccountStatementSoda :gameSoda="gameSoda" :desc="gameDetail.rdesc"/>
            </template>
        </b-modal>
  </div>
</template>

<script>
import ServiceApi from "@/services/ServiceApi";
import PageHeader from "@/components/page-header";
import DatePicker from "vue2-datepicker";
import CasinoResult from '@/components/casino/results/CasinoResults'
import AccountStatementSoda from '@/components/AccountStatementSoda'
import Multiselect from "vue-multiselect";
import moment from "moment";
//moment.tz.setDefault("Asia/Calcutta");
import jsPDF from 'jspdf';  
import 'jspdf-autotable';
import downloadexcel from 'vue-json-excel'

export default {
  components: {
    PageHeader,
    DatePicker,
    CasinoResult,
    AccountStatementSoda,
    Multiselect,
    downloadexcel
  },
  mounted() {
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
          text: "Account Statement",
          active: true,
        },
      ],
      listColumns: {
        Date: "edt",
        "Sr No": "srno",
        Credit: "crd",
        Debit: "dbt",
        Amount: "amt",
        Remark: "rem",
        "Fromto": "fromto",
      },
      pdfColumn: [
        { title: "Date", dataKey: "edt" },
        { title: "Sr No", dataKey: "srno" },
        { title: "Credit", dataKey: "crd" },
        { title: "Debit", dataKey: "dbt" },
        { title: "Amount", dataKey: "amt" },
        { title: "Remark", dataKey: "rem" },
        { title: "Fromto", dataKey: "fromto" },
      ],
      
      reportFields: [
        {
          key: "edt",
          label: "Date",
          sortable: true
        },
        {
          key: "srno",
          label: "Sr No",
          sortable: true,
          thClass: 'text-right'
        },
        {
          key: "crd",
          label: "Credit",
          sortable: true,
          thClass: 'text-right',
          sortByFormatted: value => {
            return parseFloat(value)
          },
        },
        {
          key: "dbt",
          label: "Debit",
          sortable: true,
          thClass: 'text-right',
          sortByFormatted: value => {
            return parseFloat(value)
          },
        },
        {
          key: "amt",
          label: "Pts",
          sortable: true,
          thClass: 'text-right',
          sortByFormatted: value => {
            return parseFloat(value)
          },
        },
        {
          key: "rem",
          label: "Remark",
          sortable: true,
        },
        {
          key: "fromto",
          label: "Fromto",
          sortable: true,
        }
      ],
      
      
      params: {
          //dateFrom: moment(new Date()).subtract(1, 'week').format("DD/MM/YYYY"),
          //dateTo: moment(new Date()).format("DD/MM/YYYY"),
          username: null,
          //uid:'',
          type: 1,
          stmt:'all',
          gtype:'all',
          eid: 0,
          fromto: [moment().tz(DEFAULT_TIMEZONE).subtract(1, 'week').format("MM/DD/YYYY"), moment().tz(DEFAULT_TIMEZONE).format("MM/DD/YYYY")],
          fdt:'',
          tdt:''
      },
      /*isSearch: false,
      searchLoading: false,
      searchUserText: '',
      searchUserData: [],*/
      searchedUsers: [],
      casinoList:[],
      sportList: [],
      gameTypeList: [],
      page: {
        currentPage: 1,
        filter: null,
        perPage: 25,
       // totalLength: 0,
        totalRows: 0,
        pageOptions: [25, 50, 75, 100, 125, 150],
      },
      gameDetail: {},
      gameSoda: [],
      battlePlayers: null,
      dreamPlayers: null
    };
  },
  watch: {
    
    /*perPage(newvalue, oldvalue) {
      this.$emit("input", newvalue);
      this.getUserlist();
    },*/
  },
  computed: {
    
  },
  methods: {
      rowClass(item, type) {
        if (!item || type !== 'row') return
        if (item.rpopup != '1') return 'nocursor'
      },
      async fetchExcelData() {
        const response = this.reportData;
        return response;
      },
      exportPdf() {
        var self = this;
        if (self.reportData.length !== 0) {
          let oldPerPage = self.perPage;
          var doc = new jsPDF("l", "pt");
          doc.text("Account Statements", 220, 25);
          doc.autoTable(self.pdfColumn, self.reportData);
          doc.save("account_statements.pdf");
        }
      },
      resetReportForm(){
        this.params = {
          username: null,
          type: 1,
          stmt:'all',
          gtype:'all',
          eid: 0,
          fromto: [moment().subtract(1, 'week').format("MM/DD/YYYY"), moment().format("MM/DD/YYYY")],
          fdt:'',
          tdt:''
        }
        this.searchedUsers = []
        this.reportData = []
        this.page.currentPage = 1;
        this.page.totalRows = 0;
      },
      showDetailModal(row) {
        let gmid = row.gmid
        let mid = row.mid
        let gtype = row.gtype
        let dtype = row.dserver
        let popup = row.rpopup
        if (popup == 1) {
            if (this.loading)
                return
            this.$store.state.isLoading = true
            // console.log(gmid, mid, gtype, dtype, popup)
            ServiceApi.callApi("accstatepopup", {
                    'gmid': gmid,
                    'mid': mid,
                    'gtype': gtype,
                    'dtype': dtype,
                    'uid': this.params.username != null ? this.params.username.uguid : "" 
                })
                .then(response => {
                    if (response.status == 200) {
                        this.gameDetail = _.get(response.data, 't1') ? _.get(response.data, 't1') : {}
                        Vue.set(this.gameDetail, 'gType', gtype)
                        Vue.set(this.gameDetail, 'dType', dtype)
                        this.gameSoda = _.get(response.data, 't2')
                        //console.log(this.gameDetail)
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
        }
    },
    getBattlePlayerList(data) {
        this.battlePlayers = null
        ServiceApi.callApi("accdababet", {
                'btid': data.btid
            })
            .then(response => {
                if (response.status == 200) {
                    this.battlePlayers = response.data
                    Vue.set(this.battlePlayers, 't3', data)
                } else {
                    this.battlePlayers = null
                }
            })
            .catch(e => {
                this.battlePlayers = null
            });
    },
    getDreamPlayerList(data) {
        this.dreamPlayers = null
        ServiceApi.callApi("accdreambet", {
                'btid': data.uconid
            })
            .then(response => {
                if (response.status == 200) {
                    this.dreamPlayers = response.data
                } else {
                    this.dreamPlayers = null
                }
            })
            .catch(e => {
                this.dreamPlayers = null
            });
    },
    getColWidth(key){
      if(key == 'rem'){
        return '350px'
      }else if(key == 'srno'){
        return '100px'
      }else{
        return 'auto'
      }
    },
    disabledDates(date) {
      const today = new Date(moment().tz(DEFAULT_TIMEZONE).format("YYYY/MM/DD HH:mm:ss"));
      return date > today
    },
    onChangeType(){
      this.params.stmt = "all"
      this.params.gtype = "all"
      this.params.eid = 0
    },
    onChangeStmt(){
      this.params.gtype = "all"
      this.params.eid = 0
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
    loadReport() {
      this.$store.state.isLoading = true
      if(this.params.fromto != null && this.params.fromto.length > 0){
        this.params.fdt = this.params.fromto[0]
        this.params.tdt = this.params.fromto[1]
      }else{
        this.params.fdt = ''
        this.params.tdt = ''
      }
      //console.log(this.params.username)
      let formData = {
        uid: this.params.username != null ? this.params.username.uguid : "",
        type: this.params.type,
        sta: this.params.stmt,
        gtype: this.params.gtype,
        eid: this.params.eid,
        fdt: this.params.fdt,
        tdt: this.params.tdt
      }
      if(formData.type == 3 && formData.sta == "all"){
        formData.gtype = ""; 
      }
      ServiceApi.callApi("report/accountstatement", formData)
      .then(response => {
          this.$store.state.isLoading = false
          if (response.status == 200) {
              let table1 = _.get(_.get(response, 'data'), 't1')
              let table2 = _.get(_.get(response, 'data'), 't2')
              this.reportData = []
              let op = table1.ope
              let balance = op
              let srno = 1
              
              this.reportData.push({
                  srno: srno++,
                  crd: op >= 0 ? parseFloat(op) : 0,
                  dbt: op < 0 ? parseFloat(op) : 0,
                  amt: parseFloat(op), 
                  dserver: '',
                  edt: moment(String(this.params.fdt), 'MM/DD/YYYY').format(
                      'DD/MM/YYYY'),
                  gmid: 0,
                  gtype: "",
                  mid: 0,
                  rem: 'Opening Pts',
                  rpopup: 0,
                  uname: '',
                  eby:''
              })

              const self = this
              if (table2 && table2.length) {
                  _.forEach(table2, function (value) {
                      // console.log(value);
                      balance += value.amt

                      let uname = ''
                      if(value.dserver == 'a'){
                        if(value.amt < 0){
                          uname = value.uname + '/' +  value.eby
                        }else{
                          uname = value.eby + '/' +  value.uname
                        }
                        
                      }

                      self.reportData.push({
                          srno: srno++,
                          crd: value.amt >= 0 ? parseFloat(value.amt) : 0,
                          dbt: value.amt < 0 ? parseFloat(value.amt) : 0,
                          amt: parseFloat(balance),
                          edt: moment(String(value.edt), 'MM/DD/YYYY').format('DD/MM/YYYY'),
                          gmid: value.gmid,
                          gtype: value.gtype,
                          mid: value.mid,
                          rem: value.rem,
                          dserver: value.dserver,
                          rpopup: value.rpopup,
                          uname: value.uname,
                          fromto: uname,
                          eby: value.eby,
                          bal: value.amt
                      })
                  });
              }
              // console.log(balance)
              this.page.totalRows = this.reportData.length;
              this.loading = false
          } else {
              this.reportData = []
              this.page.totalRows = 0
              this.loading = false
          }
          //console.log(this.reportData)

      })
      .catch(e => {
          this.$store.state.isLoading = false
          this.reportData = []
          this.page.totalRows = 0
          this.loading = false
      });  
    },
    hideModal(ref) {
      this.$refs[ref].hide();
    },
    onFiltered(filteredItems) {
      this.page.totalRows = filteredItems.length;
      this.page.currentPage = 1;
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
