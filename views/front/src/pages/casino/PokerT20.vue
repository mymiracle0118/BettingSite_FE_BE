<template>
    <div class="casino-container">
        <!-- Casino Content -->
        <template v-if="!$store.getters.isTablet">
            <TimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current" />
        </template>
        <div class="casino-table poker20">
            <div class="casino-video">
                <InactivityModal ref="tvModal" />
                <div class="casino-video-title">
                    <span class="casino-name">{{ gameTitle }}</span>
                    <div class="casino-video-rid">Round ID: {{ casinoData.mid }}</div>
                </div>
                <div class="video-box-container">
                    <div class="video-box">
                        <iframe :src="tvUrl" v-if="tvUrl != ''">
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
                <div class="casino-timer d-none-mobile">
                    <Timer v-if="time.total != 0" :totalTime="time.total" :currentTime="time.current" />
                </div>
                <template v-if="time.total > 3 && (time.current <= 3 && time.current > 0)">
                    <transition name="component-fade" mode="out-in">
                        <div :key="time.current" class="casino-time-digit d-none-desktop">{{ time.current }}</div>
                    </transition>
                </template>
                <div class="casino-video-right-icons">
                    <div class="casino-video-home-icon" title="Home">
                        <router-link :to="{name: 'owncasinolist'}" style="color: var(--text-highlight);">
                            <i class="fas fa-home"></i>
                        </router-link>
                    </div>
                    <div class="casino-video-rules-icon" @click="getCasinoRulesHtml()" title="Rules">
                        <i class="fas fa-info-circle"></i>
                    </div>
                    <b-modal ref="rules-modal" modal-class="casino-rules teenpatti2-rule-modal" title="Rules"
                        hide-footer>
                        <div class="casino-vieo-rules show-rules show">
                            <div class="rules-body">
                                <template v-if="rulesHtml && rulesHtml.length">
                                    <template v-for="(rule, key) in rulesHtml">
                                        <div :key="`body-${key}`" v-html="rule.rules"></div>
                                    </template>
                                </template>
                            </div>
                        </div>
                    </b-modal>
                </div>
                <div id="casino-vieo-rules" class="casino-vieo-rules show d-none-small"
                    :class="{'show-rules': showRules}" v-if="showRules" aria-modal="true" style="display: block;">
                    <div class="rules-header">
                        <div>Rules</div>
                        <i class="fas fa-times" @click="showRules = false"></i>
                    </div>
                    <div class="rules-body">
                        <template v-if="rulesHtml && rulesHtml.length">
                            <template v-for="(rule, key) in rulesHtml">
                                <div :key="`body-${key}`" v-html="rule.rules"></div>
                            </template>
                        </template>
                    </div>
                </div>
            </div>

            <div class="casino-detail" v-if="casinoData && casinoData.mid">
                <template v-if="$store.getters.isTablet">
                    <div class="poker20casino-container d-none-small">
                        <div class="poker20left">
                            <div>
                                <div class="casino-bl-box casino-bl-box-title">
                                    <div class="casino-bl-box-item">
                                        <span>Winner</span>
                                        <!-- <div class="ml-1 float-right">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                data-target="#range1"></i>
                                            <div id="range1" class="collapse icon-range">
                                                R:<span v-kval="{size: main[0].min}"></span>-<span
                                                    v-kval="{size: main[0].max}"></span>
                                            </div>
                                        </div> -->
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>One Pair</span>
                                        <!-- <div class="ml-1 float-right">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                data-target="#range2"></i>
                                            <div id="range2" class="collapse icon-range">
                                                R:<span v-kval="{size: main[2].min}"></span>-<span
                                                    v-kval="{size: main[2].max}"></span>
                                            </div>
                                        </div> -->
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>Two Pair</span>
                                        <!-- <div class="ml-1 float-right">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                data-target="#range3"></i>
                                            <div id="range3" class="collapse icon-range">
                                                R:<span v-kval="{size: main[4].min}"></span>-<span
                                                    v-kval="{size: main[4].max}"></span>
                                            </div>
                                        </div> -->
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': main[0].gstatus != 'OPEN'}"
                                        @click="setBetData(main[0].nat + ' A', main[0].b, mId, main[0].sid, main[0].subtype, 0, 'back', gameType, main[0].gstatus, main[0].min, main[0].max)">
                                        <span class="casino-box-odd">{{ main[0].b }}</span>
                                        <span v-casinofancybook="{sid: main[0].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': main[2].gstatus != 'OPEN'}"
                                        @click="setBetData(main[2].nat + ' A', main[2].b, mId, main[2].sid, main[2].subtype, 0, 'back', gameType, main[2].gstatus, main[2].min, main[2].max)">
                                        <span class="casino-box-odd">{{ main[2].b }}</span>
                                        <span v-casinofancybook="{sid: main[2].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': main[4].gstatus != 'OPEN'}"
                                        @click="setBetData(main[4].nat + ' A', main[4].b, mId, main[4].sid, main[4].subtype, 0, 'back', gameType, main[4].gstatus, main[4].min, main[4].max)">
                                        <span class="casino-box-odd">{{ main[4].b }}</span>
                                        <span v-casinofancybook="{sid: main[4].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-1">
                                <div class="casino-bl-box casino-bl-box-title">
                                    <div class="casino-bl-box-item">
                                        <span>Three of a Kind</span>
                                        <!-- <div class="ml-1 float-right">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                data-target="#range4"></i>
                                            <div id="range4" class="collapse icon-range">
                                                R:<span v-kval="{size: main[6].min}"></span>-<span
                                                    v-kval="{size: main[6].max}"></span>
                                            </div>
                                        </div> -->
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>Straight</span>
                                        <!-- <div class="ml-1 float-right">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                data-target="#range5"></i>
                                            <div id="range5" class="collapse icon-range">
                                                R:<span v-kval="{size: main[8].min}"></span>-<span
                                                    v-kval="{size: main[8].max}"></span>
                                            </div>
                                        </div> -->
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>Flush</span>
                                        <!-- <div class="ml-1 float-right">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                data-target="#range6"></i>
                                            <div id="range6" class="collapse icon-range">
                                                R:<span v-kval="{size: main[10].min}"></span>-<span
                                                    v-kval="{size: main[10].max}"></span>
                                            </div>
                                        </div> -->
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': main[6].gstatus != 'OPEN'}"
                                        @click="setBetData(main[6].nat + ' A', main[6].b, mId, main[6].sid, main[6].subtype, 0, 'back', gameType, main[6].gstatus, main[6].min, main[6].max)">
                                        <span class="casino-box-odd">{{ main[6].b }}</span>
                                        <span v-casinofancybook="{sid: main[6].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': main[8].gstatus != 'OPEN'}"
                                        @click="setBetData(main[8].nat + ' A', main[8].b, mId, main[8].sid, main[8].subtype, 0, 'back', gameType, main[8].gstatus, main[8].min, main[8].max)">
                                        <span class="casino-box-odd">{{ main[8].b }}</span>
                                        <span v-casinofancybook="{sid: main[8].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': main[10].gstatus != 'OPEN'}"
                                        @click="setBetData(main[10].nat + ' A', main[10].b, mId, main[10].sid, main[10].subtype, 0, 'back', gameType, main[10].gstatus, main[10].min, main[10].max)">
                                        <span class="casino-box-odd">{{ main[10].b }}</span>
                                        <span v-casinofancybook="{sid: main[10].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-1">
                                <div class="casino-bl-box casino-bl-box-title">
                                    <div class="casino-bl-box-item">
                                        <span>Full House</span>
                                        <!-- <div class="ml-1 float-right">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                data-target="#range7"></i>
                                            <div id="range7" class="collapse icon-range">
                                                R:<span v-kval="{size: main[12].min}"></span>-<span
                                                    v-kval="{size: main[12].max}"></span>
                                            </div>
                                        </div> -->
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>Four of a Kind</span>
                                        <!-- <div class="ml-1 float-right">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                data-target="#range8"></i>
                                            <div id="range8" class="collapse icon-range">
                                                R:<span v-kval="{size: main[14].min}"></span>-<span
                                                    v-kval="{size: main[14].max}"></span>
                                            </div>
                                        </div> -->
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>Straight Flush</span>
                                        <!-- <div class="ml-1 float-right">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                data-target="#range9"></i>
                                            <div id="range9" class="collapse icon-range">
                                                R:<span v-kval="{size: main[16].min}"></span>-<span
                                                    v-kval="{size: main[16].max}"></span>
                                            </div>
                                        </div> -->
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': main[12].gstatus != 'OPEN'}"
                                        @click="setBetData(main[12].nat + ' A', main[12].b, mId, main[12].sid, main[12].subtype, 0, 'back', gameType, main[12].gstatus, main[12].min, main[12].max)">
                                        <span class="casino-box-odd">{{ main[12].b }}</span>
                                        <span v-casinofancybook="{sid: main[12].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': main[14].gstatus != 'OPEN'}"
                                        @click="setBetData(main[14].nat + ' A', main[14].b, mId, main[14].sid, main[14].subtype, 0, 'back', gameType, main[14].gstatus, main[14].min, main[14].max)">
                                        <span class="casino-box-odd">{{ main[14].b }}</span>
                                        <span v-casinofancybook="{sid: main[14].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': main[16].gstatus != 'OPEN'}"
                                        @click="setBetData(main[16].nat + ' A', main[16].b, mId, main[16].sid, main[16].subtype, 0, 'back', gameType, main[16].gstatus, main[16].min, main[16].max)">
                                        <span class="casino-box-odd">{{ main[16].b }}</span>
                                        <span v-casinofancybook="{sid: main[16].sid, subid: 0}">0</span>
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
                                        <!-- <div class="ml-1 float-right">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                data-target="#range10"></i>
                                            <div id="range10" class="collapse icon-range">
                                                R:<span v-kval="{size: main[1].min}"></span>-<span
                                                    v-kval="{size: main[1].max}"></span>
                                            </div>
                                        </div> -->
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>One Pair</span>
                                        <!-- <div class="ml-1 float-right">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                data-target="#range11"></i>
                                            <div id="range11" class="collapse icon-range">
                                                R:<span v-kval="{size: main[3].min}"></span>-<span
                                                    v-kval="{size: main[3].max}"></span>
                                            </div>
                                        </div> -->
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>Two Pair</span>
                                        <!-- <div class="ml-1 float-right">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                data-target="#range12"></i>
                                            <div id="range12" class="collapse icon-range">
                                                R:<span v-kval="{size: main[5].min}"></span>-<span
                                                    v-kval="{size: main[5].max}"></span>
                                            </div>
                                        </div> -->
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': main[1].gstatus != 'OPEN'}"
                                        @click="setBetData(main[1].nat + ' B', main[1].b, mId, main[1].sid, main[1].subtype, 0, 'back', gameType, main[1].gstatus, main[1].min, main[1].max)">
                                        <span class="casino-box-odd">{{ main[1].b }}</span>
                                        <span v-casinofancybook="{sid: main[1].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': main[3].gstatus != 'OPEN'}"
                                        @click="setBetData(main[3].nat + ' B', main[3].b, mId, main[3].sid, main[3].subtype, 0, 'back', gameType, main[3].gstatus, main[3].min, main[3].max)">
                                        <span class="casino-box-odd">{{ main[3].b }}</span>
                                        <span v-casinofancybook="{sid: main[3].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': main[5].gstatus != 'OPEN'}"
                                        @click="setBetData(main[5].nat + ' B', main[5].b, mId, main[5].sid, main[5].subtype, 0, 'back', gameType, main[5].gstatus, main[5].min, main[5].max)">
                                        <span class="casino-box-odd">{{ main[5].b }}</span>
                                        <span v-casinofancybook="{sid: main[5].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-1">
                                <div class="casino-bl-box casino-bl-box-title">
                                    <div class="casino-bl-box-item">
                                        <span>Three of a Kind</span>
                                        <!-- <div class="ml-1 float-right">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                data-target="#range13"></i>
                                            <div id="range13" class="collapse icon-range">
                                                R:<span v-kval="{size: main[7].min}"></span>-<span
                                                    v-kval="{size: main[7].max}"></span>
                                            </div>
                                        </div> -->
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>Straight</span>
                                        <!-- <div class="ml-1 float-right">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                data-target="#range14"></i>
                                            <div id="range14" class="collapse icon-range">
                                                R:<span v-kval="{size: main[9].min}"></span>-<span
                                                    v-kval="{size: main[9].max}"></span>
                                            </div>
                                        </div> -->
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>Flush</span>
                                        <!-- <div class="ml-1 float-right">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                data-target="#range15"></i>
                                            <div id="range15" class="collapse icon-range">
                                                R:<span v-kval="{size: main[11].min}"></span>-<span
                                                    v-kval="{size: main[11].max}"></span>
                                            </div>
                                        </div> -->
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': main[7].gstatus != 'OPEN'}"
                                        @click="setBetData(main[7].nat + ' B', main[7].b, mId, main[7].sid, main[7].subtype, 0, 'back', gameType, main[7].gstatus, main[7].min, main[7].max)">
                                        <span class="casino-box-odd">{{ main[7].b }}</span>
                                        <span v-casinofancybook="{sid: main[7].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': main[9].gstatus != 'OPEN'}"
                                        @click="setBetData(main[9].nat + ' B', main[9].b, mId, main[9].sid, main[9].subtype, 0, 'back', gameType, main[9].gstatus, main[9].min, main[9].max)">
                                        <span class="casino-box-odd">{{ main[9].b }}</span>
                                        <span v-casinofancybook="{sid: main[9].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': main[11].gstatus != 'OPEN'}"
                                        @click="setBetData(main[11].nat + ' B', main[11].b, mId, main[11].sid, main[11].subtype, 0, 'back', gameType, main[11].gstatus, main[11].min, main[11].max)">
                                        <span class="casino-box-odd">{{ main[11].b }}</span>
                                        <span v-casinofancybook="{sid: main[11].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-1">
                                <div class="casino-bl-box casino-bl-box-title">
                                    <div class="casino-bl-box-item">
                                        <span>Full House</span>
                                        <!-- <div class="ml-1 float-right">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                data-target="#range16"></i>
                                            <div id="range16" class="collapse icon-range">
                                                R:<span v-kval="{size: main[13].min}"></span>-<span
                                                    v-kval="{size: main[13].max}"></span>
                                            </div>
                                        </div> -->
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>Four of a Kind</span>
                                        <!-- <div class="ml-1 float-right">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                data-target="#range17"></i>
                                            <div id="range17" class="collapse icon-range">
                                                R:<span v-kval="{size: main[15].min}"></span>-<span
                                                    v-kval="{size: main[15].max}"></span>
                                            </div>
                                        </div> -->
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <span>Straight Flush</span>
                                        <!-- <div class="ml-1 float-right">
                                            <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                data-target="#range18"></i>
                                            <div id="range18" class="collapse icon-range">
                                                R:<span v-kval="{size: main[17].min}"></span>-<span
                                                    v-kval="{size: main[17].max}"></span>
                                            </div>
                                        </div> -->
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': main[13].gstatus != 'OPEN'}"
                                        @click="setBetData(main[13].nat + ' B', main[13].b, mId, main[13].sid, main[13].subtype, 0, 'back', gameType, main[13].gstatus, main[13].min, main[13].max)">
                                        <span class="casino-box-odd">{{ main[13].b }}</span>
                                        <span v-casinofancybook="{sid: main[13].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': main[15].gstatus != 'OPEN'}"
                                        @click="setBetData(main[15].nat + ' B', main[15].b, mId, main[15].sid, main[15].subtype, 0, 'back', gameType, main[15].gstatus, main[15].min, main[15].max)">
                                        <span class="casino-box-odd">{{ main[15].b }}</span>
                                        <span v-casinofancybook="{sid: main[15].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': main[17].gstatus != 'OPEN'}"
                                        @click="setBetData(main[17].nat + ' B', main[17].b, mId, main[17].sid, main[17].subtype, 0, 'back', gameType, main[17].gstatus, main[17].min, main[17].max)">
                                        <span class="casino-box-odd">{{ main[17].b }}</span>
                                        <span v-casinofancybook="{sid: main[17].sid, subid: 0}">0</span>
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
                                <!-- <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                    data-target="#range1"></i>
                                <div id="range1" class="collapse icon-range">
                                    R:<span v-kval="{size: main[0].min}"></span>-<span
                                        v-kval="{size: main[0].max}"></span>
                                </div> -->
                            </div>
                            <div class="back casino-bl-box-item" :class="{'suspended': main[0].gstatus != 'OPEN'}"
                                @click="setBetData(main[0].nat + ' A', main[0].b, mId, main[0].sid, main[0].subtype, 0, 'back', gameType, main[0].gstatus, main[0].min, main[0].max)">
                                <span class="casino-box-odd">{{ main[0].b }}</span>
                                <span v-casinofancybook="{sid: main[0].sid, subid: 0}">0</span>
                            </div>
                            <div class="back casino-bl-box-item" :class="{'suspended': main[1].gstatus != 'OPEN'}"
                                @click="setBetData(main[1].nat + ' B', main[1].b, mId, main[1].sid, main[1].subtype, 0, 'back', gameType, main[1].gstatus, main[1].min, main[1].max)">
                                <span class="casino-box-odd">{{ main[1].b }}</span>
                                <span v-casinofancybook="{sid: main[1].sid, subid: 0}">0</span>
                            </div>
                        </div>
                        <div class="casino-bl-box">
                            <div class="casino-bl-box-item casino-odds-name">
                                <span>One Pair</span>
                                <!-- <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                    data-target="#range2"></i>
                                <div id="range2" class="collapse icon-range">
                                    R:<span v-kval="{size: main[2].min}"></span>-<span
                                        v-kval="{size: main[2].max}"></span>
                                </div> -->
                            </div>
                            <div class="back casino-bl-box-item" :class="{'suspended': main[2].gstatus != 'OPEN'}"
                                @click="setBetData(main[2].nat + ' A', main[2].b, mId, main[2].sid, main[2].subtype, 0, 'back', gameType, main[2].gstatus, main[2].min, main[2].max)">
                                <span class="casino-box-odd">{{ main[2].b }}</span>
                                <span v-casinofancybook="{sid: main[2].sid, subid: 0}">0</span>
                            </div>
                            <div class="back casino-bl-box-item" :class="{'suspended': main[3].gstatus != 'OPEN'}"
                                @click="setBetData(main[3].nat + ' B', main[3].b, mId, main[3].sid, main[3].subtype, 0, 'back', gameType, main[3].gstatus, main[3].min, main[3].max)">
                                <span class="casino-box-odd">{{ main[3].b }}</span>
                                <span v-casinofancybook="{sid: main[3].sid, subid: 0}">0</span>
                            </div>
                        </div>
                        <div class="casino-bl-box">
                            <div class="casino-bl-box-item casino-odds-name">
                                <span>Two Pair</span>
                                <!-- <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                    data-target="#range3"></i>
                                <div id="range3" class="collapse icon-range">
                                    R:<span v-kval="{size: main[4].min}"></span>-<span
                                        v-kval="{size: main[4].max}"></span>
                                </div> -->
                            </div>
                            <div class="back casino-bl-box-item" :class="{'suspended': main[4].gstatus != 'OPEN'}"
                                @click="setBetData(main[4].nat + ' A', main[4].b, mId, main[4].sid, main[4].subtype, 0, 'back', gameType, main[4].gstatus, main[4].min, main[4].max)">
                                <span class="casino-box-odd">{{ main[4].b }}</span>
                                <span v-casinofancybook="{sid: main[4].sid, subid: 0}">0</span>
                            </div>
                            <div class="back casino-bl-box-item" :class="{'suspended': main[5].gstatus != 'OPEN'}"
                                @click="setBetData(main[5].nat + ' B', main[5].b, mId, main[5].sid, main[5].subtype, 0, 'back', gameType, main[5].gstatus, main[5].min, main[5].max)">
                                <span class="casino-box-odd">{{ main[5].b }}</span>
                                <span v-casinofancybook="{sid: main[5].sid, subid: 0}">0</span>
                            </div>
                        </div>
                        <div class="casino-bl-box">
                            <div class="casino-bl-box-item casino-odds-name">
                                <span>Three of a Kind</span>
                                <!-- <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                    data-target="#range4"></i>
                                <div id="range4" class="collapse icon-range">
                                    R:<span v-kval="{size: main[6].min}"></span>-<span
                                        v-kval="{size: main[6].max}"></span>
                                </div> -->
                            </div>
                            <div class="back casino-bl-box-item" :class="{'suspended': main[6].gstatus != 'OPEN'}"
                                @click="setBetData(main[6].nat + ' A', main[6].b, mId, main[6].sid, main[6].subtype, 0, 'back', gameType, main[6].gstatus, main[6].min, main[6].max)">
                                <span class="casino-box-odd">{{ main[6].b }}</span>
                                <span v-casinofancybook="{sid: main[6].sid, subid: 0}">0</span>
                            </div>
                            <div class="back casino-bl-box-item" :class="{'suspended': main[7].gstatus != 'OPEN'}"
                                @click="setBetData(main[7].nat + ' B', main[7].b, mId, main[7].sid, main[7].subtype, 0, 'back', gameType, main[7].gstatus, main[7].min, main[7].max)">
                                <span class="casino-box-odd">{{ main[7].b }}</span>
                                <span v-casinofancybook="{sid: main[7].sid, subid: 0}">0</span>
                            </div>
                        </div>
                        <div class="casino-bl-box">
                            <div class="casino-bl-box-item casino-odds-name">
                                <span>Straight</span>
                                <!-- <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                    data-target="#range5"></i>
                                <div id="range5" class="collapse icon-range">
                                    R:<span v-kval="{size: main[8].min}"></span>-<span
                                        v-kval="{size: main[8].max}"></span>
                                </div> -->
                            </div>
                            <div class="back casino-bl-box-item" :class="{'suspended': main[8].gstatus != 'OPEN'}"
                                @click="setBetData(main[8].nat + ' A', main[8].b, mId, main[8].sid, main[8].subtype, 0, 'back', gameType, main[8].gstatus, main[8].min, main[8].max)">
                                <span class="casino-box-odd">{{ main[8].b }}</span>
                                <span v-casinofancybook="{sid: main[8].sid, subid: 0}">0</span>
                            </div>
                            <div class="back casino-bl-box-item" :class="{'suspended': main[9].gstatus != 'OPEN'}"
                                @click="setBetData(main[9].nat + ' B', main[9].b, mId, main[9].sid, main[9].subtype, 0, 'back', gameType, main[9].gstatus, main[9].min, main[9].max)">
                                <span class="casino-box-odd">{{ main[9].b }}</span>
                                <span v-casinofancybook="{sid: main[9].sid, subid: 0}">0</span>
                            </div>
                        </div>
                        <div class="casino-bl-box">
                            <div class="casino-bl-box-item casino-odds-name">
                                <span>Flush</span>
                                <!-- <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                    data-target="#range6"></i>
                                <div id="range6" class="collapse icon-range">
                                    R:<span v-kval="{size: main[10].min}"></span>-<span
                                        v-kval="{size: main[10].max}"></span>
                                </div> -->
                            </div>
                            <div class="back casino-bl-box-item" :class="{'suspended': main[10].gstatus != 'OPEN'}"
                                @click="setBetData(main[10].nat + ' A', main[10].b, mId, main[10].sid, main[10].subtype, 0, 'back', gameType, main[10].gstatus, main[10].min, main[10].max)">
                                <span class="casino-box-odd">{{ main[10].b }}</span>
                                <span v-casinofancybook="{sid: main[10].sid, subid: 0}">0</span>
                            </div>
                            <div class="back casino-bl-box-item" :class="{'suspended': main[11].gstatus != 'OPEN'}"
                                @click="setBetData(main[11].nat + ' B', main[11].b, mId, main[11].sid, main[11].subtype, 0, 'back', gameType, main[11].gstatus, main[11].min, main[11].max)">
                                <span class="casino-box-odd">{{ main[11].b }}</span>
                                <span v-casinofancybook="{sid: main[11].sid, subid: 0}">0</span>
                            </div>
                        </div>
                        <div class="casino-bl-box">
                            <div class="casino-bl-box-item casino-odds-name">
                                <span>Full House</span>
                                <!-- <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                    data-target="#range7"></i>
                                <div id="range7" class="collapse icon-range">
                                    R:<span v-kval="{size: main[12].min}"></span>-<span
                                        v-kval="{size: main[12].max}"></span>
                                </div> -->
                            </div>
                            <div class="back casino-bl-box-item" :class="{'suspended': main[12].gstatus != 'OPEN'}"
                                @click="setBetData(main[12].nat + ' A', main[12].b, mId, main[12].sid, main[12].subtype, 0, 'back', gameType, main[12].gstatus, main[12].min, main[12].max)">
                                <span class="casino-box-odd">{{ main[12].b }}</span>
                                <span v-casinofancybook="{sid: main[12].sid, subid: 0}">0</span>
                            </div>
                            <div class="back casino-bl-box-item" :class="{'suspended': main[13].gstatus != 'OPEN'}"
                                @click="setBetData(main[13].nat + ' B', main[13].b, mId, main[13].sid, main[13].subtype, 0, 'back', gameType, main[13].gstatus, main[13].min, main[13].max)">
                                <span class="casino-box-odd">{{ main[13].b }}</span>
                                <span v-casinofancybook="{sid: main[13].sid, subid: 0}">0</span>
                            </div>
                        </div>
                        <div class="casino-bl-box">
                            <div class="casino-bl-box-item casino-odds-name">
                                <span>Four of a Kind</span>
                                <!-- <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                    data-target="#range8"></i>
                                <div id="range8" class="collapse icon-range">
                                    R:<span v-kval="{size: main[14].min}"></span>-<span
                                        v-kval="{size: main[14].max}"></span>
                                </div> -->
                            </div>
                            <div class="back casino-bl-box-item" :class="{'suspended': main[14].gstatus != 'OPEN'}"
                                @click="setBetData(main[14].nat + ' A', main[14].b, mId, main[14].sid, main[14].subtype, 0, 'back', gameType, main[14].gstatus, main[14].min, main[14].max)">
                                <span class="casino-box-odd">{{ main[14].b }}</span>
                                <span v-casinofancybook="{sid: main[14].sid, subid: 0}">0</span>
                            </div>
                            <div class="back casino-bl-box-item" :class="{'suspended': main[15].gstatus != 'OPEN'}"
                                @click="setBetData(main[15].nat + ' B', main[15].b, mId, main[15].sid, main[15].subtype, 0, 'back', gameType, main[15].gstatus, main[15].min, main[15].max)">
                                <span class="casino-box-odd">{{ main[15].b }}</span>
                                <span v-casinofancybook="{sid: main[15].sid, subid: 0}">0</span>
                            </div>
                        </div>
                        <div class="casino-bl-box">
                            <div class="casino-bl-box-item casino-odds-name">
                                <span>Straight Flush</span>
                                <!-- <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                    data-target="#range9"></i>
                                <div id="range9" class="collapse icon-range">
                                    R:<span v-kval="{size: main[16].min}"></span>-<span
                                        v-kval="{size: main[16].max}"></span>
                                </div> -->
                            </div>
                            <div class="back casino-bl-box-item" :class="{'suspended': main[16].gstatus != 'OPEN'}"
                                @click="setBetData(main[16].nat + ' A', main[16].b, mId, main[16].sid, main[16].subtype, 0, 'back', gameType, main[16].gstatus, main[16].min, main[16].max)">
                                <span class="casino-box-odd">{{ main[16].b }}</span>
                                <span v-casinofancybook="{sid: main[16].sid, subid: 0}">0</span>
                            </div>
                            <div class="back casino-bl-box-item" :class="{'suspended': main[17].gstatus != 'OPEN'}"
                                @click="setBetData(main[17].nat + ' B', main[17].b, mId, main[17].sid, main[17].subtype, 0, 'back', gameType, main[17].gstatus, main[17].min, main[17].max)">
                                <span class="casino-box-odd">{{ main[17].b }}</span>
                                <span v-casinofancybook="{sid: main[17].sid, subid: 0}">0</span>
                            </div>
                        </div>

                    </div>
                </template>

                <template v-if="casinoData.remark && casinoData.remark != ''">
                    <div class="casino-remark mt-1">
                        <div class="remark-icon">
                            <img :src="`${imgPath}front/img/icons/remark.png`">
                        </div>
                        <marquee>{{ casinoData.remark }}</marquee>
                    </div>
                </template>

                <template v-if="!$store.getters.isTablet">
                    <LastResultIcon />
                </template>
            </div>
            <!-- CASINO Rules Start -->
            <template v-if="!$store.getters.isTablet">
                <div class="mt-2 casino-rules-table d-none-big" v-if="$store.state.casinoRules">
                    <div class="casino-place-bet-title">Rules</div>
                    <div class="table-responsive">
                        <template v-for="(rules, key) in $store.state.casinoRules">
                            <table class="table" :key="key">
                                <thead>
                                    <tr>
                                        <th colspan="2" class="text-center">{{ rules.hed }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(rule, key1) in rules.child">
                                        <tr :key="key1">
                                            <td>{{ rule.nat }}</td>
                                            <td>{{ rule.resval }}</td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </template>
                    </div>
                </div>
            </template>
            <!-- CASINO Rules End -->
        </div>


        <b-modal ref="placebet-modal" hide-footer title="BET SLIP" @hide="$store.commit('resetCasinoBetData')"
            :class="{'loader-section-parent':$store.state.loadingCasinoPlacebet}">
            <Loader :isVisible="$store.state.loadingCasinoPlacebet"></Loader>
            <template #modal-title>
                <h5 class="modal-title">Place Bet
                    <template
                        v-if="$pages.is('casino', $route.name) && $store.state.casinoBet && $store.state.casinoBet != null">
                        <span class="casino-min-max ml-2">
                            Range:<span v-kval="{size: $store.state.casinoBet.min}"></span>-<span
                                v-kval="{size: $store.state.casinoBet.max}"></span>
                        </span>
                    </template>
                </h5>
            </template>

            <ValidationObserver tag="div" class="casino-place-bet-box" v-slot="{ invalid }">
                <template
                    v-if="$pages.is('casino', $route.name) && $store.state.casinoBet && $store.state.casinoBet != null">
                    <div class="bet-slip pl-0 pr-0">
                        <div class="bet-team mt-0">
                            <span class="bet-team-name">{{ $store.state.casinoBet.nation }}</span>
                            <span class="float-right"
                                v-if="!$store.state.casinoBet.nation.includes('Pair Plus')">{{ $store.state.casinoBet.uRate }}</span>
                        </div>
                    </div>

                    <div class="casino-place-bet-info">
                        <ValidationProvider name="Amount" tag="div" class="bet-input ml-0"
                            :class="[{'back-border': $store.state.casinoBet.betType == 'back'}, {'lay-border': $store.state.casinoBet.betType == 'lay'}]"
                            :rules="{required: true, min_value : 1, max_value : 999999999, regex: /^[0-9]+$/}">
                            <input type="number" id="placebetAmountMobile"
                                v-model.number="$store.state.casinoBet.amount" class="form-control input-stake"
                                onkeypress='return event.charCode >= 48 && event.charCode <= 57' placeholder="Amount">
                        </ValidationProvider>
                    </div>

                    <div class="casino-place-bet-button-container">
                        <template v-for="(btn, key) in $store.state.buttonList">
                            <button class="btn btn-bet" @click="$store.commit('updateCasinoBetAmount', btn.bval)"
                                :key="key">
                                <span>{{ btn.btxt }}</span>
                            </button>
                        </template>
                    </div>
                    <div class="casino-place-bet-action-buttons">
                        <button class="btn btn-primary" :disabled="invalid"
                            @click="$parent.placebetCasino()">Submit</button>
                    </div>
                </template>
            </ValidationObserver>
        </b-modal>

        <b-modal id="betCasinoSodaModal" hide-footer title="MY BETS" modal-class="mybetsmodal">
            <template v-if="$pages.is('casino', $route.name) && $store.state.casinoBetSoda != null">
                <div class="casino-place-bet-header">
                    <div>Matched Bet</div>
                    <div>Odds</div>
                    <div>Stake</div>
                </div>
                <div class="casino-place-bet-body">
                    <template v-for="(data, key) in $store.state.casinoBetSoda">
                        <div class="casino-place-bet-row" :key="key"
                            :class="[{'back-border': data.btype == 'back'}, {'lay-border': data.btype == 'lay'}]">
                            <div>{{ data.nat }}</div>
                            <div>{{ data.urate }}</div>
                            <div>{{ data.amt }}</div>
                        </div>
                    </template>
                </div>
            </template>
        </b-modal>

        <div class="market-show-icon d-none-desktop" v-if="$store.getters.betCasinoSodaTotal"
            v-b-modal.betCasinoSodaModal>
            <span>{{ $store.getters.betCasinoSodaTotal }}</span>
        </div>
    </div>
</template>

<script>
    import ServiceApi from "@/services/ServiceApi";
    import Timer from "@/components/casino/BaseTimer"
    import TimerProgress from "@/components/casino/TimerProgress"
    import LastResultIcon from '@/components/casino/results/LastResultIcon'
    import Card from '@/components/casino/Card'
    import Loader from '@/components/loader'
    import InactivityModal from '@/components/casino/InactivityModal'
    var PlacebetTimer;

    export default {
        mounted() {
            this.$store.state.casinoGameType = this.gameType
            this.getButtonListCs()
            this.reconnectTv()
            this.getCasinoRules()
            this.getCasinoData()
            this.getLastResults()
        },
        components: {
            Timer,
            TimerProgress,
            LastResultIcon,
            Card,
            Loader,
            InactivityModal
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
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'poker20',
                casinoData: [],
                mId: 0,
                cards: [],
                time: {
                    total: 0,
                    current: 0
                },
                callDataApi: true,
                callBookApi: true,
                exp: '',
                tvUrl: '',
                firstCall: true,
                showRules: false,
                rulesHtml: [],
            }
        },
        methods: {
            getButtonListCs() {
                ServiceApi.callApi("api/front/buttonlistcs")
                .then(response => {
                    if (response.status == 200) {
                    this.$store.state.buttonList = response.data.t1
                    this.$store.state.autocon = response.data.autocon
                    this.autocon = this.$store.state.autocon
                    }
                })
                .catch(e => {
                    this.$store.state.buttonList = []
                });
            },
            getCasinoRulesHtml() {
                ServiceApi.callApi("api/front/casinorules", {
                        'type': this.gameType,
                    })
                    .then(response => {
                        console.log(response)
                        if (response.status == 200) {
                            this.showRules = true
                            this.rulesHtml = response.data
                            if (IS_MOBILE) {
                                this.$refs['rules-modal'].show()
                            }
                        } else {
                            this.showRules = false
                            this.rulesHtml = []
                        }
                    })
                    .catch(e => {
                        this.showRules = false
                        this.rulesHtml = []
                    });
            },
            getTvUrl() {
                ServiceApi.callApi("api/front/casino/launchother", {
                        'id': 'tv'
                    })
                    .then(response => {
                        if (response.status == 200) {
                            // console.log(response.data.token)
                            this.tvUrl = '/mediaplayer/' + this.gameType + '/' + response.data.token + '?ip=' +
                                IP_ADDRESS;
                        } else {
                            this.tvUrl = ''
                        }
                    })
                    .catch(e => {
                        this.tvUrl = ''
                    });
            },
            resetInterval() {
                if (INACTIVITY_MODAL) {
                    clearInterval(PlacebetTimer);
                    this.$store.state.placebetInterval = 0
                    var self = this;

                    PlacebetTimer = setInterval(function () {
                        console.log('round', self.$store.state.placebetInterval)
                        if (self.$store.state.placebetInterval >= ROUNDS) {
                            console.log('round reseted', self.$store.state.placebetInterval)
                            clearInterval(PlacebetTimer);
                            self.$refs["tvModal"].show();
                            self.tvUrl = ''
                        }
                    }, 1000);
                }
            },
            reconnectTv() {
                console.log("reconnectTv")
                this.getTvUrl()
                this.resetInterval()
                this.$refs["tvModal"].hide();
            },
            resetPlacebetInterval() {
                console.log("resetPlacebetInterval")
                if (INACTIVITY_MODAL) {
                    if (this.$store.state.placebetInterval >= ROUNDS) {
                        this.getTvUrl()
                    }
                    this.resetInterval()
                    this.$refs["tvModal"].hide();
                }
            },

            toggleCards(card) {
                if (card != '1') {
                    this.showCards = !this.showCards
                }
            },
            getKey(data, key) {
                return _.get(data, 'key')
            },
            getCasinoRules() {
                this.$store.state.casinoRules = null
                ServiceApi.callApi("api/front/casino/rules", {
                        'type': this.gameType,
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.$store.state.casinoRules = response.data
                        } else {
                            this.$store.state.casinoRules = null
                        }
                    })
                    .catch(e => {
                        this.$store.state.casinoRules = null
                    });
            },
            getCasinoData() {
                ServiceApi.callApi("api/front/casino/data", {
                        'type': this.gameType,
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.casinoData = response.data
                            if (_.get(this.casinoData, 'mid') != this.mId) {
                                if (!this.firstCall) {
                                    this.$store.state.placebetInterval++
                                }
                                this.firstCall = false
                                this.getLastResults()
                                this.getUserBook(true, _.get(this.casinoData, 'mid'))
                            }
                            this.mId = _.get(this.casinoData, 'mid')
                            this.getUserBook()
                            // this.exp = _.get(this.$store.state.user, 'exp', 0)
                            this.cards = _.get(this.casinoData, 'card').split(',')
                            this.time.total = _.get(this.casinoData, 'ft')
                            this.time.current = _.get(this.casinoData, 'lt')
                            if (this.callDataApi == true) {
                                setTimeout(res => {
                                    this.getCasinoData();
                                }, 500);
                            }
                        } else {
                            // this.casinoData = []
                            if (this.callDataApi == true) {
                                setTimeout(res => {
                                    this.getCasinoData();
                                }, 500);
                            }
                        }
                    })
                    .catch(e => {
                        // this.casinoData = []
                        if (this.callDataApi == true) {
                            setTimeout(res => {
                                this.getCasinoData();
                            }, 500);
                        }
                    });
            },
            getUserBook(forcecall = false, mid = this.mId) {
                if (this.exp != _.get(this.$store.state.user, 'exp', 0) || forcecall) {
                    ServiceApi.callApi("api/front/casino/book", {
                            'mid': parseInt(mid),
                            'gType': this.gameType
                        })
                        .then(response => {
                            if (response.status == 200) {
                                this.$store.state.casinoBetSoda = response.data.bet
                                this.$store.state.casinoFancybetBook = response.data.fancy
                                this.$store.state.casinobetBook = response.data.sportbet
                                // if (this.callBookApi == true) {
                                //     setTimeout(res => {
                                //         this.getUserBook();
                                //     }, 800);
                                // }
                            } else {
                                this.$store.state.casinoBetSoda = null
                                this.$store.state.casinobetBook = null
                                this.$store.state.casinoFancybetBook = null
                                // if (this.callBookApi == true) {
                                //     setTimeout(res => {
                                //         this.getUserBook();
                                //     }, 800);
                                // }
                            }
                        })
                        .catch(e => {
                            this.$store.state.casinoBetSoda = null
                            this.$store.state.casinobetBook = null
                            this.$store.state.casinoFancybetBook = null
                            // if (this.callBookApi == true) {
                            //     setTimeout(res => {
                            //         this.getUserBook();
                            //     }, 800);
                            // }
                        });

                    this.exp = _.get(this.$store.state.user, 'exp', 0)
                }
            },
            getLastResults() {
                ServiceApi.callApi("api/front/casino/lastresults", {
                        'gType': this.gameType
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.$store.state.lastResults = response.data.res
                            this.gameTitle = response.data.res1.cname
                        } else {
                            this.$store.state.lastResults = []
                        }
                    })
                    .catch(e => {
                        this.$store.state.lastResults = []
                    });

            },
            setBetData(nat, rate, mid, sid, subType, subId, bType, gType, gstatus, min, max) {
                // console.log(nat, rate, mid, sid, subType, subId, bType, gType, gstatus)
                // console.log(min, max)
                if (rate && gstatus == 'OPEN') {
                    let betdata = {
                        subType: subType,
                        marketId: mid,
                        sectionId: sid,
                        subId: subId,
                        uRate: rate,
                        amount: '',
                        betType: bType,
                        gameType: gType,
                        nation: nat,
                        min: min,
                        max: max
                    }
                    this.$store.commit('setCasinoBetData', betdata)
                    // console.log(this.$store.state.casinoBet)

                    if (IS_MOBILE) {
                        setTimeout(() => {
                            document.getElementById("placebetAmountMobile").focus();
                        }, 500);
                        this.$refs['placebet-modal'].show()
                    }
                    setTimeout(() => {
                        document.getElementById("placebetAmountWeb").focus();
                    }, 500);
                }
            },
            placebetCasino() {
                if (this.$store.state.loadingCasinoPlacebet)
                    return
                this.$store.state.loadingCasinoPlacebet = true
                ServiceApi.callApi("api/front/placebetcasino", this.$store.state.casinoBet)
                    .then(response => {
                        if (response.success) {
                            this.$bvToast.toast(response.msg, {
                                variant: 'success',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                            // console.log('success', response.msg)
                            // this.$store.commit('resetCasinoBetData')
                            // this.$refs['placebet-modal'].hide()
                            // this.$store.state.loadingCasinoPlacebet = false
                        } else {
                            this.$bvToast.toast(response.msg, {
                                variant: 'danger',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                            // console.log('fail', response.msg)
                            // this.$store.commit('resetCasinoBetData')
                            // this.$refs['placebet-modal'].hide()
                            // this.$store.state.loadingCasinoPlacebet = false
                        }
                    })
                    .catch(e => {
                        // console.log('error', e)
                        // this.$store.commit('resetCasinoBetData')
                        // this.$refs['placebet-modal'].hide()
                        // this.$store.state.loadingCasinoPlacebet = false
                    })
                    .finally(data => {
                        this.$store.commit('resetCasinoBetData')
                        this.$refs['placebet-modal'].hide()
                        this.resetPlacebetInterval()
                        this.$store.state.loadingCasinoPlacebet = false
                        // console.log(data)
                    });
            },
            hidePlacebetModal() {
                this.$refs['placebet-modal'].hide()
            }
        },
        beforeDestroy() {
            this.callBookApi = false
            this.callDataApi = false
            this.$store.commit('resetCasinoBetData')
            this.$store.state.casinoRules = null
            this.$store.state.casinoBetSoda = null;
            this.$store.state.casinobetBook = null;
            this.$store.state.casinoFancybetBook = null;
            this.$store.state.lastResults = []
            this.$store.state.placebetInterval = 0
            this.$store.state.casinoGameType = ""
            clearInterval(PlacebetTimer);
        }
    }
</script>