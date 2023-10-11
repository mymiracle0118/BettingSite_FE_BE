<template>
<div class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table teenpatti1day">
                    <div class="casino-video">
                        <div class="casino-video-title">
                            <span class="casino-name">{{ gameTitle }}</span>
                            <span class="casino-video-rid">Round ID: {{ casinoData.mid }}</span>
                        </div>
                        <div class="video-box-container">
                            <div class="video-box" v-if="tvUrl != ''">
                                <iframe :src="tvUrl">
                                </iframe>
                            </div>
                        </div>
                        <template v-if="cards && cards.length">
                            <div class="casino-video-cards"
                                :class="{'hide-cards': (!showCards || cards[0] == '1')}">
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
                            <div class="casino-video-lr-icon" @click="showResults = !showResults"
                                title="Last Results">
                                <i class="fas"
                                    :class="[{'fa-chevron-circle-down':!showResults},{'fa-chevron-circle-up':showResults}]"></i>
                            </div>
                        </div>
                        <CasinoRules ref="casinorules" :gtype="gameType"></CasinoRules>
                        <LastResultsSection v-if="$store.getters.isTablet" :gtype="gameType" :lastResults="lastResults" :showResults="showResults" />
                        
                    </div>

                    <div class="casino-detail" v-if="casinoData && casinoData.mid">
                        <template v-if="$store.getters.isTablet">
                            <div class="teen1daycasino-container d-none-small">
                                <div class="teen1dayleft">
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name no-border casino-bl-box-title">
                                            <div class="playera">Player A</div>
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
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>Main</b>
                                            <div class="float-right">
                                                <span class="mr-2 casino-book" v-casinobook="{sid: main[0].sid}">0</span>
                                                <i class="fas fa-info-circle collapsed" data-toggle="collapse"
                                                    data-target="#range1" aria-expanded="false"></i>
                                                <div id="range1" class="icon-range collapse">
                                                    R:<span v-kval="{size: main[0].min}"></span>-<span
                                                        v-kval="{size: main[0].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': main[0].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ main[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item"
                                                :class="{'suspended': main[0].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ main[0].l }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="casino-box-row">
                                        <div class="casino-nation-name casino-card-img">
                                            <img :src="`${imgPath}front/img/cards/spade.svg`">
                                            <div class="float-right">
                                                <span class="mr-2" v-casinobook="{sid: suit[0].sid}">0</span>
                                                <i class="fas fa-info-circle collapsed" data-toggle="collapse"
                                                    data-target="#range2" aria-expanded="false"></i>
                                                <div id="range2" class="icon-range collapse">
                                                    R:<span v-kval="{size: suit[0].min}"></span>-<span
                                                        v-kval="{size: suit[0].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': suit[0].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ suit[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item"
                                                :class="{'suspended': suit[0].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ suit[0].l }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name casino-card-img">
                                            <img :src="`${imgPath}front/img/cards/diamond.svg`">
                                            <div class="float-right">
                                                <span class="mr-2" v-casinobook="{sid: suit[1].sid}">0</span>
                                                <i class="fas fa-info-circle collapsed" data-toggle="collapse"
                                                    data-target="#range5" aria-expanded="false"></i>
                                                <div id="range5" class="icon-range collapse">
                                                    R:<span v-kval="{size: suit[1].min}"></span>-<span
                                                        v-kval="{size: suit[1].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': suit[1].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ suit[1].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item"
                                                :class="{'suspended': suit[1].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ suit[1].l }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name casino-card-img">
                                            <img :src="`${imgPath}front/img/cards/club.svg`">
                                            <div class="float-right">
                                                <span class="mr-2" v-casinobook="{sid: suit[2].sid}">0</span>
                                                <i class="fas fa-info-circle collapsed" data-toggle="collapse"
                                                    data-target="#range3" aria-expanded="false"></i>
                                                <div id="range3" class="icon-range collapse">
                                                    R:<span v-kval="{size: suit[2].min}"></span>-<span
                                                        v-kval="{size: suit[2].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': suit[2].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ suit[2].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item"
                                                :class="{'suspended': suit[2].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ suit[2].l }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name casino-card-img">
                                            <img :src="`${imgPath}front/img/cards/heart.svg`">
                                            <div class="float-right">
                                                <span class="mr-2" v-casinobook="{sid: suit[3].sid}">0</span>
                                                <i class="fas fa-info-circle collapsed" data-toggle="collapse"
                                                    data-target="#range4" aria-expanded="false"></i>
                                                <div id="range4" class="icon-range collapse">
                                                    R:<span v-kval="{size: suit[3].min}"></span>-<span
                                                        v-kval="{size: suit[3].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': suit[3].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ suit[3].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item"
                                                :class="{'suspended': suit[3].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ suit[3].l }}</span>
                                            </div>
                                        </div>
                                    </div> -->
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name casino-card-img">
                                            <b>Consecutive</b>
                                            <div class="float-right">
                                                <span class="mr-2 casino-book" v-casinofancybook="{sid: consicutive[0].sid}"></span>
                                                <i class="fas fa-info-circle collapsed" data-toggle="collapse"
                                                    data-target="#range6" aria-expanded="false"></i>
                                                <div id="range6" class="icon-range collapse">
                                                    R:<span v-kval="{size: consicutive[0].min}"></span>-<span
                                                        v-kval="{size: consicutive[0].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': consicutive[0].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ consicutive[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item"
                                                :class="{'suspended': consicutive[0].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ consicutive[0].l }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="teen1daycenter"></div>
                                <div class="teen1dayright">
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name no-border casino-bl-box-title">
                                            <div class="playerb">Player B</div>
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
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>Main</b>
                                            <div class="float-right">
                                                <span class="mr-2 casino-book" v-casinobook="{sid: main[1].sid}">0</span>
                                                <i class="fas fa-info-circle collapsed" data-toggle="collapse"
                                                    data-target="#range7" aria-expanded="false"></i>
                                                <div id="range7" class="icon-range collapse">
                                                    R:<span v-kval="{size: main[1].min}"></span>-<span
                                                        v-kval="{size: main[1].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': main[1].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ main[1].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item"
                                                :class="{'suspended': main[1].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ main[1].l }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="casino-box-row">
                                        <div class="casino-nation-name casino-card-img">
                                            <img :src="`${imgPath}front/img/cards/spade.svg`">
                                            <div class="float-right">
                                                <span class="mr-2" v-casinobook="{sid: suit[4].sid}">0</span>
                                                <i class="fas fa-info-circle collapsed" data-toggle="collapse"
                                                    data-target="#range8" aria-expanded="false"></i>
                                                <div id="range8" class="icon-range collapse">
                                                    R:<span v-kval="{size: suit[4].min}"></span>-<span
                                                        v-kval="{size: suit[4].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': suit[4].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ suit[4].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item"
                                                :class="{'suspended': suit[4].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ suit[4].l }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name casino-card-img">
                                            <img :src="`${imgPath}front/img/cards/diamond.svg`">
                                            <div class="float-right">
                                                <span class="mr-2" v-casinobook="{sid: suit[5].sid}">0</span>
                                                <i class="fas fa-info-circle collapsed" data-toggle="collapse"
                                                    data-target="#range11" aria-expanded="false"></i>
                                                <div id="range11" class="icon-range collapse">
                                                    R:<span v-kval="{size: suit[5].min}"></span>-<span
                                                        v-kval="{size: suit[5].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': suit[5].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ suit[5].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item"
                                                :class="{'suspended': suit[5].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ suit[5].l }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name casino-card-img">
                                            <img :src="`${imgPath}front/img/cards/club.svg`">
                                            <div class="float-right">
                                                <span class="mr-2" v-casinobook="{sid: suit[6].sid}">0</span>
                                                <i class="fas fa-info-circle collapsed" data-toggle="collapse"
                                                    data-target="#range9" aria-expanded="false"></i>
                                                <div id="range9" class="icon-range collapse">
                                                    R:<span v-kval="{size: suit[6].min}"></span>-<span
                                                        v-kval="{size: suit[6].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': suit[6].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ suit[6].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item"
                                                :class="{'suspended': suit[6].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ suit[6].l }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name casino-card-img">
                                            <img :src="`${imgPath}front/img/cards/heart.svg`">
                                            <div class="float-right">
                                                <span class="mr-2" v-casinobook="{sid: suit[7].sid}">0</span>
                                                <i class="fas fa-info-circle collapsed" data-toggle="collapse"
                                                    data-target="#range10" aria-expanded="false"></i>
                                                <div id="range10" class="icon-range collapse">
                                                    R:<span v-kval="{size: suit[7].min}"></span>-<span
                                                        v-kval="{size: suit[7].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': suit[7].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ suit[7].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item"
                                                :class="{'suspended': suit[7].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ suit[7].l }}</span>
                                            </div>
                                        </div>
                                    </div> -->
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name casino-card-img">
                                            <b>Consecutive</b>
                                            <div class="float-right">
                                                <span class="mr-2 casino-book" v-casinofancybook="{sid: consicutive[1].sid}">0</span>
                                                <i class="fas fa-info-circle collapsed" data-toggle="collapse"
                                                    data-target="#range12" aria-expanded="false"></i>
                                                <div id="range12" class="icon-range collapse">
                                                    R:<span v-kval="{size: consicutive[1].min}"></span>-<span
                                                        v-kval="{size: consicutive[1].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': consicutive[1].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ consicutive[1].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item"
                                                :class="{'suspended': consicutive[1].gstatus != 'OPEN'}">
                                                <span class="casino-box-odd">{{ consicutive[1].l }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="teen1dayother">
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name no-border">

                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="casino-bl-box-item">
                                                <b>Card 1</b>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="casino-bl-box-item">
                                                <b>Card 2</b>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="casino-bl-box-item">
                                                <b>Card 3</b>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="casino-bl-box-item">
                                                <b>Card 4</b>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="casino-bl-box-item">
                                                <b>Card 5</b>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="casino-bl-box-item">
                                                <b>Card 6</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row mb-3">
                                        <div class="casino-nation-name mb-4">
                                            <b>Odd</b>
                                            <div class="float-right">
                                                <i class="fas fa-info-circle" data-toggle="collapse"
                                                    data-target="#range13"></i>
                                                <div id="range13" class="collapse icon-range">
                                                    R:<span v-kval="{size: oddEven[0].min}"></span>-<span
                                                        v-kval="{size: oddEven[0].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <template v-for="(data, key) in oddEven">
                                            <div class="casino-bl-box" :key="key">
                                                <template v-for="(odds, key1) in data.odds">
                                                    <template v-if="odds.nat.toLowerCase() == 'odd'">
                                                        <div class="back casino-bl-box-item" :key="key1"
                                                            :class="{'suspended': data.gstatus != 'OPEN'}">
                                                            <span class="casino-box-odd">{{ odds.b }}</span>
                                                        </div>
                                                        <div class="casino-book" v-casinofancybook="{sid: data.sid, subid: odds.sid}"></div>
                                                    </template>
                                                </template>
                                            </div>
                                        </template>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name mb-4">
                                            <b>Even</b>
                                            <div class="float-right">
                                                <i class="fas fa-info-circle" data-toggle="collapse"
                                                    data-target="#range14"></i>
                                                <div id="range14" class="collapse icon-range">
                                                    R:<span v-kval="{size: oddEven[0].min}"></span>-<span
                                                        v-kval="{size: oddEven[0].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <template v-for="(data, key) in oddEven">
                                            <div class="casino-bl-box" :key="key">
                                                <template v-for="(odds, key1) in data.odds">
                                                    <template v-if="odds.nat.toLowerCase() == 'even'">
                                                        <div class="back casino-bl-box-item" :key="key1"
                                                            :class="{'suspended': data.gstatus != 'OPEN'}">
                                                            <span class="casino-box-odd">{{ odds.b }}</span>
                                                        </div>
                                                        <div class="casino-book" v-casinofancybook="{sid: data.sid, subid: odds.sid}"></div>
                                                    </template>
                                                </template>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-if="!$store.getters.isTablet">
                            <div class="teen1daycasino-container d-none-big">
                                <div class="casino-box-row">
                                    <div class="casino-bl-box casino-bl-box-title">
                                        <div class="casino-bl-box-item">
                                            <b>Main</b>
                                            <div class="float-right">
                                                <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                    data-target="#range1"></i>
                                                <div id="range1" class="collapse icon-range">
                                                    R:<span v-kval="{size: main[0].min}"></span>-<span
                                                        v-kval="{size: main[0].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <b>Back</b>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <b>Lay</b>
                                        </div>
                                    </div>
                                    <template v-for="(data, key) in main">
                                        <div class="casino-bl-box" :key="key">
                                            <div class="casino-bl-box-item casino-odds-name">
                                                <span>{{ data.nat }}</span>
                                                <span class="float-right" v-casinobook="{sid: data.sid}">0</span>
                                            </div>
                                            <div class="back casino-bl-box-item" :class="{'suspended': data.gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ data.b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item" :class="{'suspended': data.gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ data.l }}</span>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                                
                                <div class="casino-box-row">
                                    <div class="casino-bl-box casino-bl-box-title">
                                        <div class="casino-bl-box-item casino-card-img">
                                            <b>Consecutive</b>
                                            <div class="float-right">
                                                <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                    data-target="#range6"></i>
                                                <div id="range6" class="collapse icon-range">
                                                    R:<span v-kval="{size: consicutive[0].min}"></span>-<span
                                                        v-kval="{size: consicutive[0].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <b>Back</b>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <b>Lay</b>
                                        </div>
                                    </div>
                                    <template v-for="(data, key) in consicutive">
                                        <div class="casino-bl-box" :key="key">
                                            <div class="casino-bl-box-item casino-odds-name">
                                                <span>{{ data.nat }}</span>
                                                <span class="float-right" v-casinofancybook="{sid: data.sid, subid: 0}">0</span>
                                            </div>
                                            <div class="back casino-bl-box-item" :class="{'suspended': data.gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ data.b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item" :class="{'suspended': data.gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ data.l }}</span>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                                <div class="casino-box-row teen1dayodev">
                                    <div class="casino-bl-box casino-bl-box-title">
                                        <div class="casino-bl-box-item casino-card-img">
                                            <b>Cards</b>
                                            <div class="float-right">
                                                <i class="fas fa-info-circle float-right" data-toggle="collapse"
                                                    data-target="#range7"></i>
                                                <div id="range7" class="collapse icon-range">
                                                    R:<span v-kval="{size: oddEven[0].min}"></span>-<span
                                                        v-kval="{size: oddEven[0].max}"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <b>Odd</b>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <b>Even</b>
                                        </div>
                                    </div>
                                    <template v-for="(data, key) in oddEven">
                                        <div class="casino-bl-box" :key="key">
                                            <div class="casino-bl-box-item casino-odds-name">
                                                <span>{{ data.nat }}</span>
                                            </div>
                                            <template v-for="(odds, key1) in data.odds">
                                                <div class="back casino-bl-box-item" :key="key1"
                                                    :class="{'suspended': data.gstatus != 'OPEN'}"
                                                    >
                                                    <span class="casino-box-odd">{{ odds.b }}</span>
                                                    <span v-casinofancybook="{sid: data.sid, subid: odds.sid}">0</span>
                                                </div>
                                            </template>
                                        </div>
                                    </template>
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
        <RightSideBar :mid="mId" :gtype="gameType"></RightSideBar>
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
            
           // this.tvUrl = '/admin/pages/mediaplayercasino/'+this.gameType+'?ip='+IP_ADDRESS;
            this.getTvUrl();
            this.getCasinoData()
            this.getLastResults()
            this.getUserBook()
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
                var main = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'teen'
                })
                return this.orderBy(main, 'sr')
            },
            oddEven() {
                var oddEven = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'oddeven'
                })
                var oddEvenSorted = this.orderBy(oddEven, 'sr')
                oddEvenSorted.forEach(data => {
                    data.odds = _.orderBy(data.odds, 'sno')
                });
                return oddEvenSorted
            },
            suit() {
                var suit = _.filter(_.get(this.casinoData, 'sub'), (o) => {
                    return (o.subtype == 'suita' || o.subtype == 'suitb')
                })
                return this.orderBy(suit, 'sr')
            },
            consicutive() {
                var consicutive = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'con'
                })
                return this.orderBy(consicutive, 'sr')
            }
        },
        data() {
            return {
                showCards: true,
                showResults: true,
                imgPath: IMG_PATH,
                gameTitle: 'Teenpatti 1-day',
                gameType: 'teen',
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
                tvUrl: "",
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
                            if (_.get(this.casinoData, 'mid') != this.mId) {
                                this.getLastResults()
                            }
                            this.mId = _.get(this.casinoData, 'mid')
                            this.cards = _.get(this.casinoData, 'card').split(',')
                            this.time.total = _.get(this.casinoData, 'ft')
                            this.time.current = _.get(this.casinoData, 'lt')
                            if (this.callDataApi == true) {
                                setTimeout(res => {
                                    this.getCasinoData();
                                }, 800);
                            }
                        } else {
                            //this.casinoData = []
                            if (this.callDataApi == true) {
                                setTimeout(res => {
                                    this.getCasinoData();
                                }, 800);
                            }
                        }
                        //this.getUserBook();

                    })
                    .catch(e => {
                        //this.casinoData = []
                        if (this.callDataApi == true) {
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