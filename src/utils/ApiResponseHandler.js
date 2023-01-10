export  default  class ApiResponseHandler {
    // statusCode = 0;
    // data = null
    // response = null
    // error = null
    constructor(response) {
        try {
            this.statusCode = response.status
            this.data = response.data
            this.response = response
        } catch (e) {
            console.log(e.toString())
        }
    }
    isSuccessful(){
        return this.statusCode >= 200 && this.statusCode < 400
    }

    isCreatedSuccessfully(){
        return this.statusCode === 201
    }
    isDeletedSuccessfully(){
        return this.statusCode === 204
    }
    isUnprocessableEntity(){
        return this.statusCode === 422
    }
    isUnauthorized(){
        return this.statusCode === 401
    }
    isNotFound(){
        return this.statusCode === 404
    }
    isInternalServerError() {
        return this.statusCode === 500
    }
    isBadRequest(){
        return (this.statusCode >= 400 && this.statusCode < 500) && ! this.isUnprocessableEntity()&& ! this.isUnauthorized()
    }


    getData(){
        // eslint-disable-next-line no-prototype-builtins
        if (this.data.hasOwnProperty("hydra:member")){
            return this.data["hydra:member"]
        }else if (this.data.hasOwnProperty("data")){
            return this.data["data"]
        }else{
            return this.data;
        }
    }
    data(){ return this.getData()
    }

}
