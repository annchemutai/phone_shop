import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Products from '../components/Products.vue'
import ProductDetails from '../components/ProductDetails.vue'
import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'
import Profile from '../components/Profile.vue'
import Order from '../components/Order.vue'
import Admin from '../components/Admin.vue'


const router = createRouter({
 history: createWebHistory(import.meta.env.BASE_URL),
 routes: [
   {
     path: '/',
     name: 'home',
     component: Home,
   },
   {
     path: '/products',
     name: 'products',
     component: Products,
   },
   {
     path: '/product_details',
     name: 'product_details',
     component: ProductDetails,
   },
   {
     path: '/login',
     name: 'login',
     component: Login,
   },
   {
     path: '/signup',
     name: 'signup',
     component: SignUp,
   },
   {
     path: '/profile',
     name: 'profile',
     component: Profile,
   },
    {
     path: '/order',
     name: 'order',
     component: Order,
   },
   {
     path: '/admin',
     name: 'admin',
     component: Admin,
   },
 ],
})

export default router