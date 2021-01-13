import service from '../config/service.config'

const AuthService = {
  login(data) {
    const api = process.env.VUE_APP_ROOT_API + 'auth/signin'
    return service.post(api, data)
  },
  register(data) {
    const api = process.env.VUE_APP_ROOT_API + 'auth/signup'
    return service.post(api, data)
  }
}

export default AuthService