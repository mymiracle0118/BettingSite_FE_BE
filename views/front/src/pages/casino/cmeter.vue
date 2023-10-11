<template>
    <div class="casino-container">
        <!-- Casino Content -->
        <template v-if="!$store.getters.isTablet">
            <TimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current" />
        </template>
        <div class="casino-table cmeter">
            <div class="casino-video">
                <InactivityModal ref="tvModal"/>
                <div class="casino-video-title">
                    <span class="casino-name">{{ gameTitle }}</span>
                    <div class="casino-video-rid">Round ID: {{ casinoData.mid }}</div>
                </div>
                <div class="video-box-container">
                    <div class="video-box">
                        <iframe :src="tvUrl" v-if="tvUrl != ''">
                        </iframe>
                    </div>
                </div>
               
                <div class="casino-timer d-none-small">
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

            <div class="casino-detail" v-if="casinoData && casinoData.mid">
                <div class="cmeter-card-box" v-if="checkShowCard()">
                    <div class="cmeter-card-low">
                        <div class="text-playerb">
                            <span>Low</span>
                            <span class="text-success ml-2 numeric">{{ lowCardCnt }}</span>
                        </div>
                        <div class="ml-2">
                            <template v-for="(card, key) in cards">
                                <span v-if="checkLowCards(card, true)">
                                    <img :key="key" :src="imgPath + 'front/img/cards/'+ card +'.png'" />
                                </span>
                            </template> 
                            <span class="ml-1" v-if="activeSectionId != null && activeSectionId == main[0].sid">
                                Run Position: 
                                <span class="text-success" v-if="parseInt(lowCardCnt - highCardCnt) >= 0">{{ parseInt(lowCardCnt - highCardCnt)  }}
                                </span>
                                <span v-else class="text-danger">{{ parseInt(lowCardCnt - highCardCnt)  }}</span>
                            </span>
                        </div>
                    </div>
                    <div class="cmeter-card-high">
                        <div class="text-playerb">
                            <span>High</span>
                            <span class="text-success ml-2 numeric">{{ highCardCnt }}</span>
                        </div>
                        <div class="ml-2">
                            <template v-for="(card, key) in cards">
                                <span v-if="checkHighCards(card, true)">
                                    <img :key="key" :src="imgPath + 'front/img/cards/'+ card +'.png'" />
                                </span>
                            </template>
                            <span class="ml-1" v-if="activeSectionId != null && activeSectionId == main[1].sid">
                                Run Position: 
                                <span class="text-success" v-if="parseInt(highCardCnt - lowCardCnt) >= 0">{{ parseInt(highCardCnt - lowCardCnt)  }}
                                </span>
                                <span v-else class="text-danger">{{ parseInt(highCardCnt - lowCardCnt) }}</span>
                            </span>

                        </div>
                    </div>
                </div>
                <div class="teen1daycasino-container">
                    <div class="teen1dayleft" @click="setBetData('0','back')">
                        <div class=" text-center">
                            <b class="text-playerb">Low</b>
                            <template v-if="(activeSectionId != null && activeSectionId != main[0].sid) || ($store.state.casinoBet != null && $store.state.casinoBet.sectionId && $store.state.casinoBet.sectionId != main[0].sid)"> 
                                <div class="casino-card-item d-inline-block ml-2">
                                    <span class="card-image">
                                        <img :src="imgPath + 'front/img/cards/10SS.png'">
                                    </span>
                                </div>
                            </template>

                            
                        </div>
                        <div class="w-100">
                            <div class="casino-cards text-center p-2" :class="{'suspended' : main[0].gstatus != 'OPEN'  || (activeSectionId != null && activeSectionId != main[0].sid)}">
                                <div class="casino-card-item"  v-for="n in 9">
                                    <div class="card-image" >
                                        
                                        <template v-if="n==9">
                                            <template v-if="(activeSectionId != null && activeSectionId == main[0].sid) || ($store.state.casinoBet != null && $store.state.casinoBet.sectionId && $store.state.casinoBet.sectionId == main[0].sid)"> 
                                                <img :src="imgPath + 'front/img/cards/9meter.png'">
                                            </template>
                                            <template v-else>
                                                <img :src="imgPath + 'front/img/cards/9.png'">
                                            </template>
                                        </template>
                                        <template v-else>
                                            <img v-if="n==1" :src="imgPath+'front/img/cards/A.png'">   
                                            <img v-else-if="n==11" :src="imgPath+'front/img/cards/J.png'">
                                            <img v-else-if="n==12" :src="imgPath+'front/img/cards/Q.png'">
                                            <img v-else-if="n==13" :src="imgPath+'front/img/cards/K.png'"> 
                                            <img v-else :src="imgPath+'front/img/cards/'+n+'.png'">  
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class="">
                                <span class="w-100 text-left" v-casinofancybook="{sid: main[0].sid}"></span>
                                <!-- <span class="float-right casino-min-max">R:<span v-kval="{size: main[0].min}"></span>-<span
                                                    v-kval="{size: main[0].max}"></span></span> -->
                            </div>
                        </div>
                    </div>
                    <div class="teen1daycenter"></div>
                    <div class="teen1dayright" @click="setBetData('1','back')">
                        <div class=" text-center">
                            <b class="text-playerb">High</b>
                            <template v-if="(activeSectionId != null && activeSectionId != main[1].sid) || ( $store.state.casinoBet != null && $store.state.casinoBet.sectionId && $store.state.casinoBet.sectionId != main[1].sid)"> 
                                 <div class="casino-card-item d-inline-block ml-2">
                                    <span class="card-image">
                                        <img :src="imgPath + 'front/img/cards/9SS.png'">
                                    </span>
                                </div>
                            </template>
                        </div>
                        <div class="w-100">
                            <div class="casino-cards text-center p-2" :class="{'suspended': main[1].gstatus != 'OPEN'  || (activeSectionId != null && activeSectionId != main[1].sid)}">
                                <div class="casino-card-item">
                                    <div class=" card-image">
                                        <template v-if="(activeSectionId != null && activeSectionId == main[1].sid) || ($store.state.casinoBet != null && $store.state.casinoBet.sectionId && $store.state.casinoBet.sectionId == main[1].sid)"> 
                                            <img :src="imgPath + 'front/img/cards/10meter.png'">
                                        </template>
                                        <template v-else>
                                            <img :src="imgPath + 'front/img/cards/10.png'">
                                        </template>
                                    </div>
                                </div>
                                <div class="casino-card-item">
                                    <div class="card-image">
                                        <img :src="imgPath + 'front/img/cards/J.png'">
                                    </div>
                                </div>
                                <div class="casino-card-item">
                                    <div class="card-image">
                                        <img :src="imgPath + 'front/img/cards/Q.png'">
                                    </div>
                                </div>
                                <div class="casino-card-item">
                                    <div class="card-image">
                                        <img :src="imgPath + 'front/img/cards/K.png'">
                                    </div>
                                </div>
                            </div>
                            <div class="">
                                <span class="w-100 text-left" v-casinofancybook="{sid: main[1].sid}"></span>
                                <!-- <span class="float-right casino-min-max">R:<span v-kval="{size: main[1].min}"></span>-<span
                                                    v-kval="{size: main[1].max}"></span></span></span> -->
                            </div>
                        </div>
                    </div>
                </div>
                <template v-if="casinoData.remark && casinoData.remark != ''">
                    <div class="casino-remark mt-1">
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
            InactivityModal
        },
        computed: {
            main() {
                var player = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'cmeter'
                })
                return this.orderBy(player, 'sr')
            }
        },
        data() {
            return {
                showCards: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'cmeter',
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
                activeSectionId:null,
                lowCardCnt:'',
                highCardCnt:'',
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

            toggleCards(card) {
                if (card != '1') {
                    this.showCards = !this.showCards
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
                                if (!this.firstCall) {
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

                            if(this.$store.state.casinoFancybetBook && this.$store.state.casinoFancybetBook.length > 0){
                                this.activeSectionId = this.$store.state.casinoFancybetBook[0].sid;
                            }else{
                                this.activeSectionId = null;                            
                            }
                            
                            if(this.casinoData.rdesc != null){
                                let cardCount = this.casinoData.rdesc.split(",");
                                if(this.activeSectionId != null){
                                    this.lowCardCnt = parseInt(cardCount[0]);
                                    this.highCardCnt = parseInt(cardCount[1]);
                                    if(cardCount[2] == 1 && this.activeSectionId != null && this.activeSectionId == this.main[0].sid){
                                        this.lowCardCnt -= 9;
                                        this.highCardCnt += 9; 
                                    }
                                    if(cardCount[3] == 1 && this.activeSectionId != null && this.activeSectionId == this.main[1].sid){
                                        this.lowCardCnt += 10;
                                        this.highCardCnt -= 10;    
                                    }
                                }else{
                                    this.lowCardCnt = parseInt(cardCount[0]); 
                                    this.highCardCnt = parseInt(cardCount[1]); 
                                }
                            }

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
                            this.$store.state.lastResults = response.data.res
                            this.gameTitle = response.data.res1.cname
                        } else {
                            this.$store.state.lastResults = []
                        }
                    })
                    .catch(e => {
                        this.$store.state.lastResults = []
                    });

            },
            setBetData(index, btype) {
                if(this.activeSectionId != null && this.activeSectionId != this.main[index].sid){
                    return;
                }
                // console.log(nat, rate, mid, sid, subType, subId, bType, gType, gstatus)
                if (this.main[index].b && this.main[index].gstatus == 'OPEN') {
                    let betdata = {
                        subType: this.main[index].subtype,
                        marketId: this.mId,
                        sectionId: this.main[index].sid,
                        subId: 0,
                        uRate: this.main[index].b,
                        amount: '',
                        betType: btype,
                        gameType: this.gameType,
                        nation: this.main[index].nat,
                        min: this.main[index].min,
                        max: this.main[index].max,
                    }
                    this.$store.commit('setCasinoBetData', betdata)
                    // console.log(this.$store.state.casinoBet)

                    if (IS_MOBILE) {
                        setTimeout(() => {
                            document.getElementById("placebetAmountMobile").focus();
                        }, 500);
                        this.$refs['placebet-modal'].show()
                    }
                    setTimeout(() => {
                        document.getElementById("placebetAmountWeb").focus();
                    }, 500);
                }
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
                            // console.log('success', response.msg)
                        } else {
                            this.$bvToast.toast(response.msg, {
                                variant: 'danger',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                            // console.log('fail', response.msg)
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
            hidePlacebetModal() {
                this.$refs['placebet-modal'].hide()
            },
            checkShowCard(){
                let showCards = false;
                if(this.cards.length > 0){
                    this.cards.forEach(card => {
                        if(card != 1){
                            showCards = true;
                        }
                    });
                }
                return showCards;

            },
            checkLowCards(card) {
                if(card == 1){
                    return false
                }
                if (card.length == 3) {
                    var value = card.slice(0, 1);
                    if ((value.toLowerCase() == 'a' ||  value <= 9) && card != '9SS') {
                        return true
                    }
                    if (card == '9SS' && this.activeSectionId != null && this.activeSectionId == 1) {
                       return false;
                    }else if(card == '9SS'){
                        return true;
                    }
                }
                if (card.length == 4) {
                    if (card == '10SS' && this.activeSectionId != null && this.activeSectionId == 2) {
                        return true;
                    }else{
                        return false;
                    }
                }
                return false;
            },
            checkHighCards(card) {
                if(card == 1){
                    return false
                }
                if (card.length == 3) {
                    var value = card.slice(0, 1)
                    
                    if (value.toLowerCase() == 'j' || value.toLowerCase() == 'k' || value.toLowerCase() == 'q') {
                        return true;
                    }

                    if (card == '9SS' && this.activeSectionId != null && this.activeSectionId == 1) {
                        return true;
                    }
                }
                if (card.length == 4) {
                    var value = card.slice(0, 2)
                    if (card == '10SS' && this.activeSectionId != null && this.activeSectionId == 2) {
                        return false;
                    } else {
                        if (value == '10') {
                            return true
                        }
                    }
                }
                return false;
            },
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