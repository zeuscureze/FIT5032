<template>
    <div style="text-align: center; margin-top: 50px;">
      <h1>Create an Account</h1>
      <p>
        <input type="text" placeholder="Email" v-model="email" />
      </p>
      <p>
        <input type="password" placeholder="Password" v-model="password" />
      </p>
      <p>
        <button @click="register">Register</button>
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  import { doc, setDoc } from "firebase/firestore"; // Firestore 导入
  import { db } from "../FBCONfit.js"; // Firestore 实例
  
  const email = ref("");
  const password = ref("");
  const router = useRouter();
  const auth = getAuth();
  
  const register = () => {
    if (!email.value || !password.value) {
      console.log("Email and password cannot be empty.");
      return;
    }
  
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log("Registration successful!");
  
        // 将用户信息保存到 Firestore 的 `users` 集合中
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          role: "user", // 默认角色为 'user'
        });
  
        // 跳转到登录页面
        router.push("/");
      })
      .catch((error) => {
        console.error("Error during registration:", error.message);
      });
  };
  </script>
  
  