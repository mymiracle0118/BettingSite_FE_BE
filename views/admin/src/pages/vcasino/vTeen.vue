<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table vcasino vteen1day">
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
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': main[0].gstatus != 'OPEN'}">
                                            <span class="casino-box-odd">{{ main[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item"
                                            :class="{'suspended': main[0].gstatus != 'OPEN'}">
                                            <span class="casino-box-odd">{{ main[0].l }}</span>
                                        </div>
                                    </div>
                                    <div class="w-100 odds-book text-center" v-casinobook="{sid: main[0].sid}"></div>
                                </div>
                                <div class="odds-box pt-2">
                                    <b>Main</b>
                                    <div class="d-inline-block ml-2">
                                        <i class="fas fa-info-circle collapsed" data-toggle="collapse"
                                            data-target="#range7" aria-expanded="false"></i>
                                        <div id="range7" class="icon-range collapse">
                                            R:<span v-kval="{size: main[1].min}"></span>-<span
                                                v-kval="{size: main[1].max}"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="odds-box">
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': main[1].gstatus != 'OPEN'}">
                                            <span class="casino-box-odd">{{ main[1].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item"
                                            :class="{'suspended': main[1].gstatus != 'OPEN'}">
                                            <span class="casino-box-odd">{{ main[1].l }}</span>
                                        </div>
                                    </div>
                                    <div class="w-100 odds-book text-center" v-casinobook="{sid: main[1].sid}"></div>
                                </div>
                            </div>
                            <div class="odds-section">
                                <div class="odds-box">
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': consicutive[0].gstatus != 'OPEN'}">
                                            <span class="casino-box-odd">{{ consicutive[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item"
                                            :class="{'suspended': consicutive[0].gstatus != 'OPEN'}">
                                            <span class="casino-box-odd">{{ consicutive[0].l }}</span>
                                        </div>
                                    </div>
                                    <div class="w-100 odds-book text-center" v-casinobook="{sid: consicutive[0].sid}"></div>
                                </div>
                                <div class="odds-box pt-2">
                                    <b>Consecutive</b>
                                    <div class="d-inline-block ml-2">
                                        <i class="fas fa-info-circle collapsed" data-toggle="collapse"
                                            data-target="#range12" aria-expanded="false"></i>
                                        <div id="range12" class="icon-range collapse">
                                            R:<span v-kval="{size: consicutive[1].min}"></span>-<span
                                                v-kval="{size: consicutive[1].max}"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="odds-box">
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': consicutive[1].gstatus != 'OPEN'}">
                                            <span class="casino-box-odd">{{ consicutive[1].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item"
                                            :class="{'suspended': consicutive[1].gstatus != 'OPEN'}">
                                            <span class="casino-box-odd">{{ consicutive[1].l }}</span>
                                        </div>
                                    </div>
                                    <div class="w-100 odds-book text-center" v-casinobook="{sid: consicutive[1].sid}"></div>
                                </div>
                            </div>
                        </div>
                        <div class="others-odds">
                            <div class="odds-section">
                                <div class="odds-box w-100">
                                    <div class="d-inline-block pr">
                                        <b>ODD</b>
                                        <div class="d-inline-block ml-2">
                                            <i class="fas fa-info-circle" data-toggle="collapse"
                                                data-target="#range13"></i>
                                            <div id="range13" class="collapse icon-range">
                                                R:<span v-kval="{size: oddEven[0].min}"></span>-<span
                                                    v-kval="{size: oddEven[0].max}"></span>
                                            </div>
                                        </div>    
                                    </div>
                                </div>
                                <template v-for="(data, key) in oddEven">
                                    <div class="odds-box">
                                        <div class="casino-bl-box" :key="key">
                                            <template v-for="(odds, key1) in data.odds">
                                                <template v-if="odds.nat.toLowerCase() == 'odd'">
                                                    <div class="back casino-bl-box-item" :key="key1"
                                                        :class="{'suspended': data.gstatus != 'OPEN'}">
                                                        <span class="casino-box-odd">{{ odds.b }}</span>
                                                    </div>
                                                    <div class="casino-book" v-casinofancybook="{sid: data.sid, subid: odds.sid}"></div>
                                                </template>
                                            </template>
                                        </div>
                                    </div>
                                </template>
                               
                            </div>
                            <div class="odds-section">
                                <div class="odds-box w-100">
                                    <div class="d-inline-block pr">
                                        <b>EVEN</b> 
                                        <div class="d-inline-block ml-2">
                                            <i class="fas fa-info-circle" data-toggle="collapse"
                                                data-target="#range14"></i>
                                            <div id="range14" class="collapse icon-range">
                                                R:<span v-kval="{size: oddEven[0].min}"></span>-<span
                                                    v-kval="{size: oddEven[0].max}"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="odds-box" v-for="(data, key) in oddEven">
                                    <div class="casino-bl-box" :key="key">
                                        <template v-for="(odds, key1) in data.odds">
                                            <template v-if="odds.nat.toLowerCase() == 'even'">
                                                <div class="back casino-bl-box-item" :key="key1"
                                                    :class="{'suspended': data.gstatus != 'OPEN'}">
                                                    <span class="casino-box-odd">{{ odds.b }}</span>
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: data.sid, subid: odds.sid}"></div>
                                            </template>
                                        </template>
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
            main() {
                var main = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'vteen'
                })
                return this.orderBy(main, 'sr')
            },
            oddEven() {
                var oddEven = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'voddeven'
                })
                var oddEvenSorted = this.orderBy(oddEven, 'sr')
                oddEvenSorted.forEach(data => {
                    data.odds = _.orderBy(data.odds, 'sno')
                });
                return oddEvenSorted
            },
            suit() {
                var suit = _.filter(_.get(this.casinoData, 'sub'), (o) => {
                    return (o.subtype == 'vsuita' || o.subtype == 'vsuitb')
                })
                return this.orderBy(suit, 'sr')
            },
            consicutive() {
                var consicutive = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'vcon'
                })
                return this.orderBy(consicutive, 'sr')
            }
        },
        data() {
            return {
                showCards: true,
                showResults: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'vteen',
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