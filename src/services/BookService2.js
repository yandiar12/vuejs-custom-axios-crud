import service from '../config/service.config'

const BookService2 = {
  getAllData(pageNo, pageSize, sortBy) {
    const end_point = 'book/findall?pageNo=' + pageNo + '&pageSize=' + pageSize + '&sortBy=' +sortBy
    const api = process.env.VUE_APP_ROOT_API + end_point
    return service.get(api)
  },

  getAllByName(name, sortBy) {
    const end_point = 'book/findallbyname?name=' + name + '&sortBy=' +sortBy
    const api = process.env.VUE_APP_ROOT_API + end_point
    return service.get(api)
  },

  getDataById(id) {
    const end_point = 'book/findbyid/' + id
    const api = process.env.VUE_APP_ROOT_API + end_point
    return service.get(api)
  },

  addBook(data) {
    const end_point = 'book/'
    const api = process.env.VUE_APP_ROOT_API + end_point
    return service.post(api, data)
  },

  editBook(id, data) {
    const end_point = 'book/' + id
    const api = process.env.VUE_APP_ROOT_API + end_point
    return service.put(api, data)
  },

  deleteBook(id) {
    const end_point = 'book/' + id
    const api = process.env.VUE_APP_ROOT_API + end_point
    return service.delete(api)
  }

}

export default BookService2