import Vue from 'vue'
import App from './App.vue'
import './assets/styles/reset.css'
import './assets/styles/global.css'
import './services/newsService.js'
import router from "./router/index"
import store from "./store"
// login({
//   loginId: "user",
//   loginPwd: "123123"
// }).then((resp)=>{
//   console.log(resp)
// })

Vue.config.productionTip = false
store.dispatch("channels/fetchDatas")
store.dispatch("loginUser/whoAmI")

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
