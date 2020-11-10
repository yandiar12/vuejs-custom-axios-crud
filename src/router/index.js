import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const Page404 = () => import('@/views/Page404')
const BookForm = () => import('@/views/BookForm')
const Login = () => import('@/views/auth/Login')
const Register = () => import('@/views/auth/Register')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/sign-in',
    name: 'login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'register-user',
    component: Register
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/add',
    name: 'add',
    component: BookForm
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: BookForm,
    props: true
  },
  { path: "*", component: Page404 }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
