<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="sm-6 md-4">
        <b-card class="sm-6 md-4" header="Form Book">
          <h1>{{ title }}</h1>
          
          <b-form action="">
            <input type="hidden" id="id">
            <b-form-group label-for="name" label="Title:">
              <b-form-input type="text" id="name" name="name" v-validate="'required'" v-model="form.name" :class="{ 'is-invalid': errors.has('name')}" />
              <b-form-invalid-feedback class="invalid-feedback" v-if="errors.has('name')">{{ errors.first('name') }}</b-form-invalid-feedback>
            </b-form-group>  
            
            <b-form-group label-for="author" label="Author:">
              <b-form-input type="text" id="author" name="author" v-validate="'required'" v-model="form.author" :class="{ 'is-invalid': errors.has('author')}" />
              <b-form-invalid-feedback class="invalid-feedback" v-if="errors.has('author')">{{ errors.first('author') }}</b-form-invalid-feedback>
            </b-form-group>
            
            <b-form-group label-for="publisher" label="Publisher:">
              <b-form-input type="text" id="publisher" name="publisher" v-validate="'required'" v-model="form.publisher" :class="{ 'is-invalid': errors.has('publisher')}" />
              <b-form-invalid-feedback class="invalid-feedback" v-if="errors.has('publisher')">{{ errors.first('publisher') }}</b-form-invalid-feedback>
            </b-form-group>  
            
            <b-form-group label-for="price" label="Price:">
              <b-form-input type="number" id="price" name="price" v-validate="'required'" v-model="form.price" :class="{ 'is-invalid': errors.has('price')}" />
              <b-form-invalid-feedback class="invalid-feedback" v-if="errors.has('price')">{{ errors.first('price') }}</b-form-invalid-feedback>
            </b-form-group>  
            
            <b-row>
              <b-col>
                <b-button type="submit" variant="primary" @click="submit($event)">Submit</b-button>
              </b-col>
              <b-col class="text-right">
                <router-link tag="a" :to="{ name: 'home' }">back to Home</router-link>
              </b-col>
            </b-row>
            
          </b-form>
        </b-card>  
      </b-col>
    </b-row>
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
      title: '',
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
    submit(e) {
      e.preventDefault();
      
      this.$validator.validate().then(valid => {
          if (valid) {
              this.save()
          } else {
            alert('Data is invalid')
          }
      });
    },

    save: async function() {
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
      this.$router.push('/')
    },

    getDataById: async function() {
      const response = await bookService.getDataById(this.id)
      this.form.id = response.data.id
      this.form.name = response.data.name
      this.form.author = response.data.author
      this.form.publisher = response.data.publisher
      this.form.price = response.data.price
    },

    resetForm() {
      this.form.id = '';
      this.form.name = '';
      this.form.author = '';
      this.form.publisher = '';
      this.form.price = '';
    }
  },
  beforeMount() {
    if (this.id !== undefined) {
      this.title = 'Edit Book'
      this.getDataById()
    } else {
      this.title = 'Add Book'
    }
  },
}
</script>

<style>

</style>