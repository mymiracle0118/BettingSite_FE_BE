<template>
    <div class="casino-container">
        <!-- Casino Content -->
        <template v-if="!$store.getters.isTablet">
            <TimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current" />
        </template>
        <div class="casino-table note">
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
                                            @click="setBetData(odd[0].nat, odd[0].b, mId, odd[0].sid, odd[0].subtype, 0, 'back', gameType, odd[0].gstatus, odd[0].min, odd[0].max)">
                                            <span class="casino-box-odd">{{ odd[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': odd[0].gstatus != 'OPEN'}"
                                            @click="setBetData(odd[0].nat, odd[0].l, mId, odd[0].sid, odd[0].subtype, 0, 'lay', gameType, odd[0].gstatus, odd[0].min, odd[0].max)">
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
                                            @click="setBetData(black[0].nat, black[0].b, mId, black[0].sid, black[0].subtype, 0, 'back', gameType, black[0].gstatus, black[0].min, black[0].max)">
                                            <span class="casino-box-odd">{{ black[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': black[0].gstatus != 'OPEN'}"
                                            @click="setBetData(black[0].nat, black[0].l, mId, black[0].sid, black[0].subtype, 0, 'lay', gameType, black[0].gstatus, black[0].min, black[0].max)">
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
                                            @click="setBetData(low[0].nat, low[0].b, mId, low[0].sid, low[0].subtype, 0, 'back', gameType, low[0].gstatus, low[0].min, low[0].max)">
                                            <span class="casino-box-odd">{{ low[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': low[0].gstatus != 'OPEN'}"
                                            @click="setBetData(low[0].nat, low[0].l, mId, low[0].sid, low[0].subtype, 0, 'lay', gameType, low[0].gstatus, low[0].min, low[0].max)">
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
                                            @click="setBetData(even[0].nat, even[0].b, mId, even[0].sid, even[0].subtype, 0, 'back', gameType, even[0].gstatus, even[0].min, even[0].max)">
                                            <span class="casino-box-odd">{{ even[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': even[0].gstatus != 'OPEN'}"
                                            @click="setBetData(even[0].nat, even[0].l, mId, even[0].sid, even[0].subtype, 0, 'lay', gameType, even[0].gstatus, even[0].min, even[0].max)">
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
                                            @click="setBetData(red[0].nat, red[0].b, mId, red[0].sid, red[0].subtype, 0, 'back', gameType, red[0].gstatus, red[0].min, red[0].max)">
                                            <span class="casino-box-odd">{{ red[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': red[0].gstatus != 'OPEN'}"
                                            @click="setBetData(red[0].nat, red[0].l, mId, red[0].sid, red[0].subtype, 0, 'lay', gameType, red[0].gstatus, red[0].min, red[0].max)">
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
                                            @click="setBetData(high[0].nat, high[0].b, mId, high[0].sid, high[0].subtype, 0, 'back', gameType, high[0].gstatus, high[0].min, high[0].max)">
                                            <span class="casino-box-odd">{{ high[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': high[0].gstatus != 'OPEN'}"
                                            @click="setBetData(high[0].nat, high[0].l, mId, high[0].sid, high[0].subtype, 0, 'lay', gameType, high[0].gstatus, high[0].min, high[0].max)">
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
                                    @click="setBetData(odd[0].nat, odd[0].b, mId, odd[0].sid, odd[0].subtype, 0, 'back', gameType, odd[0].gstatus, odd[0].min, odd[0].max)">
                                    <span class="casino-box-odd">{{ odd[0].b }}</span>
                                </div>
                                <div class="lay casino-bl-box-item" :class="{'suspended': odd[0].gstatus != 'OPEN'}"
                                    @click="setBetData(odd[0].nat, odd[0].l, mId, odd[0].sid, odd[0].subtype, 0, 'lay', gameType, odd[0].gstatus, odd[0].min, odd[0].max)">
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
                                    @click="setBetData(even[0].nat, even[0].b, mId, even[0].sid, even[0].subtype, 0, 'back', gameType, even[0].gstatus, even[0].min, even[0].max)">
                                    <span class="casino-box-odd">{{ even[0].b }}</span>
                                </div>
                                <div class="lay casino-bl-box-item" :class="{'suspended': even[0].gstatus != 'OPEN'}"
                                    @click="setBetData(even[0].nat, even[0].l, mId, even[0].sid, even[0].subtype, 0, 'lay', gameType, even[0].gstatus, even[0].min, even[0].max)">
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
                                    @click="setBetData(black[0].nat, black[0].b, mId, black[0].sid, black[0].subtype, 0, 'back', gameType, black[0].gstatus, black[0].min, black[0].max)">
                                    <span class="casino-box-odd">{{ black[0].b }}</span>
                                </div>
                                <div class="lay casino-bl-box-item" :class="{'suspended': black[0].gstatus != 'OPEN'}"
                                    @click="setBetData(black[0].nat, black[0].l, mId, black[0].sid, black[0].subtype, 0, 'lay', gameType, black[0].gstatus, black[0].min, black[0].max)">
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
                                    @click="setBetData(red[0].nat, red[0].b, mId, red[0].sid, red[0].subtype, 0, 'back', gameType, red[0].gstatus, red[0].min, red[0].max)">
                                    <span class="casino-box-odd">{{ red[0].b }}</span>
                                </div>
                                <div class="lay casino-bl-box-item" :class="{'suspended': red[0].gstatus != 'OPEN'}"
                                    @click="setBetData(red[0].nat, red[0].l, mId, red[0].sid, red[0].subtype, 0, 'lay', gameType, red[0].gstatus, red[0].min, red[0].max)">
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
                                    @click="setBetData(low[0].nat, low[0].b, mId, low[0].sid, low[0].subtype, 0, 'back', gameType, low[0].gstatus, low[0].min, low[0].max)">
                                    <span class="casino-box-odd">{{ low[0].b }}</span>
                                </div>
                                <div class="lay casino-bl-box-item" :class="{'suspended': low[0].gstatus != 'OPEN'}"
                                    @click="setBetData(low[0].nat, low[0].l, mId, low[0].sid, low[0].subtype, 0, 'lay', gameType, low[0].gstatus, low[0].min, low[0].max)">
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
                                    @click="setBetData(high[0].nat, high[0].b, mId, high[0].sid, high[0].subtype, 0, 'back', gameType, high[0].gstatus, high[0].min, high[0].max)">
                                    <span class="casino-box-odd">{{ high[0].b }}</span>
                                </div>
                                <div class="lay casino-bl-box-item" :class="{'suspended': high[0].gstatus != 'OPEN'}"
                                    @click="setBetData(high[0].nat, high[0].l, mId, high[0].sid, high[0].subtype, 0, 'lay', gameType, high[0].gstatus, high[0].min, high[0].max)">
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
                                        @click="setBetData(bacc[0].nat, bacc[0].b, mId, bacc[0].sid, bacc[0].subtype, 0, 'back', gameType, bacc[0].gstatus, bacc[0].min, bacc[0].max)">
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
                                        @click="setBetData(bacc[1].nat, bacc[1].b, mId, bacc[1].sid, bacc[1].subtype, 0, 'back', gameType, bacc[1].gstatus, bacc[1].min, bacc[1].max)">
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
                                            @click="setBetData(odds.nat, odds.b, mId, card[0].sid, card[0].subtype, odds.ssid, 'back', gameType, card[0].gstatus, card[0].min, card[0].max)">
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

        <b-modal ref="runAmount" title="Run Amount" hide-footer @hide="bookData = []">
            <div class="table-responsive run-amount-container" v-if="bookData && bookData.length">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Run</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(data, key) in bookData">
                            <tr :key="key">
                                <td>{{ data.run }}</td>
                                <td>{{ data.amt }}</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
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
            odd() {
                var odd = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'odd'
                })
                return this.orderBy(odd, 'sr')
            },
            even() {
                var even = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'even'
                })
                return this.orderBy(even, 'sr')
            },
            black() {
                var black = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'black'
                })
                return this.orderBy(black, 'sr')
            },
            red() {
                var red = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'red'
                })
                return this.orderBy(red, 'sr')
            },
            low() {
                var low = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'low'
                })
                return this.orderBy(low, 'sr')
            },
            high() {
                var high = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'high'
                })
                return this.orderBy(high, 'sr')
            },
            bacc() {
                var bacc = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'bacc'
                })
                return this.orderBy(bacc, 'sr')
            },
            card() {
                var card = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'card'
                })
                return this.orderBy(card, 'sr')
            },
        },
        data() {
            return {
                bookData: [],
                showCards: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'notenum',
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

            getBookData(mid, sid) {
                ServiceApi.callApi("api/front/fancybookpopup", {
                        mid: mid,
                        sid: sid
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.bookData = response.data
                            this.$refs['runAmount'].show()
                        } else {
                            this.bookData = []
                        }
                    })
                    .catch(e => {
                        this.bookData = []
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
                console.log(nat, rate, mid, sid, subType, subId, bType, gType, gstatus)
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
            hidePlacebetModal() {
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