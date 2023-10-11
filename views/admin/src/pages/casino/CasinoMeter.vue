<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table cmeter">
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
                    <div class="casino-detail" v-if="casinoData && mainData.length > 0 && casinoData.card != ''">
                        <div class="teen1daycasino-container">
                            <div class="teen1dayleft">
                                <div class=" text-center">
                                    <b class="text-playerb">{{ mainData[0].nat }}</b>
                                    <span class="text-success ml-2">{{ casinoData.rdesc.split(",")[0] }}</span>
                                </div>
                                <div class="w-100">
                                    <div class="casino-cards text-center mt-1">
                                        <template v-for="(card, key) in casinoData.card.split(',')">
                                        <template v-if="checkLowCards(card, true)">
                                        <div class="casino-card-item">
                                            <div class=" card-image">
                                                
                                                <Card :card="card" />
                                                
                                            </div>
                                        </div>
                                        </template>
                                        </template>
                                    </div>
                                    <div class="casino-min-max">
                                        <span class="casino-book" v-casinofancybook="{sid: mainData[0].sid}"></span>
                                        <span class="float-right">R:<span v-kval="{size: mainData[0].min}"></span>-<span
                                                        v-kval="{size: mainData[0].max}"></span></span>
                                    </div>
                                </div>
                            </div>
                            <div class="teen1daycenter"></div>
                            <div class="teen1dayright">
                                <div class=" text-center">
                                    <b class="text-playerb">{{ mainData[1].nat }}</b>
                                    <span class="text-success ml-2">{{ casinoData.rdesc.split(",")[1] }}</span>
                                </div>
                                <div class="w-100">
                                    <div class="casino-cards text-center mt-1">
                                        <template v-for="(card, key) in casinoData.card.split(',')">
                                        <template v-if="checkHighCards(card, true)">
                                        <div class="casino-card-item">
                                            <div class=" card-image">
                                                
                                                <Card :card="card" />
                                                
                                            </div>
                                        </div>
                                        </template>
                                        </template>
                                    </div>
                                    <div class="casino-min-max">
                                        <span class="casino-book" v-casinofancybook="{sid: mainData[1].sid}"></span>
                                        <span class="float-right">R:<span v-kval="{size: mainData[1].min}"></span>-<span
                                                        v-kval="{size: mainData[1].max}"></span></span>
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
                gameTitle: 'Casino Meter',
                gameType: 'cmeter',
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
            checkLowCards(card) {
                if(card == 1){
                    return false
                }
                if (card.length == 3) {
                    var value = card.slice(0, 1)
                    if (value.toLowerCase() == 'a' || value <= 9) {
                        return true
                    }   
                }
            },
            checkHighCards(card) {
                if(card == 1){
                    return false
                }
                if (card.length == 3) {
                    var value = card.slice(0, 1)
                    if (value.toLowerCase() == 'j' || value.toLowerCase() == 'k' || value.toLowerCase() == 'q') {
                        return true
                    }
                }
                if (card.length == 4) {
                    var value = card.slice(0, 2)
                    if (value == '10') {
                        return true
                    }
                
                }
            },
            
           
        },
        beforeDestroy() {
            this.callBookApi = false
            this.callDataApi = false
            
        }
    }
</script>