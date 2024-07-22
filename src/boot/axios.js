import { boot } from "quasar/wrappers";
import axios from "axios";
import ApiResponseHandler from "../utils/ApiResponseHandler";
import { Notify } from "quasar";

// or with a config object:

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside the
// "export default () => {}" function below (which runs individually
// for each client)
let axiosInstance = void 0
let storeInstance = void 0



function createAxiosInstance(config, store, app) {
  const instance = axios.create(config);
  let requestsPending = 0;

  const req = {
    pending: () => {
      requestsPending++;
      app.config.globalProperties.$q.loading.show({
        message: "Chargement....",
        spinnerColor: "primary",
      });
    },
    done: () => {
      requestsPending--;
      if (requestsPending <= 0) {
        app.config.globalProperties.$q.loading.hide();
      }
    },
  };

  instance.interceptors.request.use(
    (config) => {
      if (
        typeof config.shouldNotShowLoadingIndicator == null ||
        !config.shouldNotShowLoadingIndicator
      ) {
        req.pending();
      }

      config.headers["Accept"] = "application/json";
      config.headers["platform"] = app.config.globalProperties.$q.platform.is.platform;
      config.headers["Authorization"] =
        config.headers["Authorization"] || `Bearer ${store.state.user_login.user.token}`;

      return config;
    },
    (error) => {
      requestsPending--;
      req.done();
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      req.done();
      response = new ApiResponseHandler(response);
      return Promise.resolve(response);
    },
    (error) => {
      req.done();
      const { Cancel } = axios;

      if (error.code === "ECONNABORTED") {
        Notify.create({
          message: `Pas de réponse, vérifiez votre connexion et votre passe internet !`,
          icon: "error",
          color: "red",
          position: "center",
          textColor: "white",
          timeout: 1500,
        });
      } else if (error.code === "INTERNET_DISCONNECTED") {
        Notify.create({
          message: `Vous n'êtes pas actuellement connecté sur Internet`,
          icon: "error",
          color: "red",
          position: "center",
          textColor: "white",
          timeout: 1500,
        });
      } else if (error instanceof Cancel) {
        return Promise.reject(error);
      } else if (error.response) {
        error.response = new ApiResponseHandler(error.response);
        if (error.response.isUnauthorized()) {
          if (
            typeof error.response.getData().message != "undefined" &&
            error.response.getData().message.toLowerCase() ===
            "Unauthenticated.".toLowerCase()
          ) {
            router.push("login");
          }
        } else if (error.response.isNotFound()) {
        } else if (error.response.isInternalServerError()) {
          Notify.create({
            message: `Une erreur s'est produite au niveau du serveur, la requête n'a pas abouti`,
            icon: "error",
            color: "red",
            position: "center",
            textColor: "white",
            timeout: 1500,
          });
        }

        return Promise.reject(error.response);
      } else {
        if (error.message === "Network Error") {
          Notify.create({
            message: `Vous n'êtes pas actuellement connecté sur Internet`,
            icon: "error",
            color: "red",
            position: "center",
            textColor: "white",
            timeout: 1500,
          });
        }
      }
    }
  );

  return instance;
}








// export  const  BASE_SERVER_URL= process.env.NODE_ENV === "development"? "http://localhost:8888/DigiPress/DigiPressBackend/public/": 'https://digipress.golobone.net'
export const BASE_SERVER_URL =
  process.env.NODE_ENV === "development"
    ? "http://192.168.1.6:8888/Transport/GoTransportBackend/public/"
    : "http://192.168.1.6:8888/Transport/GoTransportBackend/public/";

export default boot(({ app, store, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  let config = {
    // baseURL: process.env.NODE_ENV === "development"?'http://localhost/senapel/public/api/':'https://golobone.net/go_travel_v4/public/api/'
    baseURL: BASE_SERVER_URL + "api/",
    // baseURL: process.env.NODE_ENV === "development"?'http://Localhost/GO_SYS_V4/public/api/':'http://192.168.1.17/GO_SYS_V4/public/api/'
    // timeout: 60 * 1000, // Timeout
  };
  let _axios = createAxiosInstance(config,store, app);
  _axios.silent = () => {
    const silentConfig = {
      ...config };
    const silentInstance = createAxiosInstance(silentConfig, store, app);

    silentInstance.interceptors.request.use((config) => {
      config.shouldNotShowLoadingIndicator = true;
      return config;
    });

    return silentInstance;
  };


  app.config.globalProperties.$axios = _axios;
  axiosInstance = _axios;
  storeInstance = store;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  // app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { axiosInstance, storeInstance };

//======================== Config
