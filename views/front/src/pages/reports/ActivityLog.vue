<template>
    <div class="report-box">
        <div class="report-title">
            <div class="report-name">Activity Log</div>
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
                <select class="form-control" v-model="params.type" @change="data = []">
                    <option value="endlogin">Login</option>
                    <option value="password">Change Password</option>
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
                <JsonExcel :fields="exportTable.excelHeading" :data="data" name="Activity Log.xls">
                    <i class="fas fa-file-excel" :class="{'disabled': !(this.data && this.data.length)}"></i>
                </JsonExcel>
            </div>
        </div>
        <div class="report-table d-none-mobile" :class="{ 'loader-section-parent' : loading}">
            <!-- <div class="loader-section" v-if="loading">
                <div class="loader-section-icon"></div>
            </div> -->
            <Loader :isVisible="loading"></Loader>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="bet-event-name">
                            <div>Username</div>
                        </th>
                        <th class="bet-date">
                            <div>Date</div>
                        </th>
                        <th class="bet-ip">
                            <div>Ip Address</div>
                        </th>
                        <th class="bet-remark" v-if="params.type == 'password'">
                            <div>Browser Detail</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="reportData && reportData.length">
                        <template v-for="(data, key) in reportData">
                            <tr :key="key">
                                <td class="bet-event-name">
                                    <div>{{ data.uname }}</div>
                                </td>
                                <td class="bet-date">
                                    <div>{{ data.edt }}</div>
                                </td>
                                <td class="bet-ip">
                                    <div @click="getIpDetail(data.ip)">{{ data.ip }}
                                        <i class="fas fa-eye ml-2"></i>
                                    </div>
                                </td>
                                <td class="bet-remark" v-if="params.type == 'password'">
                                    <u v-b-tooltip.hover :title="data.bdetail">Detail</u>
                                </td>
                            </tr>
                        </template>
                    </template>
                    <template v-else>
                        <tr class="no-record">
                            <td :colspan="params.type == 'endlogin' ? 3 : 4">No records found</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <div class="report-table d-none-desktop" :class="{ 'loader-section-parent' : loading}">
            <!-- <div class="loader-section" v-if="loading">
                <div class="loader-section-icon"></div>
            </div> -->
            <Loader :isVisible="loading"></Loader>
            <template v-if="reportData && reportData.length">
                <template v-for="(data, key) in reportData">
                    <div class="report-row" :key="key">
                        <div>
                            <span class="bet-heading">Username</span>
                            <span>{{ data.uname }}</span>
                        </div>
                        <div>
                            <span class="bet-heading">Date</span>
                            <span>{{ data.edt }}</span>
                        </div>
                        <div>
                            <span class="bet-heading">Ip Address</span>
                            <span class="bet-ip" @click="getIpDetail(data.ip)">
                                {{ data.ip }} <i class="fas fa-eye ml-2"></i>
                            </span>
                        </div>
                        <div v-if="params.type == 'password'">
                            <span class="bet-heading">Browser Detail</span>
                            <span><u v-b-tooltip.hover :title="data.bdetail">Detail</u></span>
                        </div>
                    </div>
                </template>
            </template>
            <template v-else>
                <div class="report-row no-record">No records found</div>
            </template>
        </div>

        <paginate v-if="page.totalPages > 0" v-model="page.currunt" :pageCount="page.totalPages" :clickHandler="changePage" :prevText="'<'"
            :nextText="'>'" :container-class="'pagination justify-content-center mt-2'" :page-class="'page-item'"
            :page-link-class="'page-link'" :prev-class="'page-item'" :prev-link-class="'page-link'"
            :next-class="'page-item'" :next-link-class="'page-link'" :first-last-button="true" :first-button-text="'<<'"
            :last-button-text="'>>'">
        </paginate>

        <b-modal ref="ipdetail-modal" hide-footer title="IP Detail" @hide="ipDetail = null">
            <div class="ip-detail" v-if="ipDetail">
                <div class="ip-detail-row">
                    <div>IP:</div>
                    <div>{{ ipDetail.query }}</div>
                </div>
                <div class="ip-detail-row">
                    <div>City:</div>
                    <div>{{ ipDetail.city }}</div>
                </div>
                <div class="ip-detail-row">
                    <div>Country:</div>
                    <div>{{ ipDetail.country }}</div>
                </div>
                <!-- <div class="ip-detail-row">
                    <div>Asname</div>
                    <div>{{ ipDetail.asname }}</div>
                </div>
                <div class="ip-detail-row">
                    <div>City</div>
                    <div>{{ ipDetail.city }}</div>
                </div>
                <div class="ip-detail-row">
                    <div>Country</div>
                    <div>{{ ipDetail.country }}</div>
                </div>
                <div class="ip-detail-row">
                    <div>Country Code</div>
                    <div>{{ ipDetail.countryCode }}</div>
                </div>
                <div class="ip-detail-row">
                    <div>Hosting</div>
                    <div>{{ ipDetail.hosting }}</div>
                </div>
                <div class="ip-detail-row">
                    <div>ISP</div>
                    <div>{{ ipDetail.isp }}</div>
                </div>
                <div class="ip-detail-row">
                    <div>Lat</div>
                    <div>{{ ipDetail.lat }}</div>
                </div>
                <div class="ip-detail-row">
                    <div>Lon</div>
                    <div>{{ ipDetail.lon }}</div>
                </div>
                <div class="ip-detail-row">
                    <div>Mobile</div>
                    <div>{{ ipDetail.mobile }}</div>
                </div>
                <div class="ip-detail-row">
                    <div>Org</div>
                    <div>{{ ipDetail.org }}</div>
                </div>
                <div class="ip-detail-row">
                    <div>Proxy</div>
                    <div>{{ ipDetail.proxy }}</div>
                </div>
                <div class="ip-detail-row">
                    <div>Query</div>
                    <div>{{ ipDetail.query }}</div>
                </div>
                <div class="ip-detail-row">
                    <div>Region</div>
                    <div>{{ ipDetail.region }}</div>
                </div>
                <div class="ip-detail-row">
                    <div>Region Name</div>
                    <div>{{ ipDetail.regionName }}</div>
                </div>
                <div class="ip-detail-row">
                    <div>Reverse</div>
                    <div>{{ ipDetail.reverse }}</div>
                </div>
                <div class="ip-detail-row">
                    <div>Status</div>
                    <div>{{ ipDetail.status }}</div>
                </div>
                <div class="ip-detail-row">
                    <div>Timezone</div>
                    <div>{{ ipDetail.timezone }}</div>
                </div>
                <div class="ip-detail-row">
                    <div>Zip Code</div>
                    <div>{{ ipDetail.zip }}</div>
                </div> -->
            </div>
        </b-modal>

    </div>
</template>

<script>
    import ServiceApi from "@/services/ServiceApi";
    import DatePicker from 'vue2-datepicker'
    import CasinoResult from '@/components/casino/results/CasinoResults'
    import AccountStatementSoda from '@/components/AccountStatementSoda'
    import jsPDF from 'jspdf'
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
                imgPath: IMG_PATH,
                params: {
                    dateFrom: moment(new Date()).tz(DEFAULT_TIMEZONE).subtract(1, 'week').format("MM/DD/YYYY"),
                    dateTo: moment(new Date()).tz(DEFAULT_TIMEZONE).format("MM/DD/YYYY"),
                    type: "endlogin",
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
                    pdfHeading: [
                        {title: 'Username', dataKey: 'uname'},
                        {title: 'Date', dataKey: 'edt'}, 
                        {title: 'Ip Address', dataKey: 'ip'}
                    ],
                    excelHeading: {
                        'Username': 'uname',
                        'Date': 'edt',
                        'Ip Address': 'ip'
                    }
                },
                ipDetail: null,
                loading: false
            }
        },
        computed: {
            reportData() {
                var self = this
                var results = _.filter(this.data, function (item) {
                    return _.some(item, v => _.includes(v.toString().toLowerCase(), self.searchText))
                });
                this.page.totalPages = Math.ceil(results.length / this.page.perPage);
                if(this.page.currunt > this.page.totalPages){
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
            },
            'params.type': function (newVal, oldVal) {
                if (newVal == 'endlogin') {
                    this.exportTable.pdfHeading = [
                        {title: 'Username', dataKey: 'uname'},
                        {title: 'Date', dataKey: 'edt'}, 
                        {title: 'Ip Address', dataKey: 'ip'}
                    ]
                    this.exportTable.excelHeading = {
                        'Username': 'uname',
                        'Date': 'edt',
                        'Ip Address': 'ip'
                    }
                } else if (newVal == 'password') {
                    this.exportTable.pdfHeading = [
                        {title: 'Username', dataKey: 'uname'},
                        {title: 'Date', dataKey: 'edt'}, 
                        {title: 'Ip Address', dataKey: 'ip'},
                        {title: 'Browser Detail', dataKey: 'bdetail'}
                    ]
                    this.exportTable.excelHeading = {
                        'Username': 'uname',
                        'Date': 'edt',
                        'Ip Address': 'ip',
                        'Browser Detail': 'bdetail'
                    }
                }
            }
        },
        methods: {
            getIpDetail(ip) {
                ServiceApi.callApi("api/front/ipdetail", {
                        ip: ip
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.ipDetail = response.data
                            if(response.data.status == 'fail'){
                                this.$bvToast.toast("No Ip address details found!", {
                                    variant: 'danger',
                                    toaster: 'b-toaster-top-full',
                                    autoHideDelay: 3000,
                                })
                            }
                            else{
                                this.$refs['ipdetail-modal'].show()
                            }
                        } else {
                            this.ipDetail = null
                        }
                    })
                    .catch(e => {
                        this.ipDetail = null
                    });
            },
            generatePdf() {
                if (this.data && this.data.length) {
                    const doc = new jsPDF()
                    var header = function (data) {
                        doc.setFontSize(16);
                        doc.text("Activity Log", data.settings.margin.left, 20);
                    };
                    doc.autoTable(this.exportTable.pdfHeading,this.data, {margin: {top: 25}, didDrawPage: header})
                    doc.save('Activity Log.pdf')
                }
            },
            changeDateTimeFormat(date) {
                var day = moment(String(date), "MM-DD-YYYY hh:mm:ss A");
                var time = day.format("DD/MM/YYYY HH:mm:ss")
                return time
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
                ServiceApi.callApi("api/front/activity", this.params)
                    .then(response => {
                        if (response.status == 200) {
                            if(response.data && response.data.length){
                                const self = this
                                _.forEach(response.data, function (value) {
                                    if(self.params.type == 'endlogin'){
                                        self.data.push({
                                            edt: self.changeDateTimeFormat(value.edt),
                                            ip: value.ip,
                                            uname: value.uname
                                        })
                                    }else{
                                        self.data.push({
                                            bdetail: value.bdetail,
                                            edt: self.changeDateTimeFormat(value.edt),
                                            ip: value.ip,
                                            uname: value.uname
                                        })
                                    }
                                })
                            }
                            // this.data = response.data
                            this.page.totalPages = Math.ceil(this.data.length / this.page.perPage);
                            if(this.page.currunt > this.page.totalPages){
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
                if(this.page.currunt > this.page.totalPages){
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