<template>
    <li :class="[{'show':item.expand}]">
        <template v-if="isGame">

            <router-link v-if="item.iscc == 0" class="side-nav-link-ref" :to="{ name: 'GameDetail', params: { etid: $base64.encode(item.etid), gameId: $base64.encode(item.gmid) }}" :class="item.gmid == $store.state.gameId ? 'active' : ''"  @click.native="$helpers.toggleSideBar">
                <span>{{item.name}}</span>
            </router-link>

            <router-link v-else-if="item.iscc == 1" class="side-nav-link-ref" :to="{ name: 'VirtualCricket', params: { etid: $base64.encode(item.etid), gameId: $base64.encode(item.gmid) }}" :class="item.gmid == $store.state.gameId ? 'active' : ''"  @click.native="$helpers.toggleSideBar">
                <span>{{item.name}}</span>
            </router-link>

            <router-link v-else-if="item.iscc == 2" class="side-nav-link-ref" :to="{ name: 'VirtualGame', params: { etid: $base64.encode(item.etid), gameId: $base64.encode(item.gmid) }}" :class="item.gmid == $store.state.gameId ? 'active' : ''"  @click.native="$helpers.toggleSideBar">
                <span>{{item.name}}</span>
            </router-link>
        </template>

        <template v-else-if="isEvent">
            <a href="javascript:void(0)" @click="toggle" class="" 
                :class="[{'has-arrow' : isFolder}, isEvent ? `sport${item.etid}` : '']">
                <span>{{item.name}}</span>
                <span v-if="isFolder"> ({{$store.getters.treeTotalEvents(item.etid)}})</span>
            </a>
        </template>
        
        <template v-else>
            <a href="javascript:void(0)" @click="toggle" class="" 
                :class="[{'has-arrow' : isFolder}, item.cid == $store.state.cid ? 'active' : '']">
                <span>{{item.name}}</span>
                <span v-if="isFolder"> ({{item.children.length}})</span>
            </a>
        </template>
        
        <ul class="sub-menu mm-collapse" :class="{'mm-show': item.expand}" v-if="isFolder">
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
                isOpen: false
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