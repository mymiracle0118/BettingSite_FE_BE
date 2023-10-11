<template>
    <div class="market-6">
        <div class="bet-table">
            <div class="bet-table-header" data-toggle="collapse" :data-target="`#market${index}`" aria-expanded="true">
                <!-- <span>Market 2</span> -->
                <div class="nation-name">
                    <span v-b-tooltip.hover :title="marketDataNew.mname">
                        <a href="javascript:void(0)" title="">
                            <img :src="imgPath + 'front/img/arrow-down.svg'" class="mr-1">
                        </a>
                        {{ marketDataNew.mname }}
                    </span>
                </div>
                <div class="lay lay-title bl-title d-none-mobile">No</div>
                <div class="back back-title bl-title d-none-mobile">Yes</div>
            </div>
            <div class="bet-table-body collapse show" :id="`market${index}`"
                :class="{'suspendedfull' : marketDataNew.gscode != 1}" :data-title="marketDataNew.status">
                <template v-for="(section, key1) in newMarketSections">
                    <div class="fancy-tripple" :key="`web${key1}`">
                        <div class="bet-table-mobile-row d-none-desktop">
                            <div class="bet-table-mobile-team-name">
                                <span
                                    @click="getBookData(marketDataNew.mid, section.sid, $parent.gameId, marketDataNew.gtype)">{{ section.nat }}</span>
                                <span v-fancybook="{mid: marketDataNew.mid, sid: section.sid}">0</span>
                            </div>
                        </div>
                        <template v-if="filterBy(section.odds, 'back1', 'oname').length">
                            <div class="bet-table-row" :data-title="section.gstatus"
                                :class="{'suspendedtext' : marketDataNew.gscode == 1 && section.gscode != 1}">
                                <div class="nation-name d-none-mobile">
                                    <p
                                        @click="getBookData(marketDataNew.mid, section.sid, $parent.gameId, marketDataNew.gtype)">
                                        {{ section.nat }}</p>
                                    <p class="mb-0" v-fancybook="{mid: marketDataNew.mid, sid: section.sid}">0</p>
                                </div>
                                <template
                                    v-for="(oddsData, key2) in filterBy(section.odds, 'lay1', 'oname')">
                                    <div class="bl-box lay" :key="`layodds${key2}`" :class="[{'no-val':oddsData.odds == 0},
                                    getClass(oddsData.odds, 'lay', oddsData.tno, key1 )]"
                                        @click="$parent.setBetData(oddsData.odds, oddsData.otype, section.sid, marketDataNew.mid, marketDataNew.mname, section.nat, marketDataNew.gtype, oddsData.size, 0, newMarketSections)">
                                        <span class="d-block odds"
                                            v-odds="{odds: oddsData.odds}">{{ oddsData.odds }}</span>
                                        <span class="d-block" v-if="oddsData.size != 0"
                                            v-kval="{size: oddsData.size}">{{ oddsData.size }}</span>
                                    </div>
                                </template>

                                <template
                                    v-for="(oddsData, key2) in filterBy(section.odds, 'back1', 'oname')">
                                    <div class="bl-box back" :key="`backodds${key2}`" :class="[{'no-val':oddsData.odds == 0},
                                    getClass(oddsData.odds, 'back', oddsData.tno, key1 )]"
                                        @click="$parent.setBetData(oddsData.odds, oddsData.otype, section.sid, marketDataNew.mid, marketDataNew.mname, section.nat, marketDataNew.gtype, oddsData.size, 0, newMarketSections)">
                                        <span class="d-block odds"
                                            v-odds="{odds: oddsData.odds}">{{ oddsData.odds }}</span>
                                        <span class="d-block" v-if="oddsData.size != 0"
                                            v-kval="{size: oddsData.size}">{{ oddsData.size }}</span>
                                    </div>
                                </template>
                                <div class="fancy-min-max">
                                    Min:<span v-kval="{size: section.min}">0</span> Max:<span v-kval="{size: section.max}">0</span>
                                </div>
                            </div>
                        </template>
                        <template v-if="filterBy(section.odds, 'back2', 'oname').length">
                            <div class="bet-table-row" :data-title="section.gstatus"
                                :class="{'suspendedtext' : marketDataNew.gscode == 1 && section.gscode != 1}">
                                <div class="nation-name d-none-mobile">

                                </div>
                                <template
                                    v-for="(oddsData, key2) in filterBy(section.odds, 'lay2', 'oname')">
                                    <div class="bl-box lay" :key="`layodds${key2}`" :class="[{'no-val':oddsData.odds == 0},
                                    getClass(oddsData.odds, 'lay', oddsData.tno, key1 )]"
                                        @click="$parent.setBetData(oddsData.odds, oddsData.otype, section.sid, marketDataNew.mid, marketDataNew.mname, section.nat, marketDataNew.gtype, oddsData.size, 0, newMarketSections)">
                                        <span class="d-block odds"
                                            v-odds="{odds: oddsData.odds}">{{ oddsData.odds }}</span>
                                        <span class="d-block" v-if="oddsData.size != 0"
                                            v-kval="{size: oddsData.size}">{{ oddsData.size }}</span>
                                    </div>
                                </template>
                                <template
                                    v-for="(oddsData, key2) in filterBy(section.odds, 'back2', 'oname')">
                                    <div class="bl-box back" :key="`backodds${key2}`" :class="[{'no-val':oddsData.odds == 0},
                                        getClass(oddsData.odds, 'back', oddsData.tno, key1 )]"
                                        @click="$parent.setBetData(oddsData.odds, oddsData.otype, section.sid, marketDataNew.mid, marketDataNew.mname, section.nat, marketDataNew.gtype, oddsData.size, 0, newMarketSections)">
                                        <span class="d-block odds"
                                            v-odds="{odds: oddsData.odds}">{{ oddsData.odds }}</span>
                                        <span class="d-block" v-if="oddsData.size != 0"
                                            v-kval="{size: oddsData.size}">{{ oddsData.size }}</span>
                                    </div>
                                </template>
                            </div>
                        </template>
                        <template v-if="filterBy(section.odds, 'back3', 'oname').length">
                            <div class="bet-table-row" :data-title="section.gstatus"
                                :class="{'suspendedtext' : marketDataNew.gscode == 1 && section.gscode != 1}">
                                <div class="nation-name d-none-mobile">

                                </div>
                                <template
                                    v-for="(oddsData, key2) in filterBy(section.odds, 'lay3', 'oname')">
                                    <div class="bl-box lay" :key="`layodds${key2}`" :class="[{'no-val':oddsData.odds == 0},
                                    getClass(oddsData.odds, 'lay', oddsData.tno, key1 )]"
                                        @click="$parent.setBetData(oddsData.odds, oddsData.otype, section.sid, marketDataNew.mid, marketDataNew.mname, section.nat, marketDataNew.gtype, oddsData.size, 0, newMarketSections)">
                                        <span class="d-block odds"
                                            v-odds="{odds: oddsData.odds}">{{ oddsData.odds }}</span>
                                        <span class="d-block" v-if="oddsData.size != 0"
                                            v-kval="{size: oddsData.size}">{{ oddsData.size }}</span>
                                    </div>
                                </template>
                                <template
                                    v-for="(oddsData, key2) in filterBy(section.odds, 'back3', 'oname')">
                                    <div class="bl-box back" :key="`backodds${key2}`" :class="[{'no-val':oddsData.odds == 0},
                                        getClass(oddsData.odds, 'back', oddsData.tno, key1 )]"
                                        @click="$parent.setBetData(oddsData.odds, oddsData.otype, section.sid, marketDataNew.mid, marketDataNew.mname, section.nat, marketDataNew.gtype, oddsData.size, 0, newMarketSections)">
                                        <span class="d-block odds"
                                            v-odds="{odds: oddsData.odds}">{{ oddsData.odds }}</span>
                                        <span class="d-block" v-if="oddsData.size != 0"
                                            v-kval="{size: oddsData.size}">{{ oddsData.size }}</span>
                                    </div>
                                </template>
                            </div>
                        </template>
                        <div class="market-message" v-if="section.rem && section.rem != ''" :key="`rem${key1}`">
                            {{ section.rem }}
                        </div>
                    </div>

                </template>
            </div>
        </div>

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
    </div>
</template>

<script>
    import ServiceApi from "@/services/ServiceApi";
    export default {
        name: "Market6",
        data() {
            return {
                imgPath: IMG_PATH,
                bookData: []
            }
        },
        computed: {
            newMarketSections() {
                return _.get(this.marketDataNew, 'section')
            },
            oldMarketSections() {
                return _.get(this.marketDataOld, 'section')
            }
        },
        mounted() {
            // console.log(this.marketDataNew, this.marketDataOld)
        },
        props: ['marketDataNew', 'marketDataOld', 'index'],
        methods: {
            getBookData(mid, sid, gmid, type) {
                if(type.toLowerCase() == 'fancy' || type.toLowerCase() == 'khado' || type.toLowerCase() == 'meter'){
                    ServiceApi.callApi("api/front/fancybookdata", {
                            gmid: parseInt(gmid),
                            mid: mid,
                            sid: sid,
                            type: type.toLowerCase()
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
                }
            },
            getClass(oddsNew, otype, oddsTno, sectionKey) {
                // console.log(oddsNew, sectionKey, otype, oddsTno)
                // console.log(this.oldMarketSections[sectionKey])
                if(this.oldMarketSections && this.oldMarketSections[sectionKey]){
                    let oddsObj = _.first(this.find(this.filterBy(_.get(this.oldMarketSections[sectionKey], 'odds'), otype,
                        'otype'), oddsTno, 'tno'))
                    // let oddsOld = _.get(oddsObj, 'odds')
                    let oddsOld = _.get(oddsObj, 'odds', oddsNew)
                    // console.log(oddsOld, oddsNew)
                    // console.log('+++++')

                    if (oddsOld < oddsNew)
                        return 'odds-up'
                    else if (oddsOld > oddsNew)
                        return 'odds-down'
                    else
                        return ''
                }else{
                    return ''
                }

            }
        }
    }
</script>