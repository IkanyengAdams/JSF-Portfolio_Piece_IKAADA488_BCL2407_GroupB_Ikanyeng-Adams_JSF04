<template>
  <div>
    <h1>Comparison Page</h1>

    <div v-if="comparisonItems.length >= 4" class="max-products-notice">
      You can compare up to 4 products.
    </div>

    <div v-if="comparisonItems.length > 0 && comparisonItems.length <= 4">
      <table class="comparison-table">
        <thead>
          <tr>
            <th v-for="item in comparisonItems" :key="item.id">
              <div class="product-title">{{ item.title }}</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="item in comparisonItems" :key="item.id">
              <img :src="item.image" :alt="item.title" class="product-image" />
            </td>
          </tr>
          <tr>
            <td v-for="item in comparisonItems" :key="item.id">
              <div class="product-description">{{ item.description }}</div>
            </td>
          </tr>
          <tr>
            <td v-for="item in comparisonItems" :key="item.id">
              <div class="product-price">{{ '$' + item.price }}</div>
            </td>
          </tr>
          <tr>
            <td v-for="item in comparisonItems" :key="item.id">
              <div class="rating">
                <div class="stars">
                  <svg v-for="i in 5" :key="i" :class="i <= Math.round(item.rating.rate) ? 'filled' : 'empty'" viewBox="0 0 24 24">
                    <path d="M12 .587l3.668 7.571 8.332 1.151-6.063 5.852 1.428 8.287L12 18.897l-7.365 3.851 1.428-8.287-6.063-5.852 8.332-1.151z"/>
                  </svg>
                </div>
                <span class="review-count">{{ item.rating.count }} reviews</span>
                <button @click="removeFromComparison(item.id)" class="remove-button">Remove</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="button-container">
        <button @click="clearComparisonList" class="action-button">Clear Comparison List</button>
      </div>
    </div>
    <div v-else class="no-items-message">
      No items to compare
    </div>
    <div class="button-container">
      <button @click="goToProductList" class="action-button">Back to Product List</button>
    </div>
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
    },
    clearComparisonList() {
      localStorage.removeItem('comparison');
      this.comparisonItems = [];
    },
    removeFromComparison(itemId) {
      this.comparisonItems = this.comparisonItems.filter(item => item.id !== itemId);
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

.product-title {
  font-weight: bold;
}

.product-description, .product-price {
  text-align: center;
}

.product-image {
  max-width: 100px;
  height: auto;
}

.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stars {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.rating svg {
  width: 1.6rem;
  height: 1.6rem;
  margin: 0 0.1rem;
}

.rating svg.filled {
  fill: #fbc02d;
}

.rating svg.empty {
  fill: #e0e0e0;
}

.review-count {
  font-size: 0.8rem;
  color: #555;
}

.remove-button {
  background: #ff0000;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 0.5rem;
}

.remove-button:hover {
  background: #cc0000;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

.action-button {
  background-color: #4c61af;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  margin: 0.5rem;
}

.action-button:hover {
  background-color: #2b4a9b;
}

.no-items-message {
  color: blue;
  text-align: center;
  margin-top: 2rem;
  font-size: 1.25rem;
}

.max-products-notice {
  color: #ff8c00;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1rem;
}
</style>
