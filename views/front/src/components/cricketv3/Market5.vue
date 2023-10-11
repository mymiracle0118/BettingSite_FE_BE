<template>
    <div class="market-5">
        <div class="bet-table">
            <div class="bet-table-header" data-toggle="collapse" :data-target="`#market${index}`" aria-expanded="true">
                <div class="nation-name">
                    <span v-b-tooltip.hover :title="marketDataNew.mname">
                        <a href="javascript:void(0)" title="">
                            <img :src="imgPath + 'front/img/arrow-down.svg'" class="mr-1">
                        </a>
                        {{ marketDataNew.mname }}
                    </span>
                    <span class="max-bet" v-if="marketDataNew.gtype == 'match1'">Min:<span v-kval="{size: marketDataNew.min}"></span> Max:<span v-kval="{size: marketDataNew.max}"></span></span>
                    <span class="max-bet" v-else-if="marketDataNew.gtype == 'match'"><span v-kval="{size: marketDataNew.maxb}" v-b-tooltip.hover :title="`Max : ${kval(marketDataNew.maxb)}`"></span></span>
                    <span class="max-bet" v-else>Max:<span v-kval="{size: marketDataNew.maxb}"></span></span>
                </div>
                <div class="back back-title bl-title d-none-mobile">Back</div>
                <div class="lay lay-title bl-title d-none-mobile">Lay</div>
            </div>
            <div class="bet-table-body collapse show" :id="`market${index}`"
                :class="{'suspendedfull' : marketDataNew.gscode != 1}" :data-title="marketDataNew.status">
                <template v-for="(section, key1) in newMarketSections">
                    <div class="bet-table-mobile-row d-none-desktop" :key="`mobile${key1}`">
                        <div class="bet-table-mobile-team-name">{{ section.nat }}</div>
                    </div>
                    <div class="bet-table-row" :key="`web${key1}`" :data-title="section.gstatus"
                        :class="{'suspendedtext' : marketDataNew.gscode == 1 && section.gscode != 1}">
                        <div class="nation-name d-none-mobile">
                            <p class="">
                                <span>{{ section.nat }}</span>
                                <!-- <span v-sportbook="{mid: marketDataNew.mid, sid: section.sid}">0</span> -->
                            </p>
                            <p class="mb-0" v-sportbook="{mid: marketDataNew.mid, sid: section.sid}">0</p>
                        </div>
                        <template
                            v-for="(oddsData, key2) in orderBy(filterBy(section.odds, 'back', 'otype'), 'tno', -1)">
                            <div class="bl-box back" :key="`backodds${key2}`" :class="[{'back':oddsData.tno == 0}, 
                                {'back1':oddsData.tno == 1},
                                {'back2':oddsData.tno == 2},
                                {'no-val':oddsData.odds == 0},
                                getClass(oddsData.odds, 'back', oddsData.tno, key1 )]"
                                @click="$parent.setBetData(oddsData.odds, oddsData.otype, section.sid, marketDataNew.mid, marketDataNew.mname, section.nat, marketDataNew.gtype, 0, 0, newMarketSections)">
                                <span class="d-block odds" v-odds="{odds: oddsData.odds}">{{ oddsData.odds }}</span>
                                <span class="d-block" v-if="oddsData.size != 0 && oddsData.odds != 0" v-kval="{size: oddsData.size}">{{ oddsData.size }}</span>
                            </div>
                        </template>

                        <template v-for="(oddsData, key2) in orderBy(filterBy(section.odds, 'lay', 'otype'), 'tno')">
                            <div class="bl-box lay" :key="`layodds${key2}`" :class="[{'lay':oddsData.tno == 0}, 
                                {'lay1':oddsData.tno == 1},
                                {'lay2':oddsData.tno == 2},
                                {'no-val':oddsData.odds == 0},
                                getClass(oddsData.odds, 'lay', oddsData.tno, key1 )]"
                                @click="$parent.setBetData(oddsData.odds, oddsData.otype, section.sid, marketDataNew.mid, marketDataNew.mname, section.nat, marketDataNew.gtype, 0, 0, newMarketSections)">
                                <span class="d-block odds" v-odds="{odds: oddsData.odds}">{{ oddsData.odds }}</span>
                                <span class="d-block" v-if="oddsData.size != 0 && oddsData.odds != 0" v-kval="{size: oddsData.size}">{{ oddsData.size }}</span>
                            </div>
                        </template>
                    </div>
                </template>
            </div>
        </div>

        <div class="market-message" v-if="marketDataNew.rem && marketDataNew.rem != ''">
            {{ marketDataNew.rem }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "Market5",
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
            kval(value) {
                let kvalue = value
                let number
                if (value >= 1000) {
                    number = parseFloat(value / 1000).toFixed(1);
                    kvalue = parseFloat(number) + 'K'
                } else {
                    kvalue = parseFloat(kvalue)
                }
                return kvalue;
            },
            getClass(oddsNew, otype, oddsTno, sectionKey) {
                // console.log(oddsNew, sectionKey, otype, oddsTno)
                // console.log(this.oldMarketSections[sectionKey])
                if(this.oldMarketSections && this.oldMarketSections[sectionKey]){
                    let oddsObj = _.first(this.find(this.filterBy(_.get(this.oldMarketSections[sectionKey], 'odds'), otype, 'otype'),
                        oddsTno, 'tno'))
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