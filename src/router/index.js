import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  component: Login
},
{
  path: '/',
  // 有默认子路由的不需要配置 name
  // name: 'tab-bar',
  component: () => import('@/views/tab-bar'),
  children: [
    {
      path: '', // 默认子路由
      name: 'home',
      component: () => import('@/views/home')
    },
    {
      path: 'qa',
      name: 'qa',
      component: () => import('@/views/qa')
    },
    {
      path: 'video',
      name: 'video',
      component: () => import('@/views/video')
    },
    {
      path: 'my',
      name: 'my',
      component: () => import('@/views/my')
    }
  ]
},
{
  path: '/user/:userId',
  name: 'user',
  component: () => import('@/views/user')
},
{
  path: '/search',
  name: 'search',
  component: () => import('@/views/search')
}
]

const router = new VueRouter({
  routes
})

export default router
