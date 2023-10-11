<template>
    <li :class="[{'show':item.expand}]">
        <template v-if="isGame">
            <router-link class="dropdown-item" :to="{ name: $pages.getDetailRoute(item.iscc, item.etid), params: { etid: $base64.enc(item.etid), gameId: $base64.enc(item.gmid) }}"
                @click.native="$store.commit('toggleSidebar')"
                :class="item.gmid == $store.state.gameId ? 'active' : ''">
                <span class="ifTooltip">{{item.name}}</span>
            </router-link>
        </template>

        <template v-else-if="isEvent">
            <a href="javascript:void(0)" @click="toggle" class="dropdown-item" 
                :class="[{'dropdown-toggle' : isFolder}, isEvent ? `sport${item.etid}` : '']">
                <i class="d-icon" :class="`icon-${item.etid}`"></i>
                <span class="sport-name ifTooltip">{{item.name}}</span>
                <span v-if="isFolder"> ({{$store.getters.treeTotalEvents(item.etid)}})</span>
            </a>
        </template>
        
        <template v-else>
            <a href="javascript:void(0)" @click="toggle" class="dropdown-item" 
                :class="[{'dropdown-toggle' : isFolder}, item.cid == $store.state.cid ? 'active' : '']">
                <span class="ifTooltip">{{item.name}}</span>
                <span v-if="isFolder"> ({{item.children.length}})</span>
            </a>
        </template>
        
        <ul class="dropdown-menu" :class="{'show': item.expand}" v-if="isFolder">
            <tree-item class="text-dark" v-for="(child, index) in item.children" :key="index" :item="child">
            </tree-item>
        </ul>
    </li>

</template>

<script>
    import ServiceApi from '@/services/ServiceApi'
    export default {
        name: 'tree-item',
        mounted() {

        },
        props: {
            item: Object
        },
        data: function () {
            return {
                isOpen: false,
                imgPath: IMG_PATH,
            }
        },
        computed: {
            isFolder() {
                return this.item.children && this.item.children.length;
            },
            isEvent() {
                return this.item.etid;
            },
            isCompition() {
                return this.item.cid;
            },
            isGame() {
                return this.item.gmid;
            }
        },
        methods: {
            toggle() {
                if (this.isFolder) {
                    this.isOpen = !this.isOpen;
                }
                if(this.isEvent){
                    // console.log('event', this.item)
                    this.item.expand = !this.item.expand
                    this.$store.state.etid = this.item.expand ? this.item.etid : null
                    this.$store.state.cid = null
                    // this.$parent.refreshTree(this.item);
                }
                if(this.isCompition){
                    // console.log('com', this.item)
                    this.item.expand = !this.item.expand
                    this.$store.state.cid = this.item.expand ? this.item.cid : null
                    // this.$parent.$parent.refreshTree(this.item);
                }
            },
        }
    }
</script>