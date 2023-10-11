<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table lucky7">
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
                                <!-- <div class="dealer-name">Card</div> -->
                                <div>
                                    <Card :card="cards[0]" />
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
                    <div class="casino-detail" v-if="mainData && mainData.length > 0">
                        <div class="casino-box low-high-box">
                            <div class="low-odds" :class="{'suspended': mainData[0].gstatus != 'OPEN'}">
                                <div class="casino-odds">{{ mainData[0].b }}</div>
                                <div class="text-center casino-buttons">
                                    <span class="">{{ mainData[0].nat }}</span>
                                </div>
                                <div class="casino-book" v-casinofancybook="{sid: mainData[0].sid}"></div>
                            </div>
                            <div class="text-center lucky7-card">
                                <img :src="`${imgPath}front/img/cards/7.png`" class="img-fluid">
                            </div>
                            <div class="high-odds" :class="{'suspended': mainData[1].gstatus != 'OPEN'}">
                                <div class="casino-odds">{{ mainData[1].b }}</div>
                                <div class="text-center casino-buttons">
                                    <span class="">{{ mainData[1].nat }}</span>
                                </div>
                                <div class="casino-book" v-casinofancybook="{sid: mainData[1].sid}"></div>
                            </div>
                            <div class="casino-min-max text-right">
                                R:<span v-kval="{size: mainData[0].min}"></span>-<span v-kval="{size: mainData[0].max}"></span>
                            </div>
                        </div>
                        <div class="casino-box sidebets-box">
                            <div class="lucky7-extra-bets">
                                <div class="lucky7-extra-bets-item-container">
                                    <div class="lucky7-extra-bets-item"  :class="{'suspended': mainData[2].gstatus != 'OPEN'}">
                                        <div class="casino-odds">{{ mainData[2].b }}</div>
                                        <div class="casino-buttons">{{ mainData[2].nat }}</div>
                                        <div class="casino-book" v-casinofancybook="{sid: mainData[2].sid}"></div>
                                    </div>
                                    <div class="casino-min-max text-right">
                                        R:<span v-kval="{size: mainData[2].min}"></span>-<span v-kval="{size: mainData[2].max}"></span>
                                    </div>
                                </div>
                                <div class="lucky7-extra-bets-item-container">
                                    <div class="lucky7-extra-bets-item"  :class="{'suspended': mainData[3].gstatus != 'OPEN'}">
                                        <div class="casino-odds">{{ mainData[3].b }}</div>
                                        <div class="casino-buttons">{{ mainData[3].nat }}</div>
                                        <div class="casino-book" v-casinofancybook="{sid: mainData[3].sid}"></div>
                                    </div>
                                    <div class="casino-min-max text-right">
                                        R:<span v-kval="{size: mainData[3].min}"></span>-<span v-kval="{size: mainData[3].max}"></span>
                                    </div>
                                </div>
                                
                                <div class="lucky7-extra-bets-item-container">
                                    <div class="lucky7-extra-bets-item" :class="{'suspended': mainData[5].gstatus != 'OPEN'}">
                                        <div class="casino-odds">{{ mainData[5].b }}</div>
                                        <div class="casino-buttons">
                                            <img :src="`${imgPath}front/img/cards/spade.png`">
                                            <img :src="`${imgPath}front/img/cards/club.png`" >
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: mainData[5].sid}"></div>
                                    </div>
                                    <div class="casino-min-max text-right">
                                        R:<span v-kval="{size: mainData[5].min}"></span>-<span v-kval="{size: mainData[5].max}"></span>
                                    </div>
                                </div>
                                <div class="lucky7-extra-bets-item-container">
                                    <div class="lucky7-extra-bets-item"  :class="{'suspended': mainData[4].gstatus != 'OPEN'}">
                                        <div class="casino-odds">{{ mainData[4].b }}</div>
                                        <div class="casino-buttons">
                                            <img :src="`${imgPath}front/img/cards/heart.png`">
                                            <img :src="`${imgPath}front/img/cards/diamond.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: mainData[4].sid}"></div>
                                    </div>
                                    <div class="casino-min-max text-right">
                                        R:<span v-kval="{size: mainData[4].min}"></span>-<span v-kval="{size: mainData[4].max}"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="casino-box cards-top">
                            <div class="container-fluid container-fluid-5">
                                <div class="row row5">
                                    <div class="col-6 col-md-3">
                                        <div>
                                            <div class="casino-odds">{{mainData[19].b}}</div>
                                            <div class="casino-cards text-center mt-1">
                                                <div class="casino-box cards-top-box" :class="{'suspended': mainData[19].gstatus != 'OPEN'}">
                                                    <div class="casino-card-item">
                                                        <div class=" card-image">
                                                            <img :src="`${imgPath}front/img/cards/A.png`" >
                                                        </div>
                                                    </div>
                                                    <div class="casino-card-item">
                                                        <div class=" card-image">
                                                            <img :src="`${imgPath}front/img/cards/2.png`" >
                                                        </div>
                                                    </div>
                                                    <div class="casino-card-item">
                                                        <div class=" card-image">
                                                            <img :src="`${imgPath}front/img/cards/3.png`" >
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div class="w-100 casino-book" v-casinofancybook="{sid: mainData[19].sid}"></div>
                                            </div>
                                            <div class="casino-min-max text-center">
                                                R:<span v-kval="{size: mainData[19].min}"></span>-<span v-kval="{size: mainData[19].max}"></span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div class="col-6 col-md-3">
                                        <div>
                                            <div class="casino-odds">{{mainData[20].b}}</div>
                                            <div class="casino-cards text-center mt-1" >
                                                <div class="casino-box cards-top-box" :class="{'suspended': mainData[20].gstatus != 'OPEN'}">
                                                    <div class="casino-card-item">
                                                        <div class=" card-image">
                                                            <img :src="`${imgPath}front/img/cards/4.png`">
                                                        </div>
                                                    </div>
                                                    <div class="casino-card-item">
                                                        <div class=" card-image">
                                                            <img :src="`${imgPath}front/img/cards/5.png`">
                                                        </div>
                                                    </div>
                                                    <div class="casino-card-item">
                                                        <div class=" card-image">
                                                            <img :src="`${imgPath}front/img/cards/6.png`">
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div class="w-100 casino-book" v-casinofancybook="{sid: mainData[20].sid}"></div>
                                            </div>
                                            <div class="casino-min-max text-center">
                                                R:<span v-kval="{size: mainData[20].min}"></span>-<span v-kval="{size: mainData[20].max}"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6 col-md-3">
                                        <div>
                                            <div class="casino-odds">{{mainData[21].b}}</div>
                                            <div class="casino-cards text-center mt-1" >
                                                <div class="casino-box cards-top-box" :class="{'suspended': mainData[21].gstatus != 'OPEN'}">
                                                    <div class="casino-card-item">
                                                        <div class=" card-image">
                                                            <img :src="`${imgPath}front/img/cards/8.png`">
                                                        </div>
                                                    </div>
                                                    <div class="casino-card-item">
                                                        <div class=" card-image">
                                                            <img :src="`${imgPath}front/img/cards/9.png`">
                                                        </div>
                                                    </div>
                                                    <div class="casino-card-item">
                                                        <div class=" card-image">
                                                            <img :src="`${imgPath}front/img/cards/10.png`">
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div class="w-100 casino-book" v-casinofancybook="{sid: mainData[21].sid}"></div>
                                            </div>
                                            <div class="casino-min-max text-center">
                                                R:<span v-kval="{size: mainData[21].min}"></span>-<span v-kval="{size: mainData[21].max}"></span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div class="col-6 col-md-3">
                                        <div>
                                            <div class="casino-odds">{{mainData[22].b}}</div>
                                            <div class="casino-cards text-center mt-1">
                                                <div class="casino-box cards-top-box" :class="{'suspended': mainData[22].gstatus != 'OPEN'}">
                                                    <div class="casino-card-item">
                                                        <div class=" card-image">
                                                            <img :src="`${imgPath}front/img/cards/J.png`">
                                                        </div>
                                                    </div>
                                                    <div class="casino-card-item">
                                                        <div class=" card-image">
                                                            <img :src="`${imgPath}front/img/cards/Q.png`">
                                                        </div>
                                                    </div>
                                                    <div class="casino-card-item">
                                                        <div class=" card-image">
                                                            <img :src="`${imgPath}front/img/cards/K.png`">
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div class="w-100 casino-book" v-casinofancybook="{sid: mainData[22].sid}"></div>
                                            </div>
                                            <div class="casino-min-max text-center">
                                                R:<span v-kval="{size: mainData[22].min}"></span>-<span v-kval="{size: mainData[22].max}"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="casino-box cards-box">
                            <div class="w-100">
                                <div class="casino-odds">{{ mainData[6].b }} 
                                    
                                </div>
                                <div class="casino-cards text-center mt-1">
                                    <template v-for="n in 7">
                                        <div class="casino-card-item"  >
                                            <div class=" card-image" :class="{'suspended': mainData[n+5].gstatus != 'OPEN'}">
                                                <img v-if="n==1" :src="`${imgPath}front/img/cards/A.png`">
                                                <img v-else :src="`${imgPath}front/img/cards/${n}.png`">
                                            </div>
                                            <div class="casino-book" v-casinofancybook="{sid: mainData[n+5].sid}"></div>
                                        </div>
                                    </template>
                                    <template v-for="n in 6">
                                        <div class="casino-card-item" >
                                            <div class=" card-image" :class="{'suspended': mainData[n+12].gstatus != 'OPEN'}">
                                                <img v-if="n==4" :src="`${imgPath}front/img/cards/J.png`">
                                                <img v-else-if="n==5" :src="`${imgPath}front/img/cards/Q.png`">
                                                <img v-else-if="n==6" :src="`${imgPath}front/img/cards/K.png`">
                                                <img v-else :src="`${imgPath}front/img/cards/${n+7}.png`">
                                            </div>
                                            <div class="casino-book" v-casinofancybook="{sid: mainData[n+12].sid}"></div>
                                        </div>
                                    </template>
                                </div>    
                            </div>
                            <div class="casino-min-max text-right">
                                R:<span v-kval="{size: mainData[6].min}"></span>-<span v-kval="{size: mainData[6].max}"></span>
                            </div>
                           <!--  <div class="w-100">
                                <div class="casino-cards text-center mt-1">
                                    <template v-for="n in 6">
                                        <div class="casino-card-item" :class="{'suspended': mainData[n+12].gstatus != 'OPEN'}">
                                            <div class=" card-image">
                                                <img v-if="n==4" :src="`${imgPath}front/img/cards/J.jpg`">
                                                <img v-else-if="n==5" :src="`${imgPath}front/img/cards/Q.jpg`">
                                                <img v-else-if="n==6" :src="`${imgPath}front/img/cards/K.jpg`">
                                                <img v-else :src="`${imgPath}front/img/cards/${n+7}.jpg`">
                                            </div>
                                            <div class="casino-book" v-casinofancybook="{sid: mainData[n+12].sid}"></div>
                                        </div>
                                    </template>
                                </div>
                            </div> -->
                            
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
        props:['gtype'],
        mounted() {
            if(this.gtype && this.gtype == "lucky7eu"){
                this.gameType = this.gtype;
                this.gameTitle = "Lucky 7 - B";
            }else if(this.gtype && this.gtype == "lucky7eu2"){
                this.gameType = this.gtype;
                this.gameTitle = "Lucky 7 - C";
            }
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
                return _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': this.gameType
                })
            }
        },
        data() {
            return {
                showCards: true,
                showResults: true,
                imgPath: IMG_PATH,
                gameTitle: 'Lucky 7 - A',
                gameType: 'lucky7',
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
                      //  this.getUserBook();
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