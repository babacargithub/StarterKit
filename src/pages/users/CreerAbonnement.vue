<template>

  <div v-if="estAbonne == false">
    <h6 class="q-ma-lg">Choisissez une formule pour vous abonner</h6>
    <div class="row items-end q-pa-lg q-col-gutter-xs ">
      <div class="col-xs-12">
        <template v-for="(formule,index) in formules" :key="index">
          <div class="column col-xs-8 q-mb-lg rounded-borders"
               style="background-image: url('src/assets/price_bg.png');  height: 300px">
            <h6 class="text-center text-white  q-mb-none">{{ formule.nom }}</h6>
            <q-card class="bg-white q-ma-lg" style="margin-top: 1%; height: 30%">
              <q-card-section class="text-center">
                <span class="title-big text-black">{{ formule.prix.toLocaleString() }}F</span>
                <p class="text-grey-14">{{ formule.duree }} jrs</p>
              </q-card-section>
              <q-card-actions align="center">
                <q-btn color="primary" size="md" class="q-ma-lg" text-color="white" align="center" no-caps rounded
                       glossy @click="creerAbonnement(formule)">Sélectionner
                </q-btn>

              </q-card-actions>
            </q-card>

          </div>
          <q-separator></q-separator>
        </template>
      </div>


    </div>

  </div>
  <div v-else>
    <AfficherAbonnement />
  </div>
</template>

<script>
import loginCredentials from "src/repository/LoginCredentials";
import AfficherAbonnement from "pages/users/AfficherAbonnement.vue";

export default {
  name: "CreerAbonnement",
  components: {AfficherAbonnement},
  data() {
    return {
      formules: [],
      abonnement: {formule_id:null, abonne_id: loginCredentials.getClientId()}
    }
  },
  methods: {
    creerAbonnement(formule){
      this.showConfirm("Vous allez vous abonner sur cette formule ?", ()=>{
        this.abonnement.formule_id = formule.id
        this.$axios.post("abonnements",this.abonnement)
          .then(response => {
            if (response.isCreatedSuccessfully()){
              loginCredentials.saveAbonnement(response.getData())
              this.showAlertSuccess("Abonnement crée avec succès !", ()=>{
                this.$router.push({name: "resume_index"})
              });
            }
          })
      })


    },
    loadFormules() {
      this.$axios.get("formules")
        .then(res =>{
          if (res.isSuccessful()) {
            this.formules = res.getData();
          }
        })

    }
  },
  mounted() {
    this.loadFormules();
  }
}
</script>

<style scoped>

</style>
