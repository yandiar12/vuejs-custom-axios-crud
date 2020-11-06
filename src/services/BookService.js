import ApiService from './ApiService'

const BookService = {
  // process.env.VUE_APP_ROOT_API

  getAllData: async function(pageNo, pageSize, sortBy) {
    const requestData = {
      method: 'get',
      baseURL: process.env.VUE_APP_ROOT_API,
      url: 'book/findall?pageNo=' + pageNo + '&pageSize=' + pageSize + '&sortBy=' + sortBy
    }
    
    try {
      const response = await ApiService.customDefault(requestData)
      console.log('response' + response)
      if (response.status === 200) {
        return response.data
      } else {
        console.log(response)
      }

      throw response.data
    } catch (error) {
      throw error
    }
  },

  getMedia: async function() {
    const requestData = {
      method: 'get',
      baseURL: process.env.VUE_APP_ROOT_API_1,
      url: 'master/media'
    }
    
    try {
      const response = await ApiService.get(requestData)
      console.log('response' + response)
      if (response.status === 200) {
        return response.data
      } else {
        console.log(response)
      }

      throw response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default BookService
export { BookService }
