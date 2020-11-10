<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col class="text-center" md="4">
        <h1>404</h1>
        <h3>Page not found</h3>
        <router-link tag="a" :to="{ name: 'home' }">back to home</router-link>
      </b-col>
    </b-row>
  </div>    
</template>

<script>
export default {
  name: 'page404'
}
</script>

<style>

</style>