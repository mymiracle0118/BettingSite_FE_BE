<template>
  <!-- Main navbar -->
  <div class="navbar navbar-expand-md navbar-dark">
    <!-- Header with logos -->
		<div class="navbar-header navbar-dark d-none d-md-flex align-items-md-center">
			<div class="navbar-brand navbar-brand-md text-center">
			</div>
		</div>
		<!-- /header with logos -->
    <div class="d-md-none">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
        <i class="icon-tree5"></i>
      </button>
      <button class="navbar-toggler sidebar-mobile-main-toggle" type="button"
        @click="$store.commit('toggleMobileSidebar')">
        <i class="icon-paragraph-justify3"></i>
      </button>
    </div>
    <div class="collapse navbar-collapse" id="navbar-mobile">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" @click="$store.commit('toggleMainSidebar')">
          <a href="javascript:void(0);" class="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block">
            <i class="icon-paragraph-justify3"></i>
          </a>
        </li>
      </ul>
      <!-- <span class="badge bg-success ml-md-3 mr-md-auto">Online</span> -->
      <ul class="navbar-nav my-2 my-lg-0">
        <li class="nav-item dropdown">
          <a href="javascript:void(0);" class="navbar-nav-link dropdown-toggle caret-0" data-toggle="dropdown">
            <i class="icon-search4 mr-2"></i>
            <span class="d-md-none ml-2">Search</span>
          </a>
          <div class="dropdown-menu dropdown-menu-right dropdown-content wmin-md-350">
            <div class="dropdown-content-body dropdown-scrollable p-2">
              <div class="form-group form-group-feedback form-group-feedback-right mb-1">
                <input type="text" class="form-control" placeholder="Search">
                <div class="form-control-feedback">
                  <i class="icon-spinner2 spinner"></i>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="nav-item dropdown dropdown-user">
          <a href="javascript:void(0);" class="navbar-nav-link d-flex align-items-center dropdown-toggle"
            data-toggle="dropdown" >
            <span>{{this.$store.state.user.uname}}</span>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <router-link :to="{name:'Changepassword'}" class="dropdown-item"><i class="icon-user-plus"></i> Change Password</router-link>
            <a href="javascript:void(0);" class="dropdown-item"><i class="icon-coins"></i> My balance</a>
            <a href="javascript:void(0);" class="dropdown-item"><i class="icon-comment-discussion"></i> Messages
              <span class="badge badge-pill bg-blue ml-auto">58</span></a>
            <div class="dropdown-divider"></div>
            <a href="javascript:void(0);" class="dropdown-item"><i class="icon-cog5"></i> Account settings</a>
            <a href="javascript:void(0);" class="dropdown-item"><i class="icon-switch2"></i> Logout</a>
          </div>
        </li>
        <li class="nav-item">
          <a href="javascript:void(0)" @click="logoutUser()" class="navbar-nav-link legitRipple">
            <i class="icon-switch2"></i>
            <span class="d-md-none ml-2">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <!-- /main navbar -->
</template>
<script>
var timeout = null;

export default {
  data() {
    return {
     
    };
  },
  mounted() {

  },
  methods: {
    logoutUser() {
      this.$ls.remove("token");
      this.$ls.remove("user");
      this.$auth.logout();
      this.$router.push({
        name: "login"
      });
    }
  }
};
</script>
