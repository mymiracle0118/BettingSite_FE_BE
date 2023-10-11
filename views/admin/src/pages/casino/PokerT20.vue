<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table poker20">
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
                                <div class="playeracards">
                                    <div class="dealer-name w-100 mb-1">Player A</div>
                                    <div class="d-flex">
                                        <Card :card="cards[0]" />
                                        <Card :card="cards[1]" />
                                    </div>
                                </div>
                                <div class="playerbcards">
                                    <div class="dealer-name w-100 mb-1">Player B</div>
                                    <div class="d-flex">
                                        <Card :card="cards[2]" />
                                        <Card :card="cards[3]" />
                                    </div>
                                </div>

                                <div class="playerboardcards">
                                    <div class="dealer-name w-100 mb-1">Board</div>
                                    <div class="d-flex">
                                        <Card :card="cards[4]" />
                                        <Card :card="cards[5]" />
                                        <Card :card="cards[6]" />
                                        <Card :card="cards[7]" />
                                        <Card :card="cards[8]" />
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
                        <div class="poker20casino-container d-none-small">
                            <div class="poker20left">
                                <div>
                                    <div class="casino-bl-box casino-bl-box-title">
                                        <div class="casino-bl-box-item">
                                            <span>Winner</span>
                                            <div class="ml-1 float-right">
                                                <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                    data-target="#range1"></i>
                                                <div id="range1" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[0].min}"></span>-<span
                                                        v-kval="{size: main[0].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <span>One Pair</span>
                                            <div class="ml-1 float-right">
                                                <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                    data-target="#range2"></i>
                                                <div id="range2" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[2].min}"></span>-<span
                                                        v-kval="{size: main[2].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <span>Two Pair</span>
                                            <div class="ml-1 float-right">
                                                <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                    data-target="#range3"></i>
                                                <div id="range3" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[4].min}"></span>-<span
                                                        v-kval="{size: main[4].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': main[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ main[0].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[0].sid}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': main[2].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ main[2].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[2].sid}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': main[4].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ main[4].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[4].sid}">0</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-1">
                                    <div class="casino-bl-box casino-bl-box-title">
                                        <div class="casino-bl-box-item">
                                            <span>Three of a Kind</span>
                                            <div class="ml-1 float-right">
                                                <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                    data-target="#range4"></i>
                                                <div id="range4" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[6].min}"></span>-<span
                                                        v-kval="{size: main[6].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <span>Straight</span>
                                            <div class="ml-1 float-right">
                                                <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                    data-target="#range5"></i>
                                                <div id="range5" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[8].min}"></span>-<span
                                                        v-kval="{size: main[8].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <span>Flush</span>
                                            <div class="ml-1 float-right">
                                                <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                    data-target="#range6"></i>
                                                <div id="range6" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[10].min}"></span>-<span
                                                        v-kval="{size: main[10].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': main[6].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ main[6].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[6].sid}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': main[8].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ main[8].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[8].sid}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': main[10].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ main[10].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[10].sid}">0</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-1">
                                    <div class="casino-bl-box casino-bl-box-title">
                                        <div class="casino-bl-box-item">
                                            <span>Full House</span>
                                            <div class="ml-1 float-right">
                                                <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                    data-target="#range7"></i>
                                                <div id="range7" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[12].min}"></span>-<span
                                                        v-kval="{size: main[12].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <span>Four of a Kind</span>
                                            <div class="ml-1 float-right">
                                                <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                    data-target="#range8"></i>
                                                <div id="range8" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[14].min}"></span>-<span
                                                        v-kval="{size: main[14].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <span>Straight Flush</span>
                                            <div class="ml-1 float-right">
                                                <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                    data-target="#range9"></i>
                                                <div id="range9" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[16].min}"></span>-<span
                                                        v-kval="{size: main[16].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': main[12].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ main[12].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[12].sid}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': main[14].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ main[14].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[14].sid}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': main[16].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ main[16].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[16].sid}">0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="poker20center"></div>
                            <div class="poker20right">
                                <div>
                                    <div class="casino-bl-box casino-bl-box-title">
                                        <div class="casino-bl-box-item">
                                            <span>Winner</span>
                                            <div class="ml-1 float-right">
                                                <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                    data-target="#range10"></i>
                                                <div id="range10" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[1].min}"></span>-<span
                                                        v-kval="{size: main[1].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <span>One Pair</span>
                                            <div class="ml-1 float-right">
                                                <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                    data-target="#range11"></i>
                                                <div id="range11" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[3].min}"></span>-<span
                                                        v-kval="{size: main[3].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <span>Two Pair</span>
                                            <div class="ml-1 float-right">
                                                <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                    data-target="#range12"></i>
                                                <div id="range12" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[5].min}"></span>-<span
                                                        v-kval="{size: main[5].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': main[1].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ main[1].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[1].sid}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': main[3].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ main[3].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[3].sid}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': main[5].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ main[5].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[5].sid}">0</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-1">
                                    <div class="casino-bl-box casino-bl-box-title">
                                        <div class="casino-bl-box-item">
                                            <span>Three of a Kind</span>
                                            <div class="ml-1 float-right">
                                                <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                    data-target="#range13"></i>
                                                <div id="range13" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[7].min}"></span>-<span
                                                        v-kval="{size: main[7].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <span>Straight</span>
                                            <div class="ml-1 float-right">
                                                <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                    data-target="#range14"></i>
                                                <div id="range14" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[9].min}"></span>-<span
                                                        v-kval="{size: main[9].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <span>Flush</span>
                                            <div class="ml-1 float-right">
                                                <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                    data-target="#range15"></i>
                                                <div id="range15" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[11].min}"></span>-<span
                                                        v-kval="{size: main[11].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': main[7].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ main[7].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[7].sid}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': main[9].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ main[9].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[9].sid}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': main[11].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ main[11].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[11].sid}">0</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-1">
                                    <div class="casino-bl-box casino-bl-box-title">
                                        <div class="casino-bl-box-item">
                                            <span>Full House</span>
                                            <div class="ml-1 float-right">
                                                <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                    data-target="#range16"></i>
                                                <div id="range16" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[13].min}"></span>-<span
                                                        v-kval="{size: main[13].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <span>Four of a Kind</span>
                                            <div class="ml-1 float-right">
                                                <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                    data-target="#range17"></i>
                                                <div id="range17" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[15].min}"></span>-<span
                                                        v-kval="{size: main[15].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <span>Straight Flush</span>
                                            <div class="ml-1 float-right">
                                                <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                    data-target="#range18"></i>
                                                <div id="range18" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[17].min}"></span>-<span
                                                        v-kval="{size: main[17].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': main[13].gstatus != 'OPEN'}"
                                           >
                                            <span class="casino-box-odd">{{ main[13].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[13].sid}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': main[15].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ main[15].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[15].sid}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': main[17].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ main[17].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[17].sid}">0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>  
                        </template>

                        <template v-if="!$store.getters.isTablet">
                            <div class="poker20casino-container d-none-big">
                                <div class="casino-bl-box casino-bl-box-title">
                                    <div class="casino-bl-box-item"></div>
                                    <div class="casino-bl-box-item playera">
                                        Player A</div>
                                    <div class="casino-bl-box-item playerb">
                                        Player B</div>
                                </div>
                                <div class="casino-bl-box ">
                                    <div class="casino-bl-box-item casino-odds-name">
                                        <span>Winner</span>
                                        <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                            data-target="#range1"></i>
                                        <div id="range1" class="collapse icon-range">
                                            R:<span v-kval="{size: main[0].min}"></span>-<span
                                                v-kval="{size: main[0].max}"></span>
                                        </div>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[0].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ main[0].b }}</span>
                                        <span class="casino-book" v-casinofancybook="{sid: main[0].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[1].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ main[1].b }}</span>
                                        <span class="casino-book" v-casinofancybook="{sid: main[1].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item casino-odds-name">
                                        <span>One Pair</span>
                                        <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                            data-target="#range2"></i>
                                        <div id="range2" class="collapse icon-range">
                                            R:<span v-kval="{size: main[2].min}"></span>-<span
                                                v-kval="{size: main[2].max}"></span>
                                        </div>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[2].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ main[2].b }}</span>
                                        <span class="casino-book" v-casinofancybook="{sid: main[2].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[3].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ main[3].b }}</span>
                                        <span class="casino-book" v-casinofancybook="{sid: main[3].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item casino-odds-name">
                                        <span>Two Pair</span>
                                        <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                            data-target="#range3"></i>
                                        <div id="range3" class="collapse icon-range">
                                            R:<span v-kval="{size: main[4].min}"></span>-<span
                                                v-kval="{size: main[4].max}"></span>
                                        </div>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[4].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ main[4].b }}</span>
                                        <span class="casino-book" v-casinofancybook="{sid: main[4].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[5].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ main[5].b }}</span>
                                        <span class="casino-book" v-casinofancybook="{sid: main[5].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item casino-odds-name">
                                        <span>Three of a Kind</span>
                                        <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                            data-target="#range4"></i>
                                        <div id="range4" class="collapse icon-range">
                                            R:<span v-kval="{size: main[6].min}"></span>-<span
                                                v-kval="{size: main[6].max}"></span>
                                        </div>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[6].gstatus != 'OPEN'}"
                                       >
                                        <span class="casino-box-odd">{{ main[6].b }}</span>
                                        <span class="casino-book" v-casinofancybook="{sid: main[6].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[7].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ main[7].b }}</span>
                                        <span class="casino-book" v-casinofancybook="{sid: main[7].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item casino-odds-name">
                                        <span>Straight</span>
                                        <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                            data-target="#range5"></i>
                                        <div id="range5" class="collapse icon-range">
                                            R:<span v-kval="{size: main[8].min}"></span>-<span
                                                v-kval="{size: main[8].max}"></span>
                                        </div>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[8].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ main[8].b }}</span>
                                        <span class="casino-book" v-casinofancybook="{sid: main[8].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[9].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ main[9].b }}</span>
                                        <span class="casino-book" v-casinofancybook="{sid: main[9].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item casino-odds-name">
                                        <span>Flush</span>
                                        <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                            data-target="#range6"></i>
                                        <div id="range6" class="collapse icon-range">
                                            R:<span v-kval="{size: main[10].min}"></span>-<span
                                                v-kval="{size: main[10].max}"></span>
                                        </div>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[10].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ main[10].b }}</span>
                                        <span class="casino-book" v-casinofancybook="{sid: main[10].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[11].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ main[11].b }}</span>
                                        <span class="casino-book" v-casinofancybook="{sid: main[11].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item casino-odds-name">
                                        <span>Full House</span>
                                        <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                            data-target="#range7"></i>
                                        <div id="range7" class="collapse icon-range">
                                            R:<span v-kval="{size: main[12].min}"></span>-<span
                                                v-kval="{size: main[12].max}"></span>
                                        </div>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[12].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ main[12].b }}</span>
                                        <span class="casino-book" v-casinofancybook="{sid: main[12].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[13].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ main[13].b }}</span>
                                        <span class="casino-book" v-casinofancybook="{sid: main[13].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item casino-odds-name">
                                        <span>Four of a Kind</span>
                                        <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                            data-target="#range8"></i>
                                        <div id="range8" class="collapse icon-range">
                                            R:<span v-kval="{size: main[14].min}"></span>-<span
                                                v-kval="{size: main[14].max}"></span>
                                        </div>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[14].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ main[14].b }}</span>
                                        <span class="casino-book" v-casinofancybook="{sid: main[14].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[15].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ main[15].b }}</span>
                                        <span class="casino-book" v-casinofancybook="{sid: main[15].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item casino-odds-name">
                                        <span>Straight Flush</span>
                                        <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                            data-target="#range9"></i>
                                        <div id="range9" class="collapse icon-range">
                                            R:<span v-kval="{size: main[16].min}"></span>-<span
                                                v-kval="{size: main[16].max}"></span>
                                        </div>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[16].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ main[16].b }}</span>
                                        <span class="casino-book" v-casinofancybook="{sid: main[16].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[17].gstatus != 'OPEN'}"
                                        >
                                        <span class="casino-box-odd">{{ main[17].b }}</span>
                                        <span class="casino-book" v-casinofancybook="{sid: main[17].sid, subid: 0}">0</span>
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
                    'subtype': 'poker20'
                })
                return this.orderBy(player, 'sr')
            }
        },
        data() {
            return {
                showCards: true,
                showResults: true,
                imgPath: IMG_PATH,
                gameTitle: '20-20 Poker',
                gameType: 'poker20',
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