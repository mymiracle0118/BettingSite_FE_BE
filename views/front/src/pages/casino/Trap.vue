<template>
    <div class="casino-container">
        <!-- Casino Content -->
        <template v-if="!$store.getters.isTablet">
            <TimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current" />
        </template>
        <div class="casino-table trap">
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
                        <!-- <div class="casino-video-cards"> -->
                        <div class="casino-cards-shuffle" @click="toggleCards(cards[0])">
                            <i class="fas fa-grip-lines-vertical"></i>
                        </div>
                        <div class="casino-video-cards-container">
                            <div class="row row5">
                                <div class="col-6 text-center">
                                    <span>
                                        <b>A</b>
                                        <div class="player-count">{{ count.playerA }}</div>
                                    </span>
                                </div>
                                <div class="col-6 text-center">
                                    <span>
                                        <b>B</b>
                                        <div class="player-count">{{ count.playerB }}</div>
                                    </span>
                                </div>
                            </div>
                            <div class="row row5">
                                <div class="col-6 text-center">
                                    <VerticalSlider :slides="playerACards" :options="vSliderOptions"/>
                                </div>
                                <div class="col-6 text-center">
                                    <VerticalSlider :slides="playerBCards" :options="vSliderOptions"/>
                                </div>
                            </div>

                            <!-- <template v-for="(i, key) in 7">
                                <div class="row row5" :key="key">
                                    <div class="col-6">
                                        <Card :card="cards[(key+i)-1]" v-if="cards[(key+i)-1] != 1"/>
                                    </div>
                                    <div class="col-6">
                                        <Card :card="cards[(key+i)]" v-if="cards[(key+i)] != 1"/>
                                    </div>
                                </div>
                            </template> -->
                        </div>
                    </div>
                </template>
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

            <div class="casino-detail" v-if="casinoData && casinoData.mid">
                <div class="teen1daycasino-container ">
                    <div class="teen1dayleft">
                        <div class="casino-box-row">
                            <div class="casino-nation-name">
                                <b>Player A</b>
                                <div class="float-right">
                                    <span class="mr-2" v-casinobook="{sid: trap[0].sid}">0</span>
                                </div>
                            </div>
                            <div class="casino-bl-box">
                                <div class="back casino-bl-box-item" :class="{'suspended': trap[0].gstatus != 'OPEN'}"
                                    @click="setBetData(trap[0].nat, trap[0].b, mId, trap[0].sid, trap[0].subtype, 0, 'back', gameType, trap[0].gstatus, trap[0].min, trap[0].max)">
                                    <span class="casino-box-odd">{{ trap[0].b }}</span>
                                </div>
                                <div class="lay casino-bl-box-item" :class="{'suspended': trap[0].gstatus != 'OPEN'}"
                                    @click="setBetData(trap[0].nat, trap[0].l, mId, trap[0].sid, trap[0].subtype, 0, 'lay', gameType, trap[0].gstatus, trap[0].min, trap[0].max)">
                                    <span class="casino-box-odd">{{ trap[0].l }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="teen1daycenter"></div>
                    <div class="teen1dayright">
                        <div class="casino-box-row">
                            <!-- <div class="casino-bl-box d-none-mobile">
                                <div class="back casino-bl-box-item" :class="{'suspended': trap[1].gstatus != 'OPEN'}"
                                    @click="setBetData(trap[1].nat, trap[1].b, mId, trap[1].sid, trap[1].subtype, 0, 'back', gameType, trap[1].gstatus, trap[1].min, trap[1].max)">
                                    <span class="casino-box-odd">{{ trap[1].b }}</span>
                                </div>
                                <div class="lay casino-bl-box-item" :class="{'suspended': trap[1].gstatus != 'OPEN'}"
                                    @click="setBetData(trap[1].nat, trap[1].l, mId, trap[1].sid, trap[1].subtype, 0, 'lay', gameType, trap[1].gstatus, trap[1].min, trap[1].max)">
                                    <span class="casino-box-odd">{{ trap[1].l }}</span>
                                </div>
                            </div> -->
                            <div class="casino-nation-name">
                                <b>Player B</b>
                                <div class="float-right">
                                    <span class="mr-2" v-casinobook="{sid: trap[1].sid}">0</span>
                                </div>
                            </div>
                            <div class="casino-bl-box">
                                <div class="back casino-bl-box-item" :class="{'suspended': trap[1].gstatus != 'OPEN'}"
                                    @click="setBetData(trap[1].nat, trap[1].b, mId, trap[1].sid, trap[1].subtype, 0, 'back', gameType, trap[1].gstatus, trap[1].min, trap[1].max)">
                                    <span class="casino-box-odd">{{ trap[1].b }}</span>
                                </div>
                                <div class="lay casino-bl-box-item" :class="{'suspended': trap[1].gstatus != 'OPEN'}"
                                    @click="setBetData(trap[1].nat, trap[1].l, mId, trap[1].sid, trap[1].subtype, 0, 'lay', gameType, trap[1].gstatus, trap[1].min, trap[1].max)">
                                    <span class="casino-box-odd">{{ trap[1].l }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="teen1daycasino-container">
                    <div class="teen1dayleft">
                        <template v-for="(data, key) in highLow">
                            <template v-if="data.visible == 1">
                                <div class="seven-up-down-box" :key="key">
                                    <template v-for="(odds,key) in orderBy(data.odds, 'sno', -1)">
                                        <template v-if="odds.sid ==2">
                                            <div class="up-box" :key="`up${key}`"
                                                :class="{'suspended': data.gstatus != 'OPEN'}"
                                                @click="setBetData(`${data.nat} ${odds.nat}`, odds.b, mId, data.sid, data.subtype, odds.sid, 'back', gameType, data.gstatus, data.min, data.max)">
                                                <div class="up-down-book"
                                                    v-casinofancybook="{sid: data.sid, subid: odds.sid}">0</div>
                                                <div class="text-right">
                                                    <div class="up-down-odds">{{ odds.b }}</div>
                                                    <span>LOW</span>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-if="odds.sid ==1">
                                            <div class="down-box" :key="`down${key}`"
                                                :class="{'suspended': data.gstatus != 'OPEN'}"
                                                @click="setBetData(`${data.nat} ${odds.nat}`, odds.b, mId, data.sid, data.subtype, odds.sid, 'back', gameType, data.gstatus, data.min, data.max)">
                                                <div class="text-left">
                                                    <div class="up-down-odds">{{ odds.b }}</div>
                                                    <span>HIGH</span>
                                                </div>
                                                <div class="up-down-book"
                                                    v-casinofancybook="{sid: data.sid, subid: odds.sid}">0</div>
                                            </div>
                                        </template>
                                    </template>
                                    <div class="seven-box">
                                        <img :src="`${imgPath}front/img/trape-seven.png`">
                                    </div>
                                </div>
                            </template>
                        </template>
                    </div>
                    <div class="teen1daycenter"></div>
                    <div class="teen1dayright">
                        <template v-for="(data, key) in jqk">
                            <template v-if="data.visible == 1">
                                <div class="casino-box-row jqk-box" :key="key">
                                    <div class="casino-nation-name">
                                        <span>
                                            <img :src="`${imgPath}front/img/cards/J.png`">
                                            <img :src="`${imgPath}front/img/cards/Q.png`">
                                            <img :src="`${imgPath}front/img/cards/K.png`">
                                        </span>
                                        <div class="float-right">
                                            <span class="mr-2"
                                                v-casinofancybook="{sid: data.sid, subid: data.odds[0].sid}">0</span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': data.gstatus != 'OPEN'}"
                                            @click="setBetData(`${data.nat} ${data.odds[0].nat}`, data.odds[0].b, mId, data.sid, data.subtype, data.odds[0].sid, 'back', gameType, data.gstatus, data.min, data.max)">
                                            <span class="casino-box-odd">{{ data.odds[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item"
                                            :class="{'suspended': data.gstatus != 'OPEN'}"
                                            @click="setBetData(`${data.nat} ${data.odds[0].nat}`, data.odds[0].l, mId, data.sid, data.subtype, data.odds[0].sid, 'lay', gameType, data.gstatus, data.min, data.max)">
                                            <span class="casino-box-odd">{{ data.odds[0].l }}</span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </div>
                </div>
                
                <div class="teen1daycasino-container trap-number d-none-desktop">
                    <img :src="`${imgPath}front/img/trap13.png`" class="img-fluid">
                    <img :src="`${imgPath}front/img/trap14.png`" class="img-fluid">
                    <img :src="`${imgPath}front/img/trap15.png`" class="img-fluid">
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
    import VerticalSlider from '@/components/casino/VerticalSlider'
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
            VerticalSlider,
            Loader,
            InactivityModal
        },
        computed: {
            trap() {
                var trap = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'trap'
                })
                return this.orderBy(trap, 'sr')
            },
            highLow() {
                var highlow = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'highlow'
                })
                return this.orderBy(highlow, 'sr')
            },
            jqk() {
                var jqk = _.filter(_.get(this.casinoData, 'sub'), (o) => {
                    return (o.subtype == 'jqk')
                })
                return this.orderBy(jqk, 'sr')
            }
        },
        data() {
            return {
                vSliderOptions:{
                    perPage: 5,
                    height: 255,
                    breakpoints: {
                        w320:{
                            perPage: 3,
                            height: 82
                        },
                        w375:{
                            perPage: 3,
                            height: 100
                        },
                        w425:{
                            perPage: 3,
                            height: 100
                        },
                        w768:{
                            perPage: 4,
                            height: 200
                        },
                        w1024:{
                            perPage: 4,
                            height: 200
                        },
                        w1440:{
                            perPage: 4,
                            height: 190
                        },
                        w1920:{
                            perPage: 5,
                            height: 255
                        }
                    }
                },
                showCards: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'trap',
                casinoData: [],
                mId: 0,
                // cards: ["ADD","2DD","3DD","4DD","5DD","6DD","7DD","8DD","9DD","10DD"],
                cards: [],
                count: {
                    playerA: 0,
                    playerB: 0
                },
                playerALength: '',
                playerACards: [],
                playerBLength: '',
                playerBCards: [],
                time: {
                    total: 0,
                    current: 0
                },
                callDataApi: true,
                callBookApi: true,
                exp: '',
                tvUrl: '',
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
                            // this.exp = _.get(this.$store.state.user, 'exp', 0)
                            this.cards = _.get(this.casinoData, 'card').split(',')
                            this.time.total = _.get(this.casinoData, 'ft')
                            this.time.current = _.get(this.casinoData, 'lt')

                            var playerACards = []
                            var playerBCards = []

                            this.cards.forEach(function (card, index) {
                                if (index % 2 === 0) {
                                    if(card != 1){
                                        playerACards.push(card)
                                    }
                                } else {
                                    if(card != 1){
                                        playerBCards.push(card)
                                    }
                                }
                            });
                            if(this.playerALength != playerACards.length){
                                this.playerACards = playerACards
                            }
                            this.playerALength = playerACards.length

                            if(this.playerBLength != playerBCards.length){
                                this.playerBCards = playerBCards
                            }
                            this.playerBLength = playerBCards.length

                            // console.log(this.playerACards, this.playerBCards)

                            let playerACount = 0;
                            for (const card of this.playerACards) {
                                let cardno = "0";
                                if (card != 1) {
                                    if (card.length == 4) {
                                        cardno = card.slice(0, 2);
                                    } else {
                                        cardno = card.slice(0, 1);
                                    }
                                }

                                if (cardno == "K") {
                                    cardno = 13;
                                }
                                if (cardno == "Q") {
                                    cardno = 12;
                                }
                                if (cardno == "J") {
                                    cardno = 11;
                                }
                                if (cardno == "A") {
                                    cardno = 1;
                                }
                                playerACount += parseInt(cardno);
                            }
                            this.count.playerA = playerACount;

                            let playerBCount = 0;
                            for (const card of this.playerBCards) {
                                let cardno = "0";
                                if (card != 1) {
                                    if (card.length == 4) {
                                        cardno = card.slice(0, 2);
                                    } else {
                                        cardno = card.slice(0, 1);
                                    }
                                }

                                if (cardno == "K") {
                                    cardno = 13;
                                }
                                if (cardno == "Q") {
                                    cardno = 12;
                                }
                                if (cardno == "J") {
                                    cardno = 11;
                                }
                                if (cardno == "A") {
                                    cardno = 1;
                                }
                                playerBCount += parseInt(cardno);
                            }
                            this.count.playerB = playerBCount;

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
                        max: max
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