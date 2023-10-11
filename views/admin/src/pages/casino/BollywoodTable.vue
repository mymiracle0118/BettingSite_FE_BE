<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table aaa">
                    <div class="casino-video">
                        <div class="casino-video-title">
                            <span class="casino-name">{{ gameTitle }}</span>
                            <div class="casino-video-rid">Round ID: {{ casinoData.mid }}</div>
                        </div>
                        <div class="video-box-container">
                            <div class="video-box" v-if="tvUrl != ''">
                                <iframe :src="tvUrl">
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
                                </div>
                            </div>
                        </template>
                        <div class="casino-timer">
                            <Timer v-if="time.total != 0" :totalTime="time.total" :currentTime="time.current" />
                        </div>
                        <div class="casino-video-right-icons">
                            <div class="casino-video-home-icon" title="Home">
                                <router-link :to="{name: 'casinolist'}" style="color: var(--text-highlight);">
                                <i class="fas fa-home"></i>
                                </router-link>
                            </div>
                            <div class="casino-video-rules-icon"  title="Rules" @click="$refs.casinorules.show()">
                                <i class="fas fa-info-circle"></i>
                            </div>
                            <div class="casino-video-lr-icon" @click="showResults = !showResults" title="Last Results">
                                <i class="fas" :class="[{'fa-chevron-circle-down':!showResults},{'fa-chevron-circle-up':showResults}]"></i>
                            </div>
                        </div>
                        <CasinoRules ref="casinorules" :gtype="gameType"></CasinoRules>
                        <LastResultsSection v-if="$store.getters.isTablet" :gtype="gameType" :lastResults="lastResults" :showResults="showResults" />
                        
                    </div>
                    <div class="casino-detail" v-if="casinoData && casinoData.mid">
                        <template v-if="$store.getters.isTablet">
                        <div class="row row5 d-none-small">
                            <template v-for="(i, key) in 6">
                                <div class="col-4" :key="key">
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>{{ alphabets[i-1] }}. {{ main[i-1].nat }}</b>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': main[i-1].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ main[i-1].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item" :class="{'suspended': main[i-1].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ main[i-1].l }}</span>
                                            </div>
                                        </div>
                                        <div class="casino-book text-center" v-casinobook="{sid: main[i-1].sid}">
                                            0
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <div class="col-12">
                                <div class="teen1daycasino-container justify-content-end casino-min-max">
                                    <div>R:<span v-kval="{size: main[0].min}"></span> - <span v-kval="{size: main[0].max}"></span></div>
                                </div>
                            </div>
                        </div>
                        </template>
                        
                        <template v-if="!$store.getters.isTablet">
                            <div class="row row5 d-none-big">
                                <template v-for="(i, key) in 6">
                                    <div class="casino-bl-box" :key="key">
                                        <div class="casino-bl-box-item casino-odds-name">
                                            <b>{{ alphabets[i-1] }}. {{ main[i-1].nat }}</b>
                                            <span class="float-right" v-casinobook="{sid: main[i-1].sid}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item" :class="{'suspended': main[i-1].gstatus != 'OPEN'}"
                                            @click="setBetData(main[i-1].nat, main[i-1].b, mId, main[i-1].sid, main[i-1].subtype, 0, 'back', gameType, main[i-1].gstatus)">
                                            <span class="casino-box-odd">{{ main[i-1].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': main[i-1].gstatus != 'OPEN'}"
                                            @click="setBetData(main[i-1].nat, main[i-1].l, mId, main[i-1].sid, main[i-1].subtype, 0, 'lay', gameType, main[i-1].gstatus)">
                                            <span class="casino-box-odd">{{ main[i-1].l }}</span>
                                        </div>
                                    </div>
                                </template>

                                <div class="teen1daycasino-container justify-content-end casino-min-max w-100">
                                    <div>R:<span v-kval="{size: main[0].min}"></span> - <span v-kval="{size: main[0].max}"></span></div>
                                </div>

                                <div class="casino-bl-box ">
                                    <div class="casino-bl-box-item casino-odds-name">
                                        <b>Odd</b>
                                        <span class="float-right" v-casinofancybook="{sid: fancy1[0].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': fancy1[0].gstatus != 'OPEN'}"
                                        @click="setBetData(fancy1[0].nat, fancy1[0].b, mId, fancy1[0].sid, fancy1[0].subtype, 0, 'back', gameType, fancy1[0].gstatus)">
                                        <span class="casino-box-odd">{{ fancy1[0].b }}</span>
                                    </div>
                                    <div class="lay casino-bl-box-item" :class="{'suspended': fancy1[0].gstatus != 'OPEN'}"
                                        @click="setBetData(fancy1[0].nat, fancy1[0].l, mId, fancy1[0].sid, fancy1[0].subtype, 0, 'lay', gameType, fancy1[0].gstatus)">
                                        <span class="casino-box-odd">{{ fancy1[0].l }}</span>
                                    </div>
                                </div>
                                <div class="teen1daycasino-container justify-content-end casino-min-max w-100">
                                    <div>R:<span v-kval="{size: fancy1[0].min}"></span> - <span v-kval="{size: fancy1[0].max}"></span></div>
                                </div>
                            </div>
                        </template>
                        <div class="row row5 ">
                            <div class="col-lg-4 col-12 d-none-small">
                                <div class="casino-box-row">
                                    <div class="casino-nation-name">
                                        <b>Odd</b>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended': fancy1[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ fancy1[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': fancy1[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ fancy1[0].l }}</span>
                                        </div>
                                    </div>
                                    <div class="casino-book text-center" v-casinofancybook="{sid: fancy1[0].sid, subid: 0}">
                                        0
                                    </div>
                                    <div class="teen1daycasino-container justify-content-end casino-min-max w-100">
                                        <div>R:<span v-kval="{size: fancy1[0].min}"></span> - <span v-kval="{size: fancy1[0].max}"></span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-6 bc-fancy">
                                <div class="casino-box-row">
                                    <div class="casino-nation-name">
                                        <b>{{ fancy[6].b }}</b>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended': fancy[6].gstatus != 'OPEN'}"
                                           >
                                            <span class="casino-box-odd">Dulha Dulhan K-Q</span>
                                            
                                        </div>
                                        <span class="casino-book text-center" v-casinofancybook="{sid: fancy[6].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="teen1daycasino-container justify-content-end casino-min-max w-100">
                                    <div>R:<span v-kval="{size: fancy[6].min}"></span> - <span v-kval="{size: fancy[6].max}"></span></div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-6 bc-fancy">
                                <div class="casino-box-row">
                                    <div class="casino-nation-name">
                                        <b>{{ fancy[7].b }}</b>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended': fancy[7].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">Barati J-A</span>
                                            
                                        </div>
                                        <span class="casino-book text-center" v-casinofancybook="{sid: fancy[7].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="teen1daycasino-container justify-content-end casino-min-max w-100">
                                    <div>R:<span v-kval="{size: fancy[7].min}"></span> - <span v-kval="{size: fancy[7].max}"></span></div>
                                </div>
                            </div>
                        </div>

                        <div class="row row5">
                            <div class="col-lg-6 col-12 aaa-oe">
                                <div class="casino-box-row">
                                    <div class="casino-bl-box">
                                        <b>{{ fancy[0].b }}</b>
                                    </div>
                                    <div class="casino-bl-box">
                                        <b>{{ fancy[1].b }}</b>
                                    </div>
                                </div>
                                <div class="casino-box-row">
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item casino-card-img" :class="{'suspended': fancy[0].gstatus != 'OPEN'}"
                                            >
                                            <span>
                                                <img :src="`${imgPath}front/img/cards/heart.png`">
                                                <img :src="`${imgPath}front/img/cards/diamond.png`">
                                            </span>
                                            
                                        </div>
                                        <span class="casino-book text-center" v-casinofancybook="{sid: fancy[0].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item casino-card-img" :class="{'suspended': fancy[1].gstatus != 'OPEN'}"
                                            >
                                            <span>
                                                <img :src="`${imgPath}front/img/cards/spade.png`">
                                                <img :src="`${imgPath}front/img/cards/club.png`">
                                            </span>
                                            
                                        </div>
                                        <span class="casino-book text-center" v-casinofancybook="{sid: fancy[1].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="teen1daycasino-container justify-content-end casino-min-max w-100">
                                    <div>R:<span v-kval="{size: fancy[0].min}"></span> - <span v-kval="{size: fancy[0].max}"></span></div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-12">
                                <div class="text-center w-100">
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item">
                                            <b>Cards {{ fancy[2].b }}</b>
                                        </div>
                                    </div>
                                </div>
                                <div class="casino-cards text-center mt-1">
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': fancy[2].gstatus != 'OPEN'}"
                                            >
                                            <img :src="`${imgPath}front/img/cards/J.png`">
                                        </div>
                                        <div class="casino-book text-center" v-casinofancybook="{sid: fancy[2].sid, subid: 0}">0</div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': fancy[3].gstatus != 'OPEN'}"
                                            >
                                            <img :src="`${imgPath}front/img/cards/Q.png`">
                                        </div>
                                        <div class="casino-book  text-center" v-casinofancybook="{sid: fancy[3].sid, subid: 0}">0</div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': fancy[4].gstatus != 'OPEN'}"
                                            >
                                            <img :src="`${imgPath}front/img/cards/K.png`">
                                        </div>
                                        <div class="casino-book  text-center" v-casinofancybook="{sid: fancy[4].sid, subid: 0}">0</div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': fancy[5].gstatus != 'OPEN'}"
                                            >
                                            <img :src="`${imgPath}front/img/cards/A.png`">
                                        </div>
                                        <div class="casino-book text-center" v-casinofancybook="{sid: fancy[5].sid, subid: 0}">0</div>
                                    </div>
                                </div>
                                <div class="teen1daycasino-container justify-content-end casino-min-max w-100">
                                    <div>R:<span v-kval="{size: fancy[2].min}"></span> - <span v-kval="{size: fancy[2].max}"></span></div>
                                </div>
                            </div>
                        </div>
                        <template v-if="casinoData.remark && casinoData.remark != ''">
                            <div class="casino-remark mt-3">
                                <div class="remark-icon">
                                    <img :src="`${imgPath}front/img/icons/remark.png`">
                                </div>
                                <marquee>{{ casinoData.remark }}</marquee>
                            </div>
                        </template> 
                        <LastResultsSection v-if="!$store.getters.isTablet" :gtype="gameType" :lastResults="lastResults" :showResults="showResults" />
                    </div>
                </div>
                
                </div>
            </div>
            <div class="right-sidebar">
                <RightSideBar :mid="mId" :gtype="gameType"></RightSideBar>
            </div>
        </div>
    </div>
    
    </template>

<script>
    import ServiceApi from "@/services/ServiceApi";
    import Timer from "@/components/casino/BaseTimer"
    import RightSideBar from "@/components/casino/RightSideBar"
    import Card from '@/components/casino/Card'
    import CasinoRules from '@/components/casino/CasinoRules'
    import LastResultsSection from '@/components/casino/LastResultsSection'
    export default {
        mounted() {
            this.getTvUrl();
            this.getCasinoData()
            this.getUserBook()
            this.getLastResults()
        },
        components: {
            Timer,
            RightSideBar,
            Card,
            CasinoRules,
            LastResultsSection
        },
        computed: {
            main() {
                var player = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'btable'
                })
                return this.orderBy(player, 'sr')
            },
            fancy() {
                var player = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'btablefancy'
                })
                return this.orderBy(player, 'sr')
            },
            fancy1() {
                var player = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'btablefancy1'
                })
                return this.orderBy(player, 'sr')
            }
        },
        data() {
            return {
                showCards: true,
                showResults: true,
                imgPath: IMG_PATH,
                gameTitle: 'Bollywood Casino',
                gameType: 'btable',
                casinoData: [],
                mId: 0,
                cards: [],
                lastResults: [],
                time: {
                    total: 0,
                    current: 0
                },
                callDataApi: true,
                callBookApi: true,
                loadingPlacebet: false,
                tvUrl: '',
                alphabets: ['A', 'B', 'C', 'D', 'E', 'F'],
                userExp: 0
               
            }
        },
        methods: {
            getTvUrl() {
                ServiceApi.callApi("casino/gettoken", {'id': 'tv'})
                .then(response => {
                    if (response.status == 200) {
                        this.tvUrl = '/admin/pages/mediaplayercasino/' + this.gameType + '/' + response.data.token + '?ip=' + IP_ADDRESS;
                    } else {
                        this.tvUrl = ''
                    }
                })
                .catch(e => {
                    this.tvUrl = ''
                });
            },
            toggleCards(card) {
                if (card != '1') {
                    this.showCards = !this.showCards
                }
            },
            getKey(data, key) {
                return _.get(data, 'key')
            },
            getCasinoData() {
                ServiceApi.callApi("casino/data", {
                        'type': this.gameType,
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.casinoData = response.data
                            if(_.get(this.casinoData, 'mid') != this.mId){
                                this.getLastResults()
                            }
                            this.mId = _.get(this.casinoData, 'mid')
                            this.cards = _.get(this.casinoData, 'card').split(',')
                            this.time.total = _.get(this.casinoData, 'ft')
                            this.time.current = _.get(this.casinoData, 'lt')
                            if(this.callDataApi == true){
                                setTimeout(res => {
                                    this.getCasinoData();
                                }, 800);
                            }
                        } else {
                            //this.casinoData = []
                            if(this.callDataApi == true){
                                setTimeout(res => {
                                    this.getCasinoData();
                                }, 800);
                            }
                        }
                        //this.getUserBook();
                    })
                    .catch(e => {
                        //this.casinoData = []
                        if(this.callDataApi == true){
                            setTimeout(res => {
                                this.getCasinoData();
                            }, 800);
                        }
                    });
            },
            getUserBook() {
                ServiceApi.callApi("casino/book", {
                    'mid': parseInt(this.mId),
                    'gType': this.gameType
                })
                .then(response => {
                    if (response.status == 200) {
                        this.$store.state.casinoBetSoda = response.data.bet
                        this.$store.state.casinoFancybetBook = response.data.fancy
                        this.$store.state.casinobetBook = response.data.sportbet
                    } else {
                        this.$store.state.casinoBetSoda = null
                        this.$store.state.casinobetBook = null
                        this.$store.state.casinoFancybetBook = null
                    }
                    if (this.callBookApi == true) {
                        setTimeout(res => {
                            this.getUserBook();
                        }, 800);
                    }
                })
                .catch(e => {
                    /*this.$store.state.casinoBetSoda = null
                    this.$store.state.casinobetBook = null
                    this.$store.state.casinoFancybetBook = null*/
                    if (this.callBookApi == true) {
                        setTimeout(res => {
                            this.getUserBook();
                        }, 800);
                    }
                });          
            },
            getLastResults() {
                ServiceApi.callApi("casino/lastresults", {
                        'gType': this.gameType
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.lastResults = response.data.res
                            this.gameTitle = response.data.res1 ? response.data.res1.cname : "";
                        } else {
                            this.lastResults = []
                        }
                    })
                    .catch(e => {
                        this.lastResults = []
                    });

            },
            
            
           
        },
        beforeDestroy() {
            this.callBookApi = false
            this.callDataApi = false
            
        }
    }
</script>