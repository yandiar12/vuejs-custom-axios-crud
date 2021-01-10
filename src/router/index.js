import Vue from 'vue'
import VueRouter from 'vue-router'
import { AuthHeader } from '../services/StorageService'
import Home from '../views/Home.vue'

const Page404 = () => import('@/views/Page404')
const BookList = () => import('@/views/BookList')
const BookForm = () => import('@/views/BookForm')
const Login = () => import('@/views/auth/Login')
const Register = () => import('@/views/auth/Register')
const UploadFile = () => import('@/views/UploadFileForm')
const Profile = () => import('@/views/Profile')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        name: 'home',
        component: BookList
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
      {
        path: '/uploadfiles',
        name: 'uploadFiles',
        component: UploadFile
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile
      },
    ]
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
  { path: "*", component: Page404 }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/sign-in', '/sign-up']
  const authRequired = !publicPages.includes(to.path)
  const token = AuthHeader.getAuthData()
  const loggedIn = !!token

  if (authRequired && !loggedIn) {
    return next({
      path: '/sign-in',
      query: { redirect: to.fullPath }
    })
  } else if (!authRequired && loggedIn) { 
    return next('/')
  } else {
    return next()
  }
})

export default router
