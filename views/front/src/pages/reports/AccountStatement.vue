<template>
    <div class="report-box">
        <div class="report-title">
            <div class="report-name">Account Statement</div>
            <div class="report-search search-box">
                <div class="form-group mb-0">
                    <input type="text" v-model="searchText" placeholder="Search" class="form-control">
                    <img :src="imgPath + 'front/img/search.svg'" class="search-icon">
                </div>
            </div>
        </div>
        <div class="report-form">
            <div class="form-group from-date">
                <label>From</label>
                <DatePicker v-model="params.dateFrom" :disabled-date="disabledFromDate" lang="en"
                    value-type="MM/DD/YYYY" format="DD/MM/YYYY" />
            </div>
            <div class="form-group to-date">
                <label>To</label>
                <DatePicker v-model="params.dateTo" :disabled-date="disabledToDate" lang="en" value-type="MM/DD/YYYY"
                    format="DD/MM/YYYY" />
            </div>
            <div class="form-group">
                <label>Type</label>
                <select class="form-control" v-model.number="params.type">
                    <option value="1">All</option>
                    <option value="2">Deposit/Withdraw Report</option>
                    <option value="3">Game Report</option>
                </select>
            </div>
            <button class="btn btn-primary" @click="loadReport()">Submit</button>
        </div>
        <div class="report-page-count">
            <div class="form-group mb-0">
                <label>Show</label>
                <select class="form-control" v-model="page.perPage" @change="changePerPage($event)">
                    <template v-for="(page, key) in perPage">
                        <option :key="key" :value="page">{{ page }}</option>
                    </template>
                </select>
                <label>Entries</label>
            </div>
            <div class="file-icons">
                <div @click="generatePdf()">
                    <i class="fas fa-file-pdf" :class="{'disabled': !(this.data && this.data.length)}"></i>
                </div>
                <JsonExcel :fields="exportTable.excelHeading" :data="data" type="xls" name="Account Statement.xls">
                    <i class="fas fa-file-excel" :class="{'disabled': !(this.data && this.data.length)}"></i>
                </JsonExcel>
            </div>
        </div>
        <div class="report-table ac-statement table-responsive" :class="{ 'loader-section-parent' : loading}">
            <Loader :isVisible="loading"></Loader>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="bet-date">
                            <div>Date</div>
                        </th>
                        <th class="text-right bet-user-rate">
                            <div>Sr no</div>
                        </th>
                        <th class="text-right bet-amount">
                            <div>Credit</div>
                        </th>
                        <th class="text-right bet-amount">
                            <div>Debit</div>
                        </th>
                        <th class="text-right bet-amount">
                            <div>Pts</div>
                        </th>
                        <th class="bet-remark">
                            <div>Remark</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="reportData && reportData.length">
                        <template v-for="(ac, key) in reportData">
                            <tr :key="key"
                                @click="showModal(ac.gmid, ac.mid, ac.gtype, ac.dserver, ac.rpopup, ac.winloss)">
                                <td class="bet-date">
                                    <div>{{ ac.edt }}</div>
                                </td>
                                <td class="text-right bet-user-rate">
                                    <div>{{ ac.srno }}</div>
                                </td>
                                <td class="text-right bet-amount">
                                    <template v-if="ac.crd != ''">
                                        <div v-currency="ac.crd">{{ ac.crd }}</div>
                                    </template>
                                    <template v-else>
                                        <div>&nbsp;</div>
                                    </template>
                                </td>
                                <td class="text-right bet-amount">
                                    <template v-if="ac.dbt != ''">
                                        <div v-currency="ac.dbt">{{ ac.dbt }}</div>
                                    </template>
                                    <template v-else>
                                        <div>&nbsp;</div>
                                    </template>
                                </td>
                                <td class="text-right bet-amount">
                                    <div v-currency="ac.amt">{{ ac.amt }}</div>
                                </td>
                                <td class="bet-remark">
                                    <div class="ifTooltip">{{ ac.rem }}
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </template>
                    <template v-else>
                        <tr class="no-record">
                            <td colspan="6">No records found</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <!-- <div class="report-table d-none-desktop" :class="{ 'loader-section-parent' : loading}">
            <Loader :isVisible="loading"></Loader>
            <template v-if="reportData && reportData.length">
                <template v-for="(ac, key) in reportData">
                    <div class="report-row" :key="key"
                        @click="showModal(ac.gmid, ac.mid, ac.gtype, ac.dserver, ac.rpopup, ac.winloss)">
                        <div>
                            <span class="bet-heading">Date</span>
                            <span>{{ ac.edt }}</span>
                        </div>
                        <div>
                            <span class="bet-heading">Sr no</span>
                            <span>{{ ac.srno }}</span>
                        </div>
                        <div>
                            <span class="bet-heading">Credit</span>
                            <template v-if="ac.crd != ''">
                                <span v-currency="ac.crd">
                                    {{ ac.crd }}
                                </span>
                            </template>
                            <template v-else>
                                <span>&nbsp;</span>
                            </template>
                        </div>
                        <div>
                            <span class="bet-heading">Debit</span>
                            <template v-if="ac.dbt != ''">
                                <span v-currency="ac.dbt">
                                    {{ ac.dbt }}</span>
                            </template>
                            <template v-else>
                                <span>&nbsp;</span>
                            </template>
                        </div>
                        <div>
                            <span class="bet-heading">Pts</span>
                            <span v-currency="ac.amt">{{ ac.amt }}
                            </span>
                        </div>
                        <div>
                            <span class="bet-heading">Remark</span>
                            <span>{{ ac.rem }}</span>
                        </div>
                    </div>
                </template>
            </template>
            <template v-else>
                <div class="report-row no-record">No records found</div>
            </template>
        </div> -->

        <paginate v-if="page.totalPages > 0" v-model="page.currunt" :pageCount="page.totalPages"
            :clickHandler="changePage" :prevText="'<'" :nextText="'>'"
            :container-class="'pagination justify-content-center mt-2'" :page-class="'page-item'"
            :page-link-class="'page-link'" :prev-class="'page-item'" :prev-link-class="'page-link'"
            :next-class="'page-item'" :next-link-class="'page-link'" :first-last-button="true" :first-button-text="'<<'"
            :last-button-text="'>>'">
        </paginate>

        <b-modal ref="detail-modal" :modal-class="{'casino-result': gameDetail.dType == 'cs'}" hide-footer size="xl"
            :title="gameDetail.dType == 'cs' ?  gameDetail.ename + ' Result' : 'Result'">
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
                            Game Time: {{ changeDateTimeFormat(gameDetail.stime) }}
                        </div>
                    </div>
                </div>
                <AccountStatementSoda :gameSoda="gameSoda" :isDtypeSS="true"/>
            </template>
            <!-- DABBA -->
            <template v-else-if="gameDetail.dType == 'ds'">
                <div class="mt-1 mb-1">
                    <div class="row">
                        <div class="col-6">
                            {{ gameDetail.ename }} -> {{ gameDetail.ecat }} -> {{ gameDetail.gname }}
                        </div>
                        <div class="col-6 text-right">
                            Game Time: {{ changeDateTimeFormat(gameDetail.stime) }}
                        </div>
                    </div>
                </div>
                <template v-if="gameSoda && gameSoda.length">
                    <div class="battle-result">
                        <div class="battle-result-container">
                            <div class="battle-header">
                                <div>Team Name</div>
                                <div class="text-right">User Point</div>
                                <div class="text-right">Computer Point</div>
                                <div class="text-right">Amount</div>
                                <div class="text-right">TopLoss Run</div>
                                <div class="text-right">Win/Loss</div>
                                <div class="text-center">Ip Address</div>
                                <div>Browser Details</div>
                            </div>
                            <div class="battle-content" id="accordion">
                                <template v-for="(data, key) in gameSoda">
                                    <div class="battle-content-row" data-toggle="collapse" :href="`#collapseOne${key}`"
                                        :key="`row${key}`" @click="getBattlePlayerList(data)">
                                        <div>
                                            <!-- <i class="fas fa-minus-circle text-danger mr-1"></i> -->
                                            {{ data.gsubname }}
                                        </div>
                                        <div class="text-right">{{ data.upoint }}</div>
                                        <div class="text-right">{{ data.apoint }}</div>
                                        <div class="text-right" v-currency="data.bamt">{{ data.bamt }}</div>
                                        <div class="text-right">{{ data.maxwinloss }}</div>
                                        <div class="text-right">{{ data.winamt }}</div>
                                        <div class="text-center"><i class="fas fa-info-circle" v-b-tooltip.hover :title="data.ip"></i></div>
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
                                                    <!-- <div>{{ battlePlayers.t3.upoint }} - {{ battlePlayers.t3.apoint }} =
                                                        {{ battlePlayers.t3.upoint-battlePlayers.t3.apoint}}</div>
                                                    <div>{{ battlePlayers.t3.upoint-battlePlayers.t3.apoint}} X
                                                        {{ battlePlayers.t3.bamt }} = {{ battlePlayers.t3.winamt }}</div> -->
                                                </template>
                                                <template v-if="battlePlayers.t3.winamt > 0">
                                                    <div>YEAH..!</div>
                                                    <div>YOUR GAIN IS {{ battlePlayers.t3.winamt }}</div>
                                                    <!-- <div>{{ battlePlayers.t3.upoint }} - {{ battlePlayers.t3.apoint }} =
                                                        {{ battlePlayers.t3.upoint-battlePlayers.t3.apoint}}</div>
                                                    <div>{{ battlePlayers.t3.upoint-battlePlayers.t3.apoint}} X
                                                        {{ battlePlayers.t3.bamt }} = {{ battlePlayers.t3.winamt }}</div> -->
                                                </template>
                                            </div>
                                        </template>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                    <!-- <b-table responsive :items="gameSoda" :fields="fields">
                        <template #cell(show_details)="row">
                        </template>

                        <template #row-details="row">
                            <b-card>
                                <b-row class="mb-2">
                                    <b-col sm="3" class="text-sm-right"><b>Age:</b></b-col>
                                    <b-col>{{ row.item.age }}</b-col>
                                </b-row>
                            </b-card>
                        </template>

                        <template #cell(gsubname)="data">
                            <span>{{ data.value }}</span>
                        </template>
                        <template #cell(upoint)="data">
                            <span>{{ data.value }}</span>
                        </template>
                        <template #cell(apoint)="data">
                            <span>{{ data.value }}</span>
                        </template>
                        <template #cell(bamt)="data">
                            <span v-currency="data.value">{{ data.value }}</span>
                        </template>
                        <template #cell(maxwinloss)="data">
                            <span>{{ data.value }}</span>
                        </template>
                        <template #cell(winamt)="data">
                            <span>{{ data.value }}</span>
                        </template>
                        <template #cell(ip)="data">
                            <i class="fas fa-info-circle" v-b-tooltip.hover :title="data.value"></i>
                        </template>
                        <template #cell(bdetail)="data">
                            <u v-b-tooltip.hover :title="data.value">Detail</u>
                        </template>
                    </b-table> -->

                </template>
            </template>
            <!-- DREAM -->
            <template v-else-if="gameDetail.dType == 'd1s'">
                <div class="mt-1 mb-1">
                    <div class="row">
                        <div class="col-6">
                            {{ gameDetail.ename }} -> {{ gameDetail.ecname }} -> {{ gameDetail.gname }}
                        </div>
                        <div class="col-6 text-right">
                            Game Time: {{ changeDateTimeFormat(gameDetail.stime) }}
                        </div>
                    </div>
                </div>
                <template v-if="gameSoda && gameSoda.length">
                    <div class="battle-result-container dream-result-container">
                        <div class="battle-header">
                            <div>Team Name</div>
                            <div>Contest Name</div>
                            <div>Rank</div>
                            <div>Poin</div>
                            <div>Amount</div>
                            <div>Win/Loss</div>
                            <div>Ip Address</div>
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
                                    <div>{{ data.rank }}</div>
                                    <div>{{ data.point }}</div>
                                    <div v-currency="data.amt">{{ data.amt }}</div>
                                    <div v-currency="data.winamt">{{ data.winamt }}</div>
                                    <div>{{ data.ip }}</div>
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
                </template>
            </template>
            <!-- THIRD PARTY CASINO -->
            <template v-else-if="gameDetail.dType == 'tp'">
                <TpCasinoSoda :tpCasinoList="tpCasinoList" />
            </template>
            <!-- CASINO -->
            <template v-else-if="gameDetail.dType == 'cs'">
                <CasinoResult :resultData="gameDetail" />
                <template v-if="gameDetail.gType == 'kbc'">
                    <AccountStatementSoda :gameSoda="gameSoda" :gtype="gameDetail.gType" :desc="gameDetail.rdesc"/>
                </template>
                <template v-else>
                    <AccountStatementSoda :gameSoda="gameSoda" />
                </template>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import jsPDF from 'jspdf'
    import ServiceApi from "@/services/ServiceApi";
    import DatePicker from 'vue2-datepicker'
    import CasinoResult from '@/components/casino/results/CasinoResults'
    import AccountStatementSoda from '@/components/AccountStatementSoda'
    import TpCasinoSoda from '@/components/TpCasinoSoda'
    import 'jspdf-autotable'
    import JsonExcel from 'vue-json-excel'
    import moment from 'moment-timezone'
    // moment.tz.setDefault("Asia/Calcutta");
    import Loader from '@/components/loader'

    export default {
        components: {
            JsonExcel,
            DatePicker,
            CasinoResult,
            AccountStatementSoda,
            TpCasinoSoda,
            Loader
        },
        mounted() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        data() {
            return {
                fields: [{
                        label: 'Team Name',
                        key: 'gsubname'
                    },
                    {
                        label: 'User Point',
                        key: 'upoint'
                    },
                    {
                        label: 'Computer Point',
                        key: 'apoint'
                    },
                    {
                        label: 'Amount',
                        key: 'bamt'
                    },
                    {
                        label: 'TopLoss Run',
                        key: 'maxwinloss'
                    },
                    {
                        label: 'Win/Loss',
                        key: 'winamt'
                    },
                    {
                        label: 'Ip Address',
                        key: 'ip'
                    },
                    {
                        label: 'Browser Details',
                        key: 'bdetail'
                    }
                ],
                imgPath: IMG_PATH,
                params: {
                    dateFrom: moment(new Date()).tz(DEFAULT_TIMEZONE).subtract(1, 'week').format("MM/DD/YYYY"),
                    dateTo: moment(new Date()).tz(DEFAULT_TIMEZONE).format("MM/DD/YYYY"),
                    type: 1,
                },
                searchText: '',
                page: {
                    perPage: 25,
                    currunt: 1,
                    totalPages: 0
                },
                perPage: [
                    10, 25, 50, 100, 200, 300, 400, 500
                ],
                data: [],
                exportTable: {
                    pdfHeading: [{
                            title: 'Date',
                            dataKey: 'edt'
                        },
                        {
                            title: 'Sr no',
                            dataKey: 'srno'
                        },
                        {
                            title: 'Credit',
                            dataKey: 'crd'
                        },
                        {
                            title: 'Debit',
                            dataKey: 'dbt'
                        },
                        {
                            title: 'Pts',
                            dataKey: 'amt'
                        },
                        {
                            title: 'Remark',
                            dataKey: 'rem'
                        }
                    ],
                    excelHeading: {
                        'Date': 'edt',
                        'Sr no': 'srno',
                        'Credit': 'crd',
                        'Debit': 'dbt',
                        'Pts': 'amt',
                        'Remark': 'rem'
                    }
                },
                loading: false,
                gameDetail: {},
                gameSoda: [],
                battlePlayers: null,
                dreamPlayers: null,
                tpCasinoList: null
            }
        },
        computed: {
            reportData() {
                var self = this
                var results = _.filter(this.data, function (item) {
                    return _.some(item, v => _.includes(v.toString().toLowerCase(), self.searchText))
                });
                this.page.totalPages = Math.ceil(results.length / this.page.perPage);
                if (this.page.currunt > this.page.totalPages) {
                    this.page.currunt = 1
                }
                return this.paginate(results)
            },
        },
        watch: {
            searchText() {
                // console.log('change')
                // this.page.currunt = 1
                // this.page.data = this.paginate(this.reportData)
                this.page.totalPages = Math.ceil(this.data.length / this.page.perPage);
                // console.log(this.page.totalPages, this.page.currunt)

            }
        },
        methods: {
            generatePdf() {
                if (this.data && this.data.length) {
                    const doc = new jsPDF()
                    var header = function (data) {
                        doc.setFontSize(16);
                        doc.text("Account Statement", data.settings.margin.left, 20);
                    };
                    doc.autoTable(this.exportTable.pdfHeading, this.data, {
                        margin: {
                            top: 25
                        },
                        didDrawPage: header
                    })
                    doc.save('Account Statement.pdf')
                }
            },
            changeDateFormat(date) {
                return moment(String(date)).format('DD/MM/YYYY')
            },
            changeDateTimeFormat(date) {
                return moment(String(date), 'MM-DD-YYYY hh:mm:ss A').format('DD/MM/YYYY HH:mm:ss')
            },
            showModal(gmid, mid, gtype, dtype, popup, winloss) {
                if (popup == 1) {
                    if (this.loading)
                        return
                    this.loading = true
                    if (gtype == 'tcp') {
                        // console.log(gmid, mid, gtype, dtype, popup)
                        ServiceApi.callApi("api/front/tpcasinolist", {})
                            .then(response => {
                                if (response.status == 200) {
                                    this.tpCasinoList = response.data
                                   //  this.tpCasinoList.push({"cname":"Ludo Lands","gtype":"ludo-lands"})

                                    Vue.set(this.gameDetail, 'gType', gtype)
                                    Vue.set(this.gameDetail, 'dType', dtype)
                                    this.$refs['detail-modal'].show()
                                    this.loading = false
                                } else {
                                    this.tpCasinoList = []
                                    this.loading = false
                                }
                            })
                            .catch(e => {
                                this.tpCasinoList = []
                                this.loading = false
                            });
                    } else {
                        ServiceApi.callApi("api/front/accstatepopup", {
                                'gmid': gmid,
                                'mid': mid,
                                'gtype': gtype,
                                'dtype': dtype
                            })
                            .then(response => {
                                if (response.status == 200) {
                                    this.gameDetail = _.get(response.data, 't1') ? _.get(response.data, 't1') : {}
                                    Vue.set(this.gameDetail, 'gType', gtype)
                                    Vue.set(this.gameDetail, 'dType', dtype)
                                    // Vue.set(this.gameDetail, 'winloss', winloss)
                                    this.gameSoda = _.get(response.data, 't2') ? _.get(response.data, 't2') : []

                                    if (this.gameSoda)
                                        this.$refs['detail-modal'].show()
                                    this.loading = false
                                } else {
                                    this.gameDetail = {}
                                    this.gameSoda = []
                                    this.loading = false
                                }
                            })
                            .catch(e => {
                                this.gameDetail = {}
                                this.gameSoda = []
                                this.loading = false
                            });
                    }
                }
            },
            getBattlePlayerList(data) {
                this.battlePlayers = null
                ServiceApi.callApi("api/front/accdabaplayers", {
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
                ServiceApi.callApi("api/front/accdreambet", {
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
            disabledFromDate(date) {
                const today = new Date(moment().tz(DEFAULT_TIMEZONE).format("YYYY/MM/DD"));
                const beforeOneMonth = new Date(moment().tz(DEFAULT_TIMEZONE).subtract(1, 'months').format("YYYY/MM/DD"))
                today.setHours(0, 0, 0, 0);

                return date >= this.params.dateTo || date > today || date < beforeOneMonth;
            },
            disabledToDate(date) {
                const today = new Date(moment().tz(DEFAULT_TIMEZONE).format("YYYY/MM/DD"));
                const beforeOneMonth = new Date(moment().tz(DEFAULT_TIMEZONE).subtract(1, 'months').format("YYYY/MM/DD"))
                today.setHours(0, 0, 0, 0);

                return date <= this.params.dateFrom || date > today || date < beforeOneMonth;
            },
            loadReport() {
                this.searchText = ''
                if (this.loading)
                    return
                this.loading = true
                this.data = []

                ServiceApi.callApi("api/front/accountstatement", this.params)
                    .then(response => {
                        if (response.status == 200) {
                            let table1 = _.get(_.get(response, 'data'), 't1')
                            let table2 = _.get(_.get(response, 'data'), 't2')
                            this.data = []
                            let op = table1.ope
                            let balance = op

                            this.data.push({
                                crd: op >= 0 ? op : '',
                                dbt: op < 0 ? op : '',
                                amt: op,
                                srno: 1,
                                winloss: 0,
                                dserver: '',
                                edt: moment(String(this.params.dateFrom), 'MM/DD/YYYY').format(
                                    'DD/MM/YYYY'),
                                gmid: 0,
                                gtype: "",
                                mid: 0,
                                rem: 'Opening Pts',
                                rpopup: 0
                            })

                            const self = this
                            if (table2 && table2.length) {
                                _.forEach(table2, function (value, key) {
                                    // console.log(value,key+2);
                                    balance += value.amt
                                    self.data.push({
                                        crd: value.amt >= 0 ? value.amt : '',
                                        dbt: value.amt < 0 ? value.amt : '',
                                        amt: parseFloat(balance).toFixed(2),
                                        srno: key + 2,
                                        winloss: value.amt,
                                        edt: moment(String(value.edt), 'MM/DD/YYYY').format('DD/MM/YYYY'),
                                        gmid: value.gmid,
                                        gtype: value.gtype,
                                        mid: value.mid,
                                        rem: value.rem,
                                        dserver: value.dserver,
                                        rpopup: value.rpopup
                                    })
                                });
                            }
                            // console.log(balance)
                            // this.page.currunt = 1
                            this.page.totalPages = Math.ceil(this.data.length / this.page.perPage);
                            if (this.page.currunt > this.page.totalPages) {
                                this.page.currunt = 1
                            }
                            this.loading = false
                        } else {
                            this.data = []
                            this.page.currunt = 1
                            this.page.totalPages = 0
                            this.loading = false
                            this.$bvToast.toast(response.msg, {
                                variant: 'danger',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                        }
                    })
                    .catch(e => {
                        this.data = []
                        this.page.currunt = 1
                        this.page.totalPages = 0
                        this.loading = false
                    });
            },

            prevPage() {
                if (this.page.currunt > 1) {
                    this.page.currunt--
                    // this.page.data = this.paginate(this.reportData)
                }
            },
            nextPage() {
                if (this.page.currunt < this.page.totalPages) {
                    this.page.currunt++
                    // this.page.data = this.paginate(this.reportData)
                }
            },
            firstPage() {
                this.page.currunt = 1
                // this.page.data = this.paginate(this.reportData)
            },
            lastPage() {
                this.page.currunt = this.page.totalPages
                // this.page.data = this.paginate(this.reportData)
            },
            changePage(page) {
                this.page.currunt = page
                // this.page.data = this.paginate(this.reportData)
            },
            changePerPage(event) {
                // console.log(event.target.value)
                // this.page.currunt = 1
                this.page.totalPages = Math.ceil(this.data.length / this.page.perPage);
                if (this.page.currunt > this.page.totalPages) {
                    this.page.currunt = 1
                }
            },
            paginate(array) {
                let curruntPage = this.page.currunt - 1 // because pages logically start with 1, but technically with 0
                return array.slice(curruntPage * this.page.perPage, (curruntPage + 1) * this.page.perPage);
            },
        }
    }
</script>