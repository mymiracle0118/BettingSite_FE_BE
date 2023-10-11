import bearer from '@websanova/vue-auth/drivers/auth/bearer'
import axios from '@websanova/vue-auth/drivers/http/axios.1.x'
import router from '@websanova/vue-auth/drivers/router/vue-router.2.x'
// Auth base configuration some of this options
// can be override in method calls
const config = {
  auth: bearer,
  http: axios,
  router: router,
  tokenDefaultName: 'admin_token',
  tokenStore: ['localStorage'],
  loginData: {url: 'login', method: 'POST', redirect: '', fetchUser: false},
  logoutData: {url: 'logout', method: 'POST', redirect: '/', makeRequest: true},
  fetchData: {url: 'user', method: 'GET', enabled: false},
  refreshData: {url: 'refresh', method: 'GET', enabled: false, interval: 30}
}
export default config