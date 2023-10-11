<template>
    <div class="casino-container">
        <!-- Casino Content -->
        <template v-if="!$store.getters.isTablet">
            <TimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current" />
        </template>
        <div class="casino-table worli">
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
                <template v-if="cards && cards.length">
                    <div class="casino-video-cards" :class="{'hide-cards': (!showCards || cards[0] == '1')}">
                        <div class="casino-cards-shuffle" @click="toggleCards(cards[0])">
                            <i class="fas fa-grip-lines-vertical"></i>
                        </div>
                        <div class="casino-video-cards-container">
                            <div>
                                <Card :card="cards[0]" />
                                <Card :card="cards[1]" />
                                <Card :card="cards[2]" />
                            </div>

                        </div>
                    </div>
                </template>
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
                </div>
            </div>

            <div class="casino-detail" v-if="casinoData && casinoData.mid">
                <div class="casino-box tab-content">
                    <div id="single" class="tab-pane active single">
                        <div class="worlibox" :class="{'suspended': main[0].gstatus != 'OPEN'}">
                            <!-- <div class="worli-range">
                                R:<span v-kval="{ size: main[0].min }"></span>-<span
                                    v-kval="{ size: main[0].max }"></span>
                            </div> -->
                            <div class="worli-left">
                                <div class="worli-box-title">
                                    <b>{{ $store.state.worlitabdata.single.single }}</b>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('single', 1) }"
                                        @click="setBetData('single', 1)">
                                        <span class="worli-odd">1</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('single', 2) }"
                                        @click="setBetData('single', 2)">
                                        <span class="worli-odd">2</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('single', 3) }"
                                        @click="setBetData('single', 3)">
                                        <span class="worli-odd">3</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('single', 4) }"
                                        @click="setBetData('single', 4)">
                                        <span class="worli-odd">4</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('single', 5) }"
                                        @click="setBetData('single', 5)">
                                        <span class="worli-odd">5</span>
                                    </div>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('single', 6) }"
                                        @click="setBetData('single', 6)">
                                        <span class="worli-odd">6</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('single', 7) }"
                                        @click="setBetData('single', 7)">
                                        <span class="worli-odd">7</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('single', 8) }"
                                        @click="setBetData('single', 8)">
                                        <span class="worli-odd">8</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('single', 9) }"
                                        @click="setBetData('single', 9)">
                                        <span class="worli-odd">9</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('single', 0) }"
                                        @click="setBetData('single', 0)">
                                        <span class="worli-odd">0</span>
                                    </div>
                                </div>
                            </div>
                            <div class="worli-right">
                                <div class="worli-box-title">
                                    <b>{{ $store.state.worlitabdata.single.multi }}</b>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('single', 11) }"
                                        @click="setBetData('single', 11)">
                                        <span class="worli-odd">LINE 1</span>
                                        <span class="d-block">1|2|3|4|5</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('single', 13) }"
                                        @click="setBetData('single', 13)">
                                        <span class="worli-odd">ODD</span>
                                        <span class="d-block">1|3|5|7|9</span>
                                    </div>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('single', 12) }"
                                        @click="setBetData('single', 12)">
                                        <span class="worli-odd">LINE 2</span>
                                        <span class="d-block">6|7|8|9|0</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('single', 14) }"
                                        @click="setBetData('single', 14)">
                                        <span class="worli-odd">EVEN</span>
                                        <span class="d-block">2|4|6|8|0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <template v-if="remark && remark != ''">
                    <div class="casino-remark mt-3">
                        <div class="remark-icon">
                            <img :src="`${imgPath}front/img/icons/remark.png`">
                        </div>
                        <marquee>{{ remark }}</marquee>
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


        <b-modal id="placebet-modal" ref="placebet-modal" hide-footer title="BET SLIP"
            @hide="$store.commit('resetCasinoBetData')" :class="{'loader-section-parent':$store.state.loadingCasinoPlacebet}">
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
                        <button class="btn btn-primary" :disabled="invalid || !$store.state.casinoBet.betStatus"
                            @click="$parent.placebetCasino()">Submit</button>
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
                    'subtype': 'worli2'
                })
                return this.orderBy(player, 'sr')
            }
        },
        data() {
            return {
                showCards: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'worli2',
                casinoData: [],
                mId: 0,
                remark: '',
                cards: [],
                time: {
                    total: 0,
                    current: 0
                },
                callDataApi: true,
                callBookApi: true,
                exp: '',
                tvUrl: '',
                firstCall: true
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

            CheckSelected(type, btnNo) {
                if (type == 'single' || type == 'multi') {
                    if (this.$store.state.worlitabdata.single.selected == btnNo) {
                        return true;
                    }
                } else if (type == 'pana') {
                    for (var i = 0; i < this.$store.state.worlitabdata.pana.selected.length; i++) {
                        if (this.$store.state.worlitabdata.pana.selected[i] == btnNo) {
                            return true;
                        }
                    }
                } else if (type == 'sp') {
                    if (this.$store.state.worlitabdata.sp.selected == btnNo) {
                        return true;
                    }
                } else if (type == 'dp') {
                    if (this.$store.state.worlitabdata.dp.selected == btnNo) {
                        return true;
                    }
                } else if (type == 'trio') {
                    if (this.$store.state.worlitabdata.trio.selected == btnNo) {
                        return true;
                    }
                } else if (type == 'cycle') {
                    for (var i = 0; i < this.$store.state.worlitabdata.cycle.selected.length; i++) {
                        if (this.$store.state.worlitabdata.cycle.selected[i] == btnNo) {
                            return true;
                        }
                    }
                } else if (type == 'motor') {
                    for (var i = 0; i < this.$store.state.worlitabdata.motor.selected.length; i++) {
                        if (this.$store.state.worlitabdata.motor.selected[i] == btnNo) {
                            return true;
                        }
                    }
                } else if (type == 'chart56') {
                    if (this.$store.state.worlitabdata.chart56.selected == btnNo) {
                        return true;
                    }
                } else if (type == 'chart64') {
                    if (this.$store.state.worlitabdata.chart64.selected == btnNo) {
                        return true;
                    }
                } else if (type == 'abr') {
                    if (this.$store.state.worlitabdata.abr.selected == btnNo) {
                        return true;
                    }
                } else if (type == 'commonSP') {
                    if (this.$store.state.worlitabdata.commonSP.selected == btnNo) {
                        return true;
                    }
                } else if (type == 'commonDP') {
                    if (this.$store.state.worlitabdata.commonDP.selected == btnNo) {
                        return true;
                    }
                } else if (type == 'colorDP') {
                    if (this.$store.state.worlitabdata.colorDP.selected == btnNo) {
                        return true;
                    }
                }
            },
            changeTab(sid) {
                if (this.loading)
                    return
                this.loading = true
                this.resetSelectedInTab();
                ServiceApi.callApi("api/front/worlisectiondata", {
                        'sid': sid,
                        'gtype': this.gameType,
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.loading = false
                            let data = response.data.Table[0]
                            this.remark = data.msg;
                            // console.log(data)
                            if (sid == 1) {
                                this.$store.state.worlitabdata.single.multi = data.multi;
                                this.$store.state.worlitabdata.single.single = data.single;
                            }

                        } else {
                            this.loading = false

                        }
                    })
                    .catch(e => {

                        this.loading = false
                    });
            },
            resetSelectedInTab() {
                this.$store.state.worlitabdata.single.selected = null;
                this.$store.state.casinoBet = null
            },
            getWorliSectionRules(displayModal) {
                ServiceApi.callApi("api/front/sectionpana", {
                    "sid": this.$store.state.casinoBet.sectionId,
                    "urate": this.$store.state.casinoBet.bhav
                }).then(response => {
                    if (response.status == 200) {
                        this.$store.state.worlitabdata.ruleList = response.data.t2
                        this.$store.state.worlitabdata.totalRule = response.data.t1[0].count
                        if (displayModal == true) {
                            this.$refs.rulesModal.show();
                        }
                    }
                }).catch(e => {

                });

            },
            toggleCards(card) {
                if (card != '1') {
                    this.showCards = !this.showCards
                }
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
                                this.changeTab(this.main[0].sid);
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
            setBetData(tabType, btnNo) {
                
                if (this.main[0].gstatus != 'OPEN') {
                    return;
                }
                let betdata = {}
                

                betdata.subId = 0
                betdata.amount = ''
                betdata.betType = 'back'
                betdata.gameType = this.gameType
                betdata.marketId = this.mId
                betdata.betStatus = false
                betdata.min = this.main[0].min
                betdata.max = this.main[0].max

                if (tabType == 'single' || tabType == 'multi') {
                    this.$store.state.worlitabdata.single.selected = btnNo

                    betdata.subType = this.main[0].subtype
                    betdata.sectionId = this.main[0].sid
                    betdata.bhav = this.$store.state.worlitabdata.single.selected

                    if (btnNo == 11) {
                        betdata.nation = "Line 1 Single";
                    } else if (btnNo == 12) {
                        betdata.nation = "Line 2 Single";
                    } else if (btnNo == 13) {
                        betdata.nation = "Odd Single";
                    } else if (btnNo == 14) {
                        betdata.nation = "Even Single";
                    } else {
                        betdata.nation = btnNo + " Single";
                    }

                    if (tabType == 'single')
                        betdata.uRate = this.$store.state.worlitabdata.single.single
                    else if (tabType == 'multi')
                        betdata.uRate = this.$store.state.worlitabdata.single.multi

                    betdata.betStatus = true
                    this.$store.state.worlitabdata.rulesStatus = false

                    this.$store.commit('setCasinoBetData', betdata)

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
            sortNumberString(inputval) {
                var zerostr = "";
                for (var i = 0; i < inputval.length; i++) {
                    if (inputval[i] == "0") {
                        zerostr += "0";
                    }
                }
                if (parseInt(inputval) != 0) {
                    inputval = parseInt(inputval) + zerostr;
                }
                return inputval;
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
            }
        },
        beforeDestroy() {
            this.callBookApi = false
            this.callDataApi = false
            this.$store.commit('resetCasinoBetData')
            this.$store.state.casinoRules = null
            this.$store.state.casinoBetSoda = null;
            this.$store.state.casinobetBook = null;
            this.$store.state.casinoFancybetBook = null;
            this.$store.state.lastResults = []
            this.$store.state.placebetInterval = 0
            this.$store.state.casinoGameType = ""
            clearInterval(PlacebetTimer);
        }
    }
</script>