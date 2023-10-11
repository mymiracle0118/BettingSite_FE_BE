<template>
    <div class="casino-video-last-results" v-if="gtype" :class="{ 'hide-lr': !showResults }">
        <template v-if="gtype == 'race17'">
            <template v-for="(data, key) in lastResults">
                <span :class="[{'resulta': data.win == 1}, 
                              {'resultb': data.win == 2}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">Y</template>
                    <template v-if="data.win == 0">N</template>
                </span>
            </template>
        </template>

        <template v-else-if="gtype == 'teen20b' 
                || gtype == 'trap' 
                || gtype == 'patti2' 
                || gtype == 'teensin' 
                || gtype == 'teenmuf'
                || gtype == 'teen'
                || gtype == 'teen20'
                || gtype == 'teen6'
                || gtype == 'teen2024'
                || gtype == 'poker20'
                || gtype == 'poker'
                || gtype == 'vteen'
                || gtype == 'vteen20'">
            <template v-for="(data, key) in lastResults">
                <span :class="[{'resulta': data.win == 1}, 
                              {'resultb': data.win == 2}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">A</template>
                    <template v-if="data.win == 2">B</template>
                    <template v-if="data.win == 0">T</template>
                </span>
            </template>
        </template>

        <template v-else-if="gtype == 'teen1' 
                || gtype == 'teen120'">
            <template v-for="(data, key) in lastResults">
                <span :class="[{'resulta': data.win == 1}, 
                              {'resultb': data.win == 2}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">P</template>
                    <template v-else-if="data.win == 2">D</template>
                    <template v-else>T</template>
                </span>
            </template>
        </template>

        <template v-else-if="gtype == 'teen8'">
            <template v-for="(data, key) in lastResults">
                <span class="resulttie" :key="key" @click="showResult(data.mid)">R</span>
            </template>
        </template>

        <template v-else-if="gtype == 'teen9'">
            <template v-for="(data, key) in lastResults">
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

        <template v-else-if="gtype == 'trio'">
            <template v-for="(data, key) in lastResults">
                <span :key="key" @click="showResult(data.mid)">
                    R
                </span>
            </template>
        </template>

        <template v-else-if="gtype == 'superover'">
            <template v-for="(data, key) in lastResults">
                <span :class="[{'resulta': data.win == 1}, 
                            {'resultb': data.win == 2}, 
                            {'resulttie': data.win == 0}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">E</template>
                    <template v-if="data.win == 2">R</template>
                    <template v-if="data.win == 0">T</template>
                </span>
            </template>
        </template>

        <template v-else-if="gtype == 'cricketv3'">
            <template v-for="(data, key) in lastResults">
                <span :class="[{'resulta': data.win == 1}, 
                            {'resultb': data.win == 2}, 
                            {'resulttie': data.win == 0}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">A</template>
                    <template v-if="data.win == 2">I</template>
                    <template v-if="data.win == 0">T</template>
                </span>
            </template>
        </template>

        <template v-else-if="gtype == 'poker6'">
            <template v-for="(data, key) in lastResults">
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

        <template v-else-if="gtype == 'baccarat' || gtype == 'baccarat2'">
            <template v-for="(data, key) in lastResults">
                <span :class="[{'resulta': data.win == 1}, 
                        {'resultb': data.win == 2},
                        {'resulttie': data.win == 3}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">P</template>
                    <template v-else-if="data.win == 2 || data.win == 4">B</template>
                    <template v-else>T</template>
                </span>
            </template>
        </template>

        <template v-else-if="gtype == 'dt6'">
            <template v-for="(data, key) in lastResults">
                <span :class="[{'resulta': data.win == 1}, 
                            {'resultb': data.win == 2}, 
                            {'resulttie': data.win == 0}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">D</template>
                    <template v-if="data.win == 2">T</template>
                    <template v-if="data.win == 0">T</template>
                </span>
            </template>
        </template>

        <template v-else-if="gtype == 'dtl20'">
            <template v-for="(data, key) in lastResults">
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

        <template v-else-if="gtype == 'dt20' 
            || gtype == 'dt202'">
            <template v-for="(data, key) in lastResults">
                <span :class="[{'resulta': data.win == 1}, 
                            {'resultb': data.win == 2}, 
                            {'resulttie': data.win == 3}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">D</template>
                    <template v-if="data.win == 2">T</template>
                    <template v-if="data.win == 3">T</template>
                </span>
            </template>
        </template>

        <template v-else-if="gtype == 'card32' 
            || gtype == 'card32eu'">
            <template v-for="(data, key) in lastResults">
                <span class="resultb" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">8</template>
                    <template v-if="data.win == 2">9</template>
                    <template v-if="data.win == 3">10</template>
                    <template v-if="data.win == 4">11</template>
                </span>
            </template>
        </template>

        <template v-else-if="gtype == 'abj'">
            <template v-for="(data, key) in lastResults">
                <span :class="[{'resulta': data.win == 1}, 
                    {'resultb': data.win == 2}, 
                    {'resulttie': data.win == 0}]" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">A</template>
                    <template v-if="data.win == 2">B</template>
                    <template v-if="data.win == 0">T</template>
                </span>
            </template>
        </template>

        <template v-else-if="gtype == 'lucky7' 
                || gtype == 'lucky7eu' 
                || gtype == 'lucky7eu2'">
            <template v-for="(data, key) in lastResults">
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
        <template v-else-if="gtype == 'worli' 
            || gtype == 'worli2' 
            || gtype == 'war'
            || gtype == '3cardj'
            || gtype == 'ab20'
            || gtype == 'notenum'
            || gtype == 'kbc'">
            <template v-for="(data, key) in lastResults">
                <span class="resultb" :key="key" @click="showResult(data.mid)">
                    R
                </span>
            </template>
        </template>

        <template v-else-if="gtype == 'aaa'">
            <template v-for="(data, key) in lastResults">
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

        <template v-else-if="gtype == 'btable'">
            <template v-for="(data, key) in lastResults">
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

        <template v-else-if="gtype == 'cmatch20'">
            <template v-for="(data, key) in lastResults">
                <span class="cricket20lastresult" :key="key" @click="showResult(data.mid)">
                    <img :src="`${imgPath}front/img/balls/ball${data.win}.png`">
                </span>
            </template>
        </template>

        <template v-else-if="gtype == 'cmeter'">
            <template v-for="(data, key) in lastResults">
                <span class="resultb" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">L</template>
                    <template v-if="data.win == 2">H</template>
                    <template v-if="data.win == 0">T</template>
                </span>
            </template>
        </template>

        <template v-else-if="gtype == 'queen'">
            <template v-for="(data, key) in lastResults">
                <span class="resultb" :key="key" @click="showResult(data.mid)">
                    <template v-if="data.win == 1">0</template>
                    <template v-else-if="data.win == 2">1</template>
                    <template v-else-if="data.win == 3">2</template>
                    <template v-else-if="data.win == 4">3</template>
                    <template v-else-if="data.win == 0">T</template>
                </span>
            </template>
        </template>

        <template v-else-if="gtype == 'race20'">
            <template v-for="(data, key) in lastResults">
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

        <template v-else-if="gtype == 'lottcard'">
            <template v-for="(data, key) in lastResults">
                <span class="resultb" :key="key" @click="showResult(data.mid)">{{ data.win}}</span>
            </template>
        </template>

        <router-link class="result-more" :to="{name: 'CasinoResult', params: {gtype: gtype}}">
            ...
        </router-link>

        <b-modal ref="detail-modal" modal-class="casino-result" hide-footer size="xl" :title="detailTitle+' Result'">
            <!-- CASINO -->
            <CasinoResult :resultData="gameDetail" />
            <AccountStatementSoda :gameSoda="gameSoda" :desc="gameDetail.rdesc" />
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
        props:['gtype', 'lastResults', 'showResults'],
        data() {
            return {
                imgPath: IMG_PATH,
                gameDetail: [],
                gameSoda: [],
                loading: false,
                detailTitle: ""
            }
        },
        methods: {
            showResult(mid) {
                if (this.loading)
                    return
                this.$store.state.isLoading = true;
                ServiceApi.callApi("accstatepopup", {
                    'gmid': 0,
                    'mid': mid,
                    'gtype': this.gtype,
                    'dtype': 'cs'
                })
                .then(response => {
                    if (response.status == 200) {
                        this.gameDetail = _.get(response.data, 't1') ? _.get(response.data, 't1') : {}
                        Vue.set(this.gameDetail, 'gType', this.gtype)
                        Vue.set(this.gameDetail, 'dType', 'cs')
                        this.detailTitle = this.gameDetail.ename ? this.gameDetail.ename : ""
                        this.gameSoda = _.get(response.data, 't2')

                        this.$refs['detail-modal'].show()
                        this.$store.state.isLoading = false
                    } else {
                        this.gameDetail = {}
                        this.gameSoda = []
                        this.$store.state.isLoading = false
                    }
                })
                .catch(e => {
                    this.gameDetail = {}
                    this.gameSoda = []
                    this.$store.state.isLoading = false
                });
            },
        }
    }
</script>

<style>

</style>