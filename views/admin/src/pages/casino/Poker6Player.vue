<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table poker6player">
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
                            <div class="casino-video-cards" :class="{'hide-cards': (!showCards || cards[12] == '1')}">
                                <div class="casino-cards-shuffle" @click="toggleCards(cards[0])">
                                    <i class="fas fa-grip-lines-vertical"></i>
                                </div>
                                <div class="casino-video-cards-container">
                                    <div>
                                    <Card :card="cards[12]" />
                                    <Card :card="cards[13]" />
                                    <Card :card="cards[14]" />
                                    <Card :card="cards[15]" />
                                    <Card :card="cards[16]" />
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
                        <template v-if="casinoData.rdesc">
                            <div class="poker-result-board">
                                <div class="d-inline-block">
                                    <div class="d-inline-block">
                                        <span>{{ casinoData.rdesc.split('||')[0] }}</span>
                                    </div>
                                </div>
                                <div class="d-inline-block ml-2">
                                    <b>{{ casinoData.rdesc.split('||')[1] }}</b>
                                </div>
                            </div>
                        </template>

                        <template v-if="$store.getters.isTablet">
                        <div class="d-none-small">
                            <div class="casino-box">
                                <div class="teen1daycasino-container">
                                    <div class="teen1dayleft">
                                        <h4 class="playera">Hands</h4>
                                        <div class="casino-row-container">
                                            <template v-for="(i, key) in 6">
                                                <div class="casino-col-container" :key="`hands-${key}`">
                                                    <div class="casino-box-row">
                                                        <div class="w-100 mb-1 pr">
                                                            <b>{{ main[i-1].nat }}</b>
                                                            <div class="float-right">
                                                                <i class="fas fa-info-circle" data-toggle="collapse"
                                                                    :data-target="`#hands-${i-1}`"></i>
                                                                <div :id="`hands-${i-1}`" class="collapse icon-range">
                                                                    R:<span v-kval="{size: main[i-1].min}"></span>-<span
                                                                        v-kval="{size: main[i-1].max}"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="poker6box"
                                                            :class="{'suspended': main[i-1].gstatus != 'OPEN'}"
                                                            >
                                                            <div class="casino-nation-name">
                                                                <div>
                                                                    <span class="player-card">
                                                                        <Card :card="cards[i-1]" />
                                                                    </span>
                                                                    <span class="player-card">
                                                                        <Card :card="cards[i+5]" />
                                                                    </span>
                                                                </div>
                                                                <span class="float-right mr-1">
                                                                    <b class="d-block text-right">{{ main[i-1].b }}</b>
                                                                    
                                                                </span>
                                                            </div>
                                                            
                                                        </div>
                                                        <div class="casino-book text-center w-100" v-casinofancybook="{sid: main[i-1].sid, subid: 0}"></div>
                                                    </div>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="teen1daycenter"></div>
                                    <div class="teen1dayright pattern">
                                        <h4>Pattern</h4>
                                        <div class="casino-row-container">
                                            <template v-for="(i, key) in 9">
                                                <div class="casino-col-container"
                                                    :class="{'fullbox': i == 7 || i == 8 || i == 9 }"
                                                    :key="`pattern-${key}`">
                                                    <div class="casino-box-row">
                                                        <div class="w-100 mb-1 pr">
                                                            <div class="float-right">
                                                                <i class="fas fa-info-circle" data-toggle="collapse"
                                                                    :data-target="`#pattern-${i+5}`"></i>
                                                                <div :id="`pattern-${i+5}`" class="collapse icon-range">
                                                                    R:<span v-kval="{size: main[i+5].min}"></span>-<span
                                                                        v-kval="{size: main[i+5].max}"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="poker6box"
                                                            :class="{'suspended': main[i+5].gstatus != 'OPEN'}"
                                                            >
                                                            <div class="casino-nation-name">
                                                                <b>{{ main[i+5].nat }}</b>
                                                                <span
                                                                    class="d-block text-right"><b>{{ main[i+5].b }}</b></span>
                                                                
                                                            </div>
                                                        </div>
                                                        <div class="casino-book text-center w-100" v-casinofancybook="{sid: main[i+5].sid, subid: 0}"></div>
                                                    </div>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>     
                        </template>
                        
                        <template v-if="!$store.getters.isTablet">
                        <div class="casino-tabs">
                            <ul class="nav nav-tabs">
                                <li class="nav-item">
                                    <a href="#hands" class="nav-link active" data-toggle="tab">Hands</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#pattern" class="nav-link" data-toggle="tab">Pattern</a>
                                </li>
                            </ul>
                        </div>
                        <div class="casino-box mb-2 tab-content">
                            <div class="tab-pane active hands" id="hands">
                                <div class="casino-row-container">
                                    <template v-for="(i, key) in 6">
                                        <div class="casino-col-container" :key="`hands-${key}`">
                                            <div class="casino-box-row">
                                                <div class="w-100 mb-1 pr">
                                                    <b>{{ main[i-1].nat }}</b>
                                                    <div class="float-right">
                                                        <i class="fas fa-info-circle" data-toggle="collapse"
                                                            :data-target="`#hands-${i-1}`"></i>
                                                        <div :id="`hands-${i-1}`" class="collapse icon-range">
                                                            R:<span v-kval="{size: main[i-1].min}"></span>-<span
                                                                v-kval="{size: main[i-1].max}"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="poker6box" :class="{'suspended': main[i-1].gstatus != 'OPEN'}"
                                                    >
                                                    <div class="casino-nation-name">
                                                        <div>
                                                            <span class="player-card">
                                                                <Card :card="cards[i-1]" />
                                                            </span>
                                                            <span class="player-card">
                                                                <Card :card="cards[i+5]" />
                                                            </span>
                                                        </div>
                                                        <span class="text-right mr-1 flex-odds">
                                                            <b class="d-block w-100">{{ main[i-1].b }}</b>
                                                            <span class="w-100" v-casinofancybook="{sid: main[i-1].sid, subid: 0}">0</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </template>
                                </div>
                            </div>
                            <div class="tab-pane fade pattern" id="pattern">
                                <div class="casino-row-container">
                                    <template v-for="(i, key) in 9">
                                        <div class="casino-col-container" :key="`pattern-${key}`">
                                            <div class="casino-box-row">
                                                <div class="w-100 mb-1 pr">
                                                    <div class="float-right">
                                                        <i class="fas fa-info-circle" data-toggle="collapse"
                                                            :data-target="`#pattern-${i+5}`"></i>
                                                        <div :id="`pattern-${i+5}`" class="collapse icon-range">
                                                            R:<span v-kval="{size: main[i+5].min}"></span>-<span
                                                                v-kval="{size: main[i+5].max}"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="poker6box" :class="{'suspended': main[i+5].gstatus != 'OPEN'}"
                                                    >
                                                    <div class="casino-nation-name">
                                                        <div>
                                                            <b>{{ main[i+5].nat }}</b>
                                                        </div>
                                                        <span class="text-right mr-1 flex-odds">
                                                            <b class="d-block w-100">{{ main[i+5].b }}</b>
                                                            <span class="w-100" v-casinofancybook="{sid: main[i+5].sid, subid: 0}">0</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </template>
                                </div>
                            </div>
                        </div>
                    </template>

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
                var player = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'poker6'
                })
                return this.orderBy(player, 'sr')
            }
        },
        data() {
            return {
                showCards: true,
                showResults: true,
                imgPath: IMG_PATH,
                gameTitle: 'Poker 6 Players',
                gameType: 'poker6',
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