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
        <div class="password-wrapper">
          <input
            :type="passwordFieldType"
            v-model="password"
            id="password"
            required
          />
          <font-awesome-icon
            :icon="passwordVisible ? 'eye' : 'eye-slash'"
            @click="togglePasswordVisibility"
            class="toggle-password"
          />
        </div>
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>
    <button @click="goToProductList" class="back-button">Back to Product List</button>
  </div>
</template>

<script>
import axiosAuth from '../axiosAuth';

export default {
  data() {
    return {
      username: 'mor_2314',
      password: '83r5^_',  
      passwordVisible: false, 
    };
  },
  computed: {
    passwordFieldType() {
      return this.passwordVisible ? 'text' : 'password';
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    async login() {
      try {
        const response = await axiosAuth.post('auth/login', {
          username: this.username,
          password: this.password,
        });
        const token = response.data.token;
        localStorage.setItem('token', token); 
        alert('Login successful!');
        this.$router.push('/');
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      }
    },
    goToProductList() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 10px 50px;
  border-radius: 20px;
}

h1 {
  margin-bottom: 20px;
  font-size: 2em;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 20px 30px; 
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
}

.password-wrapper {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #325cda;
}

.login-button, .back-button {
  background: #325cda;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.login-button:hover, .back-button:hover {
  background: #274bb5;
}

.back-button {
  background: #aaa;
}

.back-button:hover {
  background: #888;
}
</style>
