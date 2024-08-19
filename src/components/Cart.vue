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
            <p>{{ '$' + item.price }}</p>
            <div class="quantity-controls">
              <button @click="decreaseQuantity(item)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)">+</button>
            </div>
            <button class="remove-button" @click="removeFromCart(item.id)">Remove</button>
          </div>
        </div>
      </div>
      <div class="order-summary">
        <h2>Order Summary</h2>
        <div class="summary-detail" v-if="cartItems.length > 0">
          <span>Total</span>
          <span>{{ '$' + cartTotal }}</span>
        </div>
        <button
          class="checkout-button"
          v-if="cartItems.length > 0"
          @click="proceedToCheckout"
        >
          Proceed to Checkout
        </button>
        <button class="clear-cart-button" v-if="cartItems.length > 0" @click="clearCart">
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
      cartItems: JSON.parse(localStorage.getItem("cart")) || [],
    };
  },
  computed: {
    cartTotal() {
      const total = this.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return total.toFixed(2);
    },
  },
  methods: {
    increaseQuantity(item) {
      item.quantity++;
      this.updateCart();
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.updateCart();
      }
    },
    removeFromCart(itemId) {
      this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
      this.updateCart();
    },
    clearCart() {
      this.cartItems = [];
      this.updateCart();
    },
    updateCart() {
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },
    proceedToCheckout() {
      this.$router.push('/checkout');
    },
    goToProductList() {
      this.$router.push("/");
    },
  },
  mounted() {
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
  align-items: center;
  gap: 1rem;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 0.5rem;
}

.cart-item img {
  width: 100px;
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
</style>
