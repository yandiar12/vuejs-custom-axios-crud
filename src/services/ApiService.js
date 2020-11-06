import axios from 'axios'

class ApiError extends Error {
  constructor (errorType, errorCode, message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.errorType = errorType
    this.errorCode = errorCode
  }
}

const ApiService = {
  _401interceptor: null,
  _reqInterceptor: null,

  init (baseURL) {
    axios.defaults.baseURL = baseURL
  },

  setHeader () {
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.headers.common['Accept'] = 'application/json'
  },

  removeHeader () {
    axios.defaults.headers.common = {}
  },

  get (resource) {
    return axios.get(resource)
  },

  post (resource, data) {
    return axios.post(resource, data)
  },

  put (resource, data) {
    return axios.put(resource, data)
  },

  delete (resource) {
    return axios.delete(resource)
  },

  async customRequest (data) {
    await this.setHeader()
    await this.mount401Interceptor()
    return axios(data)
  },

  async customDefault (data) {
    this.mount401Interceptor()
    return axios(data)
  },

  mount401Interceptor () {
    if (process.env.NODE_ENV === 'development') {
      this._reqInterceptor = axios.interceptors.request.use(config => {
        console.log('Request Interceptor', config)
        return config
      }, error => {
        return Promise.reject(error)
      })
    }
    
    this._401interceptor = axios.interceptors.response.use(
      (response) => {
        if (process.env.NODE_ENV === 'development') console.log('Response Interceptor', response)
        return response
      },
      error => {
        if (error.response && error.response.status === 401) {
          // store.dispatch('auth/forceLogout')
          // router.go('/login')
          throw error
        }

        throw error
      }
    )
  },

  unmount401Interceptor () {
    // Eject the interceptor
    axios.interceptors.response.eject(this._401interceptor)
    axios.interceptors.response.eject(this._reqInterceptor)
  },

  handleError (error) {
    if (error.request.status > 0) {
      const response = JSON.parse(error.request.response)
      throw new ApiError('warning', response.status, response.message)
    } else {
      throw new ApiError('error', error.status, error.message)
    }
  }
}

export default ApiService
export { ApiService, ApiError }
