<template>
  <div>
    <PageHeader :title="'Account List'" :items="items" />

    <div class="row account-list">
      <div class="col-12">
        <div class="card">

          <div class="card-body">
            <div class="row row5">
              <div class="col-md-6 mb-2 search-form">
                <form method="post" v-on:submit.prevent="getUserList(1)" class="ajaxFormSubmit">
                  <div class="d-inline-block form-group form-group-feedback form-group-feedback-right">
                    
                    <input type="text" name="searchKey" v-model="uname" class="form-control" placeholder="Search User"
                    >
                  </div>
                  <div class="d-inline-block">
                    <button type="submit" class="btn btn-primary" id="submit">Load</button>
                    <button type="button" class="btn btn-light" id="reset" @click="resetUserList()">Reset</button>
                    
                  </div>
                </form>
              </div>
              <div class="col-md-6 text-right mb-2">
                <div class="d-inline-block mr-2">
                  <downloadexcel
                  :fields="excelColumns"
                  :fetch="fetchExcelData"
                  type="csv"
                  :name="'userlist.xls'"
                  class="d-inline-block"
                  >
                  <b-button class="mr-1" variant="success" type="button" :disabled="userList.length == 0">
                  <i class="fas fa-file-excel"></i>
                  </b-button>
                  </downloadexcel>
                  <b-button
                  variant="danger"
                  @click="exportPdf"
                  type="button"
                  :disabled="userList.length == 0"
                  >
                  <i class="fas fa-file-pdf"></i>
                  </b-button>
                </div>
                  
                <div class="d-inline-block" v-if="guid == '' && $store.state.acl.uinsert">
                  <router-link  :to="{name:'Insertuser'}" class="btn btn-success"><i class="fa fa-plus" aria-hidden="true"></i> CREATE ACCOUNT</router-link>
                </div>
                  
              </div>
            </div>
            
            
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select v-model="perPage" :options="pageOptions" size="sm"></b-form-select>&nbsp;entries
                  </label>
                </div>
              </div>
              <!-- Search -->
              <!-- <div class="col-sm-12 col-md-6">
                <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                  <label class="d-inline-flex align-items-center">
                    Search:
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Search..."
                      class="form-control form-control-sm ml-2"
                    ></b-form-input>
                  </label>
                </div>
              </div> -->
              <!-- End search -->
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0">
              <b-table
                show-empty
                responsive="sm"
                id="eventsListTbl"
                class="table no-footer"
                :fields="userstblfields"
                :items="userList"
                :filter="filter"
                @filtered="onFiltered"
              >
                <template v-slot:cell(uname)="data">
                  <router-link
                    v-if="data.item.utype.toLowerCase() != 'user'"
                    v-b-tooltip.hover.right
                    :title="data.item.fname"
                   
                    :to="goToChild(data.item)"
                    target="_blank"
                    class="wrape-text"
                  >
                    <span>{{data.item.uname}}</span>
                  </router-link>
                  <span v-else :title="data.item.fname">{{data.item.uname}}</span>
                </template>
                <template v-slot:cell(crebal)="data">
                  <p
                    v-if="guid == '' && $store.state.acl.creditref"
                    @click="openUserCreditUpdateMdl(data.item)"
                    class="text-right mb-0 cp text-warning"
                  v-currencyint="data.item.crebal">{{data.item.crebal}}</p>
                  <p v-else class="text-right mb-0" v-currencyint="data.item.crebal"></p>

                </template>
                <template v-slot:cell(subgen)="data">
                  <p class="text-right mb-0" v-currencyint="data.item.subgen"></p>
                </template>
                <template v-slot:cell(pl)="data">
                  <p class="text-right mb-0" v-currencyint="data.item.pl"></p>
                </template>
                <template v-slot:cell(plper)="data">
                  <template v-if="data.item.utype.toLowerCase() != 'user'">
                    <p class="text-right mb-0">{{ parseFloat((100 - parseInt(data.item.pship.split(" ")[0]))*data.item.pl/100).toFixed(2) }}</p>
                  </template>
                  <template v-else><p class="text-center">-</p></template>
                </template>
                <template v-slot:cell(expo)="data">
                  <p v-if="data.item.expo == 0" class="mb-0 text-right">0</p>
                  <a v-else href="javascript:void(0)" class="text-right mb-0" v-currencyint="data.item.expo" @click="openMarketAnalysisModal(data.item)"></a>

                </template>
                <template v-slot:cell(bal)="data">

                  <p class="text-right mb-0" v-if="data.item.utype.toLowerCase() == 'user'" v-currencyint="data.item.subgen - data.item.expo"></p>
                  <p class="text-right mb-0" v-else v-currencyint="data.item.bal"></p>
                </template>
                <template v-slot:cell(pname)="data">
                  <p class="text-left mb-0" v-if="data.item.utype.toLowerCase() != 'user'">{{data.item.pship }}</p>
                  <p v-else>-</p>
                </template>
                <!--  <template v-slot:cell(pship)="data">
                  <p class="text-left mb-0">{{data.item.pship}}</p>
                </template>-->
                <!-- <template v-slot:cell(plname)="data">
                  <p class="text-left mb-0" v-if="data.item.utype.toLowerCase() != 'user'">{{data.item.plname}}</p>
                  <p v-else>-</p>
                </template> -->

                
                <template v-slot:cell(guid)="data">
                  <b-button-group>
                    
                    <b-button v-if="guid == '' && $store.state.acl.depo" @click="openUserdepositeMDL(data.item)" variant="success">D</b-button>

                    <b-button v-if="guid == '' && $store.state.acl.withdraw" @click="openUserwithdrwalMDL(data.item)" variant="danger">W</b-button>

                    <b-button v-if="guid == ''" @click="openUserExtraMDL(data.item)" variant="info">More</b-button> 
                    <b-button v-else @click="openUserExtraMDL(data.item)" variant="info">P</b-button> 
                  </b-button-group>
                </template>
                <template v-slot:cell(bact)="data">
                  <b-form-checkbox disabled v-model="data.item.bact ? false: true" switch class="mb-1"></b-form-checkbox>
                </template>
                <template v-slot:cell(uact)="data">
                  <b-form-checkbox disabled v-model="data.item.uact ? false: true" switch class="mb-1"></b-form-checkbox>
                </template>
              </b-table>
            </div>
            <div class="row pt-3">
              <div class="col">
                <div class="dataTables_paginate paging_simple_numbers float-right">
                  <ul class="pagination pagination-rounded mb-0">
                    <!-- pagination -->
                    <b-pagination
                      align="right"
                      :total-rows="totalRows"
                      :per-page="perPage"
                      v-model="currentPage"
                      class="dataTables_paginate paging_simple_numbers my-0"
                    />
                  </ul>
                </div>
              </div>
            </div>
            <b-modal
              ref="creditUpdate"
              size="lg"
              body-class="credit-mdl"
              header-bg-variant="warning"
              hide-footer
              class
            >
              <template slot="modal-header" class>
                <h5 class="modal-title text-uppercase text-white">Credit Activity</h5>
                <button
                  type="button"
                  class="close text-white"
                  data-dismiss="modal"
                  @click="hideModal('creditUpdate')"
                >&times;</button>
              </template>
              <InsideLoader :is-visible="CreditLoader"></InsideLoader>
              <b-tabs active-nav-item-class="tab-bg-warning" content-class="text-muted">
                <b-tab active @click="openCreditTabs('addCredit')">
                  <template v-slot:title>
                    <!-- <span class="d-inline-block d-sm-none">
                      <i class="fas fa-home"></i>
                    </span> -->
                    <span>Credit Deposit</span>
                  </template>
                  <form
                    @submit.prevent="updateUserCredit('userCreditUpdate')"
                    data-vv-scope="userCreditUpdate"
                    method="post"
                    v-if="CreditData.length > 0 && creditTab == 1"
                  >
                    <div class="form-group row">
                      <label class="col-form-label col-4">{{CreditData[0].uname}}</label>
                      <div class="col-8">
                        <div class="row">
                          <div class="col-6">
                            <input
                              placeholder="Amount"
                              class="form-control txt-right"
                              v-model="userDiposite.loginusramount"
                              type="text"
                              readonly
                              name="userCreditUpdateloginusramount"
                            />
                          </div>
                          <div class="col-6">
                            <input
                              placeholder="Amount"
                              class="form-control txt-right"
                              v-model="userDiposite.loginusrNamount"
                              type="text"
                              readonly
                              name="userCreditUpdateloginusrNamount"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-4">{{CreditData[1].uname}}</label>
                      <div class="col-8">
                        <div class="row">
                          <div class="col-6">
                            <input
                              placeholder="Amount"
                              class="form-control txt-right"
                              v-model="userDiposite.usrnameamount"
                              type="text"
                              readonly
                              name="userCreditUpdateusrnameamount"
                            />
                          </div>
                          <div class="col-6">
                            <input
                              placeholder="Amount"
                              class="form-control txt-right"
                              v-model="userDiposite.usrnameNamount"
                              type="text"
                              readonly
                              name="userCreditUpdateusrnameNamount"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-4">Amount</label>
                      <div class="col-8 form-group-feedback form-group-feedback-right">
                        <input
                          placeholder="Amount"
                          class="form-control txt-right"
                          v-model="userDiposite.amount"
                          type="text"
                          name="userCreditUpdateamount"
                          v-validate="'required|max:14'"
                          @keypress="isNumber($event)"
                          @keyup="calculateAddCreditChange()"
                          :class="{ 'is-invalid' : verrors.first('userCreditUpdate.userCreditUpdateamount')}"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-4">Remark</label>
                      <div class="col-8 form-group-feedback form-group-feedback-right">
                        <textarea
                          placeholder="Remark"
                          class="form-control"
                          v-model="userDiposite.remark"
                          name="userCreditUpdateremark"
                         
                          :class="{ 'is-invalid' : verrors.first('userCreditUpdate.userCreditUpdateremark')}"
                        ></textarea>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-4">Transaction Code</label>
                      <div class="col-8 form-group-feedback form-group-feedback-right">
                        <input
                          placeholder="Transaction Code"
                          class="form-control"
                          v-model="userDiposite.mpassword"
                          name="userCreditUpdatempassword"
                          type="password"
                          v-validate="'required'"
                          :class="{ 'is-invalid' : verrors.first('userCreditUpdate.userCreditUpdatempassword')}"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-12 text-right">
                        <button type="submit" class="btn btn-warning">
                          submit
                          <i class="fas fa-sign-in-alt ml-1"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </b-tab>
                <b-tab @click="openCreditTabs('withdrawCredit')">
                  <template v-slot:title>
                    <!-- <span class="d-inline-block d-sm-none">
                      <i class="fas fa-home"></i>
                    </span> -->
                    <span>Credit Withdraw</span>
                  </template>
                  <form
                    @submit.prevent="withdrawUserCredit('userWithdrawCreditUpdate')"
                    data-vv-scope="userWithdrawCreditUpdate"
                    method="post"
                    v-if="CreditData.length > 0 && creditTab == 2"
                  >
                    <div class="form-group row">
                      <label class="col-form-label col-4">{{CreditData[0].uname}}</label>
                      <div class="col-8">
                        <div class="row">
                          <div class="col-6">
                            <input
                              placeholder="Amount"
                              class="form-control txt-right"
                              v-model="userDiposite.loginusramount"
                              type="text"
                              readonly
                              name="userWithdrawCreditUpdateloginusramount"
                            />
                          </div>
                          <div class="col-6">
                            <input
                              placeholder="Amount"
                              class="form-control txt-right"
                              v-model="userDiposite.loginusrNamount"
                              type="text"
                              readonly
                              name="userWithdrawCreditUpdateloginusrNamount"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-4">{{CreditData[1].uname}}</label>
                      <div class="col-8">
                        <div class="row">
                          <div class="col-6">
                            <input
                              placeholder="Amount"
                              class="form-control txt-right"
                              v-model="userDiposite.usrnameamount"
                              type="text"
                              readonly
                              name="userWithdrawCreditUpdateusrnameamount"
                            />
                          </div>
                          <div class="col-6">
                            <input
                              placeholder="Amount"
                              class="form-control txt-right"
                              v-model="userDiposite.usrnameNamount"
                              type="text"
                              readonly
                              name="userWithdrawCreditUpdateusrnameNamount"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-4">Amount</label>
                      <div class="col-8 form-group-feedback form-group-feedback-right">
                        <input
                          placeholder="Amount"
                          class="form-control txt-right"
                          v-model="userDiposite.amount"
                          type="text"
                          name="userWithdrawCreditUpdateamount"
                          v-validate="'required|max:14'"
                          @keypress="isNumber($event)"
                          @keyup="calculatewithdrawCreditChange()"
                          :class="{ 'is-invalid' : verrors.first('userWithdrawCreditUpdate.userWithdrawCreditUpdateamount')}"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-4">Remark</label>
                      <div class="col-8 form-group-feedback form-group-feedback-right">
                        <textarea
                          placeholder="Remark"
                          class="form-control"
                          v-model="userDiposite.remark"
                          name="userWithdrawCreditUpdateremark"
                         
                          :class="{ 'is-invalid' : verrors.first('userWithdrawCreditUpdate.userWithdrawCreditUpdateremark')}"
                        ></textarea>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-4">Transaction Code</label>
                      <div class="col-8 form-group-feedback form-group-feedback-right">
                        <input
                          placeholder="Transaction Code"
                          class="form-control"
                          v-model="userDiposite.mpassword"
                          name="userWithdrawCreditUpdatempassword"
                          type="password"
                          v-validate="'required'"
                          :class="{ 'is-invalid' : verrors.first('userWithdrawCreditUpdate.userWithdrawCreditUpdatempassword')}"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-12 text-right">
                        <button type="submit" class="btn btn-warning">
                          submit
                          <i class="fas fa-sign-in-alt ml-1"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </b-tab>
                <b-tab @click="openCreditTabs('creditHistory')">
                  <template v-slot:title>
                    <!-- <span class="d-inline-block d-sm-none">
                      <i class="fas fa-home"></i>
                    </span> -->
                    <span >Credit History</span>
                  </template>
                  <div class="table-responsive">
                    <b-table
                      show-empty
                      responsive="sm"
                      id="eventsListTbl"
                      class="table no-footer"
                      :fields="UserAccountHistory"
                      :items="creditHistoryData"
                      :filter="filter"
                    >
                      <template v-slot:cell(amt)="data">
                        <p class="text-right mb-0" v-currencyint="data.item.amt"></p>
                      </template>
                      <template v-slot:cell(edt)="data">
                        <p class="mb-0" v-formatDate="{date: data.item.edt}"></p>
                      </template>
                    </b-table>
                  </div>
                </b-tab>
              </b-tabs>
            </b-modal>
            <b-modal
              ref="depositeMDL"
              dialog-class="modal-dialog-scrollable"
              header-bg-variant="success"
              hide-footer
              class
            >
              <template slot="modal-header">
                <h5 class="modal-title text-uppercase text-white">Deposit</h5>
                <button
                  type="button"
                  class="close text-white"
                  data-dismiss="modal"
                  @click="hideModal('depositeMDL')"
                >&times;</button>
              </template>
              <InsideLoader :is-visible="DipositeLoader"></InsideLoader>
              <b-tabs active-nav-item-class="tab-bg-success" content-class="text-muted">
                <b-tab active title="Deposit" @click="openDepositTabs(1)">
                  <form
                    @submit.prevent="updateUserDeposit('userdepositeMDL')"
                    data-vv-scope="userdepositeMDL"
                    method="post"
                    v-if="DipoWidrawData.length > 0"
                  >
                    <div class="form-group row">
                      <label class="col-form-label col-4">{{DipoWidrawData[0].uname}}</label>
                      <div class="col-8">
                        <div class="row">
                          <div class="col-6">
                            <input
                              placeholder="Amount"
                              class="form-control txt-right"
                              v-model="userDiposite.loginusramount"
                              type="text"
                              readonly
                              name="userDipositeloginusramount"
                            />
                          </div>
                          <div class="col-6">
                            <input
                              placeholder="Amount"
                              class="form-control txt-right"
                              v-model="userDiposite.loginusrNamount"
                              type="text"
                              readonly
                              name="userDipositeloginusrNamount"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-4">{{DipoWidrawData[1].uname}}</label>
                      <div class="col-8">
                        <div class="row">
                          <div class="col-6">
                            <input
                              placeholder="Amount"
                              class="form-control txt-right"
                              v-model="userDiposite.usrnameamount"
                              type="text"
                              readonly
                              name="userDipositeusrnameamount"
                            />
                          </div>
                          <div class="col-6">
                            <input
                              placeholder="Amount"
                              class="form-control txt-right"
                              v-model="userDiposite.usrnameNamount"
                              type="text"
                              readonly
                              name="userDipositeusrnameNamount"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-4">Profit/Loss</label>
                      <div class="col-8">
                        <div class="row">
                          <div class="col-6">
                            <input
                              placeholder="P/L"
                              class="form-control txt-right"
                              v-model="userDiposite.usrnamepl"
                              type="text"
                              readonly
                              name="userDipositepl"
                            />
                          </div>
                          <div class="col-6">
                            <input
                              placeholder="P/L"
                              class="form-control txt-right"
                              v-model="userDiposite.usrnameNpl"
                              type="text"
                              readonly
                              name="userDipositeplnew"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-4">Amount</label>
                      <div class="col-8 form-group-feedback form-group-feedback-right">
                        <input
                          placeholder="Amount"
                          class="form-control txt-right"
                          v-model="userDiposite.amount"
                          type="number"
                          name="userDipositeamount"
                          v-validate="'required|max:14'"
                          @keypress="isNumber($event)"
                          @keyup="calculateDipositeChange()"
                          :class="{ 'is-invalid' : verrors.first('userdepositeMDL.userDipositeamount')}"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-4">Remark</label>
                      <div class="col-8 form-group-feedback form-group-feedback-right">
                        <textarea
                          placeholder="Remark"
                          class="form-control"
                          v-model="userDiposite.remark"
                          name="userDipositeremark"
                          v-validate="'required'"
                          :class="{ 'is-invalid' : verrors.first('userdepositeMDL.userDipositeremark')}"
                        ></textarea>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-4">Transaction Code</label>
                      <div class="col-8 form-group-feedback form-group-feedback-right">
                        <input
                          placeholder="Transaction Code"
                          class="form-control"
                          v-model="userDiposite.mpassword"
                          name="userDipositempassword"
                          type="password"
                          v-validate="'required'"
                          :class="{ 'is-invalid' : verrors.first('userdepositeMDL.userDipositempassword')}"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-12 text-right">
                        <button type="submit" class="btn btn-success">
                          submit
                          <i class="fas fa-sign-in-alt ml-1"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </b-tab>
                <!-- <b-tab title="Reverse Entry" @click="openDepositTabs(2)">
                  <template v-if="reverseEntryData.etype == 'D'">
                    <form @submit.prevent="reverseEntrySubmit('reverseEntryForm')" data-vv-scope="reverseEntryForm">
                      <div class="row form-group">
                          <div class="col-md-4"><label>Label Amount</label></div>
                          <div class="col-md-8">{{ reverseEntryData.amt }}
                          </div>
                       </div>
                       <div class="row form-group">
                          <div class="col-md-4"><label>Date time</label></div>
                          <div class="datepicker-wrapper d-inline-block col-md-8">
                            <span v-format-datetime="{date: reverseEntryData.edt}"></span>
                          </div>
                       </div>
                      
                       <div class="form-group row">
                        <label class="col-form-label col-4">Remark</label>
                        <div class="col-8 form-group-feedback form-group-feedback-right">
                          <textarea
                            placeholder="Remark"
                            class="form-control"
                            v-model="reverseEntryData.rmk"
                            name="reRemark"
                            v-validate="'required'"
                            :class="{ 'is-invalid' : verrors.first('reverseEntryForm.reRemark')}"
                          ></textarea>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-form-label col-4">Transaction Code</label>
                        <div class="col-8 form-group-feedback form-group-feedback-right">
                          <input
                            placeholder="Transaction Code"
                            class="form-control"
                            v-model="reverseEntryData.mpass"
                            name="reMpass"
                            type="password"
                            v-validate="'required'"
                            :class="{ 'is-invalid' : verrors.first('reverseEntryForm.reMpass')}"
                          />
                        </div>
                      </div>
                       
                       <div class="row form-group m-b-5">
                          <div class="col-md-12 text-right">
                             <button type="submit" class="btn btn-danger btn-bs">
                              <i class="fas fa-undo m-r-5"></i> Reverse Entry
                             </button>
                          </div>
                       </div>
                    </form>
                  </template>
                  <template v-else>
                    {{ reverseEntryData.msg }}
                  </template>
                </b-tab> -->
            </b-tabs>
            </b-modal>
            <b-modal
              ref="withdrwalMDL"
              dialog-class="modal-dialog-scrollable"
              header-bg-variant="danger"
              hide-footer
              class
            >
              <template slot="modal-header" class>
                <h5 class="modal-title text-uppercase text-white">Withdraw</h5>
                <button
                  type="button"
                  class="close text-white"
                  data-dismiss="modal"
                  @click="hideModal('withdrwalMDL')"
                >&times;</button>
              </template>
              <InsideLoader :is-visible="WithDrawLoader"></InsideLoader>
               <b-tabs active-nav-item-class="tab-bg-success" content-class="text-muted">
                <b-tab active title="Withdraw" @click="openWithdrawTabs(1)">
                  <form
                    @submit.prevent="updateUserWithdrawal('userWithdrawFrm')"
                    data-vv-scope="userWithdrawFrm"
                    method="post"
                    v-if="DipoWidrawData.length > 0"
                  >
                    <div class="form-group row">
                      <label class="col-form-label col-4">{{DipoWidrawData[0].uname}}</label>
                      <div class="col-8">
                        <div class="row">
                          <div class="col-6">
                            <input
                              placeholder="Amount"
                              class="form-control txt-right"
                              v-model="userDiposite.loginusramount"
                              type="text"
                              readonly
                              name="userWithdrawFrmloginusramount"
                            />
                          </div>
                          <div class="col-6">
                            <input
                              placeholder="Amount"
                              class="form-control txt-right"
                              v-model="userDiposite.loginusrNamount"
                              type="text"
                              readonly
                              name="userWithdrawFrmloginusrNamount"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-4">{{DipoWidrawData[1].uname}}</label>
                      <div class="col-8">
                        <div class="row">
                          <div class="col-6">
                            <input
                              placeholder="Amount"
                              class="form-control txt-right"
                              v-model="userDiposite.usrnameamount"
                              type="text"
                              readonly
                              name="userWithdrawFrmusrnameamount"
                            />
                          </div>
                          <div class="col-6">
                            <input
                              placeholder="Amount"
                              class="form-control txt-right"
                              v-model="userDiposite.usrnameNamount"
                              type="text"
                              readonly
                              name="userWithdrawFrmusrnameNamount"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-4">Profit/Loss</label>
                      <div class="col-8">
                        <div class="row">
                          <div class="col-6">
                            <input
                              placeholder="P/L"
                              class="form-control txt-right"
                              v-model="userDiposite.usrnamepl"
                              type="text"
                              readonly
                              name="userDipositepl"
                            />
                          </div>
                          <div class="col-6">
                            <input
                              placeholder="P/L"
                              class="form-control txt-right"
                              v-model="userDiposite.usrnameNpl"
                              type="text"
                              readonly
                              name="userDipositeplnew"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-4">Amount</label>
                      <div class="col-8 form-group-feedback form-group-feedback-right">
                        <input
                          placeholder="Amount"
                          class="form-control txt-right"
                          v-model="userDiposite.amount"
                          type="number"
                          name="userWithdrawFrmamount"
                          v-validate="'required|max:14'"
                          @keypress="isNumber($event)"
                          @keyup="calculateWithdrawChange()"
                          :class="{ 'is-invalid' : verrors.first('userWithdrawFrm.userWithdrawFrmamount')}"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-4">Remark</label>
                      <div class="col-8 form-group-feedback form-group-feedback-right">
                        <textarea
                          placeholder="Remark"
                          class="form-control"
                          v-model="userDiposite.remark"
                          name="userWithdrawFrmremark"
                          v-validate="'required'"
                          :class="{ 'is-invalid' : verrors.first('userWithdrawFrm.userWithdrawFrmremark')}"
                        ></textarea>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-4">Transaction Code</label>
                      <div class="col-8 form-group-feedback form-group-feedback-right">
                        <input
                          placeholder="Transaction Code"
                          class="form-control"
                          v-model="userDiposite.mpassword"
                          name="userWithdrawFrmmpassword"
                          type="password"
                          v-validate="'required'"
                          :class="{ 'is-invalid' : verrors.first('userWithdrawFrm.userWithdrawFrmmpassword')}"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-12 text-right">
                        <button type="submit" class="btn btn-danger">
                          submit
                          <i class="fas fa-sign-in-alt ml-1"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </b-tab>
                <!-- <b-tab title="Reverse Entry" @click="openWithdrawTabs(2)">
                  <template v-if="reverseEntryData.etype == 'W'">
                    <form @submit.prevent="reverseEntrySubmit('reverseEntryForm')" data-vv-scope="reverseEntryForm">
                      <div class="row form-group">
                          <div class="col-md-4"><label>Label Amount</label></div>
                          <div class="col-md-8">{{ reverseEntryData.amt }}
                          </div>
                       </div>
                       <div class="row form-group">
                          <div class="col-md-4"><label>Date time</label></div>
                          <div class="datepicker-wrapper d-inline-block col-md-8">
                            <span v-format-datetime="{date: reverseEntryData.edt}"></span>
                          </div>
                       </div>
                       <div class="form-group row">
                        <label class="col-form-label col-4">Remark</label>
                        <div class="col-8 form-group-feedback form-group-feedback-right">
                          <textarea
                            placeholder="Remark"
                            class="form-control"
                            v-model="reverseEntryData.rmk"
                            name="reRemark"
                            v-validate="'required'"
                            :class="{ 'is-invalid' : verrors.first('reverseEntryForm.reRemark')}"
                          ></textarea>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-form-label col-4">Transaction Code</label>
                        <div class="col-8 form-group-feedback form-group-feedback-right">
                          <input
                            placeholder="Transaction Code"
                            class="form-control"
                            v-model="reverseEntryData.mpass"
                            name="reMpass"
                            type="password"
                            v-validate="'required'"
                            :class="{ 'is-invalid' : verrors.first('reverseEntryForm.reMpass')}"
                          />
                        </div>
                      </div>
                       <div class="row form-group m-b-5">
                          <div class="col-md-12 text-right">
                             <button type="submit" class="btn btn-danger btn-bs">
                              <i class="fas fa-undo m-r-5"></i> Reverse Entry
                             </button>
                          </div>
                       </div>
                    </form>
                  </template>
                  <template v-else>
                    {{ reverseEntryData.msg }}
                  </template>
                </b-tab> -->
              </b-tabs>
            </b-modal>
            <b-modal
              ref="ExtraMDL"
              dialog-class="modal-dialog-scrollable"
              body-class="theme-bg"
              header-bg-variant="primary"
              size="xl"
              hide-footer
              class
            >
              <template slot="modal-header" class>
                <h5 class="modal-title text-uppercase text-white">{{this.selectedUserData.uname}}</h5>
                <button
                  type="button"
                  class="close text-white"
                  data-dismiss="modal"
                  @click="hideModal('ExtraMDL')"
                >&times;</button>
              </template>
              <InsideLoader :is-visible="ExtraMDLLoader"></InsideLoader>
              <b-tabs active-nav-item-class="tab-bg-primary" content-class="text-muted">
                <b-tab active @click="openExtraTabs('profile')">
                  <template v-slot:title>
                    <span>Profile</span>
                  </template>

                  <div class="row" v-if="userProfileData.uname">
                    <div class="col-xl-6">
                      <div class="card text-center">
                        <div class="card-body p-2">
                          <div class="avatar-sm mx-auto mb-1">
                            <span
                              class="avatar-title rounded-circle bg-soft-primary text-primary font-size-16 text-uppercase"
                            >{{userProfileData.uname.charAt(0)}}</span>
                          </div>
                          <h5 class="font-size-15">
                            <a
                              href="javascript: void(0);"
                              class="text-dark"
                            >{{userProfileData.uname}}</a>
                          </h5>
                          <p class="text-muted mb-1">{{userProfileData.fname}}</p>

                         
                        </div>
                        <div class="card-footer bg-transparent border-top">
                          <div class="contact-links d-flex font-size-20">
                            <div class="flex-fill">
                              <a
                                v-b-tooltip.hover.top
                                :title="userProfileData.mno"
                                href="javascript: void(0);"
                              >
                                <i class="bx bx-phone-call"></i>
                              </a>
                            </div>
                            <div class="flex-fill">
                              <a
                                v-b-tooltip.hover.top
                                :title="'City: '+userProfileData.ct"
                                href="javascript: void(0);"
                              >
                                <i class="bx bxs-city"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card personalinfo-card" v-if="$store.state.acl.uinfo">
                        <div class="card-body">
                          <h4 class="card-title mb-4">Partnership Information</h4>
                          <div class="table-responsive mb-0">
                            <table class="table">
                              <tbody>
                                <tr v-if="userProfileData.pname != ''">
                                  <th class="br-0" scope="row">Partnership Name:</th>
                                  <td class="br-0">{{userProfileData.pname}}</td>
                                </tr>
                                <tr v-if="userProfileData.pname != ''">
                                  <th class="br-0" scope="row">User Part:</th>
                                  <td class="br-0">{{userProfileData.opart}}</td>
                                </tr>
                                <tr v-if="userProfileData.pname != ''">
                                  <th class="br-0" scope="row">Our Part:</th>
                                  <td class="br-0">{{userProfileData.part}}</td>
                                </tr>
                                <!-- <tr v-if="userProfileData.plname != ''">
                                  <th scope="row" class="br-0">Panel Part:</th>
                                  <td class="br-0">{{ userProfileData.plname }}</td>
                                </tr> -->
                                <tr v-if="userProfileData.rem != ''">
                                  <th class="br-0" scope="row">Remark:</th>
                                  <td class="br-0">{{userProfileData.rem}}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-6"  v-if="$store.state.acl.uinfo">
                      <div class="card">
                        <div class="card-body">
                          <h4 class="card-title mb-4">Additional Information</h4>
                          <div class="table-responsive mb-0">
                            <table class="table">
                              <tbody>
                                <tr>
                                  <th scope="row" class="br-0">User Name:</th>
                                  <td class="br-0">{{ userProfileData.uname }}</td>
                                </tr>
                                <tr>
                                  <th scope="row" class="br-0">Full Name:</th>
                                  <td class="br-0">{{ userProfileData.fname }}</td>
                                </tr>
                                <tr>
                                  <th scope="row" class="br-0">Mobile Number:</th>
                                  <td class="br-0">{{ userProfileData.mno }}</td>
                                </tr>
                                <tr>
                                  <th scope="row" class="br-0">City:</th>
                                  <td class="br-0">{{ userProfileData.ct }}</td>
                                </tr>
                                <tr>
                                  <th scope="row" class="br-0">Credit Pts:</th>
                                  <td class="br-0" v-currency="userProfileData.crebal"></td>
                                </tr>
                                <tr>
                                  <th scope="row" class="br-0">Pts:</th>
                                  <td class="br-0" >
                                    <span v-if="userProfileData.utype && userProfileData.utype.toLowerCase() == 'user'" v-currency="userProfileData.subgen - userProfileData.exp"></span>
                                    <span v-else v-currency="userProfileData.avabal"></span>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row" class="br-0">Client P/L:</th>
                                  <td class="br-0" v-currency="userProfileData.pl"></td>
                                </tr>
                                <tr>
                                  <th scope="row" class="br-0">Exposure:</th>
                                  <td class="br-0" v-currency="userProfileData.exp"></td>
                                </tr>
                                <!-- <tr>
                                  <th class="br-0" scope="row">
                                    Liability Exposure:
                                  </th>
                                  <td
                                    class="br-0"
                                    v-currency="userProfileData.lexpo-userProfileData.exp"
                                  ></td>
                                </tr> -->
                                <tr>
                                  <th scope="row" class="br-0">Casino Pts:</th>
                                  <td class="br-0" v-currency="userProfileData.cbal"></td>
                                </tr>
                                <tr>
                                  <th scope="row" class="br-0">Sports Pts:</th>
                                  <td class="br-0" v-currency="userProfileData.sbal"></td>
                                </tr>
                                <tr>
                                  <th scope="row" class="br-0">Third Party Pts:</th>
                                  <td class="br-0" v-currency="userProfileData.tparty"></td>
                                </tr>
                                
                                <tr>
                                  <th scope="row" class="br-0">Created Date :</th>
                                  <td class="br-0"><span v-formatDate="{date: userProfileData.cdt}"></span></td>
                                </tr>
                                
                                
                                </tbody>
                            
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </b-tab>
                <template v-if="guid == '' && $store.state.acl.upass">
                <b-tab @click="openExtraTabs('cp')">
                  <template v-slot:title>
                    <span class="d-inline-block d-sm-none">
                      C Pass
                    </span>
                    <span class="d-none d-sm-inline-block">Change Password</span>
                  </template>
                  <form
                    @submit.prevent="updateUserPassword('UserChangePassword')"
                    data-vv-scope="UserChangePassword"
                    method="post"
                  >
                    <div class="form-group row">
                      <label class="col-form-label col-4">Password</label>
                      <div class="col-8 form-group-feedback form-group-feedback-right">
                        <input
                          placeholder="Password"
                          class="form-control"
                          v-model="userchangepassword.password"
                          type="password"
                          name="userchangepasswordpassword"
                          v-validate="'required|min:8|verify_password'"
                          data-vv-as="Password"
                          ref="password"
                          :class="{ 'is-invalid' : verrors.first('UserChangePassword.userchangepasswordpassword')}"
                        />
                        <small v-if="verrors.has('UserChangePassword.userchangepasswordpassword')" class="error">
                          {{ verrors.first("UserChangePassword.userchangepasswordpassword") }}
                        </small>
                        <!-- <small>Alphanumeric with one uppercase</small> -->
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-4">Confirm Password</label>
                      <div class="col-8 form-group-feedback form-group-feedback-right">
                        <input
                          placeholder="Confirm Password"
                          class="form-control"
                          v-model="userchangepassword.cpassword"
                          type="password"
                          name="userchangepasswordcpassword"
                          v-validate="'required|min:8|confirmed:password'"
                          data-vv-as="Confirm Password"
                          :class="{ 'is-invalid' : verrors.first('UserChangePassword.userchangepasswordcpassword')}"
                        />
                        <small v-if="verrors.has('UserChangePassword.userchangepasswordcpassword')" class="error">
                          {{ verrors.first("UserChangePassword.userchangepasswordcpassword") }}
                        </small>
                        <!-- <small>Alphanumeric with one uppercase</small> -->
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-4">Transaction Code</label>
                      <div class="col-8 form-group-feedback form-group-feedback-right">
                        <input
                          placeholder="Transaction Code"
                          class="form-control"
                          v-model="userchangepassword.mpassword"
                          type="password"
                          name="userchangepasswordmpassword"
                          v-validate="'required'"
                          data-vv-as="Transaction Code"
                          :class="{ 'is-invalid' : verrors.first('UserChangePassword.userchangepasswordmpassword')}"
                        />
                        <small v-if="verrors.has('UserChangePassword.userchangepasswordmpassword')" class="error">
                          {{ verrors.first("UserChangePassword.userchangepasswordmpassword") }}
                        </small>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-12 text-right">
                        <button type="submit" class="btn btn-primary">
                          submit
                          <i class="fas fa-sign-in-alt ml-1"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </b-tab>
                </template>
                <b-tab v-if="$store.state.acl.ulock" @click="openExtraTabs('ulock')">
                  <template v-slot:title>
                    <span class="d-inline-block d-sm-none">
                      Lock
                    </span>
                    <span class="d-none d-sm-inline-block">User lock</span>

                  </template>
                  <form
                    @submit.prevent="updateUserLock('UserLock')"
                    data-vv-scope="UserLock"
                    method="post"
                  >
                    <div class="form-group row">
                      <label class="col-form-label col-4">Bet lock</label>
                      <b-form-checkbox v-model="LockData.isbet" switch class="mb-1"></b-form-checkbox>
                    </div>
                    <div class="form-group row">
                      <label class="col-form-label col-4">User lock</label>
                      <b-form-checkbox v-model="LockData.isuser" switch class="mb-1"></b-form-checkbox>
                    </div>
                    
                    <div class="form-group row">
                      <label class="col-form-label col-4">Transaction Code</label>
                      <div class="col-8 form-group-feedback-right pl-0">
                        <input
                          placeholder="Transaction Code"
                          class="form-control"
                          v-model="LockData.mpassword"
                          type="password"
                          name="UserLockMpassword"
                          v-validate="'required'"
                          :class="{ 'is-invalid' : verrors.first('UserLock.UserLockMpassword')}"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-12 text-right">
                        <button type="submit" class="btn btn-primary">
                          submit
                          <i class="fas fa-sign-in-alt ml-1"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </b-tab>

                
                <template v-if="guid == ''">
                <b-tab @click="openExtraTabs('accountHistory')">
                  <template v-slot:title>
                    <span class="d-inline-block d-sm-none">
                      Acc history
                    </span>
                    <span class="d-none d-sm-inline-block">Account history</span>
                  </template>
                  <div class="table-responsive">
                    <b-table
                      show-empty
                      responsive="sm"
                      id="eventsListTbl"
                      class="table no-footer"
                      :fields="UserAccountHistory"
                      :items="acchistoryData"
                      :filter="filter"
                    >
                      <template v-slot:cell(amt)="data">
                        <p class="text-right mb-0" v-currencyint="data.item.amt"></p>
                      </template>
                      <template v-slot:cell(edt)="data">
                        <div v-format-datetime="{date:data.item.edt}"></div>
                      </template>
                    </b-table>
                  </div>
                </b-tab>
                </template>

                <template v-if="guid == ''">
                <b-tab @click="openExtraTabs('editprofile')">
                  <template v-slot:title>
                    <span class="d-inline-block d-sm-none">
                      Edit Profile
                    </span>
                    <span class="d-none d-sm-inline-block">Edit Profile</span>
                  </template>
                  <form
                    @submit.prevent="updateUserProfile('editprofile')"
                    data-vv-scope="editprofile"
                    method="post"
                  >
                    <div class="form-group row">
                      <label class="col-form-label col-4">Full Name</label>
                      <div class="col-8 form-group-feedback-right pl-0">
                        <input
                          placeholder="Full Name"
                          class="form-control"
                          v-model="editProfileData.fname"
                          type="text"
                          name="fname"
                          v-validate="'required'"
                          :class="{ 'is-invalid' : verrors.first('editprofile.fname')}"
                        />
                      </div>
                    </div>
                    <div class="form-group row align-items-center">
                      <label class="col-form-label col-4">Change Password Lock</label>
                      <b-form-checkbox v-model="editProfileData.plock" switch class="mb-1"></b-form-checkbox>
                    </div>

                    <div class="form-group row align-items-center" v-if="userProfileData.isshow == 1">
                      <label class="col-form-label col-4">Favorite Master</label>
                      <b-form-checkbox v-model="editProfileData.fmst" switch class="mb-1"></b-form-checkbox>
                    </div>
                    
                    <div class="form-group row">
                      <label class="col-form-label col-4">Transaction Code</label>
                      <div class="col-8 form-group-feedback-right pl-0">
                        <input
                          placeholder="Transaction Code"
                          class="form-control"
                          v-model="editProfileData.mpass"
                          type="password"
                          name="mpass"
                          v-validate="'required'"
                          :class="{ 'is-invalid' : verrors.first('editprofile.mpass')}"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-12 text-right">
                        <button type="submit" class="btn btn-primary">
                          submit
                          <i class="fas fa-sign-in-alt ml-1"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </b-tab>
                </template>

              </b-tabs>
            </b-modal>
            <b-modal ref="searchAnalysisModal" size="big" title="My Market"  hide-footer>
              <div class="search-analysis">        
                <div class="market-analysis-container" v-if="searchAnalysisData != null">
                  <template v-if="searchAnalysisData.t1">
                  <div v-for="(event, key) in searchAnalysisData.t1" class="market-analysis-container">
                      <div class="market-analysis-title">
                          <div><a href="javascript:void(0)" class="">{{ event.ename }}</a></div>
                          <div v-format-datetime="{date:event.gstime}"></div>
                      </div>
                      <div class="market-analysis-content">
                          <div class="row row5">
                              <div class="col-md-4" v-for="(market, key1) in event.market">
                                  <div class="market-analysis-content-detail">
                                      <table class="table">
                                          <thead>
                                              <tr>
                                                  <th colspan="2">{{ market.mname }}</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              <tr v-for="(section, key2) in orderBy(market.section, 'srno')">
                                                  <td>{{ section.sname }}</td>
                                                  <td class="text-right">{{ section.amt }}</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                              </div>
                              
                          </div>
                      </div>
                  </div>
                  </template>
                  <template v-if="searchAnalysisData && searchAnalysisData.t2">
                  <div  class="market-analysis-container">
                      <div class="market-analysis-title">
                          <div>PLayer Battle</div>
                      </div>
                      <div class="market-analysis-content">
                          <div class="row row5">
                              <div class="col-md-4" v-for="(event, key) in searchAnalysisData.t2">
                                  <div class="market-analysis-content-detail">
                                      <table class="table">
                                          <thead>
                                              <tr>
                                                  <th>{{ event.ename }}</th>
                                                  <th class="text-right" v-format-datetime="{date: event.gstime}"></th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              <tr v-for="(market, key2) in event.market">
                                                  <td>{{ market.mname }}</td>
                                                  <td class="text-right" v-currency="market.amt">{{ market.amt }}</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                              </div>
                              
                          </div>
                      </div>
                  </div>
                  </template>
                  <template v-if="searchAnalysisData && searchAnalysisData.t3">
                  <div  class="market-analysis-container">
                      <div class="market-analysis-title">
                          <div>Diam 11</div>
                      </div>
                      <div class="market-analysis-content">
                          <div class="row row5">
                              <div class="col-md-4" v-for="(event, key) in searchAnalysisData.t3">
                                  <div class="market-analysis-content-detail">
                                      <table class="table">
                                          <thead>
                                              <tr>
                                                  <th>{{ event.ename }}</th>
                                                  <th class="text-right" v-format-datetime="{date: event.gstime}"></th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              <tr v-for="(market, key2) in event.market">
                                                  <td>{{ market.mname }}</td>
                                                  <td class="text-right" v-currency="market.amt">{{ market.amt }}</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                              </div>
                              
                          </div>
                      </div>
                  </div>
                  </template>
                </div>
              </div>
            </b-modal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ServiceApi from "@/services/ServiceApi";
import Switches from "vue-switches";
import PageHeader from "../components/page-header";
import InsideLoader from "../components/insideLoader";
import downloadexcel from "vue-json-excel";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  components: {
    Switches,
    PageHeader,
    InsideLoader,
    downloadexcel
  },
  mounted() {
    if (this.$route.params.guid) {
      this.guid = this.$route.params.guid;
    }
    this.getUserList();
  },
  data() {
    return {
      userList: [],
      items: [],
      guid: "",
      uname: "",
      ExtraMDLLoader: false,
      CreditLoader: false,
      DipositeLoader: false,
      WithDrawLoader: false,
      userCreditUpdate: {
        remark: "",
        amount: 0,
        guid: "",
        mpassword: "",
      },
      userchangepassword: {
        password: "",
        mpassword: "",
        user: "",
        //uname: "",
      },
      LockData: {
        guid: "",
        isuser: false,
        isbet: false,
        mpassword: "",
      },
      editProfileData: {
        guid: "",
        fname: "",
        plock: false,
        fmst: false,
        mpass: "",
      },
      selectedUserData: {},
      mpassword: "Admin567",
      UserChangePasswordHistory: [
        {
          key: "edt",
          label: "Date Time",
        },
        {
          key: "msg",
          label: "Message",
        },
        {
          key: "ip",
          label: "IP",
        },
        {
          key: "bdetail",
          label: "Agent",
        },
        {
          key: "uname",
          label: "Detail",
        },
      ],
      UserAccountHistory: [
        {
          key: "sauname",
          label: "Super User",
        },
        {
          key: "uname",
          label: "User",
        },
        {
          key: "tfrom",
          label: "Transfer From",
        },
        {
          key: "amt",
          label: "Amount",
          thClass: 'text-right'
        },
        {
          key: "edt",
          label: "Date",
        },
      ],
      userstblfields: [
        {
          key: "uname",
          label: "User Name",
          sortable: true,
        },
        {
          key: "crebal",
          label: "CR",
          sortable: true,
          thClass: 'text-right'
        },
        {
          key: "subgen",
          label: "Pts",
          sortable: true,
          thClass: 'text-right'
        },
        {
          key: "pl",
          label: "Client(P/L)",
          sortable: true,
          thClass: 'text-right'
        },
        {
          key: "plper",
          label: "Client(P/L) %",
          sortable: true,
          thClass: 'text-right'
        },
        {
          key: "expo",
          label: "Exposure",
          thClass: 'text-right',
          tdClass: 'text-right'
        },
        {
          key: "bal",
          label: "Available Pts",
          thClass: 'text-right'
        },
        {
          key: "bact",
          label: "B st",
        },
        {
          key: "uact",
          label: "U st",
        },
        {
          key: "pname",
          label: "PName",
        },
       /* {
          key: "plname",
          label: "PlName",
        },*/
        {
          key: "utype",
          label: "Account Type",
          sortable: true,
        },
        {
          key: "guid",
          label: "Action",
        },
      ],
      currentPage: 1,
      filter: null,
      perPage: 25,
      totalLength: 0,
      totalRows: 0,
      pageOptions: [25, 50, 100, 250, 500, 750, 1000],
      userProfileData: {},
      //userProfilePartnershipData: [],
      loginHistory: [],
      cphistoryData: [],
      acchistoryData: [],
      DipoWidrawData: [],
      CreditData: [],
      creditHistoryData: [],
      creditTab:1,
      userDiposite: {
        loginusrname: "",
        loginusramount: "",
        loginusrNamount: "",
        usrname: "",
        usrnameamount: "",
        usrnameNamount: "",
        amount: "",
        remark: "",
        mpassword: "",
      },
      excelColumns:{
        "User Name": "uname",
        "Full Name": "fname",
        "CR": "crebal",
        "Pts": "subgen",
        "Client(P/L)": "pl",
        "Client(P/L)%": "plper",
        "Exposure": "expo",
        "Available Pts": "bal",
        "B st": "bact",
        "U st": "uact",
        "PName": "pname",
        //"PlName": "plname",
        "Account type": "utype",
      },
      pdfColumn: [
        { title: "User Name", dataKey: "uname" },
        { title: "Full Name", dataKey: "fname" },
        { title: "CR", dataKey: "crebal" },
        { title: "Pts", dataKey: "subgen" },
        { title: "Client(P/L)", dataKey: "pl" },
        { title: "Client(P/L)%", dataKey: "plper" },
        { title: "Exposure", dataKey: "expo" },
        { title: "Available Pts", dataKey: "bal" },
        { title: "B st", dataKey: "bact" },
        { title: "U st", dataKey: "uact" },
        { title: "PName", dataKey: "pname" },
       /* { title: "PlName", dataKey: "plname" },*/
        { title: "Account type", dataKey: "utype" }
      ],
      reverseEntryData:{
        etype: "",
        guid: "",
        amt: "",
        edt: "",
        rmk:"",
        mpass: ""
      },
      searchAnalysisData: null
    };
  },
  watch: {
    currentPage(newPage, oldPage) {
      this.getUserList(newPage);
      this.$emit("input", newPage);
    },
    perPage(newvalue, oldvalue) {
      this.$emit("input", newvalue);
      this.getUserList();
    },
  },
  methods: {
    async getExportData(){
      let exportData = [];
      let finalData = [{
          uname: "",
          crebal: 0,
          subgen: 0,
          pl: 0,
          expo: 0,
          bal: 0,
          bact: "",
          uact: "",
          pname: "",
          //plname: "",
          utype: ""
        }];
      await ServiceApi.callApi("userlistpdf", {guid: this.guid})
      .then((response) => {
        this.$store.state.isLoading = false;
        if (response.success) {
          exportData = response.data;
          
        } else {
        //  console.log("ASdsad")
          this.$store.state.isLoading = false;
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "error",
            text: response.msg,
          });
        }
      })
      .catch((e) => {
        console.log(e)
      });
      _.forEach(exportData, function (value, key) {
        exportData[key].uname = exportData[key].uname
        exportData[key].fname = exportData[key].fname
        
        if(exportData[key].utype.toLowerCase() != "user"){
          exportData[key].pname = exportData[key].pship;
          exportData[key].plper = parseFloat((100 - parseInt(exportData[key].pship.split(" ")[0]))*exportData[key].pl/100).toFixed(2) 
        }else{
          exportData[key].pname = "-";
          //exportData[key].plname = "-";
          exportData[key].bal = exportData[key].subgen - exportData[key].expo
          exportData[key].plper = "-"
        }

        finalData[0].crebal += parseFloat(exportData[key].crebal)
        finalData[0].subgen += parseFloat(exportData[key].subgen)
        finalData[0].pl += parseFloat(exportData[key].pl)
        finalData[0].expo += parseFloat(exportData[key].expo)
        if(exportData[key].utype.toLowerCase() != "user"){
          finalData[0].bal += parseFloat(exportData[key].bal)
        }else{
          finalData[0].bal += parseFloat(exportData[key].subgen - exportData[key].expo)
        }
        
        finalData.push(exportData[key])
      });
      return finalData;
    },
    fetchExcelData() {
      let exportData = [];
      this.$store.state.isLoading = true;
      exportData = this.getExportData();
      if (exportData.length !== 0) {
        return exportData;
      }else{
        return false;
      }
     
    },
    async exportPdf() {
      var self = this;
      let exportData = await self.getExportData();
      if (exportData.length !== 0) {
        var doc = new jsPDF("l", "pt");
        doc.text("User List", 400, 25);
        doc.autoTable(self.pdfColumn, exportData);
        doc.save("userlist.pdf");
      }
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    generateBreadCrum(ItemData) {
      this.items = [
        {
          text: "Home",
          to: { name: "home" },
        },
      ];
      if (this.guid == "") {
        this.items.push({
          text: "Account List",
          active: true,
        });
      } else {
        for (let i = 0; i < ItemData.length; i++) {
          if (i == 0) {
            this.items.push({
              text: "Account List",
              to: { name: "users" },
            });
          } else {
            this.items.push({
              text: ItemData[i].uname,
              to: { name: "childusers", params: { guid: ItemData[i].guid } },
            });
          }
        }
      }
    },
    goToChild(user) {
      return { name: "childusers", params: { guid: user.guid } };
    },
    updateUserPassword(scope) {
      this.$validator.validateAll(scope).then((valid) => {
        if (valid) {
          this.userchangepassword.user = this.selectedUserData.guid;
          //this.userchangepassword.uname = this.$store.state.userdata.uname;
          ServiceApi.callApi("cp", this.userchangepassword)
            .then((response) => {
              if (response.success) {
                this.reserChangePasswordFrm();
                this.$swal({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  icon: "success",
                  text: response.msg,
                });
                this.hideModal("ExtraMDL");
              } else {
                this.$swal({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  icon: "error",
                  text: response.msg,
                });
              }
            })
            .catch((e) => {});
        }
      });
    },
    reserChangePasswordFrm() {
      this.userchangepassword = {
        password: "",
        mpassword: "",
        user: "",
       // uname: "",
      };
      this.$validator.reset();
    },
    withdrawUserCredit(scope) {
      this.$validator.validateAll(scope).then((valid) => {
        if (valid) {
          let data = {
            mpassword: this.userDiposite.mpassword,
            guid: this.selectedUserData.guid,
            remark: this.userDiposite.remark,
            amount: this.userDiposite.amount,
          };
          if(this.$store.state.isLoading == true){
            return false;
          }
          this.$store.state.isLoading = true;
          ServiceApi.callApi("wc", data)
            .then((response) => {
              setTimeout((res) => {
                this.$store.state.isLoading = false;
                if (response.success) {
                  this.$swal({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    icon: "success",
                    text: response.msg,
                  });
                  this.getCreditData();
                  this.$validator.reset();
                  this.hideModal('creditUpdate');
                  this.getUserList();
                } else {
                  this.$swal({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    icon: "error",
                    text: response.msg,
                  });
                }
              }, 2500);

              
            })
            .catch((e) => {
              this.$store.state.isLoading = false;
            });
        }
      });
    },
    updateUserCredit(scope) {
      this.$validator.validateAll(scope).then((valid) => {
        if (valid) {
          let data = {
            mpassword: this.userDiposite.mpassword,
            guid: this.selectedUserData.guid,
            remark: this.userDiposite.remark,
            amount: this.userDiposite.amount,
          };
          if(this.$store.state.isLoading == true){
            return false;
          }
          this.$store.state.isLoading = true;
          ServiceApi.callApi("ac", data)
            .then((response) => {
              setTimeout((res) => {
                this.$store.state.isLoading = false;
                if (response.success) {
                  this.getCreditData();
                  this.getUserList(this.currentPage);
                  this.$swal({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    icon: "success",
                    text: response.msg,
                  });

                  this.$validator.reset();
                  this.hideModal('creditUpdate');
                  this.getUserList();
                } else {
                  this.$swal({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    icon: "error",
                    text: response.msg,
                  });
                }
              }, 2500);
              
            })
            .catch((e) => {
              this.$store.state.isLoading = false;
            });
        }
      });
    },
    reserChangePasswordFrm() {
      this.userchangepassword = {
        password: "",
        mpassword: "",
        user: "",
       // uname: "",
      };
      this.$validator.reset();
    },
    resetLockDataFrm() {
      this.LockData = {
        guid: "",
        isuser: this.LockData.isuser,
        isbet: this.LockData.isbet,
        mpassword: "",
      };
      this.$validator.reset();
    },
    updatebetLock(scope) {
      this.$validator.validateAll(scope).then((valid) => {
        if (valid) {
          ServiceApi.callApi("bl", this.LockData)
            .then((response) => {
              if (response.success) {
                this.getUserList(this.currentPage);
                this.hideModal("ExtraMDL");
                this.$swal({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  icon: "success",
                  text: response.msg,
                });
                this.resetLockDataFrm();
                this.getUserList();
              } else {
                this.$swal({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  icon: "error",
                  text: response.msg,
                });
              }
            })
            .catch((e) => {});
        }
      });
    },
    updateUserLock(scope) {
      this.$validator.validateAll(scope).then((valid) => {
        if (valid) {
          if(this.$store.state.isLoading == true){
            return false;
          }
          this.$store.state.isLoading = true
          ServiceApi.callApi("lock", this.LockData)
            .then((response) => {
              this.$store.state.isLoading = false
              if (response.success) {
                this.getUserList(this.currentPage);
                this.hideModal("ExtraMDL");
                this.$swal({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  icon: "success",
                  text: response.msg,
                });
                this.resetLockDataFrm();
                this.getUserList();
              } else {
                this.$swal({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  icon: "error",
                  text: response.msg,
                });
              }
            })
            .catch((e) => {});
        }
      });
    },
    updateUserProfile(scope){
      this.$validator.validateAll(scope).then((valid) => {
        if (valid) {
          this.$store.state.isLoading = true;
          ServiceApi.callApi("user/updateprofile", this.editProfileData)
            .then((response) => {
              this.$store.state.isLoading = false;
              if (response.success) {
                this.getUserList(this.currentPage);
                this.hideModal("ExtraMDL");
                this.$swal({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  icon: "success",
                  text: response.msg,
                });
                this.resetLockDataFrm();
                this.getUserList();
              } else {
                this.$swal({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  icon: "error",
                  text: response.msg,
                });
              }
            })
            .catch((e) => {});
        }
      });
    },
    hideModal(ref) {
      this.$refs[ref].hide();
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    openUserCreditUpdateMdl(user) {
      if (this.guid == "") {
        this.selectedUserData = user;
        this.openCreditTabs("addCredit");
        this.$refs["creditUpdate"].show();
      }
    },
    openCreditTabs(tabName) {
      switch (tabName) {
        case "addCredit":
          this.creditTab = 1
          this.getCreditData();
          break;
        case "withdrawCredit":
          this.creditTab = 2
          this.getCreditData();
          break;
        case "creditHistory":
          this.getCreditHistoryData();
          break;
        default:
          console.log("");
      }
    },
    getCreditData() {
      this.CreditData = [];
      this.CreditLoader = true;
      ServiceApi.callApi("creditdata", {
        guid: this.selectedUserData.guid,
      })
        .then((response) => {
          this.CreditLoader = false;
          if (response.success) {
            this.CreditData = response.data.t1;
            this.userDiposite = {
              loginusrname: this.CreditData[0].uname,
              loginusramount: this.CreditData[0].crebal,
              loginusrNamount: this.CreditData[0].crebal,
              usrname: this.CreditData[1].uname,
              usrnameamount: this.CreditData[1].crebal,
              usrnameNamount: this.CreditData[1].crebal,
              amount: "",
              remark: "",
              mpassword: "",
            };
          } else {
            this.userDiposite = {};
          }
        })
        .catch((e) => {
          this.CreditLoader = false;
        });
    },
    calculatewithdrawCreditChange() {
      let amount = this.userDiposite.amount == "" ? 0 : this.userDiposite.amount;
      this.userDiposite.loginusrNamount =
        parseFloat(this.userDiposite.loginusramount) +
        parseFloat(amount);
      this.userDiposite.usrnameNamount =
        parseFloat(this.userDiposite.usrnameamount) -
        parseFloat(amount);
    },
    calculateAddCreditChange() {
      let amount = this.userDiposite.amount == "" ? 0 : this.userDiposite.amount;
      this.userDiposite.loginusrNamount =
          parseFloat(this.userDiposite.loginusramount) -
          parseFloat(amount);
      this.userDiposite.usrnameNamount =
          parseFloat(this.userDiposite.usrnameamount) +
          parseFloat(amount);
    },
    openUserdepositeMDL(user) {
      this.selectedUserData = user;
      this.getDipoWidrawData();
      this.$refs["depositeMDL"].show();
    },
    openUserwithdrwalMDL(user) {
      this.selectedUserData = user;
      this.getDipoWidrawData();
      this.userCreditUpdate.guid = user.guid;
      this.$refs["withdrwalMDL"].show();
    },
    openUserExtraMDL(user) {
      this.selectedUserData = user;
      this.userCreditUpdate.guid = user.guid;
      this.openExtraTabs("profile");
      this.$refs["ExtraMDL"].show();
    },
    getDipoWidrawData() {
      this.DipoWidrawData = [];
      ServiceApi.callApi("dipowidrawdata", {
        guid: this.selectedUserData.guid,
      })
        .then((response) => {
          if (response.success) {
            this.DipoWidrawData = response.data.t1;
            this.userDiposite = {
              loginusrname: this.DipoWidrawData[0].uname,
              loginusramount: this.DipoWidrawData[0].bal,
              loginusrNamount: this.DipoWidrawData[0].bal,
              usrname: this.DipoWidrawData[1].uname,
              usrnameamount: this.DipoWidrawData[1].bal,
              usrnameNamount: 0,
              usrnamepl:this.DipoWidrawData[1].pl,
              usrnameNpl:0,
              amount: "",
              remark: "",
              mpassword: "",
            };
          } else {
            this.DipoWidrawData = [];
          }
        })
        .catch((e) => {
          this.isCheckingUserName = false;
        });
    },
    calculateDipositeChange() {
      //console.log("amt: "+this.userDiposite.amount)
      let amount = this.userDiposite.amount == "" ? 0 : this.userDiposite.amount;

      if (parseFloat(amount) > 0) {
        this.userDiposite.loginusrNamount =
          parseFloat(this.userDiposite.loginusramount) -
          parseFloat(amount);
        this.userDiposite.usrnameNamount =
          parseFloat(this.userDiposite.usrnameamount) +
          parseFloat(amount);
        this.userDiposite.usrnameNpl =
          parseFloat(this.userDiposite.usrnamepl) +
          parseFloat(amount);
      } else {
        this.userDiposite.loginusrNamount = this.userDiposite.loginusramount;
        this.userDiposite.usrnameNamount = 0;
        this.userDiposite.usrnameNpl = 0;
      }
    },
    updateUserDeposit(scope) {
      this.$validator.validateAll(scope).then((valid) => {
        if (valid) {
          let data = {
            mpassword: this.userDiposite.mpassword,
            guid: this.selectedUserData.guid,
            remark: this.userDiposite.remark,
            amount: this.userDiposite.amount,
          };
          if(this.$store.state.isLoading == true){
            return false;
          }
          this.$store.state.isLoading = true;
          ServiceApi.callApi("cg", data)
            .then((response) => {
              setTimeout((res) => {
                this.$store.state.isLoading = false;
                //this.getDipoWidrawData();
                if (response.success) {
                  
                  this.$swal({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    icon: "success",
                    text: response.msg,
                  });

                  this.$validator.reset();
                  this.hideModal('depositeMDL');
                  this.getUserList(this.currentPage);
                } else {
                  this.$swal({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    icon: "error",
                    text: response.msg,
                  });
                }

              }, 2500);
              

            })
            .catch((e) => {
              this.$store.state.isLoading = false;
            });
        }
      });
    },
    calculateWithdrawChange() {
      let amount = this.userDiposite.amount == "" ? 0 : this.userDiposite.amount;
      if (parseFloat(amount) > 0) {
        this.userDiposite.loginusrNamount =
          parseFloat(this.userDiposite.loginusramount) +
          parseFloat(amount);
        this.userDiposite.usrnameNamount =
          parseFloat(this.userDiposite.usrnameamount) -
          parseFloat(amount);
        this.userDiposite.usrnameNpl =
          parseFloat(this.userDiposite.usrnamepl) -
          parseFloat(amount);
      } else {
        this.userDiposite.loginusrNamount = this.userDiposite.loginusramount;
        this.userDiposite.usrnameNamount = 0;
        this.userDiposite.usrnameNpl = 0;
      }
    },
    updateUserWithdrawal(scope) {
      this.$validator.validateAll(scope).then((valid) => {
        if (valid) {
          let data = {
            mpassword: this.userDiposite.mpassword,
            guid: this.selectedUserData.guid,
            remark: this.userDiposite.remark,
            amount: this.userDiposite.amount,
          };
          if(this.$store.state.isLoading == true){
            return false;
          }
          this.$store.state.isLoading = true;
          ServiceApi.callApi("wg", data)
            .then((response) => {
              setTimeout((res) => {
                this.$store.state.isLoading = false;
                if (response.success) {
                  this.getUserList(this.currentPage);
                  this.getDipoWidrawData();
                  this.$swal({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    icon: "success",
                    text: response.msg,
                  });

                  this.$validator.reset();
                  this.hideModal('withdrwalMDL');
                  this.getUserList();
                } else {
                  this.$swal({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    icon: "error",
                    text: response.msg,
                  });
                }
              }, 2500);
            })
            .catch((e) => {});
        }
      });
    },
    openExtraTabs(tabName) {

      switch (tabName) {
        case "profile":
          this.getProfileData();
          break;
        /*case "btlock":
          this.LockData = {
            guid: this.selectedUserData.guid,
            isact: this.selectedUserData.bact ? false : true,
            mpassword: "",
          };
          break;*/
        case "ulock":
          this.LockData = {
            guid: this.selectedUserData.guid,
            isuser: this.userProfileData.uact ? false : true,
            isbet: this.userProfileData.bact ? false : true,
            mpassword: "",
          };
          break;
        case "cp":
          this.reserChangePasswordFrm();
          break;
        
        case "accountHistory":
          this.getaccHistroy();
          break;
        case "editprofile":
          this.resetEditProfileForm();
          break;
        default:
          console.log("");
      }
    },
    resetEditProfileForm() {
      this.editProfileData = {
        guid: this.selectedUserData.guid,
        plock: this.userProfileData.plock ? true : false,
        fmst: this.userProfileData.fmst ? true : false,
        fname: this.userProfileData.fname,
        mpass: "",
      };
    },
    getcpHistroy() {
      this.cphistoryData = [];
      this.ExtraMDLLoader = true;
      ServiceApi.callApi("cphistory", {
        guid: this.selectedUserData.guid,
        uname: this.selectedUserData.uname,
      })
        .then((response) => {
          this.ExtraMDLLoader = false;
          if (response.success) {
            this.cphistoryData = response.data.t1;
          } else {
            this.cphistoryData = [];
          }
        })
        .catch((e) => {
          this.ExtraMDLLoader = false;
        });
    },
    getaccHistroy() {
      this.acchistoryData = [];
      this.ExtraMDLLoader = true;
      ServiceApi.callApi("acchistrorydata", {
        guid: this.selectedUserData.guid,
      })
        .then((response) => {
          this.ExtraMDLLoader = false;
          if (response.success) {
            this.acchistoryData = response.data.t1;
          } else {
            this.acchistoryData = [];
          }
        })
        .catch((e) => {
          this.ExtraMDLLoader = false;
        });
    },
    getCreditHistoryData() {
      this.creditHistoryData = [];
      this.ExtraMDLLoader = true;
      ServiceApi.callApi("credithistorydata", {
        guid: this.selectedUserData.guid,
      })
        .then((response) => {
          this.ExtraMDLLoader = false;
          if (response.success) {
            this.creditHistoryData = response.data.t1;
          } else {
            this.creditHistoryData = [];
          }
        })
        .catch((e) => {
          this.ExtraMDLLoader = false;
        });
    },
    getLoginHistroy() {
      this.loginHistory = [];
      this.ExtraMDLLoader = true;
      ServiceApi.callApi("loginhistory", {
        guid: this.selectedUserData.guid,
        uname: this.selectedUserData.uname,
      })
        .then((response) => {
          this.ExtraMDLLoader = false;
          if (response.success) {
            this.loginHistory = response.data.t1;
          } else {
            this.loginHistory = [];
          }
        })
        .catch((e) => {
          this.ExtraMDLLoader = false;
        });
    },
    getProfileData() {
      this.userProfileData = {};
      this.ExtraMDLLoader = true;
      ServiceApi.callApi("profiledata", {
        guid: this.selectedUserData.guid,
      })
        .then((response) => {
          this.ExtraMDLLoader = false;
          if (response.success) {
            this.userProfileData = response.data.t1[0];
            //this.userProfilePartnershipData = response.data.t2;
          } else {
            this.userProfileData = {};
          }
        })
        .catch((e) => {
          this.ExtraMDLLoader = false;
        });
    },
    resetUserList(){
      this.uname = "";
      this.getUserList(1);
    },
    getUserList(newPage = 1) {
      let data = {};
      if (this.guid != "") {
        data = {
          guid: this.guid,
          pno: newPage,
          row: this.perPage,
          uname: this.uname
        };
      } else {
        data = {
          pno: newPage,
          row: this.perPage,
          uname: this.uname
        };
      }
      this.$store.state.isLoading = true;
      ServiceApi.callApi("userlist", data)
        .then((response) => {
          this.$store.state.isLoading = false;
          if (response.success) {
            this.userList = response.data.t1 == null ? [] : response.data.t1;
            this.totalRows = response.data.t2.trow;
            this.generateBreadCrum(response.data.t3);
          } else {
          }
        })
        .catch((e) => {
          this.$store.state.isLoading = false;
        });
    },
    openDepositTabs(tabName){
      switch (tabName) {
        case 1:
          this.getDipoWidrawData();
          break;
        case 2:
          this.resetReverseEntryData();
          this.getReverseEntryData("D");
          break;
        
        default:
          console.log("");
      }

    },
    openWithdrawTabs(tabName){
      switch (tabName) {
        case 1:
          this.getDipoWidrawData();
          break;
        case 2:
          this.resetReverseEntryData();
          this.getReverseEntryData("W");
          break;
        
        default:
          console.log("");
      }

    },
    resetReverseEntryData(){
      this.reverseEntryData = {
        etype:"",
        guid: "",
        amt: "",
        edt: "",
        rmk:"",
        mpass: "",
        msg: ""
      }
    },
    getReverseEntryData(etype){
      //this.$store.state.isLoading = true;
      ServiceApi.callApi("reventrylist", {"etype": etype, guid: this.selectedUserData.guid})
      .then((response) => {
        this.$store.state.isLoading = false;
        console.log(response)
        if (response.success) {
          this.reverseEntryData = {
            etype: etype,
            guid: this.selectedUserData.guid,
            amt: response.data[0].amt,
            edt: response.data[0].edt,
            rmk:  response.data[0].rmk,
            mpass: "",
            mag: ""
          }
        } else {
          this.reverseEntryData = {
            etype:"",
            guid: "",
            amt: "",
            edt: "",
            rmk:"",
            mpass: "",
            msg: response.msg
          }
        }
      })
      .catch((e) => {
        this.resetReverseEntryData();
        this.$store.state.isLoading = false;
      });
    },
    reverseEntrySubmit(scope) {
      this.$validator.validateAll(scope).then((valid) => {
        if (valid) {
          ServiceApi.callApi("reventrybal", this.reverseEntryData)
            .then((response) => {
              if (response.success) {
                this.$swal("", response.msg,"success");
                this.$validator.reset();
                if(this.reverseEntryData.etype == "D"){
                  this.hideModal('depositeMDL');
                }else{
                  this.hideModal('withdrwalMDL');
                }
                this.resetReverseEntryData();
                this.getUserList();
              } else {
                this.$swal("", response.msg,"error");
              }
            })
            .catch((e) => {});
        }
      });
    },
    openMarketAnalysisModal(data){
      if(data.expo == 0){
        return;
      }
      this.$store.state.isLoading = true
      ServiceApi.callApi("report/searchanalysispopup", {'uid': data.guid})
      .then((response) => {
        this.$store.state.isLoading = false
        if (response.status == 200) {
          this.searchAnalysisData = response.data;
          this.$refs["searchAnalysisModal"].show();
        }
      })
      .catch((e) => {
          this.$store.state.isLoading = false
      });
    }
  },
};
</script>
