<template>
    <div class="casino-container">
        <!-- Casino Content -->
        <template v-if="!$store.getters.isTablet">
            <TimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current" />
        </template>
        <div class="casino-table threecardj">
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
                <template v-if="$store.getters.isTablet">
                    <div class="threecardj-container d-none-small">
                        <div class="threecardj-bl-box back">
                            <div class="threecardj-title">
                                <b>Yes</b>
                                <span class="d-block ml-2" v-casinofancybook="{sid: main[0].sid, subid: 0}">0</span>
                            </div>
                            <div class="threecardj-cards">
                                <div class="threecardj-odds text-center">
                                    <b>{{ main[0].b }}</b>
                                </div>
                                <div class="casino-cards text-center mt-1"
                                    :class="{'suspended': main[0].gstatus != 'OPEN'}">
                                    <div class="casino-card-item" @click="setBetData(1, 'back')"
                                        :class="{ 'selected' : checkSelected(1, 'back') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/A.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(2, 'back')"
                                        :class="{ 'selected' : checkSelected(2, 'back') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/2.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(3, 'back')"
                                        :class="{ 'selected' : checkSelected(3, 'back') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/3.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(4, 'back')"
                                        :class="{ 'selected' : checkSelected(4, 'back') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/4.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(5, 'back')"
                                        :class="{ 'selected' : checkSelected(5, 'back') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/5.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(6, 'back')"
                                        :class="{ 'selected' : checkSelected(6, 'back') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/6.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(7, 'back')"
                                        :class="{ 'selected' : checkSelected(7, 'back') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/7.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(8, 'back')"
                                        :class="{ 'selected' : checkSelected(8, 'back') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/8.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(9, 'back')"
                                        :class="{ 'selected' : checkSelected(9, 'back') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/9.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(10, 'back')"
                                        :class="{ 'selected' : checkSelected(10, 'back') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/10.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(11, 'back')"
                                        :class="{ 'selected' : checkSelected(11, 'back') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/J.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(12, 'back')"
                                        :class="{ 'selected' : checkSelected(12, 'back') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/Q.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(13, 'back')"
                                        :class="{ 'selected' : checkSelected(13, 'back') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/K.png`">
                                        </div>
                                    </div>
                                </div>
                                <div class="casino-min-max text-right"
                                    v-if="casinoData.remark && casinoData.remark != ''">
                                    <marquee>{{ casinoData.remark.split('|')[0] }}</marquee>
                                </div>
                            </div>
                        </div>
                        <div class="threecardj-bl-box lay">
                            <div class="threecardj-title">
                                <b>No</b>
                                <span class="d-block ml-2" v-casinofancybook="{sid: main[1].sid, subid: 0}">0</span>
                            </div>
                            <div class="threecardj-cards">
                                <div class="threecardj-odds text-center">
                                    <b>{{ main[1].b }}</b>
                                </div>
                                <div class="casino-cards text-center mt-1"
                                    :class="{'suspended': main[1].gstatus != 'OPEN'}">
                                    <div class="casino-card-item" @click="setBetData(1, 'lay')"
                                        :class="{ 'selected' : checkSelected(1, 'lay') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/A.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(2, 'lay')"
                                        :class="{ 'selected' : checkSelected(2, 'lay') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/2.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(3, 'lay')"
                                        :class="{ 'selected' : checkSelected(3, 'lay') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/3.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(4, 'lay')"
                                        :class="{ 'selected' : checkSelected(4, 'lay') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/4.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(5, 'lay')"
                                        :class="{ 'selected' : checkSelected(5, 'lay') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/5.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(6, 'lay')"
                                        :class="{ 'selected' : checkSelected(6, 'lay') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/6.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(7, 'lay')"
                                        :class="{ 'selected' : checkSelected(7, 'lay') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/7.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(8, 'lay')"
                                        :class="{ 'selected' : checkSelected(8, 'lay') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/8.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(9, 'lay')"
                                        :class="{ 'selected' : checkSelected(9, 'lay') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/9.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(10, 'lay')"
                                        :class="{ 'selected' : checkSelected(10, 'lay') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/10.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(11, 'lay')"
                                        :class="{ 'selected' : checkSelected(11, 'lay') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/J.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(12, 'lay')"
                                        :class="{ 'selected' : checkSelected(12, 'lay') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/Q.png`">
                                        </div>
                                    </div>
                                    <div class="casino-card-item" @click="setBetData(13, 'lay')"
                                        :class="{ 'selected' : checkSelected(13, 'lay') }">
                                        <div class=" card-image ">
                                            <img :src="`${imgPath}front/img/cards/K.png`">
                                        </div>
                                    </div>
                                </div>
                                <div class="casino-min-max text-right"
                                    v-if="casinoData.remark && casinoData.remark != ''">
                                    <marquee>{{ casinoData.remark.split('|')[1] }}</marquee>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="text-right casino-min-max">
                            R:<span v-kval="{size: main[0].min}"></span>-<span v-kval="{size: main[0].max}"></span>
                        </div> -->
                    </div>
                </template>

                <template v-if="!$store.getters.isTablet">
                    <div class="threecardj-container d-none-big">
                        <div class="threecardj-bl-box back">
                            <div class="threecardj-title">
                                <span>
                                    <b>Yes</b>
                                    <b class="ml-2">{{ main[0].b }}</b>
                                </span>
                                <span v-casinofancybook="{sid: main[0].sid, subid: 0}">0</span>
                            </div>
                            <div class="threecardj-cards">
                                <div class="casino-cards text-center mt-1"
                                    :class="{'suspended': main[1].gstatus != 'OPEN'}">
                                    <div class="owl-carousel owl-theme" id="yes_div">
                                        <template v-for="(yes, key) in 13">
                                            <div class="casino-card-item item" @click="setBetData(yes, 'back')"
                                                :key="key">
                                                <div class=" card-image">
                                                    <template v-if="yes == 1">
                                                        <img :class="{ 'selected' : checkSelected(yes, 'back') }" :src="`${imgPath}front/img/cards/A.png`">
                                                    </template>
                                                    <template v-else-if="yes == 11">
                                                        <img :class="{ 'selected' : checkSelected(yes, 'back') }" :src="`${imgPath}front/img/cards/J.png`">
                                                    </template>
                                                    <template v-else-if="yes == 12">
                                                        <img :class="{ 'selected' : checkSelected(yes, 'back') }" :src="`${imgPath}front/img/cards/Q.png`">
                                                    </template>
                                                    <template v-else-if="yes == 13">
                                                        <img :class="{ 'selected' : checkSelected(yes, 'back') }" :src="`${imgPath}front/img/cards/K.png`">
                                                    </template>
                                                    <template v-else>
                                                        <img :class="{ 'selected' : checkSelected(yes, 'back') }" :src="`${imgPath}front/img/cards/${yes}.png`">
                                                    </template>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </div>

                                <div class="casino-min-max text-right" v-if="casinoData.remark && casinoData.remark != ''">
                                    <marquee>{{ casinoData.remark.split('|')[0] }}</marquee>
                                </div>
                            </div>
                        </div>
                        <div class="threecardj-bl-box lay">
                            <div class="threecardj-title">
                                <span>
                                    <b>No</b>
                                    <b class="ml-2">{{ main[1].b }}</b>
                                </span>
                                <span v-casinofancybook="{sid: main[1].sid, subid: 0}">0</span>
                            </div>
                            <div class="threecardj-cards">
                                <div class="casino-cards text-center mt-1"
                                    :class="{'suspended': main[1].gstatus != 'OPEN'}">

                                    <div class="owl-carousel owl-theme" id="no_div">
                                        <template v-for="(no, key) in 13">
                                            <div class="casino-card-item item" @click="setBetData(no, 'lay')"
                                                :key="key">
                                                <div class=" card-image">
                                                    <template v-if="no == 1">
                                                        <img :class="{ 'selected' : checkSelected(no, 'lay') }" :src="`${imgPath}front/img/cards/A.png`">
                                                    </template>
                                                    <template v-else-if="no == 11">
                                                        <img :class="{ 'selected' : checkSelected(no, 'lay') }" :src="`${imgPath}front/img/cards/J.png`">
                                                    </template>
                                                    <template v-else-if="no == 12">
                                                        <img :class="{ 'selected' : checkSelected(no, 'lay') }" :src="`${imgPath}front/img/cards/Q.png`">
                                                    </template>
                                                    <template v-else-if="no == 13">
                                                        <img :class="{ 'selected' : checkSelected(no, 'lay') }" :src="`${imgPath}front/img/cards/K.png`">
                                                    </template>
                                                    <template v-else>
                                                        <img :class="{ 'selected' : checkSelected(no, 'lay') }" :src="`${imgPath}front/img/cards/${no}.png`">
                                                    </template>
                                                </div>
                                            </div>
                                        </template>
                                    </div>

                                </div>
                                <div class="casino-min-max text-right" v-if="casinoData.remark && casinoData.remark != ''">
                                    <marquee>{{ casinoData.remark.split('|')[1] }}</marquee>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="text-right casino-min-max">
                            R:<span v-kval="{size: main[0].min}"></span>-<span v-kval="{size: main[0].max}"></span>
                        </div> -->
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
                        <button class="btn btn-primary" :disabled="invalid || !$store.state.casinoBet.betStatus" @click="$parent.placebetCasino()">Submit</button>
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
        created() {
            $('#yes_div, #no_div').owlCarousel({
                loop: false,
                margin: 0,
                responsiveClass: true,
                slideBy: 5,
                dots: false,
                responsive: {
                    0: {
                        items: 4,
                        nav: true
                    },
                    320: {
                        items: 4,
                        nav: true
                    },
                    360: {
                        items: 5,
                        nav: true
                    },
                    411: {
                        items: 6,
                        nav: true
                    }
                }
            });
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
                    'subtype': '3cardj'
                })
                return this.orderBy(player, 'sr')
            }
        },
        data() {
            return {
                showCards: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: '3cardj',
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
                selected: [],
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

            checkSelected(btnNo, betType) {
                if (this.$store.state.casinoBet && this.$store.state.casinoBet.betType == betType) {
                    if (this.$store.state.casinoBet.selected) {
                        for (var i = 0; i < this.$store.state.casinoBet.selected.length; i++) {
                            if (this.$store.state.casinoBet.selected[i] == btnNo) {
                                return true;
                            }
                        }
                    }
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

                        $('#yes_div, #no_div').owlCarousel({
                            loop: false,
                            margin: 0,
                            responsiveClass: true,
                            slideBy: 5,
                            dots: false,
                            responsive: {
                                0: {
                                    items: 4,
                                    nav: true
                                },
                                320: {
                                    items: 4,
                                    nav: true
                                },
                                360: {
                                    items: 5,
                                    nav: true
                                },
                                411: {
                                    items: 6,
                                    nav: true
                                }
                            }
                        });

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
            setBetData(cardNo, betType) {
                let index = 0;
                if (betType == "lay") {
                    index = 1;
                }
                if (this.$store.state.casinoBet && this.$store.state.casinoBet.selected) {
                    this.selected = this.$store.state.casinoBet.selected;
                } else {
                    this.selected = [];
                }
                if (this.main[index].gstatus != 'OPEN' || this.selected.length >= 3) {
                    return;
                }
                if (this.selected.length > 0 && this.$store.state.casinoBet.betType != betType) {
                    return;
                }
                this.selected.push(cardNo);
                this.selected = [...new Set(this.selected)];
                let cardno = this.sortNumberString(this.selected)

                let betdata = {}
                betdata.subType = this.main[index].subtype
                betdata.marketId = this.mId
                betdata.sectionId = this.main[index].sid
                betdata.subId = 0
                betdata.uRate = this.main[index].b
                betdata.min = this.main[index].min
                betdata.max = this.main[index].max
                betdata.amount = ''
                betdata.betType = betType
                betdata.gameType = this.gameType
                betdata.nation = this.main[index].nat + " " + cardno.toString()
                betdata.selected = this.selected
                betdata.ucard = cardno
                betdata.betStatus = false


                this.$store.commit('setCasinoBetData', betdata)

                if (this.$store.state.casinoBet && this.$store.state.casinoBet.selected.length == 3) {
                    betdata.betStatus = true
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
                var str = new Set();
                inputval.forEach(function (value) {
                    if (value == 1) {
                        str.add("A")
                    } else if (value == 11) {
                        str.add("J")
                    } else if (value == 12) {
                        str.add("Q")
                    } else if (value == 13) {
                        str.add("K")
                    } else {
                        str.add(value)
                    }
                });
                return Array.from(str).join("")
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