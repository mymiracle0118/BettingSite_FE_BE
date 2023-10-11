<template>
    <div class="detail-page-container five-cricket"
        :class="{ 'loader-section-parent' : gameData.new && !gameData.new.length }">

        <div class="game-header sport4">
            <span class="game-header-name">{{ gameDetail.cname }} &gt; {{ gameDetail.ename }}</span>
            <span class="game-header-date">{{ changeDataFormat(gameDetail.stime) }}</span>
        </div>

        <!-- <template v-if="gameDetail.iplay"> -->
            <template v-if="gameDetail && gameDetail.scard != 2">
                <div class="scorecard d-none-desktop mt-1 mb-1" v-if="gameDetail.scard == 1 && scoreboardData.isfinished == '0'">
                    <div class="scorecard-row row row5">
                        <div class="col-6 text-left">
                            <div :class="{'active-team': scoreboardData.activenation1 == '1'}">
                                <div>
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
                            </div>
                        </div>

                        <div class="col-6 text-right">
                            <div :class="{'active-team': scoreboardData.activenation2 == '1'}">
                                <div>
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
                            </div>
                        </div>

                        <div class="col-12 text-center">
                            <div v-if="scoreboardData.spnmessage != ''">
                                <span v-if="scoreboardData.dayno !== ''">
                                    Day
                                    {{ scoreboardData.dayno }} |
                                </span>
                                {{ scoreboardData.spnmessage }}
                            </div>
                            <div v-if="scoreboardData.spnballrunningstatus != ''">
                                <span v-if="scoreboardData.dayno !== ''">
                                    Day
                                    {{ scoreboardData.dayno }} |
                                </span>
                                {{ scoreboardData.spnballrunningstatus }}
                            </div>
                            <div>
                                <span v-for="ball in scoreboardData.balls" v-if="ball !== '' "
                                    class="ball-runs mr-1"
                                    :class="[{'four' : ball == 4}, {'six' : ball == 6}, {'wicket' : ball.toLowerCase() == 'ww'}]">{{ ball }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        <!-- </template> -->

        <div class="casino-video">
            <div class="video-box-container">
                <div class="five-score-cards">
                    <!-- <template v-if="gameDetail.iplay"> -->
                        <template v-if="gameDetail && gameDetail.scard != 2">
                            <div class="scorecard d-none-mobile" v-if="gameDetail.scard == 1 && scoreboardData.isfinished == '0'">
                                <div class="scorecard-row row row5">
                                    <div class="col-6 col-md-12">
                                        <div :class="{'active-team': scoreboardData.activenation1 == '1'}">
                                            <div>
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
                                        </div>
                                    </div>

                                    <div class="col-6 col-md-12">
                                        <div :class="{'active-team': scoreboardData.activenation2 == '1'}">
                                            <div>
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
                                        </div>

                                        <div class="mt-1" v-if="scoreboardData.spnmessage != ''">
                                            <span v-if="scoreboardData.dayno !== ''">
                                                Day
                                                {{ scoreboardData.dayno }} |
                                            </span>
                                            {{ scoreboardData.spnmessage }}
                                        </div>
                                        <div v-if="scoreboardData.spnballrunningstatus != ''">
                                            <span v-if="scoreboardData.dayno !== ''">
                                                Day
                                                {{ scoreboardData.dayno }} |
                                            </span>
                                            {{ scoreboardData.spnballrunningstatus }}
                                        </div>

                                        <div>
                                            <span v-for="ball in scoreboardData.balls" v-if="ball !== '' "
                                                class="ball-runs mr-1"
                                                :class="[{'four' : ball == 4}, {'six' : ball == 6}, {'wicket' : ball.toLowerCase() == 'ww'}]">{{ ball }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    <!-- </template> -->
                </div>

                <!-- <template v-if="gameDetail.iplay"> -->
                <div class="five-video-baner video-box" v-if="tvUrl != ''">
                    <iframe :src="tvUrl">
                    </iframe>
                </div>
                <!-- </template> -->
            </div>
        </div>

        <div class="container-fluid container-fluid-5">
            <div class="row row5 mt-2">
                
                <div class="col">
                    
                </div>
            </div>
        </div>

        <template v-for="(data, key) in orderBy(gameData.new, 'sno')">
            <template v-if="data.gtype != 'match'">
                <template v-if="data.dtype == 1">
                    <Market1 :key="key" :index="key" :marketDataNew="data"
                        :marketDataOld="orderBy(gameData.old, 'sno')[key]" />
                </template>

                <template v-if="data.dtype == 2">
                    <Market2 :key="key" :index="key" :marketDataNew="data"
                        :marketDataOld="orderBy(gameData.old, 'sno')[key]" />
                </template>

                <template v-if="data.dtype == 3">
                    <Market3 :key="key" :index="key" :marketDataNew="data"
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

                <template v-if="data.dtype == 8">
                    <Market8 :key="key" :index="key" :marketDataNew="data"
                        :marketDataOld="orderBy(gameData.old, 'sno')[key]" />
                </template>

                <template v-if="data.dtype == 9">
                    <Market9 :key="key" :index="key" :marketDataNew="data"
                        :marketDataOld="orderBy(gameData.old, 'sno')[key]" />
                </template>

                <template v-if="data.dtype == 10">
                    <Market10 :key="key" :index="key" :marketDataNew="data"
                        :marketDataOld="orderBy(gameData.old, 'sno')[key]" />
                </template>

                <template v-if="data.dtype == 11">
                    <Market11 :key="key" :index="key" :marketDataNew="data"
                        :marketDataOld="orderBy(gameData.old, 'sno')[key]" />
                </template>
            </template>
        </template>


        <b-modal ref="placebet-modal" hide-footer title="BET SLIP" @hide="$store.commit('resetBetData')"
            :class="{'loader-section-parent':$store.state.loadingPlacebet}">
            <Loader :isVisible="$store.state.loadingPlacebet"></Loader>

            <ValidationObserver tag="div" v-slot="{ invalid }">
                <template
                    v-if="$store.state.bet && $store.state.bet != null">
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
                            <input type="number" v-model.number="$store.state.bet.amount"
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
                                    <span v-livebook="{mid: $store.state.bet.marketId, sid: section.sid}">0</span>
                                </div>
                            </div>
                        </template>
                    </div>
                </template>
            </ValidationObserver>
        </b-modal>

        <!-- Trader Modal Start -->
        <b-modal ref="trader-modal" sm :class="{ 'loader-section-parent' : traderloadingPlacebet}"
            title="Please Confirm" @ok="traderPlacebet()" @cancel="clearTraderData()" @close="clearTraderData()"
            hide-footer modal-class="modal-place-bet">
            <!-- <div class="loader-section" v-if="traderloadingPlacebet">
        <div class="loader-section-icon"></div>
      </div> -->
            <Loader :isVisible="traderloadingPlacebet"></Loader>

            <div class="row row5 confirm-bet mb-4" v-if="$store.state.traderBet">
                <div class="col-3 text-center">
                    <div class="mb-2">Your Bet</div>
                    <div>
                        <button class="btn btn-sm btn-outline-danger">
                            <h5>{{ $store.state.traderBet.uamount }}</h5>
                        </button>
                    </div>
                </div>
                <div class="col-3 text-center">
                    <div class="mb-2">Accepted</div>
                    <div>
                        <button class="btn btn-sm btn-outline-success">
                            <h5>{{ $store.state.traderBet.amount }}</h5>
                        </button>
                    </div>
                </div>
                <div class="col-3 text-center">
                    <div class="mb-2">Rate</div>
                    <div>
                        <button class="btn btn-sm btn-outline-default">
                            <h5>{{ $store.state.traderBet.uRate }}</h5>
                        </button>
                    </div>
                </div>
                <div class="col-3 text-center">
                    <div class="mb-2">Time Left</div>
                    <div>
                        <button class="btn btn-sm btn-outline-default">
                            <h5>{{ $store.state.traderBet.time }}</h5>
                        </button>
                    </div>
                </div>
            </div>

            <div class="modal-footer confirm-bet">
                <div>Are you Confirm</div>
                <button type="button" class="btn btn-danger" @click="clearTraderData()">No</button>
                <button type="button" class="btn btn-primary" @click="traderPlacebet()">Yes</button>
            </div>
        </b-modal>
        <!-- Trader Modal End -->

        <b-modal id="betSodaModal" hide-footer title="MY Bets" class="marketModal">

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

        <div class="market-show-icon d-none-desktop" v-if="$store.getters.betSodaTotal" v-b-modal.betSodaModal>
            <span>{{ $store.getters.betSodaTotal }}</span>
        </div>
    </div>
</template>
<script>
    import ServiceApi from "@/services/ServiceApi";
    import Timer from "@/components/casino/BaseTimer"
    import Card from '@/components/casino/Card'
    import base64 from "@/base64";
    import moment from 'moment'

    import Market1 from '@/components/markets/Market1'
    import Market2 from '@/components/markets/Market2'
    import Market3 from '@/components/markets/Market3'
    import Market4 from '@/components/markets/Market4'
    import Market5 from '@/components/markets/Market5'
    import Market6 from '@/components/markets/Market6'
    import Market7 from '@/components/markets/Market7'
    import Market8 from '@/components/markets/Market8'
    import Market9 from '@/components/markets/Market9'
    import Market10 from '@/components/markets/Market10'
    import Market11 from '@/components/markets/Market11'
    import Loader from '@/components/loader'

    import io from "socket.io-client";

    var socketScoreBoard;

    import {
        getCryptoPollingSingleton,
        STANDART_POLLING_INTERVAL
    } from '@/components/securePolling/CryptoPollingSingleton';

    export default {
        name: "VirtualCricket",
        components: {
            Card,
            Timer,
            Market1,
            Market2,
            Market3,
            Market4,
            Market5,
            Market6,
            Market7,
            Market8,
            Market9,
            Market10,
            Market11,
            Loader
        },
        mounted() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            this.gameId = base64.dec(this.$route.params.gameId)
            this.etid = base64.dec(this.$route.params.etid)
            this.$store.state.gameId = this.gameId
            this.getGameDetail(this.gameId)
            // this.getUserBook()
            this.getButtonList()
            this.$store.state.showTv = false
        },
        data() {
            return {
                showCards: true,
                time: {
                    total: 0,
                    current: 0
                },
                cards: [],
                tvUrl: '',
                imgPath: IMG_PATH,
                autocon: false,
                gameId: null,
                gameType: null,
                etid: null,
                m: null,
                gameDetail: {},
                gameData: {
                    old: {},
                    new: {}
                },
                scoreboardData: {},
                firstCall: true,
                callGameDataApi: true,
                // callUserBookApi: true,
                callDataApi: true,
                loadingPlacebet: false,
                traderloadingPlacebet: false,
                hasNoGameData: 0,
                tokens: {
                    graphic: '',
                    tv: '',
                    sb: ''
                },
                exp: '',
            }
        },
        methods: {
            toggleCards(card) {
                if (card != '1') {
                    this.showCards = !this.showCards
                }
            },
            checkIsTest(string) {
                return string.includes('T-')
            },
            changeDataFormat(date) {
                return moment(String(date), 'MM-DD-YYYY hh:mm:ss A').format('DD/MM/YYYY HH:mm:ss')
            },
            changeAutoCon(event) {
                ServiceApi.callApi("api/front/changeautocon", {
                        value: event
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.$store.state.autocon = event
                            this.autocon = event
                        }
                    })
                    .catch(e => {

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
            getButtonList() {
                ServiceApi.callApi("api/front/buttonlist")
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
            getUserBook(forcecall = false) {
                if (this.exp != _.get(this.$store.state.user, 'exp', 0) || forcecall) {
                    ServiceApi.callApi("api/front/userbook", {
                            gmid: parseInt(this.gameId)
                        })
                        .then(response => {
                            if (response.status == 200) {
                                this.$store.state.betSoda = response.data.bet
                                this.$store.state.sportbetBook = response.data.sportbet
                                this.$store.state.fancybetBook = response.data.fancy
                            } else {
                                this.$store.state.betSoda = null
                                this.$store.state.sportbetBook = null
                                this.$store.state.fancybetBook = null
                            }
                        })
                        .catch(e => {
                            // this.$store.state.betSoda = null
                            // this.$store.state.sportbetBook = null
                            // this.$store.state.fancybetBook = null
                        });
                    this.exp = _.get(this.$store.state.user, 'exp', 0)
                }
            },
            getGameDetail(gameId) {
                ServiceApi.callApi("api/front/gamedetail", {
                        gmid: parseInt(gameId),
                        etid: parseInt(this.etid)
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.gameDetail = _.first(response.data)
                            this.gameType = _.get(this.gameDetail, 'gtype')
                            // ServiceApi.callApi("api/front/gettv", {
                            //         'gmid': parseInt(this.gameId),
                            //         'ip': this.$store.getters.ipAddress,
                            //     })
                            //     .then(response => {
                            //         if (response.status == 200) {
                            //             // console.log(response.data.url)
                            //             this.tvUrl = response.data.url
                            //         } else {
                            //             this.tvUrl = ''
                            //         }
                            //     })
                            //     .catch(e => {
                            //         this.tvUrl = ''
                            //     });

                            //   ServiceApi.callApi("api/front/casino/launchother", {
                            //       'id': 'tv'
                            //     })
                            //     .then(response => {
                            //       if (response.status == 200) {
                            //         // console.log(response.data.token)
                            //         this.tvUrl = '/mediaplayer/' + this.gameType + '/' + response.data.token + '?ip=' + IP_ADDRESS;
                            //       } else {
                            //         this.tvUrl = ''
                            //       }
                            //     })
                            //     .catch(e => {
                            //       this.tvUrl = ''
                            //     });
                            this.tvUrl = '/mediaplayer/virtual/' + gameId + '/' + IP_ADDRESS + '?ip=' + IP_ADDRESS;
                            if (this.gameDetail.gtv != 0) {
                                ServiceApi.callApi("api/front/casino/launchother", {
                                        'id': 'graphic'
                                    })
                                    .then(response => {
                                        if (response.status == 200) {
                                            // console.log(response)
                                            this.tokens.graphic = response.data
                                        } else {
                                            this.tokens.graphic = ''
                                        }
                                    })
                                    .catch(e => {
                                        this.tokens.graphic = ''
                                    });
                            }
                            // this.gameDetail.scard = 1
                            if (this.gameDetail.scard != 2) {
                                // console.log("scoreboard")
                                this.connectScoreBoard();
                            }
                            //   this.$store.state.isTv = this.gameDetail.tv
                            this.m = _.get(this.gameDetail, 'm')
                            this.getGameData()
                            this.getCricketvData()
                            this.$store.state.etid = _.get(this.gameDetail, 'etid')
                            this.$store.state.cid = _.get(this.gameDetail, 'cid')
                        } else {
                            this.gameDetail = []
                            this.$router.push({
                                name: 'home'
                            })
                        }
                    })
                    .catch(e => {
                        this.gameDetail = []
                        this.$router.push({
                            name: 'home'
                        })
                    });
            },
            connectScoreBoard() {
                let self = this;
                //NEW SCOREBOARD
                var url = self.gameDetail.scard == 0 ? SCOREBOARD_URL + '?format=binary' : SCOREBOARD_URL
                socketScoreBoard = io.connect(url, {
                    transports: ["websocket"]
                });
                socketScoreBoard.on("connect", function () {
                    socketScoreBoard.emit("subscribe", {
                        type: self.gameDetail.scard == 0 ? 2 : self.gameDetail.scard,
                        rooms: [parseInt(self.gameDetail.oldgmid)]
                        // rooms: [parseInt(30217254)]
                    });
                });
                socketScoreBoard.on("error", function () {
                    // console.log("error");
                });
                socketScoreBoard.on("update", function (response) {
                    if (self.gameDetail.scard == 0) {
                        const SocketMsg = protobuf.roots.default.EventPublish;
                        var msg = SocketMsg.decode(new Uint8Array(response.data));
                        // console.log(JSON.stringify(msg));
                    } else {
                        var msg = response.data;
                    }

                    if (msg != undefined && msg != null && msg.isfinished == 1) {
                        socketScoreBoard.emit("unsubscribe", {
                            type: self.gameDetail.scard,
                            rooms: []
                        });
                    } else {
                        if (msg != undefined && msg != null) {
                            self.scoreboardData = msg;
                        } else {
                            $("#scoreboard-box").html("");
                        }
                    }
                });
                socketScoreBoard.on("disconnect", function () {
                    //console.log("disconnect");
                });
            },
            getCricketvData() {
                ServiceApi.callApi("api/front/cricketvdata", {
                        'gtype': this.gameType,
                        'gmid': parseInt(this.gameId)
                    })
                    .then(response => {
                        if (response.status == 200) {
                            let data = response.data.t1

                            if (data.card && data.card != "") {
                                this.cards = _.get(data, 'card').split('|')
                            } else {
                                this.cards = []
                            }
                            this.time.total = _.get(data, 'ft')
                            this.time.current = _.get(data, 'lt')

                            if (this.callDataApi == true) {
                                setTimeout(res => {
                                    this.getCricketvData();
                                }, 800);
                            }
                        } else {
                            this.cards = []
                            this.time.total = 0
                            this.time.current = 0

                            if (this.callDataApi == true) {
                                setTimeout(res => {
                                    this.getCricketvData();
                                }, 800);
                            }
                        }
                    })
                    .catch(e => {
                        this.cards = []
                        this.time.total = 0
                        this.time.current = 0

                        if (this.callDataApi == true) {
                            setTimeout(res => {
                                this.getCricketvData();
                            }, 800);
                        }
                    });
            },
            getGameData() {
                if (SECURE_POLLING == 0) {
                    ServiceApi.callApi("api/front/gamedata", {
                            gmid: parseInt(this.gameId),
                            m: parseInt(this.m),
                            vir: true,
                            etid: this.etid
                        }, 3000)
                        .then(response => {
                            if (response.status == 200) {
                                if (!response.data.length) {
                                    // this.hasNoGameData++
                                    if (this.hasNoGameData == 5) {
                                        this.callUserBookApi = false
                                        this.callGameDataApi = false
                                        this.$store.state.gameId = null
                                        this.$store.state.isTv = false
                                        this.$store.state.showTv = false
                                        this.$store.commit('resetBetData')

                                        this.$router.push({
                                            name: 'home'
                                        })
                                    }
                                } else {
                                    this.hasNoGameData = 0
                                }

                                if (this.firstCall) {
                                    this.gameData.old = response.data
                                    this.getUserBook(true)
                                    this.firstCall = false
                                } else {
                                    this.gameData.old = this.gameData.new
                                }

                                this.gameData.new = response.data
                                this.getUserBook()

                                if (this.callGameDataApi == true) {
                                    setTimeout(res => {
                                        this.getGameData();
                                    }, 300);
                                }
                            } else {
                                // this.gameData.new = []
                                // this.gameData.old = []

                                // this.hasNoGameData++
                                if (this.hasNoGameData == 5) {
                                    this.callUserBookApi = false
                                    this.callGameDataApi = false
                                    this.$store.state.gameId = null
                                    this.$store.state.isTv = false
                                    this.$store.state.showTv = false
                                    this.$store.commit('resetBetData')

                                    this.$router.push({
                                        name: 'home'
                                    })
                                }

                                if (this.callGameDataApi == true) {
                                    setTimeout(res => {
                                        this.getGameData();
                                    }, 300);
                                }
                            }
                        })
                        .catch(e => {
                            // this.gameData.new = []
                            // this.gameData.old = []

                            if (this.callGameDataApi == true) {
                                setTimeout(res => {
                                    this.getGameData();
                                }, 300);
                            }
                        });
                } else if (SECURE_POLLING == 1) {
                    const self = this;

                    // console.log("getGameData called");

                    self.__mounted = true;

                    getCryptoPollingSingleton().getConnection().then(() => {

                        if (!self.__mounted) {
                            return;
                        }

                        const polling = getCryptoPollingSingleton();

                        polling.setPollTimeout(300); // if you need your results fast

                        // --> ask for them

                        self._call_interval = true;

                        // console.log("_interval created");

                        const _interval = () => {

                            if (!self.__mounted) {
                                return;
                            }

                            // console.log("_interval called");

                            const json = JSON.stringify({
                                gmid: parseInt(this.gameId),
                                m: parseInt(this.m),
                                vir: false,
                                etid: this.etid
                            });

                            polling.ask(
                                "get_results_test",
                                json,
                                (data) => {

                                    if (!self.__mounted) {
                                        return;
                                    }

                                    const res = JSON.parse(data);
                                    // console.log(res)

                                    if (res.status == 200) {
                                        if (!res.data || !res.data.length) {
                                            // this.hasNoGameData++
                                            if (this.hasNoGameData == 5) {
                                                this.callUserBookApi = false
                                                this.callGameDataApi = false
                                                if (SECURE_POLLING == 1) {
                                                    gameDataPolling.deallocate()
                                                }
                                                this.$store.state.gameId = null
                                                this.$store.commit('resetBetData')

                                                this.$router.push({
                                                    name: 'home'
                                                })
                                            }
                                        } else {
                                            this.hasNoGameData = 0
                                        }

                                        if (this.firstCall) {
                                            this.gameData.old = res.data
                                            this.getUserBook(true)
                                            this.firstCall = false
                                        } else {
                                            this.gameData.old = this.gameData.new
                                        }

                                        this.gameData.new = res.data
                                        this.getUserBook()
                                    } else {
                                        // this.gameData.new = []
                                        // this.gameData.old = []
                                    }

                                    if (self._call_interval) {
                                        _interval();
                                    }
                                }
                            )
                        };

                        _interval();
                    })
                }
            },
            setBetData(odds, btype, sid, mid, marketName, sectionName, gType, size = 0, khado = 0, marketData = []) {
                if (odds) {
                    // console.log(odds, btype, sid, mid, this.gameId, this.gameDetail.ename, marketName, sectionName, gType)
                    var ele = document.getElementById('right-sidebar-id')
                    // console.log(ele)
                    ele.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    let betdata = {
                        etid: _.get(this.gameDetail, 'etid'),
                        cid: _.get(this.gameDetail, 'cid'),
                        gameId: parseInt(this.gameId),
                        marketId: mid,
                        sectionId: sid,
                        uRate: odds,
                        oRate: odds,
                        amount: '',
                        betType: btype,
                        eventName: this.gameDetail.ename,
                        marketName: marketName,
                        sectionName: sectionName,
                        gType: gType,
                        cType: _.get(this.gameDetail, 'gtype'),
                        profit: 0,
                        size: size,
                        khado: khado,
                        market: []
                    }

                    if (gType == 'khado') {
                        betdata.profit = khado + odds - 1
                    }

                    if (IS_MOBILE) {
                        if (gType == 'match' || gType == 'match1' || gType == 'cricketcasino') {
                            betdata.market = _.map(marketData, function (object) {
                                return _.pick(object, ['nat', 'sid']);
                            });
                        }
                    }

                    this.$store.commit('setBetData', betdata)

                    // console.log(this.$store.state.bet)

                    if (IS_MOBILE) {
                        this.$refs['placebet-modal'].show()
                    }
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
                            if (_.get(response.data, 'bdelay')) {
                                let delay = _.get(response.data, 'bdelay')
                                let traderBet = {
                                    gameId: _.get(response.data, 'gmid'),
                                    marketId: _.get(response.data, 'mid'),
                                    sectionId: _.get(response.data, 'sid'),
                                    uRate: _.get(response.data, 'urate'),
                                    amount: _.get(response.data, 'tamt'),
                                    uamount: _.get(response.data, 'uamt'),
                                    betType: _.get(response.data, 'btype'),
                                    btId: _.get(response.data, 'btid'),
                                    time: _.get(response.data, 'bdelay'),
                                    etid: _.get(response.data, 'etid'),
                                    cid: _.get(response.data, 'cid')
                                }

                                this.$refs['trader-modal'].show()
                                this.$store.commit('setTraderData', traderBet)
                                this.$store.commit('resetBetData')
                                this.$refs['placebet-modal'].hide()
                                this.loadingPlacebet = false

                                // console.log('trader', this.$store.state.traderBet)
                                const self = this
                                var traderInterval = setInterval(() => {
                                    // console.log(self.$store.state.traderBet.time)
                                    if (self.$store.state.traderBet.time != 0)
                                        self.$store.state.traderBet.time--
                                }, 1000);
                                setTimeout(() => {
                                    self.$refs['trader-modal'].hide()
                                    clearInterval(traderInterval)
                                }, delay * 1000);

                            } else {
                                this.$bvToast.toast(response.msg, {
                                    variant: 'success',
                                    toaster: 'b-toaster-top-full',
                                    autoHideDelay: 3000,
                                })
                                // console.log('success', response.msg)
                                this.$store.commit('resetBetData')
                                this.$refs['placebet-modal'].hide()
                                this.loadingPlacebet = false
                            }
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
                        this.$refs['placebet-modal'].hide()
                        this.loadingPlacebet = false
                    });
            },
            traderPlacebet() {
                if (this.traderloadingPlacebet)
                    return
                this.traderloadingPlacebet = true
                ServiceApi.callApi("api/front/placebettdr", this.$store.state.traderBet)
                    .then(response => {
                        if (response.success) {
                            this.$bvToast.toast(response.msg, {
                                variant: 'success',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                            this.$refs['trader-modal'].hide()
                            // console.log('success', response.msg)
                            this.$store.commit('resetTraderBetData')
                            this.traderloadingPlacebet = false
                        } else {
                            this.$bvToast.toast(response.msg, {
                                variant: 'danger',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                            this.$refs['trader-modal'].hide()
                            // console.log('fail', response.msg)
                            this.$store.commit('resetTraderBetData')
                            this.traderloadingPlacebet = false
                        }
                    })
                    .catch(e => {
                        // console.log('error', e)
                        if (e.response) {
                            this.$bvToast.toast(e.response.data.msg, {
                                variant: 'danger',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                        }
                        this.$refs['trader-modal'].hide()
                        this.$store.commit('resetTraderBetData')
                        this.traderloadingPlacebet = false
                    });
            },
            resetPlacebet() {
                this.$store.commit('resetBetData')
            }
        },
        beforeDestroy() {
            this.callUserBookApi = false
            this.callGameDataApi = false
            this.callDataApi = false,
                // this.$store.state.etid = null
                // this.$store.state.cid = null
                this.$store.state.gameId = null
            this.$store.state.isTv = false
            this.$store.state.showTv = false

            this.$store.state.betSoda = null
            this.$store.state.sportbetBook = null
            this.$store.state.fancybetBook = null

            if (SECURE_POLLING == 1) {

            }

            this.$store.commit('resetBetData')
            if (this.gameDetail.scard && this.gameDetail.scard != 2) {
                socketScoreBoard.emit("unsubscribe", {
                    type: this.gameDetail.scard,
                    rooms: []
                });
                socketScoreBoard.close();
            }
        }
    };
</script>