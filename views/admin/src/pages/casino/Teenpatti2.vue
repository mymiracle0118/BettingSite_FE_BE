<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table teenpatti2">
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
                        <div class="teen1daycasino-container">
                            <div class="teen1dayleft">
                              <div class="casino-box-row d-none-small">
                                <div class="casino-nation-name no-border casino-bl-box-title">
                                  <div class="playera">Player A</div>
                                </div>
                                <div class="casino-bl-box casino-bl-box-title">
                                  <div class="casino-bl-box-item">
                                    <b>Back</b>
                                  </div>
                                  <div class="casino-bl-box-item">
                                    <b>Lay</b>
                                  </div>
                                </div>
                              </div>
                              <div class="casino-box-row">
                                <div class="casino-nation-name">
                                  <b class="d-none-small">Main</b>
                                  <b class="d-none-big">Player A</b>
                                  <div class="float-right">
                                    <span class="mr-2 casino-book" v-casinobook="{ sid: main[0].sid }">0</span>
                                    <i
                                      class="fas fa-info-circle collapsed"
                                      data-toggle="collapse"
                                      data-target="#range1"
                                      aria-expanded="false"
                                    ></i>
                                    <div id="range1" class="icon-range collapse">
                                      R:<span v-kval="{ size: main[0].min }"></span>-<span
                                        v-kval="{ size: main[0].max }"
                                      ></span>
                                    </div>
                                  </div>
                                </div>
                                <div class="casino-bl-box">
                                  <div
                                    class="back casino-bl-box-item"
                                    :class="{ suspended: main[0].gstatus != 'OPEN' }"
                                    
                                  >
                                    <span class="casino-box-odd">{{ main[0].b }}</span>
                                  </div>
                                  <div
                                    class="lay casino-bl-box-item"
                                    :class="{ suspended: main[0].gstatus != 'OPEN' }"
                                    
                                  >
                                    <span class="casino-box-odd">{{ main[0].l }}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="teen1daycenter"></div>
                            <div class="teen1dayright">
                              <div class="casino-box-row d-none-small">
                                <div class="casino-nation-name no-border casino-bl-box-title">
                                  <div class="playerb">Player B</div>
                                </div>
                                <div class="casino-bl-box casino-bl-box-title">
                                  <div class="casino-bl-box-item" data-toggle="modal">
                                    <b>Back</b>
                                  </div>
                                  <div class="casino-bl-box-item">
                                    <b>Lay</b>
                                  </div>
                                </div>
                              </div>
                              <div class="casino-box-row">
                                <div class="casino-nation-name">
                                  <b class="d-none-small">Main</b>
                                  <b class="d-none-big">Player B</b>
                                  <div class="float-right">
                                    <span class="mr-2 casino-book" v-casinobook="{ sid: main[1].sid }">0</span>
                                    <i
                                      class="fas fa-info-circle collapsed"
                                      data-toggle="collapse"
                                      data-target="#range2"
                                      aria-expanded="false"
                                    ></i>
                                    <div id="range2" class="icon-range collapse">
                                      R:<span v-kval="{ size: main[1].min }"></span>-<span
                                        v-kval="{ size: main[1].max }"
                                      ></span>
                                    </div>
                                  </div>
                                </div>
                                <div class="casino-bl-box">
                                  <div
                                    class="back casino-bl-box-item"
                                    :class="{ suspended: main[1].gstatus != 'OPEN' }"
                                    
                                  >
                                    <span class="casino-box-odd">{{ main[1].b }}</span>
                                  </div>
                                  <div
                                    class="lay casino-bl-box-item"
                                    :class="{ suspended: main[1].gstatus != 'OPEN' }"
                                    
                                  >
                                    <span class="casino-box-odd">{{ main[1].l }}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="teen2uo">
                              <div class="teen1dayleft">
                                <div class="casino-box-row d-none-big">
                                  <div class="casino-nation-name no-border casino-bl-box-title">
                                    <div class="playera">Player A</div>
                                  </div>
                                  <div class="casino-bl-box casino-bl-box-title"></div>
                                </div>
                                <div class="casino-box-row">
                                  <div class="casino-nation-name">
                                    <b>Under 21</b>
                                    <div class="float-right">
                                      <span
                                        class="mr-2 casino-book"
                                        v-casinofancybook="{ sid: underover[0].sid, subid: 0 }"
                                        >0</span
                                      >
                                      <i
                                        class="fas fa-info-circle collapsed"
                                        data-toggle="collapse"
                                        data-target="#range3"
                                        aria-expanded="false"
                                      ></i>
                                      <div id="range3" class="icon-range collapse">
                                        R:<span v-kval="{ size: underover[0].min }"></span>-<span
                                          v-kval="{ size: underover[0].max }"
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="casino-bl-box">
                                    <div
                                      class="back casino-bl-box-item"
                                      :class="{ suspended: underover[0].gstatus != 'OPEN' }"
                                      
                                    >
                                      <span class="casino-box-odd">{{ underover[0].b }}</span>
                                    </div>
                                  </div>
                                  <div class="casino-nation-name">
                                    <b>Over 22</b>
                                    <div class="float-right">
                                      <span
                                        class="mr-2 casino-book"
                                        v-casinofancybook="{ sid: underover[1].sid, subid: 0 }"
                                        >0</span
                                      >
                                      <i
                                        class="fas fa-info-circle collapsed"
                                        data-toggle="collapse"
                                        data-target="#range4"
                                        aria-expanded="false"
                                      ></i>
                                      <div id="range4" class="icon-range collapse">
                                        R:<span v-kval="{ size: underover[1].min }"></span>-<span
                                          v-kval="{ size: underover[1].max }"
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="casino-bl-box">
                                    <div
                                      class="back casino-bl-box-item"
                                      :class="{ suspended: underover[1].gstatus != 'OPEN' }"
                                      
                                    >
                                      <span class="casino-box-odd">{{ underover[1].b }}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="teen1daycenter"></div>
                              <div class="teen1dayright">
                                <div class="casino-box-row d-none-big">
                                  <div class="casino-nation-name no-border casino-bl-box-title">
                                    <div class="playerb">Player B</div>
                                  </div>
                                  <div class="casino-bl-box casino-bl-box-title"></div>
                                </div>
                                <div class="casino-box-row">
                                  <div class="casino-nation-name">
                                    <b>Under 21</b>
                                    <div class="float-right">
                                      <span
                                        class="mr-2 casino-book"
                                        v-casinofancybook="{ sid: underover[2].sid, subid: 0 }"
                                        >0</span
                                      >
                                      <i
                                        class="fas fa-info-circle collapsed"
                                        data-toggle="collapse"
                                        data-target="#range5"
                                        aria-expanded="false"
                                      ></i>
                                      <div id="range5" class="icon-range collapse">
                                        R:<span v-kval="{ size: underover[2].min }"></span>-<span
                                          v-kval="{ size: underover[2].max }"
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="casino-bl-box">
                                    <div
                                      class="back casino-bl-box-item"
                                      :class="{ suspended: underover[2].gstatus != 'OPEN' }"
                                      
                                    >
                                      <span class="casino-box-odd">{{ underover[2].b }}</span>
                                    </div>
                                  </div>
                                  <div class="casino-nation-name">
                                    <b>Over 22</b>
                                    <div class="float-right">
                                      <span
                                        class="mr-2 casino-book"
                                        v-casinofancybook="{ sid: underover[3].sid, subid: 0 }"
                                        >0</span
                                      >
                                      <i
                                        class="fas fa-info-circle collapsed"
                                        data-toggle="collapse"
                                        data-target="#range6"
                                        aria-expanded="false"
                                      ></i>
                                      <div id="range6" class="icon-range collapse">
                                        R:<span v-kval="{ size: underover[3].min }"></span>-<span
                                          v-kval="{ size: underover[3].max }"
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="casino-bl-box">
                                    <div
                                      class="back casino-bl-box-item"
                                      :class="{ suspended: underover[3].gstatus != 'OPEN' }"
                                      
                                    >
                                      <span class="casino-box-odd">{{ underover[3].b }}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="tee2suit mt-1">
                            <div class="casino-bl-box tee2suitheader">
                              <template v-for="(odds, key) in orderBy(suit[0].odds, 'sno')">
                                <div class="casino-bl-box-item casino-card-img" :key="key">
                                  <span class="casino-box-odd">{{ odds.b }}</span>
                                </div>
                              </template>
                            </div>
                            <div class="casino-bl-box">
                              <template v-for="(odds, key) in orderBy(suit[0].odds, 'sno')">
                                <div
                                  :key="'suit' + key"
                                  class="casino-bl-box-item back casino-card-img"
                                  :class="{ suspended: suit[0].gstatus != 'OPEN' }"
                                  
                                >
                                  <img v-if="key == 0" :src="`${imgPath}front/img/cards/spade.png`" />
                                  <img v-if="key == 1" :src="`${imgPath}front/img/cards/heart.png`" />
                                  <img v-if="key == 2" :src="`${imgPath}front/img/cards/club.png`" />
                                  <img v-if="key == 3" :src="`${imgPath}front/img/cards/diamond.png`" />
                                  <span class="casino-book" v-casinofancybook="{ sid: suit[0].sid, subid: odds.sid }">0</span>
                                </div>
                              </template>
                            </div>
                            <div class="casino-min-max text-right mt-4">
                              R:<span v-kval="{ size: suit[0].min }"></span>-<span
                                v-kval="{ size: suit[0].max }"
                              ></span>
                            </div>
                          </div>
                          <div class="row row5 mt-3">
                            <div class="col-12 col-lg-4">
                              <div class="teen2eo">
                                <div class="casino-bl-box tee2eoheader">
                                  <template v-for="(odds, key) in oddEven[0].odds">
                                    <div
                                      class="casino-bl-box-item casino-card-img"
                                      :key="'oddevenods' + key"
                                    >
                                      <span class="casino-box-odd">{{ odds.b }}</span>
                                    </div>
                                  </template>
                                </div>
                                <div class="casino-bl-box">
                                  <template v-for="(odds, key) in oddEven[0].odds">
                                    <div
                                      class="casino-bl-box-item back"
                                      :key="'oddeven' + key"
                                      :class="{ suspended: oddEven[0].gstatus != 'OPEN' }"
                                      
                                    >
                                      <span class="casino-box-odd">{{ odds.nat }}</span>
                                      <span class="casino-book" v-casinofancybook="{ sid: oddEven[0].sid, subid: odds.sid }">0</span>
                                    </div>
                                  </template>
                                </div>
                              </div>
                              <div class="casino-min-max text-right mt-3">
                                R:<span v-kval="{ size: oddEven[0].min }"></span>-<span
                                  v-kval="{ size: oddEven[0].max }"
                                ></span>
                              </div>
                            </div>
                            <div class="col-12 col-lg-8">
                              <div class="teen2cards">
                                <div class="casino-cards text-center mt-1">
                                  <template v-for="(odds, key) in cardsdata[0].odds">
                                    <div class="casino-card-item" :key="'cards' + key">
                                      <div class="casino-box-odd">{{ odds.b }}</div>
                                      <div
                                        class="card-image"
                                        :class="{ suspended: cardsdata[0].gstatus != 'OPEN' }"
                                        
                                      >
                                        <img v-if="key == 0" :src="`${imgPath}front/img/cards/A.png`" />
                                        <img v-if="key == 1" :src="`${imgPath}front/img/cards/2.png`" />
                                        <img v-if="key == 2" :src="`${imgPath}front/img/cards/3.png`" />
                                        <img v-if="key == 3" :src="`${imgPath}front/img/cards/4.png`" />
                                        <img v-if="key == 4" :src="`${imgPath}front/img/cards/5.png`" />
                                        <img v-if="key == 5" :src="`${imgPath}front/img/cards/6.png`" />
                                        <img v-if="key == 6" :src="`${imgPath}front/img/cards/7.png`" />
                                        <img v-if="key == 7" :src="`${imgPath}front/img/cards/8.png`" />
                                        <img v-if="key == 8" :src="`${imgPath}front/img/cards/9.png`" />
                                        <img v-if="key == 9" :src="`${imgPath}front/img/cards/10.png`" />
                                        <img v-if="key == 10" :src="`${imgPath}front/img/cards/J.png`" />
                                        <img v-if="key == 11" :src="`${imgPath}front/img/cards/Q.png`" />
                                        <img v-if="key == 12" :src="`${imgPath}front/img/cards/K.png`" />
                                      </div>
                                      <div class="casino-book" v-casinofancybook="{ sid: cardsdata[0].sid, subid: odds.sid }">0</div>
                                    </div>
                                  </template>
                                </div>
                                <div class="casino-min-max text-right">
                                  R:<span v-kval="{ size: cardsdata[0].min }"></span>-<span
                                    v-kval="{ size: cardsdata[0].max }"
                                  ></span>
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
            main() {
              var main = _.filter(_.get(this.casinoData, "sub"), {
                subtype: "teen6",
              });
              return this.orderBy(main, "sr");
            },
            oddEven() {
              var oddEven = _.filter(_.get(this.casinoData, "sub"), (o) => {
                return o.subtype == "oddeven" && o.visible == 1;
              });
              var oddEvenSorted = this.orderBy(oddEven, "sr");
              oddEvenSorted.forEach((data) => {
                data.odds = _.orderBy(data.odds, "sno");
              });
              return oddEvenSorted;
            },
            suit() {
              var suit = _.filter(_.get(this.casinoData, "sub"), (o) => {
                return o.subtype == "suit" && o.visible == 1;
              });
              return this.orderBy(suit, "sr");
            },
            underover() {
              var underover = _.filter(_.get(this.casinoData, "sub"), {
                subtype: "uo",
              });
              return this.orderBy(underover, "sr");
            },
            cardsdata() {
              var cardsdata = _.filter(_.get(this.casinoData, "sub"), (o) => {
                return o.subtype == "cards" && o.visible == 1;
              });
              return this.orderBy(cardsdata, "sr");
            },
        },
        data() {
            return {
                showCards: true,
                showResults: true,
                imgPath: IMG_PATH,
                gameTitle: 'Teenpatti 2.0',
                gameType: 'teen6',
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