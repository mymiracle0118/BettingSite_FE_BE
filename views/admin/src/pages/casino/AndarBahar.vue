<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table andar-bahar">
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
                        <div class="casino-video-cards" :class="{'hide-cards': (!showCards || !baharAllSlider.length > 0)}">
                            <div class="casino-cards-shuffle" @click="toggleCards()">
                                <i class="fas fa-grip-lines-vertical"></i>
                            </div>
                            <div class="casino-video-cards-container">
                                <div class="ab-slider owl-carousel owl-theme" id="andarSlider"></div>
                                <div class="ab-slider owl-carousel owl-theme" id="baharSlider"></div>
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
                        <div class="ab-bg">
                            <div class="andar-cards-box text-center">
                                <h5 class="w-100 text-center text-playera">
                                    Andar
                                    <div class="casino-min-max">R:<span v-kval="{ size: main[0].min }">0</span>-<span v-kval="{ size: main[0].max }">0</span></div>
                                </h5>
                                <template v-for="(andar, key) in 13">
                                    <div class="casino-card-item" :key="`andar-${key}`">
                                        <template v-if="andarAll.length == 13">
                                            <div class=" card-image">
                                                <img :src="`${imgPath}front/img/andar-bahar-cards/${andarAll[key]}.png`">
                                            </div>
                                            <div class="casino-book" v-casinofancybook="{sid: main[key].sid, subid: 0}">0
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class=" card-image">
                                                <img :src="`${imgPath}front/img/andar-bahar-cards/${andar}.png`">
                                            </div>
                                            <div class="casino-book" v-casinofancybook="{sid: main[key].sid, subid: 0}">0
                                            </div>
                                        </template>
                                    </div>
                                </template>
                            </div>

                            <div class="bahar-cards-box text-center">
                                <h5 class="w-100 text-center text-playerb">
                                    Bahar
                                    <div class="casino-min-max">R:<span v-kval="{ size: main[0].min }">0</span>-<span v-kval="{ size: main[0].max }">0</span></div>
                                </h5>
                                <template v-for="(bahar, key) in 13">
                                    <div class="casino-card-item" :key="`bahar-${key}`">
                                        <template v-if="baharAll.length == 13">
                                            <div class=" card-image">
                                                <img :src="`${imgPath}front/img/andar-bahar-cards/${baharAll[key]}.png`">
                                            </div>
                                            <div class="casino-book" v-casinofancybook="{sid: main[key+13].sid, subid: 0}">0
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class=" card-image">
                                                <img :src="`${imgPath}front/img/andar-bahar-cards/${bahar}.png`">
                                            </div>
                                            <div class="casino-book" v-casinofancybook="{sid: main[key+13].sid, subid: 0}">0
                                            </div>
                                        </template>
                                    </div>
                                </template>
                            </div>
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
                    margin: 0,
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
                gameTitle: 'Andar Bahar',
                gameType: 'ab20',
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
                andarAllSlider: [],
                baharAllSlider: [],
                andarAllLength: 0,
                baharAllLength: 0,
                andarAll: [],
                baharAll: []
               
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
                if (this.baharAllSlider.length > 0) {
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

                            this.casinoData.ares != '' ? this.andarAll = this.casinoData.ares.split(",") : this
                                .andarAll = []
                            this.casinoData.bres != '' ? this.baharAll = this.casinoData.bres.split(",") : this
                                .baharAll = []


                            this.casinoData.aall != '' ? this.andarAllSlider = this.casinoData.aall.split(",")
                                .reverse() : this.andarAllSlider = []
                            this.casinoData.ball != '' ? this.baharAllSlider = this.casinoData.ball.split(",")
                                .reverse() : this.baharAllSlider = []

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
                                this.andarAllLength = this.andarAllSlider.length
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
                                this.baharAllLength = this.baharAllSlider.length
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