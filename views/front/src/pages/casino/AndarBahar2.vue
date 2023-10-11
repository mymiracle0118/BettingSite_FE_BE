<template>
    <div class="casino-container">
        <!-- Casino Content -->
        <template v-if="!$store.getters.isTablet">
            <TimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current" />
        </template>
        <div class="casino-table andar-bahar2">
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
                <!-- <template v-if="cards && cards.length"> -->
                <div class="casino-video-cards d-none-small"
                    :class="{'hide-cards': (!showCards || !cards.length > 0 || cards[0] == 1)}">
                    <div class="casino-cards-shuffle" @click="toggleCards()">
                        <i class="fas fa-grip-lines-vertical"></i>
                    </div>
                    <div class="casino-video-cards-container">

                        <div class="row row5 align-items-center">
                            <div class="col-1">
                                <div class="row row5">
                                    <div class="col-12">
                                        <b>A</b>
                                    </div>
                                </div>
                                <div class="row row5">
                                    <div class="col-12">
                                        <b>B</b>
                                    </div>
                                </div>
                            </div>
                            <div class="col-2">
                                <span>
                                    <img class="card-right" :src="imgPath+ 'front/img/cards/'+ cards[0]+ '.png'">
                                </span>
                            </div>
                            <div class="col-9">
                                <div class="card-inner">
                                    <div class="row row5">
                                        <div class="col-3">
                                            <span>
                                                <img :src="imgPath+ 'front/img/cards/'+ cards[2]+ '.png'">
                                            </span>
                                        </div>
                                        <div class="col-9">
                                            <div class="ab-slider owl-carousel owl-theme" id="andarSlider"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-inner">
                                    <div class="row row5 mt-1">
                                        <div class="col-3">
                                            <span>
                                                <img :src="imgPath+ 'front/img/cards/'+ cards[1]+ '.png'">
                                            </span>
                                        </div>
                                        <div class="col-9">
                                            <div class="ab-slider owl-carousel owl-theme" id="baharSlider"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
                <!-- </template> -->
                <div class="casino-timer  d-none-mobile">
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

            <div class="casino-detail">
                <div class="casino-video-cards d-none-big">
                    <div class="casino-video-cards-container">
                        <div class="row row5 align-items-center">
                            <div class="col-1">
                                <div class="row row5">
                                    <div class="col-12">
                                        <b>A</b>
                                    </div>
                                </div>
                                <div class="row row5">
                                    <div class="col-12">
                                        <b>B</b>
                                    </div>
                                </div>
                            </div>
                            <div class="col-2">
                                <span>
                                    <img class="card-right" :src="imgPath+ 'front/img/cards/'+ cards[0]+ '.png'">
                                </span>
                            </div>
                            <div class="col-9">
                                <div class="card-inner">
                                    <div class="row row5">
                                        <div class="col-3">
                                            <span>
                                                <img :src="imgPath+ 'front/img/cards/'+ cards[2]+ '.png'">
                                            </span>
                                        </div>
                                        <div class="col-9">
                                            <div class="ab-slider owl-carousel owl-theme" id="andarSliderMob"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-inner">
                                    <div class="row row5 mt-1">
                                        <div class="col-3">
                                            <span>
                                                <img :src="imgPath+ 'front/img/cards/'+ cards[1]+ '.png'">
                                            </span>
                                        </div>
                                        <div class="col-9">
                                            <div class="ab-slider owl-carousel owl-theme" id="baharSliderMob"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <template v-if="casinoData && casinoData.mid">
                    <div class="teen20casino-container">
                        <div class="teen20left">
                            <div class="ab2-title">A</div>
                            <div class="sa-sb-box pr" :class="{'suspended': main[0].gstatus != 'OPEN'}"
                                @click="setBetData(main[0].nat, main[0].b, mId, main[0].sid, main[0].subtype, 0, 'back', gameType, main[0].gstatus, main[0].min, main[0].max)">
                                <div>SA</div>
                                <div>{{ main[0].b }}</div>
                                <div class="ab-book" v-casinofancybook="{sid: main[0].sid, subid: 0}">0</div>
                                <!-- <div class="casino-min-max">
                                    <i class="fas fa-info-circle float-right collapsed" data-toggle="collapse"
                                        data-target="#range1" aria-expanded="false"></i>
                                    <div id="range1" class="icon-range collapse" style="">
                                        R:<span v-kval="{size: main[0].min}"></span>-<span
                                            v-kval="{size: main[0].max}"></span>
                                    </div>
                                </div> -->
                            </div>
                            <div class="ab2-bet pr" :class="{'suspended': main[1].gstatus != 'OPEN'}"
                                @click="setBetData(main[1].nat, main[1].b, mId, main[1].sid, main[1].subtype, 0, 'back', gameType, main[1].gstatus, main[1].min, main[1].max)">
                                <div>First Bet</div>
                                <div>{{ main[1].b }}</div>
                                <div class="ab-book" v-casinofancybook="{sid: main[1].sid, subid: 0}">0</div>
                                <!-- <div class="casino-min-max">
                                    <i class="fas fa-info-circle float-right collapsed" data-toggle="collapse"
                                        data-target="#range2" aria-expanded="false"></i>
                                    <div id="range2" class="icon-range collapse" style="">
                                        R:<span v-kval="{size: main[1].min}"></span>-<span
                                            v-kval="{size: main[1].max}"></span>
                                    </div>
                                </div> -->
                            </div>
                            <div class="ab2-bet pr" :class="{'suspended': main[2].gstatus != 'OPEN'}"
                                @click="setBetData(main[2].nat, main[2].b, mId, main[2].sid, main[2].subtype, 0, 'back', gameType, main[2].gstatus, main[2].min, main[2].max)">
                                <div>Second Bet</div>
                                <div>{{ main[2].b }}</div>
                                <div class="ab-book" v-casinofancybook="{sid: main[2].sid, subid: 0}">0</div>
                                <!-- <div class="casino-min-max">
                                    <i class="fas fa-info-circle float-right collapsed" data-toggle="collapse"
                                        data-target="#range3" aria-expanded="false"></i>
                                    <div id="range3" class="icon-range collapse" style="">
                                        R:<span v-kval="{size: main[2].min}"></span>-<span
                                            v-kval="{size: main[2].max}"></span>
                                    </div>
                                </div> -->
                            </div>
                            <div class="ab2-title">A</div>
                        </div>
                        <div class="teen20center"></div>
                        <div class="teen20right">
                            <div class="ab2-title">B</div>
                            <div class="sa-sb-box pr" :class="{'suspended': main[3].gstatus != 'OPEN'}"
                                @click="setBetData(main[3].nat, main[3].b, mId, main[3].sid, main[3].subtype, 0, 'back', gameType, main[3].gstatus, main[3].min, main[3].max)">
                                <div>SB</div>
                                <div>{{ main[3].b }}</div>
                                <div class="ab-book" v-casinofancybook="{sid: main[3].sid, subid: 0}">0</div>
                                <!-- <div class="casino-min-max">
                                    <i class="fas fa-info-circle float-right collapsed" data-toggle="collapse"
                                        data-target="#range4" aria-expanded="false"></i>
                                    <div id="range4" class="icon-range collapse" style="">
                                        R:<span v-kval="{size: main[3].min}"></span>-<span
                                            v-kval="{size: main[3].max}"></span>
                                    </div>
                                </div> -->
                            </div>
                            <div class="ab2-bet pr" :class="{'suspended': main[4].gstatus != 'OPEN'}"
                                @click="setBetData(main[4].nat, main[4].b, mId, main[4].sid, main[4].subtype, 0, 'back', gameType, main[4].gstatus, main[4].min, main[4].max)">
                                <div>First Bet</div>
                                <div>{{ main[4].b }}</div>
                                <div class="ab-book" v-casinofancybook="{sid: main[4].sid, subid: 0}">0</div>
                                <!-- <div class="casino-min-max">
                                    <i class="fas fa-info-circle float-right collapsed" data-toggle="collapse"
                                        data-target="#range5" aria-expanded="false"></i>
                                    <div id="range5" class="icon-range collapse" style="">
                                        R:<span v-kval="{size: main[4].min}"></span>-<span
                                            v-kval="{size: main[4].max}"></span>
                                    </div>
                                </div> -->
                            </div>
                            <div class="ab2-bet pr" :class="{'suspended': main[5].gstatus != 'OPEN'}"
                                @click="setBetData(main[5].nat, main[5].b, mId, main[5].sid, main[5].subtype, 0, 'back', gameType, main[5].gstatus, main[5].min, main[5].max)">
                                <div>Second Bet</div>
                                <div>{{ main[5].b }}</div>
                                <div class="ab-book" v-casinofancybook="{sid: main[5].sid, subid: 0}">0</div>
                                <!-- <div class="casino-min-max">
                                    <i class="fas fa-info-circle float-right collapsed" data-toggle="collapse"
                                        data-target="#range6" aria-expanded="false"></i>
                                    <div id="range6" class="icon-range collapse" style="">
                                        R:<span v-kval="{size: main[5].min}"></span>-<span
                                            v-kval="{size: main[5].max}"></span>
                                    </div>
                                </div> -->
                            </div>
                            <div class="ab2-title">B</div>
                        </div>
                    </div>

                    <div class="teen20casino-container">
                        <div class="teen20left ab2oddeven">
                            <div class="casino-box-row">
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item">
                                        <b>Odd</b>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item">
                                        <b>Even</b>
                                    </div>
                                </div>
                            </div>
                            <div class="casino-box-row">
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[23].gstatus != 'OPEN'}"
                                        @click="setBetData(main[23].nat, main[23].b, mId, main[23].sid, main[23].subtype, 0, 'back', gameType, main[23].gstatus, main[23].min, main[23].max)">
                                        <span class="casino-box-odd">{{ main[23].b }}</span>
                                        <span v-casinofancybook="{sid: main[23].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[24].gstatus != 'OPEN'}"
                                        @click="setBetData(main[24].nat, main[24].b, mId, main[24].sid, main[24].subtype, 0, 'back', gameType, main[24].gstatus, main[24].min, main[24].max)">
                                        <span class="casino-box-odd">{{ main[24].b }}</span>
                                        <span v-casinofancybook="{sid: main[24].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="w-100 text-right">
                                <div class="casino-min-max">
                                    R:<span v-kval="{size: main[23].min}"></span>-<span
                                        v-kval="{size: main[23].max}"></span>
                                </div>
                            </div> -->
                        </div>
                        <div class="teen20center"></div>
                        <div class="teen20left ab2cards">
                            <div class="casino-box-row">
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item casino-card-img">
                                        <img :src="`${imgPath}front/img/cards/spade.png`">
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item casino-card-img">
                                        <img :src="`${imgPath}front/img/cards/heart.png`">
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item casino-card-img">
                                        <img :src="`${imgPath}front/img/cards/club.png`">
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="casino-bl-box-item casino-card-img">
                                        <img :src="`${imgPath}front/img/cards/diamond.png`">
                                    </div>
                                </div>
                            </div>
                            <div class="casino-box-row">
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[19].gstatus != 'OPEN'}"
                                        @click="setBetData(main[19].nat, main[19].b, mId, main[19].sid, main[19].subtype, 0, 'back', gameType, main[19].gstatus, main[19].min, main[19].max)">
                                        <span class="casino-box-odd">{{ main[19].b }}</span>
                                        <span v-casinofancybook="{sid: main[19].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[21].gstatus != 'OPEN'}"
                                        @click="setBetData(main[21].nat, main[21].b, mId, main[21].sid, main[21].subtype, 0, 'back', gameType, main[21].gstatus, main[21].min, main[21].max)">
                                        <span class="casino-box-odd">{{ main[21].b }}</span>
                                        <span v-casinofancybook="{sid: main[21].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[20].gstatus != 'OPEN'}"
                                        @click="setBetData(main[20].nat, main[20].b, mId, main[20].sid, main[20].subtype, 0, 'back', gameType, main[20].gstatus, main[20].min, main[20].max)">
                                        <span class="casino-box-odd">{{ main[20].b }}</span>
                                        <span v-casinofancybook="{sid: main[20].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item" :class="{'suspended': main[22].gstatus != 'OPEN'}"
                                        @click="setBetData(main[22].nat, main[22].b, mId, main[22].sid, main[22].subtype, 0, 'back', gameType, main[22].gstatus, main[22].min, main[22].max)">
                                        <span class="casino-box-odd">{{ main[22].b }}</span>
                                        <span v-casinofancybook="{sid: main[22].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="w-100 text-right">
                                <div class="casino-min-max">
                                    R:<span v-kval="{size: main[19].min}"></span>-<span
                                        v-kval="{size: main[19].max}"></span>
                                </div>
                            </div> -->
                        </div>
                    </div>

                    <div class="teen20casino-container ab2allcards">
                        <div class="text-center w-100">
                            <div class="casino-bl-box casino-cards-odds-title">
                                <div class="casino-bl-box-item">
                                    <b>{{ main[6].b }}</b>
                                </div>
                            </div>
                        </div>
                        <div class="casino-cards text-center mt-1">
                            <template v-for="(i, key) in 13">
                                <div class="casino-card-item" :key="key">
                                    <div class=" card-image" :class="{'suspended': main[i+5].gstatus != 'OPEN'}"
                                        @click="setBetData(main[i+5].nat, main[i+5].b, mId, main[i+5].sid, main[i+5].subtype, 0, 'back', gameType, main[i+5].gstatus, main[i+5].min, main[i+5].max)">
                                        <template v-if="i == 1">
                                            <img :src="`${imgPath}front/img/cards/A.png`">
                                        </template>
                                        <template v-else-if="i == 11">
                                            <img :src="`${imgPath}front/img/cards/J.png`">
                                        </template>
                                        <template v-else-if="i == 12">
                                            <img :src="`${imgPath}front/img/cards/Q.png`">
                                        </template>
                                        <template v-else-if="i == 13">
                                            <img :src="`${imgPath}front/img/cards/K.png`">
                                        </template>
                                        <template v-else>
                                            <img :src="`${imgPath}front/img/cards/${i}.png`">
                                        </template>
                                    </div>
                                    <div class="casino-book" v-casinofancybook="{sid: main[i+5].sid, subid: 0}">0</div>
                                </div>
                            </template>
                        </div>
                    </div>

                    <!-- <div class="text-right casino-min-max">
                        R:<span v-kval="{size: main[6].min}"></span>-<span v-kval="{size: main[6].max}"></span>
                    </div> -->

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
                            :class="[{'andar-border': $store.state.casinoBet.betType.toLowerCase() == 'andar'}, {'bahar-border': $store.state.casinoBet.betType.toLowerCase() == 'bahar'}]"
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

            $("#andarSlider, #baharSlider, #andarSliderMob, #baharSliderMob").owlCarousel({
                rtl: true,
                loop: false,
                margin: 2,
                slideBy: 3,
                nav: true,
                responsiveClass: true,
                dots: false,
                autoWidth: true,
                responsive: {
                    0: {
                        items: 3,
                        nav: true
                    },
                    320: {
                        items: 3,
                        nav: true
                    },
                    768: {
                        items: 4,
                        nav: true
                    }
                }
            });
        },
        created() {

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
                    'subtype': 'abj'
                })
                return this.orderBy(player, 'sr')
            }
        },
        data() {
            return {
                showCards: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'abj',
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
                andarAllSlider: [],
                baharAllSlider: [],
                andarAllLength: '',
                baharAllLength: '',
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

            toggleCards() {
                if (this.cards.length > 0 && this.cards[0] != 1) {
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

                            this.andarAllSlider = []
                            this.baharAllSlider = []

                            this.cards.forEach((card, index) => {
                                if (card == 1) {
                                    return
                                }
                                if (index > 2) {
                                    if (index % 2 != 0) {
                                        this.baharAllSlider.push(card)
                                    } else {
                                        this.andarAllSlider.push(card)
                                    }
                                }
                            });

                            let andarAllSliderHtml = ""
                            if (this.andarAllSlider.length > 0) {
                                this.andarAllSlider.reverse().forEach(card => {
                                    let cardPath = `${this.imgPath}front/img/cards/${card}.png`
                                    andarAllSliderHtml +=
                                        `<div class="item"><span><img src="${cardPath}"></span></div>`
                                });

                                // console.log('andar ',this.andarAllLength,this.andarAllSlider.length)

                                if (this.andarAllLength != this.andarAllSlider.length) {
                                    // console.log('a here')
                                    $("#andarSlider")
                                        .trigger("replace.owl.carousel", andarAllSliderHtml)
                                        .trigger("refresh.owl.carousel");
                                    $("#andarSliderMob")
                                        .trigger("replace.owl.carousel", andarAllSliderHtml)
                                        .trigger("refresh.owl.carousel");
                                }
                                this.andarAllLength = this.andarAllSlider.length
                            } else {
                                $("#andarSlider")
                                    .trigger("replace.owl.carousel", '<div/>')
                                    .trigger("refresh.owl.carousel");
                                $("#andarSliderMob")
                                    .trigger("replace.owl.carousel", '<div/>')
                                    .trigger("refresh.owl.carousel");
                                this.andarAllLength = ''
                            }

                            let baharAllSliderHtml = ""
                            if (this.baharAllSlider.length > 0) {
                                this.baharAllSlider.reverse().forEach(card => {
                                    let cardPath = `${this.imgPath}front/img/cards/${card}.png`
                                    baharAllSliderHtml +=
                                        `<div class="item"><span><img src="${cardPath}"></span></div>`
                                });

                                // console.log('bahar ',this.baharAllLength, this.baharAllSlider.length)

                                if (this.baharAllLength != this.baharAllSlider.length) {
                                    // console.log('b here')
                                    $("#baharSlider")
                                        .trigger("replace.owl.carousel", baharAllSliderHtml)
                                        .trigger("refresh.owl.carousel");
                                    $("#baharSliderMob")
                                        .trigger("replace.owl.carousel", baharAllSliderHtml)
                                        .trigger("refresh.owl.carousel");
                                }
                                this.baharAllLength = this.baharAllSlider.length
                            } else {
                                $("#baharSlider")
                                    .trigger("replace.owl.carousel", '<div/>')
                                    .trigger("refresh.owl.carousel");
                                $("#baharSliderMob")
                                    .trigger("replace.owl.carousel", '<div/>')
                                    .trigger("refresh.owl.carousel");
                                this.baharAllLength = ''
                            }

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
            sortNumberString(inputval) {
                var str = new Set();
                inputval.forEach(function (value) {
                    if (value == 1) {
                        str.add("A")
                    } else if (value == 11) {
                        str.add("J")
                    } else if (value == 12) {
                        str.add("Q")
                    } else if (value == 13) {
                        str.add("K")
                    } else {
                        str.add(value)
                    }
                });
                return Array.from(str).join("")
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