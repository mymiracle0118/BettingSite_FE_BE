<template>
    <div class="market-2">
        <div class="bet-table">
            <div class="bet-table-header" >
                <div class="nation-name" data-toggle="collapse" :data-target="`#market${index}`" aria-expanded="true">
                    <span v-b-tooltip.hover :title="marketDataNew.mname">
                        <a href="javascript:void(0)" title="">
                            <img :src="imgPath+'admin/img/arrow-down.svg'" class="mr-1">
                        </a>
                        {{ marketDataNew.mname }}
                    </span>
                </div>
               <!--  <div class="float-right"> 
                    <a href="javascript:void(0)" class="btn btn-back" @click="$parent.getLockUserList(marketDataNew.mid, true)">Bet Lock</a>
                    <a v-if="marketDataNew.gtype == 'match' || marketDataNew.gtype == 'match1'" href="javascript:void(0)" class="btn btn-back" @click="$parent.getBookData(marketDataNew.mid, marketDataNew.gtype)">User Book</a>
                </div> -->
            </div>

            <div class="bet-table-body collapse show" :id="`market${index}`"
                :class="{'suspendedfull' : marketDataNew.gscode != 1}" :data-title="marketDataNew.status">
                <div class="bet-table-row">
                    <div class="text-right nation-name">
                        <span class="max-bet" v-if="marketDataNew.gtype == 'match1'">Min:<span v-kval="{size: marketDataNew.min}"></span> Max:<span v-kval="{size: marketDataNew.max}"></span></span>
                        <span class="max-bet" v-else>Max:<span v-kval="{size: marketDataNew.maxb}"></span></span>
                    </div>
                    <div class="back bl-title d-none-mobile">Back</div>
                    <div class="lay bl-title d-none-mobile">Lay</div>
                </div>
                <template v-for="(section, key1) in newMarketSections">
                    <div class="bet-table-mobile-row d-none-desktop" :key="`mobile${key1}`">
                        <div class="bet-table-mobile-team-name">
                            <span>{{ section.nat }}</span>
                            <span v-sportbook="{mid: marketDataNew.mid, sid: section.sid}">0</span>
                        </div>
                    </div>
                    <div class="bet-table-row" :key="`web${key1}`" :data-title="section.gstatus"
                        :class="{'suspendedtext' : marketDataNew.gscode == 1 && section.gscode != 1}">
                        <div class="nation-name d-none-mobile">
                            <p class="">{{ section.nat }}</p>
                            <p class="mb-0" v-sportbook="{mid: marketDataNew.mid, sid: section.sid}">0</p>
                        </div>

                        <template
                            v-for="(oddsData, key2) in orderBy(filterBy(section.odds, 'BACK', 'otype'), 'tno', -1)">
                            <div class="bl-box back" :key="`backodds${key2}`" :class="[{'back':oddsData.tno == 0}, 
                                {'back1':oddsData.tno == 1},
                                {'back2':oddsData.tno == 2},
                                {'no-val':oddsData.odds == 0},
                                getClass(oddsData.odds, 'BACK', oddsData.tno, key1 )]"
                                >
                                <span class="d-block odds" v-odds="{odds: oddsData.odds}">{{ oddsData.odds }}</span>
                                <span class="d-block" v-if="oddsData.size != 0 && oddsData.odds != 0" v-kval="{size: oddsData.size}">{{ oddsData.size }}</span>
                            </div>
                        </template>

                        <template v-for="(oddsData, key2) in orderBy(filterBy(section.odds, 'LAY', 'otype'), 'tno')">
                            <div class="bl-box lay" :key="`layodds${key2}`" :class="[{'lay':oddsData.tno == 0}, 
                                {'lay1':oddsData.tno == 1},
                                {'lay2':oddsData.tno == 2},
                                {'no-val':oddsData.odds == 0},
                                getClass(oddsData.odds, 'LAY', oddsData.tno, key1 )]"
                               >
                                <span class="d-block odds" v-odds="{odds: oddsData.odds}">{{ oddsData.odds }}</span>
                                <span class="d-block" v-if="oddsData.size != 0 && oddsData.odds != 0" v-kval="{size: oddsData.size}">{{ oddsData.size }}</span>
                            </div>
                        </template>

                    </div>
                </template>
            </div>
        </div>
        <div class="remark" v-if="marketDataNew.rem != ''">{{ marketDataNew.rem }}</div>
    </div>
</template>

<script>
    export default {
        name: "Market2",
        data(){
            return {
                imgPath: IMG_PATH,
            }
        },
        computed: {
            newMarketSections(){
                return _.orderBy(_.get(this.marketDataNew, 'section'), 'sno')
            },
            oldMarketSections(){
                return _.orderBy(_.get(this.marketDataOld, 'section'), 'sno')
            }
        },
        mounted(){
            // console.log(this.marketDataNew, this.marketDataOld)
        },
        props: ['marketDataNew', 'marketDataOld', 'index'],
        methods:{
            getClass(oddsNew, otype, oddsTno, sectionKey){
                // console.log(oddsNew, sectionKey, otype, oddsTno)
                // console.log(this.oldMarketSections[sectionKey])

                let oddsObj = _.first(this.find(this.filterBy(_.get(this.oldMarketSections[sectionKey], 'odds'), otype, 'otype'), oddsTno, 'tno'))
                // let oddsOld = _.get(oddsObj, 'odds')
                let oddsOld = _.get(oddsObj, 'odds', oddsNew)
                // console.log(oddsOld, oddsNew)
                // console.log('+++++')
                
                if(oddsOld < oddsNew)
                    return 'bg-success'
                else if(oddsOld > oddsNew)
                    return 'bg-danger'
                else
                    return ''
                
                
            }
        }
    }
</script>