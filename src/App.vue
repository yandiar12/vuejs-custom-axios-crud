<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
/* Import Bootstrap */
@import '../node_modules/bootstrap/scss/bootstrap';
/* Import Bootstrap-vue */
@import '../node_modules/bootstrap-vue/src/index.scss';
/* Import Font Awesome Icons Set */
$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome.scss';

body {
  padding: 20px;
}
</style>
