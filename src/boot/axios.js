import { boot } from 'quasar/wrappers'
import axios from 'axios'
import ApiResponseHandler from "../utils/ApiResponseHandler";
import loginCredentials from "src/repository/LoginCredentials";
import { Notify } from 'quasar'

// or with a config object:

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'https://admin.senapel.com/api/' })
// export  const  BASE_SERVER_URL= process.env.NODE_ENV === "development"? "http://localhost:8888/DigiPress/DigiPressBackend/public/": 'https://digipress.golobone.net'
export  const  BASE_SERVER_URL= process.env.NODE_ENV === "development"? "http://localhost:8888/DigiPress/DigiPressBackend/public/": "https://digipress.golobone.net/";

export default boot(({ app, store}) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  let config = {
    // baseURL: process.env.NODE_ENV === "development"?'http://localhost/senapel/public/api/':'https://golobone.net/go_travel_v4/public/api/'
    baseURL:  BASE_SERVER_URL + 'api/'
    // baseURL: process.env.NODE_ENV === "development"?'http://Localhost/GO_SYS_V4/public/api/':'http://192.168.1.17/GO_SYS_V4/public/api/'
    // timeout: 60 * 1000, // Timeout
  };
  let _axios = axios.create(config);
  const actionScope = `loader`;
  let requestsPending = 0;

  const req = {
    pending: () => {
      requestsPending++;
      store.dispatch(`${actionScope}/showIsLoadingIndicator`);
      app.config.globalProperties.$q.loading.show({
        message: 'Chargement....',
        // boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary'
      })

    },
    done: () => {
      requestsPending--;
      if (requestsPending <= 0) {
        store.dispatch(`${actionScope}/hideIsLoadingIndicator`);
        app.config.globalProperties.$q.loading.hide()
      }
    }
  };
  _axios.interceptors.request.use(
    config => {
      if (typeof config.shouldNotShowLoadingIndicator === 'undefined' &&  !config.shouldNotShowLoadingIndicator){
        req.pending();
      }

      config.headers = {
        'Authorization': `Bearer ${store.state.user_login.user.token}`,
        'Accept':'application/json',
        'Client-id': loginCredentials.getClientId(),
        'Content-Type':'application/json',
      }
      return config;
    },
    error => {
      requestsPending--;
      req.done();
      return Promise.reject(error);
    }
  );
  _axios.interceptors.response.use(
    (response) => {
      req.done();
      response = new ApiResponseHandler(response)
      return Promise.resolve(response);
    },
    error => {
      req.done();
      error.response = new ApiResponseHandler(error.response)


      if (error.response.isUnauthorized()){
      }

      else if(error.response.isNotFound()) {
        Notify.create({
          message: `Une erreur de type "Introuvable" est rencontrée par la requête!`,
          icon: "error",
          color: 'primary',
          position:"center"
        })
      }
      else if(error.response.isInternalServerError()) {
        Notify.create({
          message: `Une erreur s'est produite au niveau du serveur, la requête n'a pas abouti`,
          icon: "error",
          color: 'secondary',
          position:"center",
          textColor: "primary",
          timeout: 1500
        })

      }

      return Promise.reject(error.response);
    }
  );

  app.config.globalProperties.$axios = _axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }


//======================== Config

