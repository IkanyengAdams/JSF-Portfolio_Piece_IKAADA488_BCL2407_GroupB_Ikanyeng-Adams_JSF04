<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import { ref, provide } from 'vue';
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  setup() {
    const selectedCategory = ref('');
    const searchQuery = ref('');
    const sortOption = ref('default');

    provide('filters', {
      selectedCategory,
      searchQuery,
      sortOption,
    });

    return {};
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
