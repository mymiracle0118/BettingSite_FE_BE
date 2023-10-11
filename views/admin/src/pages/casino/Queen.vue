<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table casino-queen">
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
                                    <div class="dealer-name w-100 mb-1">
                                        <span :class="{'text-success': playersCards.p1Total >= playersCards.p2Total && playersCards.p1Total >= playersCards.p3Total && playersCards.p1Total >= playersCards.p4Total  }">{{ main[0].nat }}: </span>
                                        <span class="text-warning ml-1">{{ playersCards.p1Total }}</span>
                                    </div>
                                    <div>
                                        <template v-for="(card, key) in playersCards.p1">
                                            <Card :card="card" />
                                        </template>
                                    </div>
                                </div>
                                <div>
                                    <div class="dealer-name w-100 mb-1">
                                        <span :class="{'text-success' : playersCards.p2Total >= playersCards.p1Total && playersCards.p2Total >= playersCards.p3Total && playersCards.p2Total >= playersCards.p4Total}">{{ main[1].nat }}: </span>
                                        <span class="text-warning ml-1">{{ playersCards.p2Total }}</span>
                                    </div>
                                    <div>
                                        <template v-for="(card, key) in playersCards.p2">
                                            <Card :card="card" />
                                        </template>
                                    </div>
                                </div>
                                <div>
                                    <div class="dealer-name w-100 mb-1">
                                        <span :class="{'text-success' : playersCards.p3Total >= playersCards.p1Total && playersCards.p3Total >= playersCards.p2Total && playersCards.p3Total >= playersCards.p4Total}">{{ main[2].nat }}: </span>
                                        <span class="text-warning ml-1">{{ playersCards.p3Total }}</span>
                                    </div>
                                    <div>
                                        <template v-for="(card, key) in playersCards.p3">
                                            <Card :card="card" />
                                        </template>
                                    </div>
                                </div>
                                <div>
                                    <div class="dealer-name w-100 mb-1">
                                        <span :class="{'text-success' : playersCards.p4Total >= playersCards.p1Total && playersCards.p4Total >= playersCards.p2Total && playersCards.p4Total >= playersCards.p3Total}">{{ main[3].nat }}: </span>
                                        <span class="text-warning ml-1">{{ playersCards.p4Total }}</span>
                                    </div>
                                    <div>
                                        <template v-for="(card, key) in playersCards.p4">
                                            <Card :card="card" />
                                        </template>
                                    </div>
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
                            <!-- <div class="casino-video-rules-icon" v-b-modal.rules-modal title="Rules">
                                <i class="fas fa-info-circle"></i>
                            </div>
                            <b-modal id="rules-modal" modal-class="casino-rules" title="Rules" hide-footer>
                            <img :src="`${imgPath}front/img/casino-rules/${gameType}.jpg`" class="img-fluid">
                            </b-modal> -->
                            <div class="casino-video-lr-icon" @click="showResults = !showResults" title="Last Results">
                                <i class="fas" :class="[{'fa-chevron-circle-down':!showResults},{'fa-chevron-circle-up':showResults}]"></i>
                            </div>
                        </div>
                        <LastResultsSection v-if="$store.getters.isTablet" :gtype="gameType" :lastResults="lastResults" :showResults="showResults" />
                        
                    </div>
                    <div class="casino-detail" v-if="casinoData && casinoData.mid">
                        <template v-if="$store.getters.isTablet">
                        <div class="row">
                            <div class="col-3" v-for="(data, key) in main">
                                <div class="casino-box-row">
                                    <div class="casino-nation-name">
                                        <b>{{ data.nat}}</b>
                                    </div>
                                    <div class="casino-bl-box" :class="{'suspended': data.gstatus != 'OPEN'}">
                                        <div class="back casino-bl-box-item" data-toggle="modal" data-target="#casino-betslip">
                                            <span class="casino-box-odd">{{ data.b }}</span>
                                            <!-- <span v-kval="{size: data.bs}"></span> -->
                                        </div>
                                        <div class="lay casino-bl-box-item">
                                            <span class="casino-box-odd">{{ data.l}}</span>
                                            <!-- <span v-kval="{size: data.ls}"></span> -->
                                        </div>
                                    </div>
                                    <div class="casino-nation-name">
                                        <span class="casino-book" v-casinobook="{sid: data.sid}"></span>
                                    </div>
                                </div>
                            </div>
                            
                           
                        </div> 
                        </template>
                        <template v-if="!$store.getters.isTablet">
                          <div class="row row5 d-none-big">
                            <template v-for="(data, key) in main">
                              <div class="casino-bl-box" :key="key">
                                <div class="casino-bl-box-item casino-odds-name">
                                  <b>{{ data.nat }}</b>
                                  <span class="float-right" v-casinobook="{ sid: data.sid }">0</span>
                                </div>
                                <div class="back casino-bl-box-item" :class="{ suspended: data.gstatus != 'OPEN' }">
                                  <span class="casino-box-odd">{{ data.b }}</span>
                                 <!--  <span>{{ data.bs }}</span> -->
                                </div>
                                <div class="lay casino-bl-box-item" :class="{ suspended: data.gstatus != 'OPEN' }">
                                  <span class="casino-box-odd">{{ data.l }}</span>
                                 <!--  <span>{{ data.ls }}</span> -->
                                </div>
                              </div>
                            </template>
                          </div>
                        </template>
                         <div class="col-12 text-right casino-min-max">R:<span v-kval="{size: main[0].min}"></span>-<span
                                                        v-kval="{size: main[0].max}"></span></div>

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
            LastResultsSection
        },
        computed: {
            main() {
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
                gameTitle: 'Queen',
                gameType: 'queen',
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
                }
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

                        if(this.casinoData != null){
                            var p1 = []
                            var p2 = []
                            var p3 = [] 
                            var p4 = []
                            let playerNo = 1;
                            let p1Total = 0;let p2Total = 0;let p3Total = 0;let p4Total = 0;
                            for(const card of this.cards){
                                if(playerNo > 4)
                                    playerNo = 1;
                                
                                if (card != "1") {
                                  if (playerNo == 1){ 
                                    p1.push(card);
                                    if(card.charAt(0) == "Q"){
                                      p1Total += 12;
                                    }else if(parseInt(card.charAt(0)) != 1){
                                      p1Total += parseInt(card.charAt(0));
                                    }
                                  }
                                  if (playerNo == 2){ 
                                    p2.push(card);
                                    if(card.charAt(0) == "Q"){
                                      p2Total += 12;
                                    }else if(parseInt(card.charAt(0)) != 1){
                                      p2Total += parseInt(card.charAt(0));
                                    }
                                  }

                                  if (playerNo == 3){ 
                                    p3.push(card);
                                    if(card.charAt(0) == "Q"){
                                      p3Total += 12;
                                    }else if(parseInt(card.charAt(0)) != 1){
                                      p3Total += parseInt(card.charAt(0));
                                    }
                                  }

                                  if (playerNo == 4){ 
                                    p4.push(card);
                                    if(card.charAt(0) == "Q"){
                                      p4Total += 12;
                                    }else if(parseInt(card.charAt(0)) != 1){
                                      p4Total += parseInt(card.charAt(0));
                                    }
                                  }
                                }
                                playerNo++;
                            }
                            //this.playersCards.p1 = p1;
                            Vue.set(this.playersCards, 'p1', p1)
                            Vue.set(this.playersCards, 'p2', p2)
                            Vue.set(this.playersCards, 'p3', p3)
                            Vue.set(this.playersCards, 'p4', p4)

                            p2Total = (p2Total > 0) ? p2Total + 1 : p2Total;
                            p3Total = (p3Total > 0) ? p3Total + 2 : p3Total;
                            p4Total = (p4Total > 0) ? p4Total + 3 : p4Total;
                            
                            Vue.set(this.playersCards, "p1Total", p1Total);
                            Vue.set(this.playersCards, "p2Total", p2Total);
                            Vue.set(this.playersCards, "p3Total", p3Total);
                            Vue.set(this.playersCards, "p4Total", p4Total);
                        }
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