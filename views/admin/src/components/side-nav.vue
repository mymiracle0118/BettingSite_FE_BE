<script>
import MetisMenu from "metismenujs/dist/metismenujs";
import treeItem from '@/components/GameSidebarTreeComponent';
import ServiceApi from "@/services/ServiceApi";

export default {
  components: {
      treeItem
    },
    data() {
      return {
        callApi: true,
        firsttimeload: true,
      };
    },
  mounted: function() {
    document.body.setAttribute("data-sidebar", "dark");
    this.getTreeData();
  },
  methods: {
    loadMenu() {
      
      // eslint-disable-next-line no-unused-vars
      var menuRef = new MetisMenu("#side-menu");
      var links = document.getElementsByClassName("side-nav-link-ref");
      var matchingMenuItem = null;
      for (var i = 0; i < links.length; i++) {
        if (window.location.pathname === links[i].pathname) {
          matchingMenuItem = links[i];
          break;
        }
      }

      if (matchingMenuItem) {
        matchingMenuItem.classList.add("active");
        var parent = matchingMenuItem.parentElement;

        /**
         * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
         * We should come up with non hard coded approach
         */
        if (parent) {
          parent.classList.add("mm-active");
          const parent2 = parent.parentElement.closest("ul");
          if (parent2 && parent2.id !== "side-menu") {
            parent2.classList.add("mm-show");

            const parent3 = parent2.parentElement;
            if (parent3) {
              parent3.classList.add("mm-active");
              var childAnchor = parent3.querySelector(".has-arrow");
              var childDropdown = parent3.querySelector(".has-dropdown");
              if (childAnchor) childAnchor.classList.add("mm-active");
              if (childDropdown) childDropdown.classList.add("mm-active");

              const parent4 = parent3.parentElement;
              if (parent4) parent4.classList.add("mm-show");
              const parent5 = parent4.parentElement;
              if (parent5) parent5.classList.add("mm-active");
            }
          }
        }
      }
    },
    
    getTreeData() {
      if($("#event-tree").hasClass('mm-active') == false && !this.firsttimeload){
        setTimeout(res => {
          this.getTreeData();
        }, 300000);
        return;
      }

      ServiceApi.callApi("treedata", {}).then(response => {
          if(this.firsttimeload){
            this.firsttimeload = false
            this.loadMenu()
          }
          if (response.status == 200) {
            this.$store.state.tree = response.data.t1
          }
          if (this.callApi == true) {
            setTimeout(res => {
              this.getTreeData();
            }, 300000);
          }

        })
        .catch(e => {
          if(this.firsttimeload){
            this.firsttimeload = false
            this.loadMenu()
          }
          if (this.callApi == true) {
            setTimeout(res => {
              this.getTreeData();
            }, 300000);
          }
          //this.$store.state.tree = []
        });
    },
  },
  beforeDestroy() {
    this.callApi = false
    this.firsttimeload = false;
  }
};
</script>

<template>
  <!-- ========== Left Sidebar Start ========== -->

  <!--- Sidemenu -->
  <div id="sidebar-menu" >
    <!-- Left Menu Start -->
    <ul id="side-menu" class="metismenu list-unstyled">
      <!-- <li class="menu-title">Menu</li>
 -->
      <li v-if="$store.state.acl.dashboard">
        <router-link  :to="{name:'home'}" class="side-nav-link-ref" @click.native="$helpers.toggleSideBar">
          <i class="bx bx-home-circle"></i>
          <span>Dashboard</span>
        </router-link>
      </li>
      <li v-if="$store.state.acl.ma">
        <router-link  :to="{name:'MarketAnalysis'}" class="side-nav-link-ref"  @click.native="$helpers.toggleSideBar">
          <i class="bx bxs-bar-chart-alt-2"></i>
          <span>Market Analysis</span>
        </router-link>
      </li>
      <li v-if="$store.state.acl.loginuc">
        <router-link  :to="{name:'CreateAccount'}" class="side-nav-link-ref"  @click.native="$helpers.toggleSideBar">
          <i class="bx bx-user-plus"></i>
          <span>Multi Login Account</span>
        </router-link>
      </li>
      <li v-if="$store.state.acl.ulist || $store.state.acl.uinsert">
        <a href="javascript:void(0);" class="has-arrow">
          <i class="bx bx-user-circle"></i>
          <span>Account</span>
        </a>
        <ul class="sub-menu" aria-expanded="false">
          <li v-if="$store.state.acl.ulist">
            <router-link
              :to="{name:'users'}"
              class="side-nav-link-ref" @click.native="$helpers.toggleSideBar"
            >Account List</router-link>
          </li>
          <li v-if="$store.state.acl.uinsert">
            <router-link
              :to="{name:'Insertuser'}"
              class="side-nav-link-ref" @click.native="$helpers.toggleSideBar"
            >Create Account</router-link>
          </li>
        </ul>
      </li>
      <li v-if="$store.state.acl.bank">
        <router-link  :to="{name:'Bank'}" class="side-nav-link-ref" @click.native="$helpers.toggleSideBar">
          <i class="bx bxs-bank"></i>
          <span>Bank</span>
        </router-link>
      </li>
      <li v-if="$store.state.acl.raccst || $store.state.acl.reportpl || $store.state.acl.reportcb || $store.state.acl.reportuh || $store.state.acl.glock || $store.state.acl.casinores || $store.state.acl.reporttu">
        <a href="javascript:void(0);" class="has-arrow">
          <i class="bx bx-file"></i>
          <span>Reports</span>
        </a>
        <ul class="sub-menu" aria-expanded="false" >
          <li v-if="$store.state.acl.raccst">
            <router-link :to="{name:'AccountStatement'}" class="side-nav-link-ref" @click.native="$helpers.toggleSideBar">Account Statement</router-link>
          </li>
          <li v-if="$store.state.acl.reportpl">
            <router-link :to="{name:'ProfitLoss'}" class="side-nav-link-ref" @click.native="$helpers.toggleSideBar">Party Win Loss</router-link>
          </li>
          <li v-if="$store.state.acl.reportcb">
            <router-link :to="{name:'CurrentBets'}" class="side-nav-link-ref" @click.native="$helpers.toggleSideBar">Current Bets</router-link>
          </li>
          <li v-if="$store.state.acl.reportuh">
            <router-link :to="{name:'UserHistory'}" class="side-nav-link-ref" @click.native="$helpers.toggleSideBar">User History</router-link>
          </li>
          <li v-if="$store.state.acl.glock">
            <router-link :to="{name:'UserLock'}" class="side-nav-link-ref" @click.native="$helpers.toggleSideBar">General Lock</router-link>
          </li>
          <li v-if="$store.state.acl.casinores">
            <router-link :to="{name:'CasinoResult'}" class="side-nav-link-ref" @click.native="$helpers.toggleSideBar">Our Casino Result</router-link>
          </li>
          <li v-if="$store.state.acl.lcasinores">
            <router-link :to="{name:'TpCasinoReport'}" class="side-nav-link-ref" @click.native="$helpers.toggleSideBar">Live Casino Result</router-link>
          </li>
          <li v-if="$store.state.acl.reporttu">
            <router-link :to="{name:'TurnOverReport'}" class="side-nav-link-ref" @click.native="$helpers.toggleSideBar">Turn Over</router-link>
          </li>
          <li v-if="$store.state.acl.reporttu">
            <router-link :to="{name:'UserAuthList'}" class="side-nav-link-ref" @click.native="$helpers.toggleSideBar">User Authentication</router-link>
          </li>
        </ul>
      </li>
      <li v-if="$store.state.acl.casinolist">
        <router-link  :to="{name:'casinolist'}" class="side-nav-link-ref" @click.native="$helpers.toggleSideBar">
          <!-- <span class="badge badge-pill badge-success float-right" key="t-new">New</span> -->
          <i class="mdi mdi-cards-playing-outline"></i>
          <span>Our Casino</span>
        </router-link>
      </li>
      <li v-if="$store.state.acl.casinolist">
        <router-link  :to="{name:'vCasinoList'}" class="side-nav-link-ref" @click.native="$helpers.toggleSideBar">
          <span class="badge badge-pill badge-success float-right" key="t-new">New</span>
          <i class="mdi mdi-cards-playing-outline"></i>
          <span>Virtual Casino</span>
        </router-link>
      </li>
      <!-- <li v-if="$store.state.acl.casinolist">
        <a href="javascript:void(0);" class="has-arrow">
          <i class="bx bx-aperture"></i>
          <span>Our Casino</span>
        </a>
        <ul class="sub-menu" aria-expanded="false">
          <li>
            <router-link
              :to="{name:'TeenpattiOneday'}"
              class="side-nav-link-ref"
            >1-Day Teenpatti</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'teenpattiT20'}"
              class="side-nav-link-ref"
            >20-20 Teenpatti</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'teenpattiTest'}"
              class="side-nav-link-ref"
            >Test Teenpatti</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'teenpattiOpen'}"
              class="side-nav-link-ref"
            >Open Teenpatti</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'baccarat'}"
              class="side-nav-link-ref"
            >Baccarat</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'baccarat2'}"
              class="side-nav-link-ref"
            >Baccarat 2</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'lucky7'}"
              class="side-nav-link-ref"
            >Lucky 7 - A</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'lucky7eu'}"
              class="side-nav-link-ref"
            >Lucky 7 - B</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'pokeroneday'}"
              class="side-nav-link-ref"
            >Poker One Day</router-link>
          </li>
          <li>
            <router-link
              :to="{name:'pokerT20'}"
              class="side-nav-link-ref"
            >Poker 20-20</router-link>
          </li>
          <li>
            <router-link :to="{name:'poker6Player'}" class="side-nav-link-ref">Poker 6 Player</router-link>
          </li>
          <li>
            <router-link :to="{name:'dragonTigerOneDay'}" class="side-nav-link-ref">1-Day Dragon Tiger</router-link>
          </li>
          <li>
            <router-link :to="{name:'dragonTigerT20'}" class="side-nav-link-ref">20-20 Dragon Tiger</router-link>
          </li>
          <li>
            <router-link :to="{name:'dragonTigerT202'}" class="side-nav-link-ref">20-20 Dragon Tiger - 2</router-link>
          </li>
          <li>
            <router-link :to="{name:'dragonTigerLionT20'}" class="side-nav-link-ref">20-20 Dragon Tiger Lion</router-link>
          </li>
          <li>
            <router-link :to="{name:'AAA'}" class="side-nav-link-ref">AAA</router-link>
          </li>
          <li>
            <router-link :to="{name:'bollywoodTable'}" class="side-nav-link-ref">Bollywood Table</router-link>
          </li>
          <li>
            <router-link :to="{name:'worli'}" class="side-nav-link-ref">Worli Matka</router-link>
          </li>
          <li>
            <router-link :to="{name:'worli2'}" class="side-nav-link-ref">Instant Worli</router-link>
          </li>
          <li>
            <router-link :to="{name:'war'}" class="side-nav-link-ref">Casino War</router-link>
          </li>
        </ul>
      </li> -->
     <!--  <li>
        <a href="javascript:void(0);" class="has-arrow">
          <i class="bx bx-cog"></i>
          <span>Settings</span>
        </a>
        <ul class="sub-menu" aria-expanded="false">
          
        </ul>
      </li> -->
      <li id="event-tree" class="menu-box" v-if="$store.state.acl.events">
        <a href="javascript: void(0);" class="has-arrow">
              <i class="bx bxs-calendar-event"></i>
              <span>Events</span>
          </a>
          <ul class="sub-menu"  >
            <template v-for="(item, key) in $store.getters.treeData">
                <tree-item :item="item"  :key="key"></tree-item>
            </template>
         </ul>
      </li>
      <!-- <li class="mm-active">
            <a href="javascript: void(0);" class="has-arrow" >
                <i class="bx bx-share-alt"></i>
                <span>Events</span>
            </a>
            <ul class="sub-menu mm-show" aria-expanded="true">
              
              
            </ul>
           
        </li> -->
    </ul>

    
  </div>
  <!-- Sidebar -->
</template>
