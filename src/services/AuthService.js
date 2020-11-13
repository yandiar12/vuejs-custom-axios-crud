import HttpService from './base.service/HttpService.js'

export default class AuthService extends HttpService {
  static api = process.env.VUE_APP_ROOT_API

  login(data) {
    const end_point = this.api + '/auth/signin'
    return this.postBodyJsonAndParam(data, end_point)
  }

  register(data) {
    const end_point = this.api + '/auth/signup'
    return this.postBodyJsonAndParam(data, end_point)
  }
}