<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table cricket20">
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
                                <Card :card="cards[0]" />
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
                        <div class="teen20casino-container">
                            <div class="teen20left">
                                <template v-for="(i, key) in 5">
                                    <div class="score-box">
                                        <div class="team-score">
                                            <div>
                                                <!-- <span v-casinobook="{sid: mainData[key].sid}">0</span> -->
                                               <!--  <div class="text-center"><b>Team A</b></div> -->
                                               <!--  <div class="text-center">
                                                    <span class="ml-1">228/6</span>
                                                    <span class="ml-1">20 Over</span>
                                                </div> -->
                                            </div>
                                            <div>
                                                <!-- <div class="text-center"><b>Team B</b></div> -->
                                                <!-- <div class="text-center">
                                                    <span class="ml-1">228/6</span>
                                                    <span class="ml-1">20 Over</span>
                                                </div> -->
                                            </div>
                                        </div>
                                        <div class="ball-icon">
                                            <img :src="`${imgPath}admin/img/balls/ball${key+2}.png`">
                                        </div>
                                        <div class="blbox"  :class="{'suspended' : mainData[key].gstatus != 'OPEN'}">
                                            <div class="back">
                                                <span class="odds d-block">{{mainData[key].b}}</span>
                                            </div>
                                            <div class="lay">
                                                <span class="odds d-block">{{mainData[key].l}}</span>
                                            </div>
                                        </div>
                                        <div class="c20minmax">
                                            <i class="fas fa-info-circle float-right collapsed" data-toggle="collapse" :data-target="'#minmax'+key" aria-expanded="false"></i>
                                            <div :id="'minmax'+key" class="icon-range collapse" style="">
                                                R:<span v-kval="{size: mainData[key].min}"></span>-<span
                                                        v-kval="{size: mainData[key].max}"></span>
                                            </div>
                                        </div>
                                        <div class="c20book" v-casinobook="{sid: mainData[key].sid}"></div>
                                    </div>
                                </template>
                                
                            </div>
                            <div class="teen20right">
                                <template v-for="(i, key) in 4">
                                    <div class="score-box">
                                        <div class="team-score">
                                            <div>
                                                <!-- <span v-casinobook="{sid: mainData[key+5].sid}">0</span> -->
                                               <!--  <div class="text-center"><b>Team A</b></div> -->
                                               <!--  <div class="text-center">
                                                    <span class="ml-1">228/6</span>
                                                    <span class="ml-1">20 Over</span>
                                                </div> -->
                                            </div>
                                            <div>
                                                <!-- <div class="text-center"><b>Team B</b></div> -->
                                                <!-- <div class="text-center">
                                                    <span class="ml-1">228/6</span>
                                                    <span class="ml-1">20 Over</span>
                                                </div> -->
                                            </div>
                                        </div>
                                        <div class="ball-icon">
                                            <img :src="`${imgPath}admin/img/balls/ball${key+7}.png`">
                                        </div>
                                        <div class="blbox"  :class="{'suspended' : mainData[key+5].gstatus != 'OPEN'}">
                                            <div class="back">
                                                <span class="odds d-block">{{mainData[key+5].b}}</span>
                                            </div>
                                            <div class="lay">
                                                <span class="odds d-block">{{mainData[key+5].l}}</span>
                                            </div>
                                        </div>
                                        <div class="c20minmax">
                                            <i class="fas fa-info-circle float-right collapsed" data-toggle="collapse" :data-target="'#minmaxr'+key" aria-expanded="false"></i>
                                            <div :id="'minmaxr'+key" class="icon-range collapse" style="">
                                                R:<span v-kval="{size: mainData[key+5].min}"></span>-<span
                                                        v-kval="{size: mainData[key+5].max}"></span>
                                            </div>
                                        </div>
                                        <div class="c20book" v-casinobook="{sid: mainData[key+5].sid}"></div>
                                    </div>
                                </template>
                                 
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
            mainData() {
                var player = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': this.gameType
                })
                return this.orderBy(player, 'sr')
            }
        },
        data() {
            return {
                showCards: true,
                showResults: true,
                imgPath: IMG_PATH,
                gameTitle: 'Cricket Match 20-20',
                gameType: 'cmatch20',
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