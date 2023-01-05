<template>
  <q-dialog v-model="dialogRef"  @hide="onDialogHide"  >
           <q-card class="col-12" style="max-width: 100%" >
          <q-card-section>
            <p class="text-weight-bolder text-primary">Pour créer un compte</p>
            <p class="text-weight-bold text-secondary">Remplir vos informations de compte</p>
          </q-card-section>
          <q-card-section>
            <form @submit.prevent="submit">
                <q-input required autocapitalize="words" outlined  placeholder="Nom complet" v-model="client.nom_complet" label="Nom Complet" :error="errors.nom_complet != null"
                         bg-color="secondary"   :error-message="errors.nom_complet" ></q-input>

              <q-input required type="number" outlined  inputmode="tel" minlength="9" maxlength="9" placeholder="Téléphone"
                           v-model="client.telephone"
                       v-if="phoneNumber == null" label="Téléphone" :error="errors.telephone != null" :error-message="errors.telephone" bg-color="secondary">
              </q-input>

              <q-input required type="email" inputmode="email" placeholder="Email" outlined bg-color="secondary"
                           v-model="client.email"
                         label="Email" :error="errors.email != null" :error-message="errors.email"></q-input>

              <primary-button type="submit" fill="outline" shape="round"><span v-if="! isUpdating">Créer mon compte</span><span v-else>Enregistrer</span></primary-button>
              <q-btn fill="outline" shape="round" @click="afficher_formulaire = false; isUpdating = false" v-if="isUpdating">Annuler</q-btn>

            </form>
          </q-card-section>
        </q-card>




  </q-dialog>
</template>
<style>

</style>
<script >
import { defineComponent } from 'vue';
import SnpCol from "components/SnpCol.vue";
import SnpRow from "components/SnpRow.vue";
import loginCredentials from "src/repository/LoginCredentials";
import PrimaryButton from "components/PrimaryButton.vue";

export default defineComponent({
  name: 'InscriptionPage',
  props: {
    phoneNumber: {default: null}
  },
  components: {
    PrimaryButton,

  },
  emits: [
    // REQUIRED
    'ok', 'hide'
  ],
  data() {
    return {
      dialogRef: true,
      afficher_formulaire: ! loginCredentials.isConnected(),
      isUpdating: false,
      est_connecte: loginCredentials.isConnected(),
      client: {
        nom_complet: null,
        telephone: this.phoneNumber,
        email: null
      },
      errors: {
        nom_complet: null,
        telephone: null,
        email: null
      },
    }
  },
  mounted() {
    if (loginCredentials.isConnected()) {
      this.client = loginCredentials.getClient();
    }
  },
  methods: {
    submit() {
      // hide errors
      Object.keys(this.errors).forEach((i) => this.errors[i] = null);
      if (! this.isUpdating){
        this.create()
      }else{
        this.update(this.client.id, this.client)
      }

    },
    update(client_id, client_data){
      this.$axios.put('abonnes/'+client_id,client_data)
          .then((r)=>{
            if (r.isSuccessful()){
              this.showAlertSuccess('Votre compte a été mis à jour avec succès !',()=>{
                let client = r.getData().data
                loginCredentials.saveClient(client)
                loginCredentials.setAsLoggedIn()
                this.isUpdating = false
                this.afficher_formulaire = false
              })
            }
          }).catch((r)=>{

        if (r.isUnprocessableEntity()) {
          let errors = r.getData().errors
          if (errors != null){
            for (const error of Object.keys(errors)){
              this.errors[error] = errors[error][0]
            }
          }
        }
      })
    },
    create(){

      this.$axios.post('abonnes',this.client)
          .then((r)=>{
            if (r.isSuccessCreated || r.isSuccessful()){
              this.showAlertSuccess('Votre compte a été crée avec succès !',()=>{
                let client = r.getData()
                loginCredentials.saveClient(client)
                loginCredentials.setAsLoggedIn()
                this.afficher_formulaire = ! loginCredentials.isConnected()
                this.$router.push('/');
              })
            }
          }).catch((r)=>{

        if (r.isUnprocessableEntity()) {
          let errors = r.getData().errors
          if (errors != null){
            for (const error of Object.keys(errors)){
              this.errors[error] = errors[error][0]
            }
          }
        }
      })
    },
       // following method is REQUIRED
      // (don't change its name --> "show")
      show () {
        this.$refs.dialog.show()
      },

      // following method is REQUIRED
      // (don't change its name --> "hide")
      hide () {
        this.$refs.dialog.hide()
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
