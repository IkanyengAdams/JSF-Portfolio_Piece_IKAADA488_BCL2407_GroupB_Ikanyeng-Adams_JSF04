<template>
  <div class="product-detail" v-if="!loading">
    <div class="image-container">
      <img :src="product.image" :alt="product.title" class="product-image" />
    </div>
    <div class="details-container">
      <h1 class="title">{{ product.title }}</h1>
      <p class="category">{{ product.category }}</p>
      <p class="price">{{ '$' + product.price }}</p>
      <p class="description">{{ product.description }}</p>
      <div class="rating">
        <div class="rating-stars">
          <svg v-for="i in 5" :key="i" :class="i <= Math.round(product.rating.rate) ? 'filled' : 'empty'" viewBox="0 0 24 24">
            <path d="M12 .587l3.668 7.571 8.332 1.151-6.063 5.852 1.428 8.287L12 18.897l-7.365 3.851 1.428-8.287-6.063-5.852 8.332-1.151z"/>
          </svg>
        </div>
        <p>{{ product.rating.count }} reviews</p>
      </div>
      <button @click="goBack" class="back-button">Back to Products</button>
    </div>
  </div>
  <div v-else class="loading">Loading...</div>
</template>

<script>
import { ref, onMounted, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'ProductDetail',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const product = ref({});
    const loading = ref(true);
    const { selectedCategory, searchQuery, sortOption } = inject('filters');

     /**
     * Fetches the product details from the API based on the route parameter.
     * @async
     * @function fetchProduct
     * @returns {Promise<void>}
     */

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${route.params.id}`);
        product.value = await response.json();
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        loading.value = false;
      }
    };

    /**
     * Navigates back to the main product list.
     * @function goBack
     */

    const goBack = () => {
      router.push('/');
    };

     // Lifecycle hook to fetch product details on component mount.
    onMounted(fetchProduct);

    return {
      product,
      loading,
      goBack,
      selectedCategory,
      searchQuery,
      sortOption,
    };
  },
};
</script>


<style scoped>
.product-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #f0f4f8;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow-y: hidden;
  max-width: 600px;
  margin: auto;
}

.title{
  font-size: 30px;
}

.image-container {
  text-align: center;
}

.product-image {
  max-width: 80%;
  height: auto;
  border-radius: 8px;
  width: 200px;
}

.details-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
}

.category {
  font-weight: bold;
  color: #555;
}

.price {
  font-size: 1.25rem;
  color: #3b82f6;
}

.description {
  font-size: 0.875rem;
  color: #333;
}

.rating {
height: 8rem;
width: 8rem;
}

.rating-stars {
  display: flex;
}

.rating-stars svg.filled {
  fill: #fbc02d;
}

.rating-stars svg.empty {
  fill: #e0e0e0;
}

.back-button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.back-button:hover {
  background-color: #2563eb;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: #258de1;
}
</style>
