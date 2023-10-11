<template>
    <div class="report-box live-bets-report w-100">
        <div class="report-title">
            <div class="report-name">Live Casino Bets</div>
            <div class="report-search search-box" v-if="reportType != 'currentbets'">
                <div class="form-group mb-0">
                    <input type="text" v-model="searchText" placeholder="Search" class="form-control">
                    <img :src="imgPath + 'front/img/search.svg'" class="search-icon">
                </div>
            </div>
        </div>
        <div class="casino-report-tabs">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link" :class="{'active': reportType == 'results'}" data-toggle="tab"
                        @click="changeReportType('results')" href="javascript:void(0)">Settled</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{'active': reportType == 'currentbets'}" data-toggle="tab"
                        @click="changeReportType('currentbets')" href="javascript:void(0)">Un-Settled</a>
                </li>
            </ul>
        </div>
        <div class="report-form" v-if="reportType == 'results'">
            <div class="form-group from-date">
                <label>Date</label>
                <DatePicker v-model="params.dateFrom" :disabled-date="disabledFromDate" lang="en"
                    value-type="MM/DD/YYYY" format="DD/MM/YYYY" />
            </div>
            <div class="form-group to-date">
                <label>Type</label>
                <select class="form-control" v-model="params.type" @change="changeGameType($event)">
                    <option value="">Select Type</option>
                    <template v-for="(data, key) in casinoList">
                        <option :value="data.gtype" :key="key">{{ data.cname }}</option>
                    </template>
                </select>
            </div>
            <button class="btn btn-primary" @click="loadReport()">Submit</button>
        </div>
        <div class="report-page-count" v-if="reportType != 'currentbets'">
            <div class="form-group mb-0">
                <label>Show</label>
                <select class="form-control" v-model="page.perPage" @change="changePerPage($event)">
                    <template v-for="(page, key) in perPage">
                        <option :key="key" :value="page">{{ page }}</option>
                    </template>
                </select>
                <label>Entries</label>
            </div>
            <div class="file-icons">
                <div @click="generatePdf()">
                    <i class="fas fa-file-pdf" :class="{'disabled': !(this.data && this.data.length)}"></i>
                </div>
                <JsonExcel :fields="exportTable.excelHeading" :data="data"
                    :name="reportType == 'results' ? 'Live Casino Settled Bets.xls' : 'Live Casino Un-Settled Bets.xls'">
                    <i class="fas fa-file-excel" :class="{'disabled': !(this.data && this.data.length)}"></i>
                </JsonExcel>
            </div>
        </div>
        
        <!-- SETTLED BET -->
        <template v-if="reportType == 'results'">
            
            <!-- ### WEB ### -->

            <!-- BINARY WEB-->
            <template v-if="params.type == 'binary'">
                <div class="table-responsive report-table d-none-mobile" :class="{ 'loader-section-parent' : loading}">
                    <Loader :isVisible="loading"></Loader>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th class="bet-event-name">
                                    <div>Market Name</div>
                                </th>
                                <th class="bet-sport">
                                    <div>Type</div>
                                </th>
                                <th class="bet-amount text-right">
                                    <div>Payout</div>
                                </th>
                                <th class="bet-amount text-right">
                                    <div>Amount</div>
                                </th>
                                <th class="bet-amount text-right">
                                    <div>Win/Loss</div>
                                </th>
                                <th class="bet-amount text-right">
                                    <div>Total</div>
                                </th>
                                <th class="bet-amount">
                                    <div>Time</div>
                                </th>
                                <th class="bet-amount">
                                    <div>Market Value</div>
                                </th>
                                <th class="bet-date">
                                    <div>Date</div>
                                </th>
                                <th class="bet-remark">
                                    <div>Reference Id</div>
                                </th>
                                <th class="bet-remark">
                                    <div>Transaction Id</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="reportData && reportData.length">
                                <template v-for="(soda, key) in reportData">
                                    <tr :key="key">
                                        <td class="bet-event-name">
                                            <div class="ifTooltip">{{ soda.mname }}</div>
                                        </td>
                                        <td class="bet-sport">
                                            <div class="ifTooltip">{{ soda.ttype }}</div>
                                        </td>
                                        <td class="bet-amount text-right">
                                            <div class="ifTooltip">{{ soda.rate }}</div>
                                        </td>
                                        <td class="bet-amount text-right">
                                            <div class="ifTooltip">{{ soda.amt }}</div>
                                        </td>
                                        <td class="bet-amount text-right">
                                            <div class="ifTooltip">{{ soda.ttype.toLowerCase() == 'debit' ? 0 : soda.winloss }}</div>
                                        </td>
                                        <td class="bet-amount text-right">
                                            <div class="ifTooltip" :class="[{'text-success':soda.total > 0},{'text-danger':soda.total <= 0}]">{{ soda.total }}</div>
                                        </td>
                                        <td class="bet-amount">
                                            <div class="ifTooltip">{{ `${soda.tslot} s` }}</div>
                                        </td>
                                        <td class="bet-date">
                                            <div class="ifTooltip">{{ soda.mval }}</div>
                                        </td>
                                        <td class="bet-date">
                                            <div class="ifTooltip">{{ soda.edt }}</div>
                                        </td>
                                        <td class="bet-remark">
                                            <div class="ifTooltip">{{ soda.refid }}</div>
                                        </td>
                                        <td class="bet-remark">
                                            <div class="ifTooltip">{{ soda.tid }}</div>
                                        </td>
                                    </tr>
                                </template>
                            </template>
                            <template v-else>
                                <tr class="no-record">
                                    <td colspan="11">No records found</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </template>
            
            <!-- OTHER THAN BINARY WEB -->
            <template v-else>
                <div class="table-responsive report-table d-none-mobile" :class="{ 'loader-section-parent' : loading}">
                    <Loader :isVisible="loading"></Loader>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th class="bet-event-name">
                                    <div>Game Name</div>
                                </th>
                                <th class="bet-sport">
                                    <div>Type</div>
                                </th>
                                <th class="bet-amount text-right" v-if="params.type == 'pop-the-ball'">
                                    <div>Rate</div>
                                </th>
                                <th class="bet-amount text-right">
                                    <div>Amount</div>
                                </th>
                                <th class="bet-amount text-right" v-if="params.type == 'pop-the-ball'">
                                    <div>Win/Loss</div>
                                </th>
                                <th class="bet-amount text-right">
                                    <div>Total</div>
                                </th>
                                <th class="bet-amount" v-if="reportType == 'currentbets'">
                                    <div>Casino Type</div>
                                </th>
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
                            <template v-if="reportData && reportData.length">
                                <template v-for="(soda, key) in reportData">
                                    <tr :key="key">
                                        <td class="bet-event-name">
                                            <div class="ifTooltip">{{ soda.gname }}</div>
                                        </td>
                                        <td class="bet-sport">
                                            <div class="ifTooltip">{{ soda.ttype }}</div>
                                        </td>
                                        <td class="bet-amount text-right" v-if="params.type == 'pop-the-ball'">
                                            <div class="ifTooltip">{{ soda.urate }}</div>
                                        </td>
                                        <td class="bet-amount text-right">
                                            <div class="ifTooltip">{{ soda.amt }}</div>
                                        </td>
                                        <td class="bet-amount text-right" v-if="params.type == 'pop-the-ball'">
                                            <div class="ifTooltip">{{ soda.winloss }}</div>
                                        </td>
                                        <td class="bet-amount text-right">
                                            <div class="ifTooltip">{{ soda.total }}</div>
                                        </td>
                                        <td class="bet-amount" v-if="reportType == 'currentbets'">
                                            <div class="ifTooltip">{{ soda.ctype }}</div>
                                        </td>
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
                                    <td :colspan="reportType == 'results' ? params.type == 'pop-the-ball' ? 9 : 7 : 8">No records found</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </template>


            <!-- ### MOBILE ### -->

            <!-- BINARY MOBILE-->
            <template v-if="params.type == 'binary'">
                <div class="report-table d-none-desktop" :class="{ 'loader-section-parent' : loading}">
                    <Loader :isVisible="loading"></Loader>
                    <template v-if="reportData && reportData.length">
                        <template v-for="(data, key) in reportData">
                            <div class="report-row" :key="key">
                                <div>
                                    <span class="bet-heading">Market Name</span>
                                    <span>{{ data.mname }}</span>
                                </div>
                                <div>
                                    <span class="bet-heading">Type</span>
                                    <span>{{ data.ttype }}</span>
                                </div>
                                <div>
                                    <span class="bet-heading">Payout</span>
                                    <span>{{ data.rate }}</span>
                                </div>
                                <div>
                                    <span class="bet-heading">Amount</span>
                                    <span>{{ data.amt }}</span>
                                </div>
                                <div>
                                    <span class="bet-heading">Win/Loss</span>
                                    <span>{{ data.ttype.toLowerCase() == 'debit' ? 0 : data.winloss }}</span>
                                </div>
                                <div>
                                    <span class="bet-heading">Total</span>
                                    <span :class="[{'text-success':data.total > 0},{'text-danger':data.total <= 0}]">{{ data.total }}</span>
                                </div>
                                <div>
                                    <span class="bet-heading">Time</span>
                                    <span>{{ `${data.tslot} s` }}</span>
                                </div>
                                <div>
                                    <span class="bet-heading">Market Value</span>
                                    <span>{{ data.mval }}</span>
                                </div>
                                <div>
                                    <span class="bet-heading">Date</span>
                                    <span>{{ data.edt }}</span>
                                </div>
                                <div>
                                    <span class="bet-heading">Reference Id</span>
                                    <span>{{ data.refid }}</span>
                                </div>
                                <div>
                                    <span class="bet-heading">Transaction Id</span>
                                    <span>{{ data.tid }}</span>
                                </div>
                            </div>
                        </template>
                    </template>
                    <template v-else>
                        <div class="report-row no-record">No records found</div>
                    </template>
                </div>
            </template>

            <!-- OTHER THAN BINARY MOBILE -->
            <template v-else>
                <div class="report-table d-none-desktop" :class="{ 'loader-section-parent' : loading}">
                    <!-- <div class="loader-section" v-if="loading">
                        <div class="loader-section-icon"></div>
                    </div> -->
                    <Loader :isVisible="loading"></Loader>
                    <template v-if="reportData && reportData.length">
                        <template v-for="(data, key) in reportData">
                            <div class="report-row" :key="key">
                                <div>
                                    <span class="bet-heading">Game Name</span>
                                    <span>{{ data.gname }}</span>
                                </div>
                                <div>
                                    <span class="bet-heading">Type</span>
                                    <span>{{ data.ttype }}</span>
                                </div>
                                <div>
                                    <span class="bet-heading">Amount</span>
                                    <span>{{ data.amt }}</span>
                                </div>
                                <div>
                                    <span class="bet-heading">Total</span>
                                    <span>{{ data.total }}</span>
                                </div>
                                <!-- <div v-if="reportType == 'results'">
                                    <span class="bet-heading">Tip</span>
                                    <span>{{ data.tip }}</span>
                                </div> -->
                                <div v-if="reportType == 'currentbets'">
                                    <span class="bet-heading">Casino Type</span>
                                    <span>{{ data.ctype }}</span>
                                </div>
                                <div>
                                    <span class="bet-heading">Date</span>
                                    <span>{{ data.edt }}</span>
                                </div>
                                <div>
                                    <span class="bet-heading">Round Id</span>
                                    <span>{{ data.rid }}</span>
                                </div>
                                <div>
                                    <span class="bet-heading">Transaction Id</span>
                                    <span>{{ data.tid }}</span>
                                </div>
                            </div>
                        </template>
                    </template>
                    <template v-else>
                        <div class="report-row no-record">No records found</div>
                    </template>
                </div>
            </template>
        </template>

        <!-- UN-SETTLED BET -->
        <template v-else-if="reportType == 'currentbets'">
            <div class="unsettled-bets" :class="{ 'loader-section-parent' : loading}">
                <Loader :isVisible="loading"></Loader>
                
                <!-- ### WEB ### -->

                <!-- EZUGI WEB -->
                <template v-if="unsettleData.ezugi && unsettleData.ezugi.length">
                    <div class="report-event-title d-none-mobile">{{ unsettleData.ezugi[0].ctype }}</div>
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
                                <template v-if="unsettleData.ezugi && unsettleData.ezugi.length">
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
                <template v-if="unsettleData.evolution && unsettleData.evolution.length">
                    <div class="report-event-title d-none-mobile">{{ unsettleData.evolution[0].ctype }}</div>
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
                                <template v-if="unsettleData.evolution && unsettleData.evolution.length">
                                    <template v-for="(soda, key) in unsettleData.evolution">
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
                    <div class="report-event-title d-none-mobile">{{ unsettleData.ss[0].ctype }}</div>
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
                                <template v-if="unsettleData.ss && unsettleData.ss.length">
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
                    <div class="report-event-title d-none-mobile">{{ unsettleData.qt[0].ctype }}</div>
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
                                <template v-if="unsettleData.qt && unsettleData.qt.length">
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
                <template v-if="unsettleData.cockfight && unsettleData.cockfight.length"> 
                    <div class="report-event-title d-none-mobile">{{ unsettleData.cockfight[0].ctype }}</div>
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
                                <template v-if="unsettleData.cockfight && unsettleData.cockfight.length">
                                    <template v-for="(soda, key) in unsettleData.cockfight">
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
                <template v-if="unsettleData.runner && unsettleData.runner.length"> 
                    <div class="report-event-title d-none-mobile">{{ unsettleData.runner[0].ctype }}</div>
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
                                <template v-if="unsettleData.runner && unsettleData.runner.length">
                                    <template v-for="(soda, key) in unsettleData.runner">
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
                <template v-if="unsettleData.popball && unsettleData.popball.length"> 
                    <div class="report-event-title d-none-mobile">{{ unsettleData.popball[0].ctype }}</div>
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
                                <template v-if="unsettleData.popball && unsettleData.popball.length">
                                    <template v-for="(soda, key) in unsettleData.popball">
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
                <template v-if="unsettleData.binary && unsettleData.binary.length">
                    <div class="report-event-title d-none-mobile">{{ unsettleData.binary[0].ctype }}</div>
                    <div class="table-responsive report-table d-none-mobile">
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
                                <template v-if="unsettleData.binary && unsettleData.binary.length">
                                    <template v-for="(soda, key) in unsettleData.binary">
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
                                                <div class="ifTooltip">{{ `${soda.tslot} s` }}</div>
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
                    <div class="report-event-title d-none-mobile">{{ unsettleData.tgs[0].ctype }}</div>
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
                                <template v-if="unsettleData.tgs && unsettleData.tgs.length">
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

                <!-- TGSLIVE WEB -->
                <template v-if="unsettleData.tgslive && unsettleData.tgslive.length"> 
                    <div class="report-event-title d-none-mobile">{{ unsettleData.tgslive[0].ctype }}</div>
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
                                <template v-if="unsettleData.tgslive && unsettleData.tgslive.length">
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

                <!-- LUDO WEB -->
                <template v-if="unsettleData.ludo && unsettleData.ludo.length"> 
                    <div class="report-event-title d-none-mobile">{{ unsettleData.ludo[0].ctype }}</div>
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
                                <template v-if="unsettleData.ludo && unsettleData.ludo.length">
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

                <!-- RUMMY WEB -->
                <template v-if="unsettleData.rummy && unsettleData.rummy.length"> 
                    <div class="report-event-title d-none-mobile">{{ unsettleData.rummy[0].ctype }}</div>
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
                                <template v-if="unsettleData.rummy && unsettleData.rummy.length">
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

                <!-- EVO PLAY WEB -->
                <template v-if="unsettleData.slot1 && unsettleData.slot1.length"> 
                    <div class="report-event-title d-none-mobile">{{ unsettleData.slot1[0].ctype }}</div>
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
                                <template v-if="unsettleData.slot1 && unsettleData.slot1.length">
                                    <template v-for="(soda, key) in unsettleData.slot1">
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

                <!-- LUDO LANDS WEB -->
                <template v-if="unsettleData.ludoLands && unsettleData.ludoLands.length"> 
                    <div class="report-event-title d-none-mobile">{{ unsettleData.ludoLands[0].ctype }}</div>
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
                                <template v-if="unsettleData.ludoLands && unsettleData.ludoLands.length">
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


                <!-- ### MOBILE ### -->

                <!-- EZUGI MOBILE -->
                <template v-if="unsettleData.ezugi && unsettleData.ezugi.length">
                    <div class="report-event-title d-none-desktop">{{ unsettleData.ezugi[0].ctype }}</div>
                    <div class="report-table d-none-desktop">
                        <template v-if="unsettleData.ezugi && unsettleData.ezugi.length">
                            <template v-for="(data, key) in unsettleData.ezugi">
                                <div class="report-row" :key="key">
                                    <div>
                                        <span class="bet-heading">Game Name</span>
                                        <span>{{ data.gname }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Type</span>
                                        <span>{{ data.ttype }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Amount</span>
                                        <span>{{ data.amt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Total</span>
                                        <span>{{ data.total }}</span>
                                    </div>
                                    <!-- <div>
                                        <span class="bet-heading">Casino Type</span>
                                        <span>{{ data.ctype }}</span>
                                    </div> -->
                                    <div>
                                        <span class="bet-heading">Date</span>
                                        <span>{{ data.edt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Round Id</span>
                                        <span>{{ data.rid }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Transaction Id</span>
                                        <span>{{ data.tid }}</span>
                                    </div>
                                </div>
                            </template>
                        </template>
                        <!-- <template v-else>
                            <div class="report-row no-record">No records found</div>
                        </template> -->
                    </div>
                </template>

                <!-- EVOLUTION MOBILE -->
                <template v-if="unsettleData.evolution && unsettleData.evolution.length">
                    <div class="report-event-title d-none-desktop">{{ unsettleData.evolution[0].ctype }}</div>
                    <div class="report-table d-none-desktop">
                        <template v-if="unsettleData.evolution && unsettleData.evolution.length">
                            <template v-for="(data, key) in unsettleData.evolution">
                                <div class="report-row" :key="key">
                                    <div>
                                        <span class="bet-heading">Game Name</span>
                                        <span>{{ data.gname }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Type</span>
                                        <span>{{ data.ttype }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Amount</span>
                                        <span>{{ data.amt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Total</span>
                                        <span>{{ data.total }}</span>
                                    </div>
                                    <!-- <div>
                                        <span class="bet-heading">Casino Type</span>
                                        <span>{{ data.ctype }}</span>
                                    </div> -->
                                    <div>
                                        <span class="bet-heading">Date</span>
                                        <span>{{ data.edt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Round Id</span>
                                        <span>{{ data.rid }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Transaction Id</span>
                                        <span>{{ data.tid }}</span>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </div>
                </template>

                <!-- SS MOBILE -->
                <template v-if="unsettleData.ss && unsettleData.ss.length">
                    <div class="report-event-title d-none-desktop">{{ unsettleData.ss[0].ctype }}</div>
                    <div class="report-table d-none-desktop">
                        <template v-if="unsettleData.ss && unsettleData.ss.length">
                            <template v-for="(data, key) in unsettleData.ss">
                                <div class="report-row" :key="key">
                                    <div>
                                        <span class="bet-heading">Game Name</span>
                                        <span>{{ data.gname }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Type</span>
                                        <span>{{ data.ttype }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Amount</span>
                                        <span>{{ data.amt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Total</span>
                                        <span>{{ data.total }}</span>
                                    </div>
                                    <!-- <div>
                                        <span class="bet-heading">Casino Type</span>
                                        <span>{{ data.ctype }}</span>
                                    </div> -->
                                    <div>
                                        <span class="bet-heading">Date</span>
                                        <span>{{ data.edt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Round Id</span>
                                        <span>{{ data.rid }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Transaction Id</span>
                                        <span>{{ data.tid }}</span>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </div>
                </template>

                <!-- QT MOBILE -->
                <template v-if="unsettleData.qt && unsettleData.qt.length">
                    <div class="report-event-title d-none-desktop">{{ unsettleData.qt[0].ctype }}</div>
                    <div class="report-table d-none-desktop">
                        <template v-if="unsettleData.qt && unsettleData.qt.length">
                            <template v-for="(data, key) in unsettleData.qt">
                                <div class="report-row" :key="key">
                                    <div>
                                        <span class="bet-heading">Game Name</span>
                                        <span>{{ data.gname }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Type</span>
                                        <span>{{ data.ttype }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Amount</span>
                                        <span>{{ data.amt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Total</span>
                                        <span>{{ data.total }}</span>
                                    </div>
                                    <!-- <div>
                                        <span class="bet-heading">Casino Type</span>
                                        <span>{{ data.ctype }}</span>
                                    </div> -->
                                    <div>
                                        <span class="bet-heading">Date</span>
                                        <span>{{ data.edt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Round Id</span>
                                        <span>{{ data.rid }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Transaction Id</span>
                                        <span>{{ data.tid }}</span>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </div>
                </template>

                <!-- COCKFIGHT MOBILE -->
                <template v-if="unsettleData.cockfight && unsettleData.cockfight.length">
                    <div class="report-event-title d-none-desktop">{{ unsettleData.cockfight[0].ctype }}</div>
                    <div class="report-table d-none-desktop">
                        <template v-if="unsettleData.cockfight && unsettleData.cockfight.length">
                            <template v-for="(data, key) in unsettleData.cockfight">
                                <div class="report-row" :key="key">
                                    <div>
                                        <span class="bet-heading">Game Name</span>
                                        <span>{{ data.gname }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Type</span>
                                        <span>{{ data.ttype }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Amount</span>
                                        <span>{{ data.amt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Total</span>
                                        <span>{{ data.total }}</span>
                                    </div>
                                    <!-- <div>
                                        <span class="bet-heading">Casino Type</span>
                                        <span>{{ data.ctype }}</span>
                                    </div> -->
                                    <div>
                                        <span class="bet-heading">Date</span>
                                        <span>{{ data.edt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Round Id</span>
                                        <span>{{ data.rid }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Transaction Id</span>
                                        <span>{{ data.tid }}</span>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </div>
                </template>

                <!-- RUNNER MOBILE -->
                <template v-if="unsettleData.runner && unsettleData.runner.length">
                    <div class="report-event-title d-none-desktop">{{ unsettleData.runner[0].ctype }}</div>
                    <div class="report-table d-none-desktop">
                        <template v-if="unsettleData.runner && unsettleData.runner.length">
                            <template v-for="(data, key) in unsettleData.runner">
                                <div class="report-row" :key="key">
                                    <div>
                                        <span class="bet-heading">Game Name</span>
                                        <span>{{ data.gname }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Type</span>
                                        <span>{{ data.ttype }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Amount</span>
                                        <span>{{ data.amt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Total</span>
                                        <span>{{ data.total }}</span>
                                    </div>
                                    <!-- <div>
                                        <span class="bet-heading">Casino Type</span>
                                        <span>{{ data.ctype }}</span>
                                    </div> -->
                                    <div>
                                        <span class="bet-heading">Date</span>
                                        <span>{{ data.edt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Round Id</span>
                                        <span>{{ data.rid }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Transaction Id</span>
                                        <span>{{ data.tid }}</span>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </div>
                </template>

                <!-- POP THE BALL MOBILE -->
                <template v-if="unsettleData.popball && unsettleData.popball.length">
                    <div class="report-event-title d-none-desktop">{{ unsettleData.popball[0].ctype }}</div>
                    <div class="report-table d-none-desktop">
                        <template v-if="unsettleData.popball && unsettleData.popball.length">
                            <template v-for="(data, key) in unsettleData.popball">
                                <div class="report-row" :key="key">
                                    <div>
                                        <span class="bet-heading">Game Name</span>
                                        <span>{{ data.gname }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Type</span>
                                        <span>{{ data.ttype }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Amount</span>
                                        <span>{{ data.amt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Total</span>
                                        <span>{{ data.total }}</span>
                                    </div>
                                    <!-- <div>
                                        <span class="bet-heading">Casino Type</span>
                                        <span>{{ data.ctype }}</span>
                                    </div> -->
                                    <div>
                                        <span class="bet-heading">Date</span>
                                        <span>{{ data.edt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Round Id</span>
                                        <span>{{ data.rid }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Transaction Id</span>
                                        <span>{{ data.tid }}</span>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </div>
                </template>

                <!-- BINARY MOBILE -->
                <template v-if="unsettleData.binary && unsettleData.binary.length">
                    <div class="report-event-title d-none-desktop">{{ unsettleData.binary[0].ctype }}</div>
                    <div class="report-table d-none-desktop">
                        <template v-if="unsettleData.binary && unsettleData.binary.length">
                            <template v-for="(data, key) in unsettleData.binary">
                                <div class="report-row" :key="key">
                                    <div>
                                        <span class="bet-heading">Market Name</span>
                                        <span>{{ data.mname }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Type</span>
                                        <span>{{ data.ttype }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Payout</span>
                                        <span>{{ data.rate }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Amount</span>
                                        <span>{{ data.amt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Total</span>
                                        <span>{{ data.total }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Time</span>
                                        <span>{{ `${data.tslot} s` }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Market Value</span>
                                        <span>{{ data.mval }}</span>
                                    </div>
                                    <!-- <div>
                                        <span class="bet-heading">Casino Type</span>
                                        <span>{{ data.ctype }}</span>
                                    </div> -->
                                    <div>
                                        <span class="bet-heading">Date</span>
                                        <span>{{ data.edt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Transaction Id</span>
                                        <span>{{ data.tid }}</span>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </div>
                </template>

                <!-- TGS MOBILE -->
                <template v-if="unsettleData.tgs && unsettleData.tgs.length">
                    <div class="report-event-title d-none-desktop">{{ unsettleData.tgs[0].ctype }}</div>
                    <div class="report-table d-none-desktop">
                        <template v-if="unsettleData.tgs && unsettleData.tgs.length">
                            <template v-for="(data, key) in unsettleData.tgs">
                                <div class="report-row" :key="key">
                                    <div>
                                        <span class="bet-heading">Game Name</span>
                                        <span>{{ data.gname }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Type</span>
                                        <span>{{ data.ttype }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Amount</span>
                                        <span>{{ data.amt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Total</span>
                                        <span>{{ data.total }}</span>
                                    </div>
                                    <!-- <div>
                                        <span class="bet-heading">Casino Type</span>
                                        <span>{{ data.ctype }}</span>
                                    </div> -->
                                    <div>
                                        <span class="bet-heading">Date</span>
                                        <span>{{ data.edt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Round Id</span>
                                        <span>{{ data.rid }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Transaction Id</span>
                                        <span>{{ data.tid }}</span>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </div>
                </template>

                <!-- TGS MOBILE -->
                <template v-if="unsettleData.tgslive && unsettleData.tgslive.length">
                    <div class="report-event-title d-none-desktop">{{ unsettleData.tgslive[0].ctype }}</div>
                    <div class="report-table d-none-desktop">
                        <template v-if="unsettleData.tgslive && unsettleData.tgslive.length">
                            <template v-for="(data, key) in unsettleData.tgslive">
                                <div class="report-row" :key="key">
                                    <div>
                                        <span class="bet-heading">Game Name</span>
                                        <span>{{ data.gname }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Type</span>
                                        <span>{{ data.ttype }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Amount</span>
                                        <span>{{ data.amt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Total</span>
                                        <span>{{ data.total }}</span>
                                    </div>
                                    <!-- <div>
                                        <span class="bet-heading">Casino Type</span>
                                        <span>{{ data.ctype }}</span>
                                    </div> -->
                                    <div>
                                        <span class="bet-heading">Date</span>
                                        <span>{{ data.edt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Round Id</span>
                                        <span>{{ data.rid }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Transaction Id</span>
                                        <span>{{ data.tid }}</span>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </div>
                </template>

                <!-- LUDO MOBILE -->
                <template v-if="unsettleData.ludo && unsettleData.ludo.length">
                    <div class="report-event-title d-none-desktop">{{ unsettleData.ludo[0].ctype }}</div>
                    <div class="report-table d-none-desktop">
                        <template v-if="unsettleData.ludo && unsettleData.ludo.length">
                            <template v-for="(data, key) in unsettleData.ludo">
                                <div class="report-row" :key="key">
                                    <div>
                                        <span class="bet-heading">Game Name</span>
                                        <span>{{ data.gname }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Type</span>
                                        <span>{{ data.ttype }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Amount</span>
                                        <span>{{ data.amt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Total</span>
                                        <span>{{ data.total }}</span>
                                    </div>
                                    <!-- <div>
                                        <span class="bet-heading">Casino Type</span>
                                        <span>{{ data.ctype }}</span>
                                    </div> -->
                                    <div>
                                        <span class="bet-heading">Date</span>
                                        <span>{{ data.edt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Round Id</span>
                                        <span>{{ data.rid }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Transaction Id</span>
                                        <span>{{ data.tid }}</span>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </div>
                </template>

                <!-- RUMMY MOBILE -->
                <template v-if="unsettleData.rummy && unsettleData.rummy.length">
                    <div class="report-event-title d-none-desktop">{{ unsettleData.rummy[0].ctype }}</div>
                    <div class="report-table d-none-desktop">
                        <template v-if="unsettleData.rummy && unsettleData.rummy.length">
                            <template v-for="(data, key) in unsettleData.rummy">
                                <div class="report-row" :key="key">
                                    <div>
                                        <span class="bet-heading">Game Name</span>
                                        <span>{{ data.gname }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Type</span>
                                        <span>{{ data.ttype }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Amount</span>
                                        <span>{{ data.amt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Total</span>
                                        <span>{{ data.total }}</span>
                                    </div>
                                    <!-- <div>
                                        <span class="bet-heading">Casino Type</span>
                                        <span>{{ data.ctype }}</span>
                                    </div> -->
                                    <div>
                                        <span class="bet-heading">Date</span>
                                        <span>{{ data.edt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Round Id</span>
                                        <span>{{ data.rid }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Transaction Id</span>
                                        <span>{{ data.tid }}</span>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </div>
                </template>

                <!-- EVO PLAY MOBILE -->
                <template v-if="unsettleData.slot1 && unsettleData.slot1.length">
                    <div class="report-event-title d-none-desktop">{{ unsettleData.slot1[0].ctype }}</div>
                    <div class="report-table d-none-desktop">
                        <template v-if="unsettleData.slot1 && unsettleData.slot1.length">
                            <template v-for="(data, key) in unsettleData.slot1">
                                <div class="report-row" :key="key">
                                    <div>
                                        <span class="bet-heading">Game Name</span>
                                        <span>{{ data.gname }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Type</span>
                                        <span>{{ data.ttype }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Amount</span>
                                        <span>{{ data.amt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Total</span>
                                        <span>{{ data.total }}</span>
                                    </div>
                                    <!-- <div>
                                        <span class="bet-heading">Casino Type</span>
                                        <span>{{ data.ctype }}</span>
                                    </div> -->
                                    <div>
                                        <span class="bet-heading">Date</span>
                                        <span>{{ data.edt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Round Id</span>
                                        <span>{{ data.rid }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Transaction Id</span>
                                        <span>{{ data.tid }}</span>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </div>
                </template>

                <!-- LUDO LANDS MOBILE -->
                <template v-if="unsettleData.ludoLands && unsettleData.ludoLands.length">
                    <div class="report-event-title d-none-desktop">{{ unsettleData.ludoLands[0].ctype }}</div>
                    <div class="report-table d-none-desktop">
                        <template v-if="unsettleData.ludoLands && unsettleData.ludoLands.length">
                            <template v-for="(data, key) in unsettleData.ludoLands">
                                <div class="report-row" :key="key">
                                    <div>
                                        <span class="bet-heading">Game Name</span>
                                        <span>{{ data.gname }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Type</span>
                                        <span>{{ data.ttype }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Amount</span>
                                        <span>{{ data.amt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Total</span>
                                        <span>{{ data.total }}</span>
                                    </div>
                                    <!-- <div>
                                        <span class="bet-heading">Casino Type</span>
                                        <span>{{ data.ctype }}</span>
                                    </div> -->
                                    <div>
                                        <span class="bet-heading">Date</span>
                                        <span>{{ data.edt }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Round Id</span>
                                        <span>{{ data.rid }}</span>
                                    </div>
                                    <div>
                                        <span class="bet-heading">Transaction Id</span>
                                        <span>{{ data.tid }}</span>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </div>
                </template>

            </div>

        </template>

        <paginate v-if="page.totalPages > 0" v-model="page.currunt" :pageCount="page.totalPages" :clickHandler="changePage" :prevText="'<'"
            :nextText="'>'" :container-class="'pagination justify-content-center mt-2'" :page-class="'page-item'"
            :page-link-class="'page-link'" :prev-class="'page-item'" :prev-link-class="'page-link'"
            :next-class="'page-item'" :next-link-class="'page-link'" :first-last-button="true" :first-button-text="'<<'"
            :last-button-text="'>>'">
        </paginate>

    </div>
</template>

<script>
    import ServiceApi from "@/services/ServiceApi";
    import DatePicker from 'vue2-datepicker'
    import CasinoResult from '@/components/casino/results/CasinoResults'
    import AccountStatementSoda from '@/components/AccountStatementSoda'
    import jsPDF from 'jspdf'
    import 'jspdf-autotable'
    import JsonExcel from 'vue-json-excel'
    import moment from 'moment-timezone'
    // moment.tz.setDefault("Asia/Calcutta");
    import Loader from '@/components/loader'

    export default {
        components: {
            JsonExcel,
            DatePicker,
            CasinoResult,
            AccountStatementSoda,
            Loader
        },
        mounted() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            this.getCasinoType()
        },
        data() {
            return {
                imgPath: IMG_PATH,
                params: {
                    dateFrom: moment(new Date()).tz(DEFAULT_TIMEZONE).format("MM/DD/YYYY"),
                    type: '',
                },
                searchText: '',
                page: {
                    perPage: 25,
                    currunt: 1,
                    totalPages: 0
                },
                perPage: [
                    10, 25, 50, 100, 200, 300, 400, 500
                ],
                reportType: 'results',
                unSettleType: '',
                unsettleData: {},
                data: [],
                casinoList: [],
                gameDetail: [],
                gameSoda: [],
                exportTable: {
                    pdfHeading: [{
                            title: 'Game Name',
                            dataKey: 'gname'
                        },
                        {
                            title: 'Type',
                            dataKey: 'ttype'
                        },
                        {
                            title: 'Amount',
                            dataKey: 'amt'
                        },
                        {
                            title: 'Total',
                            dataKey: 'total'
                        },
                        // {
                        //     title: 'Tip',
                        //     dataKey: 'tip'
                        // },
                        {
                            title: 'Date',
                            dataKey: 'edt'
                        },
                        {
                            title: 'Round Id',
                            dataKey: 'rid'
                        },
                        {
                            title: 'Transaction Id',
                            dataKey: 'tid'
                        }
                    ],
                    excelHeading: {
                        'Game Name': 'gname',
                        'Type': 'ttype',
                        'Amount': 'amt',
                        'Total': 'total',
                        // 'Tip': 'tip',
                        'Date': 'edt',
                        'Round Id': 'rid',
                        'Transaction Id': 'tid'
                    }
                },
                ipDetail: null,
                loading: false
            }
        },
        computed: {
            reportData() {
                var self = this
                var results = _.filter(this.data, function (item) {
                    return _.some(item, v => _.includes(v.toString().toLowerCase(), self.searchText))
                });
                this.page.totalPages = Math.ceil(results.length / this.page.perPage);
                if(this.page.currunt > this.page.totalPages){
                    this.page.currunt = 1
                }
                return this.paginate(results)
            },
        },
        watch: {
            searchText() {
                // console.log('change')
                // this.page.currunt = 1
                // this.page.data = this.paginate(this.reportData)
                this.page.totalPages = Math.ceil(this.data.length / this.page.perPage);
            }
        },
        methods: {
            changeGameType(event){
                this.data = []
                if(event.target.value == 'pop-the-ball'){
                    this.exportTable.pdfHeading = [{
                            title: 'Game Name',
                            dataKey: 'gname'
                        },
                        {
                            title: 'Type',
                            dataKey: 'ttype'
                        },
                        {
                            title: 'Rate',
                            dataKey: 'urate'
                        },
                        {
                            title: 'Amount',
                            dataKey: 'amt'
                        },
                        {
                            title: 'Win/Loss',
                            dataKey: 'winloss'
                        },
                        {
                            title: 'Total',
                            dataKey: 'total'
                        },
                        {
                            title: 'Date',
                            dataKey: 'edt'
                        },
                        {
                            title: 'Round Id',
                            dataKey: 'rid'
                        },
                        {
                            title: 'Transaction Id',
                            dataKey: 'tid'
                        }
                    ]
                    this.exportTable.excelHeading = {
                        'Game Name': 'gname',
                        'Type': 'ttype',
                        'Rate': 'urate',
                        'Amount': 'amt',
                        'Win/Loss': 'winloss',
                        'Total': 'total',
                        'Date': 'edt',
                        'Round Id': 'rid',
                        'Transaction Id': 'tid'
                    }
                } else if(event.target.value == 'binary'){
                    this.exportTable.pdfHeading = [{
                            title: 'Market Name',
                            dataKey: 'mname'
                        },
                        {
                            title: 'Type',
                            dataKey: 'ttype'
                        },
                        {
                            title: 'Payout',
                            dataKey: 'rate'
                        },
                        {
                            title: 'Amount',
                            dataKey: 'amt'
                        },
                        {
                            title: 'Win/Loss',
                            dataKey: 'winloss'
                        },
                        {
                            title: 'Total',
                            dataKey: 'total'
                        },
                        {
                            title: 'Time',
                            dataKey: 'tslot'
                        },
                        {
                            title: 'Market Value',
                            dataKey: 'mval'
                        },
                        {
                            title: 'Date',
                            dataKey: 'edt'
                        },
                        {
                            title: 'Reference Id',
                            dataKey: 'refid'
                        },
                        {
                            title: 'Transaction Id',
                            dataKey: 'tid'
                        }
                    ]
                    this.exportTable.excelHeading = {
                        'Market Name': 'mname',
                        'Type': 'ttype',
                        'Payout': 'rate',
                        'Amount': 'amt',
                        'Win/Loss': 'winloss',
                        'Total': 'total',
                        'Time': 'tslot',
                        'Market Value': 'mval',
                        'Date': 'edt',
                        'Reference Id': 'refid',
                        'Transaction Id': 'tid'
                    }
                }
            },
            changeReportType(type) {
                this.data = []
                this.params.dateFrom = moment(new Date()).tz(DEFAULT_TIMEZONE).format("MM/DD/YYYY")
                this.params.type = ''
                this.reportType = type
                if (type == 'currentbets') {
                    this.exportTable.pdfHeading = [{
                            title: 'Game Name',
                            dataKey: 'gname'
                        },
                        {
                            title: 'Type',
                            dataKey: 'ttype'
                        },
                        {
                            title: 'Amount',
                            dataKey: 'amt'
                        },
                        {
                            title: 'Total',
                            dataKey: 'total'
                        },
                        {
                            title: 'Casino Type',
                            dataKey: 'ctype'
                        },
                        {
                            title: 'Date',
                            dataKey: 'edt'
                        },
                        {
                            title: 'Round Id',
                            dataKey: 'rid'
                        },
                        {
                            title: 'Transaction Id',
                            dataKey: 'tid'
                        }
                    ]
                    this.exportTable.excelHeading = {
                        'Game Name': 'gname',
                        'Casino Type': 'ctype',
                        'Amount': 'amt',
                        'Total': 'total',
                        'Casino Type': 'ctype',
                        'Date': 'edt',
                        'Round Id': 'rid',
                        'Transaction Id': 'tid'
                    }

                    this.loading = true
                    ServiceApi.callApi("api/front/tpcurrentbets")
                        .then(response => {
                            if (response.status == 200) {
                            this.unsettleData = {}
                                if(response.data.t1){
                                    var ezugiData = []
                                    var resData = response.data.t1
                                    this.unSettleType = "ezugi"

                                    if (resData && resData.length) {
                                        let total = 0
                                        const self = this
                                        _.forEach(resData, function (value) {
                                            if (value.gtype == 'ezugi'){
                                                if (value.ttype.toLowerCase() == 'credit' ||
                                                    value.ttype.toLowerCase() == 'rollback') {
                                                    total += value.amt
                                                } else if (value.ttype.toLowerCase() == 'debit') {
                                                    total -= value.amt
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
                                                ttype: value.ttype
                                            })
                                        })

                                        Vue.set(this.unsettleData, 'ezugi', ezugiData)
                                    }
                                    else{
                                        Vue.set(this.unsettleData, 'ezugi', [])
                                    }
                                }
                                if(response.data.t2){
                                    var evolutionData = []
                                    var resData = response.data.t2
                                    this.unSettleType = "evolution"

                                    if (resData && resData.length) {
                                        let total = 0
                                        const self = this
                                        _.forEach(resData, function (value) {
                                            if (value.gtype == 'evo'){
                                                if (value.ttype.toLowerCase() == 'credit' ||
                                                    value.ttype.toLowerCase() == 'rollback') {
                                                    total += value.amt
                                                } else if (value.ttype.toLowerCase() == 'debit') {
                                                    total -= value.amt
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
                                                ttype: value.ttype
                                            })
                                        })

                                        Vue.set(this.unsettleData, 'evolution', evolutionData)
                                    }else{
                                        Vue.set(this.unsettleData, 'evolution', [])
                                    }
                                }
                                if(response.data.t3){
                                    var ssData = []
                                    var resData = response.data.t3
                                    this.unSettleType = "ss"

                                    if (resData && resData.length) {
                                        let total = 0
                                        const self = this
                                        _.forEach(resData, function (value) {
                                            if (value.gtype == 'ss'){
                                                if (value.ttype.toLowerCase() == 'credit' ||
                                                    value.ttype.toLowerCase() == 'rollback') {
                                                    total += value.amt
                                                } else if (value.ttype.toLowerCase() == 'debit') {
                                                    total -= value.amt
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
                                                ttype: value.ttype
                                            })
                                        })

                                        Vue.set(this.unsettleData, 'ss', ssData)
                                    }else{
                                        Vue.set(this.unsettleData, 'ss', [])
                                    }
                                }
                                if(response.data.t4){
                                    var qtData = []
                                    var resData = response.data.t4
                                    this.unSettleType = "qt"

                                    if (resData && resData.length) {
                                        let total = 0
                                        const self = this
                                        _.forEach(resData, function (value) {
                                            if (value.gtype == 'qt'){
                                                if (value.ttype.toLowerCase() == 'credit' ||
                                                    value.ttype.toLowerCase() == 'rollback') {
                                                    total += value.amt
                                                } else if (value.ttype.toLowerCase() == 'debit') {
                                                    total -= value.amt
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
                                                ttype: value.ttype
                                            })
                                        })

                                        Vue.set(this.unsettleData, 'qt', qtData)
                                    }else{
                                        Vue.set(this.unsettleData, 'qt', [])
                                    }
                                }
                                if(response.data.t5){
                                    var cockfightData = []
                                    var resData = response.data.t5
                                    this.unSettleType = "cockfight"

                                    if (resData && resData.length) {
                                        let total = 0
                                        const self = this
                                        _.forEach(resData, function (value) {
                                            if (value.gtype == 'cockfight'){
                                                if (value.ttype.toLowerCase() == 'credit' ||
                                                    value.ttype.toLowerCase() == 'rollback' ||
                                                    value.ttype.toLowerCase() == 'cancel bet' ||
                                                    value.ttype.toLowerCase() == 'adjust bet' ||
                                                    value.ttype.toLowerCase() == 'void bet' ||
                                                    value.ttype.toLowerCase() == 'unvoid settle') {
                                                    total += value.amt
                                                } else if (value.ttype.toLowerCase() == 'debit' ||
                                                    value.ttype.toLowerCase() == 'unsettle bet' ||
                                                    value.ttype.toLowerCase() == 'unvoid bet' ||
                                                    value.ttype.toLowerCase() == 'void settle') {
                                                    total -= value.amt
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
                                                ttype: value.ttype
                                            })
                                        })

                                        Vue.set(this.unsettleData, 'cockfight', cockfightData)
                                    }else{
                                        Vue.set(this.unsettleData, 'cockfight', [])
                                    }
                                }
                                if(response.data.t6){
                                    var runnerData = []
                                    var resData = response.data.t6
                                    this.unSettleType = "runner"

                                    if (resData && resData.length) {
                                        let total = 0
                                        const self = this
                                        _.forEach(resData, function (value) {
                                            if (value.gtype == 'runner'){
                                                if (value.ttype.toLowerCase() == 'buyout' ||
                                                    value.ttype.toLowerCase() == 'rollback' ||
                                                    value.ttype.toLowerCase() == 'cancel') {
                                                    total += value.amt
                                                } else if (value.ttype.toLowerCase() == 'buyin') {
                                                    total -= value.amt
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
                                                ttype: value.ttype
                                            })
                                        })

                                        Vue.set(this.unsettleData, 'runner', runnerData)
                                    }else{
                                        Vue.set(this.unsettleData, 'runner', [])
                                    }
                                }
                                if(response.data.t7){
                                    var popballData = []
                                    var resData = response.data.t7
                                    this.unSettleType = "popball"

                                    if (resData && resData.length) {
                                        let total = 0
                                        const self = this
                                        _.forEach(resData, function (value) {
                                            if (value.gtype == 'pop-the-ball'){
                                                if (value.ttype.toLowerCase() == 'credit') {
                                                    total += value.amt
                                                } else if (value.ttype.toLowerCase() == 'debit') {
                                                    total -= value.amt
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
                                                ttype: value.ttype
                                            })
                                        })


                                        Vue.set(this.unsettleData, 'popball', popballData)
                                    }else{
                                        Vue.set(this.unsettleData, 'popball', [])
                                    }
                                }
                                if(response.data.t8){
                                    var binaryData = []
                                    var resData = response.data.t8
                                    this.unSettleType = "binary"

                                    if (resData && resData.length) {
                                        let total = 0
                                        const self = this
                                        _.forEach(resData, function (value) {
                                            if (value.gtype.toLowerCase() == 'binary'){
                                                if (value.ttype.toLowerCase() == 'credit') {
                                                    total += value.amt
                                                } else if (value.ttype.toLowerCase() == 'debit') {
                                                    total -= value.amt
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
                                                ttype: value.ttype
                                            })
                                        })

                                        Vue.set(this.unsettleData, 'binary', binaryData)
                                    }else{
                                        Vue.set(this.unsettleData, 'binary', [])
                                    }
                                }
                                if(response.data.t9){
                                    var runnerData = []
                                    var resData = response.data.t9
                                    this.unSettleType = "tgs"

                                    if (resData && resData.length) {
                                        let total = 0
                                        const self = this
                                        _.forEach(resData, function (value) {
                                            if (value.gtype.toLowerCase() == 'tgs'){
                                                if (value.ttype.toLowerCase() == 'credit' ||
                                                    value.ttype.toLowerCase() == 'rollback') {
                                                    total += value.amt
                                                } else if (value.ttype.toLowerCase() == 'debit') {
                                                    total -= value.amt
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
                                                ttype: value.ttype
                                            })
                                        })

                                        Vue.set(this.unsettleData, 'tgs', runnerData)
                                    }else{
                                        Vue.set(this.unsettleData, 'tgs', [])
                                    }
                                }
                                if(response.data.t10){
                                    var ludoData = []
                                    var resData = response.data.t10
                                    this.unSettleType = "ludo"

                                    if (resData && resData.length) {
                                        let total = 0
                                        const self = this
                                        _.forEach(resData, function (value) {
                                            if (value.gtype.toLowerCase() == 'ludo'){
                                                if (value.ttype.toLowerCase() == 'credit' ||
                                                    value.ttype.toLowerCase() == 'rollback') {
                                                    total += value.wl
                                                } else if (value.ttype.toLowerCase() == 'debit') {
                                                    total -= value.wl
                                                }
                                            }

                                            ludoData.push({
                                                total: parseFloat(total).toFixed(2),
                                                amt: value.wl,
                                                edt: self.changeDateTimeFormat(value.edt),
                                                gname: value.gname,
                                                rid: value.rid,
                                                tid: value.tid,
                                                ctype: value.ctype,
                                                ttype: value.ttype
                                            })
                                        })

                                        Vue.set(this.unsettleData, 'ludo', ludoData)
                                    }else{
                                        Vue.set(this.unsettleData, 'ludo', [])
                                    }
                                }
                                if(response.data.t11){
                                    var evoData = []
                                    var resData = response.data.t11
                                    this.unSettleType = "slot1"

                                    if (resData && resData.length) {
                                        let total = 0
                                        const self = this
                                        _.forEach(resData, function (value) {
                                            if (value.gtype.toLowerCase() == 'slot'){
                                                if (value.ttype.toLowerCase() == 'credit' ||
                                                    value.ttype.toLowerCase() == 'rollback') {
                                                    total += value.amt
                                                } else if (value.ttype.toLowerCase() == 'debit') {
                                                    total -= value.amt
                                                }
                                            }

                                            evoData.push({
                                                total: parseFloat(total).toFixed(2),
                                                amt: value.amt,
                                                edt: self.changeDateTimeFormat(value.edt),
                                                gname: value.gname,
                                                rid: value.rid,
                                                tid: value.tid,
                                                ctype: value.ctype,
                                                ttype: value.ttype
                                            })
                                        })

                                        Vue.set(this.unsettleData, 'slot1', evoData)
                                    }else{
                                        Vue.set(this.unsettleData, 'slot1', [])
                                    }
                                }
                                if(response.data.t12){
                                    var tgsLiveData = []
                                    var resData = response.data.t12
                                    this.unSettleType = "tgslive"

                                    if (resData && resData.length) {
                                        let total = 0
                                        const self = this
                                        _.forEach(resData, function (value) {
                                            if (value.gtype.toLowerCase() == 'tgslive'){
                                                if (value.ttype.toLowerCase() == 'credit' ||
                                                    value.ttype.toLowerCase() == 'rollback') {
                                                    total += value.amt
                                                } else if (value.ttype.toLowerCase() == 'debit') {
                                                    total -= value.amt
                                                }
                                            }

                                            tgsLiveData.push({
                                                total: parseFloat(total).toFixed(2),
                                                amt: value.amt,
                                                edt: self.changeDateTimeFormat(value.edt),
                                                gname: value.gname,
                                                rid: value.rid,
                                                tid: value.tid,
                                                ctype: value.ctype,
                                                ttype: value.ttype
                                            })
                                        })

                                        Vue.set(this.unsettleData, 'tgslive', tgsLiveData)
                                    }else{
                                        Vue.set(this.unsettleData, 'tgslive', [])
                                    }
                                }
                                if(response.data.t13){
                                    var rummyData = []
                                    var resData = response.data.t13
                                    this.unSettleType = "rummy"

                                    if (resData && resData.length) {
                                        let total = 0
                                        const self = this
                                        _.forEach(resData, function (value) {
                                            if (value.gtype.toLowerCase() == 'rummy'){
                                                if (value.ttype.toLowerCase() == 'credit' ||
                                                    value.ttype.toLowerCase() == 'rollback') {
                                                    total += value.wl
                                                } else if (value.ttype.toLowerCase() == 'debit') {
                                                    total -= value.wl
                                                }
                                            }

                                            rummyData.push({
                                                total: parseFloat(total).toFixed(2),
                                                amt: value.wl,
                                                edt: self.changeDateTimeFormat(value.edt),
                                                gname: value.gname,
                                                rid: value.rid,
                                                tid: value.tid,
                                                ctype: value.ctype,
                                                ttype: value.ttype
                                            })
                                        })

                                        Vue.set(this.unsettleData, 'rummy', rummyData)
                                    }else{
                                        Vue.set(this.unsettleData, 'rummy', [])
                                    }
                                }
                                if(response.data.t14){
                                    var ludoData = []
                                    var resData = response.data.t14
                                    this.unSettleType = "ludo-lands"

                                    if (resData && resData.length) {
                                        let total = 0
                                        const self = this
                                        _.forEach(resData, function (value) {
                                            if (value.gtype.toLowerCase() == 'ludo-lands'){
                                                if (value.ttype.toLowerCase() == 'credit' ||
                                                    value.ttype.toLowerCase() == 'rollback') {
                                                    total += value.wl
                                                } else if (value.ttype.toLowerCase() == 'debit') {
                                                    total -= value.wl
                                                }
                                            }

                                            ludoData.push({
                                                total: parseFloat(total).toFixed(2),
                                                amt: value.wl,
                                                edt: self.changeDateTimeFormat(value.edt),
                                                gname: value.gname,
                                                rid: value.rid,
                                                tid: value.tid,
                                                ctype: value.ctype,
                                                ttype: value.ttype
                                            })
                                        })

                                        Vue.set(this.unsettleData, 'ludoLands', ludoData)
                                    }else{
                                        Vue.set(this.unsettleData, 'ludoLands', [])
                                    }
                                }
                                
                                // this.page.totalPages = Math.ceil(this.data.length / this.page.perPage);
                                // if(this.page.currunt > this.page.totalPages){
                                //     this.page.currunt = 1
                                // }
                                // this.page.currunt = 1
                                this.loading = false
                            } else {
                                this.unsettleData = {}
                                // this.page.totalPages = 0
                                // this.page.currunt = 1
                                this.loading = false
                            }
                        })
                        .catch(e => {
                            this.unsettleData = {}
                            // this.page.totalPages = 0
                            // this.page.currunt = 1
                            this.loading = false
                        });
                } else {
                    this.exportTable.pdfHeading = [{
                            title: 'Game Name',
                            dataKey: 'gname'
                        },
                        {
                            title: 'Type',
                            dataKey: 'ttype'
                        },
                        {
                            title: 'Amount',
                            dataKey: 'amt'
                        },
                        {
                            title: 'Total',
                            dataKey: 'total'
                        },
                        {
                            title: 'Date',
                            dataKey: 'edt'
                        },
                        {
                            title: 'Round Id',
                            dataKey: 'rid'
                        },
                        {
                            title: 'Transaction Id',
                            dataKey: 'tid'
                        }
                    ]
                    this.exportTable.excelHeading = {
                        'Game Name': 'gname',
                        'Type': 'ttype',
                        'Amount': 'amt',
                        'Total': 'total',
                        'Date': 'edt',
                        'Round Id': 'rid',
                        'Transaction Id': 'tid'
                    }
                }
            },
            generatePdf() {
                if (this.data && this.data.length) {
                    const doc = new jsPDF()
                    var docTitle = this.reportType == 'results' ? 'Live Casino Settled Bets' :
                        'Live Casino Un-Settled Bets'
                    var header = function (data) {
                        doc.setFontSize(16);
                        doc.text(docTitle, data.settings.margin.left, 20);
                    };
                    doc.autoTable(this.exportTable.pdfHeading, this.data, {
                        margin: {
                            top: 25
                        },
                        didDrawPage: header
                    })
                    var docFileName = this.reportType == 'results' ? 'Live Casino Settled Bets.pdf' :
                        'Live Casino Un-Settled Bets.pdf'
                    doc.save(docFileName)
                }
            },
            changeDateTimeFormatSettled(date){
                var day = moment(String(date), "YYYY-MM-DD HH:mm:ss");
                var time = day.format("DD/MM/YYYY HH:mm:ss")
                return time
            },
            changeDateTimeFormat(date) {
                var day = moment(String(date), "MM-DD-YYYY hh:mm:ss A");
                var time = day.format("DD/MM/YYYY HH:mm:ss")
                return time
            },
            disabledFromDate(date) {
                const today = new Date(moment().tz(DEFAULT_TIMEZONE).format("YYYY/MM/DD"));
                const beforeOneMonth = new Date(moment().tz(DEFAULT_TIMEZONE).subtract(1, 'months').format("YYYY/MM/DD"))
                today.setHours(0, 0, 0, 0);

                return date >= this.params.dateTo || date > today || date < beforeOneMonth;
            },
            getCasinoType() {
                ServiceApi.callApi("api/front/tpcasinolist")
                    .then(response => {
                        if (response.status == 200) {
                            this.casinoList = response.data
                            //this.casinoList.push({"cname":"Ludo Lands","gtype":"ludo-lands"})
                        } else {
                            this.casinoList = []
                        }
                    })
                    .catch(e => {
                        this.casinoList = []
                    });
            },
            loadReport() {
                this.searchText = ''
                if (this.loading)
                    return

                if (this.params.type == '') {
                    this.$bvToast.toast('Select Casino Type!', {
                        variant: 'danger',
                        toaster: 'b-toaster-top-full',
                        autoHideDelay: 3000,
                    })
                    return
                }
                this.data = []
                this.loading = true
                ServiceApi.callApi("api/front/tpcasinoresult", this.params)
                    .then(response => {
                        if (response.status == 200) {
                            if (response.data && response.data.length) {
                                const self = this
                                let total = 0
                                
                                var data = _.sortBy(response.data, ['edt']);

                                _.forEach(data, function (value) {

                                    if (self.params.type == 'ezugi' ||
                                        self.params.type == 'evo' ||
                                        self.params.type == 'ss' ||
                                        self.params.type == 'qt') {
                                        if (value.ttype.toLowerCase() == 'credit' ||
                                            value.ttype.toLowerCase() == 'rollback') {
                                            total += value.amt
                                        } else if (value.ttype.toLowerCase() == 'debit') {
                                            total -= value.amt
                                        }
                                    } else if (self.params.type == 'cockfight') {
                                        if (value.ttype.toLowerCase() == 'credit' ||
                                            value.ttype.toLowerCase() == 'rollback' ||
                                            value.ttype.toLowerCase() == 'cancel bet' ||
                                            value.ttype.toLowerCase() == 'adjust bet' ||
                                            value.ttype.toLowerCase() == 'void bet' ||
                                            value.ttype.toLowerCase() == 'unvoid settle') {
                                            total += value.amt
                                        } else if (value.ttype.toLowerCase() == 'debit' ||
                                            value.ttype.toLowerCase() == 'unsettle bet' ||
                                            value.ttype.toLowerCase() == 'unvoid bet' ||
                                            value.ttype.toLowerCase() == 'void settle') {
                                            total -= value.amt
                                        }
                                    } else if (self.params.type == 'runner') {
                                        if (value.ttype.toLowerCase() == 'buyout' ||
                                            value.ttype.toLowerCase() == 'rollback' ||
                                            value.ttype.toLowerCase() == 'cancel') {
                                            total += value.amt
                                        } else if (value.ttype.toLowerCase() == 'buyin') {
                                            total -= value.amt
                                        }
                                    } else if (self.params.type == 'pop-the-ball') {
                                        if (value.ttype.toLowerCase() == 'credit' ||
                                            value.ttype.toLowerCase() == 'rollback') {
                                            total += value.tip * value.amt
                                            // total += value.amt
                                        } else if (value.ttype.toLowerCase() == 'debit') {
                                            // total -= value.tip * value.amt
                                            total -= value.amt
                                        }
                                    } else if (self.params.type == 'binary') {
                                        if (value.ttype.toLowerCase() == 'credit' ||
                                            value.ttype.toLowerCase() == 'rollback') {
                                            total += value.winloss
                                        } else if (value.ttype.toLowerCase() == 'debit') {
                                            total -= value.winloss
                                        }
                                    } else if (self.params.type == 'tgs' || self.params.type == 'tgslive' || self.params.type == 'slot') {
                                        if (value.ttype.toLowerCase() == 'credit' ||
                                            value.ttype.toLowerCase() == 'rollback') {
                                            total += value.amt
                                        } else if (value.ttype.toLowerCase() == 'debit') {
                                            total -= value.amt
                                        }
                                    } else if (self.params.type == 'ludo' || self.params.type == 'rummy' || self.params.type == 'ludo-lands' ) {
                                        if (value.ttype.toLowerCase() == 'credit' ||
                                            value.ttype.toLowerCase() == 'rollback') {
                                            total += value.winloss
                                        } else if (value.ttype.toLowerCase() == 'debit') {
                                            total -= value.winloss
                                        }
                                    } 
                                    
                                    if (self.params.type == 'pop-the-ball') {
                                        self.data.push({
                                            total: parseFloat(total).toFixed(2),
                                            amt: value.amt,
                                            edt: self.changeDateTimeFormatSettled(value.edt),
                                            gname: value.gname,
                                            rid: value.rid,
                                            tid: value.tid,
                                            urate: value.tip,
                                            ttype: value.ttype,
                                            winloss: parseFloat(value.tip * value.amt).toFixed(2)
                                        })
                                    } else if (self.params.type == 'binary') {
                                        self.data.push({
                                            total: parseFloat(total).toFixed(2),
                                            amt: value.amt,
                                            edt: self.changeDateTimeFormatSettled(value.edt),
                                            gname: value.gname,
                                            mname: value.mname,
                                            mval: value.mval,
                                            rate: value.rate,
                                            refid: value.refid,
                                            tid: value.tid,
                                            tslot: value.tslot,
                                            ttype: value.ttype,
                                            winloss: value.winloss
                                        })
                                    } else if(self.params.type == 'ludo' || self.params.type == 'rummy' || self.params.type == 'ludo-lands') {
                                        self.data.push({
                                            total: total,
                                            amt: value.winloss,
                                            edt: self.changeDateTimeFormatSettled(value.edt),
                                            gname: value.gname,
                                            rid: value.rid,
                                            tid: value.tid,
                                            ttype: value.ttype
                                        })
                                    } else {
                                        self.data.push({
                                            total: total,
                                            amt: value.amt,
                                            edt: self.changeDateTimeFormatSettled(value.edt),
                                            gname: value.gname,
                                            rid: value.rid,
                                            tid: value.tid,
                                            ttype: value.ttype
                                        })
                                    }
                                })
                            }
                            // this.data = response.data
                            this.page.totalPages = Math.ceil(this.data.length / this.page.perPage);
                            if(this.page.currunt > this.page.totalPages){
                                this.page.currunt = 1
                            }
                            // this.page.currunt = 1
                            this.loading = false
                        } else {
                            this.data = []
                            this.page.totalPages = 0
                            this.page.currunt = 1
                            this.loading = false
                            this.$bvToast.toast(response.msg, {
                                variant: 'danger',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                        }
                    })
                    .catch(e => {
                        this.data = []
                        this.page.totalPages = 0
                        this.page.currunt = 1
                        this.loading = false
                    });
            },

            prevPage() {
                if (this.page.currunt > 1) {
                    this.page.currunt--
                    // this.page.data = this.paginate(this.reportData)
                }
            },
            nextPage() {
                if (this.page.currunt < this.page.totalPages) {
                    this.page.currunt++
                    // this.page.data = this.paginate(this.reportData)
                }
            },
            firstPage() {
                this.page.currunt = 1
                // this.page.data = this.paginate(this.reportData)
            },
            lastPage() {
                this.page.currunt = this.page.totalPages
                // this.page.data = this.paginate(this.reportData)
            },
            changePage(page) {
                this.page.currunt = page
                // this.page.data = this.paginate(this.reportData)
            },
            changePerPage(event) {
                // console.log(event.target.value)
                // this.page.currunt = 1
                this.page.totalPages = Math.ceil(this.data.length / this.page.perPage);
                if(this.page.currunt > this.page.totalPages){
                    this.page.currunt = 1
                }
            },
            paginate(array) {
                let curruntPage = this.page.currunt - 1 // because pages logically start with 1, but technically with 0
                return array.slice(curruntPage * this.page.perPage, (curruntPage + 1) * this.page.perPage);
            },
        }
    }
</script>