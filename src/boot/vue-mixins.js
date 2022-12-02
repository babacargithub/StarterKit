import { boot } from 'quasar/wrappers'
import swal from "sweetalert";
import loginCredentials from "src/repository/LoginCredentials";
import Acheter from "pages/paiements/Acheter.vue";
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot( ( { app} ) => {
  // something to do
  app.mixin({
    data() {
      return {
        isConnected: loginCredentials.isConnected()
      };
    },
    methods: {
      isAuthenticated (){
        return loginCredentials.isConnected()
      },
      showLoading(){
        app.config.globalProperties.$q.loading.show({
          message: 'Chargement....',
          // boxClass: 'bg-grey-2 text-grey-9',
          spinnerColor: 'primary'
        })
      },
      hideLoading(){
        app.config.globalProperties.$q.loading.hide()
      },
       showAlertSuccess(message, onClose) {
        swal({
          title: 'Réussi',
          text: message,
          icon: 'success',
        }).then(value =>{
          onClose()
        })

      },
    showAlertError(message, onClose) {
      swal({
        title: 'Erreur',
        text: message != null && typeof message != 'undefined' ? message: 'Une erreur s\'est produite',
        icon: 'error',
      }).then(value =>{
        onClose()
      })
      },
      showConfirm(title,message, whenYes, whenNo) {
        console.log(message, whenYes, whenNo)

      },
      afficherFormulaireAchat(propsArgs){
        app.config.globalProperties.$q.dialog({
          component: Acheter,
          componentProps: propsArgs
        })
      }
    },

  })
})
