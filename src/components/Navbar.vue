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
        </span>
        <span class="navbar-item" @click="goToCart">
          <i class="fas fa-shopping-cart"></i>
          <strong>Cart</strong>
        </span>
        <span class="navbar-item" @click="goToLogin">
          <i class="fas fa-user"></i>
          <strong>Login</strong>
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
        <span class="sidebar-item" @click="goToCartAndClose">
          <i class="fas fa-shopping-cart"></i>
          <strong>Cart</strong>
        </span>
        <span class="sidebar-item" @click="goToLoginAndClose">
          <i class="fas fa-user"></i>
          <strong>Login</strong>
        </span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      openSidebar: false,
      isMobile: window.innerWidth <= 768,
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
      this.$router.push('/wishlist');
    },

    /**
     * Navigates to the cart page.
     * @function goToCart
     */

    goToCart() {
      this.$router.push('/cart');
    },

    /**
     * Navigates to the login page.
     * @function goToLogin
     */

    goToLogin() {
      this.$router.push('/login');
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
     * Navigates to the cart page and closes the sidebar.
     * @function goToCartAndClose
     */
    goToCartAndClose() {
      this.goToCart();
      this.closeSidebar();
    },

    /**
     * Navigates to the login page and closes the sidebar.
     * @function goToLoginAndClose
     */
    
    goToLoginAndClose() {
      this.goToLogin();
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
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
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
}

.navbar-item i {
  margin-right: 0.5rem;
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
</style>
