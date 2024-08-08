<template>
  <div class="login-container">
    <h1>Login Page</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>
    <button @click="goToProductList" class="back-button">Back to Product List</button>
  </div>

</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      console.log('Login button clicked');

    },
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
