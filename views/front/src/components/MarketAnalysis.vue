<template>
    <div>
        <template v-for="(data, key) in marketAnalysis.t1">
            <div class="my-market-box" :key="`game-${key}`" @click="gotoDetail(data.etid, data.gmid, data.iscc, data.shlight)">
                <div class="my-market-box-title" :class="`sport${data.etid}`">
                    <span>{{ data.etname }} -> {{ data.gname }}</span>
                    <span>{{ changeDateFormat(data.stime) }}</span>
                </div>
                <div class="my-market-box-desc">
                    <template v-for="(market, key1) in data.mdata">
                        <div class="row row5 mt-1" :key="key1">
                            <div class="col-6">{{ market.mname }}</div>
                            <div class="col-6 text-right">{{ market.cntsoda }}</div>
                        </div>
                    </template>
                </div>
            </div>
        </template>
        <template v-for="(data, key) in marketAnalysis.t2">
            <div class="my-market-box" :key="`dabba-${key}`">
                <div class="my-market-box-title" :class="`sport${data.etid}`">
                    <span>{{ data.etname }} -> {{ data.gname }} / Player Battle</span>
                    <span>{{ changeDateFormat(data.stime) }}</span>
                </div>
                <div class="my-market-box-desc">
                    <template v-for="(market, key1) in data.mdata">
                        <div class="row row5 mt-1" :key="key1">
                            <div class="col-6">{{ market.mname }}</div>
                            <div class="col-6 text-right">{{ market.cntsoda }}</div>
                        </div>
                    </template>
                </div>
            </div>
        </template>
        <template v-for="(data, key) in marketAnalysis.t3">
            <div class="my-market-box" :key="`diam-${key}`">
                <div class="my-market-box-title" :class="`sport${data.etid}`">
                    <span>{{ data.etname }} -> {{ data.gname }} / DIAM11</span>
                    <span>{{ changeDateFormat(data.stime) }}</span>
                </div>
                <div class="my-market-box-desc">
                    <template v-for="(market, key1) in data.mdata">
                        <div class="row row5 mt-1" :key="key1">
                            <div class="col-6">{{ market.mname }}</div>
                            <div class="col-6 text-right">{{ market.cntsoda }}</div>
                        </div>
                    </template>
                </div>
            </div>
        </template>

        <template v-if="!marketAnalysis.t1 && !marketAnalysis.t2 && !marketAnalysis.t3">
            <p>There are no markets data!</p>
        </template>
    </div>
</template>

<script>
    import ServiceApi from "@/services/ServiceApi";
    import base64 from "@/base64"
    import moment from 'moment'
    
    export default {
        data() {
            return {
                loading: false
            }
        },
        props: ['marketAnalysis'],
        methods: {
            changeDateFormat(date) {
                return moment(String(date), 'MM-DD-YYYY hh:mm:ss A').format('DD/MM/YYYY HH:mm:ss')
            },
            gotoDetail(id, gmid, iscc, shlight) {
                if(iscc == 0){
                    this.$router.push({
                    name: id == 4 ? 'gameDetailCricket' : 'gameDetail',
                    params: {
                            etid: base64.enc(id),
                            gameId: base64.enc(gmid)
                        }
                    })    
                } else if(iscc == 1){
                    if(shlight == 0){
                        this.$router.push({
                            name: 'cricketV3',
                        })
                    }else if(shlight == 1){
                        this.$router.push({
                            name: 'virtualCricket',
                            params: {
                                etid: base64.enc(id),
                                gameId: base64.enc(gmid)
                            }
                        })
                    }
                } else if(iscc == 2) {
                    if(shlight == 1){
                        this.$router.push({
                            name: 'virtualGame',
                            params: {
                                etid: base64.enc(id),
                                gameId: base64.enc(gmid)
                            }
                        })
                    }
                } else if(iscc == 3) {
                    if(shlight == 0){
                        this.$router.push({
                            name: 'superOver',
                        })
                    }
                } 

                this.$parent.$parent.$parent.hideMarketAnalysis()
            }
        }
    }
</script>