import Vue from 'vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export

// Components
import "./components";

window.Vue = require('vue');
Vue.config.productionTip = false

new Vue({
  el: '#app',
  vuetify,
}).$mount('#app')
