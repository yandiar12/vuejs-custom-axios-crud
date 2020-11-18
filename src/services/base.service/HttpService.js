/* eslint-disable no-unused-vars */
import service from '../../config/service.config'
import BaseService from './BaseService'
import ErrorService from './ErrorService'
import { Deserialize, Serialize } from 'cerialize'
import { AuthHeader } from '../../services/StorageService'

/**
 * @typedef {Http}
 */

export default class HttpService extends BaseService {
  static api = ''
  static entity = ''

  /**
   * @param {String} resource
   * @param {Object} options
   * @param {Object} http
   */
  constructor (api, entity, options = {}, http = null) {
    super(options)
    this.api = api
    this.entity = entity
    this.http = http || service
  }

  /**
   * @param {String} path
   * @param {Object} options
   */
  static build (options) {
    return new this(this.api, this.entity, options)
  }

  static setHeader () {
    const data = AuthHeader.getAuthdata()
    service.defaults.headers.common['Authorization'] = `Bearer ${data}`
    service.defaults.headers.common['Content-Type'] = 'application/json'
    service.defaults.headers.common['Accept'] = 'application/json'
  }

  static removeHeader () {
    service.defaults.headers.common = {}
  }

  /**
   * @param {String} url
   * @returns {*|Promise<any>}
   */
  
  get (url) {
    const api = url === '' ? this.api : url
    return this.http
      .get(api)
      .then(this.constructor.then)
      .catch((e) => {
        if (e instanceof ErrorService) {
          console.log('error', e)
          e.showError()
        } else {
          console.log('error ==')
          const alert = new ErrorService(e)
          alert.showError()
        }
      })
  }

  postQueryParam (param = '', url = '') {
    const api = url === '' ? this.api : url
    return this.http
      .post(api + param)
      .then(this.constructor.then)
      .catch((e) => {
        if (e instanceof ErrorService) {
          e.showError()
        } else {
          const alert = new ErrorService(e)
          alert.showError()
        }
      })
  }

  /**
   * @param {String} url
   * @param {Object} data
   * @returns {*|Promise<any>}
   */
  postBodyJsonAndParam (data, url = '', param = {}) {
    const api = url === '' ? this.api : url
    const deserializeData = Deserialize(data, this.entity)
    return this.http
      .post(api, Serialize(deserializeData), { params: param })
      .then(this.constructor.then)
      .catch((e) => {
        if (e instanceof ErrorService) {
          e.showError()
        } else {
          const alert = new ErrorService(e)
          alert.showError()
        }
        throw e.response.data
      })
  }

  postFilter (data, url = '', param = {}) {
    const api = url === '' ? this.api : url
    return this.http
      .post(api, data, { params: param })
      .then(this.constructor.then)
      .catch((e) => {
        if (e instanceof ErrorService) {
          e.showError()
        } else {
          const alert = new ErrorService(e)
          alert.showError()
        }
      })
  }

  /**
   * @param {String} url
   * @param {Object} data
   * @returns {*|Promise<any>}
   */
  put (data, url = '', param = {}) {
    const api = url === '' ? this.api : url
    const deserializeData = Deserialize(data, this.entity)
    return this.http
      .put(api, data, { params: param })
      .then(this.constructor.then)
      .catch((e) => {
        if (e instanceof ErrorService) {
          e.showError()
        } else {
          const alert = new ErrorService(e)
          alert.showError()
        }
      })
  }

  /**
   * @param {String} url
   * @param {Object} data
   * @returns {*|Promise<any>}
   */
  patch (data, url = '') {
    console.log(data)
    const api = url === '' ? this.api : url
    const deserializeData = Deserialize(data, this.entity)
    return this.http
      .patch(api)
      .then(this.constructor.then)
      .catch((e) => {
        if (e instanceof ErrorService) {
          e.showError()
        } else {
          const alert = new ErrorService(e)
          alert.showError()
        }
      })
  }

  /**
   * @param {String} url
   * @returns {*|Promise<any>}
   */
  delete (url) {
    return this.http
      .delete(url)
      .then(this.constructor.then)
      .catch((e) => {
        if (e instanceof ErrorService) {
          e.showError()
        } else {
          const alert = new ErrorService(e)
          alert.showError()
        }
      })
  }

  /**
   * @param {String} url
   * @returns {*|Promise<any>}
   */
  deleteWithReqBody (data, url = '', param = {}) {
    const api = url === '' ? this.api : url
    const deserializeData = Deserialize(data, this.entity)
    return this.http
      .delete(api, { data: Serialize(deserializeData), params: param })
      .then(this.constructor.then)
      .catch((e) => {
        if (e instanceof ErrorService) {
          e.showError()
        } else {
          const alert = new ErrorService(e)
          alert.showError()
        }
      })
  }

  /**
   * @param {Object} response
   * @returns {Object}
   */
  /* generateTable (param = {}, path = '') {
    const api = (path === '') ? this.api : this.api + path
    return this.http
      .get(api, {
        params: param,
        transformResponse: [
          (data) => {
            if (data === 'Invalid token') {
              return data
            } else {
              const res = JSON.parse(data)
              if (res.data) {
                return {
                  data: {
                    data: Deserialize(res.data.contents, this.entity),
                    total: res.data.pages.totalElements,
                    size: res.data.pages.size,
                    page: res.data.pages.number
                  },
                  status: res.status,
                  message: res.message,
                  success: res.success
                }
              } else {
                return res
              }
            }
          }
        ]
      })
      .then(this.constructor.then)
      .catch((e) => {
        if (e instanceof ErrorService) {
          e.showError()
        } else {
          const error = new ErrorService(e)
          error.showError()
        }
      })
  } */

  uploadFile (data, url = '') {
    const api = url
    return this.http
      .post(api, data)
      .then(this.constructor.then)
      .catch((e) => {
        if (e instanceof ErrorService) {
          e.showErrorUpload()
        } else {
          const alert = new ErrorService(e)
          alert.showError()
        }
        throw e.response.data
      })
  }

  export (param = {}, data, filename, path = '', url) {
    path;
    const api = this.api + url
    console.log('api:', api)
    return this.http
      .post(api, data, { params: param, responseType: 'blob'
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
      }).catch((e) => {
        if (e instanceof ErrorService) {
          e.showError()
        } else {
          const alert = new ErrorService(e)
          alert.showError()
        }
      })
  }

  /**
   * @param {Object} response
   * @returns {Object}
   */
  static then (response) {
    if (!response.data) {
      return {}
    }

    if ((response.data.status !== 200 || response.data.status === 'DATA_EXISTS' || response.data.status === '5000' || response.data.status === null || response.data.status === '') && response.status !== 200) {
      throw new ErrorService(response)
    }

    return response.data
  }
}
