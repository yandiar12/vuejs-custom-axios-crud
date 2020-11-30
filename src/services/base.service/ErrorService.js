// import swall from 'sweetalert'
import {AuthHeader} from '../StorageService'

export default class ErrorService extends Error {
  constructor (error) {
    super(error)
    this.name = 'Error: '
    this.error = error.request.response === 'Invalid token' ? { status: 401, message: error.request.response } : error.request.response ? JSON.parse(error.request.response) : error
  }

  showError () {
    
    const message = {
      title: this.error.status === 500 ? 'Something went wrong' : this.error.status ? 'Error' : 'Unexpected error',
      icon: this.error.status === 500 ? 'error' : this.error.success ? 'success' : this.error.status ? 'warning' : 'error',
      text: this.error.status === 500 ? this.error.message : this.error.status ? this.error.message : this.error.message.charAt(0).toUpperCase() + this.error.message.slice(1)
      // text: this.error.status === 500 ? 'System Exception' : this.error.status ? this.error.message : this.error.message.charAt(0).toUpperCase() + this.error.message.slice(1)
    }

    if (this.error.status === 401) {
      alert('Session is expired, Please login.').then((result) => {
        if (result) {
          AuthHeader.removeAuthData()
          location.replace('/login')
        }
      })
    } else {
      console.log(message)
    }
  }

  // showErrorUpload () {
  //   const message = {
  //     title: 'Perhatian',
  //     icon: 'warning',
  //     text: errorparser(this.error.message)
  //   }
  //
  //   swall(message)
  // }
}
