<template>
  <div>
    <router-link tag="a" :to="{ name: 'home' }">back to Home</router-link>
    <h1 v-if="id !== undefined">Edit Book</h1>
    <h1 v-else>Add Book</h1>
    <form action="">
      <input type="hidden" id="id">
      <label for="name">Title :</label><br>
      <input type="text" id="name" v-model="form.name"><br>
      <label for="author">Author :</label><br>
      <input type="text" id="author" v-model="form.author"><br>
      <label for="publisher">Publisher :</label><br>
      <input type="text" id="publisher" v-model="form.publisher"><br>
      <label for="price">Price :</label><br>
      <input type="number" id="price" v-model="form.price"><br><br>
      <input type="button" value="submit" @click="submit($event)"><br>
    </form>
  </div>
</template>

<script>
import BookService2 from '../services/BookService2.js'

const bookService = BookService2.build()

export default {
  name: 'formBook',
  data() {
    return {
      id: this.$route.params.id,
      form: {
        id: '',
        name: '',
        author: '',
        publisher: '',
        price: ''
      }
    }
  },

  methods: {
    submit: async function(e) {
      e.preventDefault()

      const data = {
        name: this.form.name,
        author: this.form.author,
        publisher: this.form.publisher,
        price: this.form.price
      }

      var response = null;
      if (this.id === undefined) {
        response = await bookService.addBook(data)
      } else {
        response = await bookService.editBook(this.id, data)
      }
      
      alert(response.message)
    },

    getDataById: async function() {
      const response = await bookService.getDataById(this.id)
      this.form.id = response.data.id
      this.form.name = response.data.name
      this.form.author = response.data.author
      this.form.publisher = response.data.publisher
      this.form.price = response.data.price
    }
  },
  beforeMount() {
    if (this.id !== undefined) {
      console.log('get ID')
      this.getDataById()
    }
  },
}
</script>

<style>

</style>