<template>
    <div class="casino-video-last-results" v-if="$store.state.casinoGameType">
        <template v-if="$store.state.casinoGameType == 'race17'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span :class="[{'resulta': data.win == 1}, 
                              {'resultb': data.win == 2}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">Y</template>
                    <template v-if="data.win == 0">N</template>
                </span>
            </template>
        </template>

        <template v-else-if="$store.state.casinoGameType == 'teen20b' 
                || $store.state.casinoGameType == 'trap' 
                || $store.state.casinoGameType == 'patti2' 
                || $store.state.casinoGameType == 'teensin' 
                || $store.state.casinoGameType == 'teenmuf'
                || $store.state.casinoGameType == 'teen'
                || $store.state.casinoGameType == 'teen20'
                || $store.state.casinoGameType == 'teen6'
                || $store.state.casinoGameType == 'teen2024'
                || $store.state.casinoGameType == 'poker20'
                || $store.state.casinoGameType == 'poker'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span :class="[{'resulta': data.win == 1}, 
                              {'resultb': data.win == 2}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">A</template>
                    <template v-if="data.win == 2">B</template>
                    <template v-if="data.win == 0">T</template>
                </span>
            </template>
        </template>

        <template v-else-if="$store.state.casinoGameType == 'teen1'
                || $store.state.casinoGameType == 'teen120'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span :class="[{'resulta': data.win == 1}, 
                              {'resultb': data.win == 2}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">P</template>
                    <template v-else-if="data.win == 2">D</template>
                    <template v-else>T</template>
                </span>
            </template>
        </template>

        <template v-else-if="$store.state.casinoGameType == 'teen8'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span class="resulttie" :key="key" @click="showResult(data.mid)">R</span>
            </template>
        </template>

        <template v-else-if="$store.state.casinoGameType == 'teen9'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span :class="[{'resulta': data.win == 1}, 
                            {'resultb': data.win == 2}, 
                            {'resultc': data.win == 3}, 
                            {'resulttie': data.win == 0}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">T</template>
                    <template v-if="data.win == 2">L</template>
                    <template v-if="data.win == 3">D</template>
                    <template v-if="data.win == 0">T</template>
                </span>
            </template>
        </template>

        <template v-else-if="$store.state.casinoGameType == 'trio'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span :key="key" @click="showResult(data.mid)">
                    R
                </span>
            </template>
        </template>

        <template v-else-if="$store.state.casinoGameType == 'superover'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span :class="[{'resulta': data.win == 1}, 
                            {'resultb': data.win == 2}, 
                            {'resulttie': data.win == 0}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">E</template>
                    <template v-if="data.win == 2">R</template>
                    <template v-if="data.win == 0">T</template>
                </span>
            </template>
        </template>

        <template v-else-if="$store.state.casinoGameType == 'cricketv3'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span :class="[{'resulta': data.win == 1}, 
                            {'resultb': data.win == 2}, 
                            {'resulttie': data.win == 0}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">A</template>
                    <template v-if="data.win == 2">I</template>
                    <template v-if="data.win == 0">T</template>
                </span>
            </template>
        </template>

        <template v-else-if="$store.state.casinoGameType == 'poker6'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span class="resulttie" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 0">T</template>
                    <template v-if="data.win == 11">1</template>
                    <template v-if="data.win == 12">2</template>
                    <template v-if="data.win == 13">3</template>
                    <template v-if="data.win == 14">4</template>
                    <template v-if="data.win == 15">5</template>
                    <template v-if="data.win == 16">6</template>
                </span>
            </template>
        </template>

        <template v-else-if="$store.state.casinoGameType == 'baccarat' || $store.state.casinoGameType == 'baccarat2'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span :class="[{'resulta': data.win == 1}, 
                        {'resultb': data.win == 2},
                        {'resulttie': data.win == 3}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">P</template>
                    <template v-else-if="data.win == 2 || data.win == 4">B</template>
                    <template v-else>T</template>
                </span>
            </template>
        </template>

        <template v-else-if="$store.state.casinoGameType == 'dt6'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span :class="[{'resulta': data.win == 1}, 
                            {'resultb': data.win == 2}, 
                            {'resulttie': data.win == 0}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">D</template>
                    <template v-if="data.win == 2">T</template>
                    <template v-if="data.win == 0">T</template>
                </span>
            </template>
        </template>

        <template v-else-if="$store.state.casinoGameType == 'dtl20'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span :class="[{'resulta': data.win == 1}, 
                            {'resultb': data.win == 21}, 
                            {'resultc': data.win == 41}, 
                            {'resulttie': data.win == 0}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">D</template>
                    <template v-if="data.win == 21">T</template>
                    <template v-if="data.win == 41">L</template>
                    <template v-if="data.win == 0">T</template>
                </span>
            </template>
        </template>

        <template v-else-if="$store.state.casinoGameType == 'dt20' 
            || $store.state.casinoGameType == 'dt202'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span :class="[{'resulta': data.win == 1}, 
                            {'resultb': data.win == 2}, 
                            {'resulttie': data.win == 3}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">D</template>
                    <template v-if="data.win == 2">T</template>
                    <template v-if="data.win == 3">T</template>
                </span>
            </template>
        </template>

        <template v-else-if="$store.state.casinoGameType == 'card32' 
            || $store.state.casinoGameType == 'card32eu'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span class="resultb" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">8</template>
                    <template v-if="data.win == 2">9</template>
                    <template v-if="data.win == 3">10</template>
                    <template v-if="data.win == 4">11</template>
                </span>
            </template>
        </template>

        <template v-else-if="$store.state.casinoGameType == 'abj'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span :class="[{'resulta': data.win == 1}, 
                    {'resultb': data.win == 2}, 
                    {'resulttie': data.win == 0}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">A</template>
                    <template v-if="data.win == 2">B</template>
                    <template v-if="data.win == 0">T</template>
                </span>
            </template>
        </template>

        <template v-else-if="$store.state.casinoGameType == 'lucky7' 
                || $store.state.casinoGameType == 'lucky7eu' 
                || $store.state.casinoGameType == 'lucky7eu2'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span :class="[{'resultlow': data.win == 1}, 
                            {'resulthigh': data.win == 2},
                            {'resulttie': data.win == 0}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">L</template>
                    <template v-if="data.win == 2">H</template>
                    <template v-if="data.win == 0">T</template>
                </span>
            </template>
        </template>

        <!-- ONLY R -->
        <template v-else-if="$store.state.casinoGameType == 'worli' 
            || $store.state.casinoGameType == 'worli2' 
            || $store.state.casinoGameType == 'war'
            || $store.state.casinoGameType == '3cardj'
            || $store.state.casinoGameType == 'ab20'
            || $store.state.casinoGameType == 'notenum'
            || $store.state.casinoGameType == 'kbc'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span class="resultb" :key="key" @click="showResult(data.mid)">
                    R
                </span>
            </template>
        </template>

        <template v-else-if="$store.state.casinoGameType == 'aaa'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span :class="[{'resulta': data.win == 1}, 
                            {'resultb': data.win == 2}, 
                            {'resultc': data.win == 3}, 
                            {'resulttie': data.win == 0}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">A</template>
                    <template v-if="data.win == 2">B</template>
                    <template v-if="data.win == 3">C</template>
                    <template v-if="data.win == 0">T</template>
                </span>
            </template>
        </template>

        <template v-else-if="$store.state.casinoGameType == 'btable'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span class="resultb" :class="[{'resulttie': data.win == 0}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">A</template>
                    <template v-if="data.win == 2">B</template>
                    <template v-if="data.win == 3">C</template>
                    <template v-if="data.win == 4">D</template>
                    <template v-if="data.win == 5">E</template>
                    <template v-if="data.win == 6">F</template>
                    <template v-if="data.win == 0">T</template>
                </span>
            </template>
        </template>

        <template v-else-if="$store.state.casinoGameType == 'cmatch20'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span class="cricket20lastresult" :key="key" @click="showResult(data.mid)">
                    <img :src="`${imgPath}front/img/balls/ball${data.win}.png`">
                </span>
            </template>
        </template>

        <template v-else-if="$store.state.casinoGameType == 'cmeter'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span class="resultb" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">L</template>
                    <template v-if="data.win == 2">H</template>
                    <template v-if="data.win == 0">T</template>
                </span>
            </template>
        </template>

        <template v-else-if="$store.state.casinoGameType == 'queen'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span class="resultb" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">0</template>
                    <template v-else-if="data.win == 2">1</template>
                    <template v-else-if="data.win == 3">2</template>
                    <template v-else-if="data.win == 4">3</template>
                    <template v-else-if="data.win == 0">T</template>
                </span>
            </template>
        </template>

        <template v-else-if="$store.state.casinoGameType == 'race20'">
            <template v-for="(data, key) in $store.state.lastResults">
                <span :key="key" :class="[
                      { resulta: data.win == 1 },
                      { resultb: data.win == 2 },
                      { resulttie: data.win == 0 },
                    ]" @click="showResult(data.mid)">
                    <img v-if="data.win == 1" :src="imgPath + 'front/img/cards/spade.png'" />
                    <img v-if="data.win == 2" :src="imgPath + 'front/img/cards/heart.png'" />
                    <img v-if="data.win == 3" :src="imgPath + 'front/img/cards/club.png'" />
                    <img v-if="data.win == 4" :src="imgPath + 'front/img/cards/diamond.png'" />
                </span>
            </template>
        </template>

        <router-link class="result-more" :to="{name: 'casinoResult', params: {gameType: $store.state.casinoGameType}}">
            ...
        </router-link>

        <b-modal ref="detail-modal" modal-class="casino-result" hide-footer size="xl">
            <template #modal-title>
                {{ gameDetail.ename }} Result
            </template>
            <!-- CASINO -->
            <CasinoResult :resultData="gameDetail" />
            <template v-if="gameDetail.gType == 'kbc'">
                <AccountStatementSoda :gameSoda="gameSoda" :gtype="gameDetail.gType" :desc="gameDetail.rdesc"/>
            </template>
            <template v-else>
                <AccountStatementSoda :gameSoda="gameSoda" />
            </template>
        </b-modal>
    </div>
</template>

<script>
    import ServiceApi from "@/services/ServiceApi";
    import CasinoResult from '@/components/casino/results/CasinoResults'
    import AccountStatementSoda from '@/components/AccountStatementSoda'

    export default {
        components: {
            CasinoResult,
            AccountStatementSoda,
        },
        data() {
            return {
                imgPath: IMG_PATH,
                gameDetail: [],
                gameSoda: [],
                loading: false
            }
        },
        methods: {
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
        }
    }
</script>

<style>

</style>