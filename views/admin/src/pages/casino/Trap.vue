<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table trap">
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
                                <!-- <div class="casino-video-cards"> -->
                                <div class="casino-cards-shuffle" @click="toggleCards(cards[0])">
                                    <i class="fas fa-grip-lines-vertical"></i>
                                </div>
                                <div class="casino-video-cards-container">
                                    <div class="row row5">
                                        <div class="col-6 text-center">
                                            <span>
                                                <b>A</b>
                                                <div class="player-count">{{ count.playerA }}</div>
                                            </span>
                                        </div>
                                        <div class="col-6 text-center">
                                            <span>
                                                <b>B</b>
                                                <div class="player-count">{{ count.playerB }}</div>
                                            </span>
                                        </div>
                                    </div>
                                    <!-- <div class="row row5">
                                        <div class="col-6 text-center">
                                            <div class="owl-carousel owl-theme" id="playerA"></div>
                                        </div>
                                        <div class="col-6 text-center">
                                            <div class="owl-carousel owl-theme" id="playerB"></div>
                                        </div>
                                    </div> -->

                                    <!-- <div class="row row5">
                                        <div class="col-6 text-center">
                                            <div class="owl-carousel owl-theme" id="splidePlayerA"></div>
                                            <div class="splide">
                                                <div class="splide__track">
                                                    <ul class="splide__list">
                                                        <li class="splide__slide">Slide 01</li>
                                                        <li class="splide__slide">Slide 02</li>
                                                        <li class="splide__slide">Slide 03</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6 text-center">
                                            
                                        </div>
                                    </div> -->

                                    <template v-for="(i, key) in 7">
                                        <div class="row row5" :key="key">
                                            <div class="col-6">
                                                <Card :card="cards[(key+i)-1]" v-if="cards[(key+i)-1] != 1"/>
                                            </div>
                                            <div class="col-6">
                                                <Card :card="cards[(key+i)]" v-if="cards[(key+i)] != 1"/>
                                            </div>
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
                        <div class="teen1daycasino-container ">
                            <div class="teen1dayleft">
                                <div class="casino-box-row">
                                    <div class="casino-nation-name">
                                        <b>Player A</b>
                                        <div class="float-right">
                                            <span class="mr-2" v-casinobook="{sid: trap[0].sid}">0</span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended': trap[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ trap[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': trap[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ trap[0].l }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="teen1daycenter"></div>
                            <div class="teen1dayright">
                                <div class="casino-box-row">
                                    <!-- <div class="casino-bl-box d-none-mobile">
                                        <div class="back casino-bl-box-item" :class="{'suspended': trap[1].gstatus != 'OPEN'}"
                                            @click="setBetData(trap[1].nat, trap[1].b, mId, trap[1].sid, trap[1].subtype, 0, 'back', gameType, trap[1].gstatus, trap[1].min, trap[1].max)">
                                            <span class="casino-box-odd">{{ trap[1].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': trap[1].gstatus != 'OPEN'}"
                                            @click="setBetData(trap[1].nat, trap[1].l, mId, trap[1].sid, trap[1].subtype, 0, 'lay', gameType, trap[1].gstatus, trap[1].min, trap[1].max)">
                                            <span class="casino-box-odd">{{ trap[1].l }}</span>
                                        </div>
                                    </div> -->
                                    <div class="casino-nation-name">
                                        <b>Player B</b>
                                        <div class="float-right">
                                            <span class="mr-2" v-casinobook="{sid: trap[1].sid}">0</span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended': trap[1].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ trap[1].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': trap[1].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ trap[1].l }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="teen1daycasino-container">
                            <div class="teen1dayleft">
                                <template v-for="(data, key) in highLow">
                                    <template v-if="data.visible == 1">
                                        <div class="seven-up-down-box" :key="key">
                                            <template v-for="(odds,key) in orderBy(data.odds, 'sno', -1)">
                                                <template v-if="odds.sid ==2">
                                                    <div class="up-box" :key="`up${key}`"
                                                        :class="{'suspended': data.gstatus != 'OPEN'}"
                                                        >
                                                        <div class="up-down-book"
                                                            v-casinofancybook="{sid: data.sid, subid: odds.sid}">0</div>
                                                        <div class="text-right">
                                                            <div class="up-down-odds">{{ odds.b }}</div>
                                                            <span>LOW</span>
                                                        </div>
                                                    </div>
                                                </template>
                                                <template v-if="odds.sid ==1">
                                                    <div class="down-box" :key="`down${key}`"
                                                        :class="{'suspended': data.gstatus != 'OPEN'}"
                                                        >
                                                        <div class="text-left">
                                                            <div class="up-down-odds">{{ odds.b }}</div>
                                                            <span>HIGH</span>
                                                        </div>
                                                        <div class="up-down-book"
                                                            v-casinofancybook="{sid: data.sid, subid: odds.sid}">0</div>
                                                    </div>
                                                </template>
                                            </template>
                                            <div class="seven-box">
                                                <img :src="`${imgPath}front/img/trape-seven.png`">
                                            </div>
                                        </div>
                                    </template>
                                </template>
                            </div>
                            <div class="teen1daycenter"></div>
                            <div class="teen1dayright">
                                <template v-for="(data, key) in jqk">
                                    <template v-if="data.visible == 1">
                                        <div class="casino-box-row jqk-box" :key="key">
                                            <div class="casino-nation-name">
                                                <span>
                                                    <img :src="`${imgPath}front/img/cards/J.png`">
                                                    <img :src="`${imgPath}front/img/cards/Q.png`">
                                                    <img :src="`${imgPath}front/img/cards/K.png`">
                                                </span>
                                                <div class="float-right">
                                                    <span class="mr-2"
                                                        v-casinofancybook="{sid: data.sid, subid: data.odds[0].sid}">0</span>
                                                </div>
                                            </div>
                                            <div class="casino-bl-box">
                                                <div class="back casino-bl-box-item"
                                                    :class="{'suspended': data.gstatus != 'OPEN'}"
                                                   >
                                                    <span class="casino-box-odd">{{ data.odds[0].b }}</span>
                                                </div>
                                                <div class="lay casino-bl-box-item"
                                                    :class="{'suspended': data.gstatus != 'OPEN'}"
                                                    >
                                                    <span class="casino-box-odd">{{ data.odds[0].l }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </template>
                            </div>
                        </div>
                        <div class="teen1daycasino-container trap-number">
                            <img :src="`${imgPath}admin/img/trap-number-bg.jpg`" class="img-fluid">
                        </div>

                        <template v-if="casinoData.remark && casinoData.remark != ''">
                            <div class="casino-remark mt-1">
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
            trap() {
                var trap = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'trap'
                })
                return this.orderBy(trap, 'sr')
            },
            highLow() {
                var highlow = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'highlow'
                })
                return this.orderBy(highlow, 'sr')
            },
            jqk() {
                var jqk = _.filter(_.get(this.casinoData, 'sub'), (o) => {
                    return (o.subtype == 'jqk')
                })
                return this.orderBy(jqk, 'sr')
            }
        },
        data() {
            return {
                showCards: true,
                showResults: true,
                imgPath: IMG_PATH,
                gameTitle: 'Trap',
                gameType: 'trap',
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
                playersCards: {
                    p1: null,
                    p2: null,
                    p3: null,
                    p4: null
                },
                count: {
                    playerA: 0,
                    playerB: 0
                },
                playerALength: '',
                playerBLength: '',
                
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

                        var playerACards = []
                        var playerBCards = []
                        this.cards.forEach(function (card, index) {
                            if (index % 2 === 0) {
                                playerACards.push(card)
                            } else {
                                playerBCards.push(card)
                            }
                        });

                        // console.log(playerACards, playerBCards)

                        let playerACount = 0;
                        for (const card of playerACards) {
                            let cardno = "0";
                            if (card != 1) {
                                if (card.length == 4) {
                                    cardno = card.slice(0, 2);
                                } else {
                                    cardno = card.slice(0, 1);
                                }
                            }

                            if (cardno == "K") {
                                cardno = 13;
                            }
                            if (cardno == "Q") {
                                cardno = 12;
                            }
                            if (cardno == "J") {
                                cardno = 11;
                            }
                            if (cardno == "A") {
                                cardno = 1;
                            }
                            playerACount += parseInt(cardno);
                        }
                        this.count.playerA = playerACount;

                        let playerBCount = 0;
                        for (const card of playerBCards) {
                            let cardno = "0";
                            if (card != 1) {
                                if (card.length == 4) {
                                    cardno = card.slice(0, 2);
                                } else {
                                    cardno = card.slice(0, 1);
                                }
                            }

                            if (cardno == "K") {
                                cardno = 13;
                            }
                            if (cardno == "Q") {
                                cardno = 12;
                            }
                            if (cardno == "J") {
                                cardno = 11;
                            }
                            if (cardno == "A") {
                                cardno = 1;
                            }
                            playerBCount += parseInt(cardno);
                        }
                        this.count.playerB = playerBCount;

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