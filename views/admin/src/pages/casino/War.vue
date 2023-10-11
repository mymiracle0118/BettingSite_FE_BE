<template>
<div  class="detail-page-container">
    <div class="center-main-container">
        <div class="center-content">
            <div class="casino-container">
                <div class="casino-table casino-war">
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
                                <Card :card="cards[6]" />
                                
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
                    <div class="casino-detail"  v-if="casinoData && casinoData.mid">
                        <template v-if="$store.getters.isTablet">
                        <div class="teen1daycasino-container"> 
                            <div class="casino-war-container">
                                <div class="casino-box-row">
                                    <div class="casino-nation-name no-border">
                                        
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item casino-card-img">
                                            <Card :card="cards[0]" />
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item casino-card-img">
                                            <Card :card="cards[1]" />
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item casino-card-img">
                                            <Card :card="cards[2]" />
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item casino-card-img">
                                            <Card :card="cards[3]" />
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item casino-card-img">
                                            <Card :card="cards[4]" />
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item casino-card-img">
                                            <Card :card="cards[5]" />
                                        </div>
                                    </div>
                                </div>
                                <div class="casino-box-row casino-war-title">
                                    <div class="casino-nation-name no-border">
                                        
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item">
                                            <b>1</b>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item">
                                            <b>2</b>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item">
                                            <b>3</b>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item">
                                            <b>4</b>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item">
                                            <b>5</b>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box">
                                        <div class="casino-bl-box-item">
                                            <b>6</b>
                                        </div>
                                    </div>
                                </div>
                                <div class="casino-box-row mb-4" v-for="(i, key) in 9" :key="key">
                                    <div v-if="key==0" class="casino-nation-name">
                                        <b>Winner</b>
                                        <div class="float-right">
                                            <i class="fas fa-info-circle" data-toggle="collapse" data-target="#minmaxinfo0"></i>
                                            <div id="minmaxinfo0" class="collapse icon-range">
                                                R:<span v-kval="{ size: main[key].min }">0</span>-<span v-kval="{ size: main[key].max }">0</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="key==1" class="casino-nation-name casino-card-img">
                                        <span>
                                            <img :src="imgPath+'front/img/cards/spade.png'">
                                            <img :src="imgPath+'front/img/cards/club.png'">
                                        </span>
                                        <div class="float-right">
                                            <i class="fas fa-info-circle" data-toggle="collapse" data-target="#minmaxinfo1"></i>
                                            <div id="minmaxinfo1" class="collapse icon-range">
                                                R:<span v-kval="{ size: main[key].min }">0</span>-<span v-kval="{ size: main[key].max }">0</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="key==2" class="casino-nation-name casino-card-img">
                                        <span>
                                            <img :src="imgPath+'front/img/cards/heart.png'">
                                            <img :src="imgPath+'front/img/cards/diamond.png'">
                                        </span>
                                        <div class="float-right">
                                            <i class="fas fa-info-circle" data-toggle="collapse" data-target="#minmaxinfo2"></i>
                                            <div id="minmaxinfo2" class="collapse icon-range">
                                                R:<span v-kval="{ size: main[key].min }">0</span>-<span v-kval="{ size: main[key].max }">0</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="key==3" class="casino-nation-name">
                                        <b>Odd</b>
                                        <div class="float-right">
                                            <i class="fas fa-info-circle" data-toggle="collapse" data-target="#minmaxinfo3"></i>
                                            <div id="minmaxinfo3" class="collapse icon-range">
                                                R:<span v-kval="{ size: main[key].min }">0</span>-<span v-kval="{ size: main[key].max }">0</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="key==4" class="casino-nation-name">
                                        <b>Even</b>
                                        <div class="float-right">
                                            <i class="fas fa-info-circle" data-toggle="collapse" data-target="#minmaxinfo4"></i>
                                            <div id="minmaxinfo4" class="collapse icon-range">
                                                R:<span v-kval="{ size: main[key].min }">0</span>-<span v-kval="{ size: main[key].max }">0</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="key==5" class="casino-nation-name casino-card-img">
                                        <span>
                                            <img :src="imgPath+'front/img/cards/spade.png'">
                                        </span>
                                        <div class="float-right">
                                            <i class="fas fa-info-circle" data-toggle="collapse" data-target="#minmaxinfo5"></i>
                                            <div id="minmaxinfo5" class="collapse icon-range">
                                                R:<span v-kval="{ size: main[key].min }">0</span>-<span v-kval="{ size: main[key].max }">0</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="key==6" class="casino-nation-name casino-card-img">
                                        <span>
                                            <img :src="imgPath+'front/img/cards/club.png'">
                                        </span>
                                        <div class="float-right">
                                            <i class="fas fa-info-circle" data-toggle="collapse" data-target="#minmaxinfo6"></i>
                                            <div id="minmaxinfo6" class="collapse icon-range">
                                                R:<span v-kval="{ size: main[key].min }">0</span>-<span v-kval="{ size: main[key].max }">0</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="key==7" class="casino-nation-name casino-card-img">
                                        <span>
                                            <img :src="imgPath+'front/img/cards/heart.png'">
                                        </span>
                                        <div class="float-right">
                                            <i class="fas fa-info-circle" data-toggle="collapse" data-target="#minmaxinfo7"></i>
                                            <div id="minmaxinfo7" class="collapse icon-range">
                                                R:<span v-kval="{ size: main[key].min }">0</span>-<span v-kval="{ size: main[key].max }">0</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="key==8" class="casino-nation-name casino-card-img">
                                        <span>
                                            <img :src="imgPath+'front/img/cards/diamond.png'">
                                        </span>
                                        <div class="float-right">
                                            <i class="fas fa-info-circle" data-toggle="collapse" data-target="#minmaxinfo8"></i>
                                            <div id="minmaxinfo8" class="collapse icon-range">
                                                R:<span v-kval="{ size: main[key].min }">0</span>-<span v-kval="{ size: main[key].max }">0</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="casino-bl-box"  :class="{'suspended' : main[key].gstatus != 'OPEN' }">
                                        <div class="back casino-bl-box-item">
                                            <span class="casino-box-odd">{{ main[key].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[key].sid}"></span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box"  :class="{'suspended' : main[key+9].gstatus != 'OPEN' }">
                                        <div class="back casino-bl-box-item">
                                            <span class="casino-box-odd">{{ main[key+9].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[key+9].sid}"></span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box"  :class="{'suspended' : main[key+18].gstatus != 'OPEN' }">
                                        <div class="back casino-bl-box-item">
                                            <span class="casino-box-odd">{{ main[key+18].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[key+18].sid}"></span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box"  :class="{'suspended' : main[key+27].gstatus != 'OPEN' }">
                                        <div class="back casino-bl-box-item">
                                            <span class="casino-box-odd">{{ main[key+27].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[key+27].sid}"></span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box"  :class="{'suspended' : main[key+36].gstatus != 'OPEN' }">
                                        <div class="back casino-bl-box-item">
                                            <span class="casino-box-odd">{{ main[key+36].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[key+36].sid}"></span>
                                        </div>
                                    </div>
                                    <div class="casino-bl-box"  :class="{'suspended' : main[key+45].gstatus != 'OPEN' }">
                                        <div class="back casino-bl-box-item">
                                            <span class="casino-box-odd">{{ main[key+45].b }}</span>
                                            <span class="casino-book" v-casinofancybook="{sid: main[key+45].sid}"></span>
                                        </div>
                                    </div>

                                </div>
                               
                                
                            </div>
                        </div>
                        </template>
                        
                        <template v-if="!$store.getters.isTablet">
                            <div class="teen1daycasino-container d-none-big">
                                <div class="casino-war-container casino-war-cards">
                                    <template v-if="cards && cards.length">
                                        <div class="casino-box-row">
                                            <div class="casino-bl-box">
                                                <div class="casino-bl-box-item casino-card-img">
                                                    <Card :card="cards[0]" />
                                                </div>
                                            </div>
                                            <div class="casino-bl-box">
                                                <div class="casino-bl-box-item casino-card-img">
                                                    <Card :card="cards[1]" />
                                                </div>
                                            </div>
                                            <div class="casino-bl-box">
                                                <div class="casino-bl-box-item casino-card-img">
                                                    <Card :card="cards[2]" />
                                                </div>
                                            </div>
                                            <div class="casino-bl-box">
                                                <div class="casino-bl-box-item casino-card-img">
                                                    <Card :card="cards[3]" />
                                                </div>
                                            </div>
                                            <div class="casino-bl-box">
                                                <div class="casino-bl-box-item casino-card-img">
                                                    <Card :card="cards[4]" />
                                                </div>
                                            </div>
                                            <div class="casino-bl-box">
                                                <div class="casino-bl-box-item casino-card-img">
                                                    <Card :card="cards[5]" />
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                                <div class="casino-tabs">
                                    <ul class="nav nav-tabs">
                                        <li class="nav-item">
                                            <a href="#tab1" class="nav-link active" data-toggle="tab">1</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#tab2" class="nav-link" data-toggle="tab">2</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#tab3" class="nav-link" data-toggle="tab">3</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#tab4" class="nav-link" data-toggle="tab">4</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#tab5" class="nav-link" data-toggle="tab">5</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#tab6" class="nav-link" data-toggle="tab">6</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="tab-content w-100">
                                    <template v-for="(i, key) in 6">
                                        <div class="tab-pane" :class="{'active':key==0}" :id="`tab${i}`" :key="key">
                                            <div class="teen1daycasino-container">
                                                <div class="teen1dayleft">
                                                    <div class="casino-war-container">
                                                        <div class="casino-box-row">
                                                            <div class="casino-nation-name">
                                                                <b>{{ main[key*9].nat }}</b>
                                                                <div class="float-right">
                                                                    <i class="fas fa-info-circle" data-toggle="collapse"
                                                                        :data-target="`#demo-${key*9}`"></i>
                                                                    <div :id="`demo-${key*9}`" class="collapse icon-range">
                                                                        R:<span v-kval="{size: main[key*9].min}"></span>-<span
                                                                            v-kval="{size: main[key*9].max}"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="casino-bl-box">
                                                                <div class="back casino-bl-box-item" :class="{'suspended': main[key*9].gstatus != 'OPEN'}"
                                                                    >
                                                                    <span class="casino-box-odd">{{ main[key*9].b }}</span>
                                                                    <span v-casinofancybook="{sid: main[key*9].sid, subid: 0}">0</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="casino-box-row">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/spade.png`">
                                                                    <img :src="`${imgPath}front/img/cards/club.png`">
                                                                </span>
                                                                <div class="float-right">
                                                                    <i class="fas fa-info-circle" data-toggle="collapse"
                                                                        :data-target="`#demo-${(key*9)+1}`"></i>
                                                                    <div :id="`demo-${(key*9)+1}`" class="collapse icon-range">
                                                                        R:<span v-kval="{size: main[(key*9)+1].min}"></span>-<span
                                                                            v-kval="{size: main[(key*9)+1].max}"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="casino-bl-box">
                                                                <div class="back casino-bl-box-item" :class="{'suspended': main[(key*9)+1].gstatus != 'OPEN'}"
                                                                    >
                                                                    <span class="casino-box-odd">{{ main[(key*9)+1].b }}</span>
                                                                    <span v-casinofancybook="{sid: main[(key*9)+1].sid, subid: 0}">0</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="casino-box-row">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/heart.png`">
                                                                    <img :src="`${imgPath}front/img/cards/diamond.png`">
                                                                </span>
                                                                <div class="float-right">
                                                                    <i class="fas fa-info-circle" data-toggle="collapse"
                                                                        :data-target="`#demo-${(key*9)+2}`"></i>
                                                                    <div :id="`demo-${(key*9)+2}`" class="collapse icon-range">
                                                                        R:<span v-kval="{size: main[(key*9)+2].min}"></span>-<span
                                                                            v-kval="{size: main[(key*9)+2].max}"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="casino-bl-box">
                                                                <div class="back casino-bl-box-item" :class="{'suspended': main[(key*9)+2].gstatus != 'OPEN'}"
                                                                    >
                                                                    <span class="casino-box-odd">{{ main[(key*9)+2].b }}</span>
                                                                    <span v-casinofancybook="{sid: main[(key*9)+2].sid, subid: 0}">0</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="casino-box-row">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <b>{{ main[(key*9)+3].nat }}</b>
                                                                <div class="float-right">
                                                                    <i class="fas fa-info-circle" data-toggle="collapse"
                                                                        :data-target="`#demo-${(key*9)+3}`"></i>
                                                                    <div :id="`demo-${(key*9)+3}`" class="collapse icon-range">
                                                                        R:<span v-kval="{size: main[(key*9)+3].min}"></span>-<span
                                                                            v-kval="{size: main[(key*9)+3].max}"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="casino-bl-box">
                                                                <div class="back casino-bl-box-item" :class="{'suspended': main[(key*9)+3].gstatus != 'OPEN'}"
                                                                    >
                                                                    <span class="casino-box-odd">{{ main[(key*9)+3].b }}</span>
                                                                    <span v-casinofancybook="{sid: main[(key*9)+3].sid, subid: 0}">0</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="casino-box-row">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <b>{{ main[(key*9)+4].nat }}</b>
                                                                <div class="float-right">
                                                                    <i class="fas fa-info-circle" data-toggle="collapse"
                                                                        :data-target="`#demo-${(key*9)+4}`"></i>
                                                                    <div :id="`demo-${(key*9)+4}`" class="collapse icon-range">
                                                                        R:<span v-kval="{size: main[(key*9)+4].min}"></span>-<span
                                                                            v-kval="{size: main[(key*9)+4].max}"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="casino-bl-box">
                                                                <div class="back casino-bl-box-item" :class="{'suspended': main[(key*9)+4].gstatus != 'OPEN'}"
                                                                    >
                                                                    <span class="casino-box-odd">{{ main[(key*9)+4].b }}</span>
                                                                    <span v-casinofancybook="{sid: main[(key*9)+4].sid, subid: 0}">0</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="teen1daycenter"></div>
                                                <div class="teen1dayright">
                                                    <div class="casino-war-container">
                                                        <div class="casino-box-row">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/spade.png`">
                                                                </span>
                                                                <div class="float-right">
                                                                    <i class="fas fa-info-circle" data-toggle="collapse"
                                                                        :data-target="`#demo-${(key*9)+5}`"></i>
                                                                    <div :id="`demo-${(key*9)+5}`" class="collapse icon-range">
                                                                        R:<span v-kval="{size: main[(key*9)+5].min}"></span>-<span
                                                                            v-kval="{size: main[(key*9)+5].max}"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="casino-bl-box">
                                                                <div class="back casino-bl-box-item" :class="{'suspended': main[(key*9)+5].gstatus != 'OPEN'}"
                                                                    >
                                                                    <span class="casino-box-odd">{{ main[(key*9)+5].b }}</span>
                                                                    <span v-casinofancybook="{sid: main[(key*9)+5].sid, subid: 0}">0</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="casino-box-row">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/heart.png`">
                                                                </span>
                                                                <div class="float-right">
                                                                    <i class="fas fa-info-circle" data-toggle="collapse"
                                                                        :data-target="`#demo-${(key*9)+6}`"></i>
                                                                    <div :id="`demo-${(key*9)+6}`" class="collapse icon-range">
                                                                        R:<span v-kval="{size: main[(key*9)+6].min}"></span>-<span
                                                                            v-kval="{size: main[(key*9)+6].max}"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="casino-bl-box">
                                                                <div class="back casino-bl-box-item" :class="{'suspended': main[(key*9)+6].gstatus != 'OPEN'}"
                                                                    >
                                                                    <span class="casino-box-odd">{{ main[(key*9)+6].b }}</span>
                                                                    <span v-casinofancybook="{sid: main[(key*9)+6].sid, subid: 0}">0</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="casino-box-row">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/club.png`">
                                                                </span>
                                                                <div class="float-right">
                                                                    <i class="fas fa-info-circle" data-toggle="collapse"
                                                                        :data-target="`#demo-${(key*9)+7}`"></i>
                                                                    <div :id="`demo-${(key*9)+7}`" class="collapse icon-range">
                                                                        R:<span v-kval="{size: main[(key*9)+7].min}"></span>-<span
                                                                            v-kval="{size: main[(key*9)+7].max}"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="casino-bl-box">
                                                                <div class="back casino-bl-box-item" :class="{'suspended': main[(key*9)+7].gstatus != 'OPEN'}"
                                                                    >
                                                                    <span class="casino-box-odd">{{ main[(key*9)+7].b }}</span>
                                                                    <span v-casinofancybook="{sid: main[(key*9)+7].sid, subid: 0}">0</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="casino-box-row">
                                                            <div class="casino-nation-name casino-card-img">
                                                                <span>
                                                                    <img :src="`${imgPath}front/img/cards/diamond.png`">
                                                                </span>
                                                                <div class="float-right">
                                                                    <i class="fas fa-info-circle" data-toggle="collapse"
                                                                        :data-target="`#demo-${(key*9)+8}`"></i>
                                                                    <div :id="`demo-${(key*9)+8}`" class="collapse icon-range">
                                                                        R:<span v-kval="{size: main[(key*9)+8].min}"></span>-<span
                                                                            v-kval="{size: main[(key*9)+8].max}"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="casino-bl-box">
                                                                <div class="back casino-bl-box-item" :class="{'suspended': main[(key*9)+8].gstatus != 'OPEN'}"
                                                                    >
                                                                    <span class="casino-box-odd">{{ main[(key*9)+8].b }}</span>
                                                                    <span v-casinofancybook="{sid: main[(key*9)+8].sid, subid: 0}">0</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
                gameTitle: 'Casino War',
                gameType: 'war',
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
                   /* this.$store.state.casinoBetSoda = null
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