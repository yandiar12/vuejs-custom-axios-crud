import HttpService from './base.service/HttpService.js'

export default class UserService extends HttpService {
  static api = process.env.VUE_APP_ROOT_API

  update(data) {
    const end_point = this.api + '/user/update'
    return this.postBodyJsonAndParam(data, end_point)
  }

}