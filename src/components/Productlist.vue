<template>
  <div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <div class="container">
        <div class="form-group">
          <select
            v-model="selectedCategory"
            @change="filterProducts"
            class="category-select"
          >
            <option value="">All Categories</option>
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
          <div class="relative w-full">
            <input
              type="search"
              class="search-input"
              placeholder="Search products..."
              v-model="searchQuery"
              @input="searchProducts"
            />
            <button type="submit" class="search-button">
              <i class="fa fa-search"></i>
              <span class="sr-only">Search</span>
            </button>
          </div>
        </div>
        <div class="sort-group">
          <label for="sort" class="sort-label">Sort by</label>
          <select
            id="sort"
            v-model="sortOption"
            @change="filterProducts"
            class="sort-select"
          >
            <option value="default">Default</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div class="products-container">
        <p v-if="filteredProducts.length === 0" class="no-items-message">
          No items found
        </p>
        <div
          v-else
          class="product-card"
          v-for="product in filteredProducts"
          :key="product.id"
        >
          <img :src="product.image" :alt="product.title" />
          <h2>{{ product.title }}</h2>
          <p>{{ "$" + product.price }}</p>
          <p>{{ product.category }}</p>
          <div class="rating">
            <svg
              v-for="i in 5"
              :key="i"
              :class="i <= Math.round(product.rating.rate) ? 'filled' : 'empty'"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 .587l3.668 7.571 8.332 1.151-6.063 5.852 1.428 8.287L12 18.897l-7.365 3.851 1.428-8.287-6.063-5.852 8.332-1.151z"
              />
            </svg>
          </div>
          <button class="view-button" @click="viewProduct(product.id)">
            <i class="fa fa-eye"></i> View Product
          </button>

          <div class="action-buttons">
            <button
              @click="toggleWishlist(product)"
              :class="{ active: product.inWishlist }"
              class="wishlist-button"
            >
              <i
                :class="product.inWishlist ? 'fa fa-heart' : 'fa fa-heart'"
              ></i>
            </button>

            <button
              @click="toggleCart(product)"
              :class="{ active: product.inCart }"
              class="cart-button"
            >
              <i
                :class="
                  product.inCart ? 'fa fa-shopping-cart' : 'fa fa-cart-plus'
                "
              ></i>
            </button>
            <button
              @click="toggleComparison(product)"
              :class="{ active: product.inComparison }"
              class="comparison-button"
            >
              <i
                :class="
                  product.inComparison
                    ? 'fa fa-balance-scale'
                    : 'fa fa-balance-scale-right'
                "
              ></i>
            </button>
          </div>
        </div>
      </div>
      <div v-if="message" class="message">{{ message }}</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, inject } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "ProductList",
  setup() {
    const { selectedCategory, searchQuery, sortOption } = inject("filters");
    const products = ref([]);
    const filteredProducts = ref([]);
    const loading = ref(true);
    const categories = ref([]);
    const noItemsFound = ref(false);
    const router = useRouter();
    const message = ref("");

    /**
     * Fetches the list of products from the API and filters them.
     * @async
     * @function fetchProducts
     * @returns {Promise<void>}
     */
    const fetchProducts = async () => {
      try {
        const productsResponse = await fetch(
          "https://fakestoreapi.com/products"
        );
        products.value = await productsResponse.json();
        loadStoredItems();
        filterProducts();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        loading.value = false;
      }
    };

    /**
     * Loads the stored cart, wishlist, and comparison items from localStorage.
     * @function loadStoredItems
     */
    const loadStoredItems = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const storedComparison =
        JSON.parse(localStorage.getItem("comparison")) || [];

      products.value.forEach((product) => {
        product.inCart = storedCart.some((item) => item.id === product.id);
        product.inWishlist = storedWishlist.some(
          (item) => item.id === product.id
        );
        product.inComparison = storedComparison.some(
          (item) => item.id === product.id
        );
      });
    };

    /**
     * Fetches the list of categories from the API.
     * @async
     * @function fetchCategories
     * @returns {Promise<void>}
     */
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        categories.value = await categoriesResponse.json();
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    /**
     * Filters the products based on the selected category, search query, and sort option.
     * @function filterProducts
     */
    const filterProducts = () => {
      filteredProducts.value = products.value
        .filter(
          (product) =>
            (!selectedCategory.value ||
              product.category === selectedCategory.value) &&
            (!searchQuery.value ||
              product.title
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase()))
        )
        .sort((a, b) => {
          if (sortOption.value === "low") {
            return a.price - b.price;
          } else if (sortOption.value === "high") {
            return b.price - a.price;
          } else {
            return 0;
          }
        });

      noItemsFound.value = filteredProducts.value.length === 0;
    };

    /**
     * Searches the products based on the search query.
     * @function searchProducts
     */
    const searchProducts = () => {
      filterProducts();
    };

    /**
     * Navigates to the product details page.
     * @function viewProduct
     * @param {number} productId - The ID of the product to view.
     */
    const viewProduct = (productId) => {
      router.push(`/product/${productId}`);
    };

    /**
     * Toggles the wishlist status of a product.
     * @function toggleWishlist
     * @param {Object} product - The product to toggle.
     */
    const toggleWishlist = (product) => {
      product.inWishlist = !product.inWishlist;
      updateLocalStorage("wishlist", product);
      showMessage(
        product.inWishlist ? "Added to wishlist" : "Removed from wishlist"
      );
    };

    /**
     * Toggles the cart status of a product.
     * @function toggleCart
     * @param {Object} product - The product to toggle.
     */
    const toggleCart = (product) => {
      product.inCart = !product.inCart;
      updateLocalStorage("cart", product);
      showMessage(product.inCart ? "Added to cart" : "Removed from cart");
    };

    /**
     * Toggles the comparison status of a product.
     * @function toggleComparison
     * @param {Object} product - The product to toggle.
     */
    const toggleComparison = (product) => {
      product.inComparison = !product.inComparison;
      updateLocalStorage("comparison", product);
      showMessage(
        product.inComparison ? "Added to comparison" : "Removed from comparison"
      );
    };

    /**
     * Updates the relevant localStorage array (cart, wishlist, or comparison) based on the product's status.
     * @function updateLocalStorage
     * @param {string} key - The key for the localStorage item (e.g., 'cart', 'wishlist', 'comparison').
     * @param {Object} product - The product to add or remove from localStorage.
     */
    const updateLocalStorage = (key, product) => {
      let storedItems = JSON.parse(localStorage.getItem(key)) || [];
      if (product[`in${capitalize(key)}`]) {
        storedItems.push(product);
      } else {
        storedItems = storedItems.filter((item) => item.id !== product.id);
      }
      localStorage.setItem(key, JSON.stringify(storedItems));
    };

    /**
     * Capitalizes the first letter of a string.
     * @function capitalize
     * @param {string} str - The string to capitalize.
     * @returns {string} - The capitalized string.
     */
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    /**
     * Shows a message and hides it after 1 second.
     * @function showMessage
     * @param {string} msg - The message to show.
     */
    const showMessage = (msg) => {
      message.value = msg;
      setTimeout(() => {
        message.value = "";
      }, 1000);
    };

    // Lifecycle hook to fetch products and categories on component mount.
    onMounted(() => {
      fetchProducts();
      fetchCategories();
    });

    return {
      products,
      filteredProducts,
      loading,
      categories,
      selectedCategory,
      searchQuery,
      sortOption,
      noItemsFound,
      filterProducts,
      searchProducts,
      viewProduct,
      toggleWishlist,
      toggleCart,
      toggleComparison,
      message,
    };
  },
};
</script>

<style scoped>
/* Your existing CSS */
</style>

<style scoped>
body {
  background-color: lightblue;
  margin: 0;
  font-family: Arial, sans-serif;
}

.container {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.form-group {
  display: flex;
  width: 100%;
  max-width: 31.25rem;
  position: relative;
}

.category-select,
.search-input,
.search-button,
.sort-select {
  padding: 0.625rem;
  font-size: 0.875rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
}

.category-select {
  flex-shrink: 0;
  z-index: 10;
  background-color: #f3f4f6;
  border-radius: 0.375rem 0 0 0.375rem;
}

.search-input {
  width: 100%;
  background-color: #f9fafb;
  border-left: 0;
  border-radius: 0.375rem 0 0 0.375rem;
}

.search-button {
  position: absolute;
  margin-right: 115px;
  top: 0;
  right: 0;
  height: 100%;
  width: 40px;
  background-color: #3b82f6;
  color: white;
  border-left: 0;
  border-radius: 0 0.375rem 0.375rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.search-button i {
  font-size: 1rem;
}

.sort-select {
  background-color: #f3f4f6;
  border-radius: 0.375rem;
}

i {
  font-size: 1rem;
}

.sort-group {
  display: flex;
  align-items: center;
}

.sort-label {
  margin-right: 0.5rem;
  font-weight: 600;
}

.products-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 -1rem;
}

.product-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  margin: 1rem;
  padding: 1rem;
  width: calc(25% - 2rem);
  box-sizing: border-box;
  text-align: center;
  transition: transform 0.2s ease-in-out;
}

.product-card:hover {
  transform: scale(1.05);
}

@media (max-width: 1200px) {
  .product-card {
    width: calc(33.33% - 2rem);
  }

  .search-button {
    margin-right: 0px;
  }
}

@media (max-width: 992px) {
  .product-card {
    width: calc(50% - 2rem);
  }

  .search-button {
    margin-right: 0px;
  }
}

@media (max-width: 768px) {
  .product-card {
    width: calc(50% - 2rem);
  }

  .search-button {
    margin-right: 120px;
  }
}

@media (max-width: 480px) {
  .product-card {
    width: calc(100% - 2rem);
  }

  .search-button {
    margin-right: 0px;
  }
}

.product-card img {
  max-width: 100%;
  height: 200px;
  border-radius: 8px;
}

.product-card .rating {
  margin-top: 0.5rem;
  display: flex;
  height: 20px;
  justify-content: center;
}

.rating svg.filled {
  fill: #fbc02d;
}

.rating svg.empty {
  fill: #e0e0e0;
}

.view-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.view-button:hover {
  background-color: #2563eb;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.action-buttons button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  transition: color 0.2s ease-in-out;
}

.wishlist-button i {
  color: grey;
}

.wishlist-button.active i {
  color: red;
}

.cart-button i {
  color: grey;
}

.cart-button.active i {
  color: blue;
}

.comparison-button i {
  color: grey;
}

.comparison-button.active i {
  color: blue;
}

.no-items-message {
  color: blue;
  text-align: center;
  margin-top: 2rem;
  font-size: 1.25rem;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: blue;
}

.message {
  text-align: center;
  background-color: #4caf50;
  color: white;
  padding: 0.5rem;
  border-radius: 0.25rem;
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  transition: opacity 0.5s ease-in-out;
}
</style>
