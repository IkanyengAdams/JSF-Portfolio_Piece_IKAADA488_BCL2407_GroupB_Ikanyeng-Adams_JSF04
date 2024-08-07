<template>
  <div>
    <h1>Cart page</h1>
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
button{
  background: #325cda;
}
</style>
