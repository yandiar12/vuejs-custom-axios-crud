import HttpService from './base.service/HttpService.js'

export default class BookService2 extends HttpService {
  static api = process.env.VUE_APP_ROOT_API

  getAllData(pageNo, pageSize, sortBy) {
    const end_point = 'book/findall?pageNo=' + pageNo + '&pageSize=' + pageSize + '&sortBy=' +sortBy
    const api = this.api + end_point
    return this.get(api)
  }

  getAllByName(name, sortBy) {
    const end_point = 'book/findallbyname?name=' + name + '&sortBy=' +sortBy
    const api = this.api + end_point
    return this.get(api)
  }

  getDataById(id) {
    const end_point = 'book/findbyid/' + id
    const api = this.api + end_point
    return this.get(api)
  }

  addBook(data) {
    const end_point = 'book/'
    const api = this.api + end_point
    return this.postBodyJsonAndParam(data, api, null)
  }

  editBook(id, data) {
    const end_point = 'book/' + id
    const api = this.api + end_point
    return this.put(data, api, null)
  }

  deleteBook(id) {
    const end_point = 'book/' + id
    const api = this.api + end_point
    return this.delete(api)
  }

}