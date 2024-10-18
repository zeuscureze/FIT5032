<template>
    <div style="text-align: center; margin-top: 50px;">
      <h1>Add Book </h1>
      
      <form @submit.prevent="addBook">
        <div>
          <label for="isbn">ISBN:</label>
          <input type="number" v-model="isbn" id="isbn" required />
        </div>
        <div>
          <label for="name">Name:</label>
          <input type="text" v-model="name" id="name" required />
          
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
    
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { db } from '../FBCONfit.js';  
  import { collection, addDoc } from 'firebase/firestore';  
  
  
  const isbn = ref('');
  const name = ref('');
  

  const addBook = async () => {
    try {
      const isbnNumber = Number(isbn.value);
      if (isNaN(isbnNumber)) {
        alert('ISBN must be a valid number');
        return;
      }
  
      
      await addDoc(collection(db, 'books'), {
        isbn: isbnNumber,
        name: name.value
      });
  
    
      isbn.value = '';
      name.value = '';
      alert('Book added successfully!');
    } catch (error) {
      console.error('Error adding book: ', error);
    }
  };
  </script>
  
  <style scoped>

  form {
    max-width: 400px;
    margin: auto;
    display: flex;
    flex-direction: column;
  }
  
  input {
    margin-bottom: 1rem;
  }
  
  button {
    padding: 0.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  