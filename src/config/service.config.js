import axios from 'axios'
import store from '../store/'

const service = axios.create({
  timeout: 30000,
  transformResponse: [
    function (data) {
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data)
        } catch (e) { /* Ignore */ }
      }

      return data
    }
  ]
})

// Add a request interceptors
service.interceptors.request.use(function (config) {
  console.log('Request Interceptor', config)
  return config
}, function (error) {
  console.log(error)
  return Promise.reject(error)
})

// Add a response interceptor
service.interceptors.response.use(function (response) {
  console.log('Response Interceptor', response)
  return response.data
}, function (error) {
  if (error.response !== undefined) {
    // interceptors token Expired
    if (error.response.data.status == 401 && error.response.data.message.includes('JWT expired')) {
      alert('Session expired, please login.')
      store.dispatch('auth/logout')
    }
    return Promise.reject(error.response.data)  
  }
  return Promise.reject(error)
})

export default service
