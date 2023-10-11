<template>
    <div class="report-box w-100">
        <div class="report-title mb-2">
            <div class="report-name">Coupons <!-- <a href="#coupon-table" class="btn btn-sm btn-primary float-right d-none-big"><i class="fa fa-gift"></i> View Your Coupons</a> --></div>
        </div>
        <div class="report-table container-fluid container-fluid-5">
            <div class="row row5">
                <div class="col-md-6">
                    
                    <img :src="imgPath+'front/img/coupon-banner.jpg'" class="w-100 mb-3">
                </div>
                <div class="col-md-6">
                    <table class="table table-hover" id="coupon-table">
                        <thead>
                            <tr>
                                <th>Coupon Name</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody v-if="coupons && coupons.length > 0">
                            <tr v-for="(coupon, key) in coupons">
                                <td>{{ coupon.ccode }}</td>
                                <td>{{ changeDateFormat(coupon.dt) }}</td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td class="text-center" colspan="2">No records found</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            
        </div>

    </div>
</template>

<script>
    import ServiceApi from "@/services/ServiceApi";
    import Loader from '@/components/loader'
    import moment from 'moment-timezone'
    export default {
        components: {
            Loader
        },
        mounted() {
            this.getCoupons()
        },
        data() {
            return {
                imgPath: IMG_PATH,
                loading: false,
                coupons: []
            }
        },
        methods: {
            changeDateFormat(date) {
                return moment(String(date), 'MM-DD-YYYY hh:mm:ss A').format('DD/MM/YYYY HH:mm:ss')
            },
            getCoupons() {
                ServiceApi.callApi("api/front/getcop", {})
                    .then(response => {
                        if (response.status == 200) {
                            this.coupons = response.data
                        } else {
                            this.coupons = null
                            //this.coupons = [{"ccode": "234SADASD", "dt": "02-03-2021"}, {"ccode": "234SADASD232", "dt": "03-03-2021"}]
                        }
                    })
                    .catch(e => {
                        this.coupons = null
                    });
            },
            
        }
    }
</script>