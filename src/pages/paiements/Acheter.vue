<template>
<SnpDialog>
  <q-card style="width: 80%">

    <div class="row">
      <div class="column col-12 bg-grey-4 content-center " >
        <img
        alt="Quasar logo"
        src="~assets/wave_logo.png"
        style="width: 150px; height: 150px"
      >
      </div>
      <div class="col-12">
        <h4 class="text-center text-red-10" style="text-align: center; margin-bottom: 1px; line-height: normal">Contenu payant !</h4>
        <p class="text-center text-weight-bolder">Vous devez faire un achat de &nbsp; <span class="title-big text-primary">{{ montant
          }}F</span>  par Wave pour accéder à cette page</p>
        <div class="column q-pa-lg col-lg-12 content-center">
          <q-btn @click="submitPaiement" class="col-lg-12" stretch type="submit"  color="primary"  >Payer &nbsp;<span class="text-weight-bold">{{ montant }}F</span></q-btn>
        <span class="q-ma-lg q-pa-lg text-primary text-center">Vous serez rediriger vers la page pour scanner le QR code pour valider le paiement</span>
        </div>
      </div>
    </div>
  </q-card>
</SnpDialog>
</template>

<script>
import SnpDialog from "components/SnpDialog.vue";
import PrimaryButton from "components/PrimaryButton.vue";
import loginCredentials from "src/repository/LoginCredentials";
export default {
  name: "AcheterParution",
  props: {
    parution: {type: Object, required: true}
  },
  components: {  SnpDialog },
  data() {
    return {
      montant: this.parution.prix,
      telephone: loginCredentials.getClient().telephone,
    };
  },
  methods: {
    submitPaiement() {
      this.$axios.get(`paiements/${this.parution.id}/link`).
        then(r=>{
          if (r.isSuccessful()){
            let url = r.getData().wave_launch_url;
            if (typeof  url !=="undefined" && url !=="") {
              window.location.href = url;
            }
            else {
              console.log(r);
              this.showAlertError("Impossible de lancer le paiement Wave, une erreur s'est produite")
            }
          }
      }).catch(()=>{
        this.showAlertError("Une erreur s'est produite !")
      })
    }
  }
};
</script>

<style scoped>

</style>
