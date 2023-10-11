<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table teenpatti2cards">
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
                                <div>
                                    <Card :card="cards[0]" />
                                    <Card :card="cards[2]" />
                                </div>
                                <div>
                                    <Card :card="cards[1]" />
                                    <Card :card="cards[3]" />
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
                            <div class="d-none-small">
                                <div class="teen1daycasino-container">
                                    <div class="teen1dayleft">
                                        <div class="casino-box-row">
                                            <div class="casino-nation-name">
                                                <b>Player A</b>
                                                <div class="float-right">
                                                    <span class="mr-2" v-casinobook="{sid: main[0].sid}">0</span>
                                                </div>
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
                                        </div>
                                        <div class="casino-box-row">
                                            <div class="casino-nation-name">
                                                <b>Mini Baccarat A</b>
                                                <div class="float-right">
                                                    <span class="mr-2" v-casinofancybook="{sid: baccarat[0].sid}">0</span>
                                                </div>
                                            </div>
                                            <div class="casino-bl-box casino-bl-boxfull">
                                                <div class="back casino-bl-box-item" :class="{'suspended': baccarat[0].gstatus != 'OPEN'}"
                                                    >
                                                    <span class="casino-box-odd">{{ baccarat[0].b }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-box-row">
                                            <div class="casino-nation-name">
                                                <b @click="getBookData(mId, total[0].sid)" class="pointer">Total A</b>
                                                <div class="float-right">
                                                    <span class="mr-2" v-casinofancybook="{sid: total[0].sid, subid: 0}">0</span>
                                                </div>
                                            </div>
                                            <div class="casino-bl-box total-odds">
                                                <div class="lay casino-bl-box-item" :class="{'suspended': total[0].gstatus != 'OPEN'}"
                                                    >
                                                    <span>{{ total[0].lbhav }}</span>
                                                    <span class="casino-box-odd">{{ total[0].l }}</span>
                                                </div>
                                                <div class="back casino-bl-box-item" :class="{'suspended': total[0].gstatus != 'OPEN'}"
                                                    >
                                                    <span>{{ total[0].bbhav }}</span>
                                                    <span class="casino-box-odd">{{ total[0].b }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="teen1daycenter"></div>
                                    <div class="teen1dayright">
                                        <div class="casino-box-row">
                                            <div class="casino-nation-name">
                                                <b>Player B</b>
                                                <div class="float-right">
                                                    <span class="mr-2" v-casinobook="{sid: main[1].sid}">0</span>
                                                </div>
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
                                        </div>
                                        <div class="casino-box-row">
                                            <div class="casino-nation-name">
                                                <b>Mini Baccarat B</b>
                                                <div class="float-right">
                                                    <span class="mr-2" v-casinofancybook="{sid: baccarat[1].sid}">0</span>
                                                </div>
                                            </div>
                                            <div class="casino-bl-box casino-bl-boxfull">
                                                <div class="back casino-bl-box-item" :class="{'suspended': baccarat[1].gstatus != 'OPEN'}"
                                                    >
                                                    <span class="casino-box-odd">{{ baccarat[1].b }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-box-row">
                                            <div class="casino-nation-name">
                                                <b @click="getBookData(mId, total[1].sid)" class="pointer">Total B</b>
                                                <div class="float-right">
                                                     <span class="mr-2" v-casinofancybook="{sid: total[1].sid, subid: 0}">0</span>
                                                </div>
                                            </div>
                                            <div class="casino-bl-box total-odds">
                                                <div class="lay casino-bl-box-item" :class="{'suspended': total[0].gstatus != 'OPEN'}"
                                                    >
                                                    <span>{{ total[0].lbhav }}</span>
                                                    <span class="casino-box-odd">{{ total[0].l }}</span>
                                                </div>
                                                <div class="back casino-bl-box-item" :class="{'suspended': total[0].gstatus != 'OPEN'}"
                                                    >
                                                    <span>{{ total[0].bbhav }}</span>
                                                    <span class="casino-box-odd">{{ total[0].b }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="teenpatti2cardsextra mt-3">
                                    <div class="casino-bl-box casino-bl-boxfull">
                                        <div class="back casino-bl-box-item" :class="{'suspended': plus[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">Color Plus</span>
                                        </div>
                                    </div>
                                    <div class="teenpatti2cardsextra-book">
                                        <span v-casinofancybook="{sid: plus[0].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template v-if="!$store.getters.isTablet">
                            <div class="d-none-big">
                                <div class="casino-box-row">
                                    <div class="casino-nation-name">
                                        <b>Player A</b>
                                        <div class="float-right">
                                            <span class="mr-2" v-casinobook="{sid: main[0].sid}">0</span>
                                        </div>
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
                                </div>
                                <div class="casino-box-row">
                                    <div class="casino-nation-name">
                                        <b>Player B</b>
                                        <div class="float-right">
                                            <span class="mr-2" v-casinobook="{sid: main[1].sid}">0</span>
                                        </div>
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
                                </div>
                                <div class="casino-box-row">
                                    <div class="casino-nation-name">
                                        <b>Mini Baccarat A</b>
                                        <div class="float-right">
                                            <span class="mr-2" v-casinofancybook="{sid: baccarat[0].sid}">0</span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box casino-bl-boxfull">
                                        <div class="back casino-bl-box-item"  :class="{'suspended': baccarat[0].gstatus != 'OPEN'}"
                                           >
                                            <span class="casino-box-odd">{{ baccarat[0].b }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="casino-box-row">
                                    <div class="casino-nation-name">
                                        <b>Mini Baccarat B</b>
                                        <div class="float-right">
                                            <span class="mr-2" v-casinofancybook="{sid: baccarat[1].sid}">0</span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box casino-bl-boxfull">
                                        <div class="back casino-bl-box-item" :class="{'suspended': baccarat[1].gstatus != 'OPEN'}"
                                           >
                                            <span class="casino-box-odd">{{ baccarat[1].b }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="casino-box-row">
                                    <div class="casino-nation-name">
                                        <b @click="getBookData(mId, total[0].sid)" class="pointer">Total A</b>
                                        <div class="float-right">
                                            <span class="mr-2" v-casinofancybook="{sid: total[0].sid, subid: 0}">0</span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box total-odds">
                                        <div class="lay casino-bl-box-item" :class="{'suspended': total[0].gstatus != 'OPEN'}"
                                            >
                                            <span>{{ total[0].lbhav }}</span>
                                            <span class="casino-box-odd">{{ total[0].l }}</span>
                                        </div>
                                        <div class="back casino-bl-box-item" :class="{'suspended': total[0].gstatus != 'OPEN'}"
                                            >
                                            <span>{{ total[0].bbhav }}</span>
                                            <span class="casino-box-odd">{{ total[0].b }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="casino-box-row">
                                    <div class="casino-nation-name">
                                        <b @click="getBookData(mId, total[1].sid)" class="pointer">Total B</b>
                                        <div class="float-right">
                                            <span class="mr-2" v-casinofancybook="{sid: total[1].sid, subid: 0}">0</span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box total-odds">
                                        <div class="lay casino-bl-box-item" :class="{'suspended': total[0].gstatus != 'OPEN'}"
                                            >
                                            <span>{{ total[0].lbhav }}</span>
                                            <span class="casino-box-odd">{{ total[0].l }}</span>
                                        </div>
                                        <div class="back casino-bl-box-item" :class="{'suspended': total[0].gstatus != 'OPEN'}"
                                            >
                                            <span>{{ total[0].bbhav }}</span>
                                            <span class="casino-box-odd">{{ total[0].b }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="teenpatti2cardsextra mt-3">
                                    <div class="casino-bl-box casino-bl-boxfull">
                                        <div class="back casino-bl-box-item" :class="{'suspended': plus[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">Color Plus</span>
                                        </div>
                                    </div>
                                    <div class="teenpatti2cardsextra-book">
                                        <span v-casinofancybook="{sid: plus[0].sid, subid: 0}">0</span>
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
            main() {
                var main = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'patti2'
                })
                return this.orderBy(main, 'sr')
            },
            total() {
                var total = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'total'
                })
                return this.orderBy(total, 'sr')
            },
            baccarat() {
                var baccarat = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'Baccarat'
                })
                return this.orderBy(baccarat, 'sr')
            },
            plus() {
                var plus = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'plus'
                })
                return this.orderBy(plus, 'sr')
            }
        },
        data() {
            return {
                bookData: [],
                showCards: true,
                showResults: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'patti2',
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