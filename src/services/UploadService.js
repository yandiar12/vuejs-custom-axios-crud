import HttpService from './base.service/HttpService.js'

export default class BookService2 extends HttpService {
  static api = process.env.VUE_APP_ROOT_API

  upload(data) {
    const end_point = 'files/uploadFile'
    const api = this.api + end_point
    return this.uploadFile(data, api)
  }

  uploadMultipleFiles(data) {
    const end_point = 'files/uploadMutipleFiles'
    const api = this.api + end_point
    return this.uploadFile(data, api)
  }
}