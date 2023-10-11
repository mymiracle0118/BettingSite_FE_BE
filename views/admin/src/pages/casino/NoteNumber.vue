<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table note">
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
                                </div>
                                <div>
                                    <Card :card="cards[1]" />
                                </div>
                                <div>
                                    <Card :card="cards[2]" />
                                </div>
                                <div>
                                    <Card :card="cards[3]" />
                                </div>
                                <div>
                                    <Card :card="cards[4]" />
                                </div>
                                <div>
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
                        <template v-if="$store.getters.isTablet">
                            <div class="container-fluid container-fluid-5">
                                <div class="row row5 d-none-small">
                                    <div class="col-4 oe-cards">
                                        <div class="casino-box-row">
                                            <div class="casino-nation-name">
                                                <b>{{ odd[0].nat }}</b>
                                                <div class="d-flex">
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/A.jpg`">
                                                    </div>
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/3.jpg`">
                                                    </div>
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/5.jpg`">
                                                    </div>
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/7.jpg`">
                                                    </div>
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/9.jpg`">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="casino-bl-box">
                                                <div class="back casino-bl-box-item" :class="{'suspended': odd[0].gstatus != 'OPEN'}"
                                                    >
                                                    <span class="casino-box-odd">{{ odd[0].b }}</span>
                                                </div>
                                                <div class="lay casino-bl-box-item" :class="{'suspended': odd[0].gstatus != 'OPEN'}"
                                                    >
                                                    <span class="casino-box-odd">{{ odd[0].l }}</span>
                                                </div>
                                            </div>
                                            <div class="casino-nation-name" v-casinofancybook="{sid: odd[0].sid, subid: 0}">
                                                0
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="casino-box-row">
                                            <div class="casino-nation-name">
                                                <div class="casino-card-img">
                                                    <span>
                                                        <img :src="`${imgPath}front/img/cards/spade.png`">
                                                        <img :src="`${imgPath}front/img/cards/club.png`">
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="casino-bl-box">
                                                <div class="back casino-bl-box-item" :class="{'suspended': black[0].gstatus != 'OPEN'}"
                                                    >
                                                    <span class="casino-box-odd">{{ black[0].b }}</span>
                                                </div>
                                                <div class="lay casino-bl-box-item" :class="{'suspended': black[0].gstatus != 'OPEN'}"
                                                    >
                                                    <span class="casino-box-odd">{{ black[0].l }}</span>
                                                </div>
                                            </div>
                                            <div class="casino-nation-name" v-casinofancybook="{sid: black[0].sid, subid: 0}">
                                                0
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-4 oe-cards">
                                        <div class="casino-box-row">
                                            <div class="casino-nation-name">
                                                <b>{{ low[0].nat }}</b>
                                                <div class="d-flex">
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/A.jpg`">
                                                    </div>
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/2.jpg`">
                                                    </div>
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/3.jpg`">
                                                    </div>
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/4.jpg`">
                                                    </div>
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/5.jpg`">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="casino-bl-box">
                                                <div class="back casino-bl-box-item" :class="{'suspended': low[0].gstatus != 'OPEN'}"
                                                    >
                                                    <span class="casino-box-odd">{{ low[0].b }}</span>
                                                </div>
                                                <div class="lay casino-bl-box-item" :class="{'suspended': low[0].gstatus != 'OPEN'}"
                                                    >
                                                    <span class="casino-box-odd">{{ low[0].l }}</span>
                                                </div>
                                            </div>
                                            <div class="casino-nation-name" v-casinofancybook="{sid: low[0].sid, subid: 0}">
                                                0
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-4 oe-cards">
                                        <div class="casino-box-row">
                                            <div class="casino-nation-name">
                                                <b>{{ even[0].nat }}</b>
                                                <div class="d-flex">
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/2.jpg`">
                                                    </div>
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/4.jpg`">
                                                    </div>
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/6.jpg`">
                                                    </div>
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/8.jpg`">
                                                    </div>
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/10.jpg`">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="casino-bl-box">
                                                <div class="back casino-bl-box-item" :class="{'suspended': even[0].gstatus != 'OPEN'}"
                                                    >
                                                    <span class="casino-box-odd">{{ even[0].b }}</span>
                                                </div>
                                                <div class="lay casino-bl-box-item" :class="{'suspended': even[0].gstatus != 'OPEN'}"
                                                    >
                                                    <span class="casino-box-odd">{{ even[0].l }}</span>
                                                </div>
                                            </div>
                                            <div class="casino-nation-name" v-casinofancybook="{sid: even[0].sid, subid: 0}">
                                                0
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="casino-box-row">
                                            <div class="casino-nation-name">
                                                <div class="casino-card-img">
                                                    <span>
                                                        <img :src="`${imgPath}front/img/cards/heart.png`">
                                                        <img :src="`${imgPath}front/img/cards/diamond.png`">
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="casino-bl-box">
                                                <div class="back casino-bl-box-item" :class="{'suspended': red[0].gstatus != 'OPEN'}"
                                                    >
                                                    <span class="casino-box-odd">{{ red[0].b }}</span>
                                                </div>
                                                <div class="lay casino-bl-box-item" :class="{'suspended': red[0].gstatus != 'OPEN'}"
                                                    >
                                                    <span class="casino-box-odd">{{ red[0].l }}</span>
                                                </div>
                                            </div>
                                            <div class="casino-nation-name" v-casinofancybook="{sid: red[0].sid, subid: 0}">
                                                0
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-4 oe-cards">
                                        <div class="casino-box-row">
                                            <div class="casino-nation-name">
                                                <b>{{ high[0].nat }}</b>
                                                <div class="d-flex">
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/6.jpg`">
                                                    </div>
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/7.jpg`">
                                                    </div>
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/8.jpg`">
                                                    </div>
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/9.jpg`">
                                                    </div>
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/10.jpg`">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="casino-bl-box">
                                                <div class="back casino-bl-box-item" :class="{'suspended': high[0].gstatus != 'OPEN'}"
                                                    >
                                                    <span class="casino-box-odd">{{ high[0].b }}</span>
                                                </div>
                                                <div class="lay casino-bl-box-item" :class="{'suspended': high[0].gstatus != 'OPEN'}"
                                                    >
                                                    <span class="casino-box-odd">{{ high[0].l }}</span>
                                                </div>
                                            </div>
                                            <div class="casino-nation-name" v-casinofancybook="{sid: high[0].sid, subid: 0}">
                                                0
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        
                        <template v-if="!$store.getters.isTablet">
                            <div class="container-fluid container-fluid-5">
                                <div class="row row5 d-none-big">
                                    <div class="casino-bl-box oe-cards">
                                        <div class="casino-bl-box-item casino-odds-name" >
                                            <b>{{ odd[0].nat }}</b>
                                            <div class="d-flex">
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/A.jpg`">
                                                </div>
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/3.jpg`">
                                                </div>
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/5.jpg`">
                                                </div>
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/7.jpg`">
                                                </div>
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/9.jpg`">
                                                </div>
                                            </div>
                                            <span class="text-left w-100" v-casinofancybook="{sid: odd[0].sid, subid: 0}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item" :class="{'suspended': odd[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ odd[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': odd[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ odd[0].l }}</span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box oe-cards">
                                        <div class="casino-bl-box-item casino-odds-name" >
                                            <b>{{ even[0].nat }}</b>
                                            <div class="d-flex">
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/2.jpg`">
                                                </div>
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/4.jpg`">
                                                </div>
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/6.jpg`">
                                                </div>
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/8.jpg`">
                                                </div>
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/10.jpg`">
                                                </div>
                                            </div>
                                            <span class="text-left w-100" v-casinofancybook="{sid: even[0].sid, subid: 0}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item" :class="{'suspended': even[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ even[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': even[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ even[0].l }}</span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box ">
                                        <div class="casino-bl-box-item casino-odds-name" >
                                            <div class="casino-card-img">
                                                <span>
                                                    <img :src="`${imgPath}front/img/cards/spade.png`">
                                                    <img :src="`${imgPath}front/img/cards/club.png`">
                                                </span>
                                            </div>
                                            <span class="text-left w-100" v-casinofancybook="{sid: black[0].sid, subid: 0}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item" :class="{'suspended': black[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ black[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': black[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ black[0].l }}</span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box ">
                                        <div class="casino-bl-box-item casino-odds-name" >
                                            <div class="casino-card-img">
                                                <span>
                                                    <img :src="`${imgPath}front/img/cards/heart.png`">
                                                    <img :src="`${imgPath}front/img/cards/diamond.png`">
                                                </span>
                                            </div>
                                            <span class="text-left w-100" v-casinofancybook="{sid: red[0].sid, subid: 0}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item" :class="{'suspended': red[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ red[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': red[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ red[0].l }}</span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box oe-cards">
                                        <div class="casino-bl-box-item casino-odds-name" >
                                            <b>{{ low[0].nat }}</b>
                                            <div class="d-flex">
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/A.jpg`">
                                                </div>
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/2.jpg`">
                                                </div>
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/3.jpg`">
                                                </div>
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/4.jpg`">
                                                </div>
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/5.jpg`">
                                                </div>
                                            </div>
                                            <span class="text-left w-100" v-casinofancybook="{sid: low[0].sid, subid: 0}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item" :class="{'suspended': low[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ low[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': low[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ low[0].l }}</span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box oe-cards">
                                        <div class="casino-bl-box-item casino-odds-name" >
                                            <b>{{ high[0].nat }}</b>
                                            <div class="d-flex">
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/6.jpg`">
                                                </div>
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/7.jpg`">
                                                </div>
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/8.jpg`">
                                                </div>
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/9.jpg`">
                                                </div>
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/10.jpg`">
                                                </div>
                                            </div>
                                            <span class="text-left w-100" v-casinofancybook="{sid: high[0].sid, subid: 0}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item" :class="{'suspended': high[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ high[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': high[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ high[0].l }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <div class="container-fluid container-fluid-5">
                            <div class="row row5">
                                <div class="col-md-4 col-12 note-baccarat">
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>{{ bacc[0].nat }}</b>
                                            <span class="text-yellow">(1st, 2nd, 3rd card)</span>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': bacc[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ bacc[0].b }}</span>
                                                <span v-casinofancybook="{sid: bacc[0].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>{{ bacc[1].nat }}</b>
                                            <span class="text-yellow">(4th, 5th, 6th card)</span>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': bacc[1].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ bacc[1].b }}</span>
                                                <span v-casinofancybook="{sid: bacc[1].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-8 col-12 note-cards">
                                    <div class="casino-cards text-center mt-1">
                                        <template v-for="(odds, key) in orderBy(card[0].odds, 'sno')">
                                            <div class="casino-card-item" :key="key">
                                                <div class="casino-book">{{ odds.b }}</div>
                                                <div class=" card-image" :class="{ suspended: card[0].gstatus != 'OPEN' }"
                                                    >
                                                    <template v-if="odds.ssid == 1">
                                                        <img :src="`${imgPath}front/img/cards/A.png`">
                                                    </template>
                                                    <template v-else>
                                                        <img :src="`${imgPath}front/img/cards/${odds.ssid}.png`">
                                                    </template>
                                                </div>
                                                <div v-casinofancybook="{sid: card[0].sid, subid: odds.ssid}">0</div>
                                            </div>
                                        </template>
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
          odd() {
              var player = _.filter(_.get(this.casinoData, 'sub'), {
                  'subtype': "odd"
              })
              return this.orderBy(player, 'sr')
          },
          even() {
              var player = _.filter(_.get(this.casinoData, 'sub'), {
                  'subtype': "even"
              })
              return this.orderBy(player, 'sr')
          },
          black() {
              var player = _.filter(_.get(this.casinoData, 'sub'), {
                  'subtype': "black"
              })
              return this.orderBy(player, 'sr')
          },
          red() {
              var player = _.filter(_.get(this.casinoData, 'sub'), {
                  'subtype': "red"
              })
              return this.orderBy(player, 'sr')
          },
          low() {
              var player = _.filter(_.get(this.casinoData, 'sub'), {
                  'subtype': "low"
              })
              return this.orderBy(player, 'sr')
          },
          high() {
              var player = _.filter(_.get(this.casinoData, 'sub'), {
                  'subtype': "high"
              })
              return this.orderBy(player, 'sr')
          },
          bacc() {
              var player = _.filter(_.get(this.casinoData, 'sub'), {
                  'subtype': "bacc"
              })
              return this.orderBy(player, 'sr')
          },
          card() {
              var player = _.filter(_.get(this.casinoData, 'sub'), {
                  'subtype': "card"
              })
              return this.orderBy(player, 'sr')
          },
          
        },
        data() {
            return {
                showCards: true,
                showResults: true,
                imgPath: IMG_PATH,
                gameTitle: 'Note Number',
                gameType: 'notenum',
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