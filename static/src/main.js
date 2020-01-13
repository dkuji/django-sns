import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export

window.Vue = require('vue');
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
