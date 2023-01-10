import { boot } from 'quasar/wrappers'
import swal from "sweetalert";
import loginCredentials from "src/repository/LoginCredentials";
import Acheter from "pages/paiements/Acheter.vue";
import FormulaireRecharge from "pages/users/FormulaireRecharge.vue";
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot( ( { app, quasar} ) => {
  // something to do
  app.mixin({
    data() {
      return {
        isConnected: loginCredentials.isConnected(),
        isMobile:  app.config.globalProperties.$q.platform.is.mobile,
        client: loginCredentials.getClient(),
        estAbonne: loginCredentials.estAbonne()
      };
    },
    methods: {
      isAuthenticated (){
        return loginCredentials.isConnected()
      },
      showLoading(text = null){
        app.config.globalProperties.$q.loading.show({
          message: text == null ?'Chargement....': text,
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
          if (typeof onClose != "undefined")
            onClose()
        })

      },
    showAlertError(message, onClose) {
      swal({
        title: 'Erreur',
        text: message != null && typeof message != 'undefined' ? message: 'Une erreur s\'est produite',
        icon: 'error',
      }).then(value =>{
        if (typeof onClose != "undefined")
          onClose()
      })
      },
      showConfirm(message, whenYes, whenNo) {

        swal({
          title: "Confirmer",
          text: message,
          icon: 'warning',
          buttons: {
            cancel: true,
            confirm: "Confirmer",
          },
        }).then((result) => {
          if (result) {
            whenYes()
          }
        });
      },
      afficherFormulaireAchat(propsArgs){
        app.config.globalProperties.$q.dialog({
          component: Acheter,
          componentProps: propsArgs
        })
      },
      afficherFormulaireRecharge(){
        app.config.globalProperties.$q.dialog({
          component: FormulaireRecharge,
          componentProps: {
            compte_id: this.client.id,
          },
          maximized: true,
          transitionShow: "fadeIn"

        })
      },
    },

  })
})
