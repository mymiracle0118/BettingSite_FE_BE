<template>
    <div class="market-9">
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
                        <template v-if="newMarketSections.length > 0">
                            <span class="max-bet">Min:<span v-kval="{size: newMarketSections[0].min}"></span> Max:<span v-kval="{size: newMarketSections[0].max}"></span></span>
                        </template>
                    </div>
                    <div class="back bl-title d-none-mobile">Back</div>
                </div>
                <template v-for="(section, key1) in newMarketSections">
                    <div class="bet-table-mobile-row d-none-desktop" :key="`mobile${key1}`">
                        <div class="bet-table-mobile-team-name">{{ section.nat }}
                            <span class="float-right" v-sportbook="{mid: marketDataNew.mid, sid: section.sid}"></span>
                        </div>

                    </div>
                    <div class="bet-table-row" :key="`web${key1}`">
                        <div class="nation-name d-none-mobile">
                            <p class="">{{ section.nat }}</p>
                            <p class="mb-0" v-sportbook="{mid: marketDataNew.mid, sid: section.sid}"></p>
                        </div>
                        <template
                            v-for="(oddsData, key2) in orderBy(filterBy(section.odds, 'BACK', 'otype'), 'tno', -1)">
                            <div class="bl-box back" :key="`backodds${key2}`" :class="[{'no-val':oddsData.odds == 0},
                                getClass(oddsData.odds, 'BACK', oddsData.tno, key1 )]"
                                >
                                <span class="d-block odds" v-odds="{odds: oddsData.odds}">{{ oddsData.odds }}</span>
                                <span class="d-block" v-if="oddsData.size != 0" v-kval="{size: oddsData.size}">{{ oddsData.size }}</span>
                            </div>
                        </template>
                    </div>
                </template>
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