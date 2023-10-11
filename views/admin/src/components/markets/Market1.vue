<template>
    <div class="market-1">
        <div class="bet-table">
            <div class="bet-table-header" >
                <span v-b-tooltip.hover :title="marketDataNew.mname" data-toggle="collapse" :data-target="`#market${index}`">
                    <a href="#" title="">
                        <img :src="imgPath+'admin/img/arrow-down.svg'" class="mr-1">
                    </a>
                    {{ marketDataNew.mname }}
                </span>
                
                <div class="float-right">  
                    <span class="max-bet" v-if="marketDataNew.gtype == 'match'"><span v-kval="{size: marketDataNew.iplay ? marketDataNew.maxb : marketDataNew.umaxbof}" v-b-tooltip.hover :title="`Max : ${kval(marketDataNew.iplay ? marketDataNew.maxb : marketDataNew.umaxbof)}`"></span></span>
                    <span class="max-bet" v-else>Max:<span v-kval="{size: marketDataNew.iplay ? marketDataNew.maxb : marketDataNew.umaxbof}"></span></span>
                    
                    <!-- <span class="max-bet">Max:<span v-kval="{size: marketDataNew.maxb}"></span></span> -->
                    <a href="javascript:void(0)" class="btn btn-back" @click="$parent.getLockUserList(marketDataNew.mid, true)">Bet Lock</a>
                    <a v-if="marketDataNew.gtype == 'match' || marketDataNew.gtype == 'match1'" href="javascript:void(0)" class="btn btn-back" @click="$parent.getBookData(marketDataNew.mid, marketDataNew.gtype)">User Book</a>
                </div>
            </div>
            <div class="bet-table-body collapse show" :id="`market${index}`"
                :class="{'suspendedfull' : marketDataNew.gscode != 1}" :data-title="marketDataNew.status">
                <div class="bet-table-row">
                    <template v-for="(section, key1) in newMarketSections">
                        <div class="market-1-item" :key="`web${key1}`">
                            <div>
                                <span @click="getBookData(marketDataNew.mid, section.sid, $parent.gameId, marketDataNew.gtype)">{{ section.nat }}</span>
                                <template v-if="marketDataNew.gtype == 'khado'">
                                    <span class="ml-2" v-fancybook="{mid: marketDataNew.mid, sid: section.sid}">0</span>
                                </template>
                                <template v-else>
                                    <span class="ml-2" v-sportbook="{mid: marketDataNew.mid, sid: section.sid}">0</span>
                                </template>
                            </div>
                            <template
                                v-for="(oddsData, key2) in orderBy(filterBy(section.odds, 'BACK', 'otype'), 'tno', -1)">
                                <div class="bl-box back" :key="`backodds${key2}`" :class="[{'back':oddsData.tno == 0}, 
                                    {'back1':oddsData.tno == 1},
                                    {'back2':oddsData.tno == 2},
                                    {'no-val':oddsData.odds == 0},
                                    {'suspended' : marketDataNew.gscode == 1 && section.gscode != 1},
                                    getClass(oddsData.odds, 'BACK', oddsData.tno, key1 )]"
                                    >
                                    <span class="d-block odds" v-odds="{odds: oddsData.odds}">{{ oddsData.odds }}</span>
                                </div>
                            </template>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="remark" v-if="marketDataNew.rem != ''">{{ marketDataNew.rem }}</div>
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
                            <tr :class="{'back-border': data.amt >= 0, 'lay-border': data.amt < 0}" :key="key">
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
        name: "Market1",
        data(){
            return {
                imgPath: IMG_PATH,
                bookData: []
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
            getBookData(mid, sid, gmid, type) {
                ServiceApi.callApi("game/fancybookdata", {
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
            },
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