<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table teenpatti20">
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
                        <template v-if="$store.getters.isTablet">
                        <div class="teen20casino-container d-none-small">
                            <div class="teen20left">
                                <div class="casino-box-row">
                                    <div class="casino-nation-name no-border casino-bl-box-title">
                                        <div class="playera">Player A</div>
                                    </div>
                                </div>
                                <div class="casino-bl-box casino-bl-box-title">
                                    <div class="casino-bl-box-item">
                                        <span>Player</span>
                                        <div class="ml-1">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse" data-target="#range1"></i>
                                            <div id="range1" class="collapse icon-range">
                                                R:<span v-kval="{size: player[0].min}"></span>-<span v-kval="{size: player[0].max}"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>3 Baccarat</span>
                                        <div class="ml-1">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse" data-target="#range2"></i>
                                            <div id="range2" class="collapse icon-range">
                                                R:<span v-kval="{size: bacc[0].min}"></span>-<span v-kval="{size: bacc[0].max}"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>Total</span>
                                        <div class="ml-1">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse" data-target="#range3"></i>
                                            <div id="range3" class="collapse icon-range">
                                                R:<span v-kval="{size: total[0].min}"></span>-<span v-kval="{size: total[0].max}"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>Pair Plus</span>
                                        <div class="ml-1">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse" data-target="#range4"></i>
                                            <div id="range4" class="collapse icon-range">
                                                R:<span v-kval="{size: pair[0].min}"></span>-<span v-kval="{size: pair[0].max}"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="casino-bl-box mb-4">
                                    <div class="back casino-bl-box-item" :class="{'suspended': player[0].gstatus != 'OPEN'}">
                                        <span class="casino-box-odd">{{ player[0].b }}</span>
                                        <span class="casino-book" v-casinofancybook="{sid: player[0].sid}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': bacc[0].gstatus != 'OPEN'}">
                                        <span class="casino-box-odd">{{ bacc[0].b }}</span>
                                        <span class="casino-book" v-casinofancybook="{sid: bacc[0].sid}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': total[0].gstatus != 'OPEN'}">
                                        <span class="casino-box-odd">{{ total[0].b }}</span>
                                        <span class="casino-book" v-casinofancybook="{sid: total[0].sid}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': pair[0].gstatus != 'OPEN'}">
                                        <span class="casino-box-odd">A</span>
                                        <span class="casino-book" v-casinofancybook="{sid: pair[0].sid}">0</span>
                                    </div>
                                </div>
                                
                                <div class="casino-rb-box-container mb-3">
                                    <div class="casino-rb-box blackcontainer">
                                        <div class="casino-rb-box-player blackbox back"
                                            :class="{'suspended': redBlack[0].gstatus != 'OPEN'}">
                                            <div class="text-right">
                                                <img :src="`${imgPath}front/img/cards/spade.png`">
                                                <img :src="`${imgPath}front/img/cards/club.png`">
                                            </div>
                                            <div class="text-right">
                                                <span class="d-block casino-box-odd">{{ redBlack[0].b }}</span>
                                                <span class="casino-book" v-casinofancybook="{sid: redBlack[0].sid}">0</span>
                                            </div>
                                        </div>
                                        <div class="text-right casino-rb-box-player-range">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse" data-target="#range5"></i>
                                            <div id="range5" class="collapse icon-range">
                                                R:<span v-kval="{size: redBlack[0].min}"></span>-<span v-kval="{size: redBlack[0].max}"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-rb-box redcontainer">
                                        <div class="casino-rb-box-player redbox back"
                                            :class="{'suspended': redBlack[1].gstatus != 'OPEN'}">
                                            <div class="">
                                                <img :src="`${imgPath}front/img/cards/heart.png`">
                                                <img :src="`${imgPath}front/img/cards/diamond.png`" class="diamond-icon">
                                            </div>
                                            <div class="text-right">
                                                <span class="d-block casino-box-odd">{{ redBlack[1].b }}</span>
                                                <span class="casino-book" v-casinofancybook="{sid: redBlack[1].sid}">0</span>
                                            </div>
                                        </div>
                                        <div class="text-right casino-rb-box-player-range">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse" data-target="#range6"></i>
                                            <div id="range6" class="collapse icon-range">
                                                R:<span v-kval="{size: redBlack[1].min}"></span>-<span v-kval="{size: redBlack[1].max}"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="teen20center"></div>
                            <div class="teen20right">
                                <div class="casino-box-row">
                                    <div class="casino-nation-name no-border casino-bl-box-title">
                                        <div class="playerb">Player B</div>
                                    </div>
                                </div>
                                <div class="casino-bl-box casino-bl-box-title">
                                    <div class="casino-bl-box-item">
                                        <span>Player</span>
                                        <div class="ml-1">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse" data-target="#range7"></i>
                                            <div id="range7" class="collapse icon-range">
                                                R:<span v-kval="{size: player[1].min}"></span>-<span v-kval="{size: player[1].max}"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>3 Baccarat</span>
                                        <div class="ml-1">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse" data-target="#range8"></i>
                                            <div id="range8" class="collapse icon-range">
                                                R:<span v-kval="{size: bacc[1].min}"></span>-<span v-kval="{size: bacc[1].max}"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>Total</span>
                                        <div class="ml-1">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse" data-target="#range9"></i>
                                            <div id="range9" class="collapse icon-range">
                                                R:<span v-kval="{size: total[1].min}"></span>-<span v-kval="{size: total[1].max}"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>Pair Plus</span>
                                        <div class="ml-1">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse" data-target="#range10"></i>
                                            <div id="range10" class="collapse icon-range">
                                                R:<span v-kval="{size: pair[1].min}"></span>-<span v-kval="{size: pair[1].max}"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="casino-bl-box mb-4">
                                    <div class="back casino-bl-box-item" :class="{'suspended': player[1].gstatus != 'OPEN'}">
                                        <span class="casino-box-odd">{{ player[1].b }}</span>
                                        <span  class="casino-book" v-casinofancybook="{sid: player[1].sid}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': bacc[1].gstatus != 'OPEN'}">
                                        <span class="casino-box-odd">{{ bacc[1].b }}</span>
                                        <span  class="casino-book" v-casinofancybook="{sid: bacc[1].sid}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': total[1].gstatus != 'OPEN'}">
                                        <span class="casino-box-odd">{{ total[1].b }}</span>
                                        <span  class="casino-book" v-casinofancybook="{sid: total[1].sid}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': pair[1].gstatus != 'OPEN'}">
                                        <span class="casino-box-odd">B</span>
                                        <span  class="casino-book" v-casinofancybook="{sid: pair[1].sid}">0</span>
                                    </div>
                                </div>
                                <div class="casino-rb-box-container mb-3">
                                    <div class="casino-rb-box blackcontainer">
                                        <div class="casino-rb-box-player blackbox back"
                                            :class="{'suspended': redBlack[2].gstatus != 'OPEN'}">
                                            <div class="">
                                                <img :src="`${imgPath}front/img/cards/spade.png`">
                                                <img :src="`${imgPath}front/img/cards/club.png`">
                                            </div>
                                            <div class="text-right">
                                                <span class="d-block casino-box-odd">{{ redBlack[2].b }}</span>
                                                <span class="casino-book" v-casinofancybook="{sid: redBlack[2].sid}">0</span>
                                            </div>
                                        </div>
                                        <div class="text-right casino-rb-box-player-range">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse" data-target="#range11"></i>
                                            <div id="range11" class="collapse icon-range">
                                                R:<span v-kval="{size: redBlack[2].min}"></span>-<span v-kval="{size: redBlack[2].max}"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-rb-box redcontainer">
                                        <div class="casino-rb-box-player redbox back"
                                            :class="{'suspended': redBlack[3].gstatus != 'OPEN'}">
                                            <div class="">
                                                <img :src="`${imgPath}front/img/cards/heart.png`">
                                                <img :src="`${imgPath}front/img/cards/diamond.png`" class="diamond-icon">
                                            </div>
                                            <div class="text-right">
                                                <span class="d-block casino-box-odd">{{ redBlack[3].b }}</span>
                                                <span class="casino-book" v-casinofancybook="{sid: redBlack[3].sid}">0</span>
                                            </div>
                                        </div>
                                        <div class="text-right casino-rb-box-player-range">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse" data-target="#range12"></i>
                                            <div id="range12" class="collapse icon-range">
                                                R:<span v-kval="{size: redBlack[3].min}"></span>-<span v-kval="{size: redBlack[3].max}"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </template>
                        <template v-if="!$store.getters.isTablet">
                            <div class="teen20casino-container d-none-big">
                                <div class="casino-bl-box casino-bl-box-title">
                                    <div class="casino-bl-box-item"></div>
                                    <div class="casino-bl-box-item playera">Player A</div>
                                    <div class="casino-bl-box-item playerb">Player B</div>
                                </div>
                                <div class="casino-bl-box ">
                                    <div class="casino-bl-box-item casino-odds-name casino-nation-name">
                                        <span>Player</span>
                                        <i class="fas fa-info-circle float-right" data-target="#range1"
                                            data-toggle="collapse"></i>
                                        <div id="range1" class="collapse icon-range">
                                            R:<span v-kval="{size: player[0].min}"></span>-<span
                                                v-kval="{size: player[0].max}"></span>
                                        </div>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': player[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ player[0].b }}</span>
                                        <span v-casinofancybook="{sid: player[0].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': player[1].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ player[1].b }}</span>
                                        <span v-casinofancybook="{sid: player[1].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item casino-odds-name casino-nation-name">
                                        <span>3 Baccarat</span>
                                        <i class="fas fa-info-circle float-right" data-target="#range2"
                                            data-toggle="collapse"></i>
                                        <div id="range2" class="collapse icon-range">
                                            R:<span v-kval="{size: bacc[0].min}"></span>-<span
                                                v-kval="{size: bacc[0].max}"></span>
                                        </div>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': bacc[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ bacc[0].b }}</span>
                                        <span v-casinofancybook="{sid: bacc[0].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': bacc[1].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ bacc[1].b }}</span>
                                        <span v-casinofancybook="{sid: bacc[1].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item casino-odds-name casino-nation-name">
                                        <span>Total</span>
                                        <i class="fas fa-info-circle float-right" data-target="#range3"
                                            data-toggle="collapse"></i>
                                        <div id="range3" class="collapse icon-range">
                                            R:<span v-kval="{size: total[0].min}"></span>-<span
                                                v-kval="{size: total[0].max}"></span>
                                        </div>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': total[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ total[0].b }}</span>
                                        <span v-casinofancybook="{sid: total[0].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': total[1].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ total[1].b }}</span>
                                        <span v-casinofancybook="{sid: total[1].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item casino-odds-name casino-nation-name">
                                        <span>Pair Plus</span>
                                        <i class="fas fa-info-circle float-right" data-target="#range4"
                                            data-toggle="collapse"></i>
                                        <div id="range4" class="collapse icon-range">
                                            R:<span v-kval="{size: pair[0].min}"></span>-<span
                                                v-kval="{size: pair[0].max}"></span>
                                        </div>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': pair[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">A</span>
                                        <span v-casinofancybook="{sid: pair[0].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': pair[1].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">B</span>
                                        <span v-casinofancybook="{sid: pair[1].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item casino-odds-name casino-nation-name">
                                        <div>
                                            <img :src="`${imgPath}front/img/cards/spade.png`">
                                            <img :src="`${imgPath}front/img/cards/club.png`">
                                        </div>
                                        <i class="fas fa-info-circle float-right" data-target="#range5"
                                            data-toggle="collapse"></i>
                                        <div id="range5" class="collapse icon-range">
                                            R:<span v-kval="{size: redBlack[0].min}"></span>-<span
                                                v-kval="{size: redBlack[0].max}"></span>
                                        </div>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': redBlack[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ redBlack[0].b }}</span>
                                        <span v-casinofancybook="{sid: redBlack[0].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': redBlack[2].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ redBlack[2].b }}</span>
                                        <span v-casinofancybook="{sid: redBlack[2].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item casino-odds-name casino-nation-name">
                                        <div>
                                            <img :src="`${imgPath}front/img/cards/heart.png`">
                                            <img :src="`${imgPath}front/img/cards/diamond.png`">
                                        </div>
                                        <i class="fas fa-info-circle float-right" data-target="#range6"
                                            data-toggle="collapse"></i>
                                        <div id="range6" class="collapse icon-range">
                                            R:<span v-kval="{size: redBlack[1].min}"></span>-<span
                                                v-kval="{size: redBlack[1].max}"></span>
                                        </div>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': redBlack[1].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ redBlack[1].b }}</span>
                                        <span v-casinofancybook="{sid: redBlack[1].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': redBlack[3].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ redBlack[3].b }}</span>
                                        <span v-casinofancybook="{sid: redBlack[3].sid, subid: 0}">0</span>
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
            player() {
                var player = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'Player1'
                })
                return this.orderBy(player, 'sr')
            },
            pair() {
                var pair = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'Pair1'
                })
                return this.orderBy(pair, 'sr')
            },
            bacc() {
                var bacc = _.filter(_.get(this.casinoData, 'sub'), (o) => {
                    return (o.subtype == 'Bacc1')
                })
                return this.orderBy(bacc, 'sr')
            },
            redBlack() {
                var redBlack = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'RedBlack1'
                })
                return this.orderBy(redBlack, 'sr')
            },
            total() {
                var total = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'Total1'
                })
                return this.orderBy(total, 'sr')
            }
        },
        data() {
            return {
                showCards: true,
                showResults: true,
                imgPath: IMG_PATH,
                gameTitle: '20-20 Teenpatti B',
                gameType: 'teen20b',
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
                userExp: 0,
               
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
                           // this.casinoData = []
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