<template>
  <div ref="one" class="sidebar sidebar-dark sidebar-main sidebar-expand-md">
    <!-- Sidebar mobile toggler -->
    <div class="sidebar-mobile-toggler text-center">
      <a
        href="javascript:void(0)"
        class="sidebar-mobile-main-toggle"
        @click="$store.commit('toggleMobileSidebar')"
      >
        <i class="icon-arrow-left8"></i>
      </a>
      Navigation
      <a
        href="javascript:void(0)"
        class="sidebar-mobile-expand"
        @click="fullMobileSidebar()"
      >
        <i class="icon-screen-full"></i>
        <i class="icon-screen-normal"></i>
      </a>
    </div>
    <!-- /sidebar mobile toggler -->

    <!-- Sidebar content -->
    <div class="sidebar-content">
      <!-- User menu -->
      <div class="sidebar-user-material">
        <div class="sidebar-user-material-body">
          <div class="card-body text-center">
            <router-link :to="{name:'home'}">
              <img
                :src="imgPath+'/logo-white.png'"
                class="img-fluid shadow-1 mb-3"
                alt
              />
            </router-link>
          </div>

          <div class="sidebar-user-material-footer">
            <a
              href="#user-nav"
              class="d-flex justify-content-between align-items-center text-shadow-dark dropdown-toggle legitRipple"
              data-toggle="collapse"
              aria-expanded="false"
            >
              <span>My account</span>
            </a>
          </div>
        </div>

        <div class="collapse" id="user-nav" style>
          <ul class="nav nav-sidebar">
            <li class="nav-item">
              <a href="#" class="nav-link legitRipple">
                <i class="icon-user-plus"></i>
                <span>My profile</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link legitRipple">
                <i class="icon-coins"></i>
                <span>My balance</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link legitRipple">
                <i class="icon-comment-discussion"></i>
                <span>Messages</span>
                <span class="badge bg-teal-400 badge-pill align-self-center ml-auto">58</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link legitRipple">
                <i class="icon-cog5"></i>
                <span>Account settings</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link legitRipple">
                <i class="icon-switch2"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- /user menu -->

      <!-- Main navigation -->
      <div class="card card-sidebar-mobile">
        <ul class="nav nav-sidebar">
          <!-- Main -->
          <li
            class="nav-item"
            :class="[{'nav-item-open' : curruntTab == 'home'}, {'' : curruntTab != 'home'}]"
          >
            <router-link @click="changeCurruntTab('home')" class="nav-link legitRipple" :to="'home'">
              <i class="icon-home4"></i>
              <span>Dashboard</span>
            </router-link>
          </li>
          <li
            class="nav-item nav-item-submenu"
            :class="[{'nav-item-open' : curruntTab == 'users'}, {'' : curruntTab != 'users'}]"
          >
            <a @click="changeCurruntTab('users')" class="nav-link legitRipple" href="javascript:void(0)">
              <i class="icon-people"></i>
              <span>User pages</span>
            </a>
            <transition name="fade">
              <ul
                class="nav nav-group-sub"
                :style="[ curruntTab == 'users' ? { 'display' : 'block'} : { 'display' : 'none'}]"
              >
                <li class="nav-item">
                  <router-link :to="{ name: 'users'}" class="nav-link legitRipple">User List</router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'Insertuser'}" class="nav-link legitRipple">Insert User</router-link>
                </li>
              </ul>
            </transition>
          </li>
          <!-- /main -->
        </ul>
      </div>
      <!-- /main navigation -->
    </div>
    <!-- /sidebar content -->
  </div>
</template>
<script>
import ServiceApi from "@/services/ServiceApi";
export default {
  data() {
    return {
      imgPath: "/static/admin/assets/images",
      curruntTab: "home",
      mobileFullSidebar: false
    };
  },
  mounted() {
    document.querySelector(".nav-item-submenu").addEventListener(
      "click",
      function(e) {
        e.preventDefault();
        this.classList.toggle("nav-item-open");
        this.childNodes.forEach(function(item) {
          if (item.className.indexOf("nav-group-sub") > 0) {
            if (item.getAttribute("style") == null) {
              item.style.display = "block";
              return;
            }
            if (item.style.display === "none") {
              item.style.display = "block";
            } else {
              item.style.display = "none";
            }
          }
        });
      },
      false
    );
  },
  methods: {
    changeCurruntTab(tab) {
      if (tab != this.curruntTab) {
        this.curruntTab = tab;
      }
    },
    fullMobileSidebar() {
      this.mobileFullSidebar = !this.mobileFullSidebar;
      if (this.mobileFullSidebar) {
        this.$refs.one.classList.add("sidebar-fullscreen");
      } else {
        this.$refs.one.classList.remove("sidebar-fullscreen");
      }
    }
  }
};
</script>

<style scoped>
/* ------------------------------------------------------------------------------
 *
 *  # Sidebar layouts
 *
 *  Sidebar components, main navigation and sidebar itself
 *
 * ---------------------------------------------------------------------------- */
.sidebar {
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  width: 16.875rem;
}
.sidebar:not(.sidebar-component) {
  position: fixed;
  top: 0;
  bottom: 0;
  box-sizing: content-box;
  z-index: 1040;
  transition: all ease-in-out 0.15s;
}
@media (prefers-reduced-motion: reduce) {
  .sidebar:not(.sidebar-component) {
    transition: none;
  }
}
/* .sidebar-main,
.sidebar-main .sidebar-content,
.sidebar-secondary,
.sidebar-secondary .sidebar-content {
  left: -18.5625rem;
  height: calc(100vh - 48px);
} */
.sidebar-right,
.sidebar-right .sidebar-content {
  right: -18.5625rem;
}
.sidebar.sidebar-fullscreen {
  width: 100%;
}

.sidebar:not(.sidebar-component) .sidebar-content {
  position: fixed;
  top: 3.00003rem;
  bottom: 0;
  width: inherit;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  transition: left ease-in-out 0.15s, right ease-in-out 0.15s;
}
@media (prefers-reduced-motion: reduce) {
  .sidebar:not(.sidebar-component) .sidebar-content {
    transition: none;
  }
}
.navbar-lg:first-child
  ~ .page-content
  .sidebar:not(.sidebar-component)
  .sidebar-content {
  top: 3.25003rem;
}
.navbar-sm:first-child
  ~ .page-content
  .sidebar:not(.sidebar-component)
  .sidebar-content {
  top: 2.75003rem;
}

.sidebar-mobile-main .sidebar-main {
  box-shadow: 0.25rem 0 1rem rgba(0, 0, 0, 0.35);
}
.sidebar-mobile-main .sidebar-main,
.sidebar-mobile-main .sidebar-main .sidebar-content {
  left: 0;
}

.sidebar-mobile-secondary .sidebar-secondary {
  box-shadow: 0.25rem 0 1rem rgba(0, 0, 0, 0.35);
}
.sidebar-mobile-secondary .sidebar-secondary,
.sidebar-mobile-secondary .sidebar-secondary .sidebar-content {
  left: 0;
}

.sidebar-mobile-right .sidebar-right {
  display: block;
  box-shadow: -0.25rem 0 1rem rgba(0, 0, 0, 0.35);
}
.sidebar-mobile-right .sidebar-right,
.sidebar-mobile-right .sidebar-right .sidebar-content {
  right: 0;
}

.sidebar-mobile-component .sidebar-component {
  display: block;
}

.nav-sidebar {
  -ms-flex-direction: column;
  flex-direction: column;
}
.nav-sidebar .nav-item:not(.nav-item-header):first-child {
  padding-top: 0.5rem;
}
.nav-sidebar .nav-item:not(.nav-item-header):last-child {
  padding-bottom: 0.5rem;
}
.nav-sidebar .nav-item:not(.nav-item-divider) {
  margin-bottom: 1px;
}
.nav-sidebar .nav-item:not(.nav-item-divider):last-child {
  margin-bottom: 0;
}
.nav-sidebar > .nav-item > .nav-link {
  font-weight: 500;
}
.nav-sidebar .nav-link {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: start;
  align-items: flex-start;
  padding: 0.75rem 1.25rem;
  transition: background-color ease-in-out 0.15s, color ease-in-out 0.15s;
}
@media (prefers-reduced-motion: reduce) {
  .nav-sidebar .nav-link {
    transition: none;
  }
}
.nav-sidebar .nav-link i {
  margin-right: 1.25rem;
  margin-top: 0.12502rem;
  margin-bottom: 0.12502rem;
  top: 0;
}
.nav-sidebar .nav-link .badge {
  transition: background-color ease-in-out 0.15s, border-color ease-in-out 0.15s;
}
@media (prefers-reduced-motion: reduce) {
  .nav-sidebar .nav-link .badge {
    transition: none;
  }
}
.nav-sidebar .nav-link.disabled,
.nav-sidebar .nav-link.disabled:hover,
.nav-sidebar .nav-link.disabled:focus {
  background-color: transparent;
  opacity: 0.5;
}
.nav-sidebar .nav-item-header {
  padding: 0.75rem 1.25rem;
  margin-top: 0.5rem;
}
.nav-sidebar .nav-item-header > i {
  display: none;
}
.nav-sidebar .nav-item-divider {
  margin: 0.5rem 0;
  height: 1px;
}

.nav-item-submenu > .nav-link {
  padding-right: 2.75rem;
}
.nav-item-submenu > .nav-link:after {
  content: "";
  font-family: "icomoon";
  display: inline-block;
  font-size: 1rem;
  vertical-align: middle;
  line-height: 1;
  position: absolute;
  top: 0.75rem;
  margin-top: 0.12502rem;
  right: 1.25rem;
  transition: -webkit-transform 0.25s ease-in-out;
  transition: transform 0.25s ease-in-out;
  transition: transform 0.25s ease-in-out, -webkit-transform 0.25s ease-in-out;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@media (prefers-reduced-motion: reduce) {
  .nav-item-submenu > .nav-link:after {
    transition: none;
  }
}

.nav-item-submenu.nav-item-open > .nav-link:after {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.nav-group-sub {
  display: none;
}
.nav-group-sub .nav-link {
  padding: 0.625rem 1.25rem 0.625rem 3.5rem;
}
.nav-group-sub .nav-group-sub .nav-link {
  padding-left: 4.75rem;
}
.nav-group-sub .nav-group-sub .nav-group-sub .nav-link {
  padding-left: 6rem;
}
.nav-group-sub .nav-item-submenu > .nav-link:after {
  top: 0.625rem;
}
.nav-item-expanded > .nav-group-sub {
  display: block;
}

.nav-scrollspy .nav-link.active + .nav,
.nav-scrollspy .nav-item-open .nav-link:not(.active) + .nav {
  display: block;
}

.nav-scrollspy .nav-link.active:after {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.nav-sidebar-icons-reverse .nav-link {
  padding-right: 3.5rem;
}
.nav-sidebar-icons-reverse .nav-link i {
  position: absolute;
  top: 0.75rem;
  right: 1.25rem;
  margin-right: 0;
}

.nav-sidebar-icons-reverse .nav-item-submenu .nav-link {
  padding-right: 4.5rem;
}
.nav-sidebar-icons-reverse .nav-item-submenu .nav-link:after {
  right: 3.25rem;
}

.nav-sidebar-icons-reverse .nav-group-sub .nav-link {
  padding-left: 2.5rem;
}
.nav-sidebar-icons-reverse .nav-group-sub .nav-link i {
  top: 0.625rem;
}

.nav-sidebar-icons-reverse .nav-group-sub .nav-group-sub .nav-link {
  padding-left: 3.75rem;
}

.nav-sidebar-icons-reverse
  .nav-group-sub
  .nav-group-sub
  .nav-group-sub
  .nav-link {
  padding-left: 5rem;
}

.nav-sidebar-bordered > .nav-item + .nav-item:not(.nav-item-divider) {
  margin-bottom: 0;
}

.sidebar .card:first-child .nav-sidebar-bordered {
  padding-top: 0;
}
.sidebar .card:first-child .nav-sidebar-bordered > .nav-item:first-child,
.sidebar
  .card:first-child
  .nav-sidebar-bordered
  > .nav-item-header:first-child {
  border-top: 0;
}

.sidebar .card:last-child .nav-sidebar-bordered {
  padding-bottom: 0;
}
.sidebar .card:last-child .nav-sidebar-bordered > .nav-item:last-child,
.sidebar .card:last-child .nav-sidebar-bordered > .nav-item-header:last-child {
  border-bottom: 0;
}

.sidebar-dark .nav-sidebar-bordered > .nav-item {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.sidebar-dark .nav-sidebar-bordered > .nav-item:last-child {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-dark .nav-sidebar-bordered > .nav-item-header {
  background-color: rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0;
}

.sidebar-light .nav-sidebar-bordered > .nav-item {
  border-top: 1px solid #ddd;
}
.sidebar-light .nav-sidebar-bordered > .nav-item:last-child {
  border-bottom: 1px solid #ddd;
}

.sidebar-light .nav-sidebar-bordered > .nav-item-header {
  background-color: #fafafa;
  border-top: 1px solid #ddd;
  margin: 0;
}

.sidebar-mobile-toggler {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
}
.sidebar-mobile-toggler a {
  padding: 0.875rem 1.25rem;
  transition: all ease-in-out 0.15s;
}
@media (prefers-reduced-motion: reduce) {
  .sidebar-mobile-toggler a {
    transition: none;
  }
}
.navbar-lg:first-child ~ .page-content .sidebar-mobile-toggler a {
  padding: 1rem 1.25rem;
}
.navbar-sm:first-child ~ .page-content .sidebar-mobile-toggler a {
  padding: 0.75rem 1.25rem;
}

.sidebar-mobile-expand i:last-child:not(:first-child) {
  display: none;
}

.sidebar-fullscreen .sidebar-mobile-expand i:first-child {
  display: none;
}

.sidebar-fullscreen .sidebar-mobile-expand i:last-child {
  display: inline-block;
}

.sidebar-dark {
  background-color: #263238;
  color: #fff;
}
.sidebar-dark .sidebar-mobile-toggler {
  color: rgba(255, 255, 255, 0.9);
  border-bottom-color: rgba(255, 255, 255, 0.1);
}
.sidebar-dark .sidebar-mobile-toggler:not([class*="bg-"]) {
  background-color: #1e272c;
}
.sidebar-dark .sidebar-mobile-toggler a {
  color: rgba(255, 255, 255, 0.9);
}
.sidebar-dark .sidebar-mobile-toggler a:hover {
  color: #fff;
  background-color: transparent;
}
.sidebar-dark .card-header {
  border-color: rgba(255, 255, 255, 0.1);
}

.sidebar-dark .nav-sidebar .nav-link,
.sidebar-light
  .card[class*="bg-"]:not(.bg-light):not(.bg-white):not(.bg-transparent)
  .nav-sidebar
  .nav-link {
  color: rgba(255, 255, 255, 0.9);
}
.sidebar-dark .nav-sidebar .nav-link:not(.disabled):hover,
.sidebar-light
  .card[class*="bg-"]:not(.bg-light):not(.bg-white):not(.bg-transparent)
  .nav-sidebar
  .nav-link:not(.disabled):hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar-dark .nav-sidebar .nav-item > .nav-link.active,
.sidebar-light
  .card[class*="bg-"]:not(.bg-light):not(.bg-white):not(.bg-transparent)
  .nav-sidebar
  .nav-item
  > .nav-link.active {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.sidebar-dark .nav-sidebar .nav-item-open > .nav-link:not(.disabled),
.sidebar-dark .nav-sidebar > .nav-item-expanded:not(.nav-item-open) > .nav-link,
.sidebar-light
  .card[class*="bg-"]:not(.bg-light):not(.bg-white):not(.bg-transparent)
  .nav-sidebar
  .nav-item-open
  > .nav-link:not(.disabled),
.sidebar-light
  .card[class*="bg-"]:not(.bg-light):not(.bg-white):not(.bg-transparent)
  .nav-sidebar
  > .nav-item-expanded:not(.nav-item-open)
  > .nav-link {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.sidebar-dark .nav-sidebar > .nav-item-open > .nav-link:not(.disabled),
.sidebar-dark .nav-sidebar > .nav-item > .nav-link.active,
.sidebar-light
  .card[class*="bg-"]:not(.bg-light):not(.bg-white):not(.bg-transparent)
  .nav-sidebar
  > .nav-item-open
  > .nav-link:not(.disabled),
.sidebar-light
  .card[class*="bg-"]:not(.bg-light):not(.bg-white):not(.bg-transparent)
  .nav-sidebar
  > .nav-item
  > .nav-link.active {
  background-color: #26a69a;
  color: #fff;
}

.sidebar-dark .nav-sidebar .nav-item-header,
.sidebar-light
  .card[class*="bg-"]:not(.bg-light):not(.bg-white):not(.bg-transparent)
  .nav-sidebar
  .nav-item-header {
  color: rgba(255, 255, 255, 0.5);
}

.sidebar-dark .nav-sidebar .nav-item-divider,
.sidebar-light
  .card[class*="bg-"]:not(.bg-light):not(.bg-white):not(.bg-transparent)
  .nav-sidebar
  .nav-item-divider {
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar-dark .nav-sidebar > .nav-item-submenu > .nav-group-sub,
.sidebar-light
  .card[class*="bg-"]:not(.bg-light):not(.bg-white):not(.bg-transparent)
  .nav-sidebar
  > .nav-item-submenu
  > .nav-group-sub {
  background-color: rgba(0, 0, 0, 0.15);
}

.sidebar-dark[class*="bg-"]
  .nav-sidebar
  > .nav-item-open
  > .nav-link:not(.disabled),
.sidebar-dark[class*="bg-"] .nav-sidebar > .nav-item > .nav-link.active,
.sidebar
  .card[class*="bg-"]:not(.bg-light):not(.bg-white):not(.bg-transparent)
  .nav-sidebar
  > .nav-item-open
  > .nav-link:not(.disabled),
.sidebar
  .card[class*="bg-"]:not(.bg-light):not(.bg-white):not(.bg-transparent)
  .nav-sidebar
  > .nav-item
  > .nav-link.active {
  background-color: rgba(255, 255, 255, 0.25);
}

.sidebar-light {
  background-color: #fff;
  color: #333;
  border-right: 0 solid rgba(0, 0, 0, 0.125);
  background-clip: content-box;
}
.sidebar-light.sidebar-right {
  border-right: 0;
  border-left: 0 solid rgba(0, 0, 0, 0.125);
}
.sidebar-light .nav-sidebar .nav-link {
  color: rgba(51, 51, 51, 0.85);
}
.sidebar-light .nav-sidebar .nav-link:not(.disabled):hover {
  color: #333;
  background-color: #f5f5f5;
}
.sidebar-light .nav-sidebar .nav-item > .nav-link.active {
  background-color: #f5f5f5;
  color: #333;
}
.sidebar-light .nav-sidebar .nav-item-open > .nav-link:not(.disabled),
.sidebar-light
  .nav-sidebar
  > .nav-item-expanded:not(.nav-item-open)
  > .nav-link {
  background-color: #f5f5f5;
  color: #333;
}
.sidebar-light .nav-sidebar > .nav-item-open > .nav-link:not(.disabled),
.sidebar-light .nav-sidebar > .nav-item > .nav-link.active {
  background-color: #f5f5f5;
  color: #333;
}
.sidebar-light .nav-sidebar .nav-item-header {
  color: rgba(51, 51, 51, 0.5);
}
.sidebar-light .nav-sidebar .nav-item-divider {
  background-color: rgba(0, 0, 0, 0.125);
}
.sidebar-light .nav-sidebar > .nav-item-submenu > .nav-group-sub {
  background-color: transparent;
}
.sidebar-light .sidebar-mobile-toggler {
  color: rgba(51, 51, 51, 0.8);
  border-bottom-color: rgba(0, 0, 0, 0.125);
}
.sidebar-light .sidebar-mobile-toggler:not([class*="bg-"]) {
  background-color: whitesmoke;
}
.sidebar-light .sidebar-mobile-toggler a {
  color: rgba(51, 51, 51, 0.8);
}
.sidebar-light .sidebar-mobile-toggler a:hover {
  color: #333;
  background-color: transparent;
}
.sidebar-light
  .sidebar-mobile-toggler[class*="bg-"]:not(.bg-white):not(.bg-light):not(.bg-transparent) {
  color: rgba(255, 255, 255, 0.9);
  border-bottom-color: rgba(255, 255, 255, 0.1);
}
.sidebar-light
  .sidebar-mobile-toggler[class*="bg-"]:not(.bg-white):not(.bg-light):not(.bg-transparent)
  a {
  color: rgba(255, 255, 255, 0.9);
}
.sidebar-light
  .sidebar-mobile-toggler[class*="bg-"]:not(.bg-white):not(.bg-light):not(.bg-transparent)
  a:hover {
  color: #fff;
  background-color: transparent;
}

.sidebar-component {
  display: none;
  width: 100%;
  border-radius: 0.1875rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.sidebar-fixed .sidebar-content {
  z-index: 1041;
}

@media (min-width: 768px) {
  .sidebar-xs .sidebar-main {
    width: 3.5rem;
  }
  .sidebar-xs .sidebar-main .sidebar-content::-webkit-scrollbar {
    width: 0 !important;
  }
  .sidebar-xs .sidebar-main .card:not(.card-sidebar-mobile),
  .sidebar-xs .sidebar-main .card-title {
    display: none;
  }
  .sidebar-xs .sidebar-main .card-header h6 + .header-elements {
    padding-top: 0.22117rem;
    padding-bottom: 0.22117rem;
  }
  .sidebar-xs .sidebar-main .card-header h5 + .header-elements {
    padding-top: 0.31733rem;
    padding-bottom: 0.31733rem;
  }
  .sidebar-xs .sidebar-main .nav-sidebar > .nav-item {
    position: relative;
    margin: 0;
  }
  .sidebar-xs .sidebar-main .nav-sidebar > .nav-item > .nav-link {
    -ms-flex-pack: center;
    justify-content: center;
    padding-left: 0;
    padding-right: 0;
  }
  .sidebar-xs .sidebar-main .nav-sidebar > .nav-item > .nav-link > i {
    position: static;
    margin-left: 0;
    margin-right: 0;
    display: block;
    padding-bottom: 1px;
  }
  .sidebar-xs .sidebar-main .nav-sidebar > .nav-item > .nav-link > span {
    display: none;
  }
  .sidebar-xs
    .sidebar-main
    .nav-sidebar
    > .nav-item-submenu:hover
    > .nav-group-sub,
  .sidebar-xs
    .sidebar-main
    .nav-sidebar
    > .nav-item-submenu:focus
    > .nav-group-sub {
    display: block !important;
  }
  .sidebar-xs .sidebar-main .nav-sidebar > .nav-item-submenu > .nav-group-sub {
    position: absolute;
    top: -0.5rem;
    right: -16.875rem;
    width: 16.875rem;
    display: none;
    z-index: 1000;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-top-right-radius: 0.1875rem;
    border-bottom-right-radius: 0.1875rem;
  }
  .sidebar-xs
    .sidebar-main
    .nav-sidebar
    > .nav-item-submenu
    > .nav-group-sub[data-submenu-title]:before {
    content: attr(data-submenu-title);
    display: block;
    padding: 0.75rem 1.25rem;
    padding-bottom: 0;
    margin-top: 0.5rem;
    opacity: 0.5;
  }
  .sidebar-xs .sidebar-main .nav-sidebar > .nav-item-submenu > .nav-link:after {
    content: none;
  }
  .sidebar-xs .sidebar-main .nav-sidebar .nav-group-sub .nav-link {
    padding-left: 1.25rem;
  }
  .sidebar-xs
    .sidebar-main
    .nav-sidebar
    .nav-group-sub
    .nav-group-sub
    .nav-link {
    padding-left: 2.25rem;
  }
  .sidebar-xs
    .sidebar-main
    .nav-sidebar
    .nav-group-sub
    .nav-group-sub
    .nav-group-sub
    .nav-link {
    padding-left: 3.5rem;
  }
  .sidebar-xs .sidebar-main .nav-sidebar > .nav-item-header {
    padding: 0;
    text-align: center;
  }
  .sidebar-xs .sidebar-main .nav-sidebar > .nav-item-header > i {
    display: block;
    top: 0;
    padding: 0.75rem 1.25rem;
    margin-top: 0.12502rem;
    margin-bottom: 0.12502rem;
  }
  .sidebar-xs .sidebar-main .nav-sidebar > .nav-item-header > div {
    display: none;
  }
  .sidebar-xs .sidebar-main .nav-sidebar > .nav-item-open > .nav-group-sub {
    display: none !important;
  }
  .sidebar-xs
    .sidebar-main
    .nav-sidebar
    > .nav-item:hover
    > .nav-link.disabled
    + .nav-group-sub,
  .sidebar-xs
    .sidebar-main
    .nav-sidebar
    > .nav-item:hover
    > .nav-link.disabled
    > span,
  .sidebar-xs
    .sidebar-main
    .nav-sidebar
    > .nav-item:focus
    > .nav-link.disabled
    + .nav-group-sub,
  .sidebar-xs
    .sidebar-main
    .nav-sidebar
    > .nav-item:focus
    > .nav-link.disabled
    > span {
    display: none !important;
  }
  .sidebar-xs .sidebar-main .nav-item-submenu-reversed .nav-group-sub {
    top: auto !important;
    bottom: 0;
  }
  .sidebar-xs
    .sidebar-main.sidebar-dark
    .nav-sidebar
    > .nav-item:not(.nav-item-open):hover
    > .nav-link:not(.active):not(.disabled) {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
  }
  .sidebar-xs
    .sidebar-main.sidebar-dark
    .nav-sidebar
    > .nav-item-submenu
    > .nav-group-sub {
    background-color: #304047;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }
  .sidebar-xs
    .sidebar-main.sidebar-light
    .nav-sidebar
    > .nav-item:not(.nav-item-open):hover
    > .nav-link:not(.active):not(.disabled) {
    color: #333;
    background-color: #f5f5f5;
  }
  .sidebar-xs
    .sidebar-main.sidebar-light
    .nav-sidebar
    > .nav-item-submenu
    > .nav-group-sub {
    background-color: #fcfcfc;
    border: 0 solid rgba(0, 0, 0, 0.125);
  }
  .sidebar-xs
    .sidebar-main.sidebar-fixed
    .nav-sidebar
    > .nav-item-submenu:hover
    > .nav-group-sub,
  .sidebar-xs
    .sidebar-main.sidebar-fixed
    .nav-sidebar
    > .nav-item-submenu:focus
    > .nav-group-sub {
    position: fixed;
    left: 3.5rem;
    top: 3.12503rem;
    bottom: 0;
    width: 16.875rem;
    overflow-y: auto;
    border-radius: 0;
  }
  .sidebar-xs
    .navbar-lg:first-child
    ~ .page-content
    .sidebar-fixed.sidebar-main
    .nav-sidebar
    > .nav-item-submenu:hover
    > .nav-group-sub,
  .sidebar-xs
    .navbar-lg:first-child
    ~ .page-content
    .sidebar-fixed.sidebar-main
    .nav-sidebar
    > .nav-item-submenu:focus
    > .nav-group-sub {
    top: 3.37503rem;
  }
  .sidebar-xs
    .navbar-sm:first-child
    ~ .page-content
    .sidebar-fixed.sidebar-main
    .nav-sidebar
    > .nav-item-submenu:hover
    > .nav-group-sub,
  .sidebar-xs
    .navbar-sm:first-child
    ~ .page-content
    .sidebar-fixed.sidebar-main
    .nav-sidebar
    > .nav-item-submenu:focus
    > .nav-group-sub {
    top: 2.87503rem;
  }
}

@media (min-width: 576px) {
  .sidebar-expand-sm.sidebar-main {
    z-index: 99;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  .sidebar-expand-sm.sidebar-main .sidebar-content {
    left: 0;
  }
  .sidebar-expand-sm.sidebar-secondary {
    z-index: 98;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  .sidebar-expand-sm.sidebar-secondary .sidebar-content {
    left: 0;
  }
  .sidebar-expand-sm.sidebar-right {
    z-index: 97;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  .sidebar-expand-sm.sidebar-right .sidebar-content {
    right: 0;
  }
  .sidebar-expand-sm.sidebar-component {
    z-index: 96;
  }
  .sidebar-expand-sm:not(.sidebar-component) {
    position: static;
    transition: none;
  }
}
@media (min-width: 576px) and (prefers-reduced-motion: reduce) {
  .sidebar-expand-sm:not(.sidebar-component) {
    transition: none;
  }
}

@media (min-width: 576px) {
  .sidebar-expand-sm:not(.sidebar-component):not(.sidebar-fixed)
    .sidebar-content {
    position: static;
    overflow: visible;
    width: auto;
  }
  .sidebar-expand-sm.sidebar-dark:not(.sidebar-component)
    + .sidebar-dark:not(.sidebar-component) {
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }
  .sidebar-expand-sm .sidebar-mobile-toggler {
    display: none;
  }
  .sidebar-expand-sm.sidebar-fullscreen {
    width: 16.875rem;
  }
  .sidebar-main-hidden .sidebar-expand-sm.sidebar-main,
  .sidebar-component-hidden .sidebar-expand-sm.sidebar-component,
  .sidebar-secondary-hidden .sidebar-expand-sm.sidebar-secondary,
  .sidebar-mobile-right .sidebar-expand-sm.sidebar-right {
    display: none;
  }
  .sidebar-expand-sm.sidebar-right {
    display: none;
  }
  .sidebar-right-visible .sidebar-expand-sm.sidebar-right {
    display: block;
  }
  .sidebar-expand-sm.sidebar-component {
    display: block;
    width: 16.875rem;
  }
  .sidebar-expand-sm.sidebar-component-left {
    margin-right: 1.25rem;
  }
  .sidebar-expand-sm.sidebar-component-right {
    margin-left: 1.25rem;
  }
}

@media (max-width: 575.98px) {
  .sidebar-expand-sm:not(.sidebar-component) {
    border: 0;
  }
}

@media (min-width: 768px) {
  .sidebar-expand-md.sidebar-main {
    z-index: 99;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  .sidebar-expand-md.sidebar-main .sidebar-content {
    left: 0;
  }
  .sidebar-expand-md.sidebar-secondary {
    z-index: 98;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  .sidebar-expand-md.sidebar-secondary .sidebar-content {
    left: 0;
  }
  .sidebar-expand-md.sidebar-right {
    z-index: 97;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  .sidebar-expand-md.sidebar-right .sidebar-content {
    right: 0;
  }
  .sidebar-expand-md.sidebar-component {
    z-index: 96;
  }
  .sidebar-expand-md:not(.sidebar-component) {
    position: static;
    transition: none;
  }
}
@media (min-width: 768px) and (prefers-reduced-motion: reduce) {
  .sidebar-expand-md:not(.sidebar-component) {
    transition: none;
  }
}

@media (min-width: 768px) {
  .sidebar-expand-md:not(.sidebar-component):not(.sidebar-fixed)
    .sidebar-content {
    position: static;
    overflow: visible;
    width: auto;
  }
  .sidebar-expand-md.sidebar-dark:not(.sidebar-component)
    + .sidebar-dark:not(.sidebar-component) {
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }
  .sidebar-expand-md .sidebar-mobile-toggler {
    display: none;
  }
  .sidebar-expand-md.sidebar-fullscreen {
    width: 16.875rem;
  }
  .sidebar-main-hidden .sidebar-expand-md.sidebar-main,
  .sidebar-component-hidden .sidebar-expand-md.sidebar-component,
  .sidebar-secondary-hidden .sidebar-expand-md.sidebar-secondary,
  .sidebar-mobile-right .sidebar-expand-md.sidebar-right {
    display: none;
  }
  .sidebar-expand-md.sidebar-right {
    display: none;
  }
  .sidebar-right-visible .sidebar-expand-md.sidebar-right {
    display: block;
  }
  .sidebar-expand-md.sidebar-component {
    display: block;
    width: 16.875rem;
  }
  .sidebar-expand-md.sidebar-component-left {
    margin-right: 1.25rem;
  }
  .sidebar-expand-md.sidebar-component-right {
    margin-left: 1.25rem;
  }
}

@media (max-width: 767.98px) {
  .sidebar-expand-md:not(.sidebar-component) {
    border: 0;
  }
}

@media (min-width: 992px) {
  .sidebar-expand-lg.sidebar-main {
    z-index: 99;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  .sidebar-expand-lg.sidebar-main .sidebar-content {
    left: 0;
  }
  .sidebar-expand-lg.sidebar-secondary {
    z-index: 98;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  .sidebar-expand-lg.sidebar-secondary .sidebar-content {
    left: 0;
  }
  .sidebar-expand-lg.sidebar-right {
    z-index: 97;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  .sidebar-expand-lg.sidebar-right .sidebar-content {
    right: 0;
  }
  .sidebar-expand-lg.sidebar-component {
    z-index: 96;
  }
  .sidebar-expand-lg:not(.sidebar-component) {
    position: static;
    transition: none;
  }
}
@media (min-width: 992px) and (prefers-reduced-motion: reduce) {
  .sidebar-expand-lg:not(.sidebar-component) {
    transition: none;
  }
}

@media (min-width: 992px) {
  .sidebar-expand-lg:not(.sidebar-component):not(.sidebar-fixed)
    .sidebar-content {
    position: static;
    overflow: visible;
    width: auto;
  }
  .sidebar-expand-lg.sidebar-dark:not(.sidebar-component)
    + .sidebar-dark:not(.sidebar-component) {
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }
  .sidebar-expand-lg .sidebar-mobile-toggler {
    display: none;
  }
  .sidebar-expand-lg.sidebar-fullscreen {
    width: 16.875rem;
  }
  .sidebar-main-hidden .sidebar-expand-lg.sidebar-main,
  .sidebar-component-hidden .sidebar-expand-lg.sidebar-component,
  .sidebar-secondary-hidden .sidebar-expand-lg.sidebar-secondary,
  .sidebar-mobile-right .sidebar-expand-lg.sidebar-right {
    display: none;
  }
  .sidebar-expand-lg.sidebar-right {
    display: none;
  }
  .sidebar-right-visible .sidebar-expand-lg.sidebar-right {
    display: block;
  }
  .sidebar-expand-lg.sidebar-component {
    display: block;
    width: 16.875rem;
  }
  .sidebar-expand-lg.sidebar-component-left {
    margin-right: 1.25rem;
  }
  .sidebar-expand-lg.sidebar-component-right {
    margin-left: 1.25rem;
  }
}

@media (max-width: 991.98px) {
  .sidebar-expand-lg:not(.sidebar-component) {
    border: 0;
  }
}

@media (min-width: 1200px) {
  .sidebar-expand-xl.sidebar-main {
    z-index: 99;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  .sidebar-expand-xl.sidebar-main .sidebar-content {
    left: 0;
  }
  .sidebar-expand-xl.sidebar-secondary {
    z-index: 98;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  .sidebar-expand-xl.sidebar-secondary .sidebar-content {
    left: 0;
  }
  .sidebar-expand-xl.sidebar-right {
    z-index: 97;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  .sidebar-expand-xl.sidebar-right .sidebar-content {
    right: 0;
  }
  .sidebar-expand-xl.sidebar-component {
    z-index: 96;
  }
  .sidebar-expand-xl:not(.sidebar-component) {
    position: static;
    transition: none;
  }
}
@media (min-width: 1200px) and (prefers-reduced-motion: reduce) {
  .sidebar-expand-xl:not(.sidebar-component) {
    transition: none;
  }
}

@media (min-width: 1200px) {
  .sidebar-expand-xl:not(.sidebar-component):not(.sidebar-fixed)
    .sidebar-content {
    position: static;
    overflow: visible;
    width: auto;
  }
  .sidebar-expand-xl.sidebar-dark:not(.sidebar-component)
    + .sidebar-dark:not(.sidebar-component) {
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }
  .sidebar-expand-xl .sidebar-mobile-toggler {
    display: none;
  }
  .sidebar-expand-xl.sidebar-fullscreen {
    width: 16.875rem;
  }
  .sidebar-main-hidden .sidebar-expand-xl.sidebar-main,
  .sidebar-component-hidden .sidebar-expand-xl.sidebar-component,
  .sidebar-secondary-hidden .sidebar-expand-xl.sidebar-secondary,
  .sidebar-mobile-right .sidebar-expand-xl.sidebar-right {
    display: none;
  }
  .sidebar-expand-xl.sidebar-right {
    display: none;
  }
  .sidebar-right-visible .sidebar-expand-xl.sidebar-right {
    display: block;
  }
  .sidebar-expand-xl.sidebar-component {
    display: block;
    width: 16.875rem;
  }
  .sidebar-expand-xl.sidebar-component-left {
    margin-right: 1.25rem;
  }
  .sidebar-expand-xl.sidebar-component-right {
    margin-left: 1.25rem;
  }
}

@media (max-width: 1199.98px) {
  .sidebar-expand-xl:not(.sidebar-component) {
    border: 0;
  }
}

.sidebar-expand.sidebar-main {
  z-index: 99;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.sidebar-expand.sidebar-main .sidebar-content {
  left: 0;
}

.sidebar-expand.sidebar-secondary {
  z-index: 98;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.sidebar-expand.sidebar-secondary .sidebar-content {
  left: 0;
}

.sidebar-expand.sidebar-right {
  z-index: 97;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.sidebar-expand.sidebar-right .sidebar-content {
  right: 0;
}

.sidebar-expand.sidebar-component {
  z-index: 96;
}

.sidebar-expand:not(.sidebar-component) {
  position: static;
  transition: none;
}
@media (prefers-reduced-motion: reduce) {
  .sidebar-expand:not(.sidebar-component) {
    transition: none;
  }
}
.sidebar-expand:not(.sidebar-component):not(.sidebar-fixed) .sidebar-content {
  position: static;
  overflow: visible;
  width: auto;
}

.sidebar-expand.sidebar-dark:not(.sidebar-component)
  + .sidebar-dark:not(.sidebar-component) {
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-expand .sidebar-mobile-toggler {
  display: none;
}

.sidebar-expand.sidebar-fullscreen {
  width: 16.875rem;
}

.sidebar-main-hidden .sidebar-expand.sidebar-main,
.sidebar-component-hidden .sidebar-expand.sidebar-component,
.sidebar-secondary-hidden .sidebar-expand.sidebar-secondary,
.sidebar-mobile-right .sidebar-expand.sidebar-right {
  display: none;
}

.sidebar-expand.sidebar-right {
  display: none;
}
.sidebar-right-visible .sidebar-expand.sidebar-right {
  display: block;
}

.sidebar-expand.sidebar-component {
  display: block;
  width: 16.875rem;
}
.sidebar-expand.sidebar-component-left {
  margin-right: 1.25rem;
}
.sidebar-expand.sidebar-component-right {
  margin-left: 1.25rem;
}

.sidebar-expand:not(.sidebar-component) {
  border: 0;
}

.sidebar:not(.bg-transparent) .card {
  border-width: 0;
  margin-bottom: 0;
  border-radius: 0;
  box-shadow: none;
}
.sidebar:not(.bg-transparent) .card .card {
  border-width: 1px;
}
.sidebar:not(.bg-transparent) .card:not([class*="bg-"]):not(.fixed-top) {
  background-color: transparent;
}

.sidebar .card-footer {
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.sidebar .row:not(.no-gutters) {
  margin-left: -0.3125rem;
  margin-right: -0.3125rem;
}
.sidebar .row:not(.no-gutters) [class*="col"] {
  padding-left: 0.3125rem;
  padding-right: 0.3125rem;
}

.sidebar .form-group:last-child {
  margin-bottom: 0;
}

.sidebar .nav-tabs .nav-item:first-child .nav-link {
  border-left: 0;
}

.sidebar .nav-tabs .nav-item:last-child .nav-link {
  border-right: 0;
}

.sidebar .nav-tabs .nav-link {
  border-top: 0;
  border-bottom-width: 0;
}
.sidebar .nav-tabs .nav-link.active {
  border-bottom-color: transparent;
}

.sidebar-dark .nav-tabs {
  background-color: #1e272c;
  border-bottom-color: rgba(255, 255, 255, 0.1);
}
.sidebar-dark .nav-tabs .nav-link {
  color: rgba(255, 255, 255, 0.9);
}
.sidebar-dark .nav-tabs .nav-link:hover,
.sidebar-dark .nav-tabs .nav-link:focus {
  color: #fff;
}
.sidebar-dark .nav-tabs .nav-link.active {
  color: #fff;
}
.sidebar-dark .nav-tabs:not(.nav-tabs-bottom) .nav-link.active {
  background-color: #263238;
  border-color: rgba(255, 255, 255, 0.1);
}
.sidebar-dark .nav-tabs .nav-item.show .nav-link:not(.active) {
  color: #fff;
}

.sidebar-light .nav-tabs {
  background-color: whitesmoke;
  border-bottom-color: rgba(0, 0, 0, 0.125);
}
.sidebar-light .nav-tabs .nav-link:hover,
.sidebar-light .nav-tabs .nav-link:focus {
  color: #333;
}
.sidebar-light .nav-tabs .nav-link.active {
  color: #333;
}
.sidebar-light .nav-tabs:not(.nav-tabs-bottom) .nav-link.active {
  background-color: #fff;
}

.row-tile {
  border-radius: 0.1875rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.row-tile div[class*="col"] .btn {
  border-width: 0;
  border-radius: 0;
}
.row-tile div[class*="col"] .btn-light,
.row-tile div[class*="col"] .bg-white {
  border-color: rgba(0, 0, 0, 0.125);
}
.row-tile div[class*="col"]:first-child .btn:first-child {
  border-top-left-radius: 0.1875rem;
}
.row-tile div[class*="col"]:first-child .btn:last-child {
  border-bottom-left-radius: 0.1875rem;
}
.row-tile div[class*="col"]:last-child .btn:first-child {
  border-top-right-radius: 0.1875rem;
}
.row-tile div[class*="col"]:last-child .btn:last-child {
  border-bottom-right-radius: 0.1875rem;
}
.row-tile div[class*="col"] .btn + .btn {
  border-top-width: 1px;
}
.row-tile div[class*="col"] + div[class*="col"] .btn {
  border-left-width: 1px;
}

.sidebar-user-material .sidebar-user-material-body {
  /* background: url(/images/backgrounds/user_bg3.jpg) center center no-repeat; */
  background-size: cover;
}

.sidebar-dark .sidebar-user-material .collapse {
  background-color: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-light .sidebar-user-material .collapse {
  background-color: transparent;
  border-bottom: 1px solid #ddd;
}

.sidebar-user-material-footer > a {
  padding: 0.75rem 1.25rem;
  display: block;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.15);
  transition: background-color ease-in-out 0.15s;
}
@media (prefers-reduced-motion: reduce) {
  .sidebar-user-material-footer > a {
    transition: none;
  }
}
.sidebar-user-material-footer > a:hover,
.sidebar-user-material-footer > a[aria-expanded="true"] {
  background-color: rgba(0, 0, 0, 0.25);
}
.sidebar-user-material-footer > a:after {
  transition: all ease-in-out 0.15s;
}
@media (prefers-reduced-motion: reduce) {
  .sidebar-user-material-footer > a:after {
    transition: none;
  }
}
.sidebar-user-material-footer > a[aria-expanded="true"]:after {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

@media (min-width: 768px) {
  .sidebar-xs .sidebar-user-material-body > .card-body {
    display: none;
  }
  .sidebar-xs .sidebar-user-material-footer > a {
    padding: 1.25rem;
  }
  .sidebar-xs .sidebar-user-material-footer > a:after {
    margin: auto;
  }
  .sidebar-xs .sidebar-user-material-footer > a > span {
    display: none;
  }
}
</style>
