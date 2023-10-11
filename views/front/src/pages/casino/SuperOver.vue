<template>
    <div class="casino-container">
        <!-- Casino Content -->
        <div class="casino-table super-over detail-page-container">
            <div class="game-header sport4">
                <span class="game-header-name">{{ casinoData.ename }}</span>
                <span class="game-header-date">Round ID: {{ casinoData.gmid }}</span>
                <!-- <i class="fas fa-tv d-none-desktop"></i> -->
            </div>

            <div class="container-fluid container-fluid-5">
                <div class="row row5 mt-2">
                    <div class="col-12 col-lg-2 banner d-flex align-items-center">
                        <template v-if="casinoData && casinoData.scard != 2">
                            <div class="scorecard" v-if="casinoData.scard == 1 && scoreboardData.isfinished == '0'">
                                <div class="scorecard-row">
                                    <div class="score-top-row">
                                        <div class="score-team">
                                            <b>{{ scoreboardData.spnnation1 }}</b> {{ scoreboardData.score1 }}
                                        </div>
                                        <div>
                                            <span v-if="scoreboardData.spnrunrate1 !== ''">
                                                CRR
                                                {{ scoreboardData.spnrunrate1 }}
                                            </span>
                                            <span v-if="scoreboardData.spnreqrate1 !== ''">
                                                RR
                                                {{ scoreboardData.spnreqrate1 }}
                                            </span>
                                        </div>
                                        <div class="score-message" v-if="scoreboardData.spnballrunningstatus != ''">
                                            <span v-if="scoreboardData.dayno !== ''">
                                                Day
                                                {{ scoreboardData.dayno }} |
                                            </span>
                                            {{ scoreboardData.spnballrunningstatus }}
                                        </div>
                                        <div class="score-message" v-if="scoreboardData.spnmessage != ''">
                                            <span v-if="scoreboardData.dayno !== ''">
                                                Day
                                                {{ scoreboardData.dayno }} |
                                            </span>
                                            {{ scoreboardData.spnmessage }}
                                        </div>
                                    </div>
                                </div>
                                <div class="scorecard-row">
                                    <div class="score-top-row">
                                        <div class="score-team">
                                            <b>{{ scoreboardData.spnnation2 }}</b> {{ scoreboardData.score2 }}
                                        </div>
                                        <div>
                                            <span v-if="scoreboardData.spnrunrate2 !== ''">
                                                CRR
                                                {{ scoreboardData.spnrunrate2 }}
                                            </span>
                                            <span v-if="scoreboardData.spnreqrate2 !== ''">
                                                RR
                                                {{ scoreboardData.spnreqrate2 }}
                                            </span>
                                        </div>
                                        <div class="score-message">
                                            <template v-for="(ball, key) in scoreboardData.balls">
                                                <span :key="key" v-if="ball !== '' " class="ball-runs mr-1"
                                                    :class="[{'four' : ball == 4}, {'six' : ball == 6}, {'wicket' : ball.toLowerCase() == 'ww'}]">{{ ball }}</span>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="col-lg-10 col-12">
                        <template v-if="!$store.getters.isTablet">
                            <TimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current" />
                        </template>
                        <div class="casino-video">
                            <InactivityModal ref="tvModal" />
                            <div class="video-box-container">
                                <div class="five-video-baner video-box">
                                    <iframe :src="tvUrl" v-if="tvUrl != ''">
                                    </iframe>
                                </div>
                            </div>
                            <template v-if="cards && cards.length">
                                <div class="casino-video-cards"
                                    :class="{'hide-cards': (!showCards || cards[0] == '1')}">
                                    <div class="casino-cards-shuffle" @click="toggleCards(cards[0])">
                                        <i class="fas fa-grip-lines-vertical"></i>
                                    </div>
                                    <div class="casino-video-cards-container">
                                        <div v-for="n in 6">
                                            <template v-for="(card, key) in cards[n-1].split(',')">
                                                <Ball :ball="card" :key="key" />
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <div class="casino-timer d-none-mobile">
                                <Timer v-if="time.total != 0" :totalTime="time.total" :currentTime="time.current" />
                            </div>
                            <template v-if="time.total > 3 && (time.current <= 3 && time.current > 0)">
                                <transition name="component-fade" mode="out-in">
                                    <div :key="time.current" class="casino-time-digit d-none-desktop">{{ time.current }}
                                    </div>
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
                                <b-modal ref="rules-modal" modal-class="casino-rules teenpatti2-rule-modal"
                                    title="Rules" hide-footer>
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
                                :class="{'show-rules': showRules}" v-if="showRules" aria-modal="true"
                                style="display: block;">
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
                    </div>
                </div>
            </div>

            <template v-for="(data, key) in orderBy(gameData.new, 'sno')">
                <template v-if="data.gtype != 'match'">
                    <template v-if="data.dtype == 2">
                        <Market2 :key="key" :index="key" :marketDataNew="data"
                            :marketDataOld="orderBy(gameData.old, 'sno')[key]" />
                    </template>
                    <template v-if="data.dtype == 4">
                        <Market4 :key="key" :index="key" :marketDataNew="data"
                            :marketDataOld="orderBy(gameData.old, 'sno')[key]" />
                    </template>
                    <template v-if="data.dtype == 5">
                        <Market5 :key="key" :index="key" :marketDataNew="data"
                            :marketDataOld="orderBy(gameData.old, 'sno')[key]" />
                    </template>

                    <template v-if="data.dtype == 6">
                        <Market6 :key="key" :index="key" :marketDataNew="data"
                            :marketDataOld="orderBy(gameData.old, 'sno')[key]" />
                    </template>

                    <template v-if="data.dtype == 7">
                        <Market7 :key="key" :index="key" :marketDataNew="data"
                            :marketDataOld="orderBy(gameData.old, 'sno')[key]" />
                    </template>

                </template>
            </template>

            <template v-if="!$store.getters.isTablet">
                <LastResultIcon />

                <!-- SuperOver CASINO Rules Start -->
                <div class="mt-2 cricket-rule casino-place-bet">
                    <div class="casino-place-bet-title text-center">ENG vs RSA<br>Inning's Card
                        Rules</div>
                    <div class="card">
                        <div class="card-header">
                            <div class="row row5 mt-1">
                                <div class="col-4">Cards</div>
                                <div class="col-3 text-center">Count</div>
                                <div class="col-5 text-right">Value</div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row row5 mt-1">
                                <div class="col-4">
                                    <img :src="`${imgPath}front/img/superOver/cards/cardA.png`">
                                    <span class="ml-2">X</span>
                                </div>
                                <div class="col-3 text-center">5</div>
                                <div class="col-5 text-right value">
                                    <img :src="`${imgPath}front/img/superOver/balls/ball1.png`">
                                </div>
                            </div>
                            <div class="row row5 mt-1">
                                <div class="col-4">
                                    <img :src="`${imgPath}front/img/superOver/cards/card2.png`">
                                    <span class="ml-2">X</span>
                                </div>
                                <div class="col-3 text-center">5</div>
                                <div class="col-5 text-right value">
                                    <img :src="`${imgPath}front/img/superOver/balls/ball2.png`">
                                </div>
                            </div>
                            <div class="row row5 mt-1">
                                <div class="col-4">
                                    <img :src="`${imgPath}front/img/superOver/cards/card3.png`">
                                    <span class="ml-2">X</span>
                                </div>
                                <div class="col-3 text-center">5</div>
                                <div class="col-5 text-right value">
                                    <img :src="`${imgPath}front/img/superOver/balls/ball3.png`">
                                </div>
                            </div>
                            <div class="row row5 mt-1">
                                <div class="col-4">
                                    <img :src="`${imgPath}front/img/superOver/cards/card4.png`">
                                    <span class="ml-2">X</span>
                                </div>
                                <div class="col-3 text-center">5</div>
                                <div class="col-5 text-right value">
                                    <img :src="`${imgPath}front/img/superOver/balls/ball4.png`">
                                </div>
                            </div>
                            <div class="row row5 mt-1">
                                <div class="col-4">
                                    <img :src="`${imgPath}front/img/superOver/cards/card6.png`">
                                    <span class="ml-2">X</span>
                                </div>
                                <div class="col-3 text-center">5</div>
                                <div class="col-5 text-right value">
                                    <img :src="`${imgPath}front/img/superOver/balls/ball6.png`">
                                </div>
                            </div>
                            <div class="row row5 mt-1">
                                <div class="col-4">
                                    <img :src="`${imgPath}front/img/superOver/cards/card10.png`">
                                    <span class="ml-2">X</span>
                                </div>
                                <div class="col-3 text-center">5</div>
                                <div class="col-5 text-right value">
                                    <img :src="`${imgPath}front/img/superOver/balls/ball0.png`">
                                </div>
                            </div>
                            <div class="row row5 mt-1">
                                <div class="col-4">
                                    <img :src="`${imgPath}front/img/superOver/cards/cardK.png`">
                                    <span class="ml-2">X</span>
                                </div>
                                <div class="col-3 text-center">5</div>
                                <div class="col-5 text-right value">
                                    WICKET
                                    <img :src="`${imgPath}front/img/superOver/balls/wicket.png`">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- SuperOver CASINO Rules End -->
            </template>

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


        <b-modal ref="placebet-modal" hide-footer title="BET SLIP" @hide="$store.commit('resetBetData')"
            :class="{'loader-section-parent':$store.state.loadingPlacebet}">
            <Loader :isVisible="$store.state.loadingPlacebet"></Loader>

            <ValidationObserver tag="div" v-slot="{ invalid }">
                <template v-if="$store.state.bet && $store.state.bet != null">
                    <div class="bet-slip-box">
                        <div class="bet-slip">
                            <div class="bet-nation">
                                <span>{{ $store.state.bet.eventName }}</span>
                            </div>
                            <div class="match-result">
                                {{ $store.state.bet.marketName }}
                            </div>
                            <div class="bet-team">
                                <span class="bet-team-name">{{ $store.state.bet.sectionName }}
                                    <template v-if="$store.state.bet.gType == 'fancy'"> -
                                        {{ $store.state.bet.size }}</template>
                                    <template v-if="$store.state.bet.gType == 'khado'"> -
                                        {{ $store.state.bet.khado }}</template>
                                </span>
                                <template v-if="$store.state.bet.gType == 'khado' || $store.state.bet.gType == 'match'">
                                    <div class="odds-box float-right">
                                        <input type="text" class="form-control" readonly="readonly"
                                            v-model="$store.state.bet.uRate">
                                        <a href="javascript:void(0)" @click="$store.commit('incrementStep')">
                                            <img :src="imgPath + 'front/img/arrow-down.svg'" class="arrow-up">
                                        </a>
                                        <a href="javascript:void(0)" @click="$store.commit('decrementStep')">
                                            <img :src="imgPath + 'front/img/arrow-down.svg'" class="arrow-down">
                                        </a>
                                    </div>
                                </template>
                                <template v-else>
                                    <span class="float-right">{{ $store.state.bet.uRate }}</span>
                                </template>
                            </div>
                        </div>

                        <ValidationProvider name="Amount" tag="div" class="bet-input"
                            :class="[{'back-border' : $store.state.bet.gType == 'oddeven' ? true : $store.state.bet.betType.toLowerCase() == 'back'}, {'lay-border' : $store.state.bet.gType == 'oddeven' ? false : $store.state.bet.betType.toLowerCase() == 'lay'}]"
                            :rules="{required: true, min_value : 1, max_value : 999999999, regex: /^[0-9]+$/}">
                            <input type="number" id="placebetAmountMobile" v-model.number="$store.state.bet.amount"
                                @input="$store.commit('updateBetAmount', $store.state.bet.amount)" class="form-control"
                                onkeypress='return event.charCode >= 48 && event.charCode <= 57' placeholder="Amount">
                        </ValidationProvider>

                        <div class="possible-win" v-if="$store.state.bet.profit">
                            <span>Profit:</span>
                            <h1 class="mb-0">{{ parseFloat($store.state.bet.profit) }}</h1>
                        </div>
                        <div class="bet-buttons">
                            <template v-for="(btn, key) in $store.state.buttonList">
                                <button class="btn btn-primary" @click="$store.commit('updateBetAmount', btn.bval)"
                                    :key="key">
                                    <span>{{ btn.btxt }}</span>
                                </button>
                            </template>
                        </div>
                        <div class="confirm-bets">
                            <b-form-checkbox id="autocon-2" :checked="$store.state.autocon"
                                @change="changeAutoCon($event)" name="autocon-2" switch>
                                Auto Confirm Bet
                            </b-form-checkbox>
                        </div>
                    </div>

                    <div class="place-bet-btn">
                        <button class="btn btn-primary btn-block" :disabled="invalid" @click="$parent.placebet()">
                            <span>Place bet</span>
                        </button>
                    </div>

                    <div class="container-fluid">
                        <template v-for="(section, key) in $store.state.bet.market">
                            <div class="row row5 mt-2" :key="key">
                                <div class="col-4">
                                    <span>{{ section.nat }}</span>
                                </div>
                                <div class="col-4 text-center text-success">
                                    <span v-sportbook="{mid: $store.state.bet.marketId, sid: section.sid}">0</span>
                                </div>
                                <div class="col-4 text-right text-danger">
                                    <span v-livebookv3="{mid: $store.state.bet.marketId, sid: section.sid}">0</span>
                                </div>
                            </div>
                        </template>
                    </div>
                </template>
            </ValidationObserver>
        </b-modal>

        <b-modal id="betCasinoSodaModal" hide-footer title="MY BETS" modal-class="mybetsmodal">
            <template v-if="$store.state.betSoda != null">
                <div class="my-market-container">
                    <div class="market-tabs">
                        <a href="javascript:void(0)" class="arrow-tabs arrow-left" @click="scroll_left">
                            <img :src="imgPath + 'front/img/arrow-down.svg'">
                        </a>
                        <ul class="nav nav-tabs">
                            <template v-for="(market, key) in $store.state.betSoda">
                                <li class="nav-item" :key="key">
                                    <a :href="`#sodatab${key}`" class="nav-link" :class="{'active':key==0}"
                                        data-toggle="tab">{{ market.sdata[0].mname }} ({{ market.sdata.length }})</a>
                                </li>
                            </template>
                        </ul>
                        <a href="javascript:void(0)" class="arrow-tabs arrow-right" @click="scroll_right">
                            <img :src="imgPath + 'front/img/arrow-down.svg'">
                        </a>
                    </div>

                    <div class="bet-slip-box tab-content">
                        <template v-for="(market, key) in $store.state.betSoda">
                            <div class="tab-pane" :class="[{'active':key==0}]" :id="`sodatab${key}`" :key="key">
                                <template v-for="(section, key1) in market.sdata">
                                    <div class="bet-slip" :key="key1"
                                        :class="[{'back-border': section.gtype == 'oddeven' ? true : section.btype.toLowerCase() == 'back'},{'lay-border': section.gtype == 'oddeven' ? false : section.btype.toLowerCase() == 'lay'}]">
                                        <!-- <div class="bet-nation">
                          <span>{{ section.mname }}</span>
                        </div> -->
                                        <div class="row row2 market-desc">
                                            <div class="col-6 text-left">
                                                <div class="my-market-nation">
                                                    {{ section.nat }}
                                                    <template v-if="section.gtype == 'fancy'">
                                                        / {{ section.bhav }}
                                                    </template>
                                                </div>
                                            </div>
                                            <div class="col-2 text-center">
                                                <div>{{ section.urate }}</div>
                                            </div>
                                            <div class="col-4 text-right">
                                                <div>{{ section.amt }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </b-modal>

        <div class="market-show-icon d-none-desktop" v-if="$store.getters.betSodaTotal" v-b-modal.betCasinoSodaModal>
            <span>{{ $store.getters.betSodaTotal }}</span>
        </div>
    </div>
</template>

<script>
    import ServiceApi from "@/services/ServiceApi";
    import Timer from "@/components/casino/BaseTimer"
    import TimerProgress from "@/components/casino/TimerProgress"
    import LastResultIcon from '@/components/casino/results/LastResultIcon'
    import Card from '@/components/casino/Card'
    import Ball from '@/components/casino/Ball'
    import Loader from '@/components/loader'

    import Market2 from "@/components/cricketv3/Market2";
    import Market4 from "@/components/cricketv3/Market4";
    import Market5 from "@/components/cricketv3/Market5";
    import Market6 from "@/components/cricketv3/Market6";
    import Market7 from "@/components/cricketv3/Market7";

    import io from "socket.io-client";
    var socketScoreBoard;
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
            Ball,
            Loader,
            Market2,
            Market4,
            Market5,
            Market6,
            Market7,
            InactivityModal
        },
        computed: {

        },
        data() {
            return {
                showCards: true,
                imgPath: IMG_PATH,
                gameType: 'superover',
                casinoData: [],
                gameData: {
                    old: {},
                    new: {}
                },
                gameId: 0,
                oldGameId: 0,
                mId: 0,
                cards: [],
                time: {
                    total: 0,
                    current: 0
                },
                scoreboardData: {},
                firstScoreboardCall: true,
                callDataApi: true,
                loadingPlacebet: false,
                tvUrl: '',
                exp: '',
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
                ServiceApi.callApi("api/front/cricketv3data", {
                        'type': this.gameType,
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.casinoData = response.data.t1

                            if (this.casinoData.card && this.casinoData.card != '') {
                                this.cards = _.get(this.casinoData, 'card').split('|')
                            } else {
                                this.cards = []
                            }

                            this.time.total = _.get(this.casinoData, 'ft')
                            this.time.current = _.get(this.casinoData, 'lt')

                            this.gameData.old = this.gameData.new
                            this.gameData.new = response.data.t2

                            // this.casinoData.scard = 1
                            if (this.casinoData.oldgmid != this.oldGameId) {
                                if (!this.firstCall) {
                                    this.$store.state.placebetInterval++
                                }
                                this.firstCall = false
                                this.getLastResults()
                                this.getUserBook(true, _.get(this.casinoData, 'gmid'))
                                if (socketScoreBoard) {
                                    socketScoreBoard.close()
                                }

                                this.connectScoreBoard();
                                if (this.firstScoreboardCall == false) {
                                    this.scoreboardData = {
                                        "spnnation1": "ENG",
                                        "spnnation2": "RSA",
                                        "spnballrunningstatus": "",
                                        "score1": "0-0 (0.0)",
                                        "score2": "0-0 (0.0)",
                                        "spnrunrate1": "0.00",
                                        "spnrunrate2": "",
                                        "spnmessage": "",
                                        "spnreqrate1": "",
                                        "spnreqrate2": "",
                                        "dayno": "",
                                        "isfinished": "0",
                                        "activenation1": "1",
                                        "activenation2": "0",
                                        "balls": [
                                            "",
                                            "",
                                            "",
                                            "",
                                            "",
                                            ""
                                        ]
                                    };
                                }
                                this.firstScoreboardCall = false;
                            }
                            this.gameId = this.casinoData.gmid
                            this.oldGameId = this.casinoData.oldgmid
                            this.getUserBook()

                            if (this.callDataApi == true) {
                                setTimeout(res => {
                                    this.getCasinoData();
                                }, 300);
                            }
                        } else {
                            // this.casinoData = []
                            if (this.callDataApi == true) {
                                setTimeout(res => {
                                    this.getCasinoData();
                                }, 300);
                            }
                        }
                    })
                    .catch(e => {
                        // this.casinoData = []
                        if (this.callDataApi == true) {
                            setTimeout(res => {
                                this.getCasinoData();
                            }, 300);
                        }
                    });
            },
            getUserBook(forcecall = false, gmid = _.get(this.casinoData, 'gmid')) {
                if (this.exp != _.get(this.$store.state.user, 'exp', 0) || forcecall) {
                    ServiceApi.callApi("api/front/userbook", {
                            gmid: parseInt(gmid)
                        })
                        .then(response => {
                            if (response.status == 200) {
                                this.$store.state.betSoda = response.data.bet
                                this.$store.state.sportbetBook = response.data.sportbet
                                this.$store.state.fancybetBook = response.data.fancy
                                // if (this.callBookApi == true) {
                                //     setTimeout(res => {
                                //         this.getUserBook();
                                //     }, 1000);
                                // }
                            } else {
                                this.$store.state.betSoda = null
                                this.$store.state.sportbetBook = null
                                this.$store.state.fancybetBook = null
                                // if (this.callBookApi == true) {
                                //     setTimeout(res => {
                                //         this.getUserBook();
                                //     }, 1000);
                                // }
                            }
                        })
                        .catch(e => {
                            this.$store.state.betSoda = null
                            this.$store.state.sportbetBook = null
                            this.$store.state.fancybetBook = null
                            // if (this.callBookApi == true) {
                            //     setTimeout(res => {
                            //         this.getUserBook();
                            //     }, 1000);
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
                        } else {
                            this.$store.state.lastResults = []
                        }
                    })
                    .catch(e => {
                        this.$store.state.lastResults = []
                    });

            },
            connectScoreBoard() {
                if (this.casinoData.oldgmid == null) {
                    return
                }
                let self = this;
                //NEW SCOREBOARD
                var url = self.casinoData.scard == 0 ? SCOREBOARD_URL + '?format=binary' : SCOREBOARD_URL
                socketScoreBoard = io.connect(url, {
                    transports: ["websocket"]
                });
                socketScoreBoard.on("connect", function () {
                    socketScoreBoard.emit("subscribe", {
                        type: self.casinoData.scard == 0 ? 2 : self.casinoData.scard,
                        rooms: [parseInt(self.casinoData.oldgmid)]
                        // rooms: [parseInt('30233775')]
                    });
                });
                socketScoreBoard.on("error", function () {
                    // console.log("error");
                });
                socketScoreBoard.on("update", function (response) {
                    if (self.casinoData.scard == 0) {
                        const SocketMsg = protobuf.roots.default.EventPublish;
                        var msg = SocketMsg.decode(new Uint8Array(response.data));
                        // console.log(JSON.stringify(msg));
                    } else {
                        var msg = response.data;
                    }
                    // console.log(msg)
                    if (msg != undefined && msg != null && msg.isfinished == 1) {
                        socketScoreBoard.emit("unsubscribe", {
                            type: self.casinoData.scard,
                            rooms: []
                        });
                    } else {
                        if (msg != undefined && msg != null) {
                            self.scoreboardData = msg;
                        }
                    }
                });
                socketScoreBoard.on("disconnect", function () {
                    //console.log("disconnect");
                });
            },
            setBetData(odds, btype, sid, mid, marketName, sectionName, gType, size = 0, khado = 0, marketData = []) {
                if (odds) {
                    var ele = document.getElementById('right-sidebar-id')
                    // console.log(ele)
                    ele.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    // console.log(odds, btype, sid, mid, this.gameId, this.gameDetail.ename, marketName, sectionName, gType)
                    let betdata = {
                        etid: _.get(this.casinoData, 'etid'),
                        cid: _.get(this.casinoData, 'cid'),
                        gameId: _.get(this.casinoData, 'gmid'),
                        marketId: mid,
                        sectionId: sid,
                        uRate: odds,
                        oRate: odds,
                        amount: '',
                        betType: btype,
                        eventName: this.casinoData.ename,
                        marketName: marketName,
                        sectionName: sectionName,
                        gType: gType,
                        cType: _.get(this.casinoData, 'gtype'),
                        profit: 0,
                        size: size,
                        khado: khado,
                        market: []
                    }

                    if (gType == 'khado') {
                        betdata.profit = khado + odds - 1
                    }

                    if (IS_MOBILE) {
                        if (gType == 'match' || gType == 'match1' || gType == 'superover') {
                            betdata.market = _.map(marketData, function (object) {
                                return _.pick(object, ['nat', 'sid']);
                            });
                        }
                    }

                    this.$store.commit('setBetData', betdata)

                    // console.log(this.$store.state.bet)

                    if (IS_MOBILE) {
                        setTimeout(() => {
                            document.getElementById("placebetAmountMobile").focus();
                        }, 500);
                        this.$refs['placebet-modal'].show()
                    }
                    setTimeout(() => {
                        document.getElementById("placebetAmountWeb1").focus();
                    }, 500);
                }
            },
            hidePlacebetModal() {
                this.$refs['placebet-modal'].hide()
            },
            placebet() {
                if (this.loadingPlacebet)
                    return
                this.loadingPlacebet = true
                ServiceApi.callApi("api/front/placebet", this.$store.state.bet)
                    .then(response => {
                        if (response.success) {
                            // if (_.get(response.data, 'bdelay')) {
                            //     let delay = _.get(response.data, 'bdelay')
                            //     let traderBet = {
                            //         gameId: _.get(response.data, 'gmid'),
                            //         marketId: _.get(response.data, 'mid'),
                            //         sectionId: _.get(response.data, 'sid'),
                            //         uRate: _.get(response.data, 'urate'),
                            //         amount: _.get(response.data, 'tamt'),
                            //         uamount: _.get(response.data, 'uamt'),
                            //         betType: _.get(response.data, 'btype'),
                            //         btId: _.get(response.data, 'btid'),
                            //         time: _.get(response.data, 'bdelay'),
                            //         etid: _.get(response.data, 'etid'),
                            //         cid: _.get(response.data, 'cid')
                            //     }

                            //     this.$refs['trader-modal'].show()
                            //     this.$store.commit('setTraderData', traderBet)
                            //     this.$store.commit('resetBetData')
                            //     this.$refs['placebet-modal'].hide()
                            //     this.loadingPlacebet = false

                            //     // console.log('trader', this.$store.state.traderBet)
                            //     const self = this
                            //     var traderInterval = setInterval(() => {
                            //         // console.log(self.$store.state.traderBet.time)
                            //         if (self.$store.state.traderBet.time != 0)
                            //             self.$store.state.traderBet.time--
                            //     }, 1000);
                            //     setTimeout(() => {
                            //         self.$refs['trader-modal'].hide()
                            //         clearInterval(traderInterval)
                            //     }, delay * 1000);

                            // } else {
                            this.$bvToast.toast(response.msg, {
                                variant: 'success',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                            // console.log('success', response.msg)
                            this.$store.commit('resetBetData')
                            this.$refs['placebet-modal'].hide()
                            this.loadingPlacebet = false
                            // }
                        } else {
                            this.$bvToast.toast(response.msg, {
                                variant: 'danger',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                            // console.log('fail', response.msg)
                            this.$store.commit('resetBetData')
                            this.$refs['placebet-modal'].hide()
                            this.loadingPlacebet = false
                        }
                    })
                    .catch(e => {
                        // console.log('error', e)
                        this.$store.commit('resetBetData')
                        this.resetPlacebetInterval()
                        this.$refs['placebet-modal'].hide()
                        this.loadingPlacebet = false
                    });
            },
            scroll_left() {
                let content = document.querySelector(".nav-tabs");
                content.scrollLeft -= 200;
            },
            scroll_right() {
                let content = document.querySelector(".nav-tabs");
                content.scrollLeft += 200;
            },
        },
        beforeDestroy() {
            // this.callBookApi = false
            this.callDataApi = false
            this.$store.commit('resetCasinoBetData')
            this.$store.commit('resetBetData')
            this.$store.state.casinoRules = null
            this.$store.state.betSoda = null
            this.$store.state.sportbetBook = null
            this.$store.state.fancybetBook = null
            this.$store.state.lastResults = []
            this.$store.state.placebetInterval = 0
            this.$store.state.casinoGameType = ""
            clearInterval(PlacebetTimer);
        }
    }
</script>