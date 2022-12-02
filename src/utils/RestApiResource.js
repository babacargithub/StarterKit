export  default  class RestApiResource {
    // statusCode = 0;
    // data = null
    // response = null
    // error = null
    constructor(resourceUrl, axios) {
        try {
            this.resourceUrl = resourceUrl
            this.axios = axios
        } catch (e) {
            console.log(e.toString())
        }
    }
    getWithQueryString(query){
       return this.axios.get(this.resourceUrl+'?'+query)
    }
    getAll(){
       return this.axios.get(this.resourceUrl)
    }
    get(id){
       return this.axios.get(this.resourceUrl+'/'+id)
    }
    put(id,data){
       return this.axios.put(this.resourceUrl+'/'+id,data)
    }
    post(data){
       return this.axios.post(this.resourceUrl,data)
    }
    delete(id){
        return this.axios.get(this.resourceUrl+'/'+id)
    }
    getWithCustomUrl(customUrl){
        return this.axios.get(this.resourceUrl+'/'+ customUrl)
    }
    postWithCustomUrl(customUrl, data){
        return this.axios.put(this.resourceUrl+'/'+ customUrl, data)
    }

}
