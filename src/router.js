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
  { path: '/wishlist', component: Wishlist, meta: { requiresAuth: true } },
  { path: '/cart', component: Cart, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/comparison', component: Comparison, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = localStorage.getItem('token');

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
