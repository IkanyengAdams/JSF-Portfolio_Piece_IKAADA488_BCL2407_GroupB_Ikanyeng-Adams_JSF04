import { createRouter, createWebHistory } from 'vue-router';
import Productlist from './components/Productlist.vue';
import ProductDetail from './components/Productdetail.vue';
import Wishlist from './components/Wishlist.vue';
import Cart from './components/Cart.vue';
import Login from './components/Login.vue';
import Comparison from './components/Comparison.vue';
import Checkout from './components/Checkout.vue'

const routes = [
  { path: '/', component: Productlist },
  { path: '/product/:id', component: ProductDetail },
  {
    path: '/wishlist',
    component: Wishlist,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) {
        alert('Please log in first');
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/cart',
    component: Cart,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) {
        alert('Please log in first');
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/comparison',
    component: Comparison,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) {
        alert('Please log in first');
        next('/login');
      } else {
        next();
      }
    },
  },
  { path: '/login', component: Login },
  { path: '/checkout', component: Checkout }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
