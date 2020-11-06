import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'jquery/src/jquery.js'
// import './assets/js/popper.min.js'
// import 'bootstrap/dist/js/bootstrap.min.js'
// import './assets/js/plugins.js'
// import './assets/js/dzsparallaxer.js'
// import './assets/js/jquery.syotimer.min.js'
// import './assets/js/script.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
