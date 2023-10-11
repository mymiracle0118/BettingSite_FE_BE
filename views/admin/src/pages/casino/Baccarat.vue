<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table baccarat">
                    <div class="casino-video">
                        <div class="casino-video-title">
                            <span class="casino-name">{{ gameTitle }}</span>
                            <div class="casino-video-rid">ROUND ID: {{ casinoData.mid }}</div>
                        </div>
                        <div class="video-box-container">
                            <div class="video-box" v-if="tvUrl != ''">
                                <iframe :src="tvUrl"></iframe>
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
                                <i class="fas fa-chevron-circle-down"></i>
                            </div>
                        </div>
                        <CasinoRules ref="casinorules" :gtype="gameType"></CasinoRules>
                        <LastResultsSection v-if="$store.getters.isTablet" :gtype="gameType" :lastResults="lastResults" :showResults="showResults" />

                    </div>
                    
                    <div class="casino-detail" v-if="mainData && mainData.length > 0">
                        <!-- <div class="statistics">
                                <div class="statistics-title" @click="showChart=!showChart">
                                    Statistics
                                </div>
                                <div class="statistics-conten1t" v-show="showChart == true">
                                <GChart type="PieChart" :data="chartData" :options="chartOptions" /></GChart>
                            </div>
                        </div> -->
                        <div class="baccarat-bets-odds pt-3">
                            <div class="baccarat-odds">
                                <div class="baccarat-odd-block" >
                                    <div class="baccarat-odd-name" :class="{'suspended': mainData[5].gstatus != 'OPEN'}">{{ mainData[5].nat }} {{ parseFloat(mainData[5].b) }}:1</div>
                                    <div class="baccarat-odd-val" v-casinofancybook="{sid: mainData[5].sid}"></div>
                                    <div class="casino-min-max">
                                        <i class="fas fa-info-circle float-right" data-toggle="collapse" data-target="#range1"></i>
                                        <div id="range1" class="collapse icon-range">
                                            R:<span v-kval="{size: mainData[5].min}"></span>-<span v-kval="{size: mainData[5].max}"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="baccarat-odd-block">
                                    <div class="baccarat-odd-name" :class="{'suspended': mainData[6].gstatus != 'OPEN'}">{{ mainData[6].nat }} {{ parseFloat(mainData[6].b) }}:1</div>
                                    <div class="baccarat-odd-val" v-casinofancybook="{sid: mainData[6].sid}"></div>
                                    <div class="casino-min-max">
                                        <i class="fas fa-info-circle float-right" data-toggle="collapse" data-target="#range2"></i>
                                        <div id="range2" class="collapse icon-range">
                                            R:<span v-kval="{size: mainData[6].min}"></span>-<span v-kval="{size: mainData[6].max}"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="baccarat-odd-block">
                                    <div class="baccarat-odd-name" :class="{'suspended': mainData[7].gstatus != 'OPEN'}">{{ mainData[7].nat }} {{ parseFloat(mainData[7].b) }}:1</div>
                                    <div class="baccarat-odd-val" v-casinofancybook="{sid: mainData[7].sid}"></div>
                                    <div class="casino-min-max">
                                        <i class="fas fa-info-circle float-right" data-toggle="collapse" data-target="#range3"></i>
                                        <div id="range3" class="collapse icon-range">
                                            R:<span v-kval="{size: mainData[7].min}"></span>-<span v-kval="{size: mainData[7].max}"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="baccarat-odd-block">
                                    <div class="baccarat-odd-name" :class="{'suspended': mainData[8].gstatus != 'OPEN'}">{{ mainData[8].nat }} {{ parseFloat(mainData[8].b) }}:1</div>
                                    <div class="baccarat-odd-val" v-casinofancybook="{sid: mainData[8].sid}"></div>
                                    <div class="casino-min-max">
                                        <i class="fas fa-info-circle float-right" data-toggle="collapse" data-target="#range4"></i>
                                        <div id="range4" class="collapse icon-range">
                                            R:<span v-kval="{size: mainData[8].min}"></span>-<span v-kval="{size: mainData[8].max}"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="baccarat-odd-block" v-if="gameType == 'baccarat2'">
                                    <div class="baccarat-odd-name" :class="{'suspended': mainData[9].gstatus != 'OPEN'}">{{ mainData[9].nat }} {{ parseFloat(mainData[9].b) }}:1</div>
                                    <div class="baccarat-odd-val" v-casinofancybook="{sid: mainData[9].sid}"></div>
                                    <div class="casino-min-max">
                                        <i class="fas fa-info-circle float-right" data-toggle="collapse" data-target="#range10"></i>
                                        <div id="range10" class="collapse icon-range">
                                            R:<span v-kval="{size: mainData[9].min}"></span>-<span v-kval="{size: mainData[9].max}"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="baccarat-bets">
                                <div class="player-pair">
                                    <div :class="{'suspended' : mainData[3].gstatus != 'OPEN' }" class="baccarat-bets-name">
                                        <div>{{ mainData[3].nat }}</div>
                                        <div class="mb-0">{{ parseFloat(mainData[3].b) }}:1</div>
                                    </div>
                                    <div class="baccarat-bets-val" v-casinofancybook="{sid: mainData[3].sid}"></div>
                                    <div class="casino-min-max">
                                        <i class="fas fa-info-circle" data-toggle="collapse" data-target="#range5"></i>
                                        <div id="range5" class="collapse icon-range">
                                            R:<span v-kval="{size: mainData[3].min}"></span>-<span v-kval="{size: mainData[3].max}"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="player">
                                    <div class="baccarat-bets-name"  :class="{'suspended' : mainData[0].gstatus != 'OPEN' }">
                                        <div>{{ mainData[0].nat }} {{ parseFloat(mainData[0].b) }}:1</div>
                                        
                                        <div class="mb-0">
                                            <Card v-if="cards[4] != '1'" :card="cards[4]"  class="l-rotate" />
                                            <Card :card="cards[2]" />
                                            <Card :card="cards[0]" />
                                        </div>
                                    </div>
                                    <div class="baccarat-bets-val" v-casinofancybook="{sid: mainData[0].sid}"></div>
                                    <div class="casino-min-max">
                                        <i class="fas fa-info-circle" data-toggle="collapse" data-target="#range6"></i>
                                        <div id="range6" class="collapse icon-range">
                                            R:<span v-kval="{size: mainData[0].min}"></span>-<span v-kval="{size: mainData[0].max}"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="tie">
                                    <div class="baccarat-bets-name" :class="{'suspended' : mainData[2].gstatus != 'OPEN'}">
                                        <div>{{ mainData[2].nat }}</div>
                                        <div class="mb-0">{{ parseFloat(mainData[2].b) }}:1</div>
                                    </div>
                                    <div class="baccarat-bets-val" v-casinofancybook="{sid: mainData[2].sid}"></div>
                                    <div class="casino-min-max">
                                        <i class="fas fa-info-circle" data-toggle="collapse" data-target="#range7"></i>
                                        <div id="range7" class="collapse icon-range">
                                            R:<span v-kval="{size: mainData[2].min}"></span>-<span v-kval="{size: mainData[2].max}"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="banker">
                                    <div class="baccarat-bets-name"  :class="{'suspended' : mainData[1].gstatus != 'OPEN' }">
                                        <div>{{ mainData[1].nat }} {{ parseFloat(mainData[1].b) }}:1</div>
                                        <div class="mb-0">
                                            <Card :card="cards[1]"  />
                                            <Card :card="cards[3]" />
                                            <Card v-if="cards[5] != '1'" :card="cards[5]" class="r-rotate"/>
                                        </div>
                                    </div>
                                    <div class="baccarat-bets-val" v-casinofancybook="{sid: mainData[1].sid}"></div>
                                    <div class="casino-min-max">
                                        <i class="fas fa-info-circle" data-toggle="collapse" data-target="#range8"></i>
                                        <div id="range8" class="collapse icon-range">
                                            R:<span v-kval="{size: mainData[1].min}"></span>-<span v-kval="{size: mainData[1].max}"></span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="banker-pair">
                                    <div class="baccarat-bets-name" :class="{'suspended' : mainData[4].gstatus != 'OPEN' }">
                                        <div>{{ mainData[4].nat }}</div>
                                        <div class="mb-0">{{ parseFloat(mainData[4].b) }}:1</div>
                                    </div>
                                    <div class="baccarat-bets-val" v-casinofancybook="{sid: mainData[4].sid}"></div>
                                    <div class="casino-min-max">
                                        <i class="fas fa-info-circle" data-toggle="collapse" data-target="#range9"></i>
                                        <div id="range9" class="collapse icon-range">
                                            R:<span v-kval="{size: mainData[4].min}"></span>-<span v-kval="{size: mainData[4].max}"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="baccarat-min-max mt-3" v-if="mainData.length > 0">
                                R: <span v-kval="{size: mainData[0].min}"></span> - <span v-kval="{size: mainData[0].max}"></span>
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
        <RightSideBar :mid="mId" :gtype="gameType"></RightSideBar>
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
    
    /*import {GChart} from 'vue-google-charts'*/
    export default {
        props:['gtype'],
        mounted() {
            if(this.gtype && this.gtype == "baccarat2"){
                this.gameType = this.gtype;
                this.gameTitle = "Baccarat 2";
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
            /*GChart*/
        },
        computed: {
            mainData() {
                return _.get(this.casinoData, 'sub')
               /* return _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'baccarat'
                })*/
            }
        },
        data() {
            return {
                showCards: true,
                showResults: true,
                showChart:true,
                imgPath: IMG_PATH,
                gameTitle: 'Baccarat',
                gameType: 'baccarat',
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
                /*chartData: [
                  ['P', 'Data'],
                  ['Player', 24],
                  ['Banker', 50],
                  ['Tie', 26],
                ],*/
                /*chartOptions: {
                    title: '',
                    height: 160, 
                    backgroundColor: 'transparent',
                    slices: {
                        0: {
                            color: '#086cb8'
                        },
                        1: {
                            color:'#ae2130'
                        },
                        2: {
                            color:'#279532'
                        }
                    },
                    pieSliceTextStyle: {
                      //  fontSize: 8,
                    },
                    is3D: true,
                    legend: {
                        position: 'right',
                        textStyle: {
                            color: "#fff"    
                        }
                    },
                    chartArea: {
                        left: '2%', 
                        top: '2%',
                        bottom: '2%',
                        width: '100%',
                        height: '100%'
                    },
                    hAxis: {
                        // title: 'Time',
                        // titleTextStyle: {
                        //     color: '#000'
                        // },
                        format: 'HH:mm',
                        gridlines: {
                            count: 15
                        }
                    },
                    vAxis: {
                        // title: 'Price',
                        // titleTextStyle: {
                        //     color: '#000'
                        // }
                    },
                },*/
               
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
                            this.gameTitle = response.data.g ? response.data.g.cname : "";
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