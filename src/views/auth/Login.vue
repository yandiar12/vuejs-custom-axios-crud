<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col md="4" sm="6">
        <b-card>
          <h3 class="text-center">Sign in</h3>
          <b-form>
            <b-form-group label="Email:" label-for="email">
              <b-form-input type="email" id="email" name="email" v-validate="'required|email'" v-model="form.email" :class="{ 'is-invalid': errors.has('email')}" ></b-form-input>
              <b-form-invalid-feedback class="invalid-feedback" v-if="errors.has('email')">{{ errors.first('email') }}</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Password:" label-for="password">
              <b-form-input type="password" id="password" name="password" v-validate="'required'" v-model="form.password" :class="{ 'is-invalid': errors.has('password')}" ></b-form-input>
              <b-form-invalid-feedback class="invalid-feedback" v-if="errors.has('password')">{{ errors.first('password') }}</b-form-invalid-feedback>
            </b-form-group>

            <b-button block variant="primary">Sign in</b-button>

          </b-form>
        </b-card>  
      </b-col>
    </b-row>
  </div>    
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  }
}
</script>

<style>

</style>