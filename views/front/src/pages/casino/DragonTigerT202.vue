<template>
    <div class="casino-container">
        <!-- Casino Content -->
        <template v-if="!$store.getters.isTablet">
            <TimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current" />
        </template>
        <div class="casino-table dt20">
            <div class="casino-video">
                <InactivityModal ref="tvModal"/>
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
                            <div>
                                <Card :card="cards[0]" />
                                <Card :card="cards[1]" />
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
                <div class="dtobx-top">
                    <div class="dragon-box" :class="{'suspended': main[0].gstatus != 'OPEN'}"
                        @click="setBetData(main[0].nat, main[0].b, mId, main[0].sid, main[0].subtype, 0, 'back', gameType, main[0].gstatus, main[0].min, main[0].max)">
                        <div class="flex-book">
                            <b>Dragon</b>
                            <span class="d-block" v-casinofancybook="{sid: main[0].sid, subid: 0}">0</span>
                        </div>
                        <div class="text-center flex-odds">
                            <span class="d-block"><b>{{ main[0].b }}</b></span>
                        </div>
                    </div>
                    <div class="tiebox" :class="{'suspended': main[2].gstatus != 'OPEN'}"
                        @click="setBetData(main[2].nat, main[2].b, mId, main[2].sid, main[2].subtype, 0, 'back', gameType, main[2].gstatus, main[2].min, main[2].max)">
                        <div><b>Tie</b></div>
                        <div class="text-center flex-odds">
                            <span class="d-block"><b>{{ main[2].b }}</b></span>
                            <span class="d-block" v-casinofancybook="{sid: main[2].sid, subid: 0}">0</span>
                        </div>
                    </div>
                    <div class="tiger-box" :class="{'suspended': main[1].gstatus != 'OPEN'}"
                        @click="setBetData(main[1].nat, main[1].b, mId, main[1].sid, main[1].subtype, 0, 'back', gameType, main[1].gstatus, main[1].min, main[1].max)">
                        <div class="flex-book">
                            <b>Tiger</b>
                            <span class="d-block" v-casinofancybook="{sid: main[1].sid, subid: 0}">0</span>
                        </div>
                        <div class="text-center flex-odds">
                            <span class="d-block"><b>{{ main[1].b }}</b></span>
                        </div>
                    </div>
                    <div class="pair-box" :class="{'suspended': main[3].gstatus != 'OPEN'}"
                        @click="setBetData(main[3].nat, main[3].b, mId, main[3].sid, main[3].subtype, 0, 'back', gameType, main[3].gstatus, main[3].min, main[3].max)">
                        <div><b>Pair</b></div>
                        <div class="text-center flex-odds">
                            <span class="d-block"><b>{{ main[3].b }}</b></span>
                            <span class="d-block" v-casinofancybook="{sid: main[3].sid, subid: 0}">0</span>
                        </div>
                    </div>
                </div>

                <div class="teen1daycasino-container mt-3">
                    <div class="teen1dayleft">
                        <div>
                            <div class="casino-box-row justify-content-center casino-odds">
                                <div class="text-left w-100">
                                    <b class="text-playera">Dragon</b>
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
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[4].gstatus != 'OPEN'}"
                                        @click="setBetData(main[4].nat, main[4].b, mId, main[4].sid, main[4].subtype, 0, 'back', gameType, main[4].gstatus, main[4].min, main[4].max)">
                                        <span class="casino-box-odd">Even</span>
                                        <span v-casinofancybook="{sid: main[4].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[5].gstatus != 'OPEN'}"
                                        @click="setBetData(main[5].nat, main[5].b, mId, main[5].sid, main[5].subtype, 0, 'back', gameType, main[5].gstatus, main[5].min, main[5].max)">
                                        <span class="casino-box-odd">Odd</span>
                                        <span v-casinofancybook="{sid: main[5].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item casino-card-img" :class="{'suspended': main[7].gstatus != 'OPEN'}"
                                        @click="setBetData(main[7].nat, main[7].b, mId, main[7].sid, main[7].subtype, 0, 'back', gameType, main[7].gstatus, main[7].min, main[7].max)">
                                        <span>
                                            <img :src="`${imgPath}front/img/cards/spade.png`">
                                            <img :src="`${imgPath}front/img/cards/club.png`">
                                        </span>
                                        <span v-casinofancybook="{sid: main[7].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item casino-card-img" :class="{'suspended': main[6].gstatus != 'OPEN'}"
                                        @click="setBetData(main[6].nat, main[6].b, mId, main[6].sid, main[6].subtype, 0, 'back', gameType, main[6].gstatus, main[6].min, main[6].max)">
                                        <span>
                                            <img :src="`${imgPath}front/img/cards/heart.png`">
                                            <img :src="`${imgPath}front/img/cards/diamond.png`">
                                        </span>
                                        <span v-casinofancybook="{sid: main[6].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="casino-box cards-box mt-3">
                            <div class="w-100">
                                <div class="casino-odds">
                                    <div class="text-center w-100">
                                        <b>{{ main[8].b }}</b>
                                    </div>
                                </div>
                                <div class="casino-cards text-center mt-1">
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[8].gstatus != 'OPEN'}"
                                            @click="setBetData(main[8].nat, main[8].b, mId, main[8].sid, main[8].subtype, 0, 'back', gameType, main[8].gstatus, main[8].min, main[8].max)">
                                            <img :src="`${imgPath}front/img/cards/A.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[8].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[9].gstatus != 'OPEN'}"
                                            @click="setBetData(main[9].nat, main[9].b, mId, main[9].sid, main[9].subtype, 0, 'back', gameType, main[9].gstatus, main[9].min, main[9].max)">
                                            <img :src="`${imgPath}front/img/cards/2.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[9].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[10].gstatus != 'OPEN'}"
                                            @click="setBetData(main[10].nat, main[10].b, mId, main[10].sid, main[10].subtype, 0, 'back', gameType, main[10].gstatus, main[10].min, main[10].max)">
                                            <img :src="`${imgPath}front/img/cards/3.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[10].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[11].gstatus != 'OPEN'}"
                                            @click="setBetData(main[11].nat, main[11].b, mId, main[11].sid, main[11].subtype, 0, 'back', gameType, main[11].gstatus, main[11].min, main[11].max)">
                                            <img :src="`${imgPath}front/img/cards/4.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[11].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[12].gstatus != 'OPEN'}"
                                            @click="setBetData(main[12].nat, main[12].b, mId, main[12].sid, main[12].subtype, 0, 'back', gameType, main[12].gstatus, main[12].min, main[12].max)">
                                            <img :src="`${imgPath}front/img/cards/5.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[12].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[13].gstatus != 'OPEN'}"
                                            @click="setBetData(main[13].nat, main[13].b, mId, main[13].sid, main[13].subtype, 0, 'back', gameType, main[13].gstatus, main[13].min, main[13].max)">
                                            <img :src="`${imgPath}front/img/cards/6.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[13].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[14].gstatus != 'OPEN'}"
                                            @click="setBetData(main[14].nat, main[14].b, mId, main[14].sid, main[14].subtype, 0, 'back', gameType, main[14].gstatus, main[14].min, main[14].max)">
                                            <img :src="`${imgPath}front/img/cards/7.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[14].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[15].gstatus != 'OPEN'}"
                                            @click="setBetData(main[15].nat, main[15].b, mId, main[15].sid, main[15].subtype, 0, 'back', gameType, main[15].gstatus, main[15].min, main[15].max)">
                                            <img :src="`${imgPath}front/img/cards/8.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[15].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[16].gstatus != 'OPEN'}"
                                            @click="setBetData(main[16].nat, main[16].b, mId, main[16].sid, main[16].subtype, 0, 'back', gameType, main[16].gstatus, main[16].min, main[16].max)">
                                            <img :src="`${imgPath}front/img/cards/9.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[16].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[17].gstatus != 'OPEN'}"
                                            @click="setBetData(main[17].nat, main[17].b, mId, main[17].sid, main[17].subtype, 0, 'back', gameType, main[17].gstatus, main[17].min, main[17].max)">
                                            <img :src="`${imgPath}front/img/cards/10.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[17].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[18].gstatus != 'OPEN'}"
                                            @click="setBetData(main[18].nat, main[18].b, mId, main[18].sid, main[18].subtype, 0, 'back', gameType, main[18].gstatus, main[18].min, main[18].max)">
                                            <img :src="`${imgPath}front/img/cards/J.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[18].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[19].gstatus != 'OPEN'}"
                                            @click="setBetData(main[19].nat, main[19].b, mId, main[19].sid, main[19].subtype, 0, 'back', gameType, main[19].gstatus, main[19].min, main[19].max)">
                                            <img :src="`${imgPath}front/img/cards/Q.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[19].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[20].gstatus != 'OPEN'}"
                                            @click="setBetData(main[20].nat, main[20].b, mId, main[20].sid, main[20].subtype, 0, 'back', gameType, main[20].gstatus, main[20].min, main[20].max)">
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
                            <div class="casino-box-row justify-content-center casino-odds">
                                <div class="text-left w-100">
                                    <b class="text-playerb">Tiger</b>
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
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[21].gstatus != 'OPEN'}"
                                        @click="setBetData(main[21].nat, main[21].b, mId, main[21].sid, main[21].subtype, 0, 'back', gameType, main[21].gstatus, main[21].min, main[21].max)">
                                        <span class="casino-box-odd">Even</span>
                                        <span v-casinofancybook="{sid: main[21].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[22].gstatus != 'OPEN'}"
                                        @click="setBetData(main[22].nat, main[22].b, mId, main[22].sid, main[22].subtype, 0, 'back', gameType, main[22].gstatus, main[22].min, main[22].max)">
                                        <span class="casino-box-odd">Odd</span>
                                        <span v-casinofancybook="{sid: main[22].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item casino-card-img" :class="{'suspended': main[24].gstatus != 'OPEN'}"
                                        @click="setBetData(main[24].nat, main[24].b, mId, main[24].sid, main[24].subtype, 0, 'back', gameType, main[24].gstatus, main[24].min, main[24].max)">
                                        <span>
                                            <img :src="`${imgPath}front/img/cards/spade.png`">
                                            <img :src="`${imgPath}front/img/cards/club.png`">
                                        </span>
                                        <span v-casinofancybook="{sid: main[24].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item casino-card-img" :class="{'suspended': main[23].gstatus != 'OPEN'}"
                                        @click="setBetData(main[23].nat, main[23].b, mId, main[23].sid, main[23].subtype, 0, 'back', gameType, main[23].gstatus, main[23].min, main[23].max)">
                                        <span>
                                            <img :src="`${imgPath}front/img/cards/heart.png`">
                                            <img :src="`${imgPath}front/img/cards/diamond.png`">
                                        </span>
                                        <span v-casinofancybook="{sid: main[23].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="casino-box cards-box mt-3">
                            <div class="w-100">
                                <div class="casino-odds">
                                    <div class="text-center w-100">
                                        <b>{{ main[25].b }}</b>
                                    </div>
                                </div>
                                <div class="casino-cards text-center mt-1">
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[25].gstatus != 'OPEN'}"
                                            @click="setBetData(main[25].nat, main[25].b, mId, main[25].sid, main[25].subtype, 0, 'back', gameType, main[25].gstatus, main[25].min, main[25].max)">
                                            <img :src="`${imgPath}front/img/cards/A.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[25].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[26].gstatus != 'OPEN'}"
                                            @click="setBetData(main[26].nat, main[26].b, mId, main[26].sid, main[26].subtype, 0, 'back', gameType, main[26].gstatus, main[26].min, main[26].max)">
                                            <img :src="`${imgPath}front/img/cards/2.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[26].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[27].gstatus != 'OPEN'}"
                                            @click="setBetData(main[27].nat, main[27].b, mId, main[27].sid, main[27].subtype, 0, 'back', gameType, main[27].gstatus, main[27].min, main[27].max)">
                                            <img :src="`${imgPath}front/img/cards/3.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[27].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[28].gstatus != 'OPEN'}"
                                            @click="setBetData(main[28].nat, main[28].b, mId, main[28].sid, main[28].subtype, 0, 'back', gameType, main[28].gstatus, main[28].min, main[28].max)">
                                            <img :src="`${imgPath}front/img/cards/4.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[28].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[29].gstatus != 'OPEN'}"
                                            @click="setBetData(main[29].nat, main[29].b, mId, main[29].sid, main[29].subtype, 0, 'back', gameType, main[29].gstatus, main[29].min, main[29].max)">
                                            <img :src="`${imgPath}front/img/cards/5.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[29].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[30].gstatus != 'OPEN'}"
                                            @click="setBetData(main[30].nat, main[30].b, mId, main[30].sid, main[30].subtype, 0, 'back', gameType, main[30].gstatus, main[30].min, main[30].max)">
                                            <img :src="`${imgPath}front/img/cards/6.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[30].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[31].gstatus != 'OPEN'}"
                                            @click="setBetData(main[31].nat, main[31].b, mId, main[31].sid, main[31].subtype, 0, 'back', gameType, main[31].gstatus, main[31].min, main[31].max)">
                                            <img :src="`${imgPath}front/img/cards/7.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[31].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[32].gstatus != 'OPEN'}"
                                        @click="setBetData(main[32].nat, main[32].b, mId, main[32].sid, main[32].subtype, 0, 'back', gameType, main[32].gstatus, main[32].min, main[32].max)">
                                            <img :src="`${imgPath}front/img/cards/8.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[32].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[33].gstatus != 'OPEN'}"
                                            @click="setBetData(main[33].nat, main[33].b, mId, main[33].sid, main[33].subtype, 0, 'back', gameType, main[33].gstatus, main[33].min, main[33].max)">
                                            <img :src="`${imgPath}front/img/cards/9.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[33].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[34].gstatus != 'OPEN'}"
                                            @click="setBetData(main[34].nat, main[34].b, mId, main[34].sid, main[34].subtype, 0, 'back', gameType, main[34].gstatus, main[34].min, main[34].max)">
                                            <img :src="`${imgPath}front/img/cards/10.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[34].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[35].gstatus != 'OPEN'}"
                                            @click="setBetData(main[35].nat, main[35].b, mId, main[35].sid, main[35].subtype, 0, 'back', gameType, main[35].gstatus, main[35].min, main[35].max)">
                                            <img :src="`${imgPath}front/img/cards/J.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[35].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[36].gstatus != 'OPEN'}"
                                            @click="setBetData(main[36].nat, main[36].b, mId, main[36].sid, main[36].subtype, 0, 'back', gameType, main[36].gstatus, main[36].min, main[36].max)">
                                            <img :src="`${imgPath}front/img/cards/Q.png`">
                                        </div>
                                        <div class="casino-book" v-casinofancybook="{sid: main[36].sid, subid: 0}">0
                                        </div>
                                    </div>
                                    <div class="casino-card-item">
                                        <div class=" card-image" :class="{'suspended': main[37].gstatus != 'OPEN'}"
                                            @click="setBetData(main[37].nat, main[37].b, mId, main[37].sid, main[37].subtype, 0, 'back', gameType, main[37].gstatus, main[37].min, main[37].max)">
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
            </div>

            <template v-if="casinoData.remark && casinoData.remark != ''">
                <div class="casino-remark mt-1 w-100">
                    <div class="remark-icon">
                        <img :src="`${imgPath}front/img/icons/remark.png`">
                    </div>
                    <marquee>{{ casinoData.remark }}</marquee>
                </div>
            </template>

            <template v-if="!$store.getters.isTablet">
                <LastResultIcon />
            </template>
            
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
                    <template v-if="$pages.is('casino', $route.name) && $store.state.casinoBet && $store.state.casinoBet != null">
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
                            <input type="number" id="placebetAmountMobile" v-model.number="$store.state.casinoBet.amount"
                                class="form-control input-stake"
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
                        <button class="btn btn-primary" :disabled="invalid" @click="$parent.placebetCasino()">Submit</button>
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

        <div class="market-show-icon d-none-desktop" v-if="$store.getters.betCasinoSodaTotal" v-b-modal.betCasinoSodaModal>
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
                    'subtype': 'dt202'
                })
                return this.orderBy(player, 'sr')
            }
        },
        data() {
            return {
                showCards: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'dt202',
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
                if(this.exp != _.get(this.$store.state.user, 'exp', 0) || forcecall){
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
                        max: max,
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
                        } else {
                            this.$bvToast.toast(response.msg, {
                                variant: 'danger',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                            // console.log('fail', response.msg)
                        }
                    })
                    .catch(e => {
                        // console.log('error', e)
                    })
                    .finally(data => {
                        this.$store.commit('resetCasinoBetData')
                        this.$refs['placebet-modal'].hide()
                        this.resetPlacebetInterval()
                        this.$store.state.loadingCasinoPlacebet = false
                        // console.log(data)
                    });
            },
            hidePlacebetModal(){
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