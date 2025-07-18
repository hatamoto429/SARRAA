import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import ErrorPage from '../views/ErrorPage.vue'
import HomePage from '../views/HomePage.vue'
import AccountPage from '../views/AccountPage.vue'
import ProductPage from '../views/ProductPage.vue'
import CreateProductPage from '../views/CreateProductPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/account',
      name: 'account',
      component: AccountPage,
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/createproduct',
      name: 'createProduct',
      component: CreateProductPage,
    },
    {
      path: '/product/:name',
      name: 'product',
      component: ProductPage,
    },
    {
      path: '/:pathMatch(.*)*',
      //redirect: '/error',
      component: ErrorPage,
    },
  ],
})

export default router
