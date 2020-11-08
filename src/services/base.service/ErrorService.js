// import swall from 'sweetalert'
// import storage from '../../commons/config/storage.config'

export default class ErrorService extends Error {
  constructor (error) {
    console.log('err', error.request)
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

    // if (this.error.status === 500) {
      // swall(message).then((result) => {
      //   if (result) {
      //     // storage.clearSession()
      //     // location.replace('/login')
      //   }
      // })
      console.log(message)
      // alert('Something went wrong')
    // }
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
