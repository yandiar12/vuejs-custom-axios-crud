<template>
  <div class="home">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">Home</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: `add` }">
            Add Book
          </b-nav-item>
          <b-nav-item :to="{ name: `uploadFiles` }">
            Upload Files
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown toggle-class="text-decoration-none" no-caret right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <b-avatar v-if="avatarUrl" class="mr-3" size="sm" :src="avatarUrl"></b-avatar>
              <b-avatar v-else class="mr-3" size="sm"></b-avatar>
              <span class="mr-auto"><strong>{{ userName }}</strong></span>
            </template>
            <b-dropdown-item :to="{ name: `profile` }">Profile</b-dropdown-item>
            <b-dropdown-item @click="onlogout()">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    
    <b-container class="content-wrapper">
      <transition name="show">
        <router-view></router-view>
      </transition>
    </b-container>  
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { AuthHeader } from '../services/StorageService'
import UserService from '../services/UserService'

export default {
  name: 'home',
  data() {
    return {
      authData: AuthHeader.getAuthData(),
      userName: '',
      avatarUrl: undefined
    }
  },
  methods: {
    ...mapActions('auth', [
      'logout'
    ]),

    getUser() {
      const email = this.authData.email
      UserService.getUserByEmail(email).then(
        res => {
          console.log(res)
          this.userName = res.data.name
          this.avatarUrl = res.data.avatarUrl || undefined
        },
        err => {
          console.log(err)
        }
      )
    },

    onlogout() {
      this.logout()
    }
  },
  beforeMount() {
    this.getUser()
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  margin-top: 15px;
}
.show-enter-active,
.show-leave-enter {
    transform: translateX(0);
    transition: all .3s linear;
}
.show-enter,
.show-leave-to {
    transform: translateX(100%);
}
</style>
