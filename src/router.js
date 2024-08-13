import { createRouter, createWebHistory } from 'vue-router';
import Productlist from './components/Productlist.vue';
import ProductDetail from './components/Productdetail.vue';
import Wishlist from './components/Wishlist.vue';
import Cart from './components/Cart.vue';
import Login from './components/Login.vue';
import Comparison from './components/Comparison.vue';

const routes = [
  { path: '/', component: Productlist },
  { path: '/product/:id', component: ProductDetail },
  { path: '/wishlist', component: Wishlist },
  { path: '/cart', component: Cart }, 
  { path: '/login', component: Login },
  { path: '/comparison', component: Comparison }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
