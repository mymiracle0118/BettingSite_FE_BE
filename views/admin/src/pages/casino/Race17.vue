<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table raceto17">
                    <div class="casino-video">
                        <div class="casino-video-title">
                            <span class="casino-name">{{ gameTitle }}</span>
                            <div class="casino-video-rid">Round ID: {{ casinoData.mid }}</div>
                        </div>
                        <div class="video-box-container">
                            <div class="video-box" >
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
                                <div class="race-total">Total: {{ totalPoints }}</div>
                                <template v-for="(card, key) in cards">
                                    <div :key="key">
                                        <Card :card="card" />
                                    </div>
                                </template>
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
                                <div class="col-3">
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>{{ player[0].nat }}</b>
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
                                        <div class="casino-nation-name" v-casinofancybook="{sid: player[0].sid, subid: 0}">0</div>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>{{ bigCard[0].nat }}</b>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': bigCard[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ bigCard[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item" :class="{'suspended': bigCard[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ bigCard[0].l }}</span>
                                            </div>
                                        </div>
                                        <div class="casino-nation-name" v-casinofancybook="{sid: bigCard[0].sid, subid: 0}">0</div>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>{{ zeroCard[0].nat }}</b>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': zeroCard[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ zeroCard[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item" :class="{'suspended': zeroCard[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ zeroCard[0].l }}</span>
                                            </div>
                                        </div>
                                        <div class="casino-nation-name" v-casinofancybook="{sid: zeroCard[0].sid, subid: 0}">0</div>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>{{ anyZero[0].nat }}</b>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': anyZero[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ anyZero[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item" :class="{'suspended': anyZero[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ anyZero[0].l }}</span>
                                            </div>
                                        </div>
                                        <div class="casino-nation-name" v-casinofancybook="{sid: anyZero[0].sid, subid: 0}">0</div>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template v-if="!$store.getters.isTablet">
                            <div class="row row5 d-none-big">
                                <div class="casino-bl-box ">
                                    <div class="casino-bl-box-item casino-odds-name">
                                        <b>Main Bet</b>
                                        <span class="float-right text-success" v-casinofancybook="{sid: player[0].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': player[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ player[0].b }}</span>
                                    </div>
                                    <div class="lay casino-bl-box-item" :class="{'suspended': player[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ player[0].l }}</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box ">
                                    <div class="casino-bl-box-item casino-odds-name">
                                        <b>Big Card</b>
                                        <span class="float-right text-success" v-casinofancybook="{sid: bigCard[0].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': bigCard[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ bigCard[0].b }}</span>
                                    </div>
                                    <div class="lay casino-bl-box-item" :class="{'suspended': bigCard[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ bigCard[0].l }}</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box ">
                                    <div class="casino-bl-box-item casino-odds-name">
                                        <b>Zero Card</b>
                                        <span class="float-right text-success" v-casinofancybook="{sid: zeroCard[0].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': zeroCard[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ zeroCard[0].b }}</span>
                                    </div>
                                    <div class="lay casino-bl-box-item" :class="{'suspended': zeroCard[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ zeroCard[0].l }}</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box ">
                                    <div class="casino-bl-box-item casino-odds-name">
                                        <b>Any Zero Card</b>
                                        <span class="float-right text-success" v-casinofancybook="{sid: anyZero[0].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': anyZero[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ anyZero[0].b }}</span>
                                    </div>
                                    <div class="lay casino-bl-box-item" :class="{'suspended': anyZero[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ anyZero[0].l }}</span>
                                    </div>
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
        
        <b-modal ref="runAmount" title="Run Amount" hide-footer @hide="bookData = []">
            <div class="table-responsive run-amount-container" v-if="bookData && bookData.length">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Run</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(data, key) in bookData">
                            <tr :key="key">
                                <td>{{ data.run }}</td>
                                <td>{{ data.amt }}</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </b-modal>
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
                    'subtype': 'race17'
                })
                return this.orderBy(player, 'sr')
            },
            bigCard() {
                var bigcard = _.filter(_.get(this.casinoData, "sub"), (o) => {
                    return o.subtype == "bigcard" && o.visible == 1;
                });
                return this.orderBy(bigcard, 'sr')
            },
            zeroCard() {
                var zerocard = _.filter(_.get(this.casinoData, "sub"), (o) => {
                    return o.subtype == "zerocard" && o.visible == 1;
                });
                return this.orderBy(zerocard, 'sr')
            },
            anyZero() {
                var anyzero = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'anyzero'
                })
                return this.orderBy(anyzero, 'sr')
            }
        },
        data() {
            return {
                bookData: [],
                showCards: true,
                showResults: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'race17',
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
                userExp: 0,
                totalPoints: 0,
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
                            let totalPoints = 0;
                            for (const card of this.cards) {
                                let cardno = "0";
                                if (card != 1) {
                                    if (card.length == 4) {
                                        cardno = card.slice(0, 2);
                                    } else {
                                        cardno = card.slice(0, 1);
                                    }
                                }

                                if (cardno == "10") {
                                    cardno = 0;
                                }
                                if (cardno == "J") {
                                    cardno = 0;
                                }
                                if (cardno == "Q") {
                                    cardno = 0;
                                }
                                if (cardno == "K") {
                                    cardno = 0;
                                }
                                if (cardno == "A") {
                                    cardno = 1;
                                }
                                totalPoints += parseInt(cardno);
                            }
                            this.totalPoints = totalPoints;
                            
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
            getBookData(mid, sid) {
                ServiceApi.callApi("casino/fancybookpopup", {
                        mid: mid,
                        sid: sid
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.bookData = response.data
                            this.$refs['runAmount'].show()
                        } else {
                            this.bookData = []
                        }
                    })
                    .catch(e => {
                        this.bookData = []
                    });
            },
            
           
        },
        beforeDestroy() {
            this.callBookApi = false
            this.callDataApi = false
            
        }
    }
</script>
           
        },
        beforeDestroy() {
            this.callBookApi = false
            this.callDataApi = false
            
        }
    }
</script>