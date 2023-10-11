<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table vcasino vteen20">
                    <TimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current" />
                    <div class="casino-video">
                        <div class="casino-video-title">
                            <span class="casino-name">{{ gameTitle }}</span>
                            <div class="casino-video-rid">Round ID: {{ casinoData.mid }}</div>
                        </div>
                        <div class="video-box-container">
                            <div class="video-box" v-if="tvUrl != ''">
                                
                            </div>
                        </div>
                        <template v-if="cards && cards.length">
                            <div class="vcasino-cards">
                                <div class="player-card playera-card">
                                    <img v-if="casinoData.rdesc == '1'" :src="`${imgPath}front/img/svg_casino/icons/winner-left.png`" class="v-winner">
                                    <div class="w-100 playera mb-2">Player A</div>
                                    <Card :card="cards[0]" />
                                    <Card :card="cards[2]" />
                                    <Card :card="cards[4]" />
                                </div>
                                <div class="player-card playerb-card">
                                    <img v-if="casinoData.rdesc == '2'" :src="`${imgPath}front/img/svg_casino/icons/winner-left.png`" class="v-winner">
                                    <div class="w-100 playerb mb-2">Player B</div>
                                    <Card :card="cards[5]" />
                                    <Card :card="cards[3]" />
                                    <Card :card="cards[1]" />
                                </div>
                            </div>
                        </template>
                       
                        <div class="casino-video-right-icons">
                            <div class="casino-video-home-icon" title="Home">
                                <router-link :to="{name: 'vCasinoList'}" style="color: var(--text-highlight);">
                                <i class="fas fa-home"></i>
                                </router-link>
                            </div>
                            <div class="casino-video-rules-icon"  title="Rules" @click="$refs.casinorules.show()">
                                <i class="fas fa-info-circle"></i>
                            </div>
                        </div>
                        <CasinoRules ref="casinorules" :gtype="gameType"></CasinoRules>
                    </div>
                    <div class="casino-detail" v-if="casinoData && casinoData.mid">
                        <div class="main-odds">
                            <div class="odds-title">
                                <div class="playera">Player A</div>
                                <div>&nbsp;</div>
                                <div class="playerb">Player B</div>
                            </div>
                            <div class="odds-section">
                                <div class="odds-box">
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended': player[0].gstatus != 'OPEN'}">
                                            <span class="casino-box-odd">{{ player[0].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: player[0].sid}">0</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="odds-box pt-2">
                                    <b>Main</b>
                                    <div class="d-inline-block ml-2">
                                        <i class="fas fa-info-circle" data-toggle="collapse" data-target="#range1"></i>
                                        <div id="range1" class="collapse icon-range">
                                            R:<span v-kval="{size: player[0].min}"></span>-<span v-kval="{size: player[0].max}"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="odds-box">
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended': player[1].gstatus != 'OPEN'}">
                                            <span class="casino-box-odd">{{ player[1].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: player[1].sid}">0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="odds-section">
                                <div class="odds-box">
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended': khal[0].gstatus != 'OPEN'}">
                                            <span class="casino-box-odd">{{ khal[0].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: khal[0].sid}">0</span>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="odds-box pt-2">
                                    <b>3 Baccarat</b>
                                    <div class="d-inline-block ml-2">
                                        <i class="fas fa-info-circle" data-toggle="collapse" data-target="#range2"></i>
                                        <div id="range2" class="collapse icon-range">
                                            R:<span v-kval="{size: khal[0].min}"></span>-<span v-kval="{size: khal[0].max}"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="odds-box">
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended': khal[1].gstatus != 'OPEN'}">
                                            <span class="casino-box-odd">{{ khal[1].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: khal[1].sid}">0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="odds-section">
                                <div class="odds-box">
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended': total[0].gstatus != 'OPEN'}">
                                            <span class="casino-box-odd">{{ total[0].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: total[0].sid}">0</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="odds-box pt-2">
                                    <b>Total</b>
                                    <div class="d-inline-block ml-2">
                                        <i class="fas fa-info-circle" data-toggle="collapse" data-target="#range3"></i>
                                        <div id="range3" class="collapse icon-range">
                                            R:<span v-kval="{size: total[0].min}"></span>-<span v-kval="{size: total[0].max}"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="odds-box">
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended': total[1].gstatus != 'OPEN'}">
                                            <span class="casino-box-odd">{{ total[1].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: total[1].sid}">0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="odds-section">
                                <div class="odds-box">
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended': pair[0].gstatus != 'OPEN'}">
                                            <span class="casino-box-odd">A</span>
                                            <span class="casino-book" v-casinofancybook="{sid: pair[0].sid}">0</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="odds-box pt-2">
                                    <b>Pair Plus</b>
                                    <div class="d-inline-block ml-2">
                                        <i class="fas fa-info-circle" data-toggle="collapse" data-target="#range4"></i>
                                        <div id="range4" class="collapse icon-range">
                                            R:<span v-kval="{size: pair[0].min}"></span>-<span v-kval="{size: pair[0].max}"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="odds-box">
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended': pair[1].gstatus != 'OPEN'}">
                                            <span class="casino-box-odd">B</span>
                                            <span class="casino-book" v-casinofancybook="{sid: pair[1].sid}">0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="odds-section">
                                <div class="odds-box">
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended': redBlack[0].gstatus != 'OPEN'}">
                                            <span class="casino-box-odd">{{redBlack[0].b}}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: redBlack[0].sid}">0</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="odds-box pt-2">
                                    <img :src="`${imgPath}front/img/cards/spade.png`">
                                    <img :src="`${imgPath}front/img/cards/club.png`">
                                    <div class="d-inline-block ml-2">
                                        <i class="fas fa-info-circle" data-toggle="collapse" data-target="#range5"></i>
                                        <div id="range5" class="collapse icon-range">
                                            R:<span v-kval="{size: redBlack[0].min}"></span>-<span v-kval="{size: redBlack[0].max}"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="odds-box">
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended': redBlack[2].gstatus != 'OPEN'}">
                                            <span class="casino-box-odd">{{redBlack[2].b}}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: redBlack[2].sid}">0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="odds-section">
                                <div class="odds-box">
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended': redBlack[1].gstatus != 'OPEN'}">
                                            <span class="casino-box-odd">{{redBlack[1].b}}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: redBlack[1].sid}">0</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="odds-box pt-2">
                                    <img :src="`${imgPath}front/img/cards/heart.png`">
                                    <img :src="`${imgPath}front/img/cards/diamond.png`" class="diamond-icon">
                                    <div class="d-inline-block ml-2">
                                        <i class="fas fa-info-circle" data-toggle="collapse" data-target="#range6"></i>
                                        <div id="range6" class="collapse icon-range">
                                            R:<span v-kval="{size: redBlack[1].min}"></span>-<span v-kval="{size: redBlack[1].max}"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="odds-box">
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended': redBlack[3].gstatus != 'OPEN'}">
                                            <span class="casino-box-odd">{{redBlack[3].b}}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: redBlack[3].sid}">0</span>
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
                        <LastResultsSection :gtype="gameType" :lastResults="lastResults" :showResults="showResults" />
                        
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
    import TimerProgress from "@/components/casino/TimerProgress"
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
            TimerProgress,
            RightSideBar,
            Card,
            CasinoRules,
            LastResultsSection
        },
        computed: {
            player() {
                var player = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'vplayer'
                })
                return this.orderBy(player, 'sr')
            },
            pair() {
                var pair = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'vpair'
                })
                return this.orderBy(pair, 'sr')
            },
            khal() {
                var khal = _.filter(_.get(this.casinoData, 'sub'), (o) => {
                    return (o.subtype == 'vkhal')
                })
                return this.orderBy(khal, 'sr')
            },
            redBlack() {
                var redBlack = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'vredblack'
                })
                return this.orderBy(redBlack, 'sr')
            },
            total() {
                var total = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'vtotal'
                })
                return this.orderBy(total, 'sr')
            }
        },
        data() {
            return {
                showCards: true,
                showResults: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'vteen20',
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
                ServiceApi.callApi("vcasino/data", {
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
                ServiceApi.callApi("vcasino/book", {
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
                ServiceApi.callApi("vcasino/lastresults", {
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