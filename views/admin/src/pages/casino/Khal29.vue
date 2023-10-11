<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table sin-khal">
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
                                    <Card :card="cards[4]" />
                                </div>
                                <div>
                                    <Card :card="cards[1]" />
                                    <Card :card="cards[3]" />
                                    <Card :card="cards[5]" />
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
                            <!-- d-none-small -->
                        </template>

                        <template v-if="!$store.getters.isTablet">
                            <!-- d-none-big -->
                        </template>

                        <div class="teen20casino-container">
                            <div class="teen20left">
                                <div class="casino-box-row">
                                    <div class="casino-nation-name no-border casino-bl-box-title">
                                        <div class="playera">Player A</div>
                                    </div>
                                </div>
                                <div class="casino-bl-box casino-bl-box-title d-none-small">
                                    <div class="casino-bl-box-item">
                                        <span>Winner</span>
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>High Card</span>
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>Pair</span>
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>Color Plus</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item d-none-big">
                                        <span>Winner</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': player[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd ">{{ player[0].b }}</span>
                                        <span v-casinofancybook="{sid: player[0].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="casino-bl-box-item d-none-big">
                                        <span>High Card</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': highCard[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd ">{{ highCard[0].b }}</span>
                                        <span v-casinofancybook="{sid: highCard[0].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="casino-bl-box-item d-none-big">
                                        <span>Pair</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': pair[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd ">{{ pair[0].b }}</span>
                                        <span v-casinofancybook="{sid: pair[0].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="casino-bl-box-item d-none-big">
                                        <span>Color Plus</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': colorPlus[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd ">{{ colorPlus[0].b }}</span>
                                        <span v-casinofancybook="{sid: colorPlus[0].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                            </div>
                            <div class="teen20center"></div>
                            <div class="teen20right">
                                <div class="casino-box-row">
                                    <div class="casino-nation-name no-border casino-bl-box-title">
                                        <div class="playerb">Player B</div>
                                    </div>
                                </div>
                                <div class="casino-bl-box casino-bl-box-title d-none-small">
                                    <div class="casino-bl-box-item">
                                        <span>Winner</span>
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>High Card</span>
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>Pair</span>
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>Color Plus</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item d-none-big">
                                        <span>Winner</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': player[1].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd ">{{ player[1].b }}</span>
                                        <span v-casinofancybook="{sid: player[1].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="casino-bl-box-item d-none-big">
                                        <span>High Card</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': highCard[1].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd ">{{ highCard[1].b }}</span>
                                        <span v-casinofancybook="{sid: highCard[1].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="casino-bl-box-item d-none-big">
                                        <span>Pair</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': pair[1].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd ">{{ pair[1].b }}</span>
                                        <span v-casinofancybook="{sid: pair[1].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="casino-bl-box-item d-none-big">
                                        <span>Color Plus</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': colorPlus[1].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd ">{{ colorPlus[1].b }}</span>
                                        <span v-casinofancybook="{sid: colorPlus[1].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="sin-khal-box">
                            <img :src="`${imgPath}front/img/lucky9.png`">
                            <div class="casino-bl-box">
                                <div class="back casino-bl-box-item" :class="{'suspended': lucky9[0].gstatus != 'OPEN'}"
                                    >
                                    <span class="casino-box-odd ">{{ lucky9[0].b }}</span>
                                </div>
                                <div class="lay casino-bl-box-item" :class="{'suspended': lucky9[0].gstatus != 'OPEN'}"
                                    >
                                    <span class="casino-box-odd ">{{ lucky9[0].l }}</span>
                                </div>
                                <div class="sin-khal-box-book" v-casinofancybook="{sid: lucky9[0].sid, subid: 0}">0</div>
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
            player() {
                var player = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'teensin'
                })
                return this.orderBy(player, 'sr')
            },
            pair() {
                var pair = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'pair'
                })
                return this.orderBy(pair, 'sr')
            },
            highCard() {
                var highCard = _.filter(_.get(this.casinoData, 'sub'), (o) => {
                    return (o.subtype == 'highcard')
                })
                return this.orderBy(highCard, 'sr')
            },
            colorPlus() {
                var colorPlus = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'colorplus'
                })
                return this.orderBy(colorPlus, 'sr')
            },
            lucky9() {
                var lucky9 = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'lucky9'
                })
                return this.orderBy(lucky9, 'sr')
            }
        },
        data() {
            return {
                bookData: [],
                showCards: true,
                showResults: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'teensin',
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