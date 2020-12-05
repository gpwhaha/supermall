import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path:'',
      redirect:'/home'
    },
    {
      path:'/home',
      component:()=>import('../views/home/Home')
    },
    {
      path:'/category',
      component:()=>import('../views/category/Category')
    },
    {
      path:'/profile',
      component:()=>import('../views/profile/Profile')
    },
    {
      path:'/cart',
      component:()=>import('../views/cart/cart')
    },
  ],
  mode: 'history'
})
