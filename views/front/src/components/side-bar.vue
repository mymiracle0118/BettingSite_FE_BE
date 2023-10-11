<template>
  <div class="sidebar-left d-none-mobile">
    <div class="logo-box d-none-mobile">
      <div class="logo">
        <!-- <template v-if="showHoli">
          <template v-for="(i, key) in holiObject.logo">
            <holi :key="`logo-${key}`" name="logo" />
          </template>
        </template> -->
        <router-link :to="{ name: 'home' }">
          <!-- <img :src="imgPath + 'front/img/logo.png'" class="img-fluid"> -->
          <img :src="logoPath" class="img-fluid">
        </router-link>
      </div>
    </div>

    <div class="d-none-desktop tabs-mobile">
      <ul class="">
        <li>
          <router-link :to="{name: 'home'}" @click.native="$store.commit('toggleSidebar')">
            Exchange
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'owncasinolist'}" @click.native="$store.commit('toggleSidebar')">
            Our Casino
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'slotcasinolist'}" @click.native="$store.commit('toggleSidebar')">
            Casino + Slot
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'fantacy'}" @click.native="$store.commit('toggleSidebar')">
            Fantasy Games
          </router-link>
        </li>
      </ul>
    </div>
    <template v-if="$pages.is('casino', $route.name) || $pages.is('fullwidthcasino', $route.name) || $route.name == 'owncasinolist'">
      <div class="search-box">
        <div class="form-group">
          <input type="text" v-model="$store.state.casino.searchText" placeholder="Search for Casino"
            class="form-control">
          <img :src="imgPath + 'front/img/search.svg'" class="search-icon">
        </div>
      </div>
      <div class="menu-box casino-menu">
        <ul class="navbar-nav"
          :class="{ 'loader-section-parent' : (!$store.state.casino.tabList || !$store.state.casino.tabList.length)}">
          <Loader :isVisible="(!$store.state.casino.tabList || !$store.state.casino.tabList.length)"></Loader>
          <transition-group name="slide-fade" mode="out-in">
            <template v-if="$store.state.casino.tabList">
              <template v-for="(tab, key) in $store.state.casino.tabList">
                <li class="nav-item" :key="key">
                  <a href="javascript:void(0)" :class="{'active': $store.state.casino.tabId==tab.gmid}"
                    @click="changeTabId(tab.gmid, tab.gname)">
                    <span class="sport-name">{{ tab.gname }}</span>
                  </a>
                </li>
              </template>
            </template>
          </transition-group>
        </ul>
      </div>
    </template>

    <template v-else-if="$route.name == 'slotcasinolist'">
      <div class="search-box">
        <div class="form-group">
          <input type="text" v-model="$store.state.slot.searchText" placeholder="Search for Casino"
            class="form-control">
          <img :src="imgPath + 'front/img/search.svg'" class="search-icon">
        </div>
      </div>
      <div class="menu-box casino-menu">
        <ul class="navbar-nav"
          :class="{ 'loader-section-parent' : (!$store.state.slot.catList || !$store.state.slot.catList.length)}">
          <Loader :isVisible="(!$store.state.slot.catList || !$store.state.slot.catList.length)"></Loader>
          <transition-group name="slide-fade" mode="out-in">
            <template v-if="$store.state.slot.catList">
              <template v-for="(tab, key) in $store.state.slot.catList">
                <li class="nav-item" :key="key">
                  <a href="javascript:void(0)" :class="{'active': $store.state.slot.catId==tab.cid}"
                    @click="changeCatId(tab.cid, tab.cname)">
                    <span class="sport-name">{{ tab.cname }}</span>
                  </a>
                </li>
              </template>
            </template>
          </transition-group>
        </ul>
      </div>
    </template>

    <template v-else>
      <div class="search-box">
        <div class="form-group">
          <input type="text" @keyup="searchEvent" v-model="$store.state.searchText" placeholder="Search"
            class="form-control" style="text-transform: lowercase;" autocomplete="off">
          <template v-if="$store.state.searchLoader">
            <i class="fa fa-spinner fa-spin search-icon"></i>
          </template>
          <template v-else>
            <img :src="imgPath + 'front/img/search.svg'" class="search-icon">
          </template>
        </div>
      </div>
      <div class="menu-box">
        <template v-if="$store.getters.isTablet">
          <tree-menu />
        </template>
      </div>
    </template>
  </div>
</template>
<script>
  import ServiceApi from "@/services/ServiceApi";
  import treeMenu from '@/components/GameSidebarTreeMenu';
  import Loader from '@/components/loader'
  // import Holi from '@/components/Holi.vue';
  export default {
    components: {
      treeMenu,
      Loader,
      // Holi,
    },
    data() {
      return {
        // showHoli: false,
        // holiObject: {
        //   logo: this.getRndInteger(2, 4)
        // },
        imgPath: IMG_PATH,
        // logoPath: BUCKET_PATH + 'sitethemes/' + DOMAIN + '/front/logo.png',
        logoPath: LOGO_PATH,
      };
    },
    mounted() {
      // setTimeout(() => {
      //   this.showHoli = true
      // }, 1000);
    },
    methods: {
      changeCatId(gmid, gamename) {
        this.$store.state.slot.catId = gmid
        this.$store.state.slot.gameName = gamename
        this.getSlotList(this.$store.state.slot.catId)
      },
      getSlotList(catId) {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.$store.state.slot.slotList = []
        ServiceApi.callApi("api/front/casino/slotlist", {
            'cid': catId
          })
          .then(response => {
            if (response.status == 200) {
              this.$store.state.slot.slotList = response.data
            } else {
              this.$store.state.slot.slotList = []
            }
          })
          .catch(e => {
            this.$store.state.slot.slotList = []
          });
      },

      changeTabId(gmid, gamename) {
        if (this.$pages.is('casino', this.$route.name) || this.$pages.is('fullwidthcasino', this.$route.name)) {
          this.$router.push({
            name: 'owncasinolist',
            query: {
              tabid: gmid
            }
          })
        }
        this.$store.state.casino.tabId = gmid
        this.$store.state.casino.gameName = gamename
        this.closeCasino()
        this.getGameList(this.$store.state.casino.tabId)
      },
      closeCasino() {
        this.$store.state.casino.showFrame = false
        this.$store.state.casino.title = ''
        this.$store.state.casino.url = ''
        document.body.style.overflow = 'auto'
        this.$store.state.casino.loading = false
      },
      getGameList(gmid) {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.$store.state.casino.tableList = []
        ServiceApi.callApi("api/front/casino/tablelist", {
            'gmid': gmid,
            'ismob': IS_MOBILE ? 0 : 1
          })
          .then(response => {
            if (response.status == 200) {
              this.$store.state.casino.tableList = response.data.t1
            } else {
              this.$store.state.casino.tableList = []
            }
          })
          .catch(e => {
            this.$store.state.casino.tableList = []
          });
      },

      // getRndInteger(min, max) {
      //   return Math.floor(Math.random() * (max - min + 1)) + min;
      // },
      clearSearch(event) {
        if (this.$store.state.searchText) {
          this.$store.commit('resetSearch')
          this.$store.commit('toggleSidebar', true)
        }
      },
      searchEvent() {
        if (this.$store.state.searchText.length == 3) {
          this.$store.state.searchLoader = true
          ServiceApi.callApi("api/front/searchgame", {
              name: this.$store.state.searchText
            }).then(response => {
              if (response.status == 200 && this.$store.state.searchText.length) {
                this.$store.state.searchItems = response.data
              } else {
                this.$store.state.searchItems = []
              }
            })
            .catch(e => {
              this.$store.state.searchItems = []
            })
            .finally(res => {
              this.$store.state.searchLoader = false
            })
        } else if (this.$store.state.searchText.length < 3) {
          this.$store.state.searchItems = [];
        }
      },

    },
    beforeDestroy() {

    }
  };
</script>