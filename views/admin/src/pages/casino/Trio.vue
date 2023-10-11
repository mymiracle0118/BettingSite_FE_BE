<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table pasa">
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
                                    <Card :card="cards[1]" />
                                    <Card :card="cards[2]" />
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
                        <div class="casino-detail">
                            <div class="row row5">
                                <div class="col-12 col-md-6">
                                    <div class="casino-box-row d-none-small" style="height: 30px;"></div>
                                    <div class="casino-box-row pasa-sesssion">
                                        <div class="casino-nation-name">
                                            <b @click="getBookData(mId, trio[0].sid)" class="pointer">{{ trio[0].nat }}</b>
                                            <div class="float-right">
                                                <span class="mr-2" v-casinofancybook="{sid: trio[0].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="lay casino-bl-box-item"
                                                :class="{'suspended': trio[0].gstatus != 'OPEN'}"
                                                >
                                                <span>{{ trio[0].l }}</span>
                                                <span class="casino-box-odd">{{ trio[0].lbhav }}</span>
                                            </div>
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': trio[0].gstatus != 'OPEN'}"
                                                >
                                                <span>{{ trio[0].b }}</span>
                                                <span class="casino-box-odd">{{ trio[0].bbhav }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row d-none-small" style="height: 30px;"></div>
                                </div>
                                <div class="col-6 col-md-3 pasa-fancy">
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>{{ section124[0].nat }}</b>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': section124[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ section124[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item"
                                                :class="{'suspended': section124[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ section124[0].l }}</span>
                                            </div>
                                        </div>
                                        <div class="casino-nation-name" v-casinofancybook="{sid: section124[0].sid, subid: 0}">
                                            0
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-3 pasa-fancy">
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>{{ jqk1[0].nat }}</b>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': jqk1[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ jqk1[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item"
                                                :class="{'suspended': jqk1[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ jqk1[0].l }}</span>
                                            </div>
                                        </div>
                                        <div class="casino-nation-name" v-casinofancybook="{sid: jqk1[0].sid, subid: 0}">
                                            0
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row row5 mt-2 pasa-cards">
                                <div class="col-6 col-md-3">
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>{{ red2[0].nat }}</b>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': red2[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ red2[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item"
                                                :class="{'suspended': red2[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ red2[0].l }}</span>
                                            </div>
                                        </div>
                                        <div class="casino-nation-name" v-casinofancybook="{sid: red2[0].sid, subid: 0}">
                                            0
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-3">
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>{{ black2[0].nat }}</b>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': black2[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ black2[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item"
                                                :class="{'suspended': black2[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ black2[0].l }}</span>
                                            </div>
                                        </div>
                                        <div class="casino-nation-name" v-casinofancybook="{sid: black2[0].sid, subid: 0}">
                                            0
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-3">
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>{{ odd2[0].nat }}</b>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': odd2[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ odd2[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item"
                                                :class="{'suspended': odd2[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ odd2[0].l }}</span>
                                            </div>
                                        </div>
                                        <div class="casino-nation-name" v-casinofancybook="{sid: odd2[0].sid, subid: 0}">
                                            0
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-3">
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>{{ even2[0].nat }}</b>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': even2[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ even2[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item"
                                                :class="{'suspended': even2[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ even2[0].l }}</span>
                                            </div>
                                        </div>
                                        <div class="casino-nation-name" v-casinofancybook="{sid: even2[0].sid, subid: 0}">
                                            0
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="casino-box-row pasa-other-bets">
                                <div class="casino-box-row pasa-other-bet">
                                    <div class="casino-nation-name">
                                        <b>{{ pair2[0].nat }}</b>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended': pair2[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ pair2[0].b }}</span>
                                        </div>
                                    </div>
                                    <div class="casino-nation-name" v-casinofancybook="{sid: pair2[0].sid, subid: 0}">
                                        0
                                    </div>
                                </div>
                                <div class="casino-box-row pasa-other-bet">
                                    <div class="casino-nation-name">
                                        <b>{{ flush[0].nat }}</b>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended': flush[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ flush[0].b }}</span>
                                        </div>
                                    </div>
                                    <div class="casino-nation-name" v-casinofancybook="{sid: flush[0].sid, subid: 0}">
                                        0
                                    </div>
                                </div>
                                <div class="casino-box-row pasa-other-bet">
                                    <div class="casino-nation-name">
                                        <b>{{ straight[0].nat }}</b>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': straight[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ straight[0].b }}</span>
                                        </div>
                                    </div>
                                    <div class="casino-nation-name" v-casinofancybook="{sid: straight[0].sid, subid: 0}">
                                        0
                                    </div>
                                </div>
                                <div class="casino-box-row pasa-other-bet">
                                    <div class="casino-nation-name">
                                        <b>{{ trio1[0].nat }}</b>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended': trio1[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ trio1[0].b }}</span>
                                        </div>
                                    </div>
                                    <div class="casino-nation-name" v-casinofancybook="{sid: trio1[0].sid, subid: 0}">
                                        0
                                    </div>
                                </div>
                                <div class="casino-box-row pasa-other-bet">
                                    <div class="casino-nation-name">
                                        <b>{{ straightflush[0].nat }}</b>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': straightflush[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ straightflush[0].b }}</span>
                                        </div>
                                    </div>
                                    <div class="casino-nation-name" v-casinofancybook="{sid: straightflush[0].sid, subid: 0}">
                                        0
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
            trio() {
                var trio = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'trio'
                })
                return this.orderBy(trio, 'sr')
            },
            section124() {
                var section124 = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': '124'
                })
                return this.orderBy(section124, 'sr')
            },
            jqk1() {
                var jqk1 = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'jqk1'
                })
                return this.orderBy(jqk1, 'sr')
            },
            red2() {
                var red2 = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'red2'
                })
                return this.orderBy(red2, 'sr')
            },
            black2() {
                var black2 = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'black2'
                })
                return this.orderBy(black2, 'sr')
            },
            odd2() {
                var odd2 = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'odd2'
                })
                return this.orderBy(odd2, 'sr')
            },
            even2() {
                var even2 = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'even2'
                })
                return this.orderBy(even2, 'sr')
            },
            pair2() {
                var pair2 = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'pair2'
                })
                return this.orderBy(pair2, 'sr')
            },
            flush() {
                var flush = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'flush'
                })
                return this.orderBy(flush, 'sr')
            },
            straight() {
                var straight = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'straight'
                })
                return this.orderBy(straight, 'sr')
            },
            trio1() {
                var trio1 = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'trio1'
                })
                return this.orderBy(trio1, 'sr')
            },
            straightflush() {
                var straightflush = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'straightflush'
                })
                return this.orderBy(straightflush, 'sr')
            },
        },
        data() {
            return {
                bookData: [],
                showCards: true,
                showResults: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'trio',
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
                userExp: 0,
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