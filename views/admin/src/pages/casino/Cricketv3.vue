<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table five-cricket detail-page-container">
                     <div class="game-header">
                        <span class="game-header-name">{{ casinoData.ename }}</span>
                        <span class="float-right game-header-date" >Round ID: {{ gameId }}</span>
                      </div>
                    <div class="container-fluid container-fluid-5">
                    <div class="row row5">
                      <div class="col-xl-2 banner d-flex align-items-center mb-1">
                        <template v-if="casinoData && casinoData.scard != 2">
                            <div class="scorecard" v-if="casinoData.scard == 1 && scoreboardData.isfinished == '0'">
                                <div class="scorecard-row">
                                    <div class="score-top-row">
                                        <div class="score-team">
                                            <b>{{ scoreboardData.spnnation1 }}</b> {{ scoreboardData.score1 }}
                                        </div>
                                        <div>
                                          <span v-if="scoreboardData.spnrunrate1 !== ''">
                                            CRR
                                            {{ scoreboardData.spnrunrate1 }}
                                          </span>
                                          <span v-if="scoreboardData.spnreqrate1 !== ''">
                                            RR
                                            {{ scoreboardData.spnreqrate1 }}
                                          </span>
                                        </div>
                                        <div class="score-message" v-if="scoreboardData.spnballrunningstatus != ''"> 
                                          <span v-if="scoreboardData.dayno !== ''">
                                            Day
                                            {{ scoreboardData.dayno }} |
                                          </span>
                                          {{ scoreboardData.spnballrunningstatus }}
                                        </div>
                                        <div class="score-message" v-if="scoreboardData.spnmessage != ''"> 
                                          <span v-if="scoreboardData.dayno !== ''">
                                            Day
                                            {{ scoreboardData.dayno }} |
                                          </span>
                                          {{ scoreboardData.spnmessage }}
                                        </div>
                                    </div>
                                </div>
                                <div class="scorecard-row">
                                    <div class="score-top-row">
                                        <div class="score-team">
                                            <b>{{ scoreboardData.spnnation2 }}</b> {{ scoreboardData.score2 }}
                                        </div>
                                        <div>
                                          <span v-if="scoreboardData.spnrunrate2 !== ''">
                                            CRR
                                            {{ scoreboardData.spnrunrate2 }}
                                          </span>
                                          <span v-if="scoreboardData.spnreqrate2 !== ''">
                                            RR
                                            {{ scoreboardData.spnreqrate2 }}
                                          </span>
                                        </div>
                                        <div class="score-message">
                                          <span
                                            v-for="ball in scoreboardData.balls"
                                            v-if="ball !== '' "
                                            class="ball-runs mr-1"
                                            :class="[{'four' : ball == 4}, {'six' : ball == 6}, {'wicket' : ball.toLowerCase() == 'ww'}]"
                                          >{{ ball }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                      </div>
                       <div class="col-xl-10">
                    <div class="casino-video mt-0">
                        <!-- <div class="casino-video-title">
                            <span class="casino-name">{{ casinoData.ename+" 5Five Cricket" }}</span>
                            <div class="casino-video-rid">Round ID: {{ casinoData.gmid }}</div>
                        </div> -->
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
                                <div v-for="n in 6">
                                    <template v-for="card in cards[n-1].split(',')">
                                        <Card :card="card" />
                                    </template>
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
                </div>
                </div>
                 </div>
                
                    <div class="market-container">
                      <template v-for="(data, key) in orderBy(gameData.new, 'sno')">
                        <template v-if="data.gtype != 'match'">
                        <template v-if="data.dtype == 2">
                          <Market2 :key="key" :index="key" :marketDataNew="data" :marketDataOld="orderBy(gameData.old, 'sno')[key]" />
                        </template>

                        <template v-if="data.dtype == 4">
                          <Market4 :key="key" :index="key" :marketDataNew="data" :marketDataOld="orderBy(gameData.old, 'sno')[key]" />
                        </template>
                        <template v-if="data.dtype == 6">
                          <Market6 :key="key" :index="key" :marketDataNew="data" :marketDataOld="orderBy(gameData.old, 'sno')[key]" />
                        </template>

                      </template>
                      </template>
                      
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
            <div class="right-sidebar" :data-simplebar="!$store.getters.isMobile">
              <div class="card m-b-10 my-bet" id="my-game-bets">
                <div class="card-header">
                  <h6 class="card-title float-left">My Bets</h6>
                  <a href="javascript:void(0)" class="btn btn-back float-right" @click="getViewMoreBets()">View More</a>
                </div>
                <div class="card-body1">
                  <div class="tab-content">
                    <div id="matched-bet" class="tab-pane active">
                      <div class="table-responsive1">
                        <table class="table coupon-table mb-0">
                          <thead>
                            <tr>
                              <th style="min-width: 90px;">UserName</th>
                              <th style="min-width: 90px;">Nation</th>
                              <th class="text-right" style="min-width: 50px;">Rate</th>
                              <th class="text-right" style="min-width: 70px;">Amount</th>
                              
                            </tr>
                          </thead>
                          <tbody v-if="userBook != null">
                            <template v-for="bet in userBook.t2">
                            <tr :class="{'back-border': bet.btype.toLowerCase() == 'back', 'lay-border': bet.btype.toLowerCase() == 'lay'}">
                              <td colspan="4">
                                <b>{{ bet.mname }}</b>
                                <span class="float-right" v-format-datetime="{date:bet.pdt}"></span>
                              </td>
                            </tr>
                            <tr :class="{'back-border': bet.btype.toLowerCase() == 'back', 'lay-border': bet.btype.toLowerCase() == 'lay'}">
                              <td class="bt0">{{ bet.uname }}</td>
                              <td class="bt0">{{ bet.sname }}  <template v-if="bet.gtype.toLowerCase() == 'fancy'">
                                      / {{ bet.bhav }}
                                    </template></td>
                              <td class="text-right bt0">{{ bet.urate }}</td>
                              <td class="text-right bt0" v-currency="bet.amt">{{ bet.amt }}</td>
                            </tr>
                            <tr>
                              <td colspan="4" style="height:3px;padding:0"></td>
                            </tr>
                            </template>
                          </tbody>
                          <tbody v-else>
                            <tr>
                              <td colspan="4" class="text-center">No records found</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="$store.getters.isMobile" class="market-show-icon d-none-desktop" @click="$helpers.scrollToId('my-game-bets')">
                <div class="bet-cnt">{{ userBook && userBook.t2 ? userBook.t2.length : 0 }}</div>
                <div class="bet-title">Bets</div>
            </div>
        </div>
        <b-modal ref="viewMoreBetsModal" hide-footer title="View More" size="big" class="">
        <template v-if="viewMoreBets.marketList != null && viewMoreBets.marketList.length > 0">
        <ul class="nav nav-tabs d-inline-block  text-uppercase" role="tablist ">
            <li class="nav-item d-inline-block" v-for="(marketTab, index) in viewMoreBets.marketList">
                <a class="nav-link" data-toggle="tab" href="javascript:void(0)" @click="getMarketBets(marketTab.mid)" :class="{active: viewMoreBets.selectedMarket == marketTab.mid}">{{ marketTab.mname }}</a>
            </li>
        </ul>
        </template>
        <div class="tab-content m-t-20">
            <div id="matched-bet2" class="tab-pane active"> 
              <template v-if="viewMoreBets.betList != null && viewMoreBets.betList.length > 0" >
                <GameBetList :gameSoda="viewMoreBets.betList" />
              </template>
            </div>
        </div>
      </b-modal>
    </div>
    
    </template>

<script>
    var socketScoreBoard;
    import ServiceApi from "@/services/ServiceApi";
    import Timer from "@/components/casino/BaseTimer"
    import RightSideBar from "@/components/casino/RightSideBar"
    import Card from '@/components/casino/Card'
    import Market2 from "@/components/cricketv3/Market2";
    import Market4 from "@/components/cricketv3/Market4";
    import Market6 from "@/components/cricketv3/Market6";
    import io from "socket.io-client";
    import simplebar from "simplebar-vue";
    import GameBetList from "@/components/game/GameBetList" 
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
            Market2,
            Market4,
            Market6,
            simplebar,
            GameBetList,
            CasinoRules,
            LastResultsSection
        },
        computed: {
            main() {
                var player = _.filter(_.get(this.casinoData, 'market'), {
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
                gameTitle: 'Cricketv3',
                gameType: 'cricketv3',
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
                gameData: {
                    old: {},
                    new: {}
                },
                gameId: 0,
                oldGameId: 0,
                scoreboardData: {},
                userBook: null,
                viewMoreBets: {
                    marketList: null,
                    selectedMarket: null,
                    betList: null
                },
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
                            this.casinoData = response.data.t1
                            
                          //  this.mId = _.get(this.casinoData, 'mid')
                            this.cards = _.get(this.casinoData, 'card').split('|')
                            this.time.total = _.get(this.casinoData, 'ft')
                            this.time.current = _.get(this.casinoData, 'lt')

                            this.gameData.old = this.gameData.new
                            this.gameData.new = response.data.t2
                            //this.casinoData.scard = 1
                            if (this.casinoData.oldgmid != this.oldGameId) {
                                this.getLastResults()
                                if (socketScoreBoard)
                                    socketScoreBoard.close()
                                this.connectScoreBoard();
                            }
                            this.oldGameId = this.casinoData.oldgmid
                            this.gameId = this.casinoData.gmid
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
                ServiceApi.callApi("game/userbook", {
                    'gid': parseInt(this.gameId),
                    'etid': this.casinoData.etid
                })
                .then(response => {
                    if (response.status == 200) {
                        this.userBook = response.data;
                        this.$store.state.betSoda = response.data.t2
                        this.$store.state.sportbetBook = response.data.t1
                        this.$store.state.fancybetBook = response.data.t3           
                    } else {
                        this.userBook = null;
                        this.$store.state.betSoda = null
                        this.$store.state.sportbetBook = null
                        this.$store.state.fancybetBook = null
                    }
                    if (this.callBookApi == true) {
                        setTimeout(res => {
                            this.getUserBook();
                        }, 800);
                    }
                })
                .catch(e => {
                    /*this.userBook = null;
                    this.$store.state.betSoda = null
                    this.$store.state.sportbetBook = null
                    this.$store.state.fancybetBook = null*/
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
            connectScoreBoard() {
                if (this.casinoData.oldgmid == null) {
                    return
                }
              let self = this;
              socketScoreBoard = io.connect(SCOREBOARD_URL, {
                transports: ["websocket"]
              });
              socketScoreBoard.on("connect", function() {
                socketScoreBoard.emit("subscribe", {
                  type: self.casinoData.scard == 0 ? 2 : self.casinoData.scard,
                  rooms: [parseInt(self.casinoData.oldgmid)]
                });
              });
              socketScoreBoard.on("error", function() {
                console.log("error");
              });
              socketScoreBoard.on("update", function(response) {
                if (self.casinoData.scard == 0) {
                  const SocketMsg = protobuf.roots.default.EventPublish;
                  var msg = SocketMsg.decode(new Uint8Array(response.data));
                  
                } else {
                  var msg = response.data;
                }

                if (msg != undefined && msg != null && msg.isfinished == 1) {
                  socketScoreBoard.emit("unsubscribe", {
                    type: self.casinoData.scard,
                    rooms: []
                  });
                } else {
                  if (msg != undefined && msg != null) {
                    self.scoreboardData = msg;
                  } 
                }
              });
              socketScoreBoard.on("disconnect", function() {
                //console.log("disconnect");
              });
            },
            getViewMoreBets() {
              this.$store.state.isLoading = true;
              ServiceApi.callApi("game/getbetmarketlist", {
                  gid: parseInt(this.gameId)
                })
                .then(response => {
                  if (response.status == 200) {
                    this.viewMoreBets.marketList = response.data.t1
                    if(this.viewMoreBets.marketList != null && this.viewMoreBets.marketList.length > 0){
                      this.viewMoreBets.selectedMarket = this.viewMoreBets.marketList[0].mid; 
                      this.getMarketBets(this.viewMoreBets.selectedMarket);
                    }
                  } else {
                    this.viewMoreBets.marketList = []
                  }
                  this.$store.state.isLoading = false;
                  this.$refs['viewMoreBetsModal'].show()
                })
                .catch(e => {
                  this.viewMoreBets.marketList = []
                  this.$store.state.isLoading = false;
                });
            },
            getMarketBets(mid){
              this.$store.state.isLoading = true;
              this.viewMoreBets.selectedMarket = mid;
              ServiceApi.callApi("game/getmarketbets", {
                  gid: parseInt(this.gameId),
                  mid: parseInt(mid)
                })
                .then(response => {
                  if (response.status == 200) {
                    this.viewMoreBets.betList = response.data.t1
                  } else {
                    this.viewMoreBets.betList = []
                  }
                  this.$store.state.isLoading = false;
                  //this.$refs['viewMoreBetsModal'].show()
                })
                .catch(e => {
                  this.viewMoreBets.betList = []
                  this.$store.state.isLoading = false;
                });
            },
           
        },
        beforeDestroy() {
            this.callBookApi = false
            this.callDataApi = false
            if (this.casinoData.scard != 2 && this.casinoData.oldgmid != null) {
              socketScoreBoard.emit("unsubscribe", { type: this.casinoData.scard, rooms: [] });
              socketScoreBoard.close();
            }
            
        }
    }
</script>