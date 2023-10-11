<template>
  <div class="live-bets-report">
    <PageHeader :title="'Live Casino Result'" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <b-tabs
              active-nav-item-class="tab-bg-primary"
              content-class="p-3 text-muted"
            >
              <b-tab title="Settled Bets" active @click="changeTab(1)">
                <form
                  method="post"
                  v-on:submit.prevent="loadReport()"
                  data-vv-scope="casinoResult"
                  class="ajaxFormSubmit"
                >
                  <div class="row row5 mb-3">
                    <div class="form-group col-xl-2">
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
                        track-by="guid"
                        :options="searchedUsers"
                      ></multiselect>
                    </div>
                    <div class="col-xl-2 mb-3" v-if="tabNo == 1">
                      <DatePicker
                        v-model="params.dt"
                        :disabled-date="disabledDt"
                        lang="en"
                        value-type="MM/DD/YYYY"
                        format="DD/MM/YYYY"
                      />
                    </div>
                    <div class="col-xl-2 mb-3" v-if="tabNo == 1">
                      <select
                        class="form-control"
                        name="gtype"
                        v-validate="'required'"
                        v-model="params.gtype"
                        :class="{
                          'is-invalid': verrors.first('casinoResult.gtype'),
                        }"
                        @change="setTableFields()"
                      >
                        <option value="">Select</option>
                        <option
                          :value="value.gtype.toLowerCase()"
                          v-for="(value, key) in casinoList"
                        >
                          {{ value.cname }}
                        </option>
                        <!-- <option value="ludo">ludo</option> -->
                      </select>
                    </div>
                    <div class="col-xl-5 mb-3">
                      <button
                        type="submit"
                        class="btn btn-primary"
                        id="loaddata"
                      >
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
                      <div class="d-inline-block ml-3">
                        <downloadexcel
                          :class="{ disabled: reportData.length == 0 }"
                          :fetch="fetchExcelData"
                          :fields="exportTable.excelHeading"
                          :name="'livecasinoresults.xls'"
                          class="d-inline-block"
                        >
                          <b-button
                            class="mr-1"
                            variant="success"
                            type="button"
                            :disabled="reportData.length == 0"
                          >
                            <i class="fas fa-file-excel"></i>
                          </b-button>
                        </downloadexcel>
                        <b-button
                          variant="danger"
                          @click="exportPdf"
                          type="button"
                          :disabled="reportData.length == 0"
                        >
                          <i class="fas fa-file-pdf"></i>
                        </b-button>
                      </div>
                    </div>
                  </div>
                </form>
                <div class="row">
                  <div class="col-6">
                    <div id="tickets-table_length" class="dataTables_length">
                      <label class="d-inline-flex align-items-center">
                        Show&nbsp;
                        <b-form-select
                          v-model="perPage"
                          :options="pageOptions"
                          size="sm"
                        ></b-form-select
                        >&nbsp;entries
                      </label>
                    </div>
                  </div>
                  <!-- Search -->
                  <div class="col-6 text-right">
                    <div
                      id="tickets-table_filter"
                      class="dataTables_filter text-md-right"
                    >
                      <label class="d-inline-flex align-items-center">
                        <b-form-input
                          v-model="filter"
                          type="search"
                          placeholder="Search..."
                          class="form-control form-control-sm ml-2"
                        ></b-form-input>
                      </label>
                    </div>
                  </div>
                  <!-- End search -->
                </div>
                <!-- Table -->
                <div class="table-responsive mb-0">
                  <b-table
                    show-empty
                    bordered
                    responsive="sm"
                    id="eventsListTbl"
                    class="table no-footer table-hover"
                    :fields="reportFields"
                    :items="reportData"
                    :filter="filter"
                    @filtered="onFiltered"
                    :current-page="currentPage"
                    :per-page="perPage"
                  >
                    <template v-slot:cell(urate)="data">
                      <div
                        class="text-right"
                        v-currency="data.item.urate"
                      ></div>
                    </template>
                    <template v-slot:cell(winloss)="data">
                      <div
                        class="text-right"
                        v-currency="data.item.winloss"
                      ></div>
                    </template>
                    <template v-slot:cell(total)="data">
                      <div
                        class="text-right"
                        v-currency="data.item.total"
                        :class="[
                          { 'text-success': data.item.total > 0 },
                          { 'text-danger': data.item.total <= 0 },
                        ]"
                      ></div>
                    </template>
                    <template v-slot:cell(amt)="data">
                      <div class="text-right" v-currency="data.item.amt"></div>
                    </template>

                    <template v-slot:cell(edt)="data">
                      <div>{{ data.item.edt }}</div>
                    </template>
                  </b-table>
                </div>
                <div class="row pt-3">
                  <div class="col">
                    <div
                      class="
                        dataTables_paginate
                        paging_simple_numbers
                        float-right
                      "
                    >
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
              </b-tab>
              <b-tab title="Unsettled Bets" @click="changeTab(2)">
                <form
                  method="post"
                  v-on:submit.prevent="loadReport()"
                  data-vv-scope="casinoResult"
                  class="ajaxFormSubmit"
                >
                  <div class="row row5 mb-3">
                    <div class="form-group col-xl-2">
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
                        track-by="guid"
                        :options="searchedUsers"
                      ></multiselect>
                    </div>

                    <div class="col-xl-5 mb-3">
                      <button
                        type="submit"
                        class="btn btn-primary"
                        id="loaddata"
                      >
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
                <div>
                  <!-- ### WEB ### -->
                  <!-- EZUGI WEB -->
                  <template
                    v-if="unsettleData.ezugi && unsettleData.ezugi.length"
                  >
                    <div class="report-event-title">Ezugi</div>
                    <div class="table-responsive report-table">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th class="bet-event-name">
                              <div>Game Name</div>
                            </th>
                            <th class="bet-sport">
                              <div>Type</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Amount</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Total</div>
                            </th>
                            <!-- <th class="bet-amount">
                                  <div>Casino Type</div>
                              </th> -->
                            <th class="bet-date">
                              <div>Date</div>
                            </th>
                            <th class="bet-remark">
                              <div>Round Id</div>
                            </th>
                            <th class="bet-remark">
                              <div>Transaction Id</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <template
                            v-if="
                              unsettleData.ezugi && unsettleData.ezugi.length
                            "
                          >
                            <template v-for="(soda, key) in unsettleData.ezugi">
                              <tr :key="key">
                                <td class="bet-event-name">
                                  <div class="ifTooltip">{{ soda.gname }}</div>
                                </td>
                                <td class="bet-sport">
                                  <div class="ifTooltip">{{ soda.ttype }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.amt }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.total }}</div>
                                </td>
                                <!-- <td class="bet-amount">
                                  <div class="ifTooltip">{{ soda.ctype }}</div>
                              </td> -->
                                <td class="bet-date">
                                  <div class="ifTooltip">{{ soda.edt }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.rid }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.tid }}</div>
                                </td>
                              </tr>
                            </template>
                          </template>
                          <template v-else>
                            <tr class="no-record">
                              <td colspan="8">No records found</td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </template>
                  <!-- EVOLUTION WEB -->
                  <template
                    v-if="
                      unsettleData.evolution && unsettleData.evolution.length
                    "
                  >
                    <div class="report-event-title">Evolution</div>
                    <div class="table-responsive report-table">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th class="bet-event-name">
                              <div>Game Name</div>
                            </th>
                            <th class="bet-sport">
                              <div>Type</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Amount</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Total</div>
                            </th>
                            <!-- <th class="bet-amount">
                                  <div>Casino Type</div>
                              </th> -->
                            <th class="bet-date">
                              <div>Date</div>
                            </th>
                            <th class="bet-remark">
                              <div>Round Id</div>
                            </th>
                            <th class="bet-remark">
                              <div>Transaction Id</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <template
                            v-if="
                              unsettleData.evolution &&
                              unsettleData.evolution.length
                            "
                          >
                            <template
                              v-for="(soda, key) in unsettleData.evolution"
                            >
                              <tr :key="key">
                                <td class="bet-event-name">
                                  <div class="ifTooltip">{{ soda.gname }}</div>
                                </td>
                                <td class="bet-sport">
                                  <div class="ifTooltip">{{ soda.ttype }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.amt }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.total }}</div>
                                </td>
                                <!-- <td class="bet-amount">
                                  <div class="ifTooltip">{{ soda.ctype }}</div>
                              </td> -->
                                <td class="bet-date">
                                  <div class="ifTooltip">{{ soda.edt }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.rid }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.tid }}</div>
                                </td>
                              </tr>
                            </template>
                          </template>
                          <template v-else>
                            <tr class="no-record">
                              <td colspan="8">No records found</td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </template>
                  <!-- SS WEB -->
                  <template v-if="unsettleData.ss && unsettleData.ss.length">
                    <div class="report-event-title">Super Spade</div>
                    <div class="table-responsive report-table">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th class="bet-event-name">
                              <div>Game Name</div>
                            </th>
                            <th class="bet-sport">
                              <div>Type</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Amount</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Total</div>
                            </th>
                            <!-- <th class="bet-amount">
                                  <div>Casino Type</div>
                              </th> -->
                            <th class="bet-date">
                              <div>Date</div>
                            </th>
                            <th class="bet-remark">
                              <div>Round Id</div>
                            </th>
                            <th class="bet-remark">
                              <div>Transaction Id</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <template
                            v-if="unsettleData.ss && unsettleData.ss.length"
                          >
                            <template v-for="(soda, key) in unsettleData.ss">
                              <tr :key="key">
                                <td class="bet-event-name">
                                  <div class="ifTooltip">{{ soda.gname }}</div>
                                </td>
                                <td class="bet-sport">
                                  <div class="ifTooltip">{{ soda.ttype }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.amt }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.total }}</div>
                                </td>
                                <!-- <td class="bet-amount">
                                  <div class="ifTooltip">{{ soda.ctype }}</div>
                              </td> -->
                                <td class="bet-date">
                                  <div class="ifTooltip">{{ soda.edt }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.rid }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.tid }}</div>
                                </td>
                              </tr>
                            </template>
                          </template>
                          <template v-else>
                            <tr class="no-record">
                              <td colspan="8">No records found</td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </template>
                  <!-- QT WEB -->
                  <template v-if="unsettleData.qt && unsettleData.qt.length">
                    <div class="report-event-title">QTech</div>
                    <div class="table-responsive report-table">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th class="bet-event-name">
                              <div>Game Name</div>
                            </th>
                            <th class="bet-sport">
                              <div>Type</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Amount</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Total</div>
                            </th>
                            <!-- <th class="bet-amount">
                                  <div>Casino Type</div>
                              </th> -->
                            <th class="bet-date">
                              <div>Date</div>
                            </th>
                            <th class="bet-remark">
                              <div>Round Id</div>
                            </th>
                            <th class="bet-remark">
                              <div>Transaction Id</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <template
                            v-if="unsettleData.qt && unsettleData.qt.length"
                          >
                            <template v-for="(soda, key) in unsettleData.qt">
                              <tr :key="key">
                                <td class="bet-event-name">
                                  <div class="ifTooltip">{{ soda.gname }}</div>
                                </td>
                                <td class="bet-sport">
                                  <div class="ifTooltip">{{ soda.ttype }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.amt }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.total }}</div>
                                </td>
                                <!-- <td class="bet-amount">
                                  <div class="ifTooltip">{{ soda.ctype }}</div>
                              </td> -->
                                <td class="bet-date">
                                  <div class="ifTooltip">{{ soda.edt }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.rid }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.tid }}</div>
                                </td>
                              </tr>
                            </template>
                          </template>
                          <template v-else>
                            <tr class="no-record">
                              <td colspan="8">No records found</td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </template>
                  <!-- COCKFIGHT WEB -->
                  <template
                    v-if="
                      unsettleData.cockfight && unsettleData.cockfight.length
                    "
                  >
                    <div class="report-event-title">Cock Fight</div>
                    <div class="table-responsive report-table">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th class="bet-event-name">
                              <div>Game Name</div>
                            </th>
                            <th class="bet-sport">
                              <div>Type</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Amount</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Total</div>
                            </th>
                            <!-- <th class="bet-amount">
                                  <div>Casino Type</div>
                              </th> -->
                            <th class="bet-date">
                              <div>Date</div>
                            </th>
                            <th class="bet-remark">
                              <div>Round Id</div>
                            </th>
                            <th class="bet-remark">
                              <div>Transaction Id</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <template
                            v-if="
                              unsettleData.cockfight &&
                              unsettleData.cockfight.length
                            "
                          >
                            <template
                              v-for="(soda, key) in unsettleData.cockfight"
                            >
                              <tr :key="key">
                                <td class="bet-event-name">
                                  <div class="ifTooltip">{{ soda.gname }}</div>
                                </td>
                                <td class="bet-sport">
                                  <div class="ifTooltip">{{ soda.ttype }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.amt }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.total }}</div>
                                </td>
                                <!-- <td class="bet-amount">
                                  <div class="ifTooltip">{{ soda.ctype }}</div>
                              </td> -->
                                <td class="bet-date">
                                  <div class="ifTooltip">{{ soda.edt }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.rid }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.tid }}</div>
                                </td>
                              </tr>
                            </template>
                          </template>
                          <template v-else>
                            <tr class="no-record">
                              <td colspan="8">No records found</td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </template>
                  <!-- RUNNER WEB -->
                  <template
                    v-if="unsettleData.runner && unsettleData.runner.length"
                  >
                    <div class="report-event-title">Runner</div>
                    <div class="table-responsive report-table">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th class="bet-event-name">
                              <div>Game Name</div>
                            </th>
                            <th class="bet-sport">
                              <div>Type</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Amount</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Total</div>
                            </th>
                            <!-- <th class="bet-amount">
                                  <div>Casino Type</div>
                              </th> -->
                            <th class="bet-date">
                              <div>Date</div>
                            </th>
                            <th class="bet-remark">
                              <div>Round Id</div>
                            </th>
                            <th class="bet-remark">
                              <div>Transaction Id</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <template
                            v-if="
                              unsettleData.runner && unsettleData.runner.length
                            "
                          >
                            <template
                              v-for="(soda, key) in unsettleData.runner"
                            >
                              <tr :key="key">
                                <td class="bet-event-name">
                                  <div class="ifTooltip">{{ soda.gname }}</div>
                                </td>
                                <td class="bet-sport">
                                  <div class="ifTooltip">{{ soda.ttype }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.amt }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.total }}</div>
                                </td>
                                <!-- <td class="bet-amount">
                                  <div class="ifTooltip">{{ soda.ctype }}</div>
                              </td> -->
                                <td class="bet-date">
                                  <div class="ifTooltip">{{ soda.edt }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.rid }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.tid }}</div>
                                </td>
                              </tr>
                            </template>
                          </template>
                          <template v-else>
                            <tr class="no-record">
                              <td colspan="8">No records found</td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </template>
                  <!-- POP THE BALL WEB -->
                  <template
                    v-if="unsettleData.popball && unsettleData.popball.length"
                  >
                    <div class="report-event-title">Pop The Ball</div>
                    <div class="table-responsive report-table">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th class="bet-event-name">
                              <div>Game Name</div>
                            </th>
                            <th class="bet-sport">
                              <div>Type</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Amount</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Total</div>
                            </th>
                            <!-- <th class="bet-amount">
                                  <div>Casino Type</div>
                              </th> -->
                            <th class="bet-date">
                              <div>Date</div>
                            </th>
                            <th class="bet-remark">
                              <div>Round Id</div>
                            </th>
                            <th class="bet-remark">
                              <div>Transaction Id</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <template
                            v-if="
                              unsettleData.popball &&
                              unsettleData.popball.length
                            "
                          >
                            <template
                              v-for="(soda, key) in unsettleData.popball"
                            >
                              <tr :key="key">
                                <td class="bet-event-name">
                                  <div class="ifTooltip">{{ soda.gname }}</div>
                                </td>
                                <td class="bet-sport">
                                  <div class="ifTooltip">{{ soda.ttype }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.amt }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.total }}</div>
                                </td>
                                <!-- <td class="bet-amount">
                                  <div class="ifTooltip">{{ soda.ctype }}</div>
                              </td> -->
                                <td class="bet-date">
                                  <div class="ifTooltip">{{ soda.edt }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.rid }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.tid }}</div>
                                </td>
                              </tr>
                            </template>
                          </template>
                          <template v-else>
                            <tr class="no-record">
                              <td colspan="8">No records found</td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </template>

                  <!-- BINARY WEB -->
                  <template
                    v-if="unsettleData.binary && unsettleData.binary.length"
                  >
                    <div class="report-event-title">Binary</div>
                    <div class="table-responsive report-table">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th class="bet-event-name">
                              <div class="ifTooltip">Market Name</div>
                            </th>
                            <th class="bet-sport">
                              <div class="ifTooltip">Type</div>
                            </th>
                            <th class="bet-sport">
                              <div class="ifTooltip">Payout</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div class="ifTooltip">Amount</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div class="ifTooltip">Total</div>
                            </th>
                            <th class="bet-sport">
                              <div class="ifTooltip">Time</div>
                            </th>
                            <th class="bet-sport">
                              <div class="ifTooltip">Market Value</div>
                            </th>
                            <!-- <th class="bet-amount">
                                  <div class="ifTooltip">Casino Type</div>
                              </th> -->
                            <th class="bet-date">
                              <div class="ifTooltip">Date</div>
                            </th>
                            <th class="bet-remark">
                              <div class="ifTooltip">Transaction Id</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <template
                            v-if="
                              unsettleData.binary && unsettleData.binary.length
                            "
                          >
                            <template
                              v-for="(soda, key) in unsettleData.binary"
                            >
                              <tr :key="key">
                                <td class="bet-event-name">
                                  <div class="ifTooltip">{{ soda.mname }}</div>
                                </td>
                                <td class="bet-sport">
                                  <div class="ifTooltip">{{ soda.ttype }}</div>
                                </td>
                                <td class="bet-sport">
                                  <div class="ifTooltip">{{ soda.rate }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.amt }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.total }}</div>
                                </td>
                                <td class="bet-amount">
                                  <div class="ifTooltip">
                                    {{ `${soda.tslot} s` }}
                                  </div>
                                </td>
                                <td class="bet-amount">
                                  <div class="ifTooltip">{{ soda.mval }}</div>
                                </td>
                                <!-- <td class="bet-amount">
                                  <div class="ifTooltip">{{ soda.ctype }}</div>
                              </td> -->
                                <td class="bet-date">
                                  <div class="ifTooltip">{{ soda.edt }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.tid }}</div>
                                </td>
                              </tr>
                            </template>
                          </template>
                          <template v-else>
                            <tr class="no-record">
                              <td colspan="10">No records found</td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </template>

                  <!-- TGS WEB -->
                  <template v-if="unsettleData.tgs && unsettleData.tgs.length">
                    <div class="report-event-title d-none-mobile">
                      {{ unsettleData.tgs[0].ctype }}
                    </div>
                    <div class="table-responsive report-table d-none-mobile">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th class="bet-event-name">
                              <div>Game Name</div>
                            </th>
                            <th class="bet-sport">
                              <div>Type</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Amount</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Total</div>
                            </th>
                            <!-- <th class="bet-amount">
                                      <div>Casino Type</div>
                                  </th> -->
                            <th class="bet-date">
                              <div>Date</div>
                            </th>
                            <th class="bet-remark">
                              <div>Round Id</div>
                            </th>
                            <th class="bet-remark">
                              <div>Transaction Id</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <template
                            v-if="unsettleData.tgs && unsettleData.tgs.length"
                          >
                            <template v-for="(soda, key) in unsettleData.tgs">
                              <tr :key="key">
                                <td class="bet-event-name">
                                  <div class="ifTooltip">{{ soda.gname }}</div>
                                </td>
                                <td class="bet-sport">
                                  <div class="ifTooltip">{{ soda.ttype }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.amt }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.total }}</div>
                                </td>
                                <!-- <td class="bet-amount">
                                              <div class="ifTooltip">{{ soda.ctype }}</div>
                                          </td> -->
                                <td class="bet-date">
                                  <div class="ifTooltip">{{ soda.edt }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.rid }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.tid }}</div>
                                </td>
                              </tr>
                            </template>
                          </template>
                          <template v-else>
                            <tr class="no-record">
                              <td colspan="8">No records found</td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </template>

                  <!-- LUDO -->
                  <template
                    v-if="unsettleData.ludo && unsettleData.ludo.length"
                  >
                    <div class="report-event-title d-none-mobile">
                      {{ unsettleData.ludo[0].ctype }}
                    </div>
                    <div class="table-responsive report-table d-none-mobile">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th class="bet-event-name">
                              <div>Game Name</div>
                            </th>
                            <th class="bet-sport">
                              <div>Type</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Amount</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Total</div>
                            </th>
                            <!-- <th class="bet-amount">
                                      <div>Casino Type</div>
                                  </th> -->
                            <th class="bet-date">
                              <div>Date</div>
                            </th>
                            <th class="bet-remark">
                              <div>Round Id</div>
                            </th>
                            <th class="bet-remark">
                              <div>Transaction Id</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <template
                            v-if="unsettleData.ludo && unsettleData.ludo.length"
                          >
                            <template v-for="(soda, key) in unsettleData.ludo">
                              <tr :key="key">
                                <td class="bet-event-name">
                                  <div class="ifTooltip">{{ soda.gname }}</div>
                                </td>
                                <td class="bet-sport">
                                  <div class="ifTooltip">{{ soda.ttype }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.amt }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.total }}</div>
                                </td>
                                <!-- <td class="bet-amount">
                                              <div class="ifTooltip">{{ soda.ctype }}</div>
                                          </td> -->
                                <td class="bet-date">
                                  <div class="ifTooltip">{{ soda.edt }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.rid }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.tid }}</div>
                                </td>
                              </tr>
                            </template>
                          </template>
                          <template v-else>
                            <tr class="no-record">
                              <td colspan="8">No records found</td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </template>

                  <!-- SLOT -->
                  <template v-if="unsettleData.slot && unsettleData.slot.length">
                    <div class="report-event-title d-none-mobile">
                      {{ unsettleData.slot[0].ctype }}
                    </div>
                    <div class="table-responsive report-table d-none-mobile">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th class="bet-event-name">
                              <div>Game Name</div>
                            </th>
                            <th class="bet-sport">
                              <div>Type</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Amount</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Total</div>
                            </th>
                            <!-- <th class="bet-amount">
                                      <div>Casino Type</div>
                                  </th> -->
                            <th class="bet-date">
                              <div>Date</div>
                            </th>
                            <th class="bet-remark">
                              <div>Round Id</div>
                            </th>
                            <th class="bet-remark">
                              <div>Transaction Id</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <template
                            v-if="unsettleData.slot && unsettleData.slot.length"
                          >
                            <template v-for="(soda, key) in unsettleData.slot">
                              <tr :key="key">
                                <td class="bet-event-name">
                                  <div class="ifTooltip">{{ soda.gname }}</div>
                                </td>
                                <td class="bet-sport">
                                  <div class="ifTooltip">{{ soda.ttype }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.amt }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.total }}</div>
                                </td>
                                <!-- <td class="bet-amount">
                                              <div class="ifTooltip">{{ soda.ctype }}</div>
                                          </td> -->
                                <td class="bet-date">
                                  <div class="ifTooltip">{{ soda.edt }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.rid }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.tid }}</div>
                                </td>
                              </tr>
                            </template>
                          </template>
                          <template v-else>
                            <tr class="no-record">
                              <td colspan="8">No records found</td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </template>

                  <!-- TGS LIVE -->
                  <template v-if="unsettleData.tgslive && unsettleData.tgslive.length">
                    <div class="report-event-title d-none-mobile">
                      {{ unsettleData.tgslive[0].ctype }}
                    </div>
                    <div class="table-responsive report-table d-none-mobile">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th class="bet-event-name">
                              <div>Game Name</div>
                            </th>
                            <th class="bet-sport">
                              <div>Type</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Amount</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Total</div>
                            </th>
                            <!-- <th class="bet-amount">
                                      <div>Casino Type</div>
                                  </th> -->
                            <th class="bet-date">
                              <div>Date</div>
                            </th>
                            <th class="bet-remark">
                              <div>Round Id</div>
                            </th>
                            <th class="bet-remark">
                              <div>Transaction Id</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <template
                            v-if="unsettleData.tgslive && unsettleData.tgslive.length"
                          >
                            <template v-for="(soda, key) in unsettleData.tgslive">
                              <tr :key="key">
                                <td class="bet-event-name">
                                  <div class="ifTooltip">{{ soda.gname }}</div>
                                </td>
                                <td class="bet-sport">
                                  <div class="ifTooltip">{{ soda.ttype }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.amt }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.total }}</div>
                                </td>
                                <!-- <td class="bet-amount">
                                              <div class="ifTooltip">{{ soda.ctype }}</div>
                                          </td> -->
                                <td class="bet-date">
                                  <div class="ifTooltip">{{ soda.edt }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.rid }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.tid }}</div>
                                </td>
                              </tr>
                            </template>
                          </template>
                          <template v-else>
                            <tr class="no-record">
                              <td colspan="8">No records found</td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </template>

                  <!-- Rummy -->
                  <template
                    v-if="unsettleData.rummy && unsettleData.rummy.length"
                  >
                    <div class="report-event-title d-none-mobile">
                      {{ unsettleData.rummy[0].ctype }}
                    </div>
                    <div class="table-responsive report-table d-none-mobile">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th class="bet-event-name">
                              <div>Game Name</div>
                            </th>
                            <th class="bet-sport">
                              <div>Type</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Amount</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Total</div>
                            </th>
                            <!-- <th class="bet-amount">
                                      <div>Casino Type</div>
                                  </th> -->
                            <th class="bet-date">
                              <div>Date</div>
                            </th>
                            <th class="bet-remark">
                              <div>Round Id</div>
                            </th>
                            <th class="bet-remark">
                              <div>Transaction Id</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <template
                            v-if="unsettleData.rummy && unsettleData.rummy.length"
                          >
                            <template v-for="(soda, key) in unsettleData.rummy">
                              <tr :key="key">
                                <td class="bet-event-name">
                                  <div class="ifTooltip">{{ soda.gname }}</div>
                                </td>
                                <td class="bet-sport">
                                  <div class="ifTooltip">{{ soda.ttype }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.amt }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.total }}</div>
                                </td>
                                <!-- <td class="bet-amount">
                                              <div class="ifTooltip">{{ soda.ctype }}</div>
                                          </td> -->
                                <td class="bet-date">
                                  <div class="ifTooltip">{{ soda.edt }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.rid }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.tid }}</div>
                                </td>
                              </tr>
                            </template>
                          </template>
                          <template v-else>
                            <tr class="no-record">
                              <td colspan="8">No records found</td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </template>

                  <!-- LUDO -->
                  <template
                    v-if="unsettleData.ludoLands && unsettleData.ludoLands.length"
                  >
                    <div class="report-event-title d-none-mobile">
                      {{ unsettleData.ludoLands[0].ctype }}
                    </div>
                    <div class="table-responsive report-table d-none-mobile">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th class="bet-event-name">
                              <div>Game Name</div>
                            </th>
                            <th class="bet-sport">
                              <div>Type</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Amount</div>
                            </th>
                            <th class="bet-amount text-right">
                              <div>Total</div>
                            </th>
                            <!-- <th class="bet-amount">
                                      <div>Casino Type</div>
                                  </th> -->
                            <th class="bet-date">
                              <div>Date</div>
                            </th>
                            <th class="bet-remark">
                              <div>Round Id</div>
                            </th>
                            <th class="bet-remark">
                              <div>Transaction Id</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <template
                            v-if="unsettleData.ludoLands && unsettleData.ludoLands.length"
                          >
                            <template v-for="(soda, key) in unsettleData.ludoLands">
                              <tr :key="key">
                                <td class="bet-event-name">
                                  <div class="ifTooltip">{{ soda.gname }}</div>
                                </td>
                                <td class="bet-sport">
                                  <div class="ifTooltip">{{ soda.ttype }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.amt }}</div>
                                </td>
                                <td class="bet-amount text-right">
                                  <div class="ifTooltip">{{ soda.total }}</div>
                                </td>
                                <!-- <td class="bet-amount">
                                              <div class="ifTooltip">{{ soda.ctype }}</div>
                                          </td> -->
                                <td class="bet-date">
                                  <div class="ifTooltip">{{ soda.edt }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.rid }}</div>
                                </td>
                                <td class="bet-remark">
                                  <div class="ifTooltip">{{ soda.tid }}</div>
                                </td>
                              </tr>
                            </template>
                          </template>
                          <template v-else>
                            <tr class="no-record">
                              <td colspan="8">No records found</td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </template>
                </div>
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </div>
    </div>
    <b-modal ref="detail-modal" hide-footer size="xl" title="Details">
      <!-- CASINO -->
      <CasinoResult :resultData="gameDetail" />
      <AccountStatementSoda :gameSoda="gameSoda" />
    </b-modal>
  </div>
</template>

<script>
import ServiceApi from "@/services/ServiceApi";
import PageHeader from "@/components/page-header";
import DatePicker from "vue2-datepicker";
import downloadexcel from "vue-json-excel";
import moment from "moment-timezone";
import jsPDF from "jspdf";
import "jspdf-autotable";
import CasinoResult from "@/components/casino/results/CasinoResults";
import AccountStatementSoda from "@/components/AccountStatementSoda";
import Multiselect from "vue-multiselect";

export default {
  components: {
    PageHeader,
    downloadexcel,
    DatePicker,
    CasinoResult,
    AccountStatementSoda,
    Multiselect,
  },
  mounted() {
    this.params.gtype = this.$route.params.gtype
      ? this.$route.params.gtype
      : "";
    this.getGameTypeList();
    if (this.params.gtype != "") {
      this.loadReport();
    }
    this.changeTab(1);
  },
  data() {
    return {
      username: null,
      searchedUsers: [],
      reportData: [],
      tabNo: 1,
      items: [
        {
          text: "Home",
          to: { name: "home" },
        },
        {
          text: "Casino Result",
          active: true,
        },
      ],
      params: {
        dt: moment().tz(DEFAULT_TIMEZONE).format("MM/DD/YYYY"),
        gtype: "",
        uid: "",
      },
      reportFields: [
        {
          key: "gname",
          label: "Game Name",
          sortable: true,
        },
        {
          key: "ttype",
          label: "Type",
          sortable: true,
        },
        {
          key: "amt",
          label: "Amount",
          sortable: true,
          thClass: "text-right",
        },
        {
          key: "total",
          label: "Total",
          sortable: true,
          thClass: "text-right",
        },
        {
          key: "edt",
          label: "Date",
          sortable: true,
        },
        {
          key: "rid",
          label: "Round Id",
          sortable: true,
        },
        {
          key: "tid",
          label: "Transaction Id",
          sortable: true,
        },
      ],
      exportTable: {
        pdfHeading: [
          { title: "Casino Type", dataKey: "ctype" },
          { title: "Game Name", dataKey: "gname" },
          { title: "Type", dataKey: "ttype" },
          { title: "Amount", dataKey: "amt" },
          { title: "Total", dataKey: "total" },
          { title: "Date", dataKey: "edt" },
          { title: "Round Id", dataKey: "rid" },
          { title: "Transaction Id", dataKey: "tid" },
        ],
        excelHeading: {
          "Casino Type": "ctype",
          "Game Name": "gname",
          Type: "ttype",
          Amount: "amt",
          Total: "total",
          Date: "edt",
          "Round Id": "rid",
          "Transaction Id": "tid",
        },
      },
      currentPage: 1,
      filter: null,
      perPage: 25,
      totalLength: 0,
      totalRows: 0,
      pageOptions: [25, 50, 75, 100, 125, 150],
      casinoList: [],
      gameDetail: [],
      gameSoda: [],
      unSettleType: "",
      unsettleData: {},
    };
  },
  watch: {},
  computed: {},
  methods: {
    async fetchExcelData() {
      const response = _.cloneDeep(this.reportData);
      return response;
    },
    exportPdf() {
      if (this.reportData.length !== 0) {
        var doc = new jsPDF("l", "pt");
        var header = function (data) {
          doc.setFontSize(16);
          doc.text("Live Casino Results", 220, 25);
        };
        //console.log(this.exportTable.pdfHeading)
        doc.autoTable(this.exportTable.pdfHeading, this.reportData, {
          margin: { top: 50 },
          didDrawPage: header,
        });
        doc.save("livecasinoresults.pdf");
      }
    },
    resetReportForm() {
      this.params = {
        dt: moment().tz(DEFAULT_TIMEZONE).format("MM/DD/YYYY"),
        gtype: "",
        uid: "",
      };
      this.username = null;
      this.searchedUsers = [];
      this.reportData = [];
      this.tunSettleType = "";
      this.unsettleData = {};
    },
    disabledDt(date) {
      const today = new Date(
        moment().tz(DEFAULT_TIMEZONE).format("YYYY/MM/DD")
      );
      today.setHours(0, 0, 0, 0);
      return date > today;
    },
    changeTab(tabNo) {
      this.tabNo = tabNo;
      this.resetReportForm();
      this.setTableFields();
    },
    setTableFields() {
      if (this.tabNo == 1) {
        if (this.params.gtype == "pop-the-ball") {
          this.reportFields = [
            { key: "gname", label: "Game Name", sortable: true },
            { key: "ttype", label: "Type", sortable: true },
            {
              key: "urate",
              label: "Rate",
              sortable: true,
              thClass: "text-right",
            },
            {
              key: "amt",
              label: "Amount",
              sortable: true,
              thClass: "text-right",
            },
            {
              key: "winloss",
              label: "Win/Loss",
              sortable: true,
              thClass: "text-right",
            },
            {
              key: "total",
              label: "Total",
              sortable: true,
              thClass: "text-right",
            },
            { key: "edt", label: "Date", sortable: true },
            { key: "rid", label: "Round Id", sortable: true },
            { key: "tid", label: "Transaction Id", sortable: true },
          ];
          this.exportTable = {
            pdfHeading: [
              { title: "Game Name", dataKey: "gname" },
              { title: "Type", dataKey: "ttype" },
              { title: "Rate", dataKey: "urate" },
              { title: "Amount", dataKey: "amt" },
              { title: "Win/Loss", dataKey: "winloss" },
              { title: "Total", dataKey: "total" },
              { title: "Date", dataKey: "edt" },
              { title: "Round Id", dataKey: "rid" },
              { title: "Transaction Id", dataKey: "tid" },
            ],
            excelHeading: {
              "Game Name": "gname",
              Type: "ttype",
              Rate: "urate",
              Amount: "amt",
              "Win/Loss": "winloss",
              Total: "total",
              Date: "edt",
              "Round Id": "rid",
              "Transaction Id": "tid",
            },
          };
        } else if (this.params.gtype == "binary") {
          this.reportFields = [
            { key: "mname", label: "Market Name", sortable: true },
            { key: "ttype", label: "Type", sortable: true },
            {
              key: "urate",
              label: "Payout",
              sortable: true,
              thClass: "text-right",
            },
            {
              key: "amt",
              label: "Amount",
              sortable: true,
              thClass: "text-right",
            },
            {
              key: "winloss",
              label: "Win/Loss",
              sortable: true,
              thClass: "text-right",
            },
            {
              key: "total",
              label: "Total",
              sortable: true,
              thClass: "text-right",
            },
            { key: "tslot", label: "Time", sortable: true },
            { key: "mval", label: "Market Value", sortable: true },
            { key: "edt", label: "Date", sortable: true },
            //{key: "refid", label: "Ref Id", sortable: true},
            { key: "tid", label: "Transaction Id", sortable: true },
          ];
          this.exportTable = {
            pdfHeading: [
              { title: "Market Name", dataKey: "mname" },
              { title: "Type", dataKey: "ttype" },
              { title: "Payout", dataKey: "urate" },
              { title: "Amount", dataKey: "amt" },
              { title: "Win/Loss", dataKey: "winloss" },
              { title: "Total", dataKey: "total" },
              { title: "Time", dataKey: "tslot" },
              { title: "Market Value", dataKey: "mval" },
              { title: "Date", dataKey: "edt" },
              //{title: 'Ref Id', dataKey: 'refid'},
              { title: "Transaction Id", dataKey: "tid" },
            ],
            excelHeading: {
              "Market Name": "mname",
              Type: "ttype",
              Payout: "urate",
              Amount: "amt",
              "Win/Loss": "winloss",
              Total: "total",
              Time: "tslot",
              "Market Value": "mval",
              Date: "edt",
              // 'Ref Id' :'refid',
              "Transaction Id": "tid",
            },
          };
        } else if (this.params.gtype == "ludo" || this.params.gtype == "rummy" || this.params.gtype == "ludo-lands") {
          this.reportFields = [
            { key: "gname", label: "Game Name", sortable: true },
            { key: "ttype", label: "Type", sortable: true },
            {
              key: "amt",
              label: "Amount",
              sortable: true,
              thClass: "text-right",
            },
            {
              key: "total",
              label: "Total",
              sortable: true,
              thClass: "text-right",
            },
            { key: "edt", label: "Date", sortable: true },
            { key: "rid", label: "Round Id", sortable: true },
            { key: "tid", label: "Transaction Id", sortable: true },
          ];
          this.exportTable = {
            pdfHeading: [
              { title: "Game Name", dataKey: "gname" },
              { title: "Type", dataKey: "ttype" },
              { title: "Amount", dataKey: "amt" },
              { title: "Total", dataKey: "total" },
              { title: "Date", dataKey: "edt" },
              { title: "Round Id", dataKey: "rid" },
              { title: "Transaction Id", dataKey: "tid" },
            ],
            excelHeading: {
              "Game Name": "gname",
              Type: "ttype",
              Amount: "amt",
              Total: "total",
              Date: "edt",
              "Round Id": "rid",
              "Transaction Id": "tid",
            },
          };
        } else {
          this.reportFields = [
            { key: "gname", label: "Game Name", sortable: true },
            { key: "ttype", label: "Type", sortable: true },
            {
              key: "amt",
              label: "Amount",
              sortable: true,
              thClass: "text-right",
            },
            {
              key: "total",
              label: "Total",
              sortable: true,
              thClass: "text-right",
            },
            { key: "edt", label: "Date", sortable: true },
            { key: "rid", label: "Round Id", sortable: true },
            { key: "tid", label: "Transaction Id", sortable: true },
          ];
          this.exportTable = {
            pdfHeading: [
              { title: "Game Name", dataKey: "gname" },
              { title: "Type", dataKey: "ttype" },
              { title: "Amount", dataKey: "amt" },
              { title: "Total", dataKey: "total" },
              { title: "Date", dataKey: "edt" },
              { title: "Round Id", dataKey: "rid" },
              { title: "Transaction Id", dataKey: "tid" },
            ],
            excelHeading: {
              "Game Name": "gname",
              Type: "ttype",
              Amount: "amt",
              Total: "total",
              Date: "edt",
              "Round Id": "rid",
              "Transaction Id": "tid",
            },
          };
        }
      } else {
        this.reportFields = [
          { key: "ctype", label: "Casino Type", sortable: true },
          { key: "gname", label: "Game Name", sortable: true },
          { key: "ttype", label: "Type", sortable: true },
          {
            key: "amt",
            label: "Amount",
            sortable: true,
            thClass: "text-right",
          },
          {
            key: "total",
            label: "Total",
            sortable: true,
            thClass: "text-right",
          },
          { key: "edt", label: "Date", sortable: true },
          { key: "rid", label: "Round Id", sortable: true },
          { key: "tid", label: "Transaction Id", sortable: true },
        ];

        this.exportTable = {
          pdfHeading: [
            { title: "Casino Type", dataKey: "ctype" },
            { title: "Game Name", dataKey: "gname" },
            { title: "Type", dataKey: "ttype" },
            { title: "Amount", dataKey: "amt" },
            { title: "Date", dataKey: "edt" },
            { title: "Round Id", dataKey: "rid" },
            { title: "Transaction Id", dataKey: "tid" },
          ],
          excelHeading: {
            "Casino Type": "ctype",
            "Game Name": "gname",
            Type: "ttype",
            Amount: "amt",
            Date: "edt",
            "Round Id": "rid",
            "Transaction Id": "tid",
          },
        };
      }
    },
    getGameTypeList() {
      ServiceApi.callApi("report/tpgtypelist", {})
        .then((response) => {
          if (response.status == 200) {
            this.casinoList = response.data;
            //this.casinoList.push({"cname":"Ludo Lands","gtype":"ludo-lands"})
          } else {
            this.casinoList = [];
          }
        })
        .catch((e) => {
          this.casinoList = [];
        });
    },
    loadReport() {
      this.$validator.validateAll("casinoResult").then((valid) => {
        if (valid) {
          this.$store.state.isLoading = true;
          this.params.uid = this.username != null ? this.username.guid : "";
          let apiUrl = "";
          if (this.tabNo == 1) {
            apiUrl = "report/tpreportuserwise";
          } else {
            apiUrl = "report/tpcurrentbets";
          }
          ServiceApi.callApi(apiUrl, this.params)
            .then((response) => {
              this.$store.state.isLoading = false;

              if (response.status == 200) {
                if (this.tabNo == 1) {
                  const self = this;
                  let total = 0;
                  this.reportData = [];
                  var data = _.sortBy(response.data, ["edt"]);
                  //console.log(data);
                  _.forEach(data, function (value) {
                    if (self.tabNo == 1) {
                      value.gtype = self.params.gtype;
                    }

                    if (
                      value.gtype == "ezugi" ||
                      value.gtype == "evo" ||
                      value.gtype == "ss" ||
                      value.gtype == "qt"
                    ) {
                      if (
                        value.ttype.toLowerCase() == "credit" ||
                        value.ttype.toLowerCase() == "rollback"
                      ) {
                        total += value.amt;
                      } else if (value.ttype.toLowerCase() == "debit") {
                        total -= value.amt;
                      }
                    } else if (value.gtype == "cockfight") {
                      if (
                        value.ttype.toLowerCase() == "credit" ||
                        value.ttype.toLowerCase() == "rollback" ||
                        value.ttype.toLowerCase() == "cancel bet" ||
                        value.ttype.toLowerCase() == "adjust bet" ||
                        value.ttype.toLowerCase() == "void bet" ||
                        value.ttype.toLowerCase() == "unvoid settle"
                      ) {
                        total += value.amt;
                      } else if (
                        value.ttype.toLowerCase() == "debit" ||
                        value.ttype.toLowerCase() == "unsettle bet" ||
                        value.ttype.toLowerCase() == "unvoid bet" ||
                        value.ttype.toLowerCase() == "void settle"
                      ) {
                        total -= value.amt;
                      }
                    } else if (value.gtype == "runner") {
                      if (
                        value.ttype.toLowerCase() == "buyout" ||
                        value.ttype.toLowerCase() == "rollback" ||
                        value.ttype.toLowerCase() == "cancel"
                      ) {
                        total += value.amt;
                      } else if (value.ttype.toLowerCase() == "buyin") {
                        total -= value.amt;
                      }
                    } else if (value.gtype == "pop-the-ball") {
                      if (
                        value.ttype.toLowerCase() == "credit" ||
                        value.ttype.toLowerCase() == "rollback"
                      ) {
                        if (self.tabNo == 1) {
                          total += value.tip * value.amt;
                        } else {
                          total += value.amt;
                        }
                      } else if (value.ttype.toLowerCase() == "debit") {
                        // total -= value.tip * value.amt
                        total -= value.amt;
                      }
                    } else if (value.gtype == "binary") {
                      if (
                        value.ttype.toLowerCase() == "credit" ||
                        value.ttype.toLowerCase() == "rollback"
                      ) {
                        total += value.winloss;
                      } else if (value.ttype.toLowerCase() == "debit") {
                        total -= value.winloss;
                      }
                    } else if (value.gtype == "tgs" || value.gtype == "tgslive" || value.gtype == "slot") {
                      if (
                        value.ttype.toLowerCase() == "credit" ||
                        value.ttype.toLowerCase() == "rollback"
                      ) {
                        total += value.amt;
                      } else if (value.ttype.toLowerCase() == "debit") {
                        total -= value.amt;
                      }
                    } else if (value.gtype == "ludo" || value.gtype == "rummy" || value.gtype == "ludo-lands") {
                      if (
                        value.ttype.toLowerCase() == "credit" ||
                        value.ttype.toLowerCase() == "rollback"
                      ) {
                        total += value.winloss;
                      } else if (value.ttype.toLowerCase() == "debit") {
                        total -= value.winloss;
                      }
                    }

                    if (self.tabNo == 1) {
                      if (self.params.gtype == "pop-the-ball") {
                        self.reportData.push({
                          total: parseFloat(total).toFixed(2),
                          amt: value.amt,
                          edt: self.changeDateTimeFormat(value.edt),
                          gname: value.gname,
                          rid: value.rid,
                          tid: value.tid,
                          urate: value.tip,
                          ttype: value.ttype,
                          winloss: parseFloat(value.tip * value.amt).toFixed(2),
                        });
                      } else if (self.params.gtype == "binary") {
                        self.reportData.push({
                          mname: value.mname,
                          ttype: value.ttype,
                          urate: value.rate,
                          amt: value.amt,
                          winloss:
                            value.ttype.toLowerCase() == "debit"
                              ? 0
                              : value.winloss,
                          total: parseFloat(total).toFixed(2),
                          tslot: value.tslot + " s",
                          mval: value.mval,
                          edt: self.changeDateTimeFormat(value.edt),
                          // refid: value.refid,
                          tid: value.tid,
                        });
                      } else if (self.params.gtype == "ludo" || self.params.gtype == "rummy" || self.params.gtype == "ludo-lands") {
                        self.reportData.push({
                          total: parseFloat(total).toFixed(2),
                          amt: value.winloss,
                          edt: self.changeDateTimeFormat(value.edt),
                          gname: value.gname,
                          rid: value.rid,
                          tid: value.tid,
                          ctype: value.ctype,
                          ttype: value.ttype,
                        });
                      } else {
                        self.reportData.push({
                          total: parseFloat(total).toFixed(2),
                          amt: value.amt,
                          edt: self.changeDateTimeFormat(value.edt),
                          gname: value.gname,
                          rid: value.rid,
                          tid: value.tid,
                          ctype: value.ctype,
                          ttype: value.ttype,
                        });
                      }
                    } else {
                      self.reportData.push({
                        total: parseFloat(total).toFixed(2),
                        amt: value.amt,
                        edt: self.changeDateTimeFormat(value.edt),
                        gname: value.gname,
                        rid: value.rid,
                        tid: value.tid,
                        ctype: value.ctype,
                        ttype: value.ttype,
                      });
                    }
                  });
                  //this.reportData = response.data;
                  this.totalRows = this.reportData.length;
                } else {
                  if (response.data.t1) {
                    var ezugiData = [];
                    var resData = response.data.t1;
                    this.unSettleType = "ezugi";

                    if (resData && resData.length) {
                      let total = 0;
                      const self = this;
                      _.forEach(resData, function (value) {
                        if (value.gtype == "ezugi") {
                          if (
                            value.ttype.toLowerCase() == "credit" ||
                            value.ttype.toLowerCase() == "rollback"
                          ) {
                            total += value.amt;
                          } else if (value.ttype.toLowerCase() == "debit") {
                            total -= value.amt;
                          }
                        }

                        ezugiData.push({
                          total: parseFloat(total).toFixed(2),
                          amt: value.amt,
                          edt: self.changeDateTimeFormat(value.edt),
                          gname: value.gname,
                          rid: value.rid,
                          tid: value.tid,
                          ctype: value.ctype,
                          ttype: value.ttype,
                        });
                      });

                      Vue.set(this.unsettleData, "ezugi", ezugiData);
                    } else {
                      Vue.set(this.unsettleData, "ezugi", []);
                    }
                  }
                  if (response.data.t2) {
                    var evolutionData = [];
                    var resData = response.data.t2;
                    this.unSettleType = "evolution";

                    if (resData && resData.length) {
                      let total = 0;
                      const self = this;
                      _.forEach(resData, function (value) {
                        if (value.gtype == "evo") {
                          if (
                            value.ttype.toLowerCase() == "credit" ||
                            value.ttype.toLowerCase() == "rollback"
                          ) {
                            total += value.amt;
                          } else if (value.ttype.toLowerCase() == "debit") {
                            total -= value.amt;
                          }
                        }

                        evolutionData.push({
                          total: parseFloat(total).toFixed(2),
                          amt: value.amt,
                          edt: self.changeDateTimeFormat(value.edt),
                          gname: value.gname,
                          rid: value.rid,
                          tid: value.tid,
                          ctype: value.ctype,
                          ttype: value.ttype,
                        });
                      });

                      Vue.set(this.unsettleData, "evolution", evolutionData);
                    } else {
                      Vue.set(this.unsettleData, "evolution", []);
                    }
                  }
                  if (response.data.t3) {
                    var ssData = [];
                    var resData = response.data.t3;
                    this.unSettleType = "ss";

                    if (resData && resData.length) {
                      let total = 0;
                      const self = this;
                      _.forEach(resData, function (value) {
                        if (value.gtype == "ss") {
                          if (
                            value.ttype.toLowerCase() == "credit" ||
                            value.ttype.toLowerCase() == "rollback"
                          ) {
                            total += value.amt;
                          } else if (value.ttype.toLowerCase() == "debit") {
                            total -= value.amt;
                          }
                        }

                        ssData.push({
                          total: parseFloat(total).toFixed(2),
                          amt: value.amt,
                          edt: self.changeDateTimeFormat(value.edt),
                          gname: value.gname,
                          rid: value.rid,
                          tid: value.tid,
                          ctype: value.ctype,
                          ttype: value.ttype,
                        });
                      });

                      Vue.set(this.unsettleData, "ss", ssData);
                    } else {
                      Vue.set(this.unsettleData, "ss", []);
                    }
                  }
                  if (response.data.t4) {
                    var qtData = [];
                    var resData = response.data.t4;
                    this.unSettleType = "qt";

                    if (resData && resData.length) {
                      let total = 0;
                      const self = this;
                      _.forEach(resData, function (value) {
                        if (value.gtype == "qt") {
                          if (
                            value.ttype.toLowerCase() == "credit" ||
                            value.ttype.toLowerCase() == "rollback"
                          ) {
                            total += value.amt;
                          } else if (value.ttype.toLowerCase() == "debit") {
                            total -= value.amt;
                          }
                        }

                        qtData.push({
                          total: parseFloat(total).toFixed(2),
                          amt: value.amt,
                          edt: self.changeDateTimeFormat(value.edt),
                          gname: value.gname,
                          rid: value.rid,
                          tid: value.tid,
                          ctype: value.ctype,
                          ttype: value.ttype,
                        });
                      });

                      Vue.set(this.unsettleData, "qt", qtData);
                    } else {
                      Vue.set(this.unsettleData, "qt", []);
                    }
                  }
                  if (response.data.t5) {
                    var cockfightData = [];
                    var resData = response.data.t5;
                    this.unSettleType = "cockfight";

                    if (resData && resData.length) {
                      let total = 0;
                      const self = this;
                      _.forEach(resData, function (value) {
                        if (value.gtype == "cockfight") {
                          if (
                            value.ttype.toLowerCase() == "credit" ||
                            value.ttype.toLowerCase() == "rollback" ||
                            value.ttype.toLowerCase() == "cancel bet" ||
                            value.ttype.toLowerCase() == "adjust bet" ||
                            value.ttype.toLowerCase() == "void bet" ||
                            value.ttype.toLowerCase() == "unvoid settle"
                          ) {
                            total += value.amt;
                          } else if (
                            value.ttype.toLowerCase() == "debit" ||
                            value.ttype.toLowerCase() == "unsettle bet" ||
                            value.ttype.toLowerCase() == "unvoid bet" ||
                            value.ttype.toLowerCase() == "void settle"
                          ) {
                            total -= value.amt;
                          }
                        }

                        cockfightData.push({
                          total: parseFloat(total).toFixed(2),
                          amt: value.amt,
                          edt: self.changeDateTimeFormat(value.edt),
                          gname: value.gname,
                          rid: value.rid,
                          tid: value.tid,
                          ctype: value.ctype,
                          ttype: value.ttype,
                        });
                      });

                      Vue.set(this.unsettleData, "cockfight", cockfightData);
                    } else {
                      Vue.set(this.unsettleData, "cockfight", []);
                    }
                  }
                  if (response.data.t6) {
                    var runnerData = [];
                    var resData = response.data.t6;
                    this.unSettleType = "runner";

                    if (resData && resData.length) {
                      let total = 0;
                      const self = this;
                      _.forEach(resData, function (value) {
                        if (value.gtype == "runner") {
                          if (
                            value.ttype.toLowerCase() == "buyout" ||
                            value.ttype.toLowerCase() == "rollback" ||
                            value.ttype.toLowerCase() == "cancel"
                          ) {
                            total += value.amt;
                          } else if (value.ttype.toLowerCase() == "buyin") {
                            total -= value.amt;
                          }
                        }

                        runnerData.push({
                          total: parseFloat(total).toFixed(2),
                          amt: value.amt,
                          edt: self.changeDateTimeFormat(value.edt),
                          gname: value.gname,
                          rid: value.rid,
                          tid: value.tid,
                          ctype: value.ctype,
                          ttype: value.ttype,
                        });
                      });

                      Vue.set(this.unsettleData, "runner", runnerData);
                    } else {
                      Vue.set(this.unsettleData, "runner", []);
                    }
                  }
                  if (response.data.t7) {
                    var popballData = [];
                    var resData = response.data.t7;
                    this.unSettleType = "popball";

                    if (resData && resData.length) {
                      let total = 0;
                      const self = this;
                      _.forEach(resData, function (value) {
                        if (value.gtype == "pop-the-ball") {
                          if (value.ttype.toLowerCase() == "credit") {
                            total += value.amt;
                          } else if (value.ttype.toLowerCase() == "debit") {
                            total -= value.amt;
                          }
                        }

                        popballData.push({
                          total: parseFloat(total).toFixed(2),
                          amt: value.amt,
                          edt: self.changeDateTimeFormat(value.edt),
                          gname: value.gname,
                          rid: value.rid,
                          tid: value.tid,
                          ctype: value.ctype,
                          ttype: value.ttype,
                        });
                      });

                      Vue.set(this.unsettleData, "popball", popballData);
                    } else {
                      Vue.set(this.unsettleData, "popball", []);
                    }
                  }
                  if (response.data.t8) {
                    var binaryData = [];
                    var resData = response.data.t8;
                    this.unSettleType = "binary";

                    if (resData && resData.length) {
                      let total = 0;
                      const self = this;
                      _.forEach(resData, function (value) {
                        if (value.gtype.toLowerCase() == "binary") {
                          if (value.ttype.toLowerCase() == "credit") {
                            total += value.amt;
                          } else if (value.ttype.toLowerCase() == "debit") {
                            total -= value.amt;
                          }
                        }

                        binaryData.push({
                          total: parseFloat(total).toFixed(2),
                          amt: value.amt,
                          ctype: value.ctype,
                          edt: self.changeDateTimeFormat(value.edt),
                          gname: value.gname,
                          gtype: value.gtype,
                          mname: value.mname,
                          mval: value.mval,
                          rate: value.rate,
                          tid: value.tid,
                          tslot: value.tslot,
                          ttype: value.ttype,
                        });
                      });

                      Vue.set(this.unsettleData, "binary", binaryData);
                    } else {
                      Vue.set(this.unsettleData, "binary", []);
                    }
                  }

                  if (response.data.t9) {
                    var runnerData = [];
                    var resData = response.data.t9;
                    this.unSettleType = "tgs";

                    if (resData && resData.length) {
                      let total = 0;
                      const self = this;
                      _.forEach(resData, function (value) {
                        if (value.gtype.toLowerCase() == "tgs") {
                          if (
                            value.ttype.toLowerCase() == "credit" ||
                            value.ttype.toLowerCase() == "rollback"
                          ) {
                            total += value.amt;
                          } else if (value.ttype.toLowerCase() == "debit") {
                            total -= value.amt;
                          }
                        }

                        runnerData.push({
                          total: parseFloat(total).toFixed(2),
                          amt: value.amt,
                          edt: self.changeDateTimeFormat(value.edt),
                          gname: value.gname,
                          rid: value.rid,
                          tid: value.tid,
                          ctype: value.ctype,
                          ttype: value.ttype,
                        });
                      });

                      Vue.set(this.unsettleData, "tgs", runnerData);
                    } else {
                      Vue.set(this.unsettleData, "tgs", []);
                    }
                  }
                  if (response.data.t10) {
                    var runnerData = [];
                    var resData = response.data.t10;
                    this.unSettleType = "Ludo";

                    if (resData && resData.length) {
                      let total = 0;
                      const self = this;
                      _.forEach(resData, function (value) {
                        if (value.gtype.toLowerCase() == "ludo") {
                          if (
                            value.ttype.toLowerCase() == "credit" ||
                            value.ttype.toLowerCase() == "rollback"
                          ) {
                            total += value.wl;
                          } else if (value.ttype.toLowerCase() == "debit") {
                            total -= value.wl;
                          }
                        }

                        runnerData.push({
                          total: parseFloat(total).toFixed(2),
                          amt: value.wl,
                          edt: self.changeDateTimeFormat(value.edt),
                          gname: value.gname,
                          rid: value.rid,
                          tid: value.tid,
                          ctype: value.ctype,
                          ttype: value.ttype,
                        });
                      });

                      Vue.set(this.unsettleData, "ludo", runnerData);
                    } else {
                      Vue.set(this.unsettleData, "ludo", []);
                    }
                  }
                  if (response.data.t11) {
                    var runnerData = [];
                    var resData = response.data.t11;
                    this.unSettleType = "slot";

                    if (resData && resData.length) {
                      let total = 0;
                      const self = this;
                      _.forEach(resData, function (value) {
                        if (value.gtype.toLowerCase() == "slot") {
                          if (
                            value.ttype.toLowerCase() == "credit" ||
                            value.ttype.toLowerCase() == "rollback"
                          ) {
                            total += value.amt;
                          } else if (value.ttype.toLowerCase() == "debit") {
                            total -= value.amt;
                          }
                        }

                        runnerData.push({
                          total: parseFloat(total).toFixed(2),
                          amt: value.amt,
                          edt: self.changeDateTimeFormat(value.edt),
                          gname: value.gname,
                          rid: value.rid,
                          tid: value.tid,
                          ctype: value.ctype,
                          ttype: value.ttype,
                        });
                      });

                      Vue.set(this.unsettleData, "slot", runnerData);
                    } else {
                      Vue.set(this.unsettleData, "slot", []);
                    }
                  }
                  if (response.data.t12) {
                    var runnerData = [];
                    var resData = response.data.t12;
                    this.unSettleType = "tgslive";

                    if (resData && resData.length) {
                      let total = 0;
                      const self = this;
                      _.forEach(resData, function (value) {
                        if (value.gtype.toLowerCase() == "tgslive") {
                          if (
                            value.ttype.toLowerCase() == "credit" ||
                            value.ttype.toLowerCase() == "rollback"
                          ) {
                            total += value.amt;
                          } else if (value.ttype.toLowerCase() == "debit") {
                            total -= value.amt;
                          }
                        }

                        runnerData.push({
                          total: parseFloat(total).toFixed(2),
                          amt: value.amt,
                          edt: self.changeDateTimeFormat(value.edt),
                          gname: value.gname,
                          rid: value.rid,
                          tid: value.tid,
                          ctype: value.ctype,
                          ttype: value.ttype,
                        });
                      });

                      Vue.set(this.unsettleData, "tgslive", runnerData);
                    } else {
                      Vue.set(this.unsettleData, "tgslive", []);
                    }
                  }
                  if (response.data.t13) {
                    var runnerData = [];
                    var resData = response.data.t13;
                    this.unSettleType = "Rummy";

                    if (resData && resData.length) {
                      let total = 0;
                      const self = this;
                      _.forEach(resData, function (value) {
                        if (value.gtype.toLowerCase() == "rummy") {
                          if (
                            value.ttype.toLowerCase() == "credit" ||
                            value.ttype.toLowerCase() == "rollback"
                          ) {
                            total += value.wl;
                          } else if (value.ttype.toLowerCase() == "debit") {
                            total -= value.wl;
                          }
                        }

                        runnerData.push({
                          total: parseFloat(total).toFixed(2),
                          amt: value.wl,
                          edt: self.changeDateTimeFormat(value.edt),
                          gname: value.gname,
                          rid: value.rid,
                          tid: value.tid,
                          ctype: value.ctype,
                          ttype: value.ttype,
                        });
                      });

                      Vue.set(this.unsettleData, "rummy", runnerData);
                    } else {
                      Vue.set(this.unsettleData, "rummy", []);
                    }
                  }
                  if (response.data.t14) {
                    var runnerData = [];
                    var resData = response.data.t14;
                    this.unSettleType = "ludo-lands";

                    if (resData && resData.length) {
                      let total = 0;
                      const self = this;
                      _.forEach(resData, function (value) {
                        if (value.gtype.toLowerCase() == "ludo-lands") {
                          if (
                            value.ttype.toLowerCase() == "credit" ||
                            value.ttype.toLowerCase() == "rollback"
                          ) {
                            total += value.wl;
                          } else if (value.ttype.toLowerCase() == "debit") {
                            total -= value.wl;
                          }
                        }

                        runnerData.push({
                          total: parseFloat(total).toFixed(2),
                          amt: value.wl,
                          edt: self.changeDateTimeFormat(value.edt),
                          gname: value.gname,
                          rid: value.rid,
                          tid: value.tid,
                          ctype: value.ctype,
                          ttype: value.ttype,
                        });
                      });

                      Vue.set(this.unsettleData, "ludoLands", runnerData);
                    } else {
                      Vue.set(this.unsettleData, "ludoLands", []);
                    }
                  }
                }
              } else {
                this.reportData = [];
                this.totalRows = 0;
              }
            })
            .catch((e) => {
              //console.log(e)
              this.$store.state.isLoading = false;
              this.reportData = [];
              this.totalRows = 0;
            });
        }
      });
    },
    changeDateTimeFormatSettled(date) {
      var day = moment(String(date), "YYYY-MM-DD HH:mm:ss");
      var time = day.format("DD/MM/YYYY HH:mm:ss");
      return time;
    },
    changeDateTimeFormat(date) {
      var day = moment(String(date), "MM/DD/YYYY hh:mm:ss A");
      var time = day.format("DD/MM/YYYY HH:mm:ss");
      return time;
    },
    hideModal(ref) {
      this.$refs[ref].hide();
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    searchUser(query) {
      if (query.length > 2 && this.searchedUsers.length == 0) {
        ServiceApi.callApi("report/tpusersearch", {
          uname: query,
        })
          .then((response) => {
            if (response.success) {
              this.searchedUsers = response.data;
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
  },
};
</script>
