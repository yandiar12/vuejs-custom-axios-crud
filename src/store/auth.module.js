
import { AuthHeader } from '../services/StorageService'
import Router from '../router/index'

const AuthData = AuthHeader.getAuthData()

const state = {
  accessToken: AuthData ? AuthData.token : '',
  authName: AuthData ? AuthData.name : '',
  authEmail: AuthData ? AuthData.email : ''
}

const getters = {
  loggedIn: (state) => {
    return !!state.accessToken
  },
  AuthName: (state) => {
    return state.authName
  },
  AuthEmail: (state) => {
    return state.authEmail
  }
}

const actions = {
  async logout ({ commit }) {
    try {
      AuthHeader.removeAuthData()
      Router.push('/sign-in')
      commit('logoutSuccess')
    } catch (e) {
      console.log('error logout: ', e)
      throw new e
    }
  },
}

const mutations = {

  loginSuccess (state, data) {
    AuthHeader.saveAuthData(data)
    state.authName = data.name
    state.authEmail = data.email
    state.accessToken = data.token
  },

  logoutSuccess (state) {
    state.authName = ''
    state.authEmail = ''
    state.accessToken = ''
  }
}

export const auth = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
