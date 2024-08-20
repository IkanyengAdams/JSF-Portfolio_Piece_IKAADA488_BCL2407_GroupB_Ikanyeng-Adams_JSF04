import { createRouter, createWebHistory } from 'vue-router';
import Productlist from './components/Productlist.vue';
import ProductDetail from './components/Productdetail.vue';
import Wishlist from './components/Wishlist.vue';
import Cart from './components/Cart.vue';
import Login from './components/Login.vue';
import Comparison from './components/Comparison.vue';
import Checkout from './components/Checkout.vue';

const routes = [
  { 
    path: '/', 
    name: 'ProductList', 
    component: Productlist 
  },
  { 
    path: '/product/:id', 
    name: 'ProductDetail', 
    component: ProductDetail 
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
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
    name: 'Cart',
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
    name: 'Comparison',
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
  { 
    path: '/login', 
    name: 'Login', 
    component: Login 
  },
  { 
    path: '/checkout', 
    name: 'Checkout', 
    component: Checkout 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
