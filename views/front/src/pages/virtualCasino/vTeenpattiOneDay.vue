<template>
    <div class="virtual-casino-container vcasino vteen1day hidden-landscape" 
        :class="[{'vteen': !$store.getters.isMobile}, {'vteen-mobile': $store.getters.isMobile}]">
        <div class="hide-landscape d-none-desktop">
            <div>Sorry for Inconvenience</div>
            <div>This Casino is not supported in Landscape Mode, Please Play in Portrait Mode.</div>
        </div>
        <div class="w-100 text-center">
            <div class="virtual-casino-bg">
                <VirtualTimerProgress :totalTime="time.total" :currentTime="time.current"
                    width="100%" />
                <template v-if="time.total > 3 && (time.current <= 3 && time.current > 0)">
                    <transition name="component-fade" mode="out-in">
                        <div :key="time.current" class="casino-time-digit">{{ time.current }}</div>
                    </transition>
                </template>

                <img :src="`${imgPath}front/img/virtual-casino/bg/vcasino-main-bg.png`" class="main-bg d-none-mobile">
                <img :src="`${imgPath}front/img/virtual-casino/bg/vcasino-main-bg-mobile.png`" class="main-bg d-none-desktop">
                <img :src="`${imgPath}front/img/virtual-casino/dealer/${dealer}.png`" class="dealer">

                <div class="vcasino-title">
                    <div class="vcasino-name">{{ gameTitle }}</div>
                    <div class="vcasino-rid">{{ casinoData.mid }}</div>
                </div>

                <div class="vcasino-icons">
                    <template v-if="sound.otherSound">
                        <div class="vcasino-icon sound-on-icon" @click="muteOtherSound()">
                            <img :src="`${imgPath}front/img/virtual-casino/icons/sound.png`">
                        </div>
                    </template>
                    <template v-else>
                        <div class="vcasino-icon sound-off-icon" @click="muteOtherSound()">
                            <img :src="`${imgPath}front/img/virtual-casino/icons/sound-off.png`">
                        </div>
                    </template>

                    <template v-if="sound.bgMusic">
                        <div class="vcasino-icon music-on-icon" @click="muteBackgroundSound()">
                            <img :src="`${imgPath}front/img/virtual-casino/icons/music.png`">
                        </div>
                    </template>
                    <template v-else>
                        <div class="vcasino-icon music-off-icon" @click="muteBackgroundSound()">
                            <img :src="`${imgPath}front/img/virtual-casino/icons/music-off.png`">
                        </div>
                    </template>

                    <router-link :to="{name: 'owncasinolist'}">
                        <div class="vcasino-icon home-icon">
                            <img :src="`${imgPath}front/img/virtual-casino/icons/home.png`">
                        </div>
                    </router-link>

                    <div class="vcasino-icon info-icon" @click="getCasinoRulesHtml()">
                        <img :src="`${imgPath}front/img/virtual-casino/icons/info.png`">
                    </div>

                </div>

                <template v-if="$store.state.lastResults">
                    <div class="vcasino-last-results">
                        <template v-for="(data, key) in $store.state.lastResults">
                            <span :class="[{'vresulta': data.win == 1}, {'vresultb': data.win == 2}]" :key="key"
                                @click="showResult(data.mid)">
                                <template v-if="data.win == 1">A</template>
                                <template v-if="data.win == 2">B</template>
                                <template v-if="data.win == 0">T</template>
                            </span>
                        </template>
                        <router-link class="result-more" :to="{name: 'casinoResult', params: {gameType: $store.state.casinoGameType}}">
                            <span class="vresultall">+</span>
                        </router-link>
                    </div>
                </template>

                <div class="vcasino-my-bets" @click="showMyBetsModal()">
                    <span class="bets-count">{{ $store.getters.betCasinoSodaTotal }}</span>
                    <span class="bets-title">MY BETS</span>
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

                <div class="winner-trophy">
                    <img v-if="casinoData.rdesc == '1'" :src="`${imgPath}front/img/svg_casino/icons/winner-left.png`" class="winnera">
                    <img v-if="casinoData.rdesc == '2'" :src="`${imgPath}front/img/svg_casino/icons/winner-left.png`" class="winnerb">
                </div>

                <div class="virtual-casino-odds">
                    <!-- WEB DECKS START -->
                    <template v-if="!$store.getters.isMobile">
                        <div class="decks-block" :style="{'z-index': leftDecks.length > 20 ? 7 : 1}">
                            <!-- left card deck -->
                            <img class="left-card-deck" :src="`${boardPath}/cardDeckLeft.svg`" />

                            <!-- right card deck -->
                            <img class="right-card-box-back" :src="`${boardPath}/cardDeckRightBox.svg`" />
                            <img class="right-card-box-middle" :src="`${boardPath}/cardHolder.svg`" :style="{
                                    right: (-7 - rightDecks.length * 0.095) + '%',
                                    top: (32 - rightDecks.length * 0.215) + '%',
                                    transform: `translate(${5 - (rightDecks.length * 5 / deckLength)}%, ${2 - (rightDecks.length * 2 / deckLength)}%)`
                                    }" />

                            <div class="decks empty-card-in-deck-right " :class="{'finish-deck': finishedRightDeck}" :style="{
                                    right: (-3.7 - rightDecks.length * 0.078) + '%',
                                    top: (36 - rightDecks.length * 0.215) + '%',
                                    transform: `perspective(900px) rotateX(23deg) rotateZ(-66deg) rotateY(-30deg) skewX(3deg) scale(1) translateY(${19 - (rightDecks.length * 19 / deckLength)}%)`
                                    }">
                                <template v-for="i in rightDecks">
                                    <div :key="i+'right'" class="card-item"
                                        :style="{'z-index': rightDecks.length - i, backgroundImage: `url(${cardPath}1.png)`, transform: `translate(-${(rightDecks.length - i) * 2.2}%, ${i * 0.48}%)`}">
                                    </div>
                                </template>
                            </div>

                            <img class="right-card-box-front" :src="`${boardPath}/cardDeckWall.svg`" />
                        </div>
                    </template>
                    <!-- WEB DECKS END -->

                    <!-- MOBILE DECKS START -->
                    <template v-else>
                        <div class="decks-block" :style="{'z-index': leftDecks.length > 20 ? 7 : 1}">
                            <!-- left card deck -->
                            <img class="left-card-deck" :src="`${boardPath}/cardDeckLeft.svg`" />

                            <!-- right card deck -->
                            <img class="right-card-box-back" :src="`${boardPath}/cardDeckRightBox.svg`" />
                            <img class="right-card-box-middle" :src="`${boardPath}/cardHolder.svg`" :style="{
                                    right: (-3 - rightDecks.length * 0.095) + '%',
                                    top: (13 - rightDecks.length * 0.215) + '%',
                                    transform: `translate(${5 - (rightDecks.length * 5 / deckLength)}%, ${2 - (rightDecks.length * 2 / deckLength)}%)`
                                    }" />

                            <div class="decks empty-card-in-deck-right " :class="{'finish-deck': finishedRightDeck}" :style="{
                                    right: (-0.5 - rightDecks.length * 0.078) + '%',
                                    top: (14 - rightDecks.length * 0.215) + '%',
                                    transform: `perspective(900px) rotateX(23deg) rotateZ(-66deg) rotateY(-30deg) skewX(3deg) scale(1) translateY(${19 - (rightDecks.length * 19 / deckLength)}%)`
                                    }">
                                <template v-for="i in rightDecks">
                                    <div :key="i+'right'" class="card-item"
                                        :style="{'z-index': rightDecks.length - i, backgroundImage: `url(${cardPath}1.png)`, transform: `translate(-${(rightDecks.length - i) * 2.2}%, ${i * 0.48}%)`}">
                                    </div>
                                </template>
                            </div>

                            <img class="right-card-box-front" :src="`${boardPath}/cardDeckWall.svg`" />
                        </div>
                    </template>
                    <!-- MOBILE DECKS END -->

                    <div class="casino-detail table-actions">
                        <!-- <div class="winner-trophy">
                            <img v-if="casinoData.rdesc == '1'" :src="`${imgPath}front/img/svg_casino/icons/winner-left.png`" class="winnera">
                            <img v-if="casinoData.rdesc == '2'" :src="`${imgPath}front/img/svg_casino/icons/winner-left.png`" class="winnerb">
                        </div> -->

                        <div class="odds-title">
                            <div class="playera">PLAYER A</div>
                            <div>&nbsp;</div>
                            <div class="playerb">PLAYER B</div>
                        </div>

                        <div class="cards-showing-block">
                            <!-- PLAYER A CARDS START -->
                            <div class="flip-card"
                                :class="{show: cards[0] != 1, end: isGameFinished, 'disable-animation': disabledAnimation[0]}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}">
                                        </div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[0]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flip-card"
                                :class="{show: cards[2] != 1, end: isGameFinished, 'disable-animation': disabledAnimation[2]}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}">
                                        </div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[2]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flip-card"
                                :class="{show: cards[4] != 1, end: isGameFinished, 'disable-animation': disabledAnimation[4]}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}">
                                        </div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[4]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- PLAYER A CARDS END -->

                            <!-- PLAYER B CARDS START -->
                            <div class="flip-card"
                                :class="{show: cards[5] != 1, end: isGameFinished, 'disable-animation': disabledAnimation[5]}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}">
                                        </div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[5]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flip-card"
                                :class="{show: cards[3] != 1, end: isGameFinished, 'disable-animation': disabledAnimation[3]}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}">
                                        </div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[3]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flip-card"
                                :class="{show: cards[1] != 1, end: isGameFinished, 'disable-animation': disabledAnimation[1]}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}">
                                        </div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[1]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- PLAYER B CARDS END -->
                        </div>

                        <div class="cards-block">
                            <!-- PLAYER A CARDS START -->
                            <div class="flip-card " :class="{show: cards[0] != 1, end: isGameFinished}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}">
                                        </div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[0]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flip-card" :class="{show: cards[2] != 1, end: isGameFinished}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}">
                                        </div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[2]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flip-card" :class="{show: cards[4] != 1, end: isGameFinished}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}">
                                        </div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[4]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- PLAYER A CARDS END -->

                            <!-- PLAYER B CARDS START -->
                            <div class="flip-card" :class="{show: cards[5] != 1, end: isGameFinished}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}">
                                        </div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[5]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flip-card" :class="{show: cards[3] != 1, end: isGameFinished}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}">
                                        </div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[3]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flip-card" :class="{show: cards[1] != 1, end: isGameFinished}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}">
                                        </div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[1]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- PLAYER B CARDS END -->
                        </div>

                        <template v-if="casinoData && casinoData.mid">
                            <div class="main-odds">
                                <div class="odds-section">
                                    <div class="vodds-box">
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': main[0].gstatus != 'OPEN'}"
                                                @click="setBetData(main[0].nat + ' Main', main[0].b, mId, main[0].sid, main[0].subtype, 0, 'back', gameType, main[0].gstatus, main[0].min, main[0].max)">
                                                <span class="casino-box-odd">{{ main[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item" :class="{'suspended': main[0].gstatus != 'OPEN'}"
                                                @click="setBetData(main[0].nat + ' Main', main[0].l, mId, main[0].sid, main[0].subtype, 0, 'lay', gameType, main[0].gstatus, main[0].min, main[0].max)">
                                                <span class="casino-box-odd">{{ main[0].l }}</span>
                                            </div>
                                        </div>
                                        <div class="w-100 odds-book text-center" v-vcasinobook="{sid: main[0].sid}"></div>
                                    </div>
                                    <div class="vodds-box pt-2">
                                        <b>MAIN</b>
                                    </div>
                                    <div class="vodds-box">
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': main[1].gstatus != 'OPEN'}"
                                                @click="setBetData(main[1].nat + ' Main', main[1].b, mId, main[1].sid, main[1].subtype, 0, 'back', gameType, main[1].gstatus, main[1].min, main[1].max)">
                                                <span class="casino-box-odd">{{ main[1].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item" :class="{'suspended': main[1].gstatus != 'OPEN'}"
                                                @click="setBetData(main[1].nat + ' Main', main[1].l, mId, main[1].sid, main[1].subtype, 0, 'lay', gameType, main[1].gstatus, main[1].min, main[1].max)">
                                                <span class="casino-box-odd">{{ main[1].l }}</span>
                                            </div>
                                        </div>
                                        <div class="w-100 odds-book text-center" v-vcasinobook="{sid: main[1].sid}">0</div>
                                    </div>
                                </div>

                                <div class="odds-section">
                                    <div class="vodds-box">
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': consicutive[0].gstatus != 'OPEN'}"
                                                @click="setBetData(consicutive[0].nat + ' Consicutive', consicutive[0].b, mId, consicutive[0].sid, consicutive[0].subtype, 0, 'back', gameType, consicutive[0].gstatus, consicutive[0].min, consicutive[0].max)">
                                                <span class="casino-box-odd">{{ consicutive[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item" :class="{'suspended': consicutive[0].gstatus != 'OPEN'}"
                                                @click="setBetData(consicutive[0].nat + ' Consicutive', consicutive[0].l, mId, consicutive[0].sid, consicutive[0].subtype, 0, 'lay', gameType, consicutive[0].gstatus, consicutive[0].min, consicutive[0].max)">
                                                <span class="casino-box-odd">{{ consicutive[0].l }}</span>
                                            </div>
                                        </div>
                                        <div class="w-100 odds-book text-center" v-vcasinofancybook="{sid: consicutive[0].sid, subid: 0}">0</div>
                                    </div>
                                    <div class="vodds-box pt-2">
                                        <b>CONSECUTIVE</b>
                                    </div>
                                    <div class="vodds-box">
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': consicutive[1].gstatus != 'OPEN'}"
                                                @click="setBetData(consicutive[1].nat + ' Consicutive', consicutive[1].b, mId, consicutive[1].sid, consicutive[1].subtype, 0, 'back', gameType, consicutive[1].gstatus, consicutive[1].min, consicutive[1].max)">
                                                <span class="casino-box-odd">{{ consicutive[1].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item" :class="{'suspended': consicutive[1].gstatus != 'OPEN'}"
                                                @click="setBetData(consicutive[1].nat + ' Consicutive', consicutive[1].l, mId, consicutive[1].sid, consicutive[1].subtype, 0, 'lay', gameType, consicutive[1].gstatus, consicutive[1].min, consicutive[1].max)">
                                                <span class="casino-box-odd">{{ consicutive[1].l }}</span>
                                            </div>
                                        </div>
                                        <div class="w-100 odds-book text-center" v-vcasinofancybook="{sid: consicutive[1].sid, subid: 0}">0</div>
                                    </div>
                                </div>

                            </div>

                            <div class="others-odds">
                                <div class="odds-section">
                                    <div class="vodds-box w-100 mb-2">
                                        <b>ODD</b>
                                    </div>

                                    <template v-for="(data, key) in oddEven">
                                        <div class="vodds-box" :key="key">
                                            <template v-for="(odds, key1) in data.odds">
                                                <div class="casino-bl-box" :key="key1">
                                                    <template v-if="odds.nat.toLowerCase() == 'odd'">
                                                        <div class="back casino-bl-box-item" :class="{'suspended': data.gstatus != 'OPEN'}"
                                                            @click="setBetData(data.nat + ' ' + odds.nat, odds.b, mId, data.sid, data.subtype, odds.sid, 'back', gameType, data.gstatus, data.min, data.max)">
                                                            <span class="casino-box-odd">{{ odds.b }}</span>
                                                            <span :class="{'suspended-book': data.gstatus != 'OPEN'}" v-vcasinofancybook="{sid: data.sid, subid: odds.sid}">0</span>
                                                        </div>
                                                    </template>
                                                </div>
                                            </template>
                                        </div>
                                    </template>

                                </div>

                                <div class="odds-section">
                                    <div class="vodds-box w-100 mb-2">
                                        <b>EVEN</b>
                                    </div>
                                    <template v-for="(data, key) in oddEven">
                                        <div class="vodds-box" :key="key">
                                            <template v-for="(odds, key1) in data.odds">
                                                <div class="casino-bl-box" :key="key1">
                                                    <template v-if="odds.nat.toLowerCase() == 'even'">
                                                        <div class="back casino-bl-box-item" :class="{'suspended': data.gstatus != 'OPEN'}"
                                                            @click="setBetData(data.nat + ' ' + odds.nat, odds.b, mId, data.sid, data.subtype, odds.sid, 'back', gameType, data.gstatus, data.min, data.max)">
                                                            <span class="casino-box-odd">{{ odds.b }}</span>
                                                            <span :class="{'suspended-book': data.gstatus != 'OPEN'}" v-vcasinofancybook="{sid: data.sid, subid: odds.sid}">0</span>
                                                        </div>
                                                    </template>
                                                </div>
                                            </template>
                                        </div>
                                    </template>

                                </div>
                            </div>

                        </template>

                    </div>
                </div>
            </div>
        </div>
    
        <!-- BET SLIP START -->
        <div class="virtual-casino-place-bet" v-if="$store.state.casinoBet">
            <ValidationObserver tag="div" class="place-bet-box-container" v-slot="{ invalid }"
                :class="{'loader-section-parent':$store.state.loadingCasinoPlacebet}">
                <Loader :isVisible="$store.state.loadingCasinoPlacebet"></Loader>
                <div class="place-bet-nation">
                    <div>{{ $store.state.casinoBet.nation }}
                    </div>
                    <div>Min: <span v-kval="{size: $store.state.casinoBet.min}"></span>,
                        Max: <span v-kval="{size: $store.state.casinoBet.max}"></span></div>
                </div>
                <div class="place-bet-value">
                    <div>{{ $store.state.casinoBet.uRate }}</div>
                    <ValidationProvider name="Amount" tag="div" class=""
                        :class="[{'back-border': $store.state.casinoBet.betType == 'back'}, {'lay-border': $store.state.casinoBet.betType == 'lay'}]"
                        :rules="{required: true, min_value : 1, max_value : 999999999, regex: /^[0-9]+$/}">
                        <input type="number" id="placebetAmountMobile" v-model.number="$store.state.casinoBet.amount"
                            class="form-control input-stake"
                            onkeypress='return event.charCode >= 48 && event.charCode <= 57' placeholder="Amount">
                    </ValidationProvider>

                    <button class="btn btn-primary" :disabled="invalid" @click="placebetCasino()">Submit</button>
                    <button class="btn btn-reset" @click="$store.commit('resetCasinoBetData')">Reset</button>
                </div>
                <div class="place-bet-buttons">
                    <template v-for="(btn, key) in $store.state.buttonList">
                        <button class="btn btn-bet" @click="$store.commit('updateCasinoBetAmount', btn.bval)"
                            :key="key">
                            <span>{{ btn.btxt }}</span>
                        </button>
                    </template>
                </div>
            </ValidationObserver>
        </div>

        <b-modal ref="my-bets" hide-footer title="MY BETS" modal-class="my-bets">
            <template v-if="$store.state.casinoBetSoda && $store.state.casinoBetSoda != null">
                <template v-for="(data, key) in $store.state.casinoBetSoda">
                    <div class="my-bet-box" :key="key"
                        :class="[{'back': data.btype == 'back'}, {'lay': data.btype == 'lay'}]">
                        <div class="col-4 text-left">{{ data.nat }}</div>
                        <div class="col-4 text-right">{{ data.urate }}</div>
                        <div class="col-4 text-right">{{ data.amt }}</div>
                    </div>
                </template>
            </template>
        </b-modal>

        <b-modal ref="detail-modal" modal-class="casino-result" hide-footer size="xl">
            <template #modal-title>
                {{ gameDetail.ename }} Result
            </template>
            <!-- CASINO -->
            <CasinoResult :resultData="gameDetail" />
            <AccountStatementSoda :gameSoda="gameSoda" />
        </b-modal>

        <b-modal ref="rules-modal" modal-class="casino-rules teenpatti2-rule-modal" title="Rules" hide-footer>
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
</template>

<script>
    import ServiceApi from "@/services/ServiceApi";
    import Timer from "@/components/casino/BaseTimer"
    import VirtualTimerProgress from "@/components/casino/VirtualTimerProgress"
    // import LastResultIcon from '@/components/casino/results/LastResultIcon'
    // import Card from '@/components/casino/Card'
    import CasinoResult from '@/components/casino/results/CasinoResults'
    import AccountStatementSoda from '@/components/AccountStatementSoda'
    import Loader from '@/components/loader'
    import InactivityModal from '@/components/casino/InactivityModal'

    import {
        Howl,
        Howler
    } from 'howler';

    var backgroundMusic;
    var cardSuffle = new Howl({
        src: [`${IMG_PATH}front/sounds/cards_mix.mp3`]
    });
    var cardFlip = new Howl({
        src: [`${IMG_PATH}front/sounds/card_flip.mp3`]
    });
    var winnerMusic = new Howl({
        src: [`${IMG_PATH}front/sounds/winner.mp3`],
        volume: 0.08,
    });

    var PlacebetTimer, deckLength = 20;

    export default {
        mounted() {
            backgroundMusic = new Howl({
                src: [`${IMG_PATH}front/sounds/music.mp3`],
                autoplay: true,
                loop: true,
                volume: 0.1,
            });

            if (localStorage.getItem("sound")) {
                this.sound = JSON.parse(localStorage.getItem("sound"))
                if (!this.sound.otherSound) {
                    cardSuffle.mute(true)
                    cardFlip.mute(true)
                    winnerMusic.mute(true)
                }
                if (!this.sound.bgMusic) {
                    backgroundMusic.mute(true)
                }
            } else {
                localStorage.setItem("sound", JSON.stringify(this.sound));
            }

            this.$store.state.casinoGameType = this.gameType
            this.getButtonListCs()
            this.getCasinoRules()
            this.getCasinoData()
            this.getLastResults()

            setTimeout(() => {
                const endAnimationCenterLeft = document.querySelectorAll('.cards-block .flip-card');
                endAnimationCenterLeft[3].addEventListener('animationstart', (e) => {
                    if (e.animationName == 'flip-card4') {
                        this.rightDecks.pop();
                    }
                });
            }, 5000)

            setTimeout(() => {
                const endAnimationCenterLeft = document.querySelector('.empty-card-in-deck-right');
                endAnimationCenterLeft.addEventListener('animationend', (e) => {
                    if (e.animationName == 'add-new-deck-animation') {
                        this.finishedRightDeck = false
                    }
                });
                endAnimationCenterLeft.addEventListener('animationstart', (e) => {
                    if (e.animationName == 'add-new-deck-animation') {
                        console.log('suffle start')
                        cardSuffle.play();
                    }
                });
            }, 5000)

            setTimeout(() => {
                const endAnimationCenterLeft = document.querySelectorAll('.cards-block .flip-card');
                endAnimationCenterLeft[endAnimationCenterLeft.length - 1].addEventListener('animationend', (
                    e) => {
                    if (e.animationName == 'close-opacity-anumation-2') {
                        // this.leftDecks.push(this.leftDecks.length);
                        // if (this.rightDecks.length == 0) {
                        this.finishedRightDeck = true
                        // }
                    }
                });
            }, 5000)

            setTimeout(() => {
                const endAnimationCenterLeft = document.querySelectorAll('.flip-card-inner');
                endAnimationCenterLeft.forEach(element => {
                    element.addEventListener('animationstart', (e) => {
                        if (e.animationName == 'flip-card') {
                            console.log('flip start')
                            cardFlip.play();
                        }
                    });
                });
            }, 5000)
        },
        components: {
            Timer,
            VirtualTimerProgress,
            // LastResultIcon,
            // Card,
            Loader,
            InactivityModal,
            CasinoResult,
            AccountStatementSoda,
        },
        computed: {
            main() {
                var main = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'vteen'
                })
                return this.orderBy(main, 'sr')
            },
            oddEven() {
                var oddEven = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'voddeven'
                })
                var oddEvenSorted = this.orderBy(oddEven, 'sr')
                oddEvenSorted.forEach(data => {
                    data.odds = _.orderBy(data.odds, 'sno')
                });
                return oddEvenSorted
            },
            suit() {
                var suit = _.filter(_.get(this.casinoData, 'sub'), (o) => {
                    return (o.subtype == 'vsuita' || o.subtype == 'vsuitb')
                })
                return this.orderBy(suit, 'sr')
            },
            consicutive() {
                var consicutive = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'vcon'
                })
                return this.orderBy(consicutive, 'sr')
            }
        },
        data() {
            return {
                dealer: 1,
                playWinner: true,
                sound: {
                    bgMusic: true,
                    otherSound: true,
                },
                cardPath: IMG_PATH + 'front/img/cards/',
                boardPath: IMG_PATH + 'front/img/board',
                deckLength: 20,
                isFirstCall: true,
                disabledAnimation: [],
                showCards: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'vteen',
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
                gameDetail: [],
                gameSoda: [],
                loading: false,
                isGameFinished: false,
                leftDecks: [...Array(1).keys()],
                rightDecks: [...Array(deckLength).keys()],
                finishedRightDeck: false
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
            fullScreen() {
                let de = document.querySelector(".fullwidthcasino-container");
                console.log(de)
                if (de.requestFullscreen) {
                    de.requestFullscreen();
                } else if (de.mozRequestFullScreen) {
                    de.mozRequestFullScreen();
                } else if (de.webkitRequestFullscreen) {
                    de.webkitRequestFullscreen();
                } else if (de.msRequestFullscreen) {
                    de.msRequestFullscreen();
                }
            },
            muteOtherSound() {
                // this.fullScreen()
                if (this.sound.otherSound) {
                    // console.log('cardSuffle', cardSuffle)
                    cardSuffle.mute(true)

                    // console.log('cardFlip', cardFlip)
                    cardFlip.mute(true)

                    // console.log('winnerMusic', winnerMusic)
                    winnerMusic.mute(true)

                    this.sound.otherSound = false
                    localStorage.setItem("sound", JSON.stringify(this.sound));
                } else {
                    cardSuffle.mute(false)
                    cardFlip.mute(false)
                    winnerMusic.mute(false)

                    this.sound.otherSound = true
                    localStorage.setItem("sound", JSON.stringify(this.sound));
                }
                console.log('other sound', this.sound.otherSound)
            },
            muteBackgroundSound() {
                if (this.sound.bgMusic) {
                    // console.log('backgroundMusic', backgroundMusic)
                    backgroundMusic.mute(true)

                    this.sound.bgMusic = false
                    localStorage.setItem("sound", JSON.stringify(this.sound));
                } else {
                    backgroundMusic.mute(false)

                    this.sound.bgMusic = true
                    localStorage.setItem("sound", JSON.stringify(this.sound));
                }
                console.log('bg music', this.sound.bgMusic)
            },
            getSvgWidth() {
                var element = document.querySelector('#id_main_bg');
                var width = element.clientWidth
                return width ? width + 'px' : '0px'
            },
            getRectCenterCordinates(size, cordinate) {
                return cordinate + (size / 2)
            },
            showMyBetsModal() {
                if (this.$store.state.casinoBetSoda && this.$store.state.casinoBetSoda.length) {
                    this.$refs['my-bets'].show()
                }
            },
            showResult(mid) {
                if (this.loading)
                    return
                this.loading = true
                // console.log(gmid, mid, gtype, dtype, popup)
                ServiceApi.callApi("api/front/accstatepopup", {
                        'gmid': 0,
                        'mid': mid,
                        'gtype': this.$store.state.casinoGameType,
                        'dtype': 'cs'
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.gameDetail = _.get(response.data, 't1') ? _.get(response.data, 't1') : {}
                            Vue.set(this.gameDetail, 'gType', this.$store.state.casinoGameType)
                            Vue.set(this.gameDetail, 'dType', 'cs')
                            this.gameSoda = _.get(response.data, 't2')

                            this.$refs['detail-modal'].show()
                            this.loading = false
                        } else {
                            this.gameDetail = {}
                            this.gameSoda = []
                            this.loading = false
                        }
                    })
                    .catch(e => {
                        this.gameDetail = {}
                        this.gameSoda = []
                        this.loading = false
                    });
            },
            getResultLable(index) {
                if (this.$store.state.lastResults[index] && this.$store.state.lastResults[index].win) {
                    switch (this.$store.state.lastResults[index].win) {
                        case "1":
                            return "A"
                            break;
                        case "2":
                            return "B"
                            break;
                        case "0":
                            return "T"
                            break;

                        default:
                            return " "
                            break;
                    }
                }
            },
            getResultColor(index) {
                if (this.$store.state.lastResults[index] && this.$store.state.lastResults[index].win) {
                    switch (this.$store.state.lastResults[index].win) {
                        case "1":
                            return "#FC4242"
                            break;
                        case "2":
                            return "#FDCF13"
                            break;
                        case "0":
                            return "white"
                            break;

                        default:
                            return " "
                            break;
                    }
                }
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
                ServiceApi.callApi("api/front/vcasino/data", {
                        'type': this.gameType,
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.casinoData = response.data
                            // this.casinoData.rdesc = '1'

                            if (this.isFirstCall) {
                                this.isFirstCall = false
                                this.disabledAnimation = response.data.card.split(',').map(card => card != 1)
                            }

                            if (_.get(this.casinoData, 'mid') != this.mId) {
                                if (this.mId != 0) {
                                    this.isGameFinished = true
                                    this.disabledAnimation = []
                                }
                                if (!this.firstCall) {
                                    this.$store.state.placebetInterval++
                                }
                                this.firstCall = false
                                this.getLastResults()
                                this.getUserBook(true, _.get(this.casinoData, 'mid'))
                                this.$store.commit('resetBetData')
                            } else if (this.isGameFinished) {
                                setTimeout(() => {
                                    this.isGameFinished = false;
                                }, 1500)
                            }
                            this.mId = _.get(this.casinoData, 'mid')
                            this.getUserBook()
                            // this.exp = _.get(this.$store.state.user, 'exp', 0)
                            this.cards = _.get(this.casinoData, 'card').split(',')
                            if (this.casinoData.rdesc != "") {
                                if (this.playWinner) {
                                    winnerMusic.play()
                                    console.log('winner Play')
                                    this.playWinner = false
                                }
                            } else {
                                this.playWinner = true
                            }
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
                    ServiceApi.callApi("api/front/vcasino/book", {
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
                ServiceApi.callApi("api/front/vcasino/lastresults", {
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

                    // if (IS_MOBILE) {
                    // setTimeout(() => {
                    //     document.getElementById("placebetAmountMobile").focus();
                    // }, 500);
                    // this.$refs['placebet-modal'].show()
                    // }
                    // setTimeout(() => {
                    //     document.getElementById("placebetAmountWeb").focus();
                    // }, 500);
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
                        // this.$refs['placebet-modal'].hide()
                        this.getUserBook()
                        // if (INACTIVITY_MODAL) {
                        //     this.resetPlacebetInterval()
                        // }
                        this.$store.state.loadingCasinoPlacebet = false
                        // console.log(data)
                    });
            },
            hidePlacebetModal() {
                // this.$refs['placebet-modal'].hide()
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
            clearInterval(PlacebetTimer);
            backgroundMusic.stop()
            cardSuffle.stop()
            cardFlip.stop()
            winnerMusic.stop()
        }
    }
</script>