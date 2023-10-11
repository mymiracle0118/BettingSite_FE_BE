<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table teenpattitest">
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
                                        <div class="dealer-name w-100 mb-1">Tiger</div>
                                        <Card :card="cards[0]" />
                                        <Card :card="cards[3]" />
                                        <Card :card="cards[6]" />
                                    </div>
                                    <div>
                                        <div class="dealer-name w-100 mb-1">Lion</div>
                                        <Card :card="cards[1]" />
                                        <Card :card="cards[4]" />
                                        <Card :card="cards[7]" />
                                    </div>
                                    <div>
                                        <div class="dealer-name w-100 mb-1">Dragon</div>
                                        <Card :card="cards[2]" />
                                        <Card :card="cards[5]" />
                                        <Card :card="cards[8]" />
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
                        <div class="teen1daycasino-container d-none-small">
                            <div class="teentestother">
                                <div class="casino-box-row">
                                    <div class="casino-nation-name no-border">

                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item">
                                            <b>Winner</b>
                                            <div class="float-right">
                                                <i class="fas fa-info-circle" data-toggle="collapse" data-target="#range1"></i>
                                                <div id="range1" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[0].min}"></span>-<span v-kval="{size: main[0].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item">
                                            <b>Pair</b>
                                            <div class="float-right">
                                                <i class="fas fa-info-circle" data-toggle="collapse" data-target="#range2"></i>
                                                <div id="range2" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[1].min}"></span>-<span v-kval="{size: main[1].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item">
                                            <b>Flush</b>
                                            <div class="float-right">
                                                <i class="fas fa-info-circle" data-toggle="collapse" data-target="#range3"></i>
                                                <div id="range3" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[2].min}"></span>-<span v-kval="{size: main[2].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item">
                                            <b>Straight</b>
                                            <div class="float-right">
                                                <i class="fas fa-info-circle" data-toggle="collapse" data-target="#range4"></i>
                                                <div id="range4" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[3].min}"></span>-<span v-kval="{size: main[3].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item">
                                            <b>Trio</b>
                                            <div class="float-right">
                                                <i class="fas fa-info-circle" data-toggle="collapse" data-target="#range5"></i>
                                                <div id="range5" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[4].min}"></span>-<span v-kval="{size: main[4].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item">
                                            <b>Straight Flush</b>
                                            <div class="float-right">
                                                <i class="fas fa-info-circle" data-toggle="collapse" data-target="#range6"></i>
                                                <div id="range6" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[5].min}"></span>-<span v-kval="{size: main[5].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="casino-box-row mb-4">
                                    <div class="casino-nation-name">
                                        <b>Tiger</b>
                                        <!-- <div class="float-right">
                                            <i class="fas fa-info-circle" data-toggle="collapse" data-target="#demo"></i>
                                            <div id="demo" class="collapse icon-range">
                                                <span class="float-right casino-min-max">R:<span
                                                    v-kval="{size: main[0].min}"></span>-<span
                                                    v-kval="{size: main[0].max}"></span></span>
                                            </div>
                                        </div> -->
                                    </div>

                                    <template v-for="(i, key) in 6">
                                        <div class="casino-bl-box" :key="`tiger-${key}`">
                                            <div class="back casino-bl-box-item" :class="{'suspended': main[i-1].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ main[i-1].b }}</span>
                                                <span class="casino-book" v-casinofancybook="{sid: main[i-1].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                    </template>

                                </div>
                                <div class="casino-box-row mb-4">
                                    <div class="casino-nation-name">
                                        <b>Lion</b>
                                        <!-- <div class="float-right">
                                            <i class="fas fa-info-circle" data-toggle="collapse" data-target="#demo1"></i>
                                            <div id="demo1" class="collapse icon-range">
                                                <span class="float-right casino-min-max">R:<span
                                                    v-kval="{size: main[6].min}"></span>-<span
                                                    v-kval="{size: main[6].max}"></span></span>
                                            </div>
                                        </div> -->
                                    </div>

                                    <template v-for="(i, key) in 6">
                                        <div class="casino-bl-box" :key="`lion-${key}`">
                                            <div class="back casino-bl-box-item" :class="{'suspended': main[i+5].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ main[i+5].b }}</span>
                                                <span class="casino-book" v-casinofancybook="{sid: main[i+5].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                    </template>

                                </div>
                                <div class="casino-box-row mb-4">
                                    <div class="casino-nation-name">
                                        <b>Dragon</b>
                                        <!-- <div class="float-right">
                                            <i class="fas fa-info-circle" data-toggle="collapse" data-target="#demo2"></i>
                                            <div id="demo2" class="collapse icon-range">
                                                <span class="float-right casino-min-max">R:<span
                                                    v-kval="{size: main[12].min}"></span>-<span
                                                    v-kval="{size: main[12].max}"></span></span>
                                            </div>
                                        </div> -->
                                    </div>

                                    <template v-for="(i, key) in 6">
                                        <div class="casino-bl-box" :key="`dragon-${key}`">
                                            <div class="back casino-bl-box-item" :class="{'suspended': main[i+11].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ main[i+11].b }}</span>
                                                <span class="casino-book" v-casinofancybook="{sid: main[i+11].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                    </template>

                                </div>
                            </div>
                        </div>
                        </template>
                        
                        <template v-if="!$store.getters.isTablet">
                            <div class="teen1daycasino-container d-none-big">
                                <div class="casino-box-row teen1dayodev">
                                    <div class="casino-bl-box casino-bl-box-title">
                                        <div class="casino-bl-box-item casino-card-img">
                                            <!-- <div class="float-right">
                                                <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                    data-target="#demo"></i>
                                                <div id="demo" class="collapse icon-range">
                                                    <span class="float-right casino-min-max">R:<span
                                                            v-kval="{size: main[0].min}"></span>-<span
                                                            v-kval="{size: main[0].max}"></span></span>
                                                </div>
                                            </div> -->
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <b>Tiger</b>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <b>Lion</b>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <b>Dragon</b>
                                        </div>
                                    </div>
                                    <template v-for="(i, key) in 6">
                                        <div class="casino-bl-box" :key="key">
                                            <div class="casino-bl-box-item casino-odds-name">
                                                <span>{{ main[i-1].nat.replace('Tiger','').trim() }}</span>
                                                <div class="float-right">
                                                    <i class="fas fa-info-circle float-right" data-toggle="collapse" :data-target="`#range${key}`"></i>
                                                    <div :id="`range${key}`" class="collapse icon-range">
                                                        R:<span v-kval="{size: main[i-1].min}"></span>-<span v-kval="{size: main[i-1].max}"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': main[i-1].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ main[i-1].b }}</span>
                                                <span v-casinofancybook="{sid: main[i-1].sid, subid: 0}">0</span>
                                            </div>
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': main[i+5].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ main[i+5].b }}</span>
                                                <span v-casinofancybook="{sid: main[i+5].sid, subid: 0}">0</span>
                                            </div>
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': main[i+11].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ main[i+11].b }}</span>
                                                <span v-casinofancybook="{sid: main[i+11].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </template>

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
                    'subtype': 'teen9'
                })
                return this.orderBy(player, 'sr')
            }
        },
        data() {
            return {
                showCards: true,
                showResults: true,
                imgPath: IMG_PATH,
                gameTitle: 'Teenpatti Test',
                gameType: 'teen9',
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
                gameDetail: [],
                gameSoda: [],
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
                            //this.casinoData = []
                            if(this.callDataApi == true){
                                setTimeout(res => {
                                    this.getCasinoData();
                                }, 800);
                            }
                        }
                       // this.getUserBook();
                    })
                    .catch(e => {
                       // this.casinoData = []
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