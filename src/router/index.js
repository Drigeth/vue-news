import VueRouter from "vue-router"
import Vue from "vue"

Vue.use(VueRouter)

var router = new VueRouter({
  routes:[
    {
      path: '/',
      name: 'home',
      component: () => import("@/views/Home")
    },
    {
      path: '/login',
      name: 'log',
      component: () => import("@/views/Login")
    },
    {
      path: '/reg',
      name: 'reg',
      component: () => import("@/views/Reg")
    },
    {
      path: '/channel/:id',
      name: 'channelNews',
      component: () => import("@/views/ChannelNews")
    },{
      path: "*",
      name: '404',
      component: () => import("@/views/NotFound")
    }
  ],
  mode: "history"
})

export default router