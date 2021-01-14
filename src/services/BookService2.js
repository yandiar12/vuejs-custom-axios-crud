import service from '../config/service.config'
import { AuthHeader } from '../services/StorageService'

const BookService2 = {
  getAllData(pageNo, pageSize, sortBy) {
    const end_point = 'book/findall?pageNo=' + pageNo + '&pageSize=' + pageSize + '&sortBy=' +sortBy
    const api = process.env.VUE_APP_ROOT_API + end_point
    const options = {
      headers : {
        'Authorization': 'Bearer ' + AuthHeader.getAuthData().token
      }
    }
    return service.get(api, options)
  },

  getAllByName(name, sortBy) {
    const end_point = 'book/findallbyname?name=' + name + '&sortBy=' +sortBy
    const api = process.env.VUE_APP_ROOT_API + end_point
    const options = {
      headers : {
        'Authorization': 'Bearer ' + AuthHeader.getAuthData().token
      }
    }
    return service.get(api, options)
  },

  getDataById(id) {
    const end_point = 'book/findbyid/' + id
    const api = process.env.VUE_APP_ROOT_API + end_point
    const options = {
      headers : {
        'Authorization': 'Bearer ' + AuthHeader.getAuthData().token
      }
    }
    return service.get(api, options)
  },

  addBook(data) {
    const end_point = 'book/'
    const api = process.env.VUE_APP_ROOT_API + end_point
    const options = {
      headers : {
        'Authorization': 'Bearer ' + AuthHeader.getAuthData().token
      }
    }
    return service.post(api, data, options)
  },

  editBook(id, data) {
    const end_point = 'book/' + id
    const api = process.env.VUE_APP_ROOT_API + end_point
    const options = {
      headers : {
        'Authorization': 'Bearer ' + AuthHeader.getAuthData().token
      }
    }
    return service.put(api, data, options)
  },

  deleteBook(id) {
    const end_point = 'book/' + id
    const api = process.env.VUE_APP_ROOT_API + end_point
    const options = {
      headers : {
        'Authorization': 'Bearer ' + AuthHeader.getAuthData().token
      }
    }
    return service.delete(api, options)
  }

}

export default BookService2