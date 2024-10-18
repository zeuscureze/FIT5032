<script setup>
import { ref } from 'vue'
import BHeader from './components/BHeader.vue'
import { useRouter } from 'vue-router'

const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')
const router = useRouter()

const logout = () => {
  localStorage.removeItem('isAuthenticated')
  isAuthenticated.value = false
  router.push('/')
}
</script>

<template>
  <div class="main-container">
    <header>
      <nav>
        
        <router-link v-if="isAuthenticated" to="/about">About</router-link>
        <button v-if="isAuthenticated" @click="logout">Logout</button>
        
        
        
      </nav>
    <BHeader />
  </header>

  <main class="main-box">
    <!--<LibraryRegis2trationForm /> -->
    <!-- <JSONLab /> -->
    <Router-View />
  </main>
  </div>
  
</template>

<style >
nav {
  display: flex;
  gap: 10px;
}
.about-container {
    display: flex;
    justify-content: center; 
    align-items: center;     
    height: 30vh;           
  }
  .about-content {
    text-align: center;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    font-size: 2rem;
    color: #333;
  }
  
  p {
    font-size: 1.2rem;
    color: #666;
  }

.friendMessageClass {
  color: green;
}

.mt-2 {
  margin-top: 0.5rem;
}

.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}

.form {
  text-align: center;
  margin-top: 50px;
}

#username:focus,
#password:focus,
#isAustralian:focus,
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

.list-group-item {
  padding: 10px;
}
</style>
