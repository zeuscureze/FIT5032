<template>
    <div class="home-container">
      <h1>Welcome to the Home Page</h1>
      <p>You have successfully logged in!</p>
      <div class="actions">
        <Button label="Go to Profile" @click="goToProfile" />
        <Button label="Logout" class="p-button-danger" @click="logout" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import Button from 'primevue/button';
  
  const router = useRouter();
  
  const goToProfile = () => {
    router.push({ name: 'profile' });
  };
  
  const logout = () => {

    router.push({ name: 'login' });
  };
  </script>
  
  <style scoped>
  .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  
  .actions {
    margin-top: 20px;
  }
  
  .actions Button {
    margin: 10px;
  }
  </style>
  