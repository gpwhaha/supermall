import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '',
            redirect: '/home',
            meta: {
                showTab: true
            }
        },
        {
            path: '/home',
            component: () => import('../views/home/Home'),
            meta: {
                showTab: true
            }
        },
        {
            path: '/category',
            component: () => import('../views/category/Category'),
            meta: {
                showTab: true
            }
        },
        {
            path: '/profile',
            component: () => import('../views/profile/Profile'),
            meta: {
                showTab: true
            }
        },
        {
            path: '/cart',
            component: () => import('../views/cart/cart'),
            meta: {
                showTab: true
            }
        },
        {
            path: '/test',
            component: () => import('../views/home/childComps/FeatureView'),
            meta: {
                showTab: false
            }
        },
    ],
    mode: 'history'
})
