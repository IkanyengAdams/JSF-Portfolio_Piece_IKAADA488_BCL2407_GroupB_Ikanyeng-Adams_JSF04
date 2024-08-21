<template>
  <header>
    <nav class="navbar">
      <div>
        <img src="/public/android-chrome-192x192.png" alt="logo-icon" class="logo-icon">
        <span class="heading" @click="goToProductList">SwiftCart</span>
      </div>
      <div class="navbar-items">
        <span class="navbar-item" @click="goToWishlist">
          <i class="fas fa-heart"></i>
          <strong>Wishlist</strong>
          <span class="wishlist-item-count">{{ wishlistItemCount }}</span>
        </span>
        <span class="navbar-item" @click="goToComparison">
          <i class="fas fa-exchange-alt"></i>
          <strong>Comparison</strong>
        </span>
        <span class="navbar-item" @click="goToCart">
          <i class="fas fa-shopping-cart"></i>
          <strong>Cart</strong>
          <span class="cart-item-count">{{ cartItemCount }}</span>
        </span>
        <span class="navbar-item" @click="handleLoginClick">
          <i class="fas fa-user"></i>
          <strong>{{ isLoggedIn ? 'Logged in' : 'Login' }}</strong>
        </span>
      </div>
      <button class="btn-toggle menu-icon" @click="toggleSidebar">
        &#9776;
      </button>
    </nav>
    <div :class="['sidebar', { open: openSidebar }]" v-if="isMobile">
      <div class="sidebar-items">
        <span class="close-icon" @click="toggleSidebar">&times;</span>
        <span class="sidebar-item" @click="goToWishlistAndClose">
          <i class="fas fa-heart"></i>
          <strong>Wishlist</strong>
        </span>
        <span class="sidebar-item" @click="goToComparisonAndClose">
          <i class="fas fa-exchange-alt"></i>
          <strong>Comparison</strong>
        </span>
        <span class="sidebar-item" @click="goToCartAndClose">
          <i class="fas fa-shopping-cart"></i>
          <strong>Cart</strong>
        </span>
        <span class="sidebar-item" @click="handleLoginClick">
          <i class="fas fa-user"></i>
          <strong>{{ isLoggedIn ? 'Logged in' : 'Login' }}</strong>
        </span>
      </div>
    </div>
    <div v-if="notification" class="notification">{{ notification }}</div>
  </header>
</template>


<script>
export default {
  data() {
    return {
      openSidebar: false,
      isMobile: window.innerWidth <= 768,
      isLoggedIn: !!localStorage.getItem('token'),
      notification: null,
      cartItemCount: this.getCartItemCount(),
      wishlistItemCount: this.getWishlistItemCount()
    };
  },
  methods: {
    /**
     * Toggles the visibility of the sidebar.
     * @function toggleSidebar
     */
    toggleSidebar() {
      this.openSidebar = !this.openSidebar;
    },

    /**
     * Navigates to the product list page.
     * @function goToProductList
     */
    goToProductList() {
      this.$router.push('/');
      this.closeSidebar();
    },

    /**
     * Navigates to the wishlist page.
     * @function goToWishlist
     */
    goToWishlist() {
      if (!this.isLoggedIn) {
        this.showNotification('You need to login first');
        return;
      }
      this.$router.push('/wishlist');
    },

    /**
     * Navigates to the comparison page.
     * @function goToComparison
     */
    goToComparison() {
      if (!this.isLoggedIn) {
        this.showNotification('You need to login first');
        return;
      }
      this.$router.push('/comparison');
    },

    /**
     * Navigates to the cart page.
     * @function goToCart
     */
    goToCart() {
      if (!this.isLoggedIn) {
        this.showNotification('You need to login first');
        return;
      }
      this.$router.push('/cart');
    },

    /**
     * Handles login click based on login status.
     * @function handleLoginClick
     */
    handleLoginClick() {
      this.$router.push('/login');
    },

    /**
     * Shows a temporary notification message and navigates to the login page.
     * @function showNotification
     * @param {string} message - The message to be displayed
     */
    showNotification(message) {
      this.notification = message;
      setTimeout(() => {
        this.notification = null;
        this.$router.push('/login');
      }, 2000); 
    },

    /**
     * Navigates to the wishlist page and closes the sidebar.
     * @function goToWishlistAndClose
     */
    goToWishlistAndClose() {
      this.goToWishlist();
      this.closeSidebar();
    },

    /**
     * Navigates to the comparison page and closes the sidebar.
     * @function goToComparisonAndClose
     */
    goToComparisonAndClose() {
      this.goToComparison();
      this.closeSidebar();
    },

    /**
     * Navigates to the cart page and closes the sidebar.
     * @function goToCartAndClose
     */
    goToCartAndClose() {
      this.goToCart();
      this.closeSidebar();
    },

    /**
     * Closes the sidebar.
     * @function closeSidebar
     */
    closeSidebar() {
      this.openSidebar = false;
    },

    /**
     * Handles window resize event to toggle mobile view.
     * @function handleResize
     */
    handleResize() {
      this.isMobile = window.innerWidth <= 768;
      if (!this.isMobile) {
        this.closeSidebar();
      }
    },

    /**
     * Gets the count of items in the cart from local storage.
     * @function getCartItemCount
     * @returns {number} The number of items in the cart
     */
    getCartItemCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      return cart.length;
    },

    /**
     * Gets the count of items in the wishlist from local storage.
     * @function getWishlistItemCount
     * @returns {number} The number of items in the wishlist
     */
    getWishlistItemCount() {
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      return wishlist.length;
    },

    /**
     * Updates cart and wishlist item counts on storage changes.
     * @function updateItemCounts
     */
    updateItemCounts() {
      this.cartItemCount = this.getCartItemCount();
      this.wishlistItemCount = this.getWishlistItemCount();
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('storage', this.updateItemCounts);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('storage', this.updateItemCounts);
  },
  watch: {
    '$route'() {
      this.isLoggedIn = !!localStorage.getItem('token');
      if (!this.isLoggedIn) {
        this.cartItemCount = 0;
        this.wishlistItemCount = 0;
      } else {
        this.cartItemCount = this.getCartItemCount();
        this.wishlistItemCount = this.getWishlistItemCount();
      }
    }
  }
};
</script>

<style scoped>
.navbar {
  background-color: blue;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}

.logo-icon {
  height: 32px;
}

.heading {
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}

.navbar-items {
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.navbar-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
}

.navbar-item i {
  margin-right: 0.5rem;
}

.cart-item-count {
  position: absolute;
  top: -10px;
  right: 30px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
}

.wishlist-item-count {
  position: absolute;
  top: -10px;
  right: 55px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
}

.menu-icon {
  display: none;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 220px;
  background-color: blue;
  transform: translateX(-100%);
  transition: transform 0.8s ease-out;
  z-index: 999;
  padding-top: 70px;
}

.sidebar.open {
  transform: translateX(0);
}

.sidebar-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  color: white;
}

.sidebar-item {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.sidebar-item i {
  margin-right: 0.5rem;
}

.close-icon {
  align-self: flex-end;
  cursor: pointer;
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .menu-icon {
    display: block;
  }
  .navbar-items {
    display: none;
  }
}

.logout-button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: darkred;
}

.notification {
  position: fixed;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  background-color: hsl(0, 95%, 61%);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 2000;
}
</style>
