<template>
  <div>
    <h1>Comparison page</h1>
    <button @click="goToProductList">Back to Product List</button>
    <div v-if="comparisonItems.length > 0" class="comparison-table">
      <table>
        <thead>
          <tr>
            <th v-for="(item, index) in comparisonItems" :key="index">{{ item.title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="(item, index) in comparisonItems" :key="index">
              <img :src="item.image" :alt="item.title" class="comparison-image" />
            </td>
          </tr>
          <tr>
            <td v-for="(item, index) in comparisonItems" :key="index">{{ item.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No items to compare</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comparisonItems: JSON.parse(localStorage.getItem('comparison')) || []
    };
  },
  methods: {
    goToProductList() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
button {
  background-color: #4c61af;
}
</style>