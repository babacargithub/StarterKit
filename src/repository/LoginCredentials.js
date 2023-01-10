class LoginCredentials {
  // statusCode = 0;
  // data = null
  // response = null
  // error = null

  getClientId() {
    try {
      return Number(localStorage.getItem("client_id"));
    } catch (e) {
      return  0;
    }
  }
  getClient() {
    try {
      return JSON.parse(localStorage.getItem('client'))
    } catch (e) {
      return null
    }
  }
  saveAbonnement(abonnement){
    let client = this.getClient();
    if (client != null){
      client.abonnement = abonnement;
      this.saveClient(client)
    }
  }
  saveClient(client) {
    try {
      localStorage.setItem('client_id', client.id)
      localStorage.setItem('client', JSON.stringify(client))
      return true
    } catch (e) {
      console.log(e)
      return  false;
    }

  }
  setAsLoggedIn() {
    try {
      localStorage.setItem('est_connecte', "1")
      return  true
    } catch (e) {
      console.log(e)
      return false
    }
  }
  logout() {
    localStorage.removeItem('client')
    localStorage.removeItem('client_id')
    localStorage.removeItem('est_connecte')
    localStorage.setItem('est_connecte',"0")

  }
  isConnected(){
    try {
      return Boolean(Number(localStorage.getItem('est_connecte')))
    } catch (e) {
      return  false
    }
  }
  estAbonne(){
    if ( typeof this.getClient() == "undefined" || this.getClient() == null) {
      return false
    }
    if (typeof this.getClient().abonnement == "undefined") {
      return  false;
    }
    return this.getClient().abonnement !== null;

  }

}
let loginCredentials = new LoginCredentials()

export default  loginCredentials
