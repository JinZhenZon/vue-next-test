import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue')
  },
  {
    path: '/modelTest',
    name: 'modelTest',
    component: () => import(/* webpackChunkName: "modelTest" */ '../views/modelTest')
  },
  {
    path: '/cycle',
    name: 'cycle',
    component: () => import(/* webpackChunkName: "cycle" */ '../views/cycle')
  },
  {
    path: '/computWatch',
    name: 'computWatch',
    component: () => import(/* webpackChunkName: "computWatch" */ '../views/computWatch')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
