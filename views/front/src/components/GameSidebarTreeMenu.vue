<template>
    <div>
        <transition-group name="slide-fade" mode="out-in">
            <template v-for="(item, key) in $store.getters.treeData">
                <ul class="navbar-nav" :key="key">
                    <tree-item :item="item"></tree-item>
                </ul>
            </template>
        </transition-group>
    </div>
</template>

<script>
    import ServiceApi from '@/services/ServiceApi'
    import treeItem from '@/components/GameSidebarTreeComponent';
    export default {
        name: 'tree-menu',
        mounted() {
            this.getTreeData()
        },
        components: {
            treeItem,
        },
        data(){
            return{
                callTreeApi: true,
            }
        },
        methods: {
            getTreeData() {
                ServiceApi.callApi("api/front/treedata", {}).then(response => {
                        if (response.status == 200) {
                            console.log('tree call from compoent')
                            this.$store.state.tree = response.data.t1
                        }
                        if (this.callTreeApi == true) {
                            setTimeout(res => {
                                this.getTreeData();
                            }, 300000);
                        }

                    })
                    .catch(e => {
                        if (this.callTreeApi == true) {
                            setTimeout(res => {
                                this.getTreeData();
                            }, 300000);
                        }
                        // this.$store.state.tree = []
                    });
            },
        },
        beforeDestroy(){
            this.callTreeApi = false
        }
    }
</script>