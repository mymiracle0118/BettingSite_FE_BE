<template>
  <div>
    <PageHeader :title="'General Lock'" :items="items" />
    <!-- <div class="row">
        <div class="col-12">
          <div class="page-title-box d-flex align-items-center justify-content-between">
            <h4 class="mb-0 font-size-18">General Lock</h4>

            <div class="page-title-right">
              <b-breadcrumb :items="items" class="m-0"></b-breadcrumb>
            </div>
          </div>
        </div>
      </div> -->
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="user-lock-container">
              <div class="m-t-20">
                <div class="">
                  <form
                    method="post"
                    v-on:submit.prevent="getUserLockData()"
                    class="ajaxFormSubmit"
                  >
                    <div class="row row5">
                      <div class="col-md-3">
                        <div
                          class="form-group user-lock-search"
                          style="position: relative"
                        >
                          <!-- <label for="d-inline-block">Search By Client Name</label> -->
                          <multiselect
                            @search-change="searchUser"
                            v-model="username"
                            :searchable="true"
                            :internal-search="true"
                            :clear-on-select="false"
                            :close-on-select="true"
                            :select-label="''"
                            :deselect-label="''"
                            label="uname"
                            track-by="uguid"
                            :options="searchedUsers"
                            autocomplete="random"
                            placeholder="Search By Client Name"
                            
                          >
                            <span slot="noResult">No elements found</span>
                          </multiselect>

                          <!-- <input @keyup="searchUser()" @focus="searchOpen()" v-model="searchUserText" type="text" class="form-control d-inline-block user-search-box" placeholder="Search User">
                    <i v-if="searchLoading" class="fa fa-spinner fa-spin" ></i>
                    <div class="search-box" v-if="isSearch">
                        <template v-for="(user, key) in filteredUserList">
                            <div @click="selectSearchedUser(user)" :key="key">{{ user.uname }}</div>
                        </template>
                    </div> -->
                          <!-- <select id="list-ac" v-model="postData.client"  name="list" class="js-data-example-ajax form-control"></select> -->
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="form-group">
                          <!--  <label for="d-inline-block">Transaction Code</label> -->
                          <input
                            v-model="mpass"
                            type="password"
                            class="form-control d-inline-block"
                            placeholder="Transaction Code"
                          />
                        </div>
                      </div>
                      <div class="col-md-2">
                        <!-- <label style="width: 100%">&nbsp</label> -->
                        <button type="submit" class="btn btn-primary" id="loaddata">
                          Load
                        </button>
                        <button
                          type="button"
                          class="btn btn-light"
                          id="reset"
                          @click="resetReportForm()"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div v-if="showForm">
                <div class="row mt-3">
                  <div class="col-lg-6 col-12" v-if="sportsList && sportsList.length > 0">
                    <h4 class="ptitle">Events</h4>
                    <ul class="navbar-nav user-lock-nav" id="accordian1">
                      <li
                        class="nav-item dropdown show"
                        v-for="(event, key) in sportsList"
                      >
                        <a
                          class="arrow-icon"
                          title="click here to expand"
                          data-toggle="collapse"
                          :data-target="'#menu-' + event.etid"
                          role="button"
                          aria-expanded="false"
                          v-if="event.children"
                        >
                          <i class="fas fa-angle-down"></i>
                        </a>
                        <a v-else href="javascript:void(0)" class="arrow-icon">&nbsp;</a>
                        <span class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            :id="event.etid"
                            :value="event.etid"
                            v-model="lockData.sports"
                            @click="
                              lockUser(event.etid, 'eventtype', 'match', event.name)
                            "
                            class="custom-control-input"
                          />
                          <label :for="event.etid" class="custom-control-label">{{
                            event.name
                          }}</label>
                        </span>
                        <ul
                          class="sub-menu collapse"
                          v-if="event.children"
                          :id="'menu-' + event.etid"
                          data-parent="#accordian1"
                        >
                          <li v-for="(comm, key1) in event.children">
                            <a
                              class="arrow-icon"
                              title="click here to expand"
                              data-toggle="collapse"
                              :data-target="'#menu-' + comm.cid"
                              role="button"
                              aria-expanded="false"
                              v-if="comm.children"
                            >
                              <i class="fas fa-angle-down"></i>
                            </a>
                            <a v-else href="javascript:void(0)" class="arrow-icon"
                              >&nbsp;</a
                            >
                            <span :key="key1" class="custom-control custom-checkbox">
                              <template v-if="checkLock(event.etid)">
                                <input
                                  type="checkbox"
                                  :id="event.etid+comm.cid"
                                  :value="comm.cid"
                                  checked="checked"
                                  disabled="disabled"
                                  v-model="checked"
                                  class="custom-control-input"
                                />
                              </template>
                              <template v-else>
                                <input
                                  type="checkbox"
                                  :id="event.etid+comm.cid"
                                  :value="comm.cid"
                                  v-model="lockData.sports"
                                  @click="lockUser(comm.cid, 'comm', 'match', comm.name)"
                                  class="custom-control-input"
                                />
                              </template>
                              <label :for="event.etid+comm.cid" class="custom-control-label">{{
                                comm.name
                              }}</label>
                            </span>

                            <ul
                              class="sub-menu collapse"
                              v-if="comm.children"
                              :id="'menu-' + comm.cid"
                              :data-parent="'#menu-' + event.etid"
                            >
                              <li v-for="(game, key2) in comm.children">
                                <a
                                  class="arrow-icon"
                                  title="click here to expand"
                                  data-toggle="collapse"
                                  :data-target="'#menu-' + game.gmid"
                                  role="button"
                                  aria-expanded="false"
                                  v-if="game.children"
                                >
                                  <i class="fas fa-angle-down"></i>
                                </a>
                                <a v-else href="javascript:void(0)" class="arrow-icon"
                                  >&nbsp;</a
                                >
                                <span :key="key2" class="custom-control custom-checkbox">
                                  <template v-if="checkGameLock(event.etid, comm.cid, 0)">
                                    <input
                                      type="checkbox"
                                      :id="event.etid+comm.cid+game.gmid"
                                      :value="game.gmid"
                                      v-model="checked"
                                      checked="checked"
                                      disabled="disabled"
                                      class="custom-control-input"
                                    />
                                  </template>
                                  <template v-else>
                                    <input
                                      type="checkbox"
                                      :id="event.etid+comm.cid+game.gmid"
                                      :value="game.gmid"
                                      v-model="lockData.sports"
                                      @click="
                                        lockUser(game.gmid, 'game', 'match', game.name)
                                      "
                                      class="custom-control-input"
                                    />
                                  </template>
                                  <label :for="event.etid+comm.cid+game.gmid" class="custom-control-label">{{
                                    game.name
                                  }}</label>
                                </span>

                                <ul
                                  class="sub-menu collapse"
                                  v-if="game.children"
                                  :id="'menu-' + game.gmid"
                                  :data-parent="'#menu-' + comm.cid"
                                >
                                  <template v-for="(gtypeData, key3) in game.children">
                                    <h5 class="mb-0 font-size-16">
                                      {{ gtypeData.gtype }}
                                    </h5>
                                    <li v-for="(market, key4) in gtypeData.children">
                                      <span
                                        :key="key2"
                                        class="custom-control custom-checkbox"
                                      >
                                        <template
                                          v-if="
                                            checkGameLock(event.etid, comm.cid, game.gmid)
                                          "
                                        >
                                          <input
                                            type="checkbox"
                                            :id="event.etid+comm.cid+game.gmid+market.mid"
                                            :value="market.mid"
                                            v-model="checked"
                                            checked="checked"
                                            disabled="disabled"
                                            class="custom-control-input"
                                          />
                                        </template>
                                        <template v-else>
                                          <input
                                            type="checkbox"
                                            :id="event.etid+comm.cid+game.gmid+market.mid"
                                            :value="market.mid"
                                            v-model="lockData.sports"
                                            @click="
                                              lockUser(
                                                market.mid,
                                                'market',
                                                gtypeData.gtype,
                                                market.mname
                                              )
                                            "
                                            class="custom-control-input"
                                          />
                                        </template>
                                        <label
                                          :for="event.etid+comm.cid+game.gmid+market.mid"
                                          class="custom-control-label"
                                          >{{ market.mname }}</label
                                        >
                                      </span>
                                    </li>
                                  </template>
                                </ul>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div class="col-lg-6 col-12" v-if="casinoList && casinoList.length > 0">
                    <h4 class="ptitle">Casino List</h4>
                    <ul class="user-lock-nav">
                      <li v-for="(casino, key) in casinoList">
                        <span class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            :id="casino.gtype"
                            :value="casino.gtype"
                            v-model="lockData.casino"
                            @click="
                              lockUser(0, casino.lktype, casino.gtype, casino.casino)
                            "
                            class="custom-control-input"
                          />
                          <label :for="casino.gtype" class="custom-control-label">{{
                            casino.casino
                          }}</label>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ServiceApi from "@/services/ServiceApi";
import Multiselect from "vue-multiselect";
import PageHeader from "@/components/page-header";
export default {
  components: {
    Multiselect,
    PageHeader,
  },
  mounted() {
    //this.getTreeData();
    //this.getCasinoList();
  },
  data() {
    return {
      items: [
        {
          text: "Home",
          to: { name: "home" },
        },
        {
          text: "General Lock",
          active: true,
        },
      ],
      reportData: [],
      searchedUsers: [],
      checked: 1,
      sportsList: [],
      casinoList: [],
      lockData: {
        sports: [],
        casino: [],
      },
      mpass: "",
      username: null,
      showForm: false,
    };
  },
  computed: {},
  methods: {
    resetReportForm() {
      this.mpass = "";
      this.reportData = [];
      this.searchedUsers = [];
      this.username = null;
      this.lockData.sports = [];
      this.lockData.casino = [];
      this.showForm = false;
      this.sportsList = [];
      this.casinoList = [];
    },
    getTreeData() {
      ServiceApi.callApi("treeviewdatamar", {})
        .then((response) => {
          if (response.status == 200) {
            this.sportsList = response.data;
          } else {
            this.sportsList = [];
          }
        })
        .catch((e) => {
          this.sportsList = [];
        });
    },
    searchUser(query) {
      if (query.length > 2 && this.searchedUsers.length == 0) {
        ServiceApi.callApi("searchalluser", {
          uname: query,
        })
          .then((response) => {
            if (response.success) {
              this.searchedUsers = response.data.t1;
            } else {
              this.searchedUsers = [];
            }
          })
          .catch((e) => {
            this.searchedUsers = [];
          });
      }
      if (query.length < 3) {
        this.searchedUsers = [];
      }
    },
    getUserLockData() {
      this.$store.state.isLoading = true;
      ServiceApi.callApi("generallocklist", {
        guid: this.username != null ? this.username.uguid : "",
        mpass: this.mpass,
      })
        .then((response) => {
          this.$store.state.isLoading = false;
          if (response.status == 200) {
            if (response.data && response.data.t1) {
              this.setGeneralLockData(response.data.t1);
            } else {
              this.lockData.sports = [];
              this.lockData.casino = [];
            }
            this.showForm = true;
          } else {
            this.$swal({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              type: "error",
              icon: "error",
              text: response.msg,
            });
            this.lockData.sports = [];
            this.lockData.casino = [];
            this.showForm = false;
          }
          if (this.sportsList.length == 0) {
            this.getTreeData();
          }
          if (this.casinoList.length == 0) {
            this.getCasinoList();
          }
        })
        .catch((e) => {});
    },
    setGeneralLockData(ldata) {
      let lockSportsIds = [];
      let lockCasinoIds = [];
      ldata.forEach(function (data) {
        if (data.lkid == "0") {
          lockCasinoIds.push(data.gtype);
        } else {
          lockSportsIds.push(data.lkid);
        }
      });
      this.lockData.sports = lockSportsIds;
      this.lockData.casino = lockCasinoIds;
    },
    lockUser(lkid, lktype, gtype, lkname) {
      //event.stopPropagation();
      this.$store.state.isLoading = true;
      let endpoint = "generallock";
      if (lkid != 0) {
        if (this.lockData.sports.includes(parseInt(lkid))) {
          endpoint = "generalunlock";
        }
      } else {
        if (this.lockData.casino.includes(gtype)) {
          endpoint = "generalunlock";
        }
      }
      let guid = this.username != null ? this.username.uguid : "";
      ServiceApi.callApi(endpoint, {
        guid: guid,
        mpass: this.mpass,
        lkid: parseInt(lkid),
        lkname: lkname,
        lktype: lktype,
        gtype: gtype,
      })
        .then((response) => {
          this.$store.state.isLoading = false;
          if (response.status == 200) {
            this.setGeneralLockData(response.data.t1);
          } else {
            this.getUserLockData();
          }
        })
        .catch((e) => {});
    },
    checkLock(id) {
      if (this.lockData.sports.includes(parseInt(id))) {
        return true;
      } else {
        return false;
      }
    },
    checkGameLock(etid, cid, gmid) {
      if (
        this.lockData.sports.includes(parseInt(etid)) ||
        this.lockData.sports.includes(parseInt(cid)) ||
        this.lockData.sports.includes(parseInt(gmid))
      ) {
        return true;
      } else {
        return false;
      }
    },
    getCasinoList() {
      ServiceApi.callApi("casinolist", {})
        .then((response) => {
          if (response.status == 200) {
            this.casinoList = response.data.t1;
          } else {
            this.casinoList = [];
          }
        })
        .catch((e) => {
          this.casinoList = [];
        });
    },
  },
  beforeDestroy() {},
};
</script>
