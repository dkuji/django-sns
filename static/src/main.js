import Vue from 'vue'
import App from './App.vue'
import Login from './components/Login.vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export

window.Vue = require('vue');
Vue.config.productionTip = false

new Vue({
  vuetify,
  //render: h => h(App),
  components: {
    App
  }
}).$mount('#app')

new Vue({
  el: '#login',
  vuetify,
  //render: h => h(Login),
  components: {
    Login
  },
  data: () => ({
    drawer: null,
    msg: "test",
  })
})
