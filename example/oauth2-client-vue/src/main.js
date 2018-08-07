// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'
import App from './App'
import router from './router'


const authorizationUri = 'http://localhost:8998/dialog/authorize'
const baseUri = 'http://localhost:8080'

axios.defaults.baseURL = baseUri

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: baseUri,
  tokenPrefix: 'wjh',
  tokenName: 'access_token',
  storageType: 'localStorage',
  providers: {
    // Define OAuth providers config
    wesso: {
      name: 'wesso',
      url: '/api/auth/wesso',
      clientId: 'rmk',
      authorizationEndpoint: authorizationUri,
      redirectUri: window.location.origin + '/home', // Your client app URL
      requiredUrlParams: ['display', 'scope'],
      scope: ['email'],
      scopeDelimiter: ',',
      // display: 'popup',
      oauthType: '2.0',
      // popupOptions: { width: 580, height: 400 }
    },
  },
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
