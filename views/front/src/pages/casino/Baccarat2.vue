<template>
    <div class="casino-container">
        <!-- Casino Content -->
        <template v-if="!$store.getters.isTablet">
            <TimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current" />
        </template>
        <div class="casino-table baccarat baccarat2">
            <div class="casino-video">
                <InactivityModal ref="tvModal"/>
                <div class="casino-video-title">
                    <span class="casino-name">{{ gameTitle }}</span>
                    <div class="casino-video-rid">ROUND ID: {{ casinoData.mid }}</div>
                </div>
                <div class="video-box-container">
                    <div class="video-box">
                        <iframe :src="tvUrl" v-if="tvUrl != ''">
                        </iframe>
                    </div>
                </div>
                
                <div class="casino-timer d-none-mobile">
                    <Timer v-if="time.total != 0" :totalTime="time.total" :currentTime="time.current" />
                </div>
                <template v-if="time.total > 3 && (time.current <= 3 && time.current > 0)">
                    <transition name="component-fade" mode="out-in">
                        <div :key="time.current" class="casino-time-digit d-none-desktop">{{ time.current }}</div>
                    </transition>
                </template>
                <div class="casino-video-right-icons">
                    <div class="casino-video-home-icon" title="Home">
                        <router-link :to="{name: 'owncasinolist'}" style="color: var(--text-highlight);">
                            <i class="fas fa-home"></i>
                        </router-link>
                    </div>
                    <div class="casino-video-rules-icon" @click="getCasinoRulesHtml()" title="Rules">
                        <i class="fas fa-info-circle"></i>
                    </div>
                    <b-modal ref="rules-modal" modal-class="casino-rules teenpatti2-rule-modal" title="Rules"
                        hide-footer>
                        <div class="casino-vieo-rules show-rules show">
                            <div class="rules-body">
                                <template v-if="rulesHtml && rulesHtml.length">
                                    <template v-for="(rule, key) in rulesHtml">
                                        <div :key="`body-${key}`" v-html="rule.rules"></div>
                                    </template>
                                </template>
                            </div>
                        </div>
                    </b-modal>
                </div>
                <div id="casino-vieo-rules" class="casino-vieo-rules show d-none-small"
                    :class="{'show-rules': showRules}" v-if="showRules" aria-modal="true" style="display: block;">
                    <div class="rules-header">
                        <div>Rules</div>
                        <i class="fas fa-times" @click="showRules = false"></i>
                    </div>
                    <div class="rules-body">
                        <template v-if="rulesHtml && rulesHtml.length">
                            <template v-for="(rule, key) in rulesHtml">
                                <div :key="`body-${key}`" v-html="rule.rules"></div>
                            </template>
                        </template>
                    </div>
                </div>
            </div>
 
            <div class="casino-detail" v-if="mainData && mainData.length > 0">
                <div class="baccarat-bets-odds">
                    <div class="baccarat-odds">
                        <div class="baccarat-odd-block" >
                            <div class="baccarat-odd-name" :class="{'suspended': mainData[5].gstatus != 'OPEN'}" @click="setBetData(5, 'back')">{{ mainData[5].nat }}<br>{{ parseFloat(mainData[5].b) }}:1</div>
                            <div class="baccarat-odd-val" v-casinofancybook="{sid: mainData[5].sid}"></div>
                            <!-- <div class="casino-min-max">
                                <i class="fas fa-info-circle float-right" data-toggle="collapse" data-target="#range1"></i>
                                <div id="range1" class="collapse icon-range">
                                    R:<span v-kval="{size: mainData[5].min}"></span>-<span v-kval="{size: mainData[5].max}"></span>
                                </div>
                            </div> -->
                        </div>
                        <div class="baccarat-odd-block">
                            <div class="baccarat-odd-name" :class="{'suspended': mainData[6].gstatus != 'OPEN'}" @click="setBetData(6, 'back')">{{ mainData[6].nat }}<br>{{ parseFloat(mainData[6].b) }}:1</div>
                            <div class="baccarat-odd-val" v-casinofancybook="{sid: mainData[6].sid}"></div>
                            <!-- <div class="casino-min-max">
                                <i class="fas fa-info-circle float-right" data-toggle="collapse" data-target="#range2"></i>
                                <div id="range2" class="collapse icon-range">
                                    R:<span v-kval="{size: mainData[6].min}"></span>-<span v-kval="{size: mainData[6].max}"></span>
                                </div>
                            </div> -->
                        </div>
                        <div class="baccarat-odd-block">
                            <div class="baccarat-odd-name" :class="{'suspended': mainData[7].gstatus != 'OPEN'}" @click="setBetData(7, 'back')">{{ mainData[7].nat }}<br>{{ parseFloat(mainData[7].b) }}:1</div>
                            <div class="baccarat-odd-val" v-casinofancybook="{sid: mainData[7].sid}"></div>
                            <!-- <div class="casino-min-max">
                                <i class="fas fa-info-circle float-right" data-toggle="collapse" data-target="#range3"></i>
                                <div id="range3" class="collapse icon-range">
                                    R:<span v-kval="{size: mainData[7].min}"></span>-<span v-kval="{size: mainData[7].max}"></span>
                                </div>
                            </div> -->
                        </div>
                        <div class="baccarat-odd-block">
                            <div class="baccarat-odd-name" :class="{'suspended': mainData[8].gstatus != 'OPEN'}" @click="setBetData(8, 'back')">{{ mainData[8].nat }}<br>{{ parseFloat(mainData[8].b) }}:1</div>
                            <div class="baccarat-odd-val" v-casinofancybook="{sid: mainData[8].sid}"></div>
                            <!-- <div class="casino-min-max">
                                <i class="fas fa-info-circle float-right" data-toggle="collapse" data-target="#range4"></i>
                                <div id="range4" class="collapse icon-range">
                                    R:<span v-kval="{size: mainData[8].min}"></span>-<span v-kval="{size: mainData[8].max}"></span>
                                </div>
                            </div> -->
                        </div>
                        <div class="baccarat-odd-block">
                            <div class="baccarat-odd-name" :class="{'suspended': mainData[9].gstatus != 'OPEN'}" @click="setBetData(9, 'back')">{{ mainData[9].nat }}<br>{{ parseFloat(mainData[9].b) }}:1</div>
                            <div class="baccarat-odd-val" v-casinofancybook="{sid: mainData[9].sid}"></div>
                            <!-- <div class="casino-min-max">
                                <i class="fas fa-info-circle float-right" data-toggle="collapse" data-target="#range5"></i>
                                <div id="range5" class="collapse icon-range">
                                    R:<span v-kval="{size: mainData[9].min}"></span>-<span v-kval="{size: mainData[9].max}"></span>
                                </div>
                            </div> -->
                        </div>
                    </div>
                    <div class="baccarat-bets">
                        <div class="player-pair">
                            <div :class="{'suspended' : mainData[3].gstatus != 'OPEN' }" class="baccarat-bets-name"
                                @click="setBetData(3, 'back')">
                                <div>{{ mainData[3].nat }}</div>
                                <div class="mb-0">{{ parseFloat(mainData[3].b) }}:1</div>
                            </div>
                            <div class="baccarat-bets-val" v-casinofancybook="{sid: mainData[3].sid}"></div>
                            <!-- <div class="casino-min-max">
                                <i class="fas fa-info-circle" data-toggle="collapse" data-target="#range6"></i>
                                <div id="range6" class="collapse icon-range">
                                    R:<span v-kval="{size: mainData[3].min}"></span>-<span v-kval="{size: mainData[3].max}"></span>
                                </div>
                            </div> -->
                        </div>
                        <div class="player">
                            <div class="baccarat-bets-name"  :class="{'suspended' : mainData[0].gstatus != 'OPEN' }"
                                @click="setBetData(0, 'back')">
                                <div>{{ mainData[0].nat }} {{ parseFloat(mainData[0].b) }}:1</div>
                                
                                <div class="mb-0">
                                    <Card v-if="cards[4] != '1'" :card="cards[4]"  class="l-rotate" />
                                    <Card :card="cards[2]" />
                                    <Card :card="cards[0]" />  
                                </div>
                            </div>
                            <div class="baccarat-bets-val" v-casinofancybook="{sid: mainData[0].sid}"></div>
                            <!-- <div class="casino-min-max">
                                <i class="fas fa-info-circle" data-toggle="collapse" data-target="#range7"></i>
                                <div id="range7" class="collapse icon-range">
                                    R:<span v-kval="{size: mainData[0].min}"></span>-<span v-kval="{size: mainData[0].max}"></span>
                                </div>
                            </div> -->
                        </div>
                        <div class="tie">
                            <div class="baccarat-bets-name" :class="{'suspended' : mainData[2].gstatus != 'OPEN'}"
                                @click="setBetData(2, 'back')">
                                <div>{{ mainData[2].nat }}</div>
                                <div class="mb-0">{{ parseFloat(mainData[2].b) }}:1</div>
                            </div>
                            <div class="baccarat-bets-val" v-casinofancybook="{sid: mainData[2].sid}"></div>
                            <!-- <div class="casino-min-max">
                                <i class="fas fa-info-circle" data-toggle="collapse" data-target="#range8"></i>
                                <div id="range8" class="collapse icon-range">
                                    R:<span v-kval="{size: mainData[2].min}"></span>-<span v-kval="{size: mainData[2].max}"></span>
                                </div>
                            </div> -->
                        </div>
                        <div class="banker">
                            <div class="baccarat-bets-name"  :class="{'suspended' : mainData[1].gstatus != 'OPEN' }"
                                @click="setBetData(1, 'back')">
                                <div>{{ mainData[1].nat }} {{ parseFloat(mainData[1].b) }}:1</div>
                                <div class="mb-0">
                                    <Card :card="cards[1]"  />
                                    <Card :card="cards[3]" />
                                    <Card v-if="cards[5] != '1'" :card="cards[5]" class="r-rotate"/>  
                                </div>
                            </div>
                            <div class="baccarat-bets-val" v-casinofancybook="{sid: mainData[1].sid}"></div>
                            <!-- <div class="casino-min-max">
                                <i class="fas fa-info-circle" data-toggle="collapse" data-target="#range9"></i>
                                <div id="range9" class="collapse icon-range">
                                    R:<span v-kval="{size: mainData[1].min}"></span>-<span v-kval="{size: mainData[1].max}"></span>
                                </div>
                            </div> -->
                        </div>
                        
                        <div class="banker-pair">
                            <div class="baccarat-bets-name" :class="{'suspended' : mainData[4].gstatus != 'OPEN' }"
                                @click="setBetData(4, 'back')">
                                <div>{{ mainData[4].nat }}</div>
                                <div class="mb-0">{{ parseFloat(mainData[4].b) }}:1</div>
                            </div>
                            <div class="baccarat-bets-val" v-casinofancybook="{sid: mainData[4].sid}"></div>
                            <!-- <div class="casino-min-max">
                                <i class="fas fa-info-circle" data-toggle="collapse" data-target="#range10"></i>
                                <div id="range10" class="collapse icon-range">
                                    R:<span v-kval="{size: mainData[4].min}"></span>-<span v-kval="{size: mainData[4].max}"></span>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div class="statistics">
                    <div class="statistics-title" @click="showChart=!showChart">
                        Statistics 
                        <span v-if="showChart == true"><i class="fas fa-angle-up"></i></span>
                        <span v-else><i class="fas fa-angle-down"></i></span>
                    </div>
                    <!-- <transition name="bounce"> -->
                    <div class="statistics-conten1t" v-show="showChart == true">
                        <GChart type="PieChart" :data="chartData" :options="chartOptions" />
                    </div>
                   <!-- </transition> -->
                </div>

                <template v-if="casinoData.remark && casinoData.remark != ''">
                    <div class="casino-remark mt-1 w-100">
                        <div class="remark-icon">
                            <img :src="`${imgPath}front/img/icons/remark.png`">
                        </div>
                        <marquee>{{ casinoData.remark }}</marquee>
                    </div>
                </template>

                <template v-if="!$store.getters.isTablet">
                    <LastResultIcon />
                </template>
            </div>
            <!-- CASINO Rules Start -->
            <template v-if="!$store.getters.isTablet">
                <div class="mt-2 casino-rules-table d-none-big" v-if="$store.state.casinoRules">
                    <div class="casino-place-bet-title">Rules</div>
                    <div class="table-responsive">
                        <template v-for="(rules, key) in $store.state.casinoRules">
                            <table class="table" :key="key">
                                <thead>
                                    <tr>
                                        <th colspan="2" class="text-center">{{ rules.hed }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(rule, key1) in rules.child">
                                        <tr :key="key1">
                                            <td>{{ rule.nat }}</td>
                                            <td>{{ rule.resval }}</td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </template>
                    </div>
                </div>
            </template>
            <!-- CASINO Rules End -->
        </div>


        <b-modal ref="placebet-modal" hide-footer title="BET SLIP" @hide="$store.commit('resetCasinoBetData')"
            :class="{'loader-section-parent':$store.state.loadingCasinoPlacebet}">
            <Loader :isVisible="$store.state.loadingCasinoPlacebet"></Loader>
            <template #modal-title>
                <h5 class="modal-title">Place Bet
                    <template v-if="$pages.is('casino', $route.name) && $store.state.casinoBet && $store.state.casinoBet != null">
                        <span class="casino-min-max ml-2">
                            Range:<span v-kval="{size: $store.state.casinoBet.min}"></span>-<span
                                v-kval="{size: $store.state.casinoBet.max}"></span>
                        </span>
                    </template>
                </h5>
            </template>

            <ValidationObserver tag="div" class="casino-place-bet-box" v-slot="{ invalid }">
                <template
                    v-if="$pages.is('casino', $route.name) && $store.state.casinoBet && $store.state.casinoBet != null">
                    <div class="bet-slip pl-0 pr-0">
                        <div class="bet-team mt-0">
                            <span class="bet-team-name">{{ $store.state.casinoBet.nation }}</span>
                            <span class="float-right"
                                v-if="!$store.state.casinoBet.nation.includes('Pair Plus')">{{ $store.state.casinoBet.uRate }}</span>
                        </div>
                    </div>

                    <div class="casino-place-bet-info">
                        <ValidationProvider name="Amount" tag="div" class="bet-input ml-0"
                            :class="[{'back-border': $store.state.casinoBet.betType == 'back'}, {'lay-border': $store.state.casinoBet.betType == 'lay'}]"
                            :rules="{required: true, min_value : 1, max_value : 999999999, regex: /^[0-9]+$/}">
                            <input type="number" id="placebetAmountMobile" v-model.number="$store.state.casinoBet.amount"
                                class="form-control input-stake"
                                onkeypress='return event.charCode >= 48 && event.charCode <= 57' placeholder="Amount">
                        </ValidationProvider>
                    </div>

                    <div class="casino-place-bet-button-container">
                        <template v-for="(btn, key) in $store.state.buttonList">
                            <button class="btn btn-bet" @click="$store.commit('updateCasinoBetAmount', btn.bval)"
                                :key="key">
                                <span>{{ btn.btxt }}</span>
                            </button>
                        </template>
                    </div>
                    <div class="casino-place-bet-action-buttons">
                        <button class="btn btn-primary" :disabled="invalid" @click="$parent.placebetCasino()">Submit</button>
                    </div>
                </template>
            </ValidationObserver>
        </b-modal>

        <b-modal id="betCasinoSodaModal" hide-footer title="MY BETS" modal-class="mybetsmodal">

            <template v-if="$pages.is('casino', $route.name) && $store.state.casinoBetSoda != null">
                <div class="casino-place-bet-header">
                    <div>Matched Bet</div>
                    <div>Odds</div>
                    <div>Stake</div>
                </div>
                <div class="casino-place-bet-body">
                    <template v-for="(data, key) in $store.state.casinoBetSoda">
                        <div class="casino-place-bet-row" :key="key"
                            :class="[{'back-border': data.btype == 'back'}, {'lay-border': data.btype == 'lay'}]">
                            <div>{{ data.nat }}</div>
                            <div>{{ data.urate }}</div>
                            <div>{{ data.amt }}</div>
                        </div>
                    </template>
                </div>
            </template>
        </b-modal>

        <div class="market-show-icon d-none-desktop" v-if="$store.getters.betCasinoSodaTotal" v-b-modal.betCasinoSodaModal>
            <span>{{ $store.getters.betCasinoSodaTotal }}</span>
        </div>
    </div>
</template>

<script>
    import ServiceApi from "@/services/ServiceApi";
    import Timer from "@/components/casino/BaseTimer"
    import TimerProgress from "@/components/casino/TimerProgress"
    import LastResultIcon from '@/components/casino/results/LastResultIcon'
    import Card from '@/components/casino/Card'
    import Loader from '@/components/loader'
    import {GChart} from 'vue-google-charts'
    import InactivityModal from '@/components/casino/InactivityModal'
    var PlacebetTimer;

    export default {
        mounted() {
            this.$store.state.casinoGameType = this.gameType
            this.getButtonListCs()
            this.reconnectTv()
            this.getCasinoRules()
            this.getCasinoData()
            this.getLastResults()
        },
        components: {
            Timer,
            TimerProgress,
            LastResultIcon,
            Card,
            Loader,
            GChart,
            InactivityModal
        },
        computed: {
            mainData() {
                return _.get(this.casinoData, 'sub')
            }
        },
        data() {
            return {
                showCards: true,
                showChart:true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'baccarat2',
                casinoData: [],
                mId: 0,
                cards: [],
                time: {
                    total: 0,
                    current: 0
                },
                callDataApi: true,
                callBookApi: true,
                exp: '',
                tvUrl: '',
                chartData: [
                  ['P', 'Data'],
                  ['Player', 0],
                  ['Banker', 0],
                  ['Tie', 0],
                ],
                chartOptions: {
                    title: '',
                    height: 160, 
                    backgroundColor: 'transparent',
                    slices: {
                        0: {
                            color: '#086cb8'
                        },
                        1: {
                            color:'#ae2130'
                        },
                        2: {
                            color:'#279532'
                        }
                    },
                    pieSliceTextStyle: {
                      //  fontSize: 8,
                    },
                    is3D: true,
                    legend: {
                        position: 'right',
                        textStyle: {
                            color: "#fff"    
                        }
                    },
                    chartArea: {
                        left: '2%', 
                        top: '2%',
                        bottom: '2%',
                        width: '100%',
                        height: '100%'
                    },
                    hAxis: {
                        // title: 'Time',
                        // titleTextStyle: {
                        //     color: '#000'
                        // },
                        format: 'HH:mm',
                        gridlines: {
                            count: 15
                        }
                    },
                    vAxis: {
                        // title: 'Price',
                        // titleTextStyle: {
                        //     color: '#000'
                        // }
                    },
                },
                firstCall: true,
                showRules: false,
                rulesHtml: [],
            }
        },
        methods: {
            getButtonListCs() {
                ServiceApi.callApi("api/front/buttonlistcs")
                .then(response => {
                    if (response.status == 200) {
                    this.$store.state.buttonList = response.data.t1
                    this.$store.state.autocon = response.data.autocon
                    this.autocon = this.$store.state.autocon
                    }
                })
                .catch(e => {
                    this.$store.state.buttonList = []
                });
            },
            getCasinoRulesHtml() {
                ServiceApi.callApi("api/front/casinorules", {
                        'type': this.gameType,
                    })
                    .then(response => {
                        console.log(response)
                        if (response.status == 200) {
                            this.showRules = true
                            this.rulesHtml = response.data
                            if (IS_MOBILE) {
                                this.$refs['rules-modal'].show()
                            }
                        } else {
                            this.showRules = false
                            this.rulesHtml = []
                        }
                    })
                    .catch(e => {
                        this.showRules = false
                        this.rulesHtml = []
                    });
            },
            getTvUrl() {
                ServiceApi.callApi("api/front/casino/launchother", {
                        'id': 'tv'
                    })
                    .then(response => {
                        if (response.status == 200) {
                            // console.log(response.data.token)
                            this.tvUrl = '/mediaplayer/' + this.gameType + '/' + response.data.token + '?ip=' +
                                IP_ADDRESS;
                        } else {
                            this.tvUrl = ''
                        }
                    })
                    .catch(e => {
                        this.tvUrl = ''
                    });
            },
            resetInterval() {
                if (INACTIVITY_MODAL) {
                    clearInterval(PlacebetTimer);
                    this.$store.state.placebetInterval = 0
                    var self = this;

                    PlacebetTimer = setInterval(function () {
                        console.log('round', self.$store.state.placebetInterval)
                        if (self.$store.state.placebetInterval >= ROUNDS) {
                            console.log('round reseted', self.$store.state.placebetInterval)
                            clearInterval(PlacebetTimer);
                            self.$refs["tvModal"].show();
                            self.tvUrl = ''
                        }
                    }, 1000);
                }
            },
            reconnectTv() {
                console.log("reconnectTv")
                this.getTvUrl()
                this.resetInterval()
                this.$refs["tvModal"].hide();
            },
            resetPlacebetInterval() {
                console.log("resetPlacebetInterval")
                if (INACTIVITY_MODAL) {
                    if (this.$store.state.placebetInterval >= ROUNDS) {
                        this.getTvUrl()
                    }
                    this.resetInterval()
                    this.$refs["tvModal"].hide();
                }
            },

            getKey(data, key) {
                return _.get(data, 'key')
            },
            getCasinoRules() {
                this.$store.state.casinoRules = null
                ServiceApi.callApi("api/front/casino/rules", {
                        'type': this.gameType,
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.$store.state.casinoRules = response.data
                        } else {
                            this.$store.state.casinoRules = null
                        }
                    })
                    .catch(e => {
                        this.$store.state.casinoRules = null
                    });
            },
            getCasinoData() {
                ServiceApi.callApi("api/front/casino/data", {
                        'type': this.gameType,
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.casinoData = response.data
                            if (_.get(this.casinoData, 'mid') != this.mId) {
                                if(!this.firstCall){
                                    this.$store.state.placebetInterval++
                                }
                                this.firstCall = false
                                this.getLastResults()
                                this.getUserBook(true, _.get(this.casinoData, 'mid'))
                            }
                            this.mId = _.get(this.casinoData, 'mid')
                            this.getUserBook()
                            this.cards = _.get(this.casinoData, 'card').split(',')
                            this.time.total = _.get(this.casinoData, 'ft')
                            this.time.current = _.get(this.casinoData, 'lt')
                            if (this.callDataApi == true) {
                                setTimeout(res => {
                                    this.getCasinoData();
                                }, 500);
                            }
                        } else {
                            // this.casinoData = []
                            if (this.callDataApi == true) {
                                setTimeout(res => {
                                    this.getCasinoData();
                                }, 500);
                            }
                        }
                    })
                    .catch(e => {
                        // this.casinoData = []
                        if (this.callDataApi == true) {
                            setTimeout(res => {
                                this.getCasinoData();
                            }, 500);
                        }
                    });
            },
            getUserBook(forcecall = false, mid = this.mId) {
                if(this.exp != _.get(this.$store.state.user, 'exp', 0) || forcecall){
                    ServiceApi.callApi("api/front/casino/book", {
                            'mid': parseInt(mid),
                            'gType': this.gameType
                        })
                        .then(response => {
                            if (response.status == 200) {
                                this.$store.state.casinoBetSoda = response.data.bet
                                this.$store.state.casinoFancybetBook = response.data.fancy
                                this.$store.state.casinobetBook = response.data.sportbet
                                // if (this.callBookApi == true) {
                                //     setTimeout(res => {
                                //         this.getUserBook();
                                //     }, 800);
                                // }
                            } else {
                                this.$store.state.casinoBetSoda = null
                                this.$store.state.casinobetBook = null
                                this.$store.state.casinoFancybetBook = null
                                // if (this.callBookApi == true) {
                                //     setTimeout(res => {
                                //         this.getUserBook();
                                //     }, 800);
                                // }
                            }
                        })
                        .catch(e => {
                            this.$store.state.casinoBetSoda = null
                            this.$store.state.casinobetBook = null
                            this.$store.state.casinoFancybetBook = null
                            // if (this.callBookApi == true) {
                            //     setTimeout(res => {
                            //         this.getUserBook();
                            //     }, 800);
                            // }
                        });
                    
                    this.exp = _.get(this.$store.state.user, 'exp', 0)
                }
            },
            getLastResults() {
                ServiceApi.callApi("api/front/casino/lastresults", {
                        'gType': this.gameType
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.$store.state.lastResults = response.data.res;
                            this.gameTitle = response.data.g.cname
                            if(response.data.g != null){
                                this.chartData = [
                                  ['P', 'Data'],
                                  ['Player', parseFloat(response.data.g.p)],
                                  ['Banker', parseFloat(response.data.g.b)],
                                  ['Tie', parseFloat(response.data.g.t)],
                                ];
                            }
                        } else {
                            this.$store.state.lastResults = []
                        }
                    })
                    .catch(e => {
                        this.$store.state.lastResults = []
                    });

            },
            setBetData(index, btype) {
                
                if (this.mainData[index].b <= 0 && this.mainData[index].gstatus != 'OPEN') {
                    return;
                }
                let betdata = {
                    subType: this.mainData[index].subtype,
                    marketId: this.mId,
                    sectionId: this.mainData[index].sid,
                    subId: 0,
                    uRate: this.mainData[index].b,
                    amount: '',
                    betType: btype,
                    gameType: this.gameType,
                    nation: this.mainData[index].nat,
                    min: this.mainData[index].min,
                    max: this.mainData[index].max,
                }
                this.$store.commit('setCasinoBetData', betdata)
                //console.log(this.$store.state.casinoBet)

                if (IS_MOBILE) {
                    setTimeout(() => {
                        document.getElementById("placebetAmountMobile").focus();
                    }, 500);
                    this.$refs['placebet-modal'].show()
                }
                setTimeout(() => {
                    document.getElementById("placebetAmountWeb").focus();
                }, 500);
                
            },
            placebetCasino() {
                if (this.$store.state.loadingCasinoPlacebet)
                    return
                this.$store.state.loadingCasinoPlacebet = true
                ServiceApi.callApi("api/front/placebetcasino", this.$store.state.casinoBet)
                    .then(response => {
                        if (response.success) {
                            this.$bvToast.toast(response.msg, {
                                variant: 'success',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                            //console.log('success', response.msg)
                        } else {
                            this.$bvToast.toast(response.msg, {
                                variant: 'danger',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                            //console.log('fail', response.msg)
                        }
                    })
                    .catch(e => {
                        // console.log('error', e)
                    })
                    .finally(data => {
                        this.$store.commit('resetCasinoBetData')
                        this.$refs['placebet-modal'].hide()
                        this.resetPlacebetInterval()
                        this.$store.state.loadingCasinoPlacebet = false
                        // console.log(data)
                    });
            },
            hidePlacebetModal(){
                this.$refs['placebet-modal'].hide()
            }
        },
        beforeDestroy() {
            this.callBookApi = false
            this.callDataApi = false
            this.$store.commit('resetCasinoBetData')
            this.$store.state.casinoRules = null
            this.$store.state.casinoBetSoda = null
            this.$store.state.casinobetBook = null
            this.$store.state.casinoFancybetBook = null
            this.$store.state.lastResults = []
            this.$store.state.placebetInterval = 0
            this.$store.state.casinoGameType = ""
            clearInterval(PlacebetTimer);
        }
    }
</script>