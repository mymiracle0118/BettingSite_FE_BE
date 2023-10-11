<template>
    <div>
        <div>
            <template v-for="(casino, key) in tpCasinoList">
                <div class="custom-control custom-radio custom-control-inline" :key="key">
                    <input type="radio" class="custom-control-input" :id="casino.gtype" name="example"
                        :value="casino.gtype" @change="changeTpType($event)"
                        :checked="tpSelectedCasino == casino.gtype">
                    <label class="custom-control-label" :for="casino.gtype">{{ casino.cname }}</label>
                </div>
            </template>
            <!-- <div class="custom-control-inline total-soda">
                <div>Total Bets: <span class="text-success mr-2">{{ sodaTotal }}</span> Total Win: <span
                        :class="{'text-success':winTotal >= 0, 'text-danger': winTotal < 0}"
                        v-currency="winTotal"></span></div>
            </div> -->
        </div>
        <div :class="{ 'loader-section-parent' : loading}">
            <Loader :isVisible="loading"></Loader>
            <!-- BINARY -->
            <template v-if="tpSelectedCasino == 'binary'">
                <div class="table-responsive report-table report-table-modal mt-2">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="bet-event-name">
                                    <div>Market Name</div>
                                </th>
                                <th class="bet-sport">
                                    <div>Type</div>
                                </th>
                                <th class="bet-amount text-right">
                                    <div>Payout</div>
                                </th>
                                <th class="bet-amount text-right">
                                    <div>Amount</div>
                                </th>
                                <th class="bet-amount text-right">
                                    <div>Win/Loss</div>
                                </th>
                                <th class="bet-amount text-right">
                                    <div>Total</div>
                                </th>
                                <th class="bet-amount">
                                    <div>Time</div>
                                </th>
                                <th class="bet-amount">
                                    <div>Market Value</div>
                                </th>
                                <th class="bet-date">
                                    <div>Date</div>
                                </th>
                                <th class="bet-remark">
                                    <div>Reference Id</div>
                                </th>
                                <th class="bet-remark">
                                    <div>Transaction Id</div>
                                </th>
                                <!-- <th class="bet-amount text-right">
                                    <div>Action</div>
                                </th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="tpCasinoSoda && tpCasinoSoda.length">
                                <template v-for="(soda, key) in tpCasinoSoda">
                                    <tr :key="key">
                                        <td class="bet-event-name">
                                            <div>{{ soda.mname }}</div>
                                        </td>
                                        <td class="bet-sport">
                                            <div>{{ soda.ttype }}</div>
                                        </td>
                                        <th class="bet-amount text-right">
                                            <div>{{ soda.rate }}</div>
                                        </th>
                                        <td class="bet-amount text-right">
                                            <div>{{ soda.amt }}</div>
                                        </td>
                                        <th class="bet-amount text-right">
                                            <div>{{ soda.ttype.toLowerCase() == 'debit' ? 0 : soda.winloss }}</div>
                                        </th>
                                        <td class="bet-amount text-right">
                                            <div :class="[{'text-success':soda.total > 0},{'text-danger':soda.total <= 0}]">{{ soda.total }}</div>
                                        </td>
                                        <td class="bet-amount">
                                            <div>{{ `${soda.tslot} s` }}</div>
                                        </td>
                                        <td class="bet-amount">
                                            <div>{{ soda.mval }}</div>
                                        </td>
                                        <td class="bet-date">
                                            <div>{{ soda.edt }}</div>
                                        </td>
                                        <td class="bet-remark">
                                            <div class="ifTooltip">{{ soda.refid }}</div>
                                        </td>
                                        <td class="bet-remark">
                                            <div class="ifTooltip">{{ soda.tid }}</div>
                                        </td>
                                        <!-- <td class="bet-amount text-right">
                                        <b-form-checkbox :value="key" v-model="selected"></b-form-checkbox>
                                    </td> -->
                                    </tr>
                                </template>
                            </template>
                            <template v-else>
                                <tr class="no-record">
                                    <td colspan="11">No records found</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </template>
            <template v-else>
                <div class="table-responsive report-table report-table-modal mt-2">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="bet-event-name">
                                    <div>Game Name</div>
                                </th>
                                <th class="bet-sport">
                                    <div>Type</div>
                                </th>
                                <th class="bet-amount text-right" v-if="tpSelectedCasino == 'pop-the-ball'">
                                    <div>Rate</div>
                                </th>
                                <th class="bet-amount text-right">
                                    <div>Amount</div>
                                </th>
                                <th class="bet-amount text-right" v-if="tpSelectedCasino == 'pop-the-ball'">
                                    <div>Win/Loss</div>
                                </th>
                                <th class="bet-amount text-right">
                                    <div>Total</div>
                                </th>
                                <th class="bet-date">
                                    <div>Date</div>
                                </th>
                                <th class="bet-remark">
                                    <div class="ifTooltip">Round Id</div>
                                </th>
                                <th class="bet-remark">
                                    <div class="ifTooltip">Transaction Id</div>
                                </th>
                                <!-- <th class="bet-amount text-right">
                                    <div>Action</div>
                                </th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="tpCasinoSoda && tpCasinoSoda.length">
                                <template v-for="(soda, key) in tpCasinoSoda">
                                    <tr :key="key">
                                        <td class="bet-event-name">
                                            <div>{{ soda.gname }}</div>
                                        </td>
                                        <td class="bet-sport">
                                            <div>{{ soda.ttype }}</div>
                                        </td>
                                        <th class="bet-amount text-right" v-if="tpSelectedCasino == 'pop-the-ball'">
                                            <div>{{ soda.urate }}</div>
                                        </th>
                                        <td class="bet-amount text-right">
                                            <div>{{ soda.amt }}</div>
                                        </td>
                                        <th class="bet-amount text-right" v-if="tpSelectedCasino == 'pop-the-ball'">
                                            <div>{{ soda.winloss }}</div>
                                        </th>
                                        <td class="bet-amount text-right">
                                            <div>{{ soda.total }}</div>
                                        </td>
                                        <td class="bet-date">
                                            <div>{{ soda.edt }}</div>
                                        </td>
                                        <td class="bet-remark">
                                            <div class="ifTooltip">{{ soda.rid }}</div>
                                        </td>
                                        <td class="bet-remark">
                                            <div>{{ soda.tid }}</div>
                                        </td>
                                        <!-- <td class="bet-amount text-right">
                                        <b-form-checkbox :value="key" v-model="selected"></b-form-checkbox>
                                    </td> -->
                                    </tr>
                                </template>
                            </template>
                            <template v-else>
                                <tr class="no-record">
                                    <td :colspan="tpSelectedCasino == 'pop-the-ball' ? 9 : 7">No records found</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </template>
        </div>

    </div>
</template>

<script>
    import moment from 'moment'
    import ServiceApi from "@/services/ServiceApi";
    import Loader from '@/components/loader'
    export default {
        props: ['tpCasinoList'],
        components: {
            Loader
        },
        mounted() {
            this.tpSelectedCasino = _.get(_.head(this.tpCasinoList), 'gtype')
            this.getTpSoda(this.tpSelectedCasino)
        },
        data() {
            return {
                tpCasinoSoda: [],
                tpSelectedCasino: '',
                // winTotal: 0,
                // sodaTotal: 0,
                // selected: [],
                loading: false
            }
        },
        // watch: {
        //     selected() {
        //         let self = this;
        //         if (this.selected.length > 0) {
        //             this.winTotal = 0;
        //             this.sodaTotal = 0;
        //             _.forEach(this.tpCasinoSoda, (o, key) => {
        //                 if (self.selected.includes(key)) {
        //                     switch (o.ttype.toLowerCase()) {
        //                         case 'credit':
        //                             this.winTotal += o.amt;
        //                             break;
        //                         case 'rollback':
        //                             this.winTotal += o.amt;
        //                             break;
        //                         case 'buyout':
        //                             this.winTotal += o.amt;
        //                             break;
        //                         case 'cancel':
        //                             this.winTotal += o.amt;
        //                             break;
        //                         case 'adjust bet':
        //                             this.winTotal += o.amt;
        //                             break;
        //                         case 'cancel bet':
        //                             this.winTotal += o.amt;
        //                             break;
        //                         case 'void bet':
        //                             this.winTotal += o.amt;
        //                             break;
        //                         case 'unvoid settle':
        //                             this.winTotal += o.amt;
        //                             break;


        //                         case 'debit':
        //                             this.winTotal -= o.amt;
        //                             break;
        //                         case 'buyin':
        //                             this.winTotal -= o.amt;
        //                             break;
        //                         case 'unsettle bet':
        //                             this.winTotal -= o.amt;
        //                             break;
        //                         case 'unvoid bet':
        //                             this.winTotal -= o.amt;
        //                             break;
        //                         case 'void settle':
        //                             this.winTotal -= o.amt;
        //                             break;

        //                         default:
        //                             break;
        //                     }
        //                     this.sodaTotal++;
        //                 }
        //             });
        //         } else {
        //             this.calculateTotalWin();
        //         }
        //     }
        // },
        methods: {
            changeTpType(event) {
                // console.log(event.target.value)
                this.tpSelectedCasino = event.target.value
                this.getTpSoda(this.tpSelectedCasino)
                // this.calculateTotalWin();
            },
            getTpSoda(ctype) {
                this.loading = true
                this.tpCasinoSoda = []
                ServiceApi.callApi("api/front/tpcasinosoda", {
                        'ctype': ctype
                    })
                    .then(response => {
                        if (response.status == 200) {
                            if (response.data && response.data.length) {
                                const self = this
                                let total = 0
                                var data = _.sortBy(response.data, ['edt']);
                                _.forEach(data, function (value) {
                                    
                                    if (self.tpSelectedCasino == 'ezugi' ||
                                        self.tpSelectedCasino == 'evo' ||
                                        self.tpSelectedCasino == 'ss' ||
                                        self.tpSelectedCasino == 'qt') {
                                        if (value.ttype.toLowerCase() == 'credit' ||
                                            value.ttype.toLowerCase() == 'rollback') {
                                            total += value.amt
                                        } else if (value.ttype.toLowerCase() == 'debit') {
                                            total -= value.amt
                                        }
                                    } else if (self.tpSelectedCasino == 'cockfight') {
                                        if (value.ttype.toLowerCase() == 'credit' ||
                                            value.ttype.toLowerCase() == 'rollback' ||
                                            value.ttype.toLowerCase() == 'cancel bet' ||
                                            value.ttype.toLowerCase() == 'adjust bet' ||
                                            value.ttype.toLowerCase() == 'void bet' ||
                                            value.ttype.toLowerCase() == 'unvoid settle') {
                                            total += value.amt
                                        } else if (value.ttype.toLowerCase() == 'debit' ||
                                            value.ttype.toLowerCase() == 'unsettle bet' ||
                                            value.ttype.toLowerCase() == 'unvoid bet' ||
                                            value.ttype.toLowerCase() == 'void settle') {
                                            total -= value.amt
                                        }
                                    } else if (self.tpSelectedCasino == 'runner') {
                                        if (value.ttype.toLowerCase() == 'buyout' ||
                                            value.ttype.toLowerCase() == 'rollback' ||
                                            value.ttype.toLowerCase() == 'cancel') {
                                            total += value.amt
                                        } else if (value.ttype.toLowerCase() == 'buyin') {
                                            total -= value.amt
                                        }
                                    } else if (self.tpSelectedCasino == 'pop-the-ball') {
                                        if (value.ttype.toLowerCase() == 'credit' ||
                                            value.ttype.toLowerCase() == 'rollback') {
                                            total += value.tip * value.amt
                                            // total += value.amt
                                        } else if (value.ttype.toLowerCase() == 'debit') {
                                            // total -= value.tip * value.amt
                                            total -= value.amt
                                        }
                                    } else if (self.tpSelectedCasino == 'binary') {
                                        if (value.ttype.toLowerCase() == 'credit' ||
                                            value.ttype.toLowerCase() == 'rollback') {
                                            total += value.winloss
                                        } else if (value.ttype.toLowerCase() == 'debit') {
                                            total -= value.winloss
                                        }
                                    } else if (self.tpSelectedCasino == 'tgs' || self.tpSelectedCasino == 'tgslive' || self.tpSelectedCasino == 'slot') {
                                        if (value.ttype.toLowerCase() == 'credit' ||
                                            value.ttype.toLowerCase() == 'rollback') {
                                            total += value.amt
                                        } else if (value.ttype.toLowerCase() == 'debit') {
                                            total -= value.amt
                                        }
                                    } else if (self.tpSelectedCasino == 'ludo' || self.tpSelectedCasino == 'rummy'  || self.tpSelectedCasino == 'ludo-lands') {
                                        if (value.ttype.toLowerCase() == 'credit' ||
                                            value.ttype.toLowerCase() == 'rollback') {
                                            total += value.winloss
                                        } else if (value.ttype.toLowerCase() == 'debit') {
                                            total -= value.winloss
                                        }
                                    }
                                    

                                    if (self.tpSelectedCasino == 'pop-the-ball') {
                                        self.tpCasinoSoda.push({
                                            total: parseFloat(total).toFixed(2),
                                            amt: value.amt,
                                            edt: self.changeDateTimeFormatSettled(value.edt),
                                            gname: value.gname,
                                            rid: value.rid,
                                            tid: value.tid,
                                            urate: value.tip,
                                            ttype: value.ttype,
                                            winloss: parseFloat(value.tip * value.amt).toFixed(2)
                                        })
                                    } else if (self.tpSelectedCasino == 'binary') {
                                        self.tpCasinoSoda.push({
                                            total: parseFloat(total).toFixed(2),
                                            amt: value.amt,
                                            edt: self.changeDateTimeFormatSettled(value.edt),
                                            gname: value.gname,
                                            mname: value.mname,
                                            mval: value.mval,
                                            rate: value.rate,
                                            refid: value.refid,
                                            tid: value.tid,
                                            tslot: value.tslot,
                                            ttype: value.ttype,
                                            winloss: value.winloss
                                        })
                                            console.log(value)
                                    } else if(self.tpSelectedCasino == 'ludo' || self.tpSelectedCasino == 'rummy' || self.tpSelectedCasino == 'ludo-lands'){
                                        self.tpCasinoSoda.push({
                                            total: parseFloat(total).toFixed(2),
                                            amt: value.winloss,
                                            edt: self.changeDateTimeFormatSettled(value.edt),
                                            gname: value.gname,
                                            rid: value.rid,
                                            tid: value.tid,
                                            ttype: value.ttype
                                        })
                                    } else{
                                        self.tpCasinoSoda.push({
                                            total: parseFloat(total).toFixed(2),
                                            amt: value.amt,
                                            edt: self.changeDateTimeFormatSettled(value.edt),
                                            gname: value.gname,
                                            rid: value.rid,
                                            tid: value.tid,
                                            ttype: value.ttype
                                        })
                                    }
                                });

                                // if(this.tpCasinoSoda && this.tpCasinoSoda.length){
                                //     this.tpCasinoSoda = this.tpCasinoSoda.sort(function (a, b) {
                                //         return new Date(a.edt) - new Date(b.edt);
                                //     })
                                // }
                            }
                            // this.tpCasinoSoda = response.data
                            // this.calculateTotalWin();
                            this.loading = false
                        } else {
                            this.tpCasinoSoda = []
                            // this.calculateTotalWin();
                            this.loading = false
                        }
                    })
                    .catch(e => {
                        this.tpCasinoSoda = []
                        // this.calculateTotalWin();
                        this.loading = false
                    });
            },
            changeDateTimeFormatSettled(date){
                var day = moment(String(date), "YYYY-MM-DD HH:mm:ss");
                var time = day.format("DD/MM/YYYY HH:mm:ss")
                return time
            },
            // calculateTotalWin() {
            //     this.winTotal = 0;
            //     this.sodaTotal = 0;
            //     if (this.tpCasinoSoda) {
            //         _.forEach(this.tpCasinoSoda, (o, key) => {

            //             switch (o.ttype.toLowerCase()) {
            //                 case 'credit':
            //                     this.winTotal += o.amt;
            //                     break;
            //                 case 'rollback':
            //                     this.winTotal += o.amt;
            //                     break;
            //                 case 'buyout':
            //                     this.winTotal += o.amt;
            //                     break;
            //                 case 'cancel':
            //                     this.winTotal += o.amt;
            //                     break;
            //                 case 'adjust bet':
            //                     this.winTotal += o.amt;
            //                     break;
            //                 case 'cancel bet':
            //                     this.winTotal += o.amt;
            //                     break;
            //                 case 'void bet':
            //                     this.winTotal += o.amt;
            //                     break;
            //                 case 'unvoid settle':
            //                     this.winTotal += o.amt;
            //                     break;


            //                 case 'debit':
            //                     this.winTotal -= o.amt;
            //                     break;
            //                 case 'buyin':
            //                     this.winTotal -= o.amt;
            //                     break;
            //                 case 'unsettle bet':
            //                     this.winTotal -= o.amt;
            //                     break;
            //                 case 'unvoid bet':
            //                     this.winTotal -= o.amt;
            //                     break;
            //                 case 'void settle':
            //                     this.winTotal -= o.amt;
            //                     break;

            //                 default:
            //                     break;
            //             }
            //             this.sodaTotal++;
            //         });
            //     }
            // }
        }
    }
</script>