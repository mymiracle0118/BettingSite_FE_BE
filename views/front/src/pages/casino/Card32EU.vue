<template>
    <div class="casino-container">
        <!-- Casino Content -->
        <template v-if="!$store.getters.isTablet">
            <TimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current" />
        </template>
        <div class="casino-table cards32b">
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
                <template v-if="casinoData.card">
                    <div class="casino-video-cards" :class="{'hide-cards': (!showCards || !cards.p1.cards.length)}">
                        <div class="casino-cards-shuffle" @click="toggleCards()">
                            <i class="fas fa-grip-lines-vertical"></i>
                        </div>
                        <div class="casino-video-cards-container">
                            <div v-if="cards.p1.cards && cards.p1.cards.length">
                                <div class="dealer-name w-100 mb-1">
                                    <span
                                        :class="{'text-success' : cards.p1.count >= cards.p2.count && cards.p1.count >= cards.p3.count && cards.p1.count >= cards.p4.count }">Player
                                        8: </span>
                                    <span>{{ cards.p1.count }}</span>
                                </div>
                                <div>
                                    <template v-for="(card, key) in cards.p1.cards">
                                        <Card :card="card" :key="key" />
                                    </template>
                                </div>
                            </div>
                            <div v-if="cards.p2.cards && cards.p2.cards.length">
                                <div class="dealer-name w-100 mb-1">
                                    <span
                                        :class="{'text-success' : cards.p2.count >= cards.p1.count && cards.p2.count >= cards.p3.count && cards.p2.count >= cards.p4.count }">Player
                                        9: </span>
                                    <span>{{ cards.p2.count }}</span>
                                </div>
                                <div>
                                    <template v-for="(card, key) in cards.p2.cards">
                                        <Card :card="card" :key="key" />
                                    </template>
                                </div>
                            </div>
                            <div v-if="cards.p3.cards && cards.p3.cards.length">
                                <div class="dealer-name w-100 mb-1">
                                    <span
                                        :class="{'text-success' : cards.p3.count >= cards.p1.count && cards.p3.count >= cards.p2.count && cards.p3.count >= cards.p4.count }">Player
                                        10: </span>
                                    <span>{{ cards.p3.count }}</span>
                                </div>
                                <div>
                                    <template v-for="(card, key) in cards.p3.cards">
                                        <Card :card="card" :key="key" />
                                    </template>
                                </div>
                            </div>
                            <div v-if="cards.p4.cards && cards.p4.cards.length">
                                <div class="dealer-name w-100 mb-1">
                                    <span
                                        :class="{'text-success' : cards.p4.count >= cards.p1.count && cards.p4.count >= cards.p2.count && cards.p4.count >= cards.p3.count }">Player
                                        11: </span>
                                    <span>{{ cards.p4.count }}</span>
                                </div>
                                <div>
                                    <template v-for="(card, key) in cards.p4.cards">
                                        <Card :card="card" :key="key" />
                                    </template>
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
                    <div class="teen1daycasino-container d-none-small">
                        <div class="teen1dayleft">
                            <div class="casino-box-row">
                                <div class="casino-nation-name no-border casino-bl-box-title">
                                    <div class="playerb"></div>
                                </div>
                                <div class="casino-bl-box casino-bl-box-title">
                                    <div class="casino-bl-box-item">
                                        <b>Back</b>
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <b>Lay</b>
                                    </div>
                                </div>
                            </div>
                            <template v-for="(data, key) in main">
                                <div class="casino-box-row" :key="key">
                                    <div class="casino-nation-name">
                                        <b>{{ data.nat }}</b>
                                        <div class="float-right">
                                            <span class="mr-2" v-casinobook="{sid: data.sid}">0</span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': data.gstatus != 'OPEN'}"
                                            @click="setBetData(data.nat, data.b, mId, data.sid, data.subtype, 0, 'back', gameType, data.gstatus, data.min, data.max)">
                                            <span class="casino-box-odd">{{ data.b }}</span>
                                            <!-- <span>0</span> -->
                                        </div>
                                        <div class="lay casino-bl-box-item"
                                            :class="{'suspended': data.gstatus != 'OPEN'}"
                                            @click="setBetData(data.nat, data.l, mId, data.sid, data.subtype, 0, 'lay', gameType, data.gstatus, data.min, data.max)">
                                            <span class="casino-box-odd">{{ data.l }}</span>
                                            <!-- <span>0</span> -->
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                        <div class="teen1daycenter"></div>
                        <div class="teen1dayright">
                            <div class="casino-box-row">
                                <div class="casino-nation-name no-border casino-bl-box-title">
                                    <div class="playerb"></div>
                                </div>
                                <div class="casino-bl-box casino-bl-box-title">
                                    <div class="casino-bl-box-item">
                                        <b>Odd</b>
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <b>Even</b>
                                    </div>
                                </div>
                            </div>
                            <div class="casino-box-row">
                                <div class="casino-nation-name">
                                    <b>Player 8</b>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': fancy[0].gstatus != 'OPEN'}"
                                        @click="setBetData(fancy[0].nat, fancy[0].b, mId, fancy[0].sid, fancy[0].subtype, 0, 'back', gameType, fancy[0].gstatus, fancy[0].min, fancy[0].max)">
                                        <span class="casino-box-odd">{{ fancy[0].b }}</span>
                                        <span v-casinofancybook="{sid: fancy[0].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': fancy[1].gstatus != 'OPEN'}"
                                        @click="setBetData(fancy[1].nat, fancy[1].b, mId, fancy[1].sid, fancy[1].subtype, 0, 'back', gameType, fancy[1].gstatus, fancy[1].min, fancy[1].max)">
                                        <span class="casino-box-odd">{{ fancy[1].b }}</span>
                                        <span v-casinofancybook="{sid: fancy[1].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                            </div>
                            <div class="casino-box-row">
                                <div class="casino-nation-name">
                                    <b>Player 9</b>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': fancy[2].gstatus != 'OPEN'}"
                                        @click="setBetData(fancy[2].nat, fancy[2].b, mId, fancy[2].sid, fancy[2].subtype, 0, 'back', gameType, fancy[2].gstatus, fancy[2].min, fancy[2].max)">
                                        <span class="casino-box-odd">{{ fancy[2].b }}</span>
                                        <span v-casinofancybook="{sid: fancy[2].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': fancy[3].gstatus != 'OPEN'}"
                                        @click="setBetData(fancy[3].nat, fancy[3].b, mId, fancy[3].sid, fancy[3].subtype, 0, 'back', gameType, fancy[3].gstatus, fancy[3].min, fancy[3].max)">
                                        <span class="casino-box-odd">{{ fancy[3].b }}</span>
                                        <span v-casinofancybook="{sid: fancy[3].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                            </div>
                            <div class="casino-box-row">
                                <div class="casino-nation-name">
                                    <b>Player 10</b>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': fancy[4].gstatus != 'OPEN'}"
                                        @click="setBetData(fancy[4].nat, fancy[4].b, mId, fancy[4].sid, fancy[4].subtype, 0, 'back', gameType, fancy[4].gstatus, fancy[4].min, fancy[4].max)">
                                        <span class="casino-box-odd">{{ fancy[4].b }}</span>
                                        <span v-casinofancybook="{sid: fancy[4].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': fancy[5].gstatus != 'OPEN'}"
                                        @click="setBetData(fancy[5].nat, fancy[5].b, mId, fancy[5].sid, fancy[5].subtype, 0, 'back', gameType, fancy[5].gstatus, fancy[5].min, fancy[5].max)">
                                        <span class="casino-box-odd">{{ fancy[5].b }}</span>
                                        <span v-casinofancybook="{sid: fancy[5].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                            </div>
                            <div class="casino-box-row">
                                <div class="casino-nation-name">
                                    <b>Player 11</b>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': fancy[6].gstatus != 'OPEN'}"
                                        @click="setBetData(fancy[6].nat, fancy[6].b, mId, fancy[6].sid, fancy[6].subtype, 0, 'back', gameType, fancy[6].gstatus, fancy[6].min, fancy[6].max)">
                                        <span class="casino-box-odd">{{ fancy[6].b }}</span>
                                        <span v-casinofancybook="{sid: fancy[6].sid, subid: 0}">0</span>
                                    </div>
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': fancy[7].gstatus != 'OPEN'}"
                                        @click="setBetData(fancy[7].nat, fancy[7].b, mId, fancy[7].sid, fancy[7].subtype, 0, 'back', gameType, fancy[7].gstatus, fancy[7].min, fancy[7].max)">
                                        <span class="casino-box-odd">{{ fancy[7].b }}</span>
                                        <span v-casinofancybook="{sid: fancy[7].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="teen1daycasino-container mt-4 d-none-small">
                        <div class="teen1dayleft">
                            <div class="casino-box-row">
                                <div class="casino-nation-name no-border casino-bl-box-title">
                                    <div class="playerb"></div>
                                </div>
                                <div class="casino-bl-box casino-bl-box-title">
                                    <div class="casino-bl-box-item">
                                        <b>Back</b>
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <b>Lay</b>
                                    </div>
                                </div>
                            </div>
                            <template v-for="(data, key) in fancy1">
                                <div class="casino-box-row" :key="key">
                                    <div class="casino-nation-name">
                                        <b>{{ data.nat.replace("Three","3") }}</b>
                                        <div class="float-right">
                                            <span class="mr-2" v-casinofancybook="{sid: data.sid, subid: 0}">0</span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="back casino-bl-box-item"
                                            :class="{'suspended': data.gstatus != 'OPEN'}"
                                            @click="setBetData(data.nat, data.b, mId, data.sid, data.subtype, 0, 'back', gameType, data.gstatus, data.min, data.max)">
                                            <span class="casino-box-odd">{{ data.b }}</span>
                                            <!-- <span>0</span> -->
                                        </div>
                                        <div class="lay casino-bl-box-item"
                                            :class="{'suspended': data.gstatus != 'OPEN'}"
                                            @click="setBetData(data.nat, data.l, mId, data.sid, data.subtype, 0, 'lay', gameType, data.gstatus, data.min, data.max)">
                                            <span class="casino-box-odd">{{ data.l }}</span>
                                            <!-- <span>0</span> -->
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                        <div class="teen1daycenter"></div>
                        <div class="teen1dayright">
                            <div class="casino-box-row">
                                <div class="casino-nation-name no-border casino-bl-box-title">
                                    <div class="playerb"></div>
                                </div>
                                <div class="casino-bl-box casino-bl-box-title">
                                    <div class="casino-bl-box-item">
                                        <b>Back</b>
                                    </div>
                                    <div class="casino-bl-box-item">
                                        <b>Back</b>
                                    </div>
                                </div>
                            </div>
                            <div class="casino-box-row">
                                <div class="casino-nation-name">
                                    <b>{{ fancy[18].nat }}</b>
                                    <div class="float-right">
                                        <span class="mr-2" v-casinofancybook="{sid: fancy[18].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': fancy[18].gstatus != 'OPEN'}"
                                        @click="setBetData(fancy[18].nat, fancy[18].b, mId, fancy[18].sid, fancy[18].subtype, 0, 'back', gameType, fancy[18].gstatus, fancy[18].min, fancy[18].max)">
                                        <span class="casino-box-odd">{{ fancy[18].b }}</span>
                                        <!-- <span>0</span> -->
                                    </div>
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': fancy[18].gstatus != 'OPEN'}"
                                        @click="setBetData(fancy[18].nat, fancy[18].l, mId, fancy[18].sid, fancy[18].subtype, 0, 'lay', gameType, fancy[18].gstatus, fancy[18].min, fancy[18].max)">
                                        <span class="casino-box-odd">{{ fancy[18].l }}</span>
                                        <!-- <span>0</span> -->
                                    </div>
                                </div>
                            </div>
                            <div class="casino-box-row">
                                <div class="casino-nation-name">
                                    <b>{{ fancy[19].nat }}</b>
                                    <div class="float-right">
                                        <span class="mr-2" v-casinofancybook="{sid: fancy[19].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': fancy[19].gstatus != 'OPEN'}"
                                        @click="setBetData(fancy[19].nat, fancy[19].b, mId, fancy[19].sid, fancy[19].subtype, 0, 'back', gameType, fancy[19].gstatus, fancy[19].min, fancy[19].max)">
                                        <span class="casino-box-odd">{{ fancy[19].b }}</span>
                                        <!-- <span>0</span> -->
                                    </div>
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': fancy[19].gstatus != 'OPEN'}"
                                        @click="setBetData(fancy[19].nat, fancy[19].l, mId, fancy[19].sid, fancy[19].subtype, 0, 'lay', gameType, fancy[19].gstatus, fancy[19].min, fancy[19].max)">
                                        <span class="casino-box-odd">{{ fancy[19].l }}</span>
                                        <!-- <span>0</span> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="text-center mt-4 d-none-small pr">
                        <b>{{ fancy[8].b }}</b>
                    </div>

                    <div class="d-none-small cards32bextra mt-1">
                        <div class="casino-bl-box">
                            <template v-for="(i, key) in 10">
                                <div class="casino-bl-box-item back" :key="key"
                                    :class="{'suspended': fancy[key+8].gstatus != 'OPEN'}"
                                    @click="setBetData(fancy[key+8].nat, fancy[key+8].b, mId, fancy[key+8].sid, fancy[key+8].subtype, 0, 'back', gameType, fancy[key+8].gstatus, fancy[key+8].min, fancy[key+8].max)">
                                    <span class="casino-box-odd" v-if="i == 10">0</span>
                                    <span class="casino-box-odd" v-else>{{ i }}</span>
                                    <span v-casinofancybook="{sid: fancy[key+8].sid, subid: 0}">0</span>
                                </div>
                            </template>
                        </div>
                    </div>
                </template>

                <template v-if="!$store.getters.isTablet">
                    <div class="teen1daycasino-container d-none-big">
                        <div class="casino-box-row">
                            <div class="casino-nation-name no-border casino-bl-box-title">
                                <div class="playerb"></div>
                            </div>
                            <div class="casino-bl-box casino-bl-box-title">
                                <div class="casino-bl-box-item">
                                    <b>Back</b>
                                </div>
                                <div class="casino-bl-box-item">
                                    <b>Lay</b>
                                </div>
                            </div>
                        </div>
                        <template v-for="(data, key) in main">
                            <div class="casino-box-row" :key="key">
                                <div class="casino-nation-name">
                                    <b>{{ data.nat }}</b>
                                    <div class="float-right">
                                        <span class="mr-2" v-casinobook="{sid: data.sid}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item" :class="{'suspended': data.gstatus != 'OPEN'}"
                                        @click="setBetData(data.nat, data.b, mId, data.sid, data.subtype, 0, 'back', gameType, data.gstatus, data.min, data.max)">
                                        <span class="casino-box-odd">{{ data.b }}</span>
                                        <!-- <span>0</span> -->
                                    </div>
                                    <div class="lay casino-bl-box-item" :class="{'suspended': data.gstatus != 'OPEN'}"
                                        @click="setBetData(data.nat, data.l, mId, data.sid, data.subtype, 0, 'lay', gameType, data.gstatus, data.min, data.max)">
                                        <span class="casino-box-odd">{{ data.l }}</span>
                                        <!-- <span>0</span> -->
                                    </div>
                                </div>
                            </div>
                        </template>

                        <div class="casino-box-row">
                            <div class="casino-nation-name no-border casino-bl-box-title">
                                <div class="playerb"></div>
                            </div>
                            <div class="casino-bl-box casino-bl-box-title">
                                <div class="casino-bl-box-item">
                                    <b>Odd</b>
                                </div>
                                <div class="casino-bl-box-item">
                                    <b>Even</b>
                                </div>
                            </div>
                        </div>
                        <div class="casino-box-row">
                            <div class="casino-nation-name">
                                <b>Player 8</b>
                            </div>
                            <div class="casino-bl-box">
                                <div class="back casino-bl-box-item" :class="{'suspended': fancy[0].gstatus != 'OPEN'}"
                                    @click="setBetData(fancy[0].nat, fancy[0].b, mId, fancy[0].sid, fancy[0].subtype, 0, 'back', gameType, fancy[0].gstatus, fancy[0].min, fancy[0].max)">
                                    <span class="casino-box-odd">{{ fancy[0].b }}</span>
                                    <span v-casinofancybook="{sid: fancy[0].sid, subid: 0}">0</span>
                                </div>
                                <div class="back casino-bl-box-item" :class="{'suspended': fancy[1].gstatus != 'OPEN'}"
                                    @click="setBetData(fancy[1].nat, fancy[1].b, mId, fancy[1].sid, fancy[1].subtype, 0, 'back', gameType, fancy[1].gstatus, fancy[1].min, fancy[1].max)">
                                    <span class="casino-box-odd">{{ fancy[1].b }}</span>
                                    <span v-casinofancybook="{sid: fancy[1].sid, subid: 0}">0</span>
                                </div>
                            </div>
                        </div>
                        <div class="casino-box-row">
                            <div class="casino-nation-name">
                                <b>Player 9</b>
                            </div>
                            <div class="casino-bl-box">
                                <div class="back casino-bl-box-item" :class="{'suspended': fancy[2].gstatus != 'OPEN'}"
                                    @click="setBetData(fancy[2].nat, fancy[2].b, mId, fancy[2].sid, fancy[2].subtype, 0, 'back', gameType, fancy[2].gstatus, fancy[2].min, fancy[2].max)">
                                    <span class="casino-box-odd">{{ fancy[2].b }}</span>
                                    <span v-casinofancybook="{sid: fancy[2].sid, subid: 0}">0</span>
                                </div>
                                <div class="back casino-bl-box-item" :class="{'suspended': fancy[3].gstatus != 'OPEN'}"
                                    @click="setBetData(fancy[3].nat, fancy[3].b, mId, fancy[3].sid, fancy[3].subtype, 0, 'back', gameType, fancy[3].gstatus, fancy[3].min, fancy[3].max)">
                                    <span class="casino-box-odd">{{ fancy[3].b }}</span>
                                    <span v-casinofancybook="{sid: fancy[3].sid, subid: 0}">0</span>
                                </div>
                            </div>
                        </div>
                        <div class="casino-box-row">
                            <div class="casino-nation-name">
                                <b>Player 10</b>
                            </div>
                            <div class="casino-bl-box">
                                <div class="back casino-bl-box-item" :class="{'suspended': fancy[4].gstatus != 'OPEN'}"
                                    @click="setBetData(fancy[4].nat, fancy[4].b, mId, fancy[4].sid, fancy[4].subtype, 0, 'back', gameType, fancy[4].gstatus, fancy[4].min, fancy[4].max)">
                                    <span class="casino-box-odd">{{ fancy[4].b }}</span>
                                    <span v-casinofancybook="{sid: fancy[4].sid, subid: 0}">0</span>
                                </div>
                                <div class="back casino-bl-box-item" :class="{'suspended': fancy[5].gstatus != 'OPEN'}"
                                    @click="setBetData(fancy[5].nat, fancy[5].b, mId, fancy[5].sid, fancy[5].subtype, 0, 'back', gameType, fancy[5].gstatus, fancy[5].min, fancy[5].max)">
                                    <span class="casino-box-odd">{{ fancy[5].b }}</span>
                                    <span v-casinofancybook="{sid: fancy[5].sid, subid: 0}">0</span>
                                </div>
                            </div>
                        </div>
                        <div class="casino-box-row">
                            <div class="casino-nation-name">
                                <b>Player 11</b>
                            </div>
                            <div class="casino-bl-box">
                                <div class="back casino-bl-box-item" :class="{'suspended': fancy[6].gstatus != 'OPEN'}"
                                    @click="setBetData(fancy[6].nat, fancy[6].b, mId, fancy[6].sid, fancy[6].subtype, 0, 'back', gameType, fancy[6].gstatus, fancy[6].min, fancy[6].max)">
                                    <span class="casino-box-odd">{{ fancy[6].b }}</span>
                                    <span v-casinofancybook="{sid: fancy[6].sid, subid: 0}">0</span>
                                </div>
                                <div class="back casino-bl-box-item" :class="{'suspended': fancy[7].gstatus != 'OPEN'}"
                                    @click="setBetData(fancy[7].nat, fancy[7].b, mId, fancy[7].sid, fancy[7].subtype, 0, 'back', gameType, fancy[7].gstatus, fancy[7].min, fancy[7].max)">
                                    <span class="casino-box-odd">{{ fancy[7].b }}</span>
                                    <span v-casinofancybook="{sid: fancy[7].sid, subid: 0}">0</span>
                                </div>
                            </div>
                        </div>

                        <div class="casino-box-row">
                            <div class="casino-nation-name no-border casino-bl-box-title">
                                <div class="playerb"></div>
                            </div>
                            <div class="casino-bl-box casino-bl-box-title">
                                <div class="casino-bl-box-item">
                                    <b>Back</b>
                                </div>
                                <div class="casino-bl-box-item">
                                    <b>Lay</b>
                                </div>
                            </div>
                        </div>
                        <template v-for="(data, key) in fancy1">
                            <div class="casino-box-row" :key="`fancy1-${key}`">
                                <div class="casino-nation-name">
                                    <b>{{ data.nat.replace("Three","3") }}</b>
                                    <div class="float-right">
                                        <span class="mr-2" v-casinofancybook="{sid: data.sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item" :class="{'suspended': data.gstatus != 'OPEN'}"
                                        @click="setBetData(data.nat, data.b, mId, data.sid, data.subtype, 0, 'back', gameType, data.gstatus, data.min, data.max)">
                                        <span class="casino-box-odd">{{ data.b }}</span>
                                    </div>
                                    <div class="lay casino-bl-box-item" :class="{'suspended': data.gstatus != 'OPEN'}"
                                        @click="setBetData(data.nat, data.l, mId, data.sid, data.subtype, 0, 'lay', gameType, data.gstatus, data.min, data.max)">
                                        <span class="casino-box-odd">{{ data.l }}</span>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <div class="casino-box-row">
                            <div class="casino-nation-name no-border casino-bl-box-title">
                                <div class="playerb"></div>
                            </div>
                            <div class="casino-bl-box casino-bl-box-title">
                                <div class="casino-bl-box-item">
                                    <b>Back</b>
                                </div>
                                <div class="casino-bl-box-item">
                                    <b>Back</b>
                                </div>
                            </div>
                        </div>
                        <div class="casino-box-row">
                            <div class="casino-nation-name">
                                <b>{{ fancy[18].nat }}</b>
                                <div class="float-right">
                                    <span class="mr-2" v-casinofancybook="{sid: fancy[18].sid, subid: 0}">0</span>
                                </div>
                            </div>
                            <div class="casino-bl-box">
                                <div class="back casino-bl-box-item" :class="{'suspended': fancy[18].gstatus != 'OPEN'}"
                                    @click="setBetData(fancy[18].nat, fancy[18].b, mId, fancy[18].sid, fancy[18].subtype, 0, 'back', gameType, fancy[18].gstatus, fancy[18].min, fancy[18].max)">
                                    <span class="casino-box-odd">{{ fancy[18].b }}</span>
                                </div>
                                <div class="back casino-bl-box-item" :class="{'suspended': fancy[18].gstatus != 'OPEN'}"
                                    @click="setBetData(fancy[18].nat, fancy[18].l, mId, fancy[18].sid, fancy[18].subtype, 0, 'lay', gameType, fancy[18].gstatus, fancy[18].min, fancy[18].max)">
                                    <span class="casino-box-odd">{{ fancy[18].l }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="casino-box-row">
                            <div class="casino-nation-name">
                                <b>{{ fancy[19].nat }}</b>
                                <div class="float-right">
                                    <span class="mr-2" v-casinofancybook="{sid: fancy[19].sid, subid: 0}">0</span>
                                </div>
                            </div>
                            <div class="casino-bl-box">
                                <div class="back casino-bl-box-item" :class="{'suspended': fancy[19].gstatus != 'OPEN'}"
                                    @click="setBetData(fancy[19].nat, fancy[19].b, mId, fancy[19].sid, fancy[19].subtype, 0, 'back', gameType, fancy[19].gstatus, fancy[19].min, fancy[19].max)">
                                    <span class="casino-box-odd">{{ fancy[19].b }}</span>
                                </div>
                                <div class="back casino-bl-box-item" :class="{'suspended': fancy[19].gstatus != 'OPEN'}"
                                    @click="setBetData(fancy[19].nat, fancy[19].l, mId, fancy[19].sid, fancy[19].subtype, 0, 'lay', gameType, fancy[19].gstatus, fancy[19].min, fancy[19].max)">
                                    <span class="casino-box-odd">{{ fancy[19].l }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="text-center w-100 pr">
                            <b>{{ fancy[8].b }}</b>
                        </div>
                        <div class="cards32bextra">
                            <div class="casino-bl-box">
                                <template v-for="(i, key) in 10">
                                    <div class="casino-bl-box-item back" :key="`single-${key}`"
                                        :class="{'suspended': fancy[key+8].gstatus != 'OPEN'}"
                                        @click="setBetData(fancy[key+8].nat, fancy[key+8].b, mId, fancy[key+8].sid, fancy[key+8].subtype, 0, 'back', gameType, fancy[key+8].gstatus, fancy[key+8].min, fancy[key+8].max)">
                                        <span class="casino-box-odd" v-if="i == 10">0</span>
                                        <span class="casino-box-odd" v-else>{{ i }}</span>
                                        <span v-casinofancybook="{sid: fancy[key+8].sid, subid: 0}">0</span>
                                    </div>
                                </template>
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
                    'subtype': 'card32eu'
                })
                return this.orderBy(player, 'sr')
            },
            fancy() {
                var player = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'card32eufancy'
                })
                return this.orderBy(player, 'sr')
            },
            fancy1() {
                var player = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'card32eufancy1'
                })
                return this.orderBy(player, 'sr')
            }
        },
        data() {
            return {
                showCards: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'card32eu',
                casinoData: [],
                mId: 0,
                cards: {},
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
                if (this.cards.p1.cards.length) {
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
            getCardValue(card) {
                var cardno = 0;
                if (card.length == 4) {
                    cardno = card.slice(0, 2);
                } else {
                    cardno = card.slice(0, 1);
                }
                if (cardno == "K") {
                    cardno = 13;
                }
                if (cardno == "Q") {
                    cardno = 12;
                }
                if (cardno == "J") {
                    cardno = 11;
                }
                if (cardno == "A") {
                    cardno = 1;
                }

                return parseInt(cardno);
            },
            getCasinoData() {
                ServiceApi.callApi("api/front/casino/data", {
                        'type': this.gameType,
                    })
                    .then(response => {
                        if (response.status == 200) {
                            var p1 = {
                                count: 8,
                                cards: []
                            }
                            var p2 = {
                                count: 9,
                                cards: []
                            }
                            var p3 = {
                                count: 10,
                                cards: []
                            }
                            var p4 = {
                                count: 11,
                                cards: []
                            }

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
                            this.time.total = _.get(this.casinoData, 'ft')
                            this.time.current = _.get(this.casinoData, 'lt')

                            var playerNo = 1;
                            var cards = response.data.card.split(',')

                            for (const card of cards) {
                                if (playerNo > 4)
                                    playerNo = 1;

                                if (card != '1') {
                                    if (playerNo == 1) {
                                        p1.cards.push(card)
                                        p1.count += this.getCardValue(card);
                                    }

                                    if (playerNo == 2) {
                                        p2.cards.push(card)
                                        p2.count += this.getCardValue(card);
                                    }

                                    if (playerNo == 3) {
                                        p3.cards.push(card)
                                        p3.count += this.getCardValue(card);
                                    }

                                    if (playerNo == 4) {
                                        p4.cards.push(card)
                                        p4.count += this.getCardValue(card);
                                    }
                                }
                                playerNo++;
                            }
                            Vue.set(this.cards, 'p1', p1)
                            Vue.set(this.cards, 'p2', p2)
                            Vue.set(this.cards, 'p3', p3)
                            Vue.set(this.cards, 'p4', p4)

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
            this.$store.state.casinoBetSoda = null
            this.$store.state.casinobetBook = null
            this.$store.state.casinoFancybetBook = null
            this.$store.state.lastResults = []
            this.$store.state.placebetInterval = 0
            this.$store.state.casinoGameType = ""
            clearInterval(PlacebetTimer);
        }
    }
</script>