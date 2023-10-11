<template>
    <div class="report-box">
        <div class="report-title">
            <div class="report-name">Current Bets</div>
            <div class="report-search search-box">
                <div class="form-group mb-0">
                    <input type="text" v-model="searchText" placeholder="Search" class="form-control">
                    <img :src="imgPath + 'front/img/search.svg'" class="search-icon">
                </div>
            </div>
        </div>
        <div class="casino-report-tabs">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link" :class="{'active': reportType == 1}" data-toggle="tab"
                        @click="changeReportType(1)" href="javascript:void(0)">Sports</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{'active': reportType == 2}" data-toggle="tab"
                        @click="changeReportType(2)" href="javascript:void(0)">Casino</a>
                </li>
            </ul>
        </div>
        <div class="report-form">
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" class="custom-control-input" id="customRadio" name="example" value="matchbet"
                    @change="chageGameType('matchbet')" :checked="gameType == 'matchbet'">
                <label class="custom-control-label" for="customRadio">Matched</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" class="custom-control-input" id="customRadio2" name="example" value="deletebet"
                    @change="chageGameType('deletebet')" :checked="gameType == 'deletebet'">
                <label class="custom-control-label" for="customRadio2">Deleted</label>
            </div>
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
            <div class="bet-types-container">
                <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" class="custom-control-input" id="soda-all" name="betType" value="all"
                        @change="changeType($event)" :checked="betType == 'all'">
                    <label class="custom-control-label" for="soda-all">All</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" class="custom-control-input" id="soda-back" name="betType" value="back"
                        @change="changeType($event)" :checked="betType == 'back'">
                    <label class="custom-control-label" for="soda-back">Back</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" class="custom-control-input" id="soda-lay" name="betType" value="lay"
                        @change="changeType($event)" :checked="betType == 'lay'">
                    <label class="custom-control-label" for="soda-lay">Lay</label>
                </div>
            </div>
            <div class="custom-control-inline">
                <div>Total Bets: <span class="mr-2">{{ reportTotal }}</span> Total Amount: <span v-currency="winTotal"></span></div>
            </div>
            <div class="file-icons">
                <div @click="generatePdf()">
                    <i class="fas fa-file-pdf" :class="{'disabled': !(this.data && this.data.length)}"></i>
                </div>
                <JsonExcel :fields="exportTable.excelHeading" :data="data" :name="reportType == 1 ? 'Sports Current Bets.xls' : 'Casino Current Bets.xls'">
                    <i class="fas fa-file-excel" :class="{'disabled': !(this.data && this.data.length)}"></i>
                </JsonExcel>
            </div>
        </div>
        <div class="report-table current-bets table-responsive" :class="{ 'loader-section-parent' : loading}">
            <Loader :isVisible="loading"></Loader>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="bet-sport" v-if="reportType == 1">Sports</th>
                        <th class="bet-event-name">Event Name</th>
                        <th class="bet-nation" v-if="reportType == 1">Market Name</th>
                        <th class="bet-market-name">Nation</th>
                        <th class="text-right bet-user-rate">User Rate</th>
                        <th class="text-right bet-amount">Amount</th>
                        <th class="bet-date">Place Date</th>
                        <th class="text-right bet-user-rate">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="reportData && reportData.length">
                        <template v-for="(data, key) in reportData">
                            <tr :class="[{'back-border': data.btype.toLowerCase() == 'back'}, {'lay-border': data.btype.toLowerCase() == 'lay'}]"
                                :key="key">
                                <td class="bet-sport" v-if="reportType == 1">
                                    <div>{{ data.etype }}</div>
                                </td>
                                <td class="bet-event-name">
                                    <div class="ifTooltip">{{ data.ename }}</div>
                                </td>
                                <td class="bet-nation" v-if="reportType == 1">
                                    <div class="ifTooltip">{{ data.mname }}</div>
                                </td>
                                <td class="bet-market-name">
                                    <div class="ifTooltip">{{ data.nat }}</div>
                                </td>
                                <td class="text-right bet-user-rate">
                                    <div>{{ data.urate }}</div>
                                </td>
                                <td class="text-right bet-amount">
                                    <div v-currency="data.amt">{{ data.amt }}</div>
                                </td>
                                <td class="bet-date">
                                    <div>{{ data.pdt }}</div>
                                </td>
                                <td class="text-right bet-user-rate">
                                    <b-form-checkbox :value="key" v-model="selected"></b-form-checkbox>
                                </td>
                            </tr>
                        </template>
                    </template>
                    <template v-else>
                        <tr class="no-record">
                            <td :colspan="reportType == 1 ? 8 : 6">No records found</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <!-- <div class="report-table d-none-desktop" :class="{ 'loader-section-parent' : loading}">
            <Loader :isVisible="loading"></Loader>
            <template v-if="reportData && reportData.length">
                <template v-for="(data, key) in reportData">
                    <div class="report-row"
                        :class="[{'back-border': data.btype.toLowerCase() == 'back'}, {'lay-border': data.btype.toLowerCase() == 'lay'}]"
                        :key="key">
                        <div v-if="reportType == 1">
                            <span class="bet-heading">Sports</span>
                            <span>{{ data.etype }}</span>
                        </div>
                        <div>
                            <span class="bet-heading">Event Name</span>
                            <span>{{ data.ename }}</span>
                        </div>
                        <div v-if="reportType == 1">
                            <span class="bet-heading">Market Name</span>
                            <span>{{ data.mname }}</span>
                        </div>
                        <div>
                            <span class="bet-heading">Nation</span>
                            <span>{{ data.nat }}</span>
                        </div>
                        <div>
                            <span class="bet-heading">User Rate</span>
                            <span>{{ data.urate }}</span>
                        </div>
                        <div>
                            <span class="bet-heading">Amount</span>
                            <span v-currency="data.amt">{{ data.amt }}</span>
                        </div>
                        <div>
                            <span class="bet-heading">Place Date</span>
                            <span>{{ data.pdt }}</span>
                        </div>
                        <div>
                            <span class="bet-heading">Action</span>
                            <b-form-checkbox :value="key" v-model="selected"></b-form-checkbox>
                        </div>
                    </div>
                </template>
            </template>
            <template v-else>
                <div class="report-row no-record">No records found</div>
            </template>
        </div> -->

        <paginate v-if="page.totalPages > 0" v-model="page.currunt" :pageCount="page.totalPages" :clickHandler="changePage" :prevText="'<'"
            :nextText="'>'" :container-class="'pagination justify-content-center mt-2'" :page-class="'page-item'"
            :page-link-class="'page-link'" :prev-class="'page-item'" :prev-link-class="'page-link'"
            :next-class="'page-item'" :next-link-class="'page-link'" :first-last-button="true" :first-button-text="'<<'"
            :last-button-text="'>>'">
        </paginate>
    </div>
</template>

<script>
    import ServiceApi from "@/services/ServiceApi";
    import moment from 'moment-timezone'
    // moment.tz.setDefault("Asia/Calcutta");
    import jsPDF from 'jspdf'
    import 'jspdf-autotable'
    import JsonExcel from 'vue-json-excel'
    import Loader from '@/components/loader'

    export default {
        components: {
            JsonExcel,
            Loader
        },
        mounted() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            this.loading = true
            ServiceApi.callApi("api/front/currentbets", {
                    gtype: 1,
                    type: 'matchbet'
                })
                .then(response => {
                    if (response.status == 200) {
                        if (response.data && response.data.length) {
                            const self = this
                            _.forEach(response.data, function (value) {
                                self.data.push({
                                    amt: value.amt,
                                    btype: value.btype,
                                    bv: value.bv,
                                    ename: value.ename,
                                    etype: value.etype,
                                    gtype: value.gtype,
                                    mname: value.mname,
                                    nat: value.gtype == 'fancy' && value.gtype == 'khado' ? `${value.nat} / ${value.bv}` :
                                        value.nat,
                                    pdt: self.changeDateTimeFormat(value.pdt),
                                    urate: value.urate
                                })
                            })
                        }
                        this.calculateTotalWin(this.data);
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
                    }
                })
                .catch(e => {
                    this.data = []
                    this.page.currunt = 1
                    this.page.totalPages = 0
                    this.loading = false
                });
        },
        data() {
            return {
                imgPath: IMG_PATH,
                searchText: '',
                page: {
                    perPage: 25,
                    currunt: 1,
                    totalPages: 0
                },
                perPage: [
                    10, 25, 50, 100, 200, 300, 400, 500
                ],
                reportType: 1,
                gameType: 'matchbet',
                data: [],
                exportTable: {
                    pdfHeading: [{
                            title: 'Sports',
                            dataKey: 'etype'
                        },
                        {
                            title: 'Event Name',
                            dataKey: 'ename'
                        },
                        {
                            title: 'Market Name',
                            dataKey: 'mname'
                        },
                        {
                            title: 'Nation',
                            dataKey: 'nat'
                        },
                        {
                            title: 'Type',
                            dataKey: 'btype'
                        },
                        {
                            title: 'User Rate',
                            dataKey: 'urate'
                        },
                        {
                            title: 'Amount',
                            dataKey: 'amt'
                        },
                        {
                            title: 'Place Date',
                            dataKey: 'pdt'
                        }
                    ],
                    excelHeading: {
                        'Sports': 'etype',
                        'Event Name': 'ename',
                        'Market Name': 'mname',
                        'Nation': 'nat',
                        'Type': 'btype',
                        'User Rate': 'urate',
                        'Amount': 'amt',
                        'Place Date': 'pdt'
                    }
                },
                betType: 'all',
                winTotal: 0,
                reportTotal:0,
                selected: [],
                loading: false
            }
        },
        computed: {
            reportData() {
                var data = []
                if (this.betType == 'all')
                    data = this.data;
                else if (this.betType == 'back')
                    data = _.filter(this.data, {
                        'btype': 'back'
                    });
                else if (this.betType == 'lay')
                    data = _.filter(this.data, {
                        'btype': 'lay'
                    });

                if(this.selected.length == 0){
                    this.calculateTotalWin(data)
                }

                var self = this
                var results = _.filter(data, function (item) {
                    return _.some(item, v => _.includes(v.toString().toLowerCase(), self.searchText))
                });
                this.page.totalPages = Math.ceil(results.length / this.page.perPage);
                if(this.page.currunt > this.page.totalPages){
                    this.page.currunt = 1
                }
                return this.paginate(results)
            }
        },
        watch: {
            searchText() {
                // console.log('change')
                // this.page.currunt = 1
                this.selected = []
                // this.page.data = this.paginate(this.reportData)
                this.page.totalPages = Math.ceil(this.data.length / this.page.perPage);
            },
            selected() {
                let self = this;
                if(this.selected.length > 0){
                    this.winTotal = 0;
                    this.reportTotal = 0;
                    _.forEach(this.reportData, (o,key) => {
                        if(self.selected.includes(key)){
                            this.winTotal +=  o.amt;
                            this.reportTotal++;
                        }
                    });
                }else{
                    this.winTotal = 0
                    this.reportTotal = 0
                }
            }
        },
        methods: {
            changeReportType(type) {
                this.data = []
                this.resetFilters()
                this.reportType = type
                this.gameType = 'matchbet'
                this.loadReport('matchbet')
            },
            chageGameType(type) {
                this.data = []
                this.resetFilters()
                this.gameType = type
                this.loadReport(type)
            },
            calculateTotalWin(data){
                if(data){
                    this.reportTotal = data.length;
                    this.winTotal = _.sumBy(data, function (o) {
                        return o.amt;
                    });
                }
            },
            changeType(event) {
                this.page.currunt = 1
                this.selected = []
                this.betType = event.target.value
                // this.calculateTotalWin();
            },
            generatePdf() {
                if (this.data && this.data.length) {
                    const doc = new jsPDF()
                    var dockTitle = this.reportType == 1 ? 'Sports Current Bets' : 'Casino Current Bets'
                    var header = function (data) {
                        doc.setFontSize(16);
                        doc.text(dockTitle, data.settings.margin.left, 20);
                    };
                    doc.autoTable(this.exportTable.pdfHeading,this.data, {margin: {top: 25}, didDrawPage: header})
                    var dockFileName = this.reportType == 1 ? 'Sports Current Bets.pdf' : 'Casino Current Bets.pdf'
                    doc.save(dockFileName)
                }
            },
            changeDateTimeFormat(date) {
                var day = moment(String(date), "MM-DD-YYYY hh:mm:ss A");
                var time = day.format("DD/MM/YYYY HH:mm:ss")
                return time
            },
            loadReport(type) {
                this.searchText = ''
                this.loading = true
                this.data = []
                ServiceApi.callApi("api/front/currentbets", {
                        gtype: this.reportType,
                        type: type
                    })
                    .then(response => {
                        if (response.status == 200) {
                            if (response.data && response.data.length) {
                                const self = this
                                _.forEach(response.data, function (value) {
                                    if(self.reportType == 1){
                                        
                                        self.exportTable = {
                                            pdfHeading: [{
                                                    title: 'Sports',
                                                    dataKey: 'etype'
                                                },
                                                {
                                                    title: 'Event Name',
                                                    dataKey: 'ename'
                                                },
                                                {
                                                    title: 'Market Name',
                                                    dataKey: 'mname'
                                                },
                                                {
                                                    title: 'Nation',
                                                    dataKey: 'nat'
                                                },
                                                {
                                                    title: 'Type',
                                                    dataKey: 'btype'
                                                },
                                                {
                                                    title: 'User Rate',
                                                    dataKey: 'urate'
                                                },
                                                {
                                                    title: 'Amount',
                                                    dataKey: 'amt'
                                                },
                                                {
                                                    title: 'Place Date',
                                                    dataKey: 'pdt'
                                                }
                                            ],
                                            excelHeading: {
                                                'Sports': 'etype',
                                                'Event Name': 'ename',
                                                'Market Name': 'mname',
                                                'Nation': 'nat',
                                                'Type': 'btype',
                                                'User Rate': 'urate',
                                                'Amount': 'amt',
                                                'Place Date': 'pdt'
                                            }
                                        }

                                        self.data.push({
                                            amt: value.amt,
                                            btype: value.btype,
                                            bv: value.bv,
                                            ename: value.ename,
                                            etype: value.etype,
                                            gtype: value.gtype,
                                            mname: value.mname,
                                            nat: value.gtype == 'fancy' && value.gtype == 'khado' ? `${value.nat} / ${value.bv}` :
                                                value.nat,
                                            pdt: self.changeDateTimeFormat(value.pdt),
                                            urate: value.urate
                                        })
                                    }else if(self.reportType == 2){
                                        
                                        self.exportTable = {
                                            pdfHeading: [
                                                {
                                                    title: 'Event Name',
                                                    dataKey: 'ename'
                                                },
                                                {
                                                    title: 'Nation',
                                                    dataKey: 'nat'
                                                },
                                                {
                                                    title: 'Type',
                                                    dataKey: 'btype'
                                                },
                                                {
                                                    title: 'User Rate',
                                                    dataKey: 'urate'
                                                },
                                                {
                                                    title: 'Amount',
                                                    dataKey: 'amt'
                                                },
                                                {
                                                    title: 'Place Date',
                                                    dataKey: 'pdt'
                                                }
                                            ],
                                            excelHeading: {
                                                'Event Name': 'ename',
                                                'Nation': 'nat',
                                                'Type': 'btype',
                                                'User Rate': 'urate',
                                                'Amount': 'amt',
                                                'Place Date': 'pdt'
                                            }
                                        }

                                        self.data.push({
                                            amt: value.amt,
                                            btype: value.btype,
                                            ename: value.ename,
                                            gtype: value.gtype,
                                            mname: value.mname,
                                            nat: value.nat,
                                            pdt: self.changeDateTimeFormat(value.pdt),
                                            urate: value.urate
                                        })
                                    }
                                })
                            }
                            this.calculateTotalWin(this.data);
                            // this.data = response.data
                            this.page.totalPages = Math.ceil(this.data.length / this.page.perPage);
                            if(this.page.currunt > this.page.totalPages){
                                this.page.currunt = 1
                            }
                            this.loading = false
                        } else {
                            this.data = []
                            this.calculateTotalWin(this.data);
                            this.page.currunt = 1
                            this.page.totalPages = 0
                            this.loading = false
                        }
                    })
                    .catch(e => {
                        this.data = []
                        this.calculateTotalWin(this.data);
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
                // this.calculateTotalWin();
            },
            paginate(array) {
                let curruntPage = this.page.currunt - 1 // because pages logically start with 1, but technically with 0
                return array.slice(curruntPage * this.page.perPage, (curruntPage + 1) * this.page.perPage);
            },

            resetFilters(){
                this.betType = 'all'
                this.winTotal = 0
                this.reportTotal = 0
                this.selected = []
                this.page.currunt = 1
            }
        }
    }
</script>