<template>
  <div>
    <h1>Comparison page</h1>
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
  background-color: #4c61af;
}
</style>