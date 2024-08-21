<template>
  <div>
    <h1>Comparison Page</h1>
    <div class="max-products-message">Maximum products: 4</div>
    <div v-if="comparisonItems.length > 0">
      <table class="comparison-table">
        
        <tbody>
          <tr>
            <td class="label">Title</td>
            <td v-for="item in limitedComparisonItems" :key="item.id">
              <div class="product-title">{{ item.title }}</div>
            </td>
          </tr>
          <tr>
            <td class="label">Image</td>
            <td v-for="item in limitedComparisonItems" :key="item.id">
              <img :src="item.image" :alt="item.title" class="product-image" />
            </td>
          </tr>
          <tr>
            <td class="label">Description</td>
            <td v-for="item in limitedComparisonItems" :key="item.id">
              <div class="product-description">{{ item.description }}</div>
            </td>
          </tr>
          <tr>
            <td class="label">Price</td>
            <td v-for="item in limitedComparisonItems" :key="item.id">
              <div class="product-price">{{ '$' + item.price }}</div>
            </td>
          </tr>
          <tr>
            <td class="label">Rating</td>
            <td v-for="item in limitedComparisonItems" :key="item.id">
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
    <div v-else class="no-items-message">No items to compare</div>
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
  computed: {
    limitedComparisonItems() {
      return this.comparisonItems.slice(0, 4);
    }
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

.comparison-table td.label {
  text-align: left;
  font-weight: bold;
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

.max-products-message {
  text-align: center;
  margin-top: 1rem;
  font-size: 1rem;
  color: #888;
}


@media (max-width: 768px) {
  .comparison-table th, .comparison-table td {
    padding: 0.25rem;
  }

  .product-image {
    max-width: 80px;
  }

  .rating svg {
    width: 1.4rem;
    height: 1.4rem;
  }

  .review-count {
    font-size: 0.7rem;
  }

  .action-button {
    padding: 0.4rem 0.8rem;
    font-size: 0.875rem;
  }

  .button-container {
    margin-top: 0.75rem;
  }
}

@media (max-width: 480px) {
  .comparison-table th, .comparison-table td {
    padding: 0.5rem 0.25rem;
  }

  .product-image {
    max-width: 60px;
  }

  .rating svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  .review-count {
    font-size: 0.6rem;
  }

  .action-button {
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
  }

  .no-items-message, .max-products-message {
    font-size: 1rem;
  }
}
</style>
