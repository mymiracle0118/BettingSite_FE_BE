<template>
    <div class="casino-container">
        <!-- Casino Content -->
        <template v-if="!$store.getters.isTablet">
            <TimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current" />
        </template>
        <div class="casino-table pasa">
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
                                <Card :card="cards[1]" />
                                <Card :card="cards[2]" />
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
                <div class="casino-detail">
                    <div class="row row5">
                        <div class="col-12 col-md-6">
                            <div class="casino-box-row d-none-small" style="height: 30px;"></div>
                            <div class="casino-box-row pasa-sesssion">
                                <div class="casino-nation-name">
                                    <b @click="getBookData(mId, trio[0].sid)" class="pointer">{{ trio[0].nat }}</b>
                                    <div class="float-right">
                                        <span class="mr-2" v-casinofancybook="{sid: trio[0].sid, subid: 0}">0</span>
                                    </div>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="lay casino-bl-box-item"
                                        :class="{'suspended': trio[0].gstatus != 'OPEN'}"
                                        @click="setBetData(false, trio[0].lbhav, trio[0].nat, trio[0].l, mId, trio[0].sid, trio[0].subtype, 0, 'lay', gameType, trio[0].gstatus, trio[0].min, trio[0].max)">
                                        <span>{{ trio[0].l }}</span>
                                        <span class="casino-box-odd">{{ trio[0].lbhav }}</span>
                                    </div>
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': trio[0].gstatus != 'OPEN'}"
                                        @click="setBetData(false, trio[0].bbhav, trio[0].nat, trio[0].b, mId, trio[0].sid, trio[0].subtype, 0, 'back', gameType, trio[0].gstatus, trio[0].min, trio[0].max)">
                                        <span>{{ trio[0].b }}</span>
                                        <span class="casino-box-odd">{{ trio[0].bbhav }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="casino-box-row d-none-small" style="height: 30px;"></div>
                        </div>
                        <div class="col-6 col-md-3 pasa-fancy">
                            <div class="casino-box-row">
                                <div class="casino-nation-name">
                                    <b>{{ section124[0].nat }}</b>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': section124[0].gstatus != 'OPEN'}"
                                        @click="setBetData(false, section124[0].bbhav, section124[0].nat, section124[0].b, mId, section124[0].sid, section124[0].subtype, 0, 'back', gameType, section124[0].gstatus, section124[0].min, section124[0].max)">
                                        <span class="casino-box-odd">{{ section124[0].b }}</span>
                                    </div>
                                    <div class="lay casino-bl-box-item"
                                        :class="{'suspended': section124[0].gstatus != 'OPEN'}"
                                        @click="setBetData(false, section124[0].lbhav, section124[0].nat, section124[0].l, mId, section124[0].sid, section124[0].subtype, 0, 'lay', gameType, section124[0].gstatus, section124[0].min, section124[0].max)">
                                        <span class="casino-box-odd">{{ section124[0].l }}</span>
                                    </div>
                                </div>
                                <div class="casino-nation-name" v-casinofancybook="{sid: section124[0].sid, subid: 0}">
                                    0
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-md-3 pasa-fancy">
                            <div class="casino-box-row">
                                <div class="casino-nation-name">
                                    <b>{{ jqk1[0].nat }}</b>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': jqk1[0].gstatus != 'OPEN'}"
                                        @click="setBetData(false, jqk1[0].bbhav, jqk1[0].nat, jqk1[0].b, mId, jqk1[0].sid, jqk1[0].subtype, 0, 'back', gameType, jqk1[0].gstatus, jqk1[0].min, jqk1[0].max)">
                                        <span class="casino-box-odd">{{ jqk1[0].b }}</span>
                                    </div>
                                    <div class="lay casino-bl-box-item"
                                        :class="{'suspended': jqk1[0].gstatus != 'OPEN'}"
                                        @click="setBetData(false, jqk1[0].lbhav, jqk1[0].nat, jqk1[0].l, mId, jqk1[0].sid, jqk1[0].subtype, 0, 'lay', gameType, jqk1[0].gstatus, jqk1[0].min, jqk1[0].max)">
                                        <span class="casino-box-odd">{{ jqk1[0].l }}</span>
                                    </div>
                                </div>
                                <div class="casino-nation-name" v-casinofancybook="{sid: jqk1[0].sid, subid: 0}">
                                    0
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row row5 mt-2 pasa-cards">
                        <div class="col-6 col-md-3">
                            <div class="casino-box-row">
                                <div class="casino-nation-name">
                                    <b>{{ red2[0].nat }}</b>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': red2[0].gstatus != 'OPEN'}"
                                        @click="setBetData(false, red2[0].bbhav, red2[0].nat, red2[0].b, mId, red2[0].sid, red2[0].subtype, 0, 'back', gameType, red2[0].gstatus, red2[0].min, red2[0].max)">
                                        <span class="casino-box-odd">{{ red2[0].b }}</span>
                                    </div>
                                    <div class="lay casino-bl-box-item"
                                        :class="{'suspended': red2[0].gstatus != 'OPEN'}"
                                        @click="setBetData(false, red2[0].lbhav, red2[0].nat, red2[0].l, mId, red2[0].sid, red2[0].subtype, 0, 'lay', gameType, red2[0].gstatus, red2[0].min, red2[0].max)">
                                        <span class="casino-box-odd">{{ red2[0].l }}</span>
                                    </div>
                                </div>
                                <div class="casino-nation-name" v-casinofancybook="{sid: red2[0].sid, subid: 0}">
                                    0
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="casino-box-row">
                                <div class="casino-nation-name">
                                    <b>{{ black2[0].nat }}</b>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': black2[0].gstatus != 'OPEN'}"
                                        @click="setBetData(false, black2[0].bbhav, black2[0].nat, black2[0].b, mId, black2[0].sid, black2[0].subtype, 0, 'back', gameType, black2[0].gstatus, black2[0].min, black2[0].max)">
                                        <span class="casino-box-odd">{{ black2[0].b }}</span>
                                    </div>
                                    <div class="lay casino-bl-box-item"
                                        :class="{'suspended': black2[0].gstatus != 'OPEN'}"
                                        @click="setBetData(false, black2[0].lbhav, black2[0].nat, black2[0].l, mId, black2[0].sid, black2[0].subtype, 0, 'lay', gameType, black2[0].gstatus, black2[0].min, black2[0].max)">
                                        <span class="casino-box-odd">{{ black2[0].l }}</span>
                                    </div>
                                </div>
                                <div class="casino-nation-name" v-casinofancybook="{sid: black2[0].sid, subid: 0}">
                                    0
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="casino-box-row">
                                <div class="casino-nation-name">
                                    <b>{{ odd2[0].nat }}</b>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': odd2[0].gstatus != 'OPEN'}"
                                        @click="setBetData(false, odd2[0].bbhav, odd2[0].nat, odd2[0].b, mId, odd2[0].sid, odd2[0].subtype, 0, 'back', gameType, odd2[0].gstatus, odd2[0].min, odd2[0].max)">
                                        <span class="casino-box-odd">{{ odd2[0].b }}</span>
                                    </div>
                                    <div class="lay casino-bl-box-item"
                                        :class="{'suspended': odd2[0].gstatus != 'OPEN'}"
                                        @click="setBetData(false, odd2[0].lbhav, odd2[0].nat, odd2[0].l, mId, odd2[0].sid, odd2[0].subtype, 0, 'lay', gameType, odd2[0].gstatus, odd2[0].min, odd2[0].max)">
                                        <span class="casino-box-odd">{{ odd2[0].l }}</span>
                                    </div>
                                </div>
                                <div class="casino-nation-name" v-casinofancybook="{sid: odd2[0].sid, subid: 0}">
                                    0
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="casino-box-row">
                                <div class="casino-nation-name">
                                    <b>{{ even2[0].nat }}</b>
                                </div>
                                <div class="casino-bl-box">
                                    <div class="back casino-bl-box-item"
                                        :class="{'suspended': even2[0].gstatus != 'OPEN'}"
                                        @click="setBetData(false, even2[0].bbhav, even2[0].nat, even2[0].b, mId, even2[0].sid, even2[0].subtype, 0, 'back', gameType, even2[0].gstatus, even2[0].min, even2[0].max)">
                                        <span class="casino-box-odd">{{ even2[0].b }}</span>
                                    </div>
                                    <div class="lay casino-bl-box-item"
                                        :class="{'suspended': even2[0].gstatus != 'OPEN'}"
                                        @click="setBetData(false, even2[0].lbhav, even2[0].nat, even2[0].l, mId, even2[0].sid, even2[0].subtype, 0, 'lay', gameType, even2[0].gstatus, even2[0].min, even2[0].max)">
                                        <span class="casino-box-odd">{{ even2[0].l }}</span>
                                    </div>
                                </div>
                                <div class="casino-nation-name" v-casinofancybook="{sid: even2[0].sid, subid: 0}">
                                    0
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="casino-box-row pasa-other-bets">
                        <div class="casino-box-row pasa-other-bet">
                            <div class="casino-nation-name">
                                <b>{{ pair2[0].nat }}</b>
                            </div>
                            <div class="casino-bl-box">
                                <div class="back casino-bl-box-item" :class="{'suspended': pair2[0].gstatus != 'OPEN'}"
                                    @click="setBetData(false, pair2[0].bbhav, pair2[0].nat, pair2[0].b, mId, pair2[0].sid, pair2[0].subtype, 0, 'back', gameType, pair2[0].gstatus, pair2[0].min, pair2[0].max)">
                                    <span class="casino-box-odd">{{ pair2[0].b }}</span>
                                </div>
                            </div>
                            <div class="casino-nation-name" v-casinofancybook="{sid: pair2[0].sid, subid: 0}">
                                0
                            </div>
                        </div>
                        <div class="casino-box-row pasa-other-bet">
                            <div class="casino-nation-name">
                                <b>{{ flush[0].nat }}</b>
                            </div>
                            <div class="casino-bl-box">
                                <div class="back casino-bl-box-item" :class="{'suspended': flush[0].gstatus != 'OPEN'}"
                                    @click="setBetData(false, flush[0].bbhav, flush[0].nat, flush[0].b, mId, flush[0].sid, flush[0].subtype, 0, 'back', gameType, flush[0].gstatus, flush[0].min, flush[0].max)">
                                    <span class="casino-box-odd">{{ flush[0].b }}</span>
                                </div>
                            </div>
                            <div class="casino-nation-name" v-casinofancybook="{sid: flush[0].sid, subid: 0}">
                                0
                            </div>
                        </div>
                        <div class="casino-box-row pasa-other-bet">
                            <div class="casino-nation-name">
                                <b>{{ straight[0].nat }}</b>
                            </div>
                            <div class="casino-bl-box">
                                <div class="back casino-bl-box-item"
                                    :class="{'suspended': straight[0].gstatus != 'OPEN'}"
                                    @click="setBetData(false, straight[0].bbhav, straight[0].nat, straight[0].b, mId, straight[0].sid, straight[0].subtype, 0, 'back', gameType, straight[0].gstatus, straight[0].min, straight[0].max)">
                                    <span class="casino-box-odd">{{ straight[0].b }}</span>
                                </div>
                            </div>
                            <div class="casino-nation-name" v-casinofancybook="{sid: straight[0].sid, subid: 0}">
                                0
                            </div>
                        </div>
                        <div class="casino-box-row pasa-other-bet">
                            <div class="casino-nation-name">
                                <b>{{ trio1[0].nat }}</b>
                            </div>
                            <div class="casino-bl-box">
                                <div class="back casino-bl-box-item" :class="{'suspended': trio1[0].gstatus != 'OPEN'}"
                                    @click="setBetData(false, trio1[0].bbhav, trio1[0].nat, trio1[0].b, mId, trio1[0].sid, trio1[0].subtype, 0, 'back', gameType, trio1[0].gstatus, trio1[0].min, trio1[0].max)">
                                    <span class="casino-box-odd">{{ trio1[0].b }}</span>
                                </div>
                            </div>
                            <div class="casino-nation-name" v-casinofancybook="{sid: trio1[0].sid, subid: 0}">
                                0
                            </div>
                        </div>
                        <div class="casino-box-row pasa-other-bet">
                            <div class="casino-nation-name">
                                <b>{{ straightflush[0].nat }}</b>
                            </div>
                            <div class="casino-bl-box">
                                <div class="back casino-bl-box-item"
                                    :class="{'suspended': straightflush[0].gstatus != 'OPEN'}"
                                    @click="setBetData(false, straightflush[0].bbhav, straightflush[0].nat, straightflush[0].b, mId, straightflush[0].sid, straightflush[0].subtype, 0, 'back', gameType, straightflush[0].gstatus, straightflush[0].min, straightflush[0].max)">
                                    <span class="casino-box-odd">{{ straightflush[0].b }}</span>
                                </div>
                            </div>
                            <div class="casino-nation-name" v-casinofancybook="{sid: straightflush[0].sid, subid: 0}">
                                0
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
            trio() {
                var trio = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'trio'
                })
                return this.orderBy(trio, 'sr')
            },
            section124() {
                var section124 = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': '124'
                })
                return this.orderBy(section124, 'sr')
            },
            jqk1() {
                var jqk1 = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'jqk1'
                })
                return this.orderBy(jqk1, 'sr')
            },
            red2() {
                var red2 = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'red2'
                })
                return this.orderBy(red2, 'sr')
            },
            black2() {
                var black2 = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'black2'
                })
                return this.orderBy(black2, 'sr')
            },
            odd2() {
                var odd2 = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'odd2'
                })
                return this.orderBy(odd2, 'sr')
            },
            even2() {
                var even2 = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'even2'
                })
                return this.orderBy(even2, 'sr')
            },
            pair2() {
                var pair2 = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'pair2'
                })
                return this.orderBy(pair2, 'sr')
            },
            flush() {
                var flush = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'flush'
                })
                return this.orderBy(flush, 'sr')
            },
            straight() {
                var straight = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'straight'
                })
                return this.orderBy(straight, 'sr')
            },
            trio1() {
                var trio1 = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'trio1'
                })
                return this.orderBy(trio1, 'sr')
            },
            straightflush() {
                var straightflush = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'straightflush'
                })
                return this.orderBy(straightflush, 'sr')
            },
        },
        data() {
            return {
                bookData: [],
                showCards: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'trio',
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
            setBetData(isTotal, bhav, nat, rate, mid, sid, subType, subId, bType, gType, gstatus, min, max) {
                // console.log(isTotal, bhav, nat, rate, mid, sid, subType, subId, bType, gType, gstatus)
                // console.log(min, max)
                if (isTotal && (!bhav)) {
                    return
                }
                if (rate && gstatus == 'OPEN') {
                    let betdata = {
                        subType: subType,
                        marketId: mid,
                        sectionId: sid,
                        subId: subId,
                        uRate: rate,
                        bhav: bhav,
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