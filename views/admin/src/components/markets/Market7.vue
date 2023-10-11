<template>
    <div class="market-6">
        <div class="bet-table">
            <div class="bet-table-header">
                <!-- <span>Market 2</span> -->
                <div class="nation-name" data-toggle="collapse" :data-target="`#market${index}`" aria-expanded="true">
                    <span v-b-tooltip.hover :title="marketDataNew.mname">
                        <a href="javascript:void(0)" title="">
                            <img :src="imgPath + 'front/img/arrow-down.svg'" class="mr-1">
                        </a>
                        {{ marketDataNew.mname }}
                    </span>
                </div>
                <div class="float-right">
                    <a href="javascript:void(0)" class="btn btn-back" @click="$parent.getLockUserList(marketDataNew.mid, true)">Bet Lock</a>
                    
                </div>
            </div>
            <div class="bet-table-body collapse show" :id="`market${index}`"
                :class="{'suspendedfull' : marketDataNew.gscode != 1}" :data-title="marketDataNew.status">
                <div class="bet-table-row">
                    <div class="text-right nation-name">
                       
                    </div>
                    <div class="back bl-title d-none-mobile">Back</div>
                    <div class="lay bl-title d-none-mobile">Lay</div>
                </div>
                <template v-for="(section, key1) in newMarketSections">    
                    <div class="fancy-tripple" :key="`web${key1}`">
                        <div class="bet-table-mobile-row d-none-desktop">
                            <div class="bet-table-mobile-team-name">
                                <span @click="getBookData(marketDataNew.mid, section.sid, $parent.gameId, marketDataNew.gtype)">{{ section.nat }}</span>
                                <span v-fancybook="{mid: marketDataNew.mid, sid: section.sid}">0</span>
                            </div>
                        </div>
                        <div class="bet-table-row" :data-title="section.gstatus"
                            :class="{'suspendedtext' : marketDataNew.gscode == 1 && section.gscode != 1}">
                            <div class="nation-name d-none-mobile">
                                <p class="">{{ section.nat }}</p>
                                <p class="mb-0" v-fancybook="{mid: marketDataNew.mid, sid: section.sid}">0</p>
                            </div>
                            <template v-for="(oddsData, key2) in orderBy(filterBy(section.odds, 'BACK1', 'oname'), 'tno', -1)">
                                <div class="bl-box back" :key="`backodds${key2}`" :class="[{'no-val':oddsData.odds == 0},
                                getClass(oddsData.odds, 'BACK', oddsData.tno, key1 )]"
                                @click="$parent.setBetData(oddsData.odds, oddsData.otype, section.sid, marketDataNew.mid, marketDataNew.mname, section.nat, marketDataNew.gtype, oddsData.size)">
                                    <span class="d-block odds" v-odds="{odds: oddsData.odds}">{{ oddsData.odds }}</span>
                                    <span class="d-block" v-if="oddsData.size != 0" v-kval="{size: oddsData.size}">{{ oddsData.size }}</span>
                                </div>
                            </template>
                            <template v-for="(oddsData, key2) in orderBy(filterBy(section.odds, 'LAY1', 'oname'), 'tno', -1)">
                                <div class="bl-box lay" :key="`layodds${key2}`" :class="[{'no-val':oddsData.odds == 0},
                                getClass(oddsData.odds, 'LAY', oddsData.tno, key1 )]"
                                @click="$parent.setBetData(oddsData.odds, oddsData.otype, section.sid, marketDataNew.mid, marketDataNew.mname, section.nat, marketDataNew.gtype, oddsData.size)">
                                    <span class="d-block odds" v-odds="{odds: oddsData.odds}">{{ oddsData.odds }}</span>
                                    <span class="d-block" v-if="oddsData.size != 0" v-kval="{size: oddsData.size}">{{ oddsData.size }}</span>
                                </div>
                            </template>

                            <div class="fancy-min-max">
                                Min:<span v-kval="{size: section.min}">0</span> Max:<span v-kval="{size: section.max}">0</span>
                            </div>
                        </div>

                    </div>
                    <div class="sec-remark" v-if="section.rem != ''">{{ section.rem }}</div>
                </template>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Market7",
        data(){
            return {
                imgPath: IMG_PATH,
            }
        },
        computed: {
            newMarketSections() {
                return _.orderBy(_.get(this.marketDataNew, 'section'), 'sno')
            },
            oldMarketSections() {
                return _.orderBy(_.get(this.marketDataOld, 'section'), 'sno')
            }
        },
        mounted() {
            // console.log(this.marketDataNew, this.marketDataOld)
        },
        props: ['marketDataNew', 'marketDataOld', 'index'],
        methods: {
            getClass(oddsNew, otype, oddsTno, sectionKey) {
                // console.log(oddsNew, sectionKey, otype, oddsTno)
                // console.log(this.oldMarketSections[sectionKey])

                let oddsObj = _.first(this.find(this.filterBy(_.get(this.oldMarketSections[sectionKey], 'odds'), otype,
                    'otype'), oddsTno, 'tno'))
                // let oddsOld = _.get(oddsObj, 'odds')
                let oddsOld = _.get(oddsObj, 'odds', oddsNew)
                // console.log(oddsOld, oddsNew)
                // console.log('+++++')

                if (oddsOld < oddsNew)
                    return 'bg-success'
                else if (oddsOld > oddsNew)
                    return 'bg-danger'
                else
                    return ''


            }
        }
    }
</script>