<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table dt1day">
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
                                        <Card :card="cards[1]" />
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
                        <div class="dt1dayfancy">
                            <div class="casino-box-row dragonfancy">
                                <div class="casino-nation-name">
                                    <div class="float-left mr-2">
                                        <i class="fas fa-info-circle" data-toggle="collapse" :data-target="`#demo0`"></i>
                                        <div :id="`demo0`" class="collapse icon-range">
                                            R:<span v-kval="{size: main[0].min}"></span>-<span
                                                v-kval="{size: main[0].max}"></span>
                                        </div>
                                    </div>
                                    <b>{{ main[0].nat }}</b>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ main[0].b }}</span>
                               
                                    </div>
                                    <div class="lay casino-bl-box-item" :class="{'suspended': main[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ main[0].l }}</span>
                                        
                                    </div>
                                </div>
                                <div class="casino-nation-name text-center w-100">
                                    <span class="casino-book" v-casinobook="{sid: main[0].sid}"></span>
                                </div>
                            </div>
                            <div class="casino-box-row pairfancy">
                                <div class="casino-nation-name">
                                    <div class="float-left mr-2">
                                        <i class="fas fa-info-circle" data-toggle="collapse" :data-target="`#demo2`"></i>
                                        <div :id="`demo2`" class="collapse icon-range">
                                            R:<span v-kval="{size: fancy[0].min}"></span>-<span
                                                v-kval="{size: fancy[0].max}"></span>
                                        </div>
                                    </div>
                                    <b>{{ fancy[0].nat }}</b>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item" :class="{'suspended': fancy[0].gstatus != 'OPEN'}">
                                        <span class="casino-box-odd">{{ fancy[0].b }}</span>
                                    </div>
                                </div>
                                <div class="casino-nation-name text-center w-100">
                                    <span class="casino-book" v-casinofancybook="{sid: fancy[0].sid, subid: 0}"></span>
                                </div>
                            </div>
                            <div class="casino-box-row tigerfancy">
                                <div class="casino-nation-name">
                                    <div class="float-left mr-2">
                                        <i class="fas fa-info-circle" data-toggle="collapse" :data-target="`#demo1`"></i>
                                        <div :id="`demo1`" class="collapse icon-range">
                                            R:<span v-kval="{size: main[1].min}"></span>-<span
                                                v-kval="{size: main[1].max}"></span>
                                        </div>
                                    </div>
                                    <b>{{ main[1].nat }}</b>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[1].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ main[1].b }}</span>
                               
                                    </div>
                                    <div class="lay casino-bl-box-item" :class="{'suspended': main[1].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ main[1].l }}</span>
                                        
                                    </div>
                                </div>
                                <div class="casino-nation-name text-center w-100">
                                    <span class="casino-book" v-casinobook="{sid: main[1].sid}">0</span>
                                </div>
                            </div>
                        </div>
                        <div class="teen1daycasino-container mt-2">
                            <div class="teen1dayleft">
                                <div>
                                    <div class="casino-box-row casino-odds casino-title">
                                        <div class="text-left w-100">
                                            <b class="text-playera">Dragon</b>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-bl-box">
                                            <b>{{ fancy[1].b }}</b>
                                        </div>
                                        <div class="casino-bl-box">
                                            <b>{{ fancy[2].b }}</b>
                                        </div>
                                        <div class="casino-bl-box">
                                            <b>{{ fancy[3].b }}</b>
                                        </div>
                                        <div class="casino-bl-box">
                                            <b>{{ fancy[4].b }}</b>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-bl-box" :class="{'suspended': fancy[1].gstatus != 'OPEN'}"
                                            >
                                            <div class="back casino-bl-box-item">
                                                <span class="casino-box-odd">Even</span>
                                                <span class="casino-book" v-casinofancybook="{sid: fancy[1].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box" :class="{'suspended': fancy[2].gstatus != 'OPEN'}"
                                            >
                                            <div class="back casino-bl-box-item">
                                                <span class="casino-box-odd">Odd</span>
                                                <span class="casino-book" v-casinofancybook="{sid: fancy[2].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box" :class="{'suspended': fancy[4].gstatus != 'OPEN'}"
                                            >
                                            <div class="back casino-bl-box-item casino-card-img">
                                                <span>
                                                    <img :src="`${imgPath}front/img/cards/spade.png`">
                                                    <img :src="`${imgPath}front/img/cards/club.png`">
                                                </span>
                                                <span class="casino-book" v-casinofancybook="{sid: fancy[4].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box" :class="{'suspended': fancy[3].gstatus != 'OPEN'}"
                                            >
                                            <div class="back casino-bl-box-item casino-card-img">
                                                <span>
                                                    <img :src="`${imgPath}front/img/cards/heart.png`">
                                                    <img :src="`${imgPath}front/img/cards/diamond.png`">
                                                </span>
                                                <span class="casino-book" v-casinofancybook="{sid: fancy[3].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div class="casino-box-row casino-odds">
                                        <div class="text-center w-100">
                                            <span class="float-right casino-min-max">R:<span v-kval="{size: fancy[1].min}"></span>-<span v-kval="{size: fancy[1].max}"></span></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <div class="casino-box-row">
                                        <div class="casino-bl-box">
                                            <div class="casino-bl-box-item casino-card-img">
                                                <img :src="`${imgPath}front/img/cards/spade.png`">
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="casino-bl-box-item casino-card-img">
                                                <img :src="`${imgPath}front/img/cards/heart.png`">
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="casino-bl-box-item casino-card-img">
                                                <img :src="`${imgPath}front/img/cards/club.png`">
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="casino-bl-box-item casino-card-img">
                                                <img :src="`${imgPath}front/img/cards/diamond.png`">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': fancy[5].gstatus != 'OPEN'}"
                                                    >
                                                <span class="casino-box-odd">{{ fancy[5].b }}</span>
                                                <span class="casino-book" v-casinofancybook="{sid: fancy[5].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': fancy[6].gstatus != 'OPEN'}"
                                                    >
                                                <span class="casino-box-odd">{{ fancy[6].b }}</span>
                                                <span class="casino-book" v-casinofancybook="{sid: fancy[6].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': fancy[8].gstatus != 'OPEN'}"
                                                    >
                                                <span class="casino-box-odd">{{ fancy[8].b }}</span>
                                                <span class="casino-book" v-casinofancybook="{sid: fancy[8].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': fancy[7].gstatus != 'OPEN'}"
                                                    >
                                                <span class="casino-box-odd">{{ fancy[7].b }}</span>
                                                <span class="casino-book" v-casinofancybook="{sid: fancy[7].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row casino-odds">
                                        <div class="text-center w-100">
                                            <span class="float-right casino-min-max">R:<span v-kval="{size: fancy[5].min}"></span>-<span
                                                v-kval="{size: fancy[5].max}"></span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="teen1daycenter"></div>
                            <div class="teen1dayright">
                                <div>
                                    <div class="casino-box-row casino-odds casino-title">
                                        <div class="text-left w-100">
                                            <b class="text-playerb">Tiger</b>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-bl-box">
                                            <b>{{ fancy[9].b }}</b>
                                        </div>
                                        <div class="casino-bl-box">
                                            <b>{{ fancy[10].b }}</b>
                                        </div>
                                        <div class="casino-bl-box">
                                            <b>{{ fancy[11].b }}</b>
                                        </div>
                                        <div class="casino-bl-box">
                                            <b>{{ fancy[12].b }}</b>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-bl-box" :class="{'suspended': fancy[9].gstatus != 'OPEN'}"
                                            >
                                            <div class="back casino-bl-box-item">
                                                <span class="casino-box-odd">Even</span>
                                                <span class="casino-book" v-casinofancybook="{sid: fancy[9].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box" :class="{'suspended': fancy[10].gstatus != 'OPEN'}"
                                            >
                                            <div class="back casino-bl-box-item">
                                                <span class="casino-box-odd">Odd</span>
                                                <span class="casino-book" v-casinofancybook="{sid: fancy[10].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box" :class="{'suspended': fancy[11].gstatus != 'OPEN'}"
                                            >
                                            <div class="back casino-bl-box-item casino-card-img">
                                                <span>
                                                    <img :src="`${imgPath}front/img/cards/heart.png`">
                                                    <img :src="`${imgPath}front/img/cards/diamond.png`">
                                                </span>
                                                <span class="casino-book" v-casinofancybook="{sid: fancy[11].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box" :class="{'suspended': fancy[12].gstatus != 'OPEN'}"
                                            >
                                            <div class="back casino-bl-box-item casino-card-img">
                                                <span>
                                                    <img :src="`${imgPath}front/img/cards/spade.png`">
                                                    <img :src="`${imgPath}front/img/cards/club.png`">
                                                </span>
                                                <span class="casino-book" v-casinofancybook="{sid: fancy[12].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row casino-odds">
                                        <div class="text-center w-100">
                                            <span class="float-right casino-min-max">R:<span v-kval="{size: fancy[9].min}"></span>-<span v-kval="{size: fancy[9].max}"></span></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <div class="casino-box-row">
                                        <div class="casino-bl-box">
                                            <div class="casino-bl-box-item casino-card-img">
                                                <img :src="`${imgPath}front/img/cards/spade.png`">
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="casino-bl-box-item casino-card-img">
                                                <img :src="`${imgPath}front/img/cards/heart.png`">
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="casino-bl-box-item casino-card-img">
                                                <img :src="`${imgPath}front/img/cards/club.png`">
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="casino-bl-box-item casino-card-img">
                                                <img :src="`${imgPath}front/img/cards/diamond.png`">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="casino-box-row">
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': fancy[13].gstatus != 'OPEN'}"
                                                    >
                                                <span class="casino-box-odd">{{ fancy[13].b }}</span>
                                                <span class="casino-book" v-casinofancybook="{sid: fancy[13].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': fancy[14].gstatus != 'OPEN'}"
                                                   >
                                                <span class="casino-box-odd">{{ fancy[14].b }}</span>
                                                <span class="casino-book" v-casinofancybook="{sid: fancy[14].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': fancy[16].gstatus != 'OPEN'}"
                                                    >
                                                <span class="casino-box-odd">{{ fancy[16].b }}</span>
                                                <span class="casino-book" v-casinofancybook="{sid: fancy[16].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': fancy[15].gstatus != 'OPEN'}"
                                                  >
                                                <span class="casino-box-odd">{{ fancy[15].b }}</span>
                                                <span class="casino-book" v-casinofancybook="{sid: fancy[15].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row casino-odds">
                                        <div class="text-center w-100">
                                            <span class="float-right casino-min-max">R:<span v-kval="{size: fancy[13].min}"></span>-<span
                                                v-kval="{size: fancy[13].max}"></span></span>
                                        </div>
                                    </div>
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
                    'subtype': 'dt6'
                })
                return this.orderBy(player, 'sr')
            },
            fancy() {
                var pair = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'dt6fancy'
                })
                return this.orderBy(pair, 'sr')
            }
        },
        data() {
            return {
                showCards: true,
                showResults: true,
                imgPath: IMG_PATH,
                gameTitle: '1-Day Dragon Tiger',
                gameType: 'dt6',
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
                           // this.casinoData = []
                            if(this.callDataApi == true){
                                setTimeout(res => {
                                    this.getCasinoData();
                                }, 800);
                            }
                        }
                       // this.getUserBook();
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