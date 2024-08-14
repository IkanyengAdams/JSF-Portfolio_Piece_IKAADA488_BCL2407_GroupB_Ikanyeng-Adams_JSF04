<template>
  <div>
    <h1>Cart Page</h1>
    <div v-if="cartItems.length === 0" class="empty-cart-message">Your cart is empty.</div>
    <div v-else class="cart-items">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.title" />
        <div>
          <h2>{{ item.title }}</h2>
          <p>{{ '$' + item.price }}</p>
          <div class="quantity-controls">
            <button @click="decreaseQuantity(item)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)">+</button>
          </div>
          <button @click="removeFromCart(item.id)">Remove</button>
        </div>
      </div>
    </div>
    <div class="cart-total">
      <h2>Total: {{ cartTotal }}</h2>
    </div>
    <button @click="goToProductList">Back to Product List</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: JSON.parse(localStorage.getItem('cart')) || [],
    };
  },
  computed: {
    cartTotal() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }
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
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
      this.updateCart();
    },
    updateCart() {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    },
    goToProductList() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.cart-items {
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

.cart-total {
  margin-top: 1rem;
  font-size: 1.25rem;
}

button {
  background: #325cda;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

button:hover {
  background: #2548a8;
}

.empty-cart-message {
  font-size: 1.25rem;
  color: #ff0000;
  margin-bottom: 1rem;
}
</style>
