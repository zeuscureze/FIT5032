<template>
  <div class="login-container">
    <h1>Login</h1>
    <input v-model="email" type="email" placeholder="Email" class="form-control mb-3" />
    <input v-model="password" type="password" placeholder="Password" class="form-control mb-3" />
    <button @click="login" class="btn btn-primary">Login</button>
    <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../FBCONfit.js';  // 引入 Firestore 实例

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const auth = getAuth();

const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log('Login successful!');
    const user = userCredential.user;

    
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      console.log("User role: ", userData.role);

      //redirect the page if role is admin then go ABout
      if (userData.role === 'admin') {
        router.push('/About');
      } else {
        router.push('/home');
      }
    } else {
      console.log("No user data found in Firestore!");
    }
  } catch (error) {
    console.log(error.message);
    errorMessage.value = 'Login failed: ' + error.message;
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  text-align: center;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.text-danger {
  color: red;
}
</style>
