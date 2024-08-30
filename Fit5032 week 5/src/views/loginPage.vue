<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  

  
  const username = ref('')
  const password = ref('')
  const errorMessage = ref('')
  
  const router = useRouter()
  
  const handleLogin = () => {
  
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
  

  const user = registeredUsers.find(user => user.username === username.value)

  if (user && user.password === password.value) {
    
    localStorage.setItem('isAuthenticated', 'true')
    

    router.push('/about')
  } else {

    errorMessage.value = 'Invalid username or password'
  }
}
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 100px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  