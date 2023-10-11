<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table dtl20">
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
                                        <Card :card="cards[2]" />
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
                        <div class="teen1daycasino-container d-none-small">
                            <div class="teen1dayleft">
                                <div class="casino-box-row mb-0">
                                    <div class="casino-nation-name no-border">
                                        <div></div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <b>D</b>
                                    </div>
                                    <div class="casino-bl-box">
                                        <b>T</b>
                                    </div>
                                    <div class="casino-bl-box">
                                        <b>L</b>
                                    </div>
                                </div>

                                <template v-for="(i, key) in 9">
                                    <div class="casino-box-row" :key="key">
                                        <template v-if="i == 2">
                                            <div class="casino-nation-name casino-card-img">
                                                <span>
                                                    <img :src="`${imgPath}front/img/cards/spade.png`">
                                                    <img :src="`${imgPath}front/img/cards/club.png`">
                                                </span>
                                            </div>
                                        </template>
                                        <template v-else-if="i == 3">
                                            <div class="casino-nation-name casino-card-img">
                                                <span>
                                                    <img :src="`${imgPath}front/img/cards/heart.png`">
                                                    <img :src="`${imgPath}front/img/cards/diamond.png`">
                                                </span>
                                            </div>
                                        </template>
                                        <template v-else-if="i == 6">
                                            <div class="casino-nation-name casino-card-img">
                                                <span>
                                                    <img :src="`${imgPath}front/img/cards/A.png`">
                                                </span>
                                            </div>
                                        </template>
                                        <template v-else-if="i == 7">
                                            <div class="casino-nation-name casino-card-img">
                                                <span>
                                                    <img :src="`${imgPath}front/img/cards/2.png`">
                                                </span>
                                            </div>
                                        </template>
                                        <template v-else-if="i == 8">
                                            <div class="casino-nation-name casino-card-img">
                                                <span>
                                                    <img :src="`${imgPath}front/img/cards/3.png`">
                                                </span>
                                            </div>
                                        </template>
                                        <template v-else-if="i == 9">
                                            <div class="casino-nation-name casino-card-img">
                                                <span>
                                                    <img :src="`${imgPath}front/img/cards/4.png`">
                                                </span>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="casino-nation-name">
                                                <b>{{ main[i-1].nat.split(" ")[0] }}</b>
                                            </div>
                                        </template>

                                        <div class="float-right dtl20info">
                                            <i class="fas fa-info-circle" data-toggle="collapse"
                                                :data-target="`#demo-l-${key}`"></i>
                                            <div :id="`demo-l-${key}`" class="collapse icon-range">
                                                R:<span v-kval="{size: main[i-1].min}"></span>-<span
                                                    v-kval="{size: main[i-1].max}"></span>
                                            </div>
                                        </div>

                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': main[i-1].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ main[i-1].b }}</span>
                                                <span class="casino-book" v-casinofancybook="{sid: main[i-1].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': main[i+17].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ main[i+17].b }}</span>
                                                <span class="casino-book" v-casinofancybook="{sid: main[i+17].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': main[i+35].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ main[i+35].b }}</span>
                                                <span class="casino-book" v-casinofancybook="{sid: main[i+35].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <div class="teen1daycenter"></div>
                            <div class="teen1dayright">
                                <div class="casino-box-row mb-0 d-none-small">
                                    <div class="casino-nation-name no-border">
                                        <div></div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <b>D</b>
                                    </div>
                                    <div class="casino-bl-box">
                                        <b>T</b>
                                    </div>
                                    <div class="casino-bl-box">
                                        <b>L</b>
                                    </div>
                                </div>

                                <template v-for="(i, key) in 9">
                                    <div class="casino-box-row" :key="key">
                                        <div class="casino-nation-name casino-card-img">
                                            <span>
                                                <template v-if="i == 7">
                                                    <img :src="`${imgPath}front/img/cards/J.png`">
                                                </template>
                                                <template v-else-if="i == 8">
                                                    <img :src="`${imgPath}front/img/cards/Q.png`">
                                                </template>
                                                <template v-else-if="i == 9">
                                                    <img :src="`${imgPath}front/img/cards/K.png`">
                                                </template>
                                                <template v-else>
                                                    <img :src="`${imgPath}front/img/cards/${i+4}.png`">
                                                </template>
                                            </span>
                                        </div>

                                        <div class="float-right dtl20info">
                                            <i class="fas fa-info-circle" data-toggle="collapse"
                                                :data-target="`#demo-r-${key}`"></i>
                                            <div :id="`demo-r-${key}`" class="collapse icon-range">
                                                R:<span v-kval="{size: main[i+8].min}"></span>-<span
                                                    v-kval="{size: main[i+8].max}"></span>
                                            </div>
                                        </div>

                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': main[i+8].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ main[i+8].b }}</span>
                                                <span class="casino-book" v-casinofancybook="{sid: main[i+8].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box ">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': main[i+26].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ main[i+26].b }}</span>
                                                <span class="casino-book" v-casinofancybook="{sid: main[i+26].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item"
                                                :class="{'suspended': main[i+44].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ main[i+44].b }}</span>
                                                <span class="casino-book" v-casinofancybook="{sid: main[i+44].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                        </template>

                        <template v-if="!$store.getters.isTablet">
                            <div class="d-none-big">
                                <div class="casino-tabs">
                                    <ul class="nav nav-tabs" role="tablist">
                                        <li class="nav-item">
                                            <a href="#dragon" class="nav-link active" data-toggle="tab">Dragon</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#tiger" class="nav-link" data-toggle="tab">Tiger</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#lion" class="nav-link" data-toggle="tab">Lion</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="dragon">
                                        <div class="teen1daycasino-container">
                                            <div class="teen1dayleft">
                                                <template v-for="(i, key) in 9">
                                                    <div class="casino-box-row" :key="key">
                                                        <template v-if="i == 2">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/spade.png`">
                                                                    <img :src="`${imgPath}front/img/cards/club.png`">
                                                                </span>
                                                            </div>
                                                        </template>
                                                        <template v-else-if="i == 3">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/heart.png`">
                                                                    <img :src="`${imgPath}front/img/cards/diamond.png`">
                                                                </span>
                                                            </div>
                                                        </template>
                                                        <template v-else-if="i == 6">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/A.png`">
                                                                </span>
                                                            </div>
                                                        </template>
                                                        <template v-else-if="i == 7">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/2.png`">
                                                                </span>
                                                            </div>
                                                        </template>
                                                        <template v-else-if="i == 8">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/3.png`">
                                                                </span>
                                                            </div>
                                                        </template>
                                                        <template v-else-if="i == 9">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/4.png`">
                                                                </span>
                                                            </div>
                                                        </template>
                                                        <template v-else>
                                                            <div class="casino-nation-name">
                                                                <b>{{ main[i-1].nat.split(" ")[0] }}</b>
                                                            </div>
                                                        </template>

                                                        <div class="float-right dtl20info">
                                                            <i class="fas fa-info-circle" data-toggle="collapse"
                                                                :data-target="`#demo-l-d-${key}`"></i>
                                                            <div :id="`demo-l-d-${key}`" class="collapse icon-range">
                                                                R:<span v-kval="{size: main[i-1].min}"></span>-<span
                                                                    v-kval="{size: main[i-1].max}"></span>
                                                            </div>
                                                        </div>

                                                        <div class="casino-bl-box">
                                                            <div class="back casino-bl-box-item"
                                                                :class="{'suspended': main[i-1].gstatus != 'OPEN'}"
                                                                >
                                                                <span class="casino-box-odd">{{ main[i-1].b }}</span>
                                                                <span v-casinofancybook="{sid: main[i-1].sid, subid: 0}">0</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                            <div class="teen1daycenter"></div>
                                            <div class="teen1dayright">
                                                <template v-for="(i, key) in 9">
                                                    <div class="casino-box-row" :key="key">
                                                        <div class="casino-nation-name casino-card-img">
                                                            <span>
                                                                <template v-if="i == 7">
                                                                    <img :src="`${imgPath}front/img/cards/J.png`">
                                                                </template>
                                                                <template v-else-if="i == 8">
                                                                    <img :src="`${imgPath}front/img/cards/Q.png`">
                                                                </template>
                                                                <template v-else-if="i == 9">
                                                                    <img :src="`${imgPath}front/img/cards/K.png`">
                                                                </template>
                                                                <template v-else>
                                                                    <img :src="`${imgPath}front/img/cards/${i+4}.png`">
                                                                </template>
                                                            </span>
                                                        </div>
                                                        <div class="float-right dtl20info">
                                                            <i class="fas fa-info-circle" data-toggle="collapse"
                                                                :data-target="`#demo-r-d-${key}`"></i>
                                                            <div :id="`demo-r-d-${key}`" class="collapse icon-range">
                                                                R:<span v-kval="{size: main[i+8].min}"></span>-<span
                                                                    v-kval="{size: main[i+8].max}"></span>
                                                            </div>
                                                        </div>
                                                        <div class="casino-bl-box">
                                                            <div class="back casino-bl-box-item"
                                                                :class="{'suspended': main[i+8].gstatus != 'OPEN'}"
                                                                >
                                                                <span class="casino-box-odd">{{ main[i+8].b }}</span>
                                                                <span v-casinofancybook="{sid: main[i+8].sid, subid: 0}">0</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="tab-pane" id="tiger">
                                        <div class="teen1daycasino-container">
                                            <div class="teen1dayleft">
                                                <template v-for="(i, key) in 9">
                                                    <div class="casino-box-row" :key="key">
                                                        <template v-if="i == 2">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/spade.png`">
                                                                    <img :src="`${imgPath}front/img/cards/club.png`">
                                                                </span>
                                                            </div>
                                                        </template>
                                                        <template v-else-if="i == 3">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/heart.png`">
                                                                    <img :src="`${imgPath}front/img/cards/diamond.png`">
                                                                </span>
                                                            </div>
                                                        </template>
                                                        <template v-else-if="i == 6">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/A.png`">
                                                                </span>
                                                            </div>
                                                        </template>
                                                        <template v-else-if="i == 7">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/2.png`">
                                                                </span>
                                                            </div>
                                                        </template>
                                                        <template v-else-if="i == 8">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/3.png`">
                                                                </span>
                                                            </div>
                                                        </template>
                                                        <template v-else-if="i == 9">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/4.png`">
                                                                </span>
                                                            </div>
                                                        </template>
                                                        <template v-else>
                                                            <div class="casino-nation-name">
                                                                <b>{{ main[i+17].nat.split(" ")[0] }}</b>
                                                            </div>
                                                        </template>

                                                        <div class="float-right dtl20info">
                                                            <i class="fas fa-info-circle" data-toggle="collapse"
                                                                :data-target="`#demo-l-t-${key}`"></i>
                                                            <div :id="`demo-l-t-${key}`" class="collapse icon-range">
                                                                R:<span v-kval="{size: main[i+17].min}"></span>-<span
                                                                    v-kval="{size: main[i+17].max}"></span>
                                                            </div>
                                                        </div>

                                                        <div class="casino-bl-box">
                                                            <div class="back casino-bl-box-item"
                                                                :class="{'suspended': main[i+17].gstatus != 'OPEN'}"
                                                                >
                                                                <span class="casino-box-odd">{{ main[i+17].b }}</span>
                                                                <span v-casinofancybook="{sid: main[i+17].sid, subid: 0}">0</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                            <div class="teen1daycenter"></div>
                                            <div class="teen1dayright">
                                                <template v-for="(i, key) in 9">
                                                    <div class="casino-box-row" :key="key">
                                                        <div class="casino-nation-name casino-card-img">
                                                            <span>
                                                                <template v-if="i == 7">
                                                                    <img :src="`${imgPath}front/img/cards/J.png`">
                                                                </template>
                                                                <template v-else-if="i == 8">
                                                                    <img :src="`${imgPath}front/img/cards/Q.png`">
                                                                </template>
                                                                <template v-else-if="i == 9">
                                                                    <img :src="`${imgPath}front/img/cards/K.png`">
                                                                </template>
                                                                <template v-else>
                                                                    <img :src="`${imgPath}front/img/cards/${i+4}.png`">
                                                                </template>
                                                            </span>
                                                        </div>
                                                        <div class="float-right dtl20info">
                                                            <i class="fas fa-info-circle" data-toggle="collapse"
                                                                :data-target="`#demo-r-t-${key}`"></i>
                                                            <div :id="`demo-r-t-${key}`" class="collapse icon-range">
                                                                R:<span v-kval="{size: main[i+26].min}"></span>-<span
                                                                    v-kval="{size: main[i+26].max}"></span>
                                                            </div>
                                                        </div>
                                                        <div class="casino-bl-box">
                                                            <div class="back casino-bl-box-item"
                                                                :class="{'suspended': main[i+26].gstatus != 'OPEN'}"
                                                                >
                                                                <span class="casino-box-odd">{{ main[i+26].b }}</span>
                                                                <span v-casinofancybook="{sid: main[i+26].sid, subid: 0}">0</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="tab-pane" id="lion">
                                        <div class="teen1daycasino-container">
                                            <div class="teen1dayleft">
                                                <template v-for="(i, key) in 9">
                                                    <div class="casino-box-row" :key="key">
                                                        <template v-if="i == 2">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/spade.png`">
                                                                    <img :src="`${imgPath}front/img/cards/club.png`">
                                                                </span>
                                                            </div>
                                                        </template>
                                                        <template v-else-if="i == 3">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/heart.png`">
                                                                    <img :src="`${imgPath}front/img/cards/diamond.png`">
                                                                </span>
                                                            </div>
                                                        </template>
                                                        <template v-else-if="i == 6">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/A.png`">
                                                                </span>
                                                            </div>
                                                        </template>
                                                        <template v-else-if="i == 7">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/2.png`">
                                                                </span>
                                                            </div>
                                                        </template>
                                                        <template v-else-if="i == 8">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/3.png`">
                                                                </span>
                                                            </div>
                                                        </template>
                                                        <template v-else-if="i == 9">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/4.png`">
                                                                </span>
                                                            </div>
                                                        </template>
                                                        <template v-else>
                                                            <div class="casino-nation-name">
                                                                <b>{{ main[i+35].nat.split(" ")[0] }}</b>
                                                            </div>
                                                        </template>

                                                        <div class="float-right dtl20info">
                                                            <i class="fas fa-info-circle" data-toggle="collapse"
                                                                :data-target="`#demo-l-l-${key}`"></i>
                                                            <div :id="`demo-l-l-${key}`" class="collapse icon-range">
                                                                R:<span v-kval="{size: main[i+35].min}"></span>-<span
                                                                    v-kval="{size: main[i+35].max}"></span>
                                                            </div>
                                                        </div>

                                                        <div class="casino-bl-box">
                                                            <div class="back casino-bl-box-item"
                                                                :class="{'suspended': main[i+35].gstatus != 'OPEN'}"
                                                                >
                                                                <span class="casino-box-odd">{{ main[i+35].b }}</span>
                                                                <span v-casinofancybook="{sid: main[i+35].sid, subid: 0}">0</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                            <div class="teen1daycenter"></div>
                                            <div class="teen1dayright">
                                                <template v-for="(i, key) in 9">
                                                    <div class="casino-box-row" :key="key">
                                                        <div class="casino-nation-name casino-card-img">
                                                            <span>
                                                                <template v-if="i == 7">
                                                                    <img :src="`${imgPath}front/img/cards/J.png`">
                                                                </template>
                                                                <template v-else-if="i == 8">
                                                                    <img :src="`${imgPath}front/img/cards/Q.png`">
                                                                </template>
                                                                <template v-else-if="i == 9">
                                                                    <img :src="`${imgPath}front/img/cards/K.png`">
                                                                </template>
                                                                <template v-else>
                                                                    <img :src="`${imgPath}front/img/cards/${i+4}.png`">
                                                                </template>
                                                            </span>
                                                        </div>
                                                        <div class="float-right dtl20info">
                                                            <i class="fas fa-info-circle" data-toggle="collapse"
                                                                :data-target="`#demo-r-l-${key}`"></i>
                                                            <div :id="`demo-r-l-${key}`" class="collapse icon-range">
                                                                R:<span v-kval="{size: main[i+44].min}"></span>-<span
                                                                    v-kval="{size: main[i+44].max}"></span>
                                                            </div>
                                                        </div>
                                                        <div class="casino-bl-box">
                                                            <div class="back casino-bl-box-item"
                                                                :class="{'suspended': main[i+44].gstatus != 'OPEN'}"
                                                                >
                                                                <span class="casino-box-odd">{{ main[i+44].b }}</span>
                                                                <span v-casinofancybook="{sid: main[i+44].sid, subid: 0}">0</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
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
                gameTitle: '20-20 D T L',
                gameType: 'dtl20',
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