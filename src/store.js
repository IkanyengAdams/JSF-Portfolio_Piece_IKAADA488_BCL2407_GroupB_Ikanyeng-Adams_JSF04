import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      cartCount: 0,
      wishlistCount: 0,
    };
  },
 
});

export default store;
