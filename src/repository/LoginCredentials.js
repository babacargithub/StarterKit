  class LoginCredentials {
    // statusCode = 0;
    // data = null
    // response = null
    // error = null

    getClientId() {
        return Number(localStorage.getItem("client_id"));
    }
    getClient() {
        return JSON.parse(localStorage.getItem('client'))
    }
    saveClient(client) {
        localStorage.setItem('client_id',client.id)
        localStorage.setItem('client',JSON.stringify(client))

    }
    setAsLoggedIn() {
        localStorage.setItem('est_connecte',"1")
    }
    logout() {
        localStorage.removeItem('client')
        localStorage.removeItem('client_id')
        localStorage.removeItem('est_connecte')
        localStorage.setItem('est_connecte',"0")

    }
    isConnected(){
        return Boolean(Number(localStorage.getItem('est_connecte')))
    }
    canClientSeeParution(parution){
      return parution.achete === true
    }
}
let loginCredentials = new LoginCredentials()

export default  loginCredentials
