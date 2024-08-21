import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      cartCount: 0,
      wishlistCount: 0,
    };
  },
  mutations: {
    setCartCount(state, count) {
      state.cartCount = count;
    },
    setWishlistCount(state, count) {
      state.wishlistCount = count;
    },
  },
  actions: {
    updateCartCount({ commit }, count) {
      commit("setCartCount", count);
    },
    updateWishlistCount({ commit }, count) {
      commit("setWishlistCount", count);
    },
  },
  getters: {
    cartCount: (state) => state.cartCount,
    wishlistCount: (state) => state.wishlistCount,
  },
});

export default store;
