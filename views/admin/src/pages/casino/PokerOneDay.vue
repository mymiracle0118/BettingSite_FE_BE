<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table poker1day">
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

                                    <div class="playerboardcards">
                                        <div class="dealer-name w-100 mb-1">Board</div>
                                        <div class="d-flex">
                                            <Card :card="cards[4]" />
                                            <Card :card="cards[5]" />
                                            <Card :card="cards[6]" />
                                            <Card :card="cards[7]" />
                                            <Card :card="cards[8]" />
                                        </div>
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
                        <div class="playerabox">
                            <div class="casino-box-row playerafabcy">
                                <div class="casino-nation-name">
                                    <div class="float-left mr-2">
                                        <i class="fas fa-info-circle" data-toggle="collapse" data-target="#demo1"></i>
                                        <div id="demo1" class="collapse icon-range">
                                            R:<span v-kval="{size: player[0].min}"></span>-<span
                                                v-kval="{size: player[0].max}"></span>
                                        </div>
                                    </div>
                                    <b>Player A</b>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item" :class="{'suspended': player[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ player[0].b }}</span>
                                    </div>
                                    <div class="lay casino-bl-box-item" :class="{'suspended': player[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ player[0].l }}</span>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="casino-nation-name text-center w-100">
                                <span class="casino-book" v-casinobook="{sid: player[0].sid}">0</span>
                            </div>
                            <div class="casino-box poker1dayother mt-2">
                                <div class="casino-bl-box">
                                    <div class="odds-min-max">
                                        <span class="float-right casino-min-max pr-2">
                                            <i class="fas fa-info-circle" data-toggle="collapse" data-target="#demo2"></i>
                                            <div id="demo2" class="collapse icon-range">
                                                R:<span v-kval="{size: cardBonus[0].min}"></span>-<span
                                                    v-kval="{size: cardBonus[0].max}"></span>
                                            </div>
                                        </span>
                                    </div>
                                    <div class="odds-min-max pl-2">
                                        <span class="float-right casino-min-max">
                                            <i class="fas fa-info-circle" data-toggle="collapse" data-target="#demo3"></i>
                                            <div id="demo3" class="collapse icon-range">
                                                R:<span v-kval="{size: cardBonus[1].min}"></span>-<span
                                                    v-kval="{size: cardBonus[1].max}"></span>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item back" :class="{'suspended': cardBonus[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">2 Cards Bonus</span>
                                        
                                    </div>
                                    <div class="casino-bl-box-item back" :class="{'suspended': cardBonus[1].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">7 Cards Bonus</span>
                                        
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="odds-min-max">
                                        <span class="casino-book" v-casinofancybook="{sid: cardBonus[0].sid, subid: 0}">0</span>
                                       
                                    </div>
                                    <div class="odds-min-max">
                                        <span class="casino-book" v-casinofancybook="{sid: cardBonus[1].sid, subid: 0}">0</span>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="playerabcardbox">
                            <div class="poker-icon">
                                <img :src="`${imgPath}front/img/poker.png`">
                            </div>
                            <div class="row row5 w-100">
                                <div class="col-12 col-md-6">
                                    <div class="dealer-name playera">Player A</div>
                                    <div class="mt-1">
                                        <Card :card="cards[0]" />
                                        <Card :card="cards[1]" />
                                    </div>
                                </div>
                                <div class="col-12 col-md-6 text-right">
                                    <div class="dealer-name playerb">Player B</div>
                                    <div class="mt-1">
                                        <Card :card="cards[2]" />
                                        <Card :card="cards[3]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="playerbbox">
                            <div class="casino-box-row playerbfabcy">
                                <div class="casino-nation-name">
                                    <div class="float-left mr-2">
                                        <i class="fas fa-info-circle" data-toggle="collapse" data-target="#demo4"></i>
                                        <div id="demo4" class="collapse icon-range">
                                            R:<span v-kval="{size: player[1].min}"></span>-<span
                                                v-kval="{size: player[1].max}"></span>
                                        </div>
                                    </div>
                                    <b>Player B</b>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item" :class="{'suspended': player[1].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ player[1].b }}</span>
                                    </div>
                                    <div class="lay casino-bl-box-item" :class="{'suspended': player[1].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ player[1].l }}</span>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="casino-nation-name text-center w-100">
                                <span class="casino-book" v-casinobook="{sid: player[1].sid}">0</span>
                            </div>
                            <div class="casino-box poker1dayother mt-2">
                                <div class="casino-bl-box">
                                    <div class="odds-min-max">
                                        <span class="float-right casino-min-max pr-2">
                                            <i class="fas fa-info-circle" data-toggle="collapse" data-target="#demo5"></i>
                                            <div id="demo5" class="collapse icon-range">
                                                R:<span v-kval="{size: cardBonus[2].min}"></span>-<span
                                                    v-kval="{size: cardBonus[2].max}"></span>
                                            </div>
                                        </span>
                                    </div>
                                    <div class="odds-min-max pl-2">
                                        <span class="float-right casino-min-max">
                                            <i class="fas fa-info-circle" data-toggle="collapse" data-target="#demo6"></i>
                                            <div id="demo6" class="collapse icon-range">
                                                R:<span v-kval="{size: cardBonus[3].min}"></span>-<span
                                                    v-kval="{size: cardBonus[3].max}"></span>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item back" :class="{'suspended': cardBonus[2].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">2 Cards Bonus</span>
                                        
                                    </div>
                                    <div class="casino-bl-box-item back" :class="{'suspended': cardBonus[3].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">7 Cards Bonus</span>
                                        
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="odds-min-max">
                                        <span class="casino-book" v-casinofancybook="{sid: cardBonus[2].sid, subid: 0}">0</span>
                                        
                                    </div>
                                    <div class="odds-min-max">
                                        <span class="casino-book" v-casinofancybook="{sid: cardBonus[3].sid, subid: 0}">0</span>
                                        
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
         
            <RightSideBar :mid="mId" :gtype="gameType"></RightSideBar>
            
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
            player() {
                var player = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'poker'
                })
                return this.orderBy(player, 'sr')
            },
            cardBonus() {
                var cardBonus = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'pokerfancy'
                })
                return this.orderBy(cardBonus, 'sr')
            }
        },
        data() {
            return {
                showCards: true,
                showResults: true,
                imgPath: IMG_PATH,
                gameTitle: 'Poker 1-day',
                gameType: 'poker',
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