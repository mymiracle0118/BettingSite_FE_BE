<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table dt20">
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
                                        <Card :card="cards[1]" />
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
                        <div class="text-right w-100 pr">
                            <div class="float-right">
                                <i class="fas fa-info-circle" data-toggle="collapse" data-target="#demo1"></i>
                                <div id="demo1" class="collapse icon-range">
                                    Range:<span v-kval="{size: main[0].min}"></span>-<span v-kval="{size: main[0].max}"></span>
                                </div>
                            </div>
                        </div>
                        <div class="dtobx-top">
                            <div class="dragon-box" :class="{'suspended': main[0].gstatus != 'OPEN'}"
                                >
                                <div><b>Dragon</b></div>
                                <div class="text-center">
                                    <span class="d-block"><b>{{ main[0].b }}</b></span>
                                    <span class="d-block casino-book" v-casinofancybook="{sid: main[0].sid, subid: 0}">0</span>
                                </div>
                            </div>
                            <div class="tiebox" :class="{'suspended': main[2].gstatus != 'OPEN'}"
                                >
                                <div><b>Tie</b></div>
                                <div class="text-center">
                                    <span class="d-block"><b>{{ main[2].b }}</b></span>
                                    <span class="d-block casino-book" v-casinofancybook="{sid: main[2].sid, subid: 0}">0</span>
                                </div>
                            </div>
                            <div class="tiger-box" :class="{'suspended': main[1].gstatus != 'OPEN'}"
                                >
                                <div><b>Tiger</b></div>
                                <div class="text-center">
                                    <span class="d-block"><b>{{ main[1].b }}</b></span>
                                    <span class="d-block casino-book" v-casinofancybook="{sid: main[1].sid, subid: 0}">0</span>
                                </div>
                            </div>
                            <div class="pair-box" :class="{'suspended': main[3].gstatus != 'OPEN'}"
                                >
                                <div><b>Pair</b></div>
                                <div class="text-center">
                                    <span class="d-block"><b>{{ main[3].b }}</b></span>
                                    <span class="d-block casino-book" v-casinofancybook="{sid: main[3].sid, subid: 0}">0</span>
                                </div>
                            </div>
                        </div>

                        <div class="teen1daycasino-container mt-5">
                            <div class="teen1dayleft">
                                <div>
                                    <div class="casino-box-row justify-content-center casino-odds casino-title">
                                        <div class="text-left w-100">
                                            <b class="text-playera">Dragon</b>
                                            <div class="float-right">
                                                <i class="fas fa-info-circle" data-toggle="collapse" data-target="#demo2"></i>
                                                <div id="demo2" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[4].min}"></span>-<span
                                                        v-kval="{size: main[4].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-bl-box">
                                            <b>{{ main[4].b }}</b>
                                        </div>
                                        <div class="casino-bl-box">
                                            <b>{{ main[5].b }}</b>
                                        </div>
                                        <div class="casino-bl-box">
                                            <b>{{ main[6].b }}</b>
                                        </div>
                                        <div class="casino-bl-box">
                                            <b>{{ main[7].b }}</b>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-bl-box" :class="{'suspended': main[4].gstatus != 'OPEN'}"
                                            >
                                            <div class="back casino-bl-box-item">
                                                <span class="casino-box-odd">Even</span>
                                                <span class="casino-book" v-casinofancybook="{sid: main[4].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box" :class="{'suspended': main[5].gstatus != 'OPEN'}"
                                            >
                                            <div class="back casino-bl-box-item">
                                                <span class="casino-box-odd">Odd</span>
                                                <span class="casino-book" v-casinofancybook="{sid: main[5].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box" :class="{'suspended': main[7].gstatus != 'OPEN'}"
                                            >
                                            <div class="back casino-bl-box-item casino-card-img">
                                                <span>
                                                    <img :src="`${imgPath}front/img/cards/spade.png`">
                                                    <img :src="`${imgPath}front/img/cards/club.png`">
                                                </span>
                                                <span class="casino-book" v-casinofancybook="{sid: main[7].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box" :class="{'suspended': main[6].gstatus != 'OPEN'}"
                                            >
                                            <div class="back casino-bl-box-item casino-card-img">
                                                <span>
                                                    <img :src="`${imgPath}front/img/cards/heart.png`">
                                                    <img :src="`${imgPath}front/img/cards/diamond.png`">
                                                </span>
                                                <span class="casino-book" v-casinofancybook="{sid: main[6].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="casino-box cards-box">
                                    <div class="w-100">
                                        <div class="casino-odds casino-cards-odds-title">
                                            <div class="text-center w-100">
                                                <b>{{ main[8].b }}</b>
                                                <div class="float-right">
                                                    <i class="fas fa-info-circle" data-toggle="collapse"
                                                        data-target="#demo3"></i>
                                                    <div id="demo3" class="collapse icon-range">
                                                        R:<span v-kval="{size: main[8].min}"></span>-<span
                                                            v-kval="{size: main[8].max}"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-cards text-center mt-1">
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[8].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/A.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[8].sid, subid: 0}">0
                                                </div>
                                            </div>
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[9].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/2.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[9].sid, subid: 0}">0
                                                </div>
                                            </div>
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[10].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/3.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[10].sid, subid: 0}">0
                                                </div>
                                            </div>
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[11].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/4.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[11].sid, subid: 0}">0
                                                </div>
                                            </div>
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[12].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/5.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[12].sid, subid: 0}">0
                                                </div>
                                            </div>
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[13].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/6.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[13].sid, subid: 0}">0
                                                </div>
                                            </div>
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[14].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/7.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[14].sid, subid: 0}">0
                                                </div>
                                            </div>

                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[15].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/8.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[15].sid, subid: 0}">0
                                                </div>
                                            </div>
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[16].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/9.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[16].sid, subid: 0}">0
                                                </div>
                                            </div>
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[17].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/10.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[17].sid, subid: 0}">0
                                                </div>
                                            </div>
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[18].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/J.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[18].sid, subid: 0}">0
                                                </div>
                                            </div>
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[19].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/Q.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[19].sid, subid: 0}">0
                                                </div>
                                            </div>
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[20].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/K.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[20].sid, subid: 0}">0
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                            <div class="teen1daycenter"></div>
                            <div class="teen1dayright">
                                <div>
                                    <div class="casino-box-row justify-content-center casino-odds casino-title">
                                        <div class="text-left w-100">
                                            <b class="text-playerb">Tiger</b>
                                            <div class="float-right">
                                                <i class="fas fa-info-circle" data-toggle="collapse" data-target="#demo4"></i>
                                                <div id="demo4" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[21].min}"></span>-<span
                                                        v-kval="{size: main[21].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-bl-box">
                                            <b>{{ main[21].b }}</b>
                                        </div>
                                        <div class="casino-bl-box">
                                            <b>{{ main[22].b }}</b>
                                        </div>
                                        <div class="casino-bl-box">
                                            <b>{{ main[23].b }}</b>
                                        </div>
                                        <div class="casino-bl-box">
                                            <b>{{ main[24].b }}</b>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-bl-box" :class="{'suspended': main[21].gstatus != 'OPEN'}"
                                            >
                                            <div class="back casino-bl-box-item">
                                                <span class="casino-box-odd">Even</span>
                                                <span class="casino-book" v-casinofancybook="{sid: main[21].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box" :class="{'suspended': main[22].gstatus != 'OPEN'}"
                                            >
                                            <div class="back casino-bl-box-item">
                                                <span class="casino-box-odd">Odd</span>
                                                <span class="casino-book" v-casinofancybook="{sid: main[22].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box" :class="{'suspended': main[24].gstatus != 'OPEN'}"
                                            >
                                            <div class="back casino-bl-box-item casino-card-img">
                                                <span>
                                                    <img :src="`${imgPath}front/img/cards/spade.png`">
                                                    <img :src="`${imgPath}front/img/cards/club.png`">
                                                </span>
                                                <span class="casino-book" v-casinofancybook="{sid: main[24].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box" :class="{'suspended': main[23].gstatus != 'OPEN'}"
                                            >
                                            <div class="back casino-bl-box-item casino-card-img">
                                                <span>
                                                    <img :src="`${imgPath}front/img/cards/heart.png`">
                                                    <img :src="`${imgPath}front/img/cards/diamond.png`">
                                                </span>
                                                <span class="casino-book" v-casinofancybook="{sid: main[23].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="casino-box cards-box">
                                    <div class="w-100">
                                        <div class="casino-odds casino-cards-odds-title">
                                            <div class="text-center w-100">
                                                <b>{{ main[25].b }}</b>
                                                <div class="float-right">
                                                    <i class="fas fa-info-circle" data-toggle="collapse"
                                                        data-target="#demo5"></i>
                                                    <div id="demo5" class="collapse icon-range">
                                                        R:<span v-kval="{size: main[25].min}"></span>-<span
                                                            v-kval="{size: main[25].max}"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-cards text-center mt-1">
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[25].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/A.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[25].sid, subid: 0}">0
                                                </div>
                                            </div>
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[26].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/2.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[26].sid, subid: 0}">0
                                                </div>
                                            </div>
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[27].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/3.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[27].sid, subid: 0}">0
                                                </div>
                                            </div>
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[28].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/4.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[28].sid, subid: 0}">0
                                                </div>
                                            </div>
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[29].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/5.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[29].sid, subid: 0}">0
                                                </div>
                                            </div>
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[30].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/6.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[30].sid, subid: 0}">0
                                                </div>
                                            </div>
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[31].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/7.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[31].sid, subid: 0}">0
                                                </div>
                                            </div>

                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[32].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/8.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[32].sid, subid: 0}">0
                                                </div>
                                            </div>
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[33].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/9.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[33].sid, subid: 0}">0
                                                </div>
                                            </div>
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[34].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/10.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[34].sid, subid: 0}">0
                                                </div>
                                            </div>
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[35].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/J.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[35].sid, subid: 0}">0
                                                </div>
                                            </div>
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[36].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/Q.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[36].sid, subid: 0}">0
                                                </div>
                                            </div>
                                            <div class="casino-card-item">
                                                <div class=" card-image" :class="{'suspended': main[37].gstatus != 'OPEN'}"
                                                    >
                                                    <img :src="`${imgPath}front/img/cards/K.png`">
                                                </div>
                                                <div class="casino-book" v-casinofancybook="{sid: main[37].sid, subid: 0}">0
                                                </div>
                                            </div>
                                        </div>
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
        props:['gtype'],
        mounted() {
            if(this.gtype && this.gtype == "dt202"){
                this.gameType = this.gtype;
                this.gameTitle = "20-20 Dragon Tiger - 2";
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
                gameTitle: '20-20 Dragon Tiger',
                gameType: 'dt20',
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
                gameDetail: [],
                gameSoda: [],
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