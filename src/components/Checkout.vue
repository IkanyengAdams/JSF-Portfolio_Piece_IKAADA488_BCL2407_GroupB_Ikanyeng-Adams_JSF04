
<template>
  <div class="checkout-container">
    <h1>Checkout</h1>
    <div class="payment-methods">
      <h2>Select Payment Method</h2>
      <div id="paypal-button-container"></div>
    </div>
  </div>
</template>

<script>

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
</style>
