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
    isSuccessfulLogin(){
        // return this.statusCode === 200
        return this.statusCode === 200 && typeof this.getData().token !== 'undefined' && this.getData().token !== null
    }
    isSuccessCreated(){
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
    notFound(){
        return this.statusCode === 404
    }
    isInternalServerError() {
        return this.statusCode === 500
    }
    isBadRequest(){
        return (this.statusCode >= 400 && this.statusCode < 500) && ! this.isUnprocessableEntity()
    }
    getValidationErrors(){
        return this.data.violations
    }
    getFlattenValidationErrors(){
        let violations = this.getValidationErrors()
        let flattenMessage = "";
        for (let i = 0; i < violations.length; i++) {
            const violation = violations[i];
            flattenMessage += " "+this.flattenError(violation)

        }
        return flattenMessage;
    }
    flattenError(violation){
        let message = violation.message
        let propertyPath = violation.propertyPath
        return  propertyPath.toUpperCase() + " : "+ message + "\n"

    }
    flattenErrorWithoutPath(violation){
        let message = violation.message
        return   message + "\n"

    }
    simplifiedError(violation){
        return  violation.message

    }
    mapValidationErrorsToFields(fields, generalErrorMessage){
        let violations = this.getValidationErrors()
        for (let i = 0; i < violations.length; i++) {
          let propertyPath = violations[i].propertyPath
          let message = violations[i].message
          // eslint-disable-next-line no-prototype-builtins
          if (fields.hasOwnProperty(propertyPath)) {
            fields[propertyPath].hasError = true
            fields[propertyPath].message = message
          }else{
              generalErrorMessage.hasError = true
              generalErrorMessage.message += " " + this.simplifiedError(violations[i]) +"\n"
          }
        }
    }
    getData(){
        // eslint-disable-next-line no-prototype-builtins
        if (this.data.hasOwnProperty("hydra:member")){
            return this.data["hydra:member"]
        }else{
            return this.data;
        }
    }
    data(){ return getData()
    }
    getResponseErrorMessage(){
        if (this.isInternalServerError()){
        let message = this.response.status+" : " + (this.response.statusText.toLowerCase().includes("Internal Server Error".toLocaleLowerCase())?'Une Erreur interne s\'est produite': this.response.statusText)
           return message +" \n Veuillez nous signer cette erreur sur Whatsapp ou par SMS au 77 127 35 35"
        }
        return this.response.statusText;

    }


}
