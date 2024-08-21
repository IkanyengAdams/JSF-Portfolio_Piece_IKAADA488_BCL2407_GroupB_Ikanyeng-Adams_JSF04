<template>
  <div class="cart-container">
    <h1>Shopping Cart</h1>
    <div v-if="cartItems.length === 0" class="empty-cart-message">
      Your cart is empty.
    </div>
    <div class="cart-content">
      <div v-if="cartItems.length > 0" class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.title" />
          <div class="item-details">
            <h2>{{ item.title }}</h2>
            <p>{{ "$" + item.price }}</p>
            <div class="quantity-controls">
              <button @click="decreaseQuantity(item)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)">+</button>
            </div>
            <button class="remove-button" @click="removeFromCart(item.id)">
              Remove
            </button>
          </div>
        </div>
      </div>
      <div class="order-summary">
        <h2>Order Summary</h2>
        <div class="summary-detail" v-if="cartItems.length > 0">
          <span>Total</span>
          <span>{{ "$" + cartTotal }}</span>
        </div>
        <button
          class="checkout-button"
          v-if="cartItems.length > 0"
          @click="proceedToCheckout"
        >
          Proceed to Checkout
        </button>
        <button
          class="clear-cart-button"
          v-if="cartItems.length > 0"
          @click="clearCart"
        >
          Clear Cart
        </button>
        <button class="back-button" @click="goToProductList">
          Back to Product List
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

      /**
       * The array of items currently in the cart.
       * @type {Array<Object>}
       * @property {number} id - Unique identifier for the cart item.
       * @property {string} title - Title of the cart item.
       * @property {string} image - URL of the cart item's image.
       * @property {number} price - Price of the cart item.
       * @property {number} quantity - Quantity of the cart item.
       */
      cartItems: JSON.parse(localStorage.getItem("cart")) || [],
    };
  },
  computed: {
     /**
     * Computes the total price of all items in the cart.
     * @returns {string} - Total price formatted to 2 decimal places.
     */
    cartTotal() {
      const total = this.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return total.toFixed(2);
    },
  },
  methods: {
    /**
     * Increases the quantity of a specified cart item.
     * @param {Object} item - The cart item to update.
     */
    increaseQuantity(item) {
      item.quantity++;
      this.updateCart();
    },
    /**
     * Decreases the quantity of a specified cart item, ensuring it doesn't go below 1.
     * @param {Object} item - The cart item to update.
     */
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.updateCart();
      }
    },
    /**
     * Removes a specified cart item from the cart.
     * @param {number} itemId - The ID of the item to remove.
     */
    removeFromCart(itemId) {
      this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
      this.updateCart();
    },
     /**
     * Clears all items from the cart.
     */
    clearCart() {
      this.cartItems = [];
      this.updateCart();
    },
     /**
     * Updates the cart data in local storage.
     */
    updateCart() {
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },
     /**
     * Redirects the user to the checkout page.
     */
    proceedToCheckout() {
      this.$router.push("/checkout");
    },
    /**
     * Redirects the user to the product list page.
     */
    goToProductList() {
      this.$router.push("/");
    },
  },
  mounted() {
    /**
     * Ensures all items in the cart have a quantity set to 1 if not already set.
     */
    this.cartItems.forEach((item) => {
      if (!item.quantity) {
        item.quantity = 1;
      }
    });
  },
};
</script>

<style scoped>
.cart-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.cart-content {
  display: flex;
  flex-direction: row;
  gap: 2rem;
}

.cart-items {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 0.5rem;
}

.cart-item img {
  width: 100%;
  max-width: 150px;
  height: auto;
  border-radius: 0.5rem;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
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

.order-summary {
  flex: 1;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  align-self: flex-start;
}

.summary-detail {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.summary-total {
  font-weight: bold;
  font-size: 1.25rem;
}

.checkout-button,
.clear-cart-button,
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

.checkout-button:hover,
.clear-cart-button:hover,
.back-button:hover {
  background: #2548a8;
}

.empty-cart-message {
  font-size: 1.25rem;
  color: #ff0000;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .cart-content {
    flex-direction: column;
  }

  .order-summary {
    align-self: center;
  }
}

@media (max-width: 480px) {
  .cart-item {
    flex-direction: column;
    text-align: center;
  }

  .quantity-controls {
    flex-direction: column;
  }

  .cart-item img {
    max-width: 100%;
  }
}
</style>
