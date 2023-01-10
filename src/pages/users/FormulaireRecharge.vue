<template>
  <q-dialog v-model="dialogRef"  @hide="onDialogHide"  >
           <q-card >
          <q-card-section>
            <p class="text-weight-bolder text-primary">Recharger votre compte par Wave</p>
            <img alt="Logo Wave"  class="justify-center text-center" src="~assets/wave_logo.png"  style="width: 50px; height: 50px"
            >
          </q-card-section>
          <q-card-section>
            <form @submit.prevent="submit">
              <q-input required type="number" outlined  inputmode="number" minlength="9" maxlength="9" placeholder="Montant"
                           v-model="montant"
                        label="Montant" :error="errors.montant != null" :error-message="errors.montant" bg-color="secondary">
              </q-input>

                <primary-button type="submit" fill="outline" shape="round" no-caps>Recharger mon compte </primary-button>

            </form>
          </q-card-section>
        </q-card>

  </q-dialog>
</template>
<style>

</style>
<script >
import { defineComponent } from 'vue';
import loginCredentials from "src/repository/LoginCredentials";
import PrimaryButton from "components/PrimaryButton.vue";

export default defineComponent({
  name: 'FormulaireRecharge',
  props: {
    compte_id: {default: 0},
    onPayementLunched:{type: Function}
  },
  components: {
    PrimaryButton,

  },
  emits: [
    // REQUIRED
    'ok', 'hide', 'paymentLaunched'
  ],
  data() {
    return {
      montant: 0,
      dialogRef: true,
      afficher_formulaire: ! loginCredentials.isConnected(),
      isUpdating: false,
      est_connecte: loginCredentials.isConnected(),
      errors: {
        montant: null,
      },
    }
  },
  mounted() {
  },
  methods: {
    paymentLaunched(){
      alert("payment lunched")
    },
    submit() {
      // hide errors
      Object.keys(this.errors).forEach((i) => this.errors[i] = null);
      this.$axios.post(`comptes_abonne/${loginCredentials.getClientId()}/payment_url`,{montant: this.montant})
        .then(response => {
          try {
            this.showAlertSuccess("Paiement lancé",()=>{
            let url = response.data.launch_url
            this.$emit('hide');
            window.href = "capture://wave:"+url
            })
          } catch (e) {
            console.log(e)
            this.showAlertError("Une erreur s'est produite lors du lancement  de votre paiement ")
          }
        })
    },


      onDialogHide () {
        // required to be emitted
        // when QDialog emits "hide" event
        this.$emit('hide')
      },

      onOKClick () {
        // on OK, it is REQUIRED to
        // emit "ok" event (with optional payload)
        // before hiding the QDialog
        this.$emit('ok')
        // or with payload: this.$emit('ok', { ... })

        // then hiding dialog
        this.hide()
      },

      onCancelClick () {
        // we just need to hide the dialog
        this.hide()
      }
    },

});
</script>
