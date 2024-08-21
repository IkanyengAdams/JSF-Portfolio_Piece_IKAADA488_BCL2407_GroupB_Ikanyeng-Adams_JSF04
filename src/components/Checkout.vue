<template>
  <div class="checkout-container">
    <h1>Checkout</h1>

    <div class="user-info">
      <h2>Your Information</h2>
      <form @submit.prevent="proceedToPayment">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="user.name" required />
        </div>
        <div class="form-group">
          <label for="address">Residential Address:</label>
          <input type="text" id="address" v-model="user.address" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="user.email" required />
        </div>
        <button type="submit" class="proceed-button">Proceed to Payment</button>
      </form>
    </div>

    <div class="payment-methods">
      <h2>Select Payment Method</h2>
      <div id="paypal-button-container"></div>
    </div>

    <button @click="goToCart" class="back-button">Back to Cart</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        address: '',
        email: ''
      }
    };
  },
  created() {
    this.autoFillUserInfo();
  },
  methods: {
    autoFillUserInfo() {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo) {
        this.user.name = userInfo.name || '';
        this.user.address = userInfo.address || '';
        this.user.email = userInfo.email || '';
      }
    },
    proceedToPayment() {
      localStorage.setItem('userInfo', JSON.stringify(this.user));
      this.$router.push('/checkout');
    },
    goToCart() {
      this.$router.push('/cart');
    }
  }
};
</script>

<style scoped>
.checkout-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

input {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ddd;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
}

.proceed-button {
  background-color: #10b981;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-top: 1rem;
}

.proceed-button:hover {
  background-color: #059669;
}

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.back-button {
  background-color: #f0f0f0;
  color: #333;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-top: 2rem;
}

.back-button:hover {
  background-color: #ddd;
}

@media (max-width: 768px) {
  .checkout-container {
    padding: 1.5rem;
    gap: 1.5rem;
  }

  .payment-methods {
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .checkout-container {
    padding: 1rem;
    gap: 1rem;
  }

  .payment-methods {
    gap: 0.5rem;
  }

  #paypal-button-container {
    width: 100%;
  }
}
</style>
