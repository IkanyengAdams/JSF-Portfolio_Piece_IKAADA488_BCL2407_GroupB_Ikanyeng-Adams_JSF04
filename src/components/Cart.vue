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

  methods: {
    
    goToProductList() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>


button {
  background: #325cda;
 
}
</style>
