<template>
  <div class="flex flex-center q-ma-lg" v-if=" ! isConnected">
    <q-card  class="col-lg-12" >
      <q-card-section>
        <p class="text-weight-bolder">Se connecter</p>
        <p class="secondary">Vous devez vous connecter avec votre numéro de téléphone</p>
      </q-card-section>
      <q-card-section>
        <form @submit.prevent="submit" v-if="! this.shouldShowOtpInput" >
          <q-input required type="number" outlined rounded inputmode="tel" minlength="9" maxlength="9" placeholder="Téléphone" label="Téléphone" :error="errors.telephone != null" :error-message="errors.telephone"
                   v-model.number="telephone" :disable="shouldShowOtpInput"></q-input>
          <primary-button type="submit" class="q-mr-lg" id="sign-in-button" icon-right="chevron_right"  >Suivant</primary-button>

        </form>
        <q-separator class="q-mt-lg"></q-separator>
        <q-card-section>
          <p>Vous n'avez pas encore de compte ?<br>
            <q-btn flat unelevated no-caps class="text-blue-5" fill="outline" @click="creerCompte">Créer un
              compte
            </q-btn>
          </p>
        </q-card-section>
      </q-card-section>
<!--      Otp code section -->
      <q-card-section v-if="this.shouldShowOtpInput">
        <form v-if="this.shouldShowOtpInput" @submit.prevent="checkOtpCode">
          <span>Veuillez saisir le code de vérification reçu par SMS sur le numéro {{telephone}}</span>
          <q-input  required type="number"  rounded outlined inputmode="number" minlength="9" maxlength="9" placeholder="Code de 6 chiffres" @keyup="errors.otp_code = null"  label="Code OTP" :error="errors.otp_code != null" :error-message="errors.otp_code" v-model="otp_code">
          </q-input>
          <primary-button outline class="q-mr-lg" color="secondary" type="submit" >Verifier Code OTP</primary-button>
        </form>
      </q-card-section>

    </q-card>
  </div>
<!--    Afficher client section si le client est connecté -->
    <div v-else class="q-ma-lg">
      <span class="text-weight-bolder">Vous êtes connecté</span>
      <q-btn color="primary" stretch class="text-weight-bolder" @click="deconnexion">Déconnexion</q-btn>
        <AfficherClient :client="client" v-if="client != null" />

    </div>



</template>
<style>

</style>
<script >
import { defineComponent } from 'vue';
import Inscription from "pages/users/Inscription.vue";
import PrimaryButton from "components/PrimaryButton.vue";
import loginCredentials from "src/repository/LoginCredentials";
import {app} from "src/plugins/firebase"
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'
const auth = getAuth(app);
auth.languageCode = 'fr';
import {isValidPhoneNumber } from 'src/utils/phone_number_validator';
import { QSpinnerGears } from "quasar";
import AfficherClient from "pages/users/AfficherClient.vue";

export default defineComponent({
  name: 'LoginPage',
  components: {
    AfficherClient,
    PrimaryButton
  },
  data() {
    return {
      isUpdating: false,
      isConnected: loginCredentials.isConnected(),
      shouldShowOtpInput: false,
      telephone: null,
      otp_code: null,
      errors:{
        telephone: null,
        otp_code: null
      },
      client: null,
    }
  },
  mounted() {
    if (loginCredentials.isConnected()){
      this.client = loginCredentials.getClient();
    }


  },
  methods: {
    creerCompte(){
      this.$q.dialog({
        component: Inscription,
        componentProps: {
          phoneNumber: this.telephone
        }
      })
    },

    submit() {
      this.errors.otp_code = null
      if (isValidPhoneNumber(this.telephone)){
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
          'size': 'invisible',
          'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // onSignInSubmit();
          }
        }, auth);
        this.showLoading()
        const phoneNumber = '+221'+this.telephone;
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            this.shouldShowOtpInput = true
            // ...
          })
          .catch((error) => {
            console.log(error);
            console.log('SMS not sent');
            // Error; SMS not sent
            // ...
          }).finally(()=>{
          this.hideLoading()
        });
      }else{
        this.errors.telephone = "Le numéro téléphone saisi n'est pas valide !"
      }


    },

    checkOtpCode(){
      let otp = Number(this.otp_code)
      if (otp.toString().length === 6) {
        this.showCustomizedDialog()
        window.confirmationResult.confirm(this.otp_code)
          .then((result) => {
            // User signed in successfully.
            this.hideLoading()
            const user = result.user;
            this.$axios.get(`abonnes/phone_number/${this.telephone}`).
            then((r)=>{
              // if client exists
              if (r.isSuccessful()){
                //client exists
                loginCredentials.setAsLoggedIn()
                let client = r.getData();
                if (typeof client.prenom =='undefined' && typeof client.telephone =='undefined' ){
                  loginCredentials.logout()
                  this.showAlertError("Impossible de sauvegarder les données de connexion, une erreur  serverur s'est produite ! ")
                }else {
                  loginCredentials.saveClient(client)
                  this.$router.push(this.$route.query.redirect)

                }
              }
              // client n'existe pas, on affiche le formulaire d'inscription

            }).catch(e=>{
              if (e.isNotFound()){
                this.creerCompte()
              }
              else {
                this.showAlertError("Une erreur du coté du serveur s'est produite ! ")
              }
            })

            // ...
          }).catch((error) => {
          this.showAlertError("On n'a pas pu vérifier le code OTP renseigner veuillez réessayer")
          // User couldn't sign in (bad verification code?)
          console.log(error);
          // ...
        }).finally(() => {
          this.hideLoading()
        });
      }else {
        this.errors.otp_code = "Le code saisi doit être exactement de 6 chiffres"
      }
    },

    showCustomizedDialog(){
      this.$q.loading.show({
        spinner: QSpinnerGears,
        spinnerColor: 'primary',
        messageColor: 'black',
        backgroundColor: 'secondary',
        message: 'Vérification...'
      })
    },
    deconnexion(){
      loginCredentials.logout()
      this.client = null
      this.isConnected =  loginCredentials.isConnected()

    },
  },
});
</script>
