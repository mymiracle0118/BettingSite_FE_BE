<template>
    <div>
        <PageHeader :title="pageTitle" :items="items" />
        <div class="card">
            
            <div class="casino-banners">
                <template v-for="(data, key) in casinoList">
                    <div class="casino-banner-item" :key="key" >
                        <router-link :to="{ name: data.route }">
                            <img v-lazy="casinoBannersPath + data.gtype + '.jpg'" class="img-fluid">
                        </router-link>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import ServiceApi from "@/services/ServiceApi";
    import PageHeader from "@/components/page-header";

    export default {
        components: {
            PageHeader
        },
        mounted() {
           
        },
        data() {
            return {
                imgPath: IMG_PATH,
                pageTitle: "Virtual Casino",
                items: [
                    {
                      text: "Home",
                      to: { name: "home" },
                    },
                    {
                      text: "Virtual Casino",
                      active: true,
                    },
                ],
                casinoBannersPath: BUCKET_PATH + 'casino_icons/vc/',
                title: '',
                casinoList: [
                    {
                        gtype: 'vteen',
                        route: 'vTeen'
                    },
                    {
                        gtype: 'vteen20',
                        route: 'vTeen20'
                    }
                ]
            }
        },
        computed: {
          
        },
        methods: {
            
          
           
        }
    }
</script>

<style>

</style>