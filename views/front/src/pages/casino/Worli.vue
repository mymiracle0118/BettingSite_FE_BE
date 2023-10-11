<template>
    <div class="casino-container">
        <!-- Casino Content -->
        <template v-if="!$store.getters.isTablet">
            <TimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current" />
        </template>
        <div class="casino-table worli">
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
                                <Card :card="cards[2]" />
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
                </div>
            </div>

            <div class="casino-detail" v-if="casinoData && casinoData.mid">
                <div class="casino-tabs">
                    <ul class="nav nav-tabs">
                        <li class="nav-item" @click="changeTab(main[0].sid)">
                            <a href="#single" class="nav-link active" data-toggle="tab">Single</a>
                        </li>
                        <li class="nav-item" @click="changeTab(main[1].sid)">
                            <a href="#pana" class="nav-link" data-toggle="tab">Pana</a>
                        </li>
                        <li class="nav-item" @click="changeTab(main[2].sid)">
                            <a href="#sp" class="nav-link" data-toggle="tab">SP</a>
                        </li>
                        <li class="nav-item" @click="changeTab(main[3].sid)">
                            <a href="#dp" class="nav-link" data-toggle="tab">DP</a>
                        </li>
                        <li class="nav-item" @click="changeTab(main[4].sid)">
                            <a href="#trio" class="nav-link" data-toggle="tab">Trio</a>
                        </li>
                        <li class="nav-item" @click="changeTab(main[5].sid)">
                            <a href="#cycle" class="nav-link" data-toggle="tab">Cycle</a>
                        </li>
                        <li class="nav-item" @click="changeTab(main[6].sid)">
                            <a href="#motorsp" class="nav-link" data-toggle="tab">Motor SP</a>
                        </li>
                        <li class="nav-item" @click="changeTab(main[7].sid)">
                            <a href="#card56" class="nav-link" data-toggle="tab">56 Charts</a>
                        </li>
                        <li class="nav-item" @click="changeTab(main[8].sid)">
                            <a href="#card64" class="nav-link" data-toggle="tab">64 Charts</a>
                        </li>
                        <li class="nav-item" @click="changeTab(main[9].sid)">
                            <a href="#abr" class="nav-link" data-toggle="tab">ABR</a>
                        </li>
                        <li class="nav-item" @click="changeTab(main[10].sid)">
                            <a href="#commonsp" class="nav-link" data-toggle="tab">Common SP</a>
                        </li>
                        <li class="nav-item" @click="changeTab(main[11].sid)">
                            <a href="#commondp" class="nav-link" data-toggle="tab">Common DP</a>
                        </li>
                        <li class="nav-item" @click="changeTab(main[12].sid)">
                            <a href="#colordp" class="nav-link" data-toggle="tab">Color DP</a>
                        </li>
                    </ul>
                </div>
                <div class="casino-box tab-content">
                    <div id="single" class="tab-pane active single">
                        <div class="worlibox" :class="{'suspended': main[0].gstatus != 'OPEN'}">
                            <!-- <div class="worli-range">
                                R:<span v-kval="{ size: main[0].min }"></span>-<span
                                    v-kval="{ size: main[0].max }"></span>
                            </div> -->
                            <div class="worli-left">
                                <div class="worli-box-title">
                                    <b>{{ $store.state.worlitabdata.single.single }}</b>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('single', 1) }"
                                        @click="setBetData('single', 1)">
                                        <span class="worli-odd">1</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('single', 2) }"
                                        @click="setBetData('single', 2)">
                                        <span class="worli-odd">2</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('single', 3) }"
                                        @click="setBetData('single', 3)">
                                        <span class="worli-odd">3</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('single', 4) }"
                                        @click="setBetData('single', 4)">
                                        <span class="worli-odd">4</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('single', 5) }"
                                        @click="setBetData('single', 5)">
                                        <span class="worli-odd">5</span>
                                    </div>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('single', 6) }"
                                        @click="setBetData('single', 6)">
                                        <span class="worli-odd">6</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('single', 7) }"
                                        @click="setBetData('single', 7)">
                                        <span class="worli-odd">7</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('single', 8) }"
                                        @click="setBetData('single', 8)">
                                        <span class="worli-odd">8</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('single', 9) }"
                                        @click="setBetData('single', 9)">
                                        <span class="worli-odd">9</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('single', 0) }"
                                        @click="setBetData('single', 0)">
                                        <span class="worli-odd">0</span>
                                    </div>
                                </div>
                            </div>
                            <div class="worli-right">
                                <div class="worli-box-title">
                                    <b>{{ $store.state.worlitabdata.single.multi }}</b>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('single', 11) }"
                                        @click="setBetData('single', 11)">
                                        <span class="worli-odd">LINE 1</span>
                                        <span class="d-block">1|2|3|4|5</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('single', 13) }"
                                        @click="setBetData('single', 13)">
                                        <span class="worli-odd">ODD</span>
                                        <span class="d-block">1|3|5|7|9</span>
                                    </div>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('single', 12) }"
                                        @click="setBetData('single', 12)">
                                        <span class="worli-odd">LINE 2</span>
                                        <span class="d-block">6|7|8|9|0</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('single', 14) }"
                                        @click="setBetData('single', 14)">
                                        <span class="worli-odd">EVEN</span>
                                        <span class="d-block">2|4|6|8|0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="pana" class="tab-pane fade pana">
                        <div class="worlibox" :class="{'suspended': main[1].gstatus != 'OPEN'}">
                            <!-- <div class="worli-range">
                                R:<span v-kval="{ size: main[1].min }"></span>-<span
                                    v-kval="{ size: main[1].max }"></span>
                            </div> -->
                            <div class="worli-full">
                                <div class="worli-box-title">
                                    <b>SP:{{ $store.state.worlitabdata.pana.sp }} |
                                        DP:{{ $store.state.worlitabdata.pana.dp }} |
                                        TP:{{ $store.state.worlitabdata.pana.tp }}</b>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('pana', 1) }"
                                        @click="setBetData('pana', 1)">
                                        <span class="worli-odd">1</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('pana', 2) }"
                                        @click="setBetData('pana', 2)">
                                        <span class="worli-odd">2</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('pana', 3) }"
                                        @click="setBetData('pana', 3)">
                                        <span class="worli-odd">3</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('pana', 4) }"
                                        @click="setBetData('pana', 4)">
                                        <span class="worli-odd">4</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('pana', 5) }"
                                        @click="setBetData('pana', 5)">
                                        <span class="worli-odd">5</span>
                                    </div>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('pana', 6) }"
                                        @click="setBetData('pana', 6)">
                                        <span class="worli-odd">6</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('pana', 7) }"
                                        @click="setBetData('pana', 7)">
                                        <span class="worli-odd">7</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('pana', 8) }"
                                        @click="setBetData('pana', 8)">
                                        <span class="worli-odd">8</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('pana', 9) }"
                                        @click="setBetData('pana', 9)">
                                        <span class="worli-odd">9</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('pana', 0) }"
                                        @click="setBetData('pana', 0)">
                                        <span class="worli-odd">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-none-desktop card-clear-box"
                            v-if="$pages.is('casino', $route.name) && $store.state.casinoBet && $store.state.casinoBet != null">
                            <div>
                                <span>{{ $store.state.casinoBet.nation }}</span>
                            </div>
                            <div>
                                <button class="btn btn-danger"
                                    @click="$store.commit('resetCasinoBetData')">Clear</button>
                                <button class="btn btn-success ml-1" v-if="$store.state.casinoBet.betStatus"
                                    v-b-modal="'placebet-modal'" @click="setMobileAmountFocus()">
                                    Place Bet
                                </button>
                                <button class="btn btn-success ml-1" v-else disabled>Place Bet</button>
                            </div>
                        </div>
                    </div>
                    <div id="sp" class="tab-pane fade sp">
                        <div class="worlibox" :class="{'suspended': main[2].gstatus != 'OPEN'}">
                            <!-- <div class="worli-range">
                                R:<span v-kval="{ size: main[2].min }"></span>-<span
                                    v-kval="{ size: main[2].max }"></span>
                            </div> -->
                            <div class="worli-box-title">
                                <b>{{ $store.state.worlitabdata.sp.rate }}</b>
                            </div>
                            <div class="worli-left">
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('sp', 1) }"
                                        @click="setBetData('sp', 1)">
                                        <span class="worli-odd">1</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('sp', 2) }"
                                        @click="setBetData('sp', 2)">
                                        <span class="worli-odd">2</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('sp', 3) }"
                                        @click="setBetData('sp', 3)">
                                        <span class="worli-odd">3</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('sp', 4) }"
                                        @click="setBetData('sp', 4)">
                                        <span class="worli-odd">4</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('sp', 5) }"
                                        @click="setBetData('sp', 5)">
                                        <span class="worli-odd">5</span>
                                    </div>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('sp', 6) }"
                                        @click="setBetData('sp', 6)">
                                        <span class="worli-odd">6</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('sp', 7) }"
                                        @click="setBetData('sp', 7)">
                                        <span class="worli-odd">7</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('sp', 8) }"
                                        @click="setBetData('sp', 8)">
                                        <span class="worli-odd">8</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('sp', 9) }"
                                        @click="setBetData('sp', 9)">
                                        <span class="worli-odd">9</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('sp', 0) }"
                                        @click="setBetData('sp', 0)">
                                        <span class="worli-odd">0</span>
                                    </div>
                                </div>
                            </div>
                            <div class="worli-right">
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('sp', 11) }"
                                        @click="setBetData('sp', 11)">
                                        <span class="worli-odd">SP ALL</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="dp" class="tab-pane fade dp" :class="{'suspended': main[3].gstatus != 'OPEN'}">
                        <div class="worlibox">
                            <!-- <div class="worli-range">
                                R:<span v-kval="{ size: main[3].min }"></span>-<span
                                    v-kval="{ size: main[3].max }"></span>
                            </div> -->
                            <div class="worli-box-title">
                                <b>{{ $store.state.worlitabdata.dp.rate }}</b>
                            </div>
                            <div class="worli-left">
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('dp', 1) }"
                                        @click="setBetData('dp', 1)">
                                        <span class="worli-odd">1</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('dp', 2) }"
                                        @click="setBetData('dp', 2)">
                                        <span class="worli-odd">2</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('dp', 3) }"
                                        @click="setBetData('dp', 3)">
                                        <span class="worli-odd">3</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('dp', 4) }"
                                        @click="setBetData('dp', 4)">
                                        <span class="worli-odd">4</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('dp', 5) }"
                                        @click="setBetData('dp', 5)">
                                        <span class="worli-odd">5</span>
                                    </div>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('dp', 6) }"
                                        @click="setBetData('dp', 6)">
                                        <span class="worli-odd">6</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('dp', 7) }"
                                        @click="setBetData('dp', 7)">
                                        <span class="worli-odd">7</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('dp', 8) }"
                                        @click="setBetData('dp', 8)">
                                        <span class="worli-odd">8</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('dp', 9) }"
                                        @click="setBetData('dp', 9)">
                                        <span class="worli-odd">9</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('dp', 0) }"
                                        @click="setBetData('dp', 0)">
                                        <span class="worli-odd">0</span>
                                    </div>
                                </div>
                            </div>
                            <div class="worli-right">
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('dp', 11) }"
                                        @click="setBetData('dp', 11)">
                                        <span class="worli-odd">DP ALL</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="trio" class="tab-pane fade trio" :class="{'suspended': main[4].gstatus != 'OPEN'}">
                        <div class="worlibox">
                            <!-- <div class="worli-range">
                                R:<span v-kval="{ size: main[4].min }"></span>-<span
                                    v-kval="{ size: main[4].max }"></span>
                            </div> -->
                            <div class="worli-full">
                                <div class="worli-box-title">
                                    <b>{{ $store.state.worlitabdata.trio.rate }}</b>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('trio', 9) }"
                                        @click="setBetData('trio', 9)">
                                        <span class="worli-odd">ALL TRIO</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="cycle" class="tab-pane fade cycle" :class="{'suspended': main[5].gstatus != 'OPEN'}">
                        <div class="worlibox">
                            <!-- <div class="worli-range">
                                R:<span v-kval="{ size: main[5].min }"></span>-<span
                                    v-kval="{ size: main[5].max }"></span>
                            </div> -->
                            <div class="worli-box-title">
                                <b>&nbsp;</b>
                            </div>
                            <div class="worli-full">
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('cycle', 1) }"
                                        @click="setBetData('cycle', 1)">
                                        <span class="worli-odd">1</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('cycle', 2) }"
                                        @click="setBetData('cycle', 2)">
                                        <span class="worli-odd">2</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('cycle', 3) }"
                                        @click="setBetData('cycle', 3)">
                                        <span class="worli-odd">3</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('cycle', 4) }"
                                        @click="setBetData('cycle', 4)">
                                        <span class="worli-odd">4</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('cycle', 5) }"
                                        @click="setBetData('cycle', 5)">
                                        <span class="worli-odd">5</span>
                                    </div>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('cycle', 6) }"
                                        @click="setBetData('cycle', 6)">
                                        <span class="worli-odd">6</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('cycle', 7) }"
                                        @click="setBetData('cycle', 7)">
                                        <span class="worli-odd">7</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('cycle', 8) }"
                                        @click="setBetData('cycle', 8)">
                                        <span class="worli-odd">8</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('cycle', 9) }"
                                        @click="setBetData('cycle', 9)">
                                        <span class="worli-odd">9</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('cycle', 0) }"
                                        @click="setBetData('cycle', 0)">
                                        <span class="worli-odd">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-none-desktop card-clear-box"
                            v-if="$pages.is('casino', $route.name) && $store.state.casinoBet && $store.state.casinoBet != null">
                            <div>
                                <span>{{ $store.state.casinoBet.nation }}</span>
                            </div>
                            <div>
                                <button class="btn btn-danger"
                                    @click="$store.commit('resetCasinoBetData')">Clear</button>
                                <button class="btn btn-success ml-1" v-if="$store.state.casinoBet.betStatus"
                                    v-b-modal="'placebet-modal'" @click="setMobileAmountFocus()">
                                    Place Bet
                                </button>
                                <button class="btn btn-success ml-1" v-else disabled>Place Bet</button>
                            </div>
                        </div>
                    </div>
                    <div id="motorsp" class="tab-pane fade motorsp">
                        <div class="worlibox" :class="{'suspended': main[6].gstatus != 'OPEN'}">
                            <!-- <div class="worli-range">
                                R:<span v-kval="{ size: main[6].min }"></span>-<span
                                    v-kval="{ size: main[6].max }"></span>
                            </div> -->
                            <div class="worli-full">
                                <div class="worli-box-title">
                                    <b>{{ $store.state.worlitabdata.motor.rate }}</b>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('motor', 1) }"
                                        @click="setBetData('motor', 1)">
                                        <span class="worli-odd">1</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('motor', 2) }"
                                        @click="setBetData('motor', 2)">
                                        <span class="worli-odd">2</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('motor', 3) }"
                                        @click="setBetData('motor', 3)">
                                        <span class="worli-odd">3</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('motor', 4) }"
                                        @click="setBetData('motor', 4)">
                                        <span class="worli-odd">4</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('motor', 5) }"
                                        @click="setBetData('motor', 5)">
                                        <span class="worli-odd">5</span>
                                    </div>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('motor', 6) }"
                                        @click="setBetData('motor', 6)">
                                        <span class="worli-odd">6</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('motor', 7) }"
                                        @click="setBetData('motor', 7)">
                                        <span class="worli-odd">7</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('motor', 8) }"
                                        @click="setBetData('motor', 8)">
                                        <span class="worli-odd">8</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('motor', 9) }"
                                        @click="setBetData('motor', 9)">
                                        <span class="worli-odd">9</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('motor', 0) }"
                                        @click="setBetData('motor', 0)">
                                        <span class="worli-odd">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-none-desktop card-clear-box"
                            v-if="$pages.is('casino', $route.name) && $store.state.casinoBet && $store.state.casinoBet != null">
                            <div>
                                <span>{{ $store.state.casinoBet.nation }}</span>
                            </div>
                            <div>
                                <button class="btn btn-danger"
                                    @click="$store.commit('resetCasinoBetData')">Clear</button>
                                <button class="btn btn-success ml-1" v-if="$store.state.casinoBet.betStatus"
                                    v-b-modal="'placebet-modal'" @click="setMobileAmountFocus()">
                                    Place Bet
                                </button>
                                <button class="btn btn-success ml-1" v-else disabled>Place Bet</button>
                            </div>
                        </div>
                    </div>
                    <div id="card56" class="tab-pane fade card56">
                        <div class="worlibox" :class="{'suspended': main[7].gstatus != 'OPEN'}">
                            <!-- <div class="worli-range">
                                R:<span v-kval="{ size: main[7].min }"></span>-<span
                                    v-kval="{ size: main[7].max }"></span>
                            </div> -->
                            <div class="worli-box-title">
                                <b>{{ $store.state.worlitabdata.chart56.rate }}</b>
                            </div>
                            <div class="worli-left">
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('chart56', 1) }"
                                        @click="setBetData('chart56', 1)">
                                        <span class="worli-odd">1</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('chart56', 2) }"
                                        @click="setBetData('chart56', 2)">
                                        <span class="worli-odd">2</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('chart56', 3) }"
                                        @click="setBetData('chart56', 3)">
                                        <span class="worli-odd">3</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('chart56', 4) }"
                                        @click="setBetData('chart56', 4)">
                                        <span class="worli-odd">4</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('chart56', 5) }"
                                        @click="setBetData('chart56', 5)">
                                        <span class="worli-odd">5</span>
                                    </div>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('chart56', 6) }"
                                        @click="setBetData('chart56', 6)">
                                        <span class="worli-odd">6</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('chart56', 7) }"
                                        @click="setBetData('chart56', 7)">
                                        <span class="worli-odd">7</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('chart56', 8) }"
                                        @click="setBetData('chart56', 8)">
                                        <span class="worli-odd">8</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('chart56', 9) }"
                                        @click="setBetData('chart56', 9)">
                                        <span class="worli-odd">9</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('chart56', 0) }"
                                        @click="setBetData('chart56', 0)">
                                        <span class="worli-odd">0</span>
                                    </div>
                                </div>
                            </div>
                            <div class="worli-right">
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('chart56', 11) }"
                                        @click="setBetData('chart56', 11)">
                                        <span class="worli-odd">56 ALL</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="card64" class="tab-pane fade card64">
                        <div class="worlibox" :class="{'suspended': main[8].gstatus != 'OPEN'}">
                            <!-- <div class="worli-range">
                                R:<span v-kval="{ size: main[8].min }"></span>-<span
                                    v-kval="{ size: main[8].max }"></span>
                            </div> -->
                            <div class="worli-box-title">
                                <b>{{ $store.state.worlitabdata.chart64.rate }}</b>
                            </div>
                            <div class="worli-left">
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('chart64', 1) }"
                                        @click="setBetData('chart64', 1)">
                                        <span class="worli-odd">1</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('chart64', 2) }"
                                        @click="setBetData('chart64', 2)">
                                        <span class="worli-odd">2</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('chart64', 3) }"
                                        @click="setBetData('chart64', 3)">
                                        <span class="worli-odd">3</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('chart64', 4) }"
                                        @click="setBetData('chart64', 4)">
                                        <span class="worli-odd">4</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('chart64', 5) }"
                                        @click="setBetData('chart64', 5)">
                                        <span class="worli-odd">5</span>
                                    </div>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('chart64', 6) }"
                                        @click="setBetData('chart64', 6)">
                                        <span class="worli-odd">6</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('chart64', 7) }"
                                        @click="setBetData('chart64', 7)">
                                        <span class="worli-odd">7</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('chart64', 8) }"
                                        @click="setBetData('chart64', 8)">
                                        <span class="worli-odd">8</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('chart64', 9) }"
                                        @click="setBetData('chart64', 9)">
                                        <span class="worli-odd">9</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('chart64', 0) }"
                                        @click="setBetData('chart64', 0)">
                                        <span class="worli-odd">0</span>
                                    </div>
                                </div>
                            </div>
                            <div class="worli-right">
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('chart64', 11) }"
                                        @click="setBetData('chart64', 11)">
                                        <span class="worli-odd">64 ALL</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="abr" class="tab-pane fade abr">
                        <div class="worlibox" :class="{'suspended': main[9].gstatus != 'OPEN'}">
                            <!-- <div class="worli-range">
                                R:<span v-kval="{ size: main[9].min }"></span>-<span
                                    v-kval="{ size: main[9].max }"></span>
                            </div> -->
                            <div class="worli-box-title">
                                <b>{{ $store.state.worlitabdata.abr.rate }}</b>
                            </div>
                            <div class="worli-left">
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('abr', 1) }"
                                        @click="setBetData('abr', 1)">
                                        <span class="worli-odd">A</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('abr', 2) }"
                                        @click="setBetData('abr', 2)">
                                        <span class="worli-odd">B</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('abr', 3) }"
                                        @click="setBetData('abr', 3)">
                                        <span class="worli-odd">R</span>
                                    </div>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('abr', 5) }"
                                        @click="setBetData('abr', 5)">
                                        <span class="worli-odd">AB</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('abr', 6) }"
                                        @click="setBetData('abr', 6)">
                                        <span class="worli-odd">AR</span>
                                    </div>
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('abr', 7) }"
                                        @click="setBetData('abr', 7)">
                                        <span class="worli-odd">BR</span>
                                    </div>
                                </div>
                            </div>
                            <div class="worli-right">
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('abr', 4) }"
                                        @click="setBetData('abr', 4)">
                                        <span class="worli-odd">ABR</span>
                                    </div>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back" :class="{ 'selected' : CheckSelected('abr', 8) }"
                                        @click="setBetData('abr', 8)">
                                        <span class="worli-odd">ABR CUT</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="commonsp" class="tab-pane fade commonsp">
                        <div class="worlibox" :class="{'suspended': main[10].gstatus != 'OPEN'}">
                            <!-- <div class="worli-range">
                                R:<span v-kval="{ size: main[10].min }"></span>-<span
                                    v-kval="{ size: main[10].max }"></span>
                            </div> -->
                            <div class="worli-full">
                                <div class="worli-box-title">
                                    <b>{{ $store.state.worlitabdata.commonSP.rate }}</b>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('commonSP', 1) }"
                                        @click="setBetData('commonSP', 1)">
                                        <span class="worli-odd">1</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('commonSP', 2) }"
                                        @click="setBetData('commonSP', 2)">
                                        <span class="worli-odd">2</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('commonSP', 3) }"
                                        @click="setBetData('commonSP', 3)">
                                        <span class="worli-odd">3</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('commonSP', 4) }"
                                        @click="setBetData('commonSP', 4)">
                                        <span class="worli-odd">4</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('commonSP', 5) }"
                                        @click="setBetData('commonSP', 5)">
                                        <span class="worli-odd">5</span>
                                    </div>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('commonSP', 6) }"
                                        @click="setBetData('commonSP', 6)">
                                        <span class="worli-odd">6</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('commonSP', 7) }"
                                        @click="setBetData('commonSP', 7)">
                                        <span class="worli-odd">7</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('commonSP', 8) }"
                                        @click="setBetData('commonSP', 8)">
                                        <span class="worli-odd">8</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('commonSP', 9) }"
                                        @click="setBetData('commonSP', 9)">
                                        <span class="worli-odd">9</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('commonSP', 0) }"
                                        @click="setBetData('commonSP', 0)">
                                        <span class="worli-odd">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="commondp" class="tab-pane fade commondp">
                        <div class="worlibox" :class="{'suspended': main[11].gstatus != 'OPEN'}">
                            <!-- <div class="worli-range">
                                R:<span v-kval="{ size: main[11].min }"></span>-<span
                                    v-kval="{ size: main[11].max }"></span>
                            </div> -->
                            <div class="worli-full">
                                <div class="worli-box-title">
                                    <b>{{ $store.state.worlitabdata.commonDP.rate }}</b>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('commonDP', 1) }"
                                        @click="setBetData('commonDP', 1)">
                                        <span class="worli-odd">1</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('commonDP', 2) }"
                                        @click="setBetData('commonDP', 2)">
                                        <span class="worli-odd">2</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('commonDP', 3) }"
                                        @click="setBetData('commonDP', 3)">
                                        <span class="worli-odd">3</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('commonDP', 4) }"
                                        @click="setBetData('commonDP', 4)">
                                        <span class="worli-odd">4</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('commonDP', 5) }"
                                        @click="setBetData('commonDP', 5)">
                                        <span class="worli-odd">5</span>
                                    </div>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('commonDP', 6) }"
                                        @click="setBetData('commonDP', 6)">
                                        <span class="worli-odd">6</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('commonDP', 7) }"
                                        @click="setBetData('commonDP', 7)">
                                        <span class="worli-odd">7</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('commonDP', 8) }"
                                        @click="setBetData('commonDP', 8)">
                                        <span class="worli-odd">8</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('commonDP', 9) }"
                                        @click="setBetData('commonDP', 9)">
                                        <span class="worli-odd">9</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('commonDP', 0) }"
                                        @click="setBetData('commonDP', 0)">
                                        <span class="worli-odd">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="colordp" class="tab-pane fade colordp">
                        <div class="worlibox" :class="{'suspended': main[12].gstatus != 'OPEN'}">
                            <!-- <div class="worli-range">
                                R:<span v-kval="{ size: main[12].min }"></span>-<span
                                    v-kval="{ size: main[12].max }"></span>
                            </div> -->
                            <div class="worli-box-title">
                                <b>{{ $store.state.worlitabdata.colorDP.rate }}</b>
                            </div>
                            <div class="worli-left">
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('colorDP', 1) }"
                                        @click="setBetData('colorDP', 1)">
                                        <span class="worli-odd">1</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('colorDP', 2) }"
                                        @click="setBetData('colorDP', 2)">
                                        <span class="worli-odd">2</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('colorDP', 3) }"
                                        @click="setBetData('colorDP', 3)">
                                        <span class="worli-odd">3</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('colorDP', 4) }"
                                        @click="setBetData('colorDP', 4)">
                                        <span class="worli-odd">4</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('colorDP', 5) }"
                                        @click="setBetData('colorDP', 5)">
                                        <span class="worli-odd">5</span>
                                    </div>
                                </div>
                                <div class="worli-box-row">
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('colorDP', 6) }"
                                        @click="setBetData('colorDP', 6)">
                                        <span class="worli-odd">6</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('colorDP', 7) }"
                                        @click="setBetData('colorDP', 7)">
                                        <span class="worli-odd">7</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('colorDP', 8) }"
                                        @click="setBetData('colorDP', 8)">
                                        <span class="worli-odd">8</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('colorDP', 9) }"
                                        @click="setBetData('colorDP', 9)">
                                        <span class="worli-odd">9</span>
                                    </div>
                                    <div class="worli-odd-box back"
                                        :class="{ 'selected' : CheckSelected('colorDP', 0) }"
                                        @click="setBetData('colorDP', 0)">
                                        <span class="worli-odd">0</span>
                                    </div>
                                </div>
                            </div>
                            <div class="worli-right">
                                <div class="worli-box-row" :class="{ 'selected' : CheckSelected('colorDP', 11) }"
                                    @click="setBetData('colorDP', 11)">
                                    <div class="worli-odd-box back">
                                        <span class="worli-odd">COLOR DP ALL</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <template v-if="$store.state.worlitabdata.rulesStatus">
                    <div class="worli-card-info mt-1" @click="getWorliSectionRules(true)">
                        <i class="fas fa-info-circle"></i>
                    </div>
                </template>

                <template v-if="remark && remark != ''">
                    <div class="casino-remark mt-3">
                        <div class="remark-icon">
                            <img :src="`${imgPath}front/img/icons/remark.png`">
                        </div>
                        <marquee>{{ remark }}</marquee>
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


        <b-modal id="placebet-modal" ref="placebet-modal" hide-footer title="BET SLIP"
            @hide="$store.commit('resetCasinoBetData')" :class="{'loader-section-parent':$store.state.loadingCasinoPlacebet}">
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
                        <button class="btn btn-primary" :disabled="invalid || !$store.state.casinoBet.betStatus"
                            @click="$parent.placebetCasino()">Submit</button>
                    </div>
                </template>
            </ValidationObserver>

            <div class="casino-place-bet-box">
                <h6 class="mt-2">{{ `Total Pana (${$store.state.worlitabdata.totalRule})` }}</h6>
                <div class="worli-cards-container mt-1">
                    <template v-for="(pana, key) in $store.state.worlitabdata.ruleList">
                        <div class="worli-cards-block" :key="key">
                            <span>{{ pana.tpana }}</span>
                        </div>
                    </template>
                </div>
            </div>
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

        <b-modal ref="panaCountModal" hide-footer size="lg" :title="`Total Pana (${$store.state.worlitabdata.totalRule})`">
            <div class="worli-cards-container">
                <template v-for="(pana, key) in $store.state.worlitabdata.ruleList">
                    <div class="worli-cards-block" :key="key">
                        <span>{{ pana.tpana }}</span>
                    </div>
                </template>
            </div>
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
                    'subtype': 'worli'
                })
                return this.orderBy(player, 'sr')
            }
        },
        data() {
            return {
                showCards: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'worli',
                casinoData: [],
                mId: 0,
                remark: '',
                cards: [],
                time: {
                    total: 0,
                    current: 0
                },
                callDataApi: true,
                callBookApi: true,
                exp: '',
                tvUrl: '',
                firstCall: true
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

            setMobileAmountFocus(){
                setTimeout(() => { document.getElementById('placebetAmountMobile').focus();}, 500)
            },
            CheckSelected(type, btnNo) {
                if (type == 'single' || type == 'multi') {
                    if (this.$store.state.worlitabdata.single.selected == btnNo) {
                        return true;
                    }
                } else if (type == 'pana') {
                    for (var i = 0; i < this.$store.state.worlitabdata.pana.selected.length; i++) {
                        if (this.$store.state.worlitabdata.pana.selected[i] == btnNo) {
                            return true;
                        }
                    }
                } else if (type == 'sp') {
                    if (this.$store.state.worlitabdata.sp.selected == btnNo) {
                        return true;
                    }
                } else if (type == 'dp') {
                    if (this.$store.state.worlitabdata.dp.selected == btnNo) {
                        return true;
                    }
                } else if (type == 'trio') {
                    if (this.$store.state.worlitabdata.trio.selected == btnNo) {
                        return true;
                    }
                } else if (type == 'cycle') {
                    for (var i = 0; i < this.$store.state.worlitabdata.cycle.selected.length; i++) {
                        if (this.$store.state.worlitabdata.cycle.selected[i] == btnNo) {
                            return true;
                        }
                    }
                } else if (type == 'motor') {
                    for (var i = 0; i < this.$store.state.worlitabdata.motor.selected.length; i++) {
                        if (this.$store.state.worlitabdata.motor.selected[i] == btnNo) {
                            return true;
                        }
                    }
                } else if (type == 'chart56') {
                    if (this.$store.state.worlitabdata.chart56.selected == btnNo) {
                        return true;
                    }
                } else if (type == 'chart64') {
                    if (this.$store.state.worlitabdata.chart64.selected == btnNo) {
                        return true;
                    }
                } else if (type == 'abr') {
                    if (this.$store.state.worlitabdata.abr.selected == btnNo) {
                        return true;
                    }
                } else if (type == 'commonSP') {
                    if (this.$store.state.worlitabdata.commonSP.selected == btnNo) {
                        return true;
                    }
                } else if (type == 'commonDP') {
                    if (this.$store.state.worlitabdata.commonDP.selected == btnNo) {
                        return true;
                    }
                } else if (type == 'colorDP') {
                    if (this.$store.state.worlitabdata.colorDP.selected == btnNo) {
                        return true;
                    }
                }
            },
            changeTab(sid) {
                if (this.loading)
                    return
                this.loading = true
                this.resetSelectedInTab();
                ServiceApi.callApi("api/front/worlisectiondata", {
                        'sid': sid,
                        'gtype': this.gameType,
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.loading = false
                            let data = response.data.Table[0]
                            this.remark = data.msg;
                            // console.log(data)
                            if (sid == 1) {
                                this.$store.state.worlitabdata.single.multi = data.multi;
                                this.$store.state.worlitabdata.single.single = data.single;
                            } else if (sid == 2) {
                                this.$store.state.worlitabdata.pana.sp = data.sp;
                                this.$store.state.worlitabdata.pana.dp = data.dp;
                                this.$store.state.worlitabdata.pana.tp = data.tp;
                            } else if (sid == 3) {
                                this.$store.state.worlitabdata.sp.rate = data.sp;
                            } else if (sid == 4) {
                                this.$store.state.worlitabdata.dp.rate = data.dp;
                            } else if (sid == 5) {
                                this.$store.state.worlitabdata.trio.rate = data.tp;
                            } else if (sid == 6) {
                                this.$store.state.worlitabdata.motor.rate = data.sp;
                            } else if (sid == 7) {
                                this.$store.state.worlitabdata.chart56.rate = data.sp;
                            } else if (sid == 8) {
                                this.$store.state.worlitabdata.chart64.rate = data.sp;
                            } else if (sid == 10) {
                                this.$store.state.worlitabdata.abr.rate = data.sp;
                            } else if (sid == 11) {
                                this.$store.state.worlitabdata.commonSP.rate = data.sp;
                            } else if (sid == 12) {
                                this.$store.state.worlitabdata.commonDP.rate = data.sp;
                            } else if (sid == 13) {
                                this.$store.state.worlitabdata.colorDP.rate = data.sp;
                            }

                        } else {
                            this.loading = false

                        }
                    })
                    .catch(e => {

                        this.loading = false
                    });
            },
            resetSelectedInTab() {
                this.$store.state.worlitabdata.single.selected = null;
                this.$store.state.worlitabdata.pana.selected = [];
                this.$store.state.worlitabdata.sp.selected = null;
                this.$store.state.worlitabdata.dp.selected = null;
                this.$store.state.worlitabdata.trio.selected = null;
                this.$store.state.worlitabdata.cycle.selected = [];
                this.$store.state.worlitabdata.motor.selected = [];
                this.$store.state.worlitabdata.chart56.selected = null;
                this.$store.state.worlitabdata.chart64.selected = null;
                this.$store.state.worlitabdata.abr.selected = null;
                this.$store.state.worlitabdata.commonSP.selected = null;
                this.$store.state.worlitabdata.commonDP.selected = null;
                this.$store.state.worlitabdata.colorDP.selected = null;
                this.$store.state.worlitabdata.ruleList = []
                this.$store.state.worlitabdata.totalRule = 0
                this.$store.state.worlitabdata.rulesStatus = false
                this.$store.state.casinoBet = null
            },
            getWorliSectionRules(displayModal) {
                ServiceApi.callApi("api/front/sectionpana", {
                    "sid": this.$store.state.casinoBet.sectionId,
                    "urate": this.$store.state.casinoBet.bhav
                }).then(response => {
                    if (response.status == 200) {
                        this.$store.state.worlitabdata.ruleList = response.data.t2
                        this.$store.state.worlitabdata.totalRule = response.data.t1[0].tcnt
                        if (displayModal == true) {
                            this.$refs.panaCountModal.show();
                        }
                    }
                }).catch(e => {

                });

            },
            toggleCards(card) {
                if (card != '1') {
                    this.showCards = !this.showCards
                }
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
                                this.changeTab(this.main[0].sid);
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
            setBetData(tabType, btnNo) {

                let betdata = {}

                betdata.subId = 0
                betdata.amount = ''
                betdata.betType = 'back'
                betdata.gameType = this.gameType
                betdata.marketId = this.mId
                betdata.betStatus = false
                betdata.min = this.main[0].min
                betdata.max = this.main[0].max

                if (tabType == 'single' || tabType == 'multi') {
                    if (this.main[0].gstatus != 'OPEN') {
                        return;
                    }
                    this.$store.state.worlitabdata.single.selected = btnNo

                    betdata.subType = this.main[0].subtype
                    betdata.sectionId = this.main[0].sid
                    betdata.bhav = this.$store.state.worlitabdata.single.selected

                    if (btnNo == 11) {
                        betdata.nation = "Line 1 Single";
                    } else if (btnNo == 12) {
                        betdata.nation = "Line 2 Single";
                    } else if (btnNo == 13) {
                        betdata.nation = "Odd Single";
                    } else if (btnNo == 14) {
                        betdata.nation = "Even Single";
                    } else {
                        betdata.nation = btnNo + " Single";
                    }

                    if (tabType == 'single')
                        betdata.uRate = this.$store.state.worlitabdata.single.single
                    else if (tabType == 'multi')
                        betdata.uRate = this.$store.state.worlitabdata.single.multi

                    betdata.betStatus = true
                    this.$store.state.worlitabdata.rulesStatus = false

                    this.$store.commit('setCasinoBetData', betdata)

                    if (IS_MOBILE) {
                        setTimeout(() => {
                            document.getElementById("placebetAmountMobile").focus();
                        }, 500);
                        this.$refs['placebet-modal'].show()
                    }
                    setTimeout(() => {
                        document.getElementById("placebetAmountWeb").focus();
                    }, 500);

                } else if (tabType == 'pana') {
                    if (this.main[1].gstatus != 'OPEN') {
                        return;
                    }
                    if (this.$store.state.worlitabdata.pana.selected.length < 3) {

                        this.$store.state.worlitabdata.pana.selected.push(btnNo)
                        this.$store.state.worlitabdata.pana.selected.sort();

                        betdata.subType = this.main[1].subtype
                        betdata.sectionId = this.main[1].sid
                        betdata.nation = this.sortNumberString(this.$store.state.worlitabdata.pana
                            .selected.join("")) + " Pana";

                        var filteredString = "";
                        for (var i = 0; i < this.$store.state.worlitabdata.pana.selected.length; i++) {
                            if (i == 0 || this.$store.state.worlitabdata.pana.selected[i] != this.$store.state
                                .worlitabdata.pana.selected[i - 1]) {
                                filteredString += this.$store.state.worlitabdata.pana.selected[i];
                            }
                        }

                        if (this.$store.state.worlitabdata.pana.selected.length == 3) {
                            if (filteredString.length == 3) {
                                betdata.uRate = this.$store.state.worlitabdata.pana.sp
                            } else if (filteredString.length == 2) {
                                betdata.uRate = this.$store.state.worlitabdata.pana.dp
                            } else if (filteredString.length == 1) {
                                betdata.uRate = this.$store.state.worlitabdata.pana.tp
                            }

                            betdata.bhav = this.sortNumberString(this.$store.state.worlitabdata
                                .pana.selected.join(""))

                            betdata.betStatus = true
                            this.$store.state.worlitabdata.rulesStatus = true

                            this.$store.commit('setCasinoBetData', betdata)

                            this.getWorliSectionRules(false);

                            setTimeout(() => {
                                document.getElementById("placebetAmountWeb").focus();
                            }, 500);
                            // if (IS_MOBILE) {
                            //     this.$refs['placebet-modal'].show()
                            // }
                        } else {
                            this.$store.commit('setCasinoBetData', betdata)
                        }
                    } else {
                        return;
                    }
                } else if (tabType == 'sp') {
                    if (this.main[2].gstatus != 'OPEN') {
                        return;
                    }
                    this.$store.state.worlitabdata.sp.selected = btnNo
                    if (btnNo == 11) {
                        betdata.nation = "SP - ALL";
                    } else {
                        betdata.nation = btnNo + " SP";
                    }
                    betdata.subType = this.main[2].subtype
                    betdata.sectionId = this.main[2].sid
                    betdata.uRate = this.$store.state.worlitabdata.sp.rate
                    betdata.bhav = this.$store.state.worlitabdata.sp.selected
                    betdata.betStatus = true
                    this.$store.state.worlitabdata.rulesStatus = true

                    this.$store.commit('setCasinoBetData', betdata)

                    this.getWorliSectionRules(false);

                    if (IS_MOBILE) {
                        setTimeout(() => {
                            document.getElementById("placebetAmountMobile").focus();
                        }, 500);
                        this.$refs['placebet-modal'].show()
                    }
                    setTimeout(() => {
                        document.getElementById("placebetAmountWeb").focus();
                    }, 500);

                } else if (tabType == 'dp') {
                    if (this.main[3].gstatus != 'OPEN') {
                        return;
                    }
                    this.$store.state.worlitabdata.dp.selected = btnNo
                    if (btnNo == 11) {
                        betdata.nation = "DP - ALL";
                    } else {
                        betdata.nation = btnNo + " DP";
                    }
                    betdata.uRate = this.$store.state.worlitabdata.dp.rate
                    betdata.subType = this.main[3].subtype
                    betdata.sectionId = this.main[3].sid
                    betdata.bhav = this.$store.state.worlitabdata.dp.selected

                    betdata.betStatus = true
                    this.$store.state.worlitabdata.rulesStatus = true

                    this.$store.commit('setCasinoBetData', betdata)

                    this.getWorliSectionRules(false);

                    if (IS_MOBILE) {
                        setTimeout(() => {
                            document.getElementById("placebetAmountMobile").focus();
                        }, 500);
                        this.$refs['placebet-modal'].show()
                    }
                    setTimeout(() => {
                        document.getElementById("placebetAmountWeb").focus();
                    }, 500);

                } else if (tabType == 'trio') {
                    if (this.main[4].gstatus != 'OPEN') {
                        return;
                    }
                    this.$store.state.worlitabdata.trio.selected = btnNo
                    if (btnNo == 9) {
                        betdata.nation = "ALL Trio";
                    }
                    betdata.uRate = this.$store.state.worlitabdata.trio.rate
                    betdata.subType = this.main[4].subtype
                    betdata.sectionId = this.main[4].sid
                    betdata.bhav = this.$store.state.worlitabdata.trio.selected

                    betdata.betStatus = true
                    this.$store.state.worlitabdata.rulesStatus = true

                    this.$store.commit('setCasinoBetData', betdata)

                    this.getWorliSectionRules(false);

                    if (IS_MOBILE) {
                        setTimeout(() => {
                            document.getElementById("placebetAmountMobile").focus();
                        }, 500);
                        this.$refs['placebet-modal'].show()
                    }
                    setTimeout(() => {
                        document.getElementById("placebetAmountWeb").focus();
                    }, 500);

                } else if (tabType == 'cycle') {
                    if (this.main[5].gstatus != 'OPEN') {
                        return;
                    }
                    if (this.$store.state.worlitabdata.cycle.selected.length < 2) {
                        this.$store.state.worlitabdata.cycle.selected.push(btnNo)
                        this.$store.state.worlitabdata.cycle.selected.sort();
                        betdata.userRate = 0
                        betdata.subType = this.main[5].subtype
                        betdata.sectionId = this.main[5].sid
                        betdata.nation = this.sortNumberString(this.$store.state.worlitabdata.cycle
                            .selected.join("")) + " Cycle";
                        if (this.$store.state.worlitabdata.cycle.selected.length == 2) {

                            betdata.bhav = this.sortNumberString(this.$store.state.worlitabdata
                                .cycle.selected.join(""))

                            betdata.betStatus = true
                            this.$store.state.worlitabdata.rulesStatus = true

                            this.$store.commit('setCasinoBetData', betdata)

                            this.getWorliSectionRules(false);

                            setTimeout(() => {
                                document.getElementById("placebetAmountWeb").focus();
                            }, 500);
                            // if (IS_MOBILE) {
                            //     this.$refs['placebet-modal'].show()
                            // }

                        } else {
                            this.$store.commit('setCasinoBetData', betdata)
                        }

                    } else {
                        return;
                    }
                } else if (tabType == 'motor') {
                    if (this.main[6].gstatus != 'OPEN') {
                        return;
                    }
                    if (this.$store.state.worlitabdata.motor.selected.length < 9) {
                        this.$store.state.worlitabdata.motor.selected.push(btnNo)
                        let unique = [...new Set(this.$store.state.worlitabdata.motor.selected)];
                        this.$store.state.worlitabdata.motor.selected = unique
                        this.$store.state.worlitabdata.motor.selected.sort();
                        betdata.nation = this.sortNumberString(this.$store.state.worlitabdata.motor
                            .selected.join("")) + " Motor";

                        if (this.$store.state.worlitabdata.motor.selected.length > 3 && this.$store.state.worlitabdata
                            .motor.selected.length <= 9) {
                            betdata.subType = this.main[6].subtype
                            betdata.sectionId = this.main[6].sid

                            betdata.uRate = this.$store.state.worlitabdata.motor.rate
                            betdata.bhav = this.sortNumberString(this.$store.state.worlitabdata
                                .motor.selected.join(""))

                            betdata.betStatus = true
                            this.$store.state.worlitabdata.rulesStatus = true

                            this.$store.commit('setCasinoBetData', betdata)

                            this.getWorliSectionRules(false);

                            setTimeout(() => {
                                document.getElementById("placebetAmountWeb").focus();
                            }, 500);
                            // if (IS_MOBILE) {
                            //     this.$refs['placebet-modal'].show()
                            // }

                        } else {
                            this.$store.commit('setCasinoBetData', betdata)
                        }

                    } else {
                        return;
                    }
                } else if (tabType == 'chart56') {
                    if (this.main[7].gstatus != 'OPEN') {
                        return;
                    }
                    this.$store.state.worlitabdata.chart56.selected = btnNo
                    if (btnNo == 11) {
                        betdata.nation = "56CHART";
                    } else {
                        betdata.nation = "56 - " + btnNo;
                    }
                    betdata.uRate = this.$store.state.worlitabdata.chart56.rate
                    betdata.subType = this.main[7].subtype
                    betdata.sectionId = this.main[7].sid
                    betdata.bhav = this.$store.state.worlitabdata.chart56.selected

                    betdata.betStatus = true
                    this.$store.state.worlitabdata.rulesStatus = true

                    this.$store.commit('setCasinoBetData', betdata)

                    this.getWorliSectionRules(false);

                    if (IS_MOBILE) {
                        setTimeout(() => {
                            document.getElementById("placebetAmountMobile").focus();
                        }, 500);
                        this.$refs['placebet-modal'].show()
                    }
                    setTimeout(() => {
                        document.getElementById("placebetAmountWeb").focus();
                    }, 500);

                } else if (tabType == 'chart64') {
                    if (this.main[8].gstatus != 'OPEN') {
                        return;
                    }
                    this.$store.state.worlitabdata.chart64.selected = btnNo
                    if (btnNo == 11) {
                        betdata.nation = "64CHART";
                    } else {
                        betdata.nation = "64 - " + btnNo;
                    }
                    betdata.uRate = this.$store.state.worlitabdata.chart64.rate
                    betdata.subType = this.main[8].subtype
                    betdata.sectionId = this.main[8].sid
                    betdata.bhav = this.$store.state.worlitabdata.chart64.selected

                    betdata.betStatus = true
                    this.$store.state.worlitabdata.rulesStatus = true

                    this.$store.commit('setCasinoBetData', betdata)

                    this.getWorliSectionRules(false);

                    if (IS_MOBILE) {
                        setTimeout(() => {
                            document.getElementById("placebetAmountMobile").focus();
                        }, 500);
                        this.$refs['placebet-modal'].show()
                    }
                    setTimeout(() => {
                        document.getElementById("placebetAmountWeb").focus();
                    }, 500);

                } else if (tabType == 'abr') {
                    if (this.main[9].gstatus != 'OPEN') {
                        return;
                    }
                    this.$store.state.worlitabdata.abr.selected = btnNo
                    if (btnNo == 1) {
                        betdata.nation = "ABR - A";
                    } else if (btnNo == 2) {
                        betdata.nation = "ABR - B";
                    } else if (btnNo == 3) {
                        betdata.nation = "ABR - R";
                    } else if (btnNo == 4) {
                        betdata.nation = "ABR - ABR";
                    } else if (btnNo == 5) {
                        betdata.nation = "ABR - AB";
                    } else if (btnNo == 6) {
                        betdata.nation = "ABR - AR";
                    } else if (btnNo == 7) {
                        betdata.nation = "ABR - BR";
                    } else if (btnNo == 8) {
                        betdata.nation = "ABR - ABR Cut";
                    }
                    betdata.uRate = this.$store.state.worlitabdata.abr.rate
                    betdata.subType = this.main[9].subtype
                    betdata.sectionId = this.main[9].sid
                    betdata.bhav = this.$store.state.worlitabdata.abr.selected

                    betdata.betStatus = true
                    this.$store.state.worlitabdata.rulesStatus = true

                    this.$store.commit('setCasinoBetData', betdata)

                    this.getWorliSectionRules(false);

                    if (IS_MOBILE) {
                        setTimeout(() => {
                            document.getElementById("placebetAmountMobile").focus();
                        }, 500);
                        this.$refs['placebet-modal'].show()
                    }
                    setTimeout(() => {
                        document.getElementById("placebetAmountWeb").focus();
                    }, 500);

                } else if (tabType == 'commonSP') {
                    if (this.main[10].gstatus != 'OPEN') {
                        return;
                    }
                    this.$store.state.worlitabdata.commonSP.selected = btnNo
                    betdata.nation = "Common SP - " + btnNo;
                    betdata.uRate = this.$store.state.worlitabdata.commonSP.rate
                    betdata.subType = this.main[10].subtype
                    betdata.sectionId = this.main[10].sid
                    betdata.bhav = this.$store.state.worlitabdata.commonSP.selected

                    betdata.betStatus = true
                    this.$store.state.worlitabdata.rulesStatus = true

                    this.$store.commit('setCasinoBetData', betdata)

                    this.getWorliSectionRules(false);

                    if (IS_MOBILE) {
                        setTimeout(() => {
                            document.getElementById("placebetAmountMobile").focus();
                        }, 500);
                        this.$refs['placebet-modal'].show()
                    }
                    setTimeout(() => {
                        document.getElementById("placebetAmountWeb").focus();
                    }, 500);

                } else if (tabType == 'commonDP') {
                    if (this.main[11].gstatus != 'OPEN') {
                        return;
                    }
                    this.$store.state.worlitabdata.commonDP.selected = btnNo
                    betdata.nation = "Common DP - " + btnNo;
                    betdata.uRate = this.$store.state.worlitabdata.commonDP.rate
                    betdata.subType = this.main[11].subtype
                    betdata.sectionId = this.main[11].sid
                    betdata.bhav = this.$store.state.worlitabdata.commonDP.selected

                    betdata.betStatus = true
                    this.$store.state.worlitabdata.rulesStatus = true

                    this.$store.commit('setCasinoBetData', betdata)

                    this.getWorliSectionRules(false);

                    if (IS_MOBILE) {
                        setTimeout(() => {
                            document.getElementById("placebetAmountMobile").focus();
                        }, 500);
                        this.$refs['placebet-modal'].show()
                    }
                    setTimeout(() => {
                        document.getElementById("placebetAmountWeb").focus();
                    }, 500);

                } else if (tabType == 'colorDP') {
                    if (this.main[12].gstatus != 'OPEN') {
                        return;
                    }
                    this.$store.state.worlitabdata.colorDP.selected = btnNo
                    betdata.nation = "Color DP - " + btnNo;
                    betdata.uRate = this.$store.state.worlitabdata.colorDP.rate
                    betdata.subType = this.main[12].subtype
                    betdata.sectionId = this.main[12].sid
                    betdata.bhav = this.$store.state.worlitabdata.colorDP.selected

                    betdata.betStatus = true
                    this.$store.state.worlitabdata.rulesStatus = true

                    this.$store.commit('setCasinoBetData', betdata)

                    this.getWorliSectionRules(false);

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
                var zerostr = "";
                for (var i = 0; i < inputval.length; i++) {
                    if (inputval[i] == "0") {
                        zerostr += "0";
                    }
                }
                if (parseInt(inputval) != 0) {
                    inputval = parseInt(inputval) + zerostr;
                }
                return inputval;
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