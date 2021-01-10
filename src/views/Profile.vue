<template>
  <b-row class="d-flex justify-content-center">
    <b-col cols="md-3">
      <b-card class="text-center">
        <b-img :src="require(`@/assets/img/avatar_default.png`)" width="200" height="200" rounded="circle" alt="profile-image"></b-img>
        <b-card-title>{{ form.name }}</b-card-title>
        <span><em>I'm a Web Depelover</em></span>
      </b-card>
    </b-col>
    <b-col cols="md-6">
      <b-card class="text-center">
        <b-card-title>
          Profile
        </b-card-title>
        <b-card-body>
          <b-form>
            <b-row class="my-1">
              <b-col sm="2">
                <label for="email">Email:</label>
              </b-col>
              <b-col sm="10">
                <b-form-input type="text" id="email" name="email" v-model="form.email" disabled/>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="2">
                <label for="name">Name:</label>
              </b-col>
              <b-col sm="10">
                <b-form-input type="text" id="name" name="name" v-model="form.name" :disabled="!editing" />
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="12">
                <b-button variant="success" size="sm" v-show="!editing" @click="edit"><i class="fa fa-pencil">&nbsp;</i> Edit</b-button>
                <b-button variant="danger" size="sm" v-show="editing" @click="save"><i class="fa fa-check">&nbsp;</i> Save</b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { AuthHeader } from '../services/StorageService'
import UserService from '../services/UserService'
const userService = UserService.build()
export default {
  name: 'profile',
  data() {
    return {
      editing: false,
      form: {
        name: 'Yandi',
        email: 'yandiar.rohman@gmail.com'
      }
    }
  },
  methods: {
    getData() {
      this.form.name = AuthHeader.getAuthData().data.name
      this.form.email = AuthHeader.getAuthData().data.email
    }, 
    edit() {
      this.editing = true
    },
    save() {
      this.editing = false
      const data = {
        email: this.form.email,
        name: this.form.name
      }
      userService.update(data).then(
        (res) => {
          this.makeToast(res.message)
        },
        (err) => {
          this.makeToast(err.message)
        }
      )
    },
    makeToast(msg) {
        this.$bvToast.toast(msg, {
          title: 'Update User',
          autoHideDelay: 5000
        })
      }
  },
  beforeMount() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>

</style>