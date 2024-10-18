<template>
  <div id="app">
    <h1>All Books in JSON Format</h1>
    <pre v-if="books">{{ books }}</pre>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      books: null,
      error: null,
    };
  },
  async mounted() {
    try {
      const response = await axios.get('https://us-central1-week7-716f9.cloudfunctions.net/getAllBooks');
      this.books = response.data;
    } catch (error) {
      this.error = 'Error fetching books data.';
    }
  },
};
</script>



  
  