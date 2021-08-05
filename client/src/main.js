import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import { store } from './store/store'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.filter('currency', value => {
  return '$' + parseFloat(value).toLocaleString((undefined, { minimumFractionDigits: 2 })) + " USD"
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  methods: {

  }
})
