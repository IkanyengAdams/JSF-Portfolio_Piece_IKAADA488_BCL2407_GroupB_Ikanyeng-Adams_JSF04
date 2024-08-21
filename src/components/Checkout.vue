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
      this.$router.push('/Checkout');
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

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
