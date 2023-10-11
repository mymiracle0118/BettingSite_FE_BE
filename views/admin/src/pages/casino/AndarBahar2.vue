<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table andar-bahar2">
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
                        <div class="casino-video-cards d-none-small" :class="{'hide-cards': (!showCards || cards[0] == '1')}">
                            <div class="casino-cards-shuffle" @click="toggleCards(cards[0])">
                                <i class="fas fa-grip-lines-vertical"></i>
                            </div>
                            <div class="casino-video-cards-container">

                                <div class="row row5 align-items-center">
                                    <div class="col-1">
                                        <div class="row row5">
                                            <div class="col-12 mb-3">
                                                <b>A</b>
                                            </div>
                                        </div>
                                        <div class="row row5">
                                            <div class="col-12">
                                                <b>B</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <span>
                                            <img class="card-right" :src="imgPath+ 'front/img/cards/'+ cards[0]+ '.png'">
                                        </span>
                                    </div>
                                    <div class="col-9">
                                        <div class="card-inner mb-1">
                                            <div class="row row5">
                                                <div class="col-3">
                                                    <span>
                                                        <img :src="imgPath+ 'front/img/cards/'+ cards[2]+ '.png'">
                                                    </span>
                                                </div>
                                                <div class="col-9">
                                                    <div class="ab-slider owl-carousel owl-theme" id="andarSlider"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-inner">
                                            <div class="row row5">
                                                <div class="col-3">
                                                    <span>
                                                        <img :src="imgPath+ 'front/img/cards/'+ cards[1]+ '.png'">
                                                    </span>
                                                </div>
                                                <div class="col-9">
                                                    <div class="ab-slider owl-carousel owl-theme" id="baharSlider"></div>
                                                </div>
                                            </div>
                                        </div>
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
                        <div class="casino-video-cards d-none-desktop" v-if="$store.getters.isMobile">
                            <div class="casino-video-cards-container">
                                <div class="row row5 align-items-center">
                                    <div class="col-1">
                                        <div class="row row5">
                                            <div class="col-12">
                                                <b>A</b>
                                            </div>
                                        </div>
                                        <div class="row row5">
                                            <div class="col-12">
                                                <b>B</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <span>
                                            <img class="card-right" :src="imgPath+ 'front/img/cards/'+ cards[0]+ '.png'">
                                        </span>
                                    </div>
                                    <div class="col-9">
                                        <div class="card-inner">
                                            <div class="row row5">
                                                <div class="col-3">
                                                    <span>
                                                        <img :src="imgPath+ 'front/img/cards/'+ cards[2]+ '.png'">
                                                    </span>
                                                </div>
                                                <div class="col-9">
                                                    <div class="ab-slider owl-carousel owl-theme" id="andarSliderMob"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-inner">
                                            <div class="row row5 mt-1">
                                                <div class="col-3">
                                                    <span>
                                                        <img :src="imgPath+ 'front/img/cards/'+ cards[1]+ '.png'">
                                                    </span>
                                                </div>
                                                <div class="col-9">
                                                    <div class="ab-slider owl-carousel owl-theme" id="baharSliderMob"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="teen20casino-container">
                            <div class="teen20left">
                                <div class="ab2-title">A</div>
                                <div class="sa-sb-box" :class="{'suspended' : main[0].gstatus !== 'OPEN' }">
                                    <div>{{ main[0].nat }}</div>
                                    <div>{{ main[0].b }}</div>
                                    <div class="ab-book" v-casinofancybook="{sid: main[0].sid}"></div>
                                </div>
                                <div class="ab2-bet" :class="{'suspended' : main[1].gstatus !== 'OPEN' }">
                                    <div>{{ main[1].nat }}</div>
                                    <div>{{ main[1].b }}</div>
                                    <div class="ab-book" v-casinofancybook="{sid: main[1].sid}"></div>
                                </div>
                                <div class="ab2-bet" :class="{'suspended' : main[2].gstatus !== 'OPEN' }">
                                    <div>{{ main[2].nat }}</div>
                                    <div>{{ main[2].b }}</div>
                                    <div class="ab-book" v-casinofancybook="{sid: main[2].sid}"></div>
                                </div>
                                <div class="ab2-title">A</div>
                            </div>
                            <div class="teen20center"></div>
                            <div class="teen20right">
                                <div class="ab2-title">B</div>
                                <div class="sa-sb-box" :class="{'suspended' : main[3].gstatus !== 'OPEN' }">
                                    <div>{{ main[3].nat }}</div>
                                    <div>{{ main[3].b }}</div>
                                    <div class="ab-book" v-casinofancybook="{sid: main[3].sid}"></div>
                                </div>
                                <div class="ab2-bet" :class="{'suspended' : main[4].gstatus !== 'OPEN' }">
                                    <div>{{ main[4].nat }}</div>
                                    <div>{{ main[4].b }}</div>
                                    <div class="ab-book" v-casinofancybook="{sid: main[4].sid}"></div>
                                </div>
                                <div class="ab2-bet" :class="{'suspended' : main[5].gstatus !== 'OPEN' }">
                                    <div>{{ main[5].nat }}</div>
                                    <div>{{ main[5].b }}</div>
                                    <div class="ab-book" v-casinofancybook="{sid: main[5].sid}"></div>
                                </div>
                                <div class="ab2-title">B</div>
                            </div>
                        </div>
                        <div class="teen20casino-container">
                            <div class="teen20left ab2oddeven">
                                <div class="casino-box-row">
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item">
                                            <b>Odd</b>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item">
                                            <b>Even</b>
                                        </div>
                                    </div>
                                </div>
                                <div class="casino-box-row">
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended' : main[23].gstatus !== 'OPEN' }">
                                            <span class="casino-box-odd">{{ main[23].b }}</span>
                                            
                                        </div>
                                        <span class="casino-book" v-casinofancybook="{sid: main[23].sid}"></span>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended' : main[24].gstatus !== 'OPEN' }">
                                            <span class="casino-box-odd">{{ main[24].b }}</span>
                                        </div>
                                        <span class="casino-book" v-casinofancybook="{sid: main[24].sid}"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="teen20center"></div>
                            <div class="teen20left ab2cards">
                                <div class="casino-box-row">
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item casino-card-img">
                                            <img :src="imgPath+'front/img/cards/spade.png'">
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item casino-card-img">
                                            <img :src="imgPath+'front/img/cards/heart.png'">
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item casino-card-img">
                                            <img :src="imgPath+'front/img/cards/club.png'">
                                        </div>
                                    </div>
                                    
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item casino-card-img">
                                            <img :src="imgPath+'front/img/cards/diamond.png'">
                                        </div>
                                    </div>
                                </div>
                                <div class="casino-box-row">
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended' : main[19].gstatus !== 'OPEN' }">
                                            <span class="casino-box-odd">{{ main[19].b }}</span>
                                            
                                        </div>
                                        <span class="casino-book" v-casinofancybook="{sid: main[19].sid}"></span>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended' : main[21].gstatus !== 'OPEN' }">
                                            <span class="casino-box-odd">{{ main[21].b }}</span>
                                            
                                        </div>
                                        <span class="casino-book" v-casinofancybook="{sid: main[21].sid}"></span>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended' : main[20].gstatus !== 'OPEN' }">
                                            <span class="casino-box-odd">{{ main[20].b }}</span>
                                            
                                        </div>
                                        <span class="casino-book" v-casinofancybook="{sid: main[20].sid}"></span>
                                    </div>
                                    
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item" :class="{'suspended' : main[22].gstatus !== 'OPEN' }">
                                            <span class="casino-box-odd">{{ main[22].b }}</span>
                                            
                                        </div>
                                        <span class="casino-book" v-casinofancybook="{sid: main[22].sid}"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="teen20casino-container ab2allcards">
                            <div class="text-center w-100 ">
                                <div class="casino-bl-box casino-cards-odds-title">
                                    <div class="casino-bl-box-item">
                                        <b>{{ main[6].b }}</b>
                                    </div>
                                </div>
                            </div>
                            <div class="casino-cards text-center mt-1">
                                <div class="casino-card-item"  v-for="n in 13">
                                    <div class="card-image" :class="{'suspended': main[n+5].gstatus !== 'OPEN' }">
                                        <img v-if="n==1" :src="imgPath+'front/img/cards/A.png'">   
                                        <img v-else-if="n==11" :src="imgPath+'front/img/cards/J.png'">
                                        <img v-else-if="n==12" :src="imgPath+'front/img/cards/Q.png'">
                                        <img v-else-if="n==13" :src="imgPath+'front/img/cards/K.png'"> 
                                        <img v-else :src="imgPath+'front/img/cards/'+n+'.png'">  
                                    </div>
                                    <div class="casino-book" v-casinofancybook="{sid: main[n+5].sid}">0</div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="text-right casino-min-max">R:<span v-kval="{size: main[0].min}"></span>-<span
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
    import CasinoRules from '@/components/casino/CasinoRules'
    import LastResultsSection from '@/components/casino/LastResultsSection'
    
    export default {
        mounted() {
            
            this.getTvUrl();
            this.getCasinoData()
            this.getUserBook()
            this.getLastResults()
            setTimeout(function(){
                $("#andarSlider, #baharSlider").owlCarousel({
                    rtl: true,
                    loop: false,
                    margin: 10,
                    slideBy: 4,
                    nav: true,
                    responsiveClass: true,
                    dots: false,
                    responsive: {
                        0: {
                            items: 3
                        },
                        320: {
                            items: 3
                        },
                        768: {
                            items: 4
                        }
                    }
                });

               
            },1000)
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
                gameTitle: 'Andar Bahar 2',
                gameType: 'abj',
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

                            this.andarAllSlider = []
                            this.baharAllSlider = []

                            this.cards.forEach((card, index) => {
                                if (card == 1) {
                                    return
                                }
                                if (index > 2) {
                                    if (index % 2 != 0) {
                                        this.baharAllSlider.push(card)
                                    } else {
                                        this.andarAllSlider.push(card)
                                    }
                                }
                            });

                            let andarAllSliderHtml = ""
                            if (this.andarAllSlider.length > 0) {
                                this.andarAllSlider.forEach(card => {
                                    let cardPath = `${this.imgPath}front/img/cards/${card}.png`
                                    andarAllSliderHtml +=
                                        `<div class="item"><span><img src="${cardPath}"></span></div>`
                                });
                                // if (this.andarAllLength != this.andarAllSlider.length) {
                                $("#andarSlider")
                                    .trigger("replace.owl.carousel", andarAllSliderHtml)
                                    .trigger("refresh.owl.carousel");
                                // }
                                // console.log('a here')
                                // this.andarAllLength = this.andarAllSlider.length
                            } else {
                                $("#andarSlider")
                                    .trigger("replace.owl.carousel", '<div/>')
                                    .trigger("refresh.owl.carousel");
                                this.andarAllLength = 0
                            }

                            let baharAllSliderHtml = ""
                            if (this.baharAllSlider.length > 0) {
                                this.baharAllSlider.forEach(card => {
                                    let cardPath = `${this.imgPath}front/img/cards/${card}.png`
                                    baharAllSliderHtml +=
                                        `<div class="item"><span><img src="${cardPath}"></span></div>`
                                });

                                // if (this.baharAllLength != this.baharAllSlider.length) {
                                $("#baharSlider")
                                    .trigger("replace.owl.carousel", baharAllSliderHtml)
                                    .trigger("refresh.owl.carousel");
                                // }
                                // console.log('b here')
                                // this.baharAllLength = this.baharAllSlider.length
                            } else {
                                $("#baharSlider")
                                    .trigger("replace.owl.carousel", '<div/>')
                                    .trigger("refresh.owl.carousel");
                                this.baharAllLength = 0
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
                if (this.callBookApi == true) {
                    this.userExp = this.$store.state.user.exp; 
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
                }
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