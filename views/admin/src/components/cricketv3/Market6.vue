<template>
    <div class="market-6">
        <div class="bet-table">
            <div class="bet-table-header" >
                <!-- <span>Market 2</span> -->
                <div class="nation-name" data-toggle="collapse" :data-target="`#market${index}`" aria-expanded="true">
                    <span v-b-tooltip.hover :title="marketDataNew.mname">
                        <a href="javascript:void(0)" title="">
                            <img :src="imgPath+'admin/img/arrow-down.svg'" class="mr-1">
                        </a>
                        {{ marketDataNew.mname }}
                    </span>
                </div>
                <!-- <div class="float-right">
                    <a href="javascript:void(0)" class="btn btn-back" @click="$parent.getLockUserList(marketDataNew.mid, true)">Bet Lock</a>
                   
                </div> -->
            </div>
            <div class="bet-table-body collapse show" :id="`market${index}`"
                :class="{'suspendedfull' : marketDataNew.gscode != 1}" :data-title="marketDataNew.status">
                <div class="bet-table-row">
                    <div class="text-right nation-name">
                       
                    </div>
                    <div class="lay bl-title d-none-mobile">No</div>
                    <div class="back bl-title d-none-mobile">Yes</div>
                </div>
                <template v-for="(section, key1) in newMarketSections">
                    <div class="fancy-tripple" :key="`web${key1}`">
                        <div class="bet-table-mobile-row d-none-desktop">
                            <div class="bet-table-mobile-team-name">
                                <span
                                    @click="getBookData(marketDataNew.mid, section.sid, $parent.gameId, marketDataNew.gtype)">{{ section.nat }}</span>
                                <span v-fancybook="{mid: marketDataNew.mid, sid: section.sid}">0</span>
                            </div>
                        </div>
                        <template v-if="filterBy(section.odds, 'BACK1', 'oname').length">
                            <div class="bet-table-row" :data-title="section.gstatus"
                                :class="{'suspendedtext' : marketDataNew.gscode == 1 && section.gscode != 1}">
                                <div class="nation-name d-none-mobile">
                                    <p @click="getBookData(marketDataNew.mid, section.sid, $parent.gameId, marketDataNew.gtype)">{{ section.nat }}</p>
                                    <p class="mb-0" v-fancybook="{mid: marketDataNew.mid, sid: section.sid}">0</p>
                                </div>
                                <template
                                    v-for="(oddsData, key2) in orderBy(filterBy(section.odds, 'LAY1', 'oname'), 'tno', -1)">
                                    <div class="bl-box lay" :key="`layodds${key2}`" :class="[{'no-val':oddsData.odds == 0},
                                    getClass(oddsData.odds, 'LAY', oddsData.tno, key1 )]"
                                        >
                                        <span class="d-block odds"
                                            v-odds="{odds: oddsData.odds}">{{ oddsData.odds }}</span>
                                        <span class="d-block" v-if="oddsData.size != 0 && oddsData.odds != 0"
                                            v-kval="{size: oddsData.size}">{{ oddsData.size }}</span>
                                    </div>
                                </template>

                                <template
                                    v-for="(oddsData, key2) in orderBy(filterBy(section.odds, 'BACK1', 'oname'), 'tno', -1)">
                                    <div class="bl-box back" :key="`backodds${key2}`" :class="[{'no-val':oddsData.odds == 0},
                                    getClass(oddsData.odds, 'BACK', oddsData.tno, key1 )]"
                                        >
                                        <span class="d-block odds"
                                            v-odds="{odds: oddsData.odds}">{{ oddsData.odds }}</span>
                                        <span class="d-block" v-if="oddsData.size != 0 && oddsData.odds != 0"
                                            v-kval="{size: oddsData.size}">{{ oddsData.size }}</span>
                                    </div>
                                </template>
                                <div class="fancy-min-max">
                                    Min:<span v-kval="{size: section.min}"></span> Max:<span v-kval="{size: section.max}"></span>
                                </div>
                            </div>
                        </template>
                        <template v-if="filterBy(section.odds, 'BACK2', 'oname').length">
                            <div class="bet-table-row" :data-title="section.gstatus"
                                :class="{'suspendedtext' : marketDataNew.gscode == 1 && section.gscode != 1}">
                                <div class="nation-name d-none-mobile">

                                </div>
                                <template
                                    v-for="(oddsData, key2) in orderBy(filterBy(section.odds, 'LAY2', 'oname'), 'tno', -1)">
                                    <div class="bl-box lay" :key="`layodds${key2}`" :class="[{'no-val':oddsData.odds == 0},
                                    getClass(oddsData.odds, 'LAY', oddsData.tno, key1 )]"
                                        >
                                        <span class="d-block odds"
                                            v-odds="{odds: oddsData.odds}">{{ oddsData.odds }}</span>
                                        <span class="d-block" v-if="oddsData.size != 0 && oddsData.odds != 0"
                                            v-kval="{size: oddsData.size}">{{ oddsData.size }}</span>
                                    </div>
                                </template>
                                <template
                                    v-for="(oddsData, key2) in orderBy(filterBy(section.odds, 'BACK2', 'oname'), 'tno', -1)">
                                    <div class="bl-box back" :key="`backodds${key2}`" :class="[{'no-val':oddsData.odds == 0},
                                        getClass(oddsData.odds, 'BACK', oddsData.tno, key1 )]"
                                        >
                                        <span class="d-block odds"
                                            v-odds="{odds: oddsData.odds}">{{ oddsData.odds }}</span>
                                        <span class="d-block" v-if="oddsData.size != 0 && oddsData.odds != 0"
                                            v-kval="{size: oddsData.size}">{{ oddsData.size }}</span>
                                    </div>
                                </template>
                            </div>
                        </template>
                        <template v-if="filterBy(section.odds, 'BACK3', 'oname').length">
                            <div class="bet-table-row" :data-title="section.gstatus"
                                :class="{'suspendedtext' : marketDataNew.gscode == 1 && section.gscode != 1}">
                                <div class="nation-name d-none-mobile">

                                </div>
                                <template
                                    v-for="(oddsData, key2) in orderBy(filterBy(section.odds, 'LAY3', 'oname'), 'tno', -1)">
                                    <div class="bl-box lay" :key="`layodds${key2}`" :class="[{'no-val':oddsData.odds == 0},
                                    getClass(oddsData.odds, 'LAY', oddsData.tno, key1 )]"
                                        >
                                        <span class="d-block odds"
                                            v-odds="{odds: oddsData.odds}">{{ oddsData.odds }}</span>
                                        <span class="d-block" v-if="oddsData.size != 0 && oddsData.odds != 0"
                                            v-kval="{size: oddsData.size}">{{ oddsData.size }}</span>
                                    </div>
                                </template>
                                <template
                                    v-for="(oddsData, key2) in orderBy(filterBy(section.odds, 'BACK3', 'oname'), 'tno', -1)">
                                    <div class="bl-box back" :key="`backodds${key2}`" :class="[{'no-val':oddsData.odds == 0},
                                        getClass(oddsData.odds, 'BACK', oddsData.tno, key1 )]"
                                       >
                                        <span class="d-block odds"
                                            v-odds="{odds: oddsData.odds}">{{ oddsData.odds }}</span>
                                        <span class="d-block" v-if="oddsData.size != 0 && oddsData.odds != 0"
                                            v-kval="{size: oddsData.size}">{{ oddsData.size }}</span>
                                    </div>
                                </template>
                            </div>
                        </template>
                    </div>
                    <div class="sec-remark" v-if="section.rem != ''">{{ section.rem }}</div>
                </template>

            </div>
        </div>
        <b-modal ref="fancyBookModal" hide-footer title="Run Amount" class="">
           
            <div class="table-responsive">
              <table class="table table-bordered">
                  <thead>
                      <tr>
                          <th>Run</th>
                          <th>Amount</th>
                      </tr>
                  </thead>
                  <tbody>
                      <template v-if="bookData != null && bookData.length > 0">
                        <template v-for="(book, index) in bookData">
                        <tr :class="{'back-border': book.amt >= 0, 'lay-border': book.amt < 0}">
                            <td>{{ book.run }}</td>
                            <td>{{ book.amt }}</td>
                        </tr> 
                        </template>
                      </template>
                      <template v-else>
                      <tr>
                        <td colspan="2" class="text-center">No record found</td>
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
            getBookData(mid, sid, gmid, type) {
                //this.$store.state.isLoading = true;
                ServiceApi.callApi("game/fancybookdata", {
                    gmid: parseInt(gmid),
                    mid: mid,
                    sid: sid,
                    type: type.toLowerCase()
                })
                .then(response => {
                    if (response.status == 200) {
                        this.bookData = response.data
                    }else{
                        this.bookData = []
                    }
                    this.$refs['fancyBookModal'].show();
                    this.$store.state.isLoading = false;
                })
                .catch(e => {
                    this.bookData = []
                    this.$store.state.isLoading = false;
                });
            },
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