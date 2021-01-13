<template>
  <div class="container">
    <b-row class="justify-content-center login-overlay">
      <b-col md="4" sm="6">
        <b-card>
          <h3 class="text-center">Sign in</h3>
          <b-form>
            <b-alert v-show="isError" show variant="danger">{{ messageError }}</b-alert>
            <b-form-group label="Email:" label-for="email">
              <b-form-input type="email" id="email" name="email" v-validate="'required|email'" v-model="form.email" :class="{ 'is-invalid': errors.has('email')}" ></b-form-input>
              <b-form-invalid-feedback class="invalid-feedback" v-if="errors.has('email')">{{ errors.first('email') }}</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Password:" label-for="password">
              <b-form-input type="password" id="password" name="password" v-validate="'required'" v-model="form.password" :class="{ 'is-invalid': errors.has('password')}" @keypress.enter="onLogin($event)"></b-form-input>
              <b-form-invalid-feedback class="invalid-feedback" v-if="errors.has('password')">{{ errors.first('password') }}</b-form-invalid-feedback>
            </b-form-group>

            <b-button block variant="primary" @click="onLogin($event)" :disabled="loading">
              <b-spinner small v-show="loading"></b-spinner>
              Sign in
            </b-button>
            <br>
            <router-link tag="a" :to="{ name: 'register-user' }">Register User</router-link>

          </b-form>
        </b-card>  
      </b-col>
    </b-row>
  </div>    
</template>

<script>
import AuthService from '../../services/AuthService'
import store from '../../store'
export default {
  name: 'login',
  data() {
    return {
      isError: false,
      loading: false,
      messageError: '',
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onLogin(e) {
      e.preventDefault();
      
      this.loading = true
      this.$validator.validate().then(valid => {
          if (valid) {
            const data = {
              email: this.form.email,
              password: this.form.password
            }
            AuthService.login(data).then(
              (res) => {
                store.commit('auth/loginSuccess', res.data)
                this.loading = false
                this.$router.replace('/')
              },
                (error) => {
                  console.log('Failed login ', error)
                  this.isError = true
                  this.messageError = error.message || 'Something went wrong'
                  this.loading = false
              }
            )
          } else {
            this.loading = false
          }
      });
    }
  },
}
</script>

<style lang="scss" scoped>
.login-overlay {
  margin-top: 50px;
}
</style>