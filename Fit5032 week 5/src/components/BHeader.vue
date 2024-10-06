<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';

const isAuthenticated = ref(false); 
const auth = getAuth();
const router = useRouter();


onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuthenticated.value = true;  
    } else {
      isAuthenticated.value = false; 
    }
  });
});


const logout = () => {
  auth.signOut().then(() => {
    isAuthenticated.value = false;  
    router.push('/');  
  }).catch((error) => {
    console.error("Error signing out: ", error);
  });
};
</script>

<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/Home" class="nav-link" active-class="active" aria-current="page">
            Sign Up (Week 5)
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">
            About
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/fire-register" class="nav-link" active-class="active">
            Firesignin
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">
            Firelogin
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/booklist" class="nav-link" active-class="active">booklist</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/GetBookCountView" class="nav-link" active-class="active">GetBookCountView</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/WeatherCheck" class="nav-link" active-class="active">Get Weather</router-link>
        </li>
        

 
        <li class="nav-item" v-if="isAuthenticated">
          <button class="nav-link" @click="logout">Logout</button>
        </li>
      </ul>
    </header>
  </div>
</template>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
              inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>

