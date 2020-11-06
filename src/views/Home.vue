<template>
  <div class="home">
    <h1>Welcome Home breda...</h1>
    <router-link tag="a" :to="{ name: 'add' }">Add Book</router-link>
    <br><br>
    <label for="search">Search Book : </label>
    <input type="text" name="search" id="searchText" v-model="searchText" @keyup="getDataByName()">
    <br>
    <h3>Book Best Seller :</h3>
    <div v-for="book in books" :key="book.id">
      Title : <b>{{ book.name }}</b><br>
      Author : <b>{{ book.author }}</b><br>
      Price : <b>{{ book.price }}</b><br>
      <router-link tag="a" :to="{ path: '/edit/' + book.id }">Edit</router-link>
      <span> - </span>
      <a href="#" @click="deleteBook(book.id)">Delete</a>
      <br><br>
    </div>
  </div>
</template>

<script>
import BookService2 from '../services/BookService2.js'

const bookService2 = BookService2.build()

export default {
  name: 'home',
  data() {
    return {
      searchText: '',
      books: []
    }
  },
  methods: {
    getData: async function() {
      const response = await bookService2.getAllData(0, 10, 'id')
      this.books = []
      for (var i = 0; i < response.data.content.length; i++) {
        this.books.push(response.data.content[i])
      }
    },

    getDataByName: async function() {
      const response = await bookService2.getAllByName(this.searchText, 'id')
      this.books = []
      for (var i = 0; i < response.data.content.length; i++) {
        this.books.push(response.data.content[i])
      }
    },

    getDataById: async function() {
      const response = await bookService2.getDataById(25)
      this.books.push(response.data)
    },

    deleteBook: async function(id) {
      const response = await bookService2.deleteBook(id)
      alert(response.message)
    },
  },
  beforeMount() {
    this.getData()
    // this.getDataById()
  }
}
</script>
