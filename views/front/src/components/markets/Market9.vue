<template>
    <div class="market-9">
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
                    <span class="max-bet" v-if="newMarketSections && newMarketSections.length">Min:<span v-kval="{size: newMarketSections[0].min}"></span> Max:<span v-kval="{size: newMarketSections[0].max}"></span></span>
                </div>
                <div class="back bl-title d-none-mobile back-title">Back</div>
            </div>
            <div class="bet-table-body collapse show" :id="`market${index}`"
                :class="{'suspendedfull' : marketDataNew.gscode != 1}" :data-title="marketDataNew.status">
                <template v-for="(section, key1) in newMarketSections">
                    <div class="bet-table-mobile-row d-none-desktop" :key="`mobile${key1}`">
                        <div class="bet-table-mobile-team-name">{{ section.nat }}</div>
                        <p class="mb-0" v-sportbook="{mid: marketDataNew.mid, sid: section.sid}">0</p>
                    </div>
                    <div class="bet-table-row" :key="`web${key1}`">
                        <div class="nation-name d-none-mobile">
                            <p class="">{{ section.nat }}
                                <span class="float-right" v-livebook="{mid: marketDataNew.mid, sid: section.sid}">0</span>
                            </p>
                            <p class="mb-0" v-sportbook="{mid: marketDataNew.mid, sid: section.sid}">0</p>
                        </div>
                        <template
                            v-for="(oddsData, key2) in filterBy(section.odds, 'back', 'otype')">
                            <div class="bl-box back" :key="`backodds${key2}`" :class="[{'no-val':oddsData.odds == 0},
                                {'suspended' : marketDataNew.gscode == 1 && section.gscode != 1},
                                getClass(oddsData.odds, 'back', oddsData.tno, key1 )]"
                                @click="$parent.setBetData(oddsData.odds, oddsData.otype, section.sid, marketDataNew.mid, marketDataNew.mname, section.nat, marketDataNew.gtype, 0, 0, newMarketSections)">
                                <span class="d-block odds" v-odds="{odds: oddsData.odds}">{{ oddsData.odds }}</span>
                                <span class="d-block" v-if="oddsData.size != 0" v-kval="{size: oddsData.size}">{{ oddsData.size }}</span>
                            </div>
                        </template>
                    </div>
                </template>
            </div>
        </div>

        <div class="market-message" v-if="marketDataNew.rem && marketDataNew.rem != ''">
            {{ marketDataNew.rem }}
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
        name: "Market9",
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