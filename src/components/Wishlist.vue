<template>
  <div class="wishlist-container">
    <h1>Wishlist</h1>
    <div v-if="wishlistItems.length === 0" class="empty-wishlist-message">
      Your wishlist is empty.
    </div>
    <div class="wishlist-content">
      <div v-if="wishlistItems.length > 0" class="wishlist-items">
        <div v-for="item in wishlistItems" :key="item.id" class="wishlist-item">
          <img :src="item.image" :alt="item.title" />
          <div class="item-details">
            <h2>{{ item.title }}</h2>
            <p>{{ '$' + item.price }}</p>
            <button class="remove-button" @click="removeFromWishlist(item.id)">
              Remove
            </button>
          </div>
        </div>
      </div>
      <button class="back-button" @click="goToProductList">
        Back to Product List
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wishlistItems: JSON.parse(localStorage.getItem("wishlist")) || [],
    };
  },
  methods: {
    removeFromWishlist(itemId) {
      this.wishlistItems = this.wishlistItems.filter((item) => item.id !== itemId);
      this.updateWishlist();
    },
    updateWishlist() {
      localStorage.setItem("wishlist", JSON.stringify(this.wishlistItems));
    },
    goToProductList() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
</style>