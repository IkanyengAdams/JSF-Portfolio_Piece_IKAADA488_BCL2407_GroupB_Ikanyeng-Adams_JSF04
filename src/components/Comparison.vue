<template>
  <div>
    <h1>Comparison Page</h1>
    <button @click="goToProductList" class="action-button">Back to Product List</button>
    <button @click="clearComparisonList" class="action-button">Clear Comparison List</button>
    <div v-if="comparisonItems.length > 0">
      <table class="comparison-table">
        <thead>
          <tr>
            <th v-for="item in comparisonItems" :key="item.id">{{ item.title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="item in comparisonItems" :key="item.id">
              <img :src="item.image" :alt="item.title" class="product-image" />
            </td>
          </tr>
          <tr>
            <td v-for="item in comparisonItems" :key="item.id">{{ item.description }}</td>
          </tr>
          <tr>
            <td v-for="item in comparisonItems" :key="item.id">{{ '$' + item.price }}</td>
          </tr>
          <tr>
            <td v-for="item in comparisonItems" :key="item.id">
              <div class="rating">
                <svg v-for="i in 5" :key="i" :class="i <= Math.round(item.rating.rate) ? 'filled' : 'empty'" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.571 8.332 1.151-6.063 5.852 1.428 8.287L12 18.897l-7.365 3.851 1.428-8.287-6.063-5.852 8.332-1.151z"/>
                </svg>
              </div>
            </td>
          </tr>
          <tr>
            <td v-for="item in comparisonItems" :key="item.id">
              <button @click="removeFromComparison(item)" class="remove-button">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="no-items-message">No items to compare</div>
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
    
      localStorage.setItem('comparison', JSON.stringify(this.comparisonItems));
    }
  }
};
</script>

<style scoped>
.comparison-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
}

.comparison-table th, .comparison-table td {
  padding: 0.5rem;
  border: 1px solid #ddd;
  text-align: center;
}

.comparison-table th {
  background-color: #f4f4f4;
}

.product-image {
  max-width: 100px;
 
}
</style>
