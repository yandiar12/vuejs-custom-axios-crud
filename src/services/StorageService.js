
const AuthHeader = {
  getAuthData() {
    const data = JSON.parse(localStorage.getItem('auth_data'));
    return data;
  },

  saveAuthData(data) {
    localStorage.setItem("auth_data", JSON.stringify(data))
  },

  removeAuthData() {
    localStorage.removeItem("auth_data")
  }
}

export { AuthHeader } 