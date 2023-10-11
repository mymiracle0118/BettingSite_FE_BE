<template>
    <div class="casino-container" id="element">
        <!-- Casino Content -->
        <template v-if="!$store.getters.isTablet">
            <TimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current" />
        </template>
        <div class="casino-table kbc">
            <div class="casino-video">
                <InactivityModal ref="tvModal" />
                <div class="casino-video-title">
                    <span class="casino-name">{{ gameTitle }}</span>
                    <span class="casino-video-rid">Round ID: {{ casinoData.mid }}</span>
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
                            </div>
                            <div>
                                <Card :card="cards[1]" />
                            </div>
                            <div>
                                <Card :card="cards[2]" />
                            </div>
                            <div>
                                <Card :card="cards[3]" />
                            </div>
                            <div>
                                <Card :card="cards[4]" />
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
                <div class="row row5 kbc-btns">
                    <div class="col-12 col-md-4">
                        <div class="casino-box-row">
                            <div class="casino-nation-name">
                                <b>[Q1] {{ redBlack[0].nat }}</b>
                            </div>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                <template v-for="(odds, key) in redBlack[0].odds">
                                    <label class="btn"
                                        :class="[{'suspended': redBlack[0].gstatus != 'OPEN' }, {'active' : odds.ssid == $store.state.kbc.betSelect.redBlack.ssid}]"
                                        :key="key">
                                        <input type="radio" name="options"
                                            v-model="$store.state.kbc.betSelect.redBlack.ssid" :value="odds.ssid"
                                            @change="setSectionId('redBlack', odds.nat, redBlack[0].sid, redBlack[0].gstatus, redBlack[0].min, redBlack[0].max)"
                                            :id="`option${key}`" autocomplete="off">
                                        <template v-if="odds.ssid == 1">
                                            <img :src="`${imgPath}front/img/cards/heart.png`">
                                            <img :src="`${imgPath}front/img/cards/diamond.png`">
                                        </template>
                                        <template v-else-if="odds.ssid == 2">
                                            <img :src="`${imgPath}front/img/cards/spade.png`">
                                            <img :src="`${imgPath}front/img/cards/club.png`">
                                        </template>
                                    </label>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="casino-box-row">
                            <div class="casino-nation-name">
                                <b>[Q2] {{ oddEven[0].nat }}</b>
                            </div>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                <template v-for="(odds, key) in oddEven[0].odds">
                                    <label class="btn"
                                        :class="[{'suspended': oddEven[0].gstatus != 'OPEN' }, {'active' : odds.ssid == $store.state.kbc.betSelect.oddEven.ssid}]"
                                        :key="key">
                                        <input type="radio" name="options"
                                            v-model="$store.state.kbc.betSelect.oddEven.ssid" :value="odds.ssid"
                                            @change="setSectionId('oddEven', odds.nat, oddEven[0].sid, oddEven[0].gstatus, oddEven[0].min, oddEven[0].max)"
                                            :id="`option${key}`" autocomplete="off">
                                        {{ odds.nat }}
                                    </label>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="casino-box-row">
                            <div class="casino-nation-name">
                                <b>[Q3] {{ upDown[0].nat }}</b>
                            </div>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                <template v-for="(odds, key) in upDown[0].odds">
                                    <label class="btn"
                                        :class="[{'suspended': upDown[0].gstatus != 'OPEN' }, {'active' : odds.ssid == $store.state.kbc.betSelect.upDown.ssid}]"
                                        :key="key">
                                        <input type="radio" name="options"
                                            v-model="$store.state.kbc.betSelect.upDown.ssid" :value="odds.ssid"
                                            @change="setSectionId('upDown', odds.nat, upDown[0].sid, upDown[0].gstatus, upDown[0].min, upDown[0].max)"
                                            :id="`option${key}`" autocomplete="off">
                                        {{ odds.nat }}
                                    </label>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row row5 kbc-btns kbcothers mt-2">
                    <div class="col-12 col-xl-4 col-md-6">
                        <div class="casino-box-row">
                            <div class="casino-nation-name">
                                <b>[Q4] {{ cardj[0].nat }}</b>
                            </div>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                <template v-for="(odds, key) in cardj[0].odds">
                                    <label class="btn"
                                        :class="[{'suspended': cardj[0].gstatus != 'OPEN' }, {'active' : odds.ssid == $store.state.kbc.betSelect.cardj.ssid}]"
                                        :key="key">
                                        <input type="radio" name="options"
                                            v-model="$store.state.kbc.betSelect.cardj.ssid" :value="odds.ssid"
                                            @change="setSectionId('cardj', odds.nat, cardj[0].sid, cardj[0].gstatus, cardj[0].min, cardj[0].max)"
                                            :id="`option${key}`" autocomplete="off">
                                        {{ odds.nat }}
                                    </label>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-xl-4 col-md-6">
                        <div class="casino-box-row">
                            <div class="casino-nation-name">
                                <b>[Q5] {{ color[0].nat }}</b>
                            </div>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                <template v-for="(odds, key) in color[0].odds">
                                    <label class="btn"
                                        :class="[{'suspended': color[0].gstatus != 'OPEN' }, {'active' : odds.ssid == $store.state.kbc.betSelect.color.ssid}]"
                                        :key="key">
                                        <input type="radio" name="options"
                                            v-model="$store.state.kbc.betSelect.color.ssid" :value="odds.ssid"
                                            @change="setSectionId('color', odds.nat, color[0].sid, color[0].gstatus, color[0].min, color[0].max)"
                                            :id="`option${key}`" autocomplete="off">
                                        <img v-if="odds.ssid == 1" :src="`${imgPath}front/img/cards/spade.png`">
                                        <img v-else-if="odds.ssid == 2" :src="`${imgPath}front/img/cards/heart.png`">
                                        <img v-else-if="odds.ssid == 3" :src="`${imgPath}front/img/cards/club.png`">
                                        <img v-else-if="odds.ssid == 4" :src="`${imgPath}front/img/cards/diamond.png`">
                                    </label>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-xl-4 d-none-mobile">
                        <template v-if="$store.state.casinoBet && $store.state.casinoBet.betStatus">
                            <div class="hfquitbtns">
                                <button class="btn btn-primary hbtn"
                                    :class="{'selected': $store.state.casinoBet.bt == 1}" @click="setQuit(1)">4 Cards
                                    Quit</button>
                                <button class="btn btn-primary fbtn"
                                    :class="{'selected': $store.state.casinoBet.bt == 2}" @click="setQuit(2)">50-50
                                    Quit</button>
                            </div>
                        </template>
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


        <b-modal ref="placebet-modal" hide-footer title="BET SLIP" no-close-on-esc no-close-on-backdrop
            hide-header-close :class="{'loader-section-parent':$store.state.loadingCasinoPlacebet}">

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
                    <div class="casino-place-bet-box">
                        <div class="kbcbtesbox">
                            <div class="bet-box">
                                <template v-if="$store.state.kbc.betSelect.redBlack.nat">
                                    <span>{{ $store.state.kbc.betSelect.redBlack.nat }}</span>
                                    <i class="float-right fas fa-times"
                                        @click="removeKbcSelection({key:'redBlack'})"></i>
                                </template>
                            </div>
                            <div class="bet-box">
                                <template v-if="$store.state.kbc.betSelect.oddEven.nat">
                                    <span>{{ $store.state.kbc.betSelect.oddEven.nat }}</span>
                                    <i class="float-right fas fa-times"
                                        @click="removeKbcSelection({key:'oddEven'})"></i>
                                </template>
                            </div>
                            <div class="bet-box">
                                <template v-if="$store.state.kbc.betSelect.upDown.nat">
                                    <span>{{ $store.state.kbc.betSelect.upDown.nat }}</span>
                                    <i class="float-right fas fa-times" @click="removeKbcSelection({key:'upDown'})"></i>
                                </template>
                            </div>
                            <div class="bet-box">
                                <template v-if="$store.state.kbc.betSelect.cardj.nat">
                                    <span>{{ $store.state.kbc.betSelect.cardj.nat }}</span>
                                    <i class="float-right fas fa-times" @click="removeKbcSelection({key:'cardj'})"></i>
                                </template>
                            </div>
                            <div class="bet-box">
                                <template v-if="$store.state.kbc.betSelect.color.nat">
                                    <span>{{ $store.state.kbc.betSelect.color.nat }}</span>
                                    <i class="float-right fas fa-times" @click="removeKbcSelection({key:'color'})"></i>
                                </template>
                            </div>
                            <ValidationProvider name="Amount" tag="div" class="bet-input"
                                :class="[{'back-border': $store.state.casinoBet.betType.toLowerCase() == 'back'}, {'lay-border': $store.state.casinoBet.betType.toLowerCase() == 'lay'}, {'andar-border': $store.state.casinoBet.betType.toLowerCase() == 'andar'}, {'bahar-border': $store.state.casinoBet.betType.toLowerCase() == 'bahar'}]"
                                :rules="{required: true, min_value : 1, max_value : 999999999, regex: /^[0-9]+$/}">
                                <input type="text" id="placebetAmountWeb" v-model.number="$store.state.casinoBet.amount"
                                    class="form-control input-stake"
                                    onkeypress='return event.charCode >= 48 && event.charCode <= 57'>
                            </ValidationProvider>
                        </div>

                        <template v-if="$store.state.casinoBet && $store.state.casinoBet.betStatus">
                            <div class="hfquitbtns w-100">
                                <button class="btn btn-primary hbtn"
                                    :class="{'selected': $store.state.casinoBet.bt == 1}" @click="setQuit(1)">4 Cards
                                    Quit</button>
                                <button class="btn btn-primary fbtn"
                                    :class="{'selected': $store.state.casinoBet.bt == 2}" @click="setQuit(2)">50-50
                                    Quit</button>
                            </div>
                        </template>

                        <div class="casino-place-bet-button-container">
                            <template v-for="(btn, key) in $store.state.buttonList">
                                <button class="btn btn-bet" @click="$store.commit('updateCasinoBetAmount', btn.bval)"
                                    :key="key">
                                    <span>{{ btn.btxt }}</span>
                                </button>
                            </template>
                        </div>
                        <div class="casino-place-bet-action-buttons mt-2">
                            <button class="btn btn-primary" @click="placebetCasino()"
                                :disabled="invalid || !$store.state.casinoBet.betStatus">Submit</button>
                            <button class="btn btn-reset mt-1" @click="resetBet()">Reset</button>
                        </div>
                    </div>
                </template>
            </ValidationObserver>
        </b-modal>

        <b-modal id="betCasinoSodaModal" hide-footer title="MY BETS">

            <template v-if="$pages.is('casino', $route.name) && $store.state.casinoBetSoda != null">
                <template v-for="(data, key) in $store.state.casinoBetSoda">
                    <div :key="key" class="kbcbtesbox casino-place-bet-row back-border"
                        :class="[{'back-border': data.btype.toLowerCase() == 'back'}, {'lay-border': data.btype.toLowerCase() == 'lay'}]">
                        <template v-for="(nat, key) in data.natjson">
                            <div class="bet-box" :key="key">
                                <span>{{`[Q${key+1}] ${nat.c[0].s}`}}</span>
                            </div>
                        </template>
                        <div class="bet-box">
                            <div
                                :class="[{'hbtn': data.bhav == 1}, {'fbtn': data.bhav == 2}, {'fivebtn': data.bhav == 3}]">
                                <span v-if="data.bhav == 1">4 Cards Quit</span>
                                <span v-else-if="data.bhav == 2">50-50 Quit</span>
                                <span v-else-if="data.bhav == 3">5 Cards</span>
                            </div>
                        </div>
                        <div class="w-100 text-center text-yellow"><b v-currency="data.amt">0</b></div>
                    </div>
                </template>
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
            this.$store.state.casinoMarketId = ""
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
            redBlack() {
                var redBlack = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'redblack'
                })
                return this.orderBy(redBlack, 'sr')
            },
            oddEven() {
                var oddEven = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'oddeven'
                })
                return this.orderBy(oddEven, 'sr')
            },
            upDown() {
                var upDown = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'updown'
                })
                return this.orderBy(upDown, 'sr')
            },
            cardj() {
                var cardj = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'Cardj'
                })
                return this.orderBy(cardj, 'sr')
            },
            color() {
                var color = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'color'
                })
                return this.orderBy(color, 'sr')
            },
        },
        data() {
            return {
                showCards: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'kbc',
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
            setQuit(type) {
                if (this.$store.state.casinoBet) {
                    if (this.$store.state.casinoBet.bt != type) {
                        this.$store.state.casinoBet.bt = type
                    } else {
                        this.$store.state.casinoBet.bt = 3
                    }
                    // console.log(type, this.$store.state.casinoBet)
                }
            },
            resetBet() {
                this.$store.commit('resetCasinoBetData')
                this.$refs['placebet-modal'].hide()
            },
            removeKbcSelection(bet) {
                // console.log(bet);
                this.$store.state.kbc.betSelect[bet.key].sid = null;
                this.$store.state.kbc.betSelect[bet.key].ssid = null;
                this.$store.state.kbc.betSelect[bet.key].nat = null;
                this.$store.commit("checkKbcAllSelect");
                if (IS_MOBILE) {
                    if (this.$store.state.casinoBet.betStatus) {
                        this.$refs['placebet-modal'].show()
                    } else {
                        this.$refs['placebet-modal'].hide()
                    }
                }
            },
            setSectionId(key, nat, sid, gstatus, min, max) {
                // console.log(key, nat, sid, gstatus, min, max)
                if (gstatus == 'OPEN') {
                    this.$store.state.kbc.betSelect[key].sid = sid
                    this.$store.state.kbc.betSelect[key].nat = nat

                    let betdata = {
                        marketId: this.mId,
                        amount: "",
                        betType: 'back',
                        bt: 3,
                        gameType: this.gameType,
                        min: min,
                        max: max,
                        betStatus: true
                    }

                    this.$store.commit('setCasinoBetData', betdata)
                    this.$store.commit('checkKbcAllSelect')

                    if (IS_MOBILE) {
                        if (this.$store.state.casinoBet.betStatus) {
                            this.$refs['placebet-modal'].show()
                        } else {
                            this.$refs['placebet-modal'].hide()
                        }
                    }
                }

            },
            getCasinoRulesHtml() {
                ServiceApi.callApi("api/front/casinorules", {
                        'type': this.gameType,
                    })
                    .then(response => {
                        // console.log(response)
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
                        // console.log('round', self.$store.state.placebetInterval)
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
                                this.resetBet()
                            }
                            this.mId = _.get(this.casinoData, 'mid')
                            this.$store.state.casinoMarketId = this.mId
                            this.getUserBook()
                            // this.exp = _.get(this.$store.state.user, 'exp', 0)
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
                if (this.exp != _.get(this.$store.state.user, 'exp', 0) || forcecall) {
                    ServiceApi.callApi("api/front/casino/book", {
                            'mid': parseInt(mid),
                            'gType': this.gameType
                        })
                        .then(response => {
                            if (response.status == 200) {
                                this.$store.state.casinoBetSoda = response.data
                            } else {
                                this.$store.state.casinoBetSoda = null
                            }
                        })
                        .catch(e => {
                            this.$store.state.casinoBetSoda = null
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
                            this.lastResults = []
                        }
                    })
                    .catch(e => {
                        this.$store.state.lastResults = []
                    });

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