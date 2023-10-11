<template>
<div class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table teenpatti2024">
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
                                            <div class="playera">{{ main[0].nat }}
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
                                            <b>{{ main[0].nat }}</b>
                                            <div class="float-right">
                                                <span class="mr-2" v-casinobook="{sid: main[0].sid}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': main[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ main[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item" :class="{'suspended': main[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ main[0].l }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>{{ run9[0].nat }}</b>
                                            <div class="float-right">
                                                <span class="mr-2" v-casinofancybook="{sid: run9[0].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': run9[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ run9[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item" :class="{'suspended': run9[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ run9[0].l }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>{{ con20[0].nat }}</b>
                                            <div class="float-right">
                                                <span class="mr-2" v-casinofancybook="{sid: con20[0].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': con20[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ con20[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item" :class="{'suspended': con20[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ con20[0].l }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>{{ pair20[0].nat }}</b>
                                            <div class="float-right">
                                                <span class="mr-2" v-casinofancybook="{sid: pair20[0].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': pair20[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ pair20[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item" :class="{'suspended': pair20[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ pair20[0].l }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>{{ seq20[0].nat }}</b>
                                            <div class="float-right">
                                                <span class="mr-2" v-casinofancybook="{sid: seq20[0].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': seq20[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ seq20[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item" :class="{'suspended': seq20[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ seq20[0].l }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="teen1daycenter"></div>
                                <div class="teen1dayright">
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name no-border casino-bl-box-title">
                                            <div class="playerb">{{ main[1].nat }}
                                                <div class="d-flex">
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/8.jpg`">
                                                    </div>
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/9.jpg`">
                                                    </div>
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/10.jpg`">
                                                    </div>
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/J.jpg`">
                                                    </div>
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/Q.jpg`">
                                                    </div>
                                                    <div class=" card-image ml-1">
                                                        <img :src="`${imgPath}front/img/cards/single/K.jpg`">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box casino-bl-box-title">
                                            <div class="casino-bl-box-item" >
                                                <b>Back</b>
                                            </div>
                                            <div class="casino-bl-box-item">
                                                <b>Lay</b>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>{{ main[1].nat }}</b>
                                            <div class="float-right">
                                                <span class="mr-2" v-casinobook="{sid: main[1].sid}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': main[1].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ main[1].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item" :class="{'suspended': main[1].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ main[1].l }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>{{ run31[0].nat }}</b>
                                            <div class="float-right">
                                                <span class="mr-2" v-casinofancybook="{sid: run31[0].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': run31[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ run31[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item" :class="{'suspended': run31[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ run31[0].l }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>{{ con24[0].nat }}</b>
                                            <div class="float-right">
                                                <span class="mr-2" v-casinofancybook="{sid: con24[0].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': con24[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ con24[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item" :class="{'suspended': con24[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ con24[0].l }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>{{ pair24[0].nat }}</b>
                                            <div class="float-right">
                                                <span class="mr-2" v-casinofancybook="{sid: pair24[0].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': pair24[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ pair24[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item" :class="{'suspended': pair24[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ pair24[0].l }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="casino-box-row">
                                        <div class="casino-nation-name">
                                            <b>{{ seq24[0].nat }}</b>
                                            <div class="float-right">
                                                <span class="mr-2" v-casinofancybook="{sid: seq24[0].sid, subid: 0}">0</span>
                                            </div>
                                        </div>
                                        <div class="casino-bl-box">
                                            <div class="back casino-bl-box-item" :class="{'suspended': seq24[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ seq24[0].b }}</span>
                                            </div>
                                            <div class="lay casino-bl-box-item" :class="{'suspended': seq24[0].gstatus != 'OPEN'}"
                                                >
                                                <span class="casino-box-odd">{{ seq24[0].l }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </template>

                        <template v-if="!$store.getters.isTablet">
                            <div class="teen1daycasino-container d-none-big">
                                <div class="casino-nation-name no-border casino-bl-box-title">
                                    <div class="playera">{{ main[0].nat }}
                                        <div class="d-flex w-100">
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
                                </div>
                                <div class="casino-nation-name no-border casino-bl-box-title">
                                    <div class="playerb">{{ main[1].nat }}
                                        <div class="d-flex w-100">
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/8.jpg`">
                                                </div>
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/9.jpg`">
                                                </div>
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/10.jpg`">
                                                </div>
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/J.jpg`">
                                                </div>
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/Q.jpg`">
                                                </div>
                                                <div class=" card-image ml-1">
                                                    <img :src="`${imgPath}front/img/cards/single/K.jpg`">
                                                </div>
                                            </div>
                                    </div>
                                </div>
                                <div class="casino-box-row">
                                    <div class="casino-bl-box casino-bl-box-title">
                                        <div class="casino-bl-box-item">
                                            &nbsp;
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <b>Back</b>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <b>Lay</b>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box ">
                                        <div class="casino-bl-box-item casino-odds-name" >
                                            <span>{{ main[0].nat }}</span>
                                            <span class="float-right w-100" v-casinobook="{sid: main[0].sid}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item" :class="{'suspended': main[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ main[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': main[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ main[0].l }}</span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box ">
                                        <div class="casino-bl-box-item casino-odds-name" >
                                            <span>{{ main[1].nat }}</span>
                                            <span class="float-right w-100" v-casinobook="{sid: main[1].sid}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item" :class="{'suspended': main[1].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ main[1].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': main[1].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ main[1].l }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="casino-box-row">
                                    <div class="casino-bl-box casino-bl-box-title">
                                        <div class="casino-bl-box-item">
                                            &nbsp;
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <b>Back</b>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <b>Lay</b>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box ">
                                        <div class="casino-bl-box-item casino-odds-name" >
                                            <span>{{ run9[0].nat }}</span>
                                            <span class="float-right w-100" v-casinofancybook="{sid: run9[0].sid, subid: 0}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item" :class="{'suspended': run9[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ run9[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': run9[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ run9[0].l }}</span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box ">
                                        <div class="casino-bl-box-item casino-odds-name" >
                                            <span>{{ run31[0].nat }}</span>
                                            <span class="float-right w-100" v-casinofancybook="{sid: run31[0].sid, subid: 0}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item" :class="{'suspended': run31[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ run31[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': run31[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ run31[0].l }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="casino-box-row">
                                    <div class="casino-bl-box casino-bl-box-title">
                                        <div class="casino-bl-box-item">
                                            &nbsp;
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <b>Back</b>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <b>Lay</b>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box ">
                                        <div class="casino-bl-box-item casino-odds-name" >
                                            <span>{{ con20[0].nat }}</span>
                                            <span class="float-right w-100" v-casinofancybook="{sid: con20[0].sid, subid: 0}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item" :class="{'suspended': con20[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ con20[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': con20[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ con20[0].l }}</span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box ">
                                        <div class="casino-bl-box-item casino-odds-name" >
                                            <span>{{ con24[0].nat }}</span>
                                            <span class="float-right w-100" v-casinofancybook="{sid: con24[0].sid, subid: 0}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item" :class="{'suspended': con24[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ con24[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': con24[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ con24[0].l }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="casino-box-row">
                                    <div class="casino-bl-box casino-bl-box-title">
                                        <div class="casino-bl-box-item">
                                            &nbsp;
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <b>Back</b>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <b>Lay</b>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box ">
                                        <div class="casino-bl-box-item casino-odds-name" >
                                            <span>{{ pair20[0].nat }}</span>
                                            <span class="float-right w-100" v-casinofancybook="{sid: pair20[0].sid, subid: 0}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item" :class="{'suspended': pair20[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ pair20[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': pair20[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ pair20[0].l }}</span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box ">
                                        <div class="casino-bl-box-item casino-odds-name" >
                                            <span>{{ pair24[0].nat }}</span>
                                            <span class="float-right w-100" v-casinofancybook="{sid: pair24[0].sid, subid: 0}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item" :class="{'suspended': pair24[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ pair24[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': pair24[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ pair24[0].l }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="casino-box-row">
                                    <div class="casino-bl-box casino-bl-box-title">
                                        <div class="casino-bl-box-item">
                                            &nbsp;
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <b>Back</b>
                                        </div>
                                        <div class="casino-bl-box-item">
                                            <b>Lay</b>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box ">
                                        <div class="casino-bl-box-item casino-odds-name" >
                                            <span>{{ seq20[0].nat }}</span>
                                            <span class="float-right w-100" v-casinofancybook="{sid: seq20[0].sid, subid: 0}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item" :class="{'suspended': seq20[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ seq20[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': seq20[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ seq20[0].l }}</span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box ">
                                        <div class="casino-bl-box-item casino-odds-name" >
                                            <span>{{ seq24[0].nat }}</span>
                                            <span class="float-right" v-casinofancybook="{sid: seq24[0].sid, subid: 0}">0</span>
                                        </div>
                                        <div class="back casino-bl-box-item" :class="{'suspended': seq24[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ seq24[0].b }}</span>
                                        </div>
                                        <div class="lay casino-bl-box-item" :class="{'suspended': seq24[0].gstatus != 'OPEN'}"
                                            >
                                            <span class="casino-box-odd">{{ seq24[0].l }}</span>
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
                    'subtype': 'teen2024'
                })
                return this.orderBy(main, 'sr')
            },
            con20() {
                var consicutive = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'con20'
                })
                return this.orderBy(consicutive, 'sr')
            },
            con24() {
                var consicutive = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'con24'
                })
                return this.orderBy(consicutive, 'sr')
            },
            pair20() {
                var pair = _.filter(_.get(this.casinoData, 'sub'), (o) => {
                    return (o.subtype == 'pair20')
                })
                return this.orderBy(pair, 'sr')
            },
            pair24() {
                var pair = _.filter(_.get(this.casinoData, 'sub'), (o) => {
                    return (o.subtype == 'pair24')
                })
                return this.orderBy(pair, 'sr')
            },
            seq20() {
                var seq = _.filter(_.get(this.casinoData, 'sub'), (o) => {
                    return (o.subtype == 'seq20')
                })
                return this.orderBy(seq, 'sr')
            },
            seq24() {
                var seq = _.filter(_.get(this.casinoData, 'sub'), (o) => {
                    return (o.subtype == 'seq24')
                })
                return this.orderBy(seq, 'sr')
            },
            run9() {
                var run9 = _.filter(_.get(this.casinoData, 'sub'), (o) => {
                    return (o.subtype == 'run9')
                })
                return this.orderBy(run9, 'sr')
            },
            run31() {
                var run31 = _.filter(_.get(this.casinoData, 'sub'), (o) => {
                    return (o.subtype == 'run31')
                })
                return this.orderBy(run31, 'sr')
            },
        },
        data() {
            return {
                showCards: true,
                showResults: true,
                imgPath: IMG_PATH,
                gameTitle: 'Teenpatti 2024',
                gameType: 'teen2024',
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