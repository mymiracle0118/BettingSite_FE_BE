<template>
    <div>
        <div class="casino-container">
            <!-- Casino Content -->
            <template v-if="!$store.getters.isTablet">
                <TimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current" />
            </template>
            <div class="casino-table lottery">
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
                        <div class="casino-video-cards d-none-desktop">
                            <div class="casino-video-cards-container">
                                <div>
                                    <Card :card="cards[0]" :lotteryCard="true" />
                                    <Card :card="cards[1]" :lotteryCard="true" />
                                    <Card :card="cards[2]" :lotteryCard="true" />
                                </div>
                            </div>
                        </div>
                    </template>
                    <div class="casino-timer d-none-small">
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
                        <div class="casino-video-rules-icon" v-b-modal.rules-modal title="Rules">
                            <i class="fas fa-info-circle"></i>
                        </div>
                        <b-modal id="rules-modal" size="lg" modal-class="casino-rules lottery-rules" title="Rules"
                            hide-footer>
                            <div class="casino-tabs">
                                <ul class="nav nav-tabs">
                                    <li class="nav-item">
                                        <a href="#rules" class="nav-link active" data-toggle="tab">Rules</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="#payout" class="nav-link" data-toggle="tab">Payout</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-content ">
                                <div id="rules" class="tab-pane active">
                                    <div class="lottery-rules-box">
                                        <div class="lottery-rules-row">
                                            <div class="lottery-rules-title-name">
                                                <div>Single</div>
                                                <div>Singles play can be placed between 0-9</div>
                                            </div>

                                            <div class="lottery-rules-cards d-none-big">
                                                <div class="w-100 d-flex justify-content-center">
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/ADD.png`">
                                                        <div>1</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/2DD.png`">
                                                        <div>2</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/3DD.png`">
                                                        <div>3</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/4DD.png`">
                                                        <div>4</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/5DD.png`">
                                                        <div>5</div>
                                                    </div>
                                                </div>
                                                <div class="w-100 d-flex justify-content-center">
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/6DD.png`">
                                                        <div>6</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/7DD.png`">
                                                        <div>7</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/8DD.png`">
                                                        <div>8</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/9DD.png`">
                                                        <div>9</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/10DD.png`">
                                                        <div>0</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="lottery-rules-cards d-none-small">
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/ADD.png`">
                                                    <div>1</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/2DD.png`">
                                                    <div>2</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/3DD.png`">
                                                    <div>3</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/4DD.png`">
                                                    <div>4</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/5DD.png`">
                                                    <div>5</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/6DD.png`">
                                                    <div>6</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/7DD.png`">
                                                    <div>7</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/8DD.png`">
                                                    <div>8</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/9DD.png`">
                                                    <div>9</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/10DD.png`">
                                                    <div>0</div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="lottery-rules-row">
                                            <div class="lottery-rules-title-name">
                                                <div>Double</div>
                                                <div>Doubles play can be placed between 00-99</div>
                                            </div>
                                            <div class="lottery-rules-cards d-none-big">
                                                <div class="w-100 d-flex justify-content-center">
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/ADD.png`">
                                                        <div>1</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/2DD.png`">
                                                        <div>2</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/3DD.png`">
                                                        <div>3</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/4DD.png`">
                                                        <div>4</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/5DD.png`">
                                                        <div>5</div>
                                                    </div>
                                                </div>
                                                <div class="w-100 d-flex justify-content-center">
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/6DD.png`">
                                                        <div>6</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/7DD.png`">
                                                        <div>7</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/8DD.png`">
                                                        <div>8</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/9DD.png`">
                                                        <div>9</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/10DD.png`">
                                                        <div>0</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="lottery-rules-cards d-none-small">
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/ADD.png`">
                                                    <div>1</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/2DD.png`">
                                                    <div>2</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/3DD.png`">
                                                    <div>3</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/4DD.png`">
                                                    <div>4</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/5DD.png`">
                                                    <div>5</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/6DD.png`">
                                                    <div>6</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/7DD.png`">
                                                    <div>7</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/8DD.png`">
                                                    <div>8</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/9DD.png`">
                                                    <div>9</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/10DD.png`">
                                                    <div>0</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="lottery-rules-row">
                                            <div class="lottery-rules-title-name">
                                                <div>Triple</div>
                                                <div>Triples play can be placed between 000-999</div>
                                            </div>
                                            <div class="lottery-rules-cards d-none-big">
                                                <div class="w-100 d-flex justify-content-center">
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/ADD.png`">
                                                        <div>1</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/2DD.png`">
                                                        <div>2</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/3DD.png`">
                                                        <div>3</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/4DD.png`">
                                                        <div>4</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/5DD.png`">
                                                        <div>5</div>
                                                    </div>
                                                </div>
                                                <div class="w-100 d-flex justify-content-center">
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/6DD.png`">
                                                        <div>6</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/7DD.png`">
                                                        <div>7</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/8DD.png`">
                                                        <div>8</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/9DD.png`">
                                                        <div>9</div>
                                                    </div>
                                                    <div class="lottery-card">
                                                        <img :src="`${imgPath}front/img/lottery/cards/10DD.png`">
                                                        <div>0</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="lottery-rules-cards d-none-small">
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/ADD.png`">
                                                    <div>1</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/2DD.png`">
                                                    <div>2</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/3DD.png`">
                                                    <div>3</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/4DD.png`">
                                                    <div>4</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/5DD.png`">
                                                    <div>5</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/6DD.png`">
                                                    <div>6</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/7DD.png`">
                                                    <div>7</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/8DD.png`">
                                                    <div>8</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/9DD.png`">
                                                    <div>9</div>
                                                </div>
                                                <div class="lottery-card">
                                                    <img :src="`${imgPath}front/img/lottery/cards/10DD.png`">
                                                    <div>0</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="payout" class="tab-pane fade">
                                    <div class="table-responsive">
                                        <h4>Game Play Payout</h4>
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>Point</th>
                                                    <th>Card</th>
                                                    <th>Payout</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Play Single</td>
                                                    <td>First Card</td>
                                                    <td>1 to {{ rates.single }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Play Double</td>
                                                    <td>First Second Card</td>
                                                    <td>1 to {{ rates.double }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Play Tripple</td>
                                                    <td>First Second Third Card</td>
                                                    <td>1 to {{ rates.triple }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="table-responsive mt-3" v-if="main && main.length">
                                        <h4>Play Limit</h4>
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>Play</th>
                                                    <th>Minimum Play</th>
                                                    <th>Maximum Play</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Singles Play</td>
                                                    <td>{{ main[0].min }}</td>
                                                    <td>{{ main[0].max }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Doubles Play</td>
                                                    <td>{{ main[1].min }}</td>
                                                    <td>{{ main[1].max }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Tripples Play</td>
                                                    <td>{{ main[2].min }}</td>
                                                    <td>{{ main[2].max }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </b-modal>
                    </div>
                </div>

                <div class="casino-detail" v-if="casinoData && casinoData.mid">
                    <template v-if="$store.getters.isTablet">
                        <div class="lottery-left d-none-small">
                            <div class="lottery-bet-buttons">

                                <template v-if="$store.state.buttonList && $store.state.buttonList.length">
                                    <template v-for="(i, key) in 6">
                                        <div :key="key"
                                            :class="{'active' : $store.state.lottery.btnVal == $store.state.buttonList[key].bval}"
                                            @click="changeButtonValue($store.state.buttonList[key].bval)">
                                            <span>{{ $store.state.buttonList[key].btxt }}</span>
                                        </div>
                                    </template>
                                </template>

                            </div>
                        </div>
                    </template>

                    <div class="lottery-right">
                        <div class="casino-tabs">
                            <ul class="nav nav-tabs">
                                <li class="nav-item">
                                    <a href="#single" class="nav-link active" data-toggle="tab"
                                        @click="resetTab(0)">Single({{ singleBetCount }})
                                        <div class="casino-min-max w-100">
                                            R:<span v-kval="{size: main[0].min}"></span>-<span
                                                v-kval="{size: main[0].max}"></span>
                                        </div>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#double" class="nav-link" data-toggle="tab"
                                        @click="resetTab(0)">Double({{ doubleBetCount}})
                                        <div class="casino-min-max w-100">
                                            R:<span v-kval="{size: main[1].min}"></span>-<span
                                                v-kval="{size: main[1].max}"></span>
                                        </div>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#triple" class="nav-link" data-toggle="tab"
                                        @click="resetTab(0)">Triple({{ tripleBetCount }})
                                        <div class="casino-min-max w-100">
                                            R:<span v-kval="{size: main[2].min}"></span>-<span
                                                v-kval="{size: main[2].max}"></span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="tab-content">
                            <div id="single" class="tab-pane active ">
                                <div class="single">
                                    <div class="lottery-box"
                                        :class="[{'suspended': main[0].gstatus != 'OPEN'}, {'loader-section-parent':loadingPlacebet}]">
                                        <Loader :isVisible="loadingPlacebet"></Loader>
                                        <div class="lottery-card" @click="setBetData('single', 1)">
                                            <img :src="`${imgPath}front/img/lottery/cards/A.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('single', 2)">
                                            <img :src="`${imgPath}front/img/lottery/cards/2.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('single', 3)">
                                            <img :src="`${imgPath}front/img/lottery/cards/3.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('single', 4)">
                                            <img :src="`${imgPath}front/img/lottery/cards/4.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('single', 5)">
                                            <img :src="`${imgPath}front/img/lottery/cards/5.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('single', 6)">
                                            <img :src="`${imgPath}front/img/lottery/cards/6.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('single', 7)">
                                            <img :src="`${imgPath}front/img/lottery/cards/7.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('single', 8)">
                                            <img :src="`${imgPath}front/img/lottery/cards/8.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('single', 9)">
                                            <img :src="`${imgPath}front/img/lottery/cards/9.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('single', 0)">
                                            <img :src="`${imgPath}front/img/lottery/cards/10.png`">
                                        </div>
                                    </div>
                                    <div class="lottery-place-balls"
                                        v-if="$store.state.casinoBet && $store.state.casinoBet.betStatus">
                                        <img
                                            :src="`${imgPath}front/img/lottery/balls/ball${$store.state.casinoBet.nation}.png`">
                                    </div>
                                </div>
                            </div>
                            <div id="double" class="tab-pane fade">
                                <div class="double">
                                    <div class="lottery-box"
                                        :class="[{'suspended': main[1].gstatus != 'OPEN'}, {'loader-section-parent':loadingPlacebet}]">
                                        <Loader :isVisible="loadingPlacebet"></Loader>
                                        <div class="lottery-card" @click="setBetData('double', 1)">
                                            <img :src="`${imgPath}front/img/lottery/cards/A.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('double', 2)">
                                            <img :src="`${imgPath}front/img/lottery/cards/2.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('double', 3)">
                                            <img :src="`${imgPath}front/img/lottery/cards/3.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('double', 4)">
                                            <img :src="`${imgPath}front/img/lottery/cards/4.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('double', 5)">
                                            <img :src="`${imgPath}front/img/lottery/cards/5.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('double', 6)">
                                            <img :src="`${imgPath}front/img/lottery/cards/6.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('double', 7)">
                                            <img :src="`${imgPath}front/img/lottery/cards/7.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('double', 8)">
                                            <img :src="`${imgPath}front/img/lottery/cards/8.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('double', 9)">
                                            <img :src="`${imgPath}front/img/lottery/cards/9.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('double', 0)">
                                            <img :src="`${imgPath}front/img/lottery/cards/10.png`">
                                        </div>
                                    </div>
                                    <div class="lottery-place-balls">
                                        <div
                                            v-if="$store.state.lottery.double.selected && $store.state.lottery.double.selected.length">
                                            <template v-for="(ball, key) in $store.state.lottery.double.selected">
                                                <img :src="`${imgPath}front/img/lottery/balls/ball${ball}.png`"
                                                    :key="key">
                                            </template>
                                            <button class="lottery-btn active p-2" @click="resetTab(0)">Clear</button>
                                        </div>

                                        <div class="random-bets" :class="{'suspended': main[1].gstatus != 'OPEN'}">
                                            <h4 class="w-100 text-center">Random Bets</h4>
                                            <button class="lottery-btn active" @click="autoBetDouble(5)">5</button>
                                            <button class="lottery-btn active" @click="autoBetDouble(10)">10</button>
                                            <button class="lottery-btn active" @click="autoBetDouble(15)">15</button>
                                            <button class="lottery-btn active" @click="autoBetDouble(20)">20</button>
                                            <button class="lottery-btn active" @click="autoBetDouble(25)">25</button>
                                            <button class="lottery-btn active" @click="autoBetDouble(50)">50</button>
                                            <button class="lottery-btn active" @click="autoBetDouble(75)">75</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="triple" class="tab-pane fade">
                                <div class="tripple">
                                    <div class="lottery-box"
                                        :class="[{'suspended': main[2].gstatus != 'OPEN'}, {'loader-section-parent':loadingPlacebet}]">
                                        <Loader :isVisible="loadingPlacebet"></Loader>
                                        <div class="lottery-card" @click="setBetData('triple', 1)">
                                            <img :src="`${imgPath}front/img/lottery/cards/A.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('triple', 2)">
                                            <img :src="`${imgPath}front/img/lottery/cards/2.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('triple', 3)">
                                            <img :src="`${imgPath}front/img/lottery/cards/3.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('triple', 4)">
                                            <img :src="`${imgPath}front/img/lottery/cards/4.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('triple', 5)">
                                            <img :src="`${imgPath}front/img/lottery/cards/5.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('triple', 6)">
                                            <img :src="`${imgPath}front/img/lottery/cards/6.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('triple', 7)">
                                            <img :src="`${imgPath}front/img/lottery/cards/7.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('triple', 8)">
                                            <img :src="`${imgPath}front/img/lottery/cards/8.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('triple', 9)">
                                            <img :src="`${imgPath}front/img/lottery/cards/9.png`">
                                        </div>
                                        <div class="lottery-card" @click="setBetData('triple', 0)">
                                            <img :src="`${imgPath}front/img/lottery/cards/10.png`">
                                        </div>
                                    </div>
                                    <div class="lottery-place-balls">
                                        <div
                                            v-if="$store.state.lottery.triple.selected && $store.state.lottery.triple.selected.length">
                                            <template v-for="(ball, key) in $store.state.lottery.triple.selected">
                                                <img :src="`${imgPath}front/img/lottery/balls/ball${ball}.png`"
                                                    :key="key">
                                            </template>
                                            <button class="lottery-btn active p-2" @click="resetTab(0)">Clear</button>
                                        </div>

                                        <div class="random-bets" :class="{'suspended': main[2].gstatus != 'OPEN'}">
                                            <h4 class="w-100 text-center">Random Bets</h4>
                                            <button class="lottery-btn active" @click="autoBetTriple(5)">5</button>
                                            <button class="lottery-btn active" @click="autoBetTriple(10)">10</button>
                                            <button class="lottery-btn active" @click="autoBetTriple(15)">15</button>
                                            <button class="lottery-btn active" @click="autoBetTriple(20)">20</button>
                                            <button class="lottery-btn active" @click="autoBetTriple(25)">25</button>
                                            <button class="lottery-btn active" @click="autoBetTriple(50)">50</button>
                                            <button class="lottery-btn active" @click="autoBetTriple(100)">100</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <template v-if="!$store.getters.isTablet">
                        <div class="lottery-left d-none-big">
                            <div class="lottery-bet-buttons">

                                <template v-if="$store.state.buttonList && $store.state.buttonList.length">
                                    <template v-for="(i, key) in 6">
                                        <div :key="key"
                                            :class="{'active' : $store.state.lottery.btnVal == $store.state.buttonList[key].bval}"
                                            @click="changeButtonValue($store.state.buttonList[key].bval)">
                                            <span>{{ $store.state.buttonList[key].btxt }}</span>
                                        </div>
                                    </template>
                                </template>

                            </div>
                        </div>
                    </template>

                    <template v-if="!$store.getters.isTablet">
                        <div class="lottery-buttons d-none-big w-100 mb-3">
                            <div class="lottery-buttons-top">
                                <button class="lottery-btn active" @click="repeatPlacebet()">Repeat</button>
                                <button class="lottery-btn active" @click="deletePlacebet('all')">Clear</button>
                                <button class="lottery-btn active" @click="deletePlacebet('last')">Remove</button>
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
                        <div class="lottery-last-result d-none-desktop w-100">
                            <div class="lottery-last-result-title">
                                <div>Last Results</div>
                            </div>
                            <template v-for="(data, key) in lastResults">
                                <div class="lottery-result-group" :key="key" @click="showResult(data.mid)">
                                    <div class="lottery-result-icon">{{ data.win.split('  ')[0] }}</div>
                                    <div class="lottery-result-icon">{{ data.win.split('  ')[1] }}</div>
                                    <div class="lottery-result-icon">{{ data.win.split('  ')[2] }}</div>
                                </div>
                            </template>
                        </div>
                    </template>

                </div>
                <!-- CASINO Rules Start -->
                <!-- <template v-if="!$store.getters.isTablet">
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
                </template> -->
                <!-- CASINO Rules End -->

            </div>

            <b-modal id="betCasinoSodaModal" hide-footer title="MY BETS" modal-class="mybetsmodal">
                <div class="casino-my-bet" v-if="$store.state.casinoBetSoda">
                    <div class="lottery-my-bets">
                        <template v-for="(data, key) in $store.state.casinoBetSoda">
                            <div class="lottery-my-bet-box" :key="key">
                                <div>
                                    <span style="text-transform: capitalize;">{{ data.nat.split('-')[0] }}</span>
                                    <span> - </span>
                                    <span>{{ data.nat.split('-')[1] }}</span>
                                </div>
                                <div>{{ data.amt }}</div>
                            </div>
                        </template>
                    </div>
                </div>
            </b-modal>

            <b-modal ref="detail-modal" modal-class="casino-result" hide-footer size="lg" title="Details">
                <!-- CASINO -->
                <CasinoResult :resultData="gameDetail" />
                <AccountStatementSoda :gameSoda="gameSoda" />
            </b-modal>

            <div class="market-show-icon d-none-desktop" v-if="$store.getters.betCasinoSodaTotal"
                v-b-modal.betCasinoSodaModal>
                <span>{{ $store.getters.betCasinoSodaTotal }}</span>
            </div>
        </div>

        <div class="right-sidebar casino-right-sidebar lottery-sidebar">
            <div class="lottery-cards">
                <template v-if="cards && cards.length">
                    <Card :card="cards[0]" :lotteryCard="true" />
                    <Card :card="cards[1]" :lotteryCard="true" />
                    <Card :card="cards[2]" :lotteryCard="true" />
                </template>
            </div>

            <div class="lottery-last-result">
                <div class="lottery-last-result-title">
                    <div>Last Results</div>
                </div>
                <template v-for="(data, key) in lastResults">
                    <div class="lottery-result-group" :key="key" @click="showResult(data.mid)">
                        <div class="lottery-result-icon">{{ data.win.split('  ')[0] }}</div>
                        <div class="lottery-result-icon">{{ data.win.split('  ')[1] }}</div>
                        <div class="lottery-result-icon">{{ data.win.split('  ')[2] }}</div>
                    </div>
                </template>
            </div>

            <div class="lottery-buttons">
                <div class="lottery-buttons-top">
                    <button class="lottery-btn active" @click="repeatPlacebet()">Repeat</button>
                    <button class="lottery-btn active" @click="deletePlacebet('all')">Clear</button>
                    <button class="lottery-btn active" @click="deletePlacebet('last')">Remove</button>
                </div>
            </div>

            <div class="casino-my-bet" v-if="$store.state.casinoBetSoda">
                <div class="casino-place-bet-title">
                    <div>My Bets</div>
                </div>
                <div class="lottery-my-bets">
                    <template v-for="(data, key) in $store.state.casinoBetSoda">
                        <div class="lottery-my-bet-box" :key="key">
                            <div>
                                <span style="text-transform: capitalize;">{{ data.nat.split('-')[0] }}</span>
                                <span> - </span>
                                <span>{{ data.nat.split('-')[1] }}</span>
                            </div>
                            <div>{{ data.amt }}</div>
                        </div>
                    </template>
                </div>
            </div>
        </div>

        <!-- <b-modal ref="tvModal" centered modal-class="disconnected-box" no-close-on-backdrop hide-footer hide-header>
            <InactivityModal />
        </b-modal> -->
    </div>
</template>

<script>
    import ServiceApi from "@/services/ServiceApi";
    import Timer from "@/components/casino/BaseTimer"
    import TimerProgress from "@/components/casino/TimerProgress"
    import CasinoResult from '@/components/casino/results/CasinoResults'
    import Card from '@/components/casino/Card'
    import AccountStatementSoda from '@/components/AccountStatementSoda'
    import Loader from '@/components/loader'
    import InactivityModal from '@/components/casino/InactivityModal'
    var PlacebetTimer;

    export default {
        mounted() {
            this.reconnectTv()
            this.getButtonListCs()
            this.getCasinoData()
            this.getLastResults()
        },
        components: {
            Timer,
            TimerProgress,
            CasinoResult,
            Card,
            AccountStatementSoda,
            Loader,
            InactivityModal
        },
        computed: {
            main() {
                var player = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'lottcard'
                })
                return this.orderBy(player, 'sr')
            },
            singleBetCount() {
                var count = 0
                if (this.$store.state.casinoBetSoda && this.$store.state.casinoBetSoda.length) {
                    this.$store.state.casinoBetSoda.forEach(bet => {
                        var nat = bet.nat.split('-')[0]
                        if (nat.toLowerCase() == 'single') {
                            count++
                        }
                    });
                }
                return count
            },
            doubleBetCount() {
                var count = 0
                if (this.$store.state.casinoBetSoda && this.$store.state.casinoBetSoda.length) {
                    this.$store.state.casinoBetSoda.forEach(bet => {
                        var nat = bet.nat.split('-')[0]
                        if (nat.toLowerCase() == 'double') {
                            count++
                        }
                    });
                }
                return count
            },
            tripleBetCount() {
                var count = 0
                if (this.$store.state.casinoBetSoda && this.$store.state.casinoBetSoda.length) {
                    this.$store.state.casinoBetSoda.forEach(bet => {
                        var nat = bet.nat.split('-')[0]
                        if (nat.toLowerCase() == 'triple') {
                            count++
                        }
                    });
                }
                return count
            },
        },
        data() {
            return {
                rates: {
                    single: '',
                    double: '',
                    triple: ''
                },
                showCards: true,
                showResults: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'lottcard',
                casinoData: [],
                gameDetail: [],
                gameSoda: [],
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
                exp: '',
                loading: false,
                tvUrl: '',
                firstCall: true
            }
        },
        methods: {
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

            getButtonListCs() {
                ServiceApi.callApi("api/front/buttonlistcs")
                    .then(response => {
                        if (response.status == 200) {
                            this.$store.state.buttonList = response.data.t1
                            this.$store.state.autocon = response.data.autocon
                            this.$store.state.lottery.btnVal = this.$store.state.buttonList[0].bval
                        }
                    })
                    .catch(e => {
                        this.$store.state.buttonList = []
                    });
            },
            changeButtonValue(val) {
                this.$store.state.lottery.btnVal = val
            },
            autoBetDouble(count) {
                if (this.main[1].gstatus != 'OPEN') {
                    return;
                }
                this.resetTab(0)

                var total = Number(count);
                var currentRoundBets = "";
                var currentRoundBetsArr = [];
                var i = 0;
                while (i < total) {
                    var random = Math.round(Math.random() * 99);

                    var numStr = ((random <= 9) ? "0" : "") + random.toString();

                    if (!currentRoundBetsArr.includes(numStr)) {
                        currentRoundBetsArr.push(numStr);
                        if (i == 0) {
                            currentRoundBets += numStr;
                        } else {
                            currentRoundBets += "," + numStr;
                        }
                        i++;
                    }

                }
                // console.log(currentRoundBets);

                let betdata = {}

                betdata.marketId = this.mId
                betdata.subId = 0
                betdata.amount = this.$store.state.lottery.btnVal
                betdata.betType = 'back'
                betdata.gameType = this.gameType
                betdata.subType = this.main[1].subtype
                betdata.sectionId = this.main[1].sid
                betdata.ucard = currentRoundBets
                betdata.uRate = this.main[1].b

                betdata.nation = '';
                // console.log(betdata)
                this.$store.commit('setCasinoBetData', betdata)

                if (this.main[1].gstatus == 'OPEN') {
                    this.placebetCasino()
                }

            },
            autoBetTriple(count) {
                if (this.main[2].gstatus != 'OPEN') {
                    return;
                }
                this.resetTab(0)

                var total = Number(count);
                var currentRoundBets = "";
                var currentRoundBetsArr = [];
                var i = 0;
                while (i < total) {

                    var random = Math.round(Math.random() * 999);

                    var numStr = ((random <= 9) ? "00" : ((random <= 99) ? "0" : "")) + random.toString();
                    if (!currentRoundBetsArr.includes(numStr)) {
                        currentRoundBetsArr.push(numStr);
                        if (i == 0) {
                            currentRoundBets += numStr;
                        } else {
                            currentRoundBets += "," + numStr;
                        }
                        i++;
                    }

                }
                // console.log(currentRoundBets);

                let betdata = {}

                betdata.marketId = this.mId
                betdata.subId = 0
                betdata.amount = this.$store.state.lottery.btnVal
                betdata.betType = 'back'
                betdata.gameType = this.gameType
                betdata.subType = this.main[2].subtype
                betdata.sectionId = this.main[2].sid
                betdata.ucard = currentRoundBets
                betdata.uRate = this.main[2].b

                betdata.nation = '';
                // console.log(betdata)
                this.$store.commit('setCasinoBetData', betdata)

                if (this.main[2].gstatus == 'OPEN') {
                    this.placebetCasino()
                }
            },
            resetTab(time) {
                const self = this
                setTimeout(() => {
                    self.$store.state.lottery.single.selected = [];
                    self.$store.state.lottery.double.selected = [];
                    self.$store.state.lottery.triple.selected = [];
                    self.$store.commit('resetCasinoBetData')
                }, time);
            },
            showResult(mid) {
                if (this.loading)
                    return
                this.loading = true
                // console.log(gmid, mid, gtype, dtype, popup)
                ServiceApi.callApi("api/front/accstatepopup", {
                        'gmid': 0,
                        'mid': mid,
                        'gtype': this.gameType,
                        'dtype': 'cs'
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.gameDetail = _.get(response.data, 't1') ? _.get(response.data, 't1') : {}
                            Vue.set(this.gameDetail, 'gType', this.gameType)
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
            // getCasinoRules() {
            //     this.$store.state.casinoRules = null
            //     ServiceApi.callApi("api/front/casino/rules", {
            //             'type': this.gameType,
            //         })
            //         .then(response => {
            //             if (response.status == 200) {
            //                 this.$store.state.casinoRules = response.data
            //             } else {
            //                 this.$store.state.casinoRules = null
            //             }
            //         })
            //         .catch(e => {
            //             this.$store.state.casinoRules = null
            //         });
            // },
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

                            if (this.main && this.main.length) {
                                this.main.forEach((data, key) => {
                                    if (data.gstatus == 'OPEN') {
                                        if (key == 0)
                                            this.rates.single = data.b
                                        else if (key == 1)
                                            this.rates.double = data.b
                                        else if (key == 2)
                                            this.rates.triple = data.b
                                    }
                                });
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
                            this.lastResults = response.data.res
                            this.gameTitle = response.data.res1.cname
                        } else {
                            this.lastResults = []
                        }
                    })
                    .catch(e => {
                        this.lastResults = []
                    });

            },
            setBetData(tabType, btnNo) {

                let betdata = {}

                betdata.marketId = this.mId
                betdata.subId = 0
                betdata.amount = this.$store.state.lottery.btnVal
                betdata.betType = 'back'
                betdata.gameType = this.gameType
                betdata.betStatus = false

                if (tabType == 'single') {
                    if (this.main[0].gstatus != 'OPEN') {
                        return;
                    }

                    betdata.subType = this.main[0].subtype
                    betdata.sectionId = this.main[0].sid
                    betdata.ucard = btnNo.toString()
                    betdata.uRate = this.main[0].b

                    betdata.nation = btnNo;
                    betdata.betStatus = true
                    // console.log(betdata)
                    this.$store.commit('setCasinoBetData', betdata)

                    if (this.main[0].gstatus == 'OPEN') {
                        this.placebetCasino()
                    }
                } else if (tabType == 'double') {
                    if (this.main[1].gstatus != 'OPEN') {
                        return;
                    }

                    if (this.$store.state.lottery.double.selected.length < 2) {
                        this.$store.state.lottery.double.selected.push(btnNo)
                        if (this.$store.state.lottery.double.selected.length == 2) {
                            betdata.subType = this.main[1].subtype
                            betdata.sectionId = this.main[1].sid
                            betdata.ucard = this.$store.state.lottery.double.selected.join('')
                            betdata.uRate = this.main[1].b

                            betdata.nation = btnNo;
                            betdata.betStatus = true
                            // console.log(betdata)
                            this.$store.commit('setCasinoBetData', betdata)

                            if (this.main[1].gstatus == 'OPEN') {
                                this.placebetCasino()
                            }
                        }
                        // console.log(this.$store.state.lottery.double.selected)
                    } else {
                        return
                    }
                } else if (tabType == 'triple') {
                    if (this.main[2].gstatus != 'OPEN') {
                        return;
                    }

                    if (this.$store.state.lottery.triple.selected.length < 3) {
                        this.$store.state.lottery.triple.selected.push(btnNo)
                        if (this.$store.state.lottery.triple.selected.length == 3) {
                            betdata.subType = this.main[2].subtype
                            betdata.sectionId = this.main[2].sid
                            betdata.ucard = this.$store.state.lottery.triple.selected.join('')
                            betdata.uRate = this.main[2].b

                            betdata.nation = btnNo;
                            betdata.betStatus = true
                            // console.log(betdata)
                            this.$store.commit('setCasinoBetData', betdata)

                            if (this.main[2].gstatus == 'OPEN') {
                                this.placebetCasino()
                            }
                        }
                        // console.log(this.$store.state.lottery.triple.selected)
                    } else {
                        return
                    }
                }

            },
            placebetCasino() {
                if (this.loadingPlacebet)
                    return
                this.loadingPlacebet = true
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
                        this.getUserBook(true)
                        this.resetTab(1500)
                        this.resetPlacebetInterval()
                        this.loadingPlacebet = false
                        // console.log(data)
                    });
            },
            repeatPlacebet() {
                if (this.loading)
                    return
                if (this.main[0].gstatus != 'OPEN') {
                    return;
                }
                this.loading = true
                var betdata = {
                    mid: this.mId,
                    gtype: this.gameType
                }
                ServiceApi.callApi("api/front/repeatplacebet", betdata)
                    .then(response => {
                        if (response.success) {
                            this.$bvToast.toast('Bet repeated successfully !', {
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
                        this.loading = false
                        this.getUserBook(true)
                        this.resetPlacebetInterval()
                    })
            },
            deletePlacebet(type) {
                if (this.loading)
                    return
                if (this.main[0].gstatus != 'OPEN') {
                    return;
                }
                this.loading = true
                var betdata = {
                    mid: this.mId,
                    gtype: this.gameType,
                    type: type
                }
                ServiceApi.callApi("api/front/deleteplacebet", betdata)
                    .then(response => {
                        if (response.success) {
                            this.$bvToast.toast(type == 'all' ? 'Bets clear successfully !' :
                                'Bet remove successfully !', {
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
                        this.loading = false
                        this.getUserBook(true)
                        this.resetPlacebetInterval()
                    })
            }
        },
        beforeDestroy() {
            this.callBookApi = false
            this.callDataApi = false
            this.resetTab(0)
            this.$store.state.casinoRules = null
            this.$store.state.casinoBetSoda = null;
            this.$store.state.casinobetBook = null;
            this.$store.state.casinoFancybetBook = null;
            this.$store.state.placebetInterval = 0
            this.$store.state.casinoGameType = ""
            clearInterval(PlacebetTimer);
        }
    }
</script>