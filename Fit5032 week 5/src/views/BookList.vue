<template>
    <div >
      <h1>Books with ISBN > 1000</h1>
      <ul>
        <li v-for="book in books" :key="book.id">
          {{ book.name }} - ISBN: {{ book.isbn }}
          <!-- 添加更新和删除按钮 -->
          <button @click="updateBook(book.id)">Update</button>
          <button @click="deleteBook(book.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { db } from '../FBCONfit.js';

  import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
  
  const books = ref([]);
  
  // 查询书籍数据
  const fetchBooks = async () => {
    try {
      const q = query(collection(db, 'books'), where('isbn', '>', 1000));
      const querySnapshot = await getDocs(q);
      const booksArray = [];
      querySnapshot.forEach((doc) => {
        booksArray.push({ id: doc.id, ...doc.data() });
      });
      books.value = booksArray;
    } catch (error) {
      console.error('Error fetching books: ', error);
    }
  };
  
  // 更新书籍信息
  const updateBook = async (id) => {
    try {
      const newName = prompt('Enter new book name:');
      if (newName) {
        const bookDoc = doc(db, 'books', id);
        await updateDoc(bookDoc, { name: newName });
        alert('Book updated successfully!');
        fetchBooks();  // 更新后重新获取数据
      }
    } catch (error) {
      console.error('Error updating book: ', error);
    }
  };
  
  // 删除书籍
  const deleteBook = async (id) => {
    try {
      const confirmDelete = confirm('Are you sure you want to delete this book?');
      if (confirmDelete) {
        const bookDoc = doc(db, 'books', id);
        await deleteDoc(bookDoc);
        alert('Book deleted successfully!');
        fetchBooks();  // 删除后重新获取数据
      }
    } catch (error) {
      console.error('Error deleting book: ', error);
    }
  };
  
  onMounted(() => {
    fetchBooks();
  });
  </script>
  
  <style scoped>
  /* 这里可以根据需要自定义样式 */
  button {
    margin-left: 10px;
    padding: 5px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  li {
    margin-bottom: 10px;
  }
  </style>
  