<script>
import NavBar from "../components/nav-bar";
import SideBar from "../components/side-bar";
import RightBar from "../components/right-bar";
import Footer from "../components/footer";
import Loader from "../components/loader";

export default {
  components: { NavBar, SideBar, RightBar, Footer, Loader },
  data() {
    return {
      isMenuCondensed: false
    };
  },
  created: () => {
    document.body.removeAttribute("data-layout", "horizontal");
    document.body.removeAttribute("data-topbar", "dark");
    document.body.removeAttribute("data-layout-size", "boxed");
  },
  mounted() {
    this.$store.state.userdata = JSON.parse(this.$ls.get("user"));
  },
  methods: {
    toggleMenu() {
      document.body.classList.toggle("sidebar-enable");

      if (window.screen.width >= 992) {
        // eslint-disable-next-line no-unused-vars
        document.body.classList.toggle("vertical-collpsed");
      } else {
        // eslint-disable-next-line no-unused-vars
        document.body.classList.remove("vertical-collpsed");
      }
      this.isMenuCondensed = !this.isMenuCondensed;
    },
    toggleRightSidebar() {
      document.body.classList.toggle("right-bar-enabled");
    },
    hideRightSidebar() {
      document.body.classList.remove("right-bar-enabled");
    }
  }
};
</script>

<template>
  <div id="layout-wrapper">
    <NavBar />
    <SideBar :is-condensed="isMenuCondensed" />
    <!-- ============================================================== -->
    <!-- Start Page Content here -->
    <!-- ============================================================== -->

    <div class="main-content">
      <div class="page-content">
        <Loader :is-visible="$store.state.isLoading"></Loader>
        <!-- Start Content-->
        <div class="">
           <router-view :key="$route.path"></router-view>
        </div>
      </div>
      <Footer />
    </div>
    <RightBar />
  </div>
</template>
<style scoped>
.page-content{
  position: relative;
}
</style>
