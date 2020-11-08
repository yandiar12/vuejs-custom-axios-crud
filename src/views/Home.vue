<template>
  <div class="home">
    <b-alert show><h1>Welcome Home breda...</h1></b-alert>
    
    <b-row>
      <b-col md="3" style="padding-bottom: 15px;">
        <b-button variant="outline-primary" :to="{ name: 'add' }">
          <i class="fa fa-plus">&nbsp;</i>
          Add Book
        </b-button>
      </b-col>
    </b-row>
    
    <b-row>
      <b-col>
        <h3>Book Best Seller</h3>
      </b-col>
      <b-col>
        <b-form class="pull-right" inline>
          <label class="mr-sm-2" for="search">Search Book</label>
          <b-form-input type="text" name="search" id="searchText" v-model="searchText" @keyup="getDataByName()" placeholder="Title of Book"/>
        </b-form>
      </b-col>
    </b-row>

    <b-table striped hover outlined :per-page="perPage" :items="books" :current-page="currentPage" :fields="cols">
      <template v-slot:cell(actions)="book">
        <b-row>
          <b-col cols="sm-2">
            <b-button size="sm" variant="outline-success" :to="{ path: '/edit/' + book.item.id }">
              <i class="fa fa-pencil"></i>
            </b-button>
          </b-col>
          <b-col cols="sm-2">
            <b-button size="sm" variant="outline-danger" @click="deleteBook(book.item.id)">
              <i class="fa fa-trash"></i>
            </b-button>
          </b-col>
        </b-row>
      </template>
    </b-table>
    <b-pagination align="center" v-model="currentPage" :total-rows="totalCount" :per-page="perPage" aria-controls="my-table"></b-pagination>

    <!-- <div v-for="book in books" :key="book.id">
      Title : <b>{{ book.name }}</b><br>
      Author : <b>{{ book.author }}</b><br>
      Price : <b>{{ book.price }}</b><br>
      <router-link tag="a" :to="{ path: '/edit/' + book.id }">Edit</router-link>
      <span> - </span>
      <a href="#" @click="deleteBook(book.id)">Delete</a>
      <br><br>
    </div> -->
  </div>
</template>

<script>
import BookService2 from '../services/BookService2.js'

const bookService2 = BookService2.build()

export default {
  name: 'home',
  data() {
    return {
      //cols: ['id', 'name', 'author', 'publisher', 'price', 'actions'],
      cols: [
        {key: 'id', sortable: true},
        {key: 'name', sortable: true},
        {key: 'author', sortable: true},
        {key: 'publisher', sortable: true},
        {key: 'price', sortable: true},
        {key: 'actions', sortable: false}
      ],
      searchText: '',
      currentPage: 1,
      perPage: 10,
      totalCount: 0,
      books: []
    }
  },
  methods: {
    getData: async function() {
      const response = await bookService2.getAllData(0, 100, 'id')
      this.books = []
      if (response !== undefined) {
        this.currentPage = response.data.number + 1
        this.perPage = 10//response.data.size
        this.totalCount = response.data.totalElements
        for (var i = 0; i < response.data.content.length; i++) {
          this.books.push(response.data.content[i])
        }
      } else {
        alert('Failed to fetch data')
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
    }
  },
  beforeMount() {
    this.getData()
    // this.getDataById()
  }
}
</script>
