import service from '../config/service.config'
import { AuthHeader } from '../services/StorageService'

const UserService = {
  getUserByEmail(email) {
    const api_url = process.env.VUE_APP_ROOT_API + 'user?email=' + email
    const options = {
      headers : {
        'Authorization': 'Bearer ' + AuthHeader.getAuthData().token
      }
    }
    return service.get(api_url, options)
  }
}

export default UserService
