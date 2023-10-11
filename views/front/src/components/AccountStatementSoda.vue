<template>
    <div v-if="soda && soda.length">
        <div class="mt-2">
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" class="custom-control-input" id="soda-all" name="example" value="all"
                    @change="changeType($event)" checked>
                <label class="custom-control-label" for="soda-all">All</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" class="custom-control-input" id="soda-back" name="example" value="back"
                    @change="changeType($event)">
                <label class="custom-control-label" for="soda-back">Back</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" class="custom-control-input" id="soda-lay" name="example" value="lay"
                    @change="changeType($event)">
                <label class="custom-control-label" for="soda-lay">Lay</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" class="custom-control-input" id="soda-deleted" name="example" value="deleted"
                    @change="changeType($event)">
                <label class="custom-control-label" for="soda-deleted">Deleted</label>
            </div>
            <div class="custom-control-inline total-soda">
                <div>Total Bets: <span class="text-success mr-2">{{ sodaTotal }}</span> Total Win: <span
                        :class="{'text-success':winTotal >= 0, 'text-danger': winTotal < 0}"
                        v-currency="winTotal"></span></div>
            </div>
        </div>
        <div class="table-responsive report-table-modal  mt-2 report-table">
            <table class="table" :class="{'kbc-soda-table': gtype == 'kbc'}">
                <thead>
                    <tr>
                        <th class="bet-nation">
                            <div>Nation</div>
                        </th>
                        <th class="text-right bet-user-rate">
                            <div>Rate</div>
                        </th>
                        <th class="text-right bet-user-rate" v-if="isDtypeSS">
                            <div>Bhav</div>
                        </th>
                        <th class="text-right bet-amount">
                            <div>Amount</div>
                        </th>
                        <th class="text-right bet-amount">
                            <div>Win</div>
                        </th>
                        <th class="bet-date">
                            <div>Date</div>
                        </th>
                        <th class="bet-ip">
                            <div>Ip Address</div>
                        </th>
                        <th class="bet-remark">
                            <div>Browser Details</div>
                        </th>
                        <!-- <th class="bet-amount text-right">
                            <div>Action</div>
                        </th> -->
                    </tr>
                </thead>
                <tbody>
                    <template v-if="sodaList && sodaList.length">
                        <template v-for="(data, key) in sodaList">
                            <tr :class="[{'back-border':data.btype.toLowerCase() == 'back' && $route.name != 'andarBahar'}, 
                                {'lay-border':data.btype.toLowerCase() == 'lay' && $route.name != 'andarBahar'}]"
                                :key="key">
                                <td class="bet-nation">
                                    <div>
                                        <b-form-checkbox class="d-inline-block vm" :value="key" v-model="selected">
                                        </b-form-checkbox>
                                        <a v-if="data.natjson" href="javascript:void(0)" class="pointer text-yellow"
                                            @click="toggleDiv(key)"><u>{{ data.nat }} [+]</u></a>
                                        <span class="d-inline" v-else>{{ data.nat }}</span>
                                    </div>
                                </td>
                                <td class="text-right bet-user-rate">
                                    <div>{{ data.urate }}</div>
                                </td>
                                <td class="text-right bet-user-rate" v-if="isDtypeSS">
                                    <div v-if="data.bhav != ''">{{ data.bhav }}</div>
                                    <div v-else>-</div>
                                </td>
                                <td class="text-right bet-amount">
                                    <div v-currency="data.amt">{{ data.amt }}</div>
                                </td>
                                <td class="text-right bet-amount">
                                    <div v-if="data.match" v-currency="data.wl">{{ data.wl }}</div>
                                    <div v-else>-</div>
                                </td>
                                <td class="bet-date">
                                    <div>{{ changeDateFormat(data.pdt) }}</div>
                                </td>
                                <td class="bet-ip">
                                    <div>{{ data.ip }}</div>
                                </td>
                                <td class="bet-remark">
                                    <u v-b-tooltip.hover :title="data.bdetail">Detail</u>
                                </td>
                                <!-- <td class="bet-amount text-right">
                                    <b-form-checkbox :value="key" v-model="selected"></b-form-checkbox>
                                </td> -->
                            </tr>
                            <tr :key="`detail-${key}`" v-if="data.natjson && showDesc === key">
                                <td colspan="7">
                                    <div class="kbc-result-box">
                                        <template v-for="(nat, key1) in data.natjson">
                                            <div class="casino-box-row" :key="key1">
                                                <div class="question-name">
                                                    <b>{{`[Q${key1+1}]`}} {{ nat.n }}</b>
                                                </div>
                                                <div class="answer-name" :class="{'true': rdesc[key1] == nat.c[0].s, 'false': rdesc[key1] != nat.c[0].s}">{{ nat.c[0].s }}</div>
                                            </div>
                                        </template>
                                        <template v-if="data.bhav">
                                            <div class="casino-box-row">
                                                <div class="kbchf">
                                                    <div class="kbc-result-box-half" v-if="data.bhav == 1">4 Cards Quit</div>
                                                    <div class="kbc-result-box-full" v-else-if="data.bhav == 2">50-50 Quit</div>
                                                    <div class="kbc-result-box-five" v-else-if="data.bhav == 3">5 Cards</div>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </template>
                    <template v-else>
                        <tr class="no-record">
                            <td colspan="7">No records found</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        props: ['gameSoda', 'isDtypeSS', 'desc', 'gtype'],
        mounted() {
            if (this.gameSoda && this.gameSoda.length) {
                this.soda = this.gameSoda.sort(function (a, b) {
                    return new Date(a.pdt) - new Date(b.pdt);
                })
            }
            this.calculateTotalWin();
            if(this.desc){
                this.rdesc = this.desc.replace(/ /g, "");
                this.rdesc = this.rdesc.split("#")
            }
            // console.log(this.rdesc)
        },
        data() {
            return {
                betType: 'all',
                winTotal: 0,
                sodaTotal: 0,
                selected: [],
                soda: [],
                rdesc: null,
                showDesc: null
            }
        },
        computed: {
            sodaList() {
                if (this.betType == 'all')
                    return _.filter(this.soda, {
                        'match': true
                    });
                else if (this.betType == 'back')
                    return _.filter(this.soda, {
                        'btype': 'back',
                        'match': true
                    });
                else if (this.betType == 'lay')
                    return _.filter(this.soda, {
                        'btype': 'lay',
                        'match': true
                    });
                else if (this.betType == 'deleted')
                    return _.filter(this.soda, {
                        'match': false
                    });
                else
                    return []
            }
        },
        watch: {
            selected() {
                let self = this;
                if (this.selected.length > 0) {
                    this.winTotal = 0;
                    this.sodaTotal = 0;
                    _.forEach(this.sodaList, (o, key) => {
                        if (self.selected.includes(key)) {
                            this.winTotal += o.wl;
                            this.sodaTotal++;
                        }
                    });
                } else {
                    this.calculateTotalWin();
                }
            }
        },
        methods: {
            toggleDiv(key) {
                if (this.showDesc === key) {
                    this.showDesc = null
                } else {
                    this.showDesc = key
                }
            },
            changeDateFormat(date) {
                return moment(String(date), 'MM-DD-YYYY hh:mm:ss A').format('DD/MM/YYYY HH:mm:ss')
            },
            changeType(event) {
                // console.log(event.target.value)
                this.selected = []
                this.betType = event.target.value
                this.calculateTotalWin();
            },
            calculateTotalWin() {
                if (this.sodaList && this.betType != 'deleted') {
                    this.sodaTotal = this.sodaList.length;
                    this.winTotal = _.sumBy(this.sodaList, function (o) {
                        return o.wl;
                    });
                }
                if (this.betType == 'deleted') {
                    this.sodaTotal = 0
                    this.winTotal = 0
                }
            }
        }
    }
</script>