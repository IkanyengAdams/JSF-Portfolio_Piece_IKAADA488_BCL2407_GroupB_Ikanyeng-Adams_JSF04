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
  },
  watch: {
    comparisonItems: {
      handler(newItems) {
        if (newItems.length > 4) {
          this.comparisonItems = newItems.slice(0, 4);
          localStorage.setItem('comparison', JSON.stringify(this.comparisonItems));
        }
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
button {
  background-color: #4c61af;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin-bottom: 20px;
}

button:hover {
  background-color: #3b4e90;
}

.comparison-table {
  overflow-x: auto;
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  background-color: white;
}

.comparison-image {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
}
</style>
