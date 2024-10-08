<template>
  <div class="wishlist-container">
    <h1>Shopping Wishlist</h1>
    <div class="sort-filter-container">
      <div class="filter-category">
        <label for="category">Filter by Category:</label>
        <select v-model="selectedCategory" @change="filterWishlist">
          <option value="">All Categories</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>

      <div class="sort-price">
        <label for="sort">Sort by Price:</label>
        <select v-model="selectedSort" @change="sortWishlist">
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>
      </div>
    </div>

    <div v-if="wishlistItems.length === 0" class="empty-wishlist-message">
      Your wishlist is empty.
    </div>

    <div class="wishlist-content">
      <div
        v-if="filteredWishlistItems.length === 0 && wishlistItems.length > 0"
        class="no-products-message"
      >
        No products found.
      </div>

      <div v-else class="wishlist-items">
        <div
          v-for="item in filteredWishlistItems"
          :key="item.id"
          class="wishlist-item"
        >
          <img :src="item.image" :alt="item.title" />
          <div class="item-details">
            <h2>{{ item.title }}</h2>
            <p>{{ "$" + item.price }}</p>
            <div class="item-buttons">
              <button
                class="remove-button"
                @click="removeFromWishlist(item.id)"
              >
                Remove
              </button>
              <button class="view-button" @click="viewProduct(item.id)">
                View Product
              </button>
              <button class="add-to-cart-button" @click="toggleCart(item)">
                {{ isInCart(item.id) ? "Remove from Cart" : "Add to Cart" }}
              </button>
            </div>
          </div>
        </div>
        <button class="clear-all-button" @click="clearWishlist">
          Clear All
        </button>
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
      /**
       * List of items in the wishlist.
       * @type {Array}
       */
      wishlistItems: JSON.parse(localStorage.getItem("wishlist")) || [],
       /**
       * List of items in the cart.
       * @type {Array}
       */
      cartItems: JSON.parse(localStorage.getItem("cart")) || [],
       /**
       * List of product categories.
       * @type {Array}
       */
      categories: [],
       /**
       * Currently selected category for filtering.
       * @type {string}
       */
      selectedCategory: "",
      /**
       * Current sorting option for price.
       * @type {string}
       */
      selectedSort: "asc",
    };
  },
  computed: {
    /**
     * Filters and sorts the wishlist items based on selected category and sorting option.
     * @returns {Array} The filtered and sorted wishlist items.
     */
    filteredWishlistItems() {
      let filteredItems = this.wishlistItems;

      if (this.selectedCategory) {
        filteredItems = filteredItems.filter(
          (item) => item.category === this.selectedCategory
        );
      }

      if (this.selectedSort === "asc") {
        filteredItems.sort((a, b) => a.price - b.price);
      } else if (this.selectedSort === "desc") {
        filteredItems.sort((a, b) => b.price - a.price);
      }

      return filteredItems;
    },
  },
  created() {
    this.fetchCategories();
  },
  methods: {
     /**
     * Fetches the list of product categories from the API.
     * @async
     */
    async fetchCategories() {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        this.categories = await response.json();
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    /**
     * Removes an item from the wishlist based on its ID.
     * @param {number} itemId - The ID of the item to remove.
     */
    removeFromWishlist(itemId) {
      const updatedWishlist = this.wishlistItems.filter(
        (item) => item.id !== itemId
      );
      this.wishlistItems = updatedWishlist;
      this.updateWishlist();
    },
    /**
     * Clears all items from the wishlist.
     */
    clearWishlist() {
      this.wishlistItems = [];
      this.updateWishlist();
    },
     /**
     * Updates the wishlist stored in localStorage.
     */
    updateWishlist() {
      localStorage.setItem("wishlist", JSON.stringify(this.wishlistItems));
    },
    /**
     * Updates the cart stored in localStorage.
     */
    updateCart() {
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },
      /**
     * Navigates to the product detail page for the given product ID.
     * @param {number} productId - The ID of the product to view.
     */
    async viewProduct(productId) {
      this.$router.push({ name: "ProductDetail", params: { id: productId } });
    },
    /**
     * Toggles the cart state of an item.
     * @param {Object} item - The item to add or remove from the cart.
     */
    toggleCart(item) {
      if (this.isInCart(item.id)) {
        this.cartItems = this.cartItems.filter(
          (cartItem) => cartItem.id !== item.id
        );
      } else {
        this.cartItems.push(item);
      }
      this.updateCart();
    },
    /**
     * Checks if an item is currently in the cart.
     * @param {number} itemId - The ID of the item to check.
     * @returns {boolean} True if the item is in the cart, otherwise false.
     */
    isInCart(itemId) {
      return this.cartItems.some((item) => item.id === itemId);
    },
     /**
     * Filters the wishlist items based on the selected category.
     * (Currently empty but can be implemented in the future.)
     */
    filterWishlist() {},
    /**
     * Sorts the wishlist items based on the selected sorting option.
     * (Currently empty but can be implemented in the future.)
     */
    sortWishlist() {},
    /**
     * Navigates back to the product list page.
     */
    goToProductList() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.wishlist-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: auto;
}

.sort-filter-container {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
}

.filter-category,
.sort-price {
  display: flex;
  flex-direction: column;
}

select {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ddd;
}

select:focus {
  outline: none;
  border-color: #3b82f6;
}

.wishlist-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.wishlist-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 500px;
  overflow-y: auto;
}

.wishlist-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 0.5rem;
}

.wishlist-item img {
  width: 100px;
  height: auto;
  border-radius: 0.5rem;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-buttons {
  display: flex;
  gap: 0.5rem;
}

.remove-button {
  background: #ff0000;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.remove-button:hover {
  background: #cc0000;
}

.view-button {
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.view-button:hover {
  background: #2563eb;
}

.add-to-cart-button {
  background: #10b981;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.add-to-cart-button:hover {
  background: #059669;
}

.clear-all-button {
  background: #ff0000;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
}

.clear-all-button:hover {
  background: #cc0000;
}

.back-button {
  background: #325cda;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  width: 100%;
  margin-top: 0.5rem;
}

.back-button:hover {
  background: #2548a8;
}

.empty-wishlist-message {
  font-size: 1.25rem;
  color: #ff0000;
  margin-bottom: 1rem;
}

.no-products-message {
  font-size: 1.25rem;
  color: #ff0000;
  margin: 1rem 0;
}
</style>
