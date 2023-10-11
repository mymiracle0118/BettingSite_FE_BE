<template>
    <div class="casino-container">
        <!-- Casino Content -->
        <template v-if="!$store.getters.isTablet">
            <TimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current" />
        </template>
        <div class="casino-table cricket20">
            <div class="casino-video">
                <InactivityModal ref="tvModal" />
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

                <div class="cricket20videobannerbox" v-if="roundBanner">
                    <img :src="`${imgPath}front/img/cricket20bg.jpg`" class="img-fluid">

                    <div class="cricket20videobanner">
                        <div>
                            Team A<br>{{ score[1] }}/{{ score[2] }}<br>{{ score[3] }} OVERS
                        </div>
                        <div>
                            Team A<br>{{ score[4] }}/{{ score[5] }}<br>{{ score[6] }} OVERS
                        </div>
                        <template v-if="casinoData.remark && casinoData.remark != ''">
                            <div class="w-100">{{ casinoData.remark }}</div>
                        </template>
                        <div class="cricket20bannertitle">{{ gameTitle }}</div>
                        <div class="cricket20balls">
                            <img :src="`${imgPath}front/img/balls/ball2.png`">
                            <img :src="`${imgPath}front/img/balls/ball3.png`">
                            <img :src="`${imgPath}front/img/balls/ball4.png`">
                            <img :src="`${imgPath}front/img/balls/ball5.png`">
                            <img :src="`${imgPath}front/img/balls/ball6.png`">
                            <img :src="`${imgPath}front/img/balls/ball7.png`">
                            <img :src="`${imgPath}front/img/balls/ball8.png`">
                            <img :src="`${imgPath}front/img/balls/ball9.png`">
                            <img :src="`${imgPath}front/img/balls/ball10.png`">
                        </div>
                    </div>
                </div>

                <transition name="bounce" mode="in-out">
                    <template v-if="$store.state.runNo != null">
                        <div class="cricket20ballpopup">
                            <img :src="`${imgPath}front/img/balls/ball${$store.state.runNo}.png`">
                        </div>
                    </template>
                </transition>

                <template v-if="cards && cards.length">
                    <div class="casino-video-cards" :class="{'hide-cards': (!showCards || cards[0] == '1')}">
                        <div class="casino-cards-shuffle" @click="toggleCards(cards[0])">
                            <i class="fas fa-grip-lines-vertical"></i>
                        </div>
                        <div class="casino-video-cards-container">
                            <div class="dealer-name">Dealer</div>
                            <div>
                                <Card :card="cards[0]" />
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

                <div class="cricket20books" v-if="$store.state.casinobetBook && $store.state.casinobetBook.length">
                    <template v-for="(book, key) in $store.state.casinobetBook">
                        <div :key="key">{{ book.sid }} -&gt; <span
                                :class="[{ 'text-success': book.amt >= 0 }, { 'text-danger': book.amt < 0 }]">{{ book.amt }}</span>
                        </div>
                    </template>
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
                <div class="teen20casino-container">
                    <div class="teen20left">
                        <template v-for="(i, key) in 5">
                            <div class="score-box" :key="key">
                                <div class="team-score">
                                    <div>
                                        <div class="text-center"><b>Team A</b></div>
                                        <div class="text-center">
                                            <span class="ml-1">{{ score[1] }}/{{ score[2] }}</span>
                                            <span class="ml-1">{{ score[3] }} Overs</span>
                                        </div>
                                    </div>
                                    <template v-if="checkBetExist(main[key].sid)">
                                        <div>
                                            <div class="text-center"><b>Team B</b></div>
                                            <div class="text-center">
                                                <span
                                                    class="ml-1">{{ parseInt(score[4]) + parseInt(key+2) + getCardValue() }}/{{ score[5] }}</span>
                                                <template v-if="cards[0] != 1">
                                                    <span class="ml-1">20 Overs</span>
                                                </template>
                                                <template v-else>
                                                    <span
                                                        class="ml-1">{{ score[6] != '19.5' ? parseFloat(score[6])+0.1 : score[6] }}
                                                        Overs</span>
                                                </template>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div>
                                            <div class="text-center"><b>Team B</b></div>
                                            <div class="text-center">
                                                <span
                                                    class="ml-1">{{ parseInt(score[4]) + getCardValue() }}/{{ score[5] }}</span>
                                                <template v-if="cards[0] != 1">
                                                    <span class="ml-1">20 Overs</span>
                                                </template>
                                                <template v-else>
                                                    <span class="ml-1">{{ score[6] }} Overs</span>
                                                </template>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                                <div class="ball-icon">
                                    <img :src="`${imgPath}front/img/balls/ball${i+1}.png`">
                                </div>
                                <div class="blbox" :class="{'suspended': main[key].gstatus != 'OPEN'}">
                                    <div class="back"
                                        @click="setBetData(main[key].nat, main[key].b, mId, main[key].sid, main[key].subtype, 0, 'back', gameType, main[key].gstatus, main[key].min, main[key].max)">
                                        <span class="odds d-block">{{ main[key].b }}</span>
                                    </div>
                                    <div class="lay"
                                        @click="setBetData(main[key].nat, main[key].l, mId, main[key].sid, main[key].subtype, 0, 'lay', gameType, main[key].gstatus, main[key].min, main[key].max)">
                                        <span class="odds d-block">{{ main[key].l }}</span>
                                    </div>
                                </div>
                                <!-- <div class="c20minmax">
                                    <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                        :data-target="`#left${key}`"></i>
                                    <div :id="`left${key}`" class="collapse icon-range">
                                        R:<span v-kval="{size: main[key].min}"></span>-<span
                                            v-kval="{size: main[key].max}"></span>
                                    </div>
                                </div> -->
                            </div>
                        </template>
                    </div>
                    <div class="teen20right">
                        <template v-for="(i, key) in 4">
                            <div class="score-box" :key="key">
                                <div class="team-score">
                                    <div>
                                        <div class="text-center"><b>Team A</b></div>
                                        <div class="text-center">
                                            <span class="ml-1">{{ score[1] }}/{{ score[2] }}</span>
                                            <span class="ml-1">{{ score[3] }} Overs</span>
                                        </div>
                                    </div>
                                    <template v-if="checkBetExist(main[key+5].sid)">
                                        <div>
                                            <div class="text-center"><b>Team B</b></div>
                                            <div class="text-center">
                                                <span
                                                    class="ml-1">{{ parseInt(score[4]) + parseInt(key+7) + getCardValue() }}/{{ score[5] }}</span>
                                                <template v-if="cards[0] != 1">
                                                    <span class="ml-1">20 Overs</span>
                                                </template>
                                                <template v-else>
                                                    <span
                                                        class="ml-1">{{ score[6] != '19.5' ? parseFloat(score[6])+0.1 : score[6] }}
                                                        Overs</span>
                                                </template>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div>
                                            <div class="text-center"><b>Team B</b></div>
                                            <div class="text-center">
                                                <span
                                                    class="ml-1">{{ parseInt(score[4]) + getCardValue() }}/{{ score[5] }}</span>
                                                <template v-if="cards[0] != 1">
                                                    <span class="ml-1">20 Overs</span>
                                                </template>
                                                <template v-else>
                                                    <span class="ml-1">{{ score[6] }} Overs</span>
                                                </template>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                                <div class="ball-icon">
                                    <img :src="`${imgPath}front/img/balls/ball${i+6}.png`">
                                </div>
                                <div class="blbox" :class="{'suspended': main[key+5].gstatus != 'OPEN'}">
                                    <div class="back"
                                        @click="setBetData(main[key+5].nat, main[key+5].b, mId, main[key+5].sid, main[key+5].subtype, 0, 'back', gameType, main[key+5].gstatus, main[key+5].min, main[key+5].max)">
                                        <span class="odds d-block">{{ main[key+5].b }}</span>
                                    </div>
                                    <div class="lay"
                                        @click="setBetData(main[key+5].nat, main[key+5].l, mId, main[key+5].sid, main[key+5].subtype, 0, 'lay', gameType, main[key+5].gstatus, main[key+5].min, main[key+5].max)">
                                        <span class="odds d-block">{{ main[key+5].l }}</span>
                                    </div>
                                </div>
                                <!-- <div class="c20minmax">
                                    <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                        :data-target="`#right${key}`"></i>
                                    <div :id="`right${key}`" class="collapse icon-range">
                                        R:<span v-kval="{size: main[key+5].min}"></span>-<span
                                            v-kval="{size: main[key+5].max}"></span>
                                    </div>
                                </div> -->
                            </div>
                        </template>

                        <template v-if="casinoData.remark && casinoData.remark != ''">
                            <div class="casino-remark">
                                <div class="remark-icon">
                                    <img :src="`${imgPath}front/img/icons/remark.png`">
                                </div>
                                <marquee>{{ casinoData.remark }}</marquee>
                            </div>
                        </template>
                    </div>
                </div>

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
                    <template
                        v-if="$pages.is('casino', $route.name) && $store.state.casinoBet && $store.state.casinoBet != null">
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
                            <input type="number" id="placebetAmountMobile"
                                v-model.number="$store.state.casinoBet.amount" class="form-control input-stake"
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
                        <button class="btn btn-primary" :disabled="invalid"
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

        <div class="market-show-icon d-none-desktop" v-if="$store.getters.betCasinoSodaTotal"
            v-b-modal.betCasinoSodaModal>
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

            this.roundBanner = true
            var self = this
            setTimeout(() => {
                self.roundBanner = false
            }, 6000)
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
                    'subtype': 'cmatch20'
                })
                return this.orderBy(player, 'sr')
            }
        },
        data() {
            return {
                showCards: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'cmatch20',
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
                score: [],
                roundBanner: false,
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

            showRoundBanner() {
                if (this.casinoData && this.casinoData.mid != 0) {
                    this.roundBanner = true
                    var self = this
                    setTimeout(() => {
                        self.roundBanner = false
                    }, 4000)
                }
            },
            checkBetExist(sid) {
                var sectionId = parseInt(sid) + 1
                var flag = false
                if (this.$store.state.casinoBetSoda && this.$store.state.casinoBetSoda.length) {
                    this.$store.state.casinoBetSoda.forEach(bet => {
                        let nation = parseInt(bet.nat.replace("Run ", ""))
                        if (nation == sectionId) {
                            flag = true
                        }
                    });
                }
                return flag
            },
            getCardValue() {
                if (this.cards[0] != 1) {
                    if (this.cards[0].length == 3) {
                        var value = this.cards[0].slice(0, 1)
                        if (value.toLowerCase() == 'a') {
                            return 1
                        } else {
                            return parseInt(value)
                        }
                    }
                    if (this.cards[0].length == 4) {
                        var value = this.cards[0].slice(0, 2)
                        if (value == '10') {
                            return parseInt(value)
                        } else {
                            return 0
                        }
                    }
                } else {
                    return 0
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
                                this.showRoundBanner()
                            }
                            this.mId = _.get(this.casinoData, 'mid')
                            this.getUserBook()
                            this.cards = _.get(this.casinoData, 'card').split(',')
                            this.score = _.get(this.casinoData, 'score').split(',')
                            this.time.total = _.get(this.casinoData, 'ft')
                            this.time.current = _.get(this.casinoData, 'lt')

                            if (this.time.current <= 3) {
                                // console.log(this.$store.state.casinoBetSoda)
                                if (this.time.current == 3 && this.$store.state.casinoBetSoda == null) {
                                    var self = this
                                    setTimeout(() => {
                                        self.$store.state.runNo = 0
                                    }, 500)
                                    setTimeout(() => {
                                        self.$store.state.runNo = null
                                    }, 3000)
                                }
                                this.score[6] = '19.5'

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
                if (this.exp != _.get(this.$store.state.user, 'exp', 0) || forcecall) {
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
            setBetData(nat, rate, mid, sid, subType, subId, bType, gType, gstatus, min, max) {
                // console.log(nat, rate, mid, sid, subType, subId, bType, gType, gstatus)
                // console.log(min, max)
                if (rate && gstatus == 'OPEN') {
                    let betdata = {
                        subType: subType,
                        marketId: mid,
                        sectionId: sid,
                        subId: subId,
                        uRate: rate,
                        amount: '',
                        betType: bType,
                        gameType: gType,
                        nation: nat,
                        min: min,
                        max: max,
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

                            var sid = this.$store.state.casinoBet.sectionId
                            var self = this
                            setTimeout(() => {
                                self.$store.state.runNo = parseInt(sid) + 1
                            }, 500)
                            setTimeout(() => {
                                self.$store.state.runNo = null
                            }, 2000)

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