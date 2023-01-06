<template>

<div class="row bg-blue-1 items-end q-pa-lg q-col-gutter-xs " style="background-image: url('assets/formule_bg.png')">
  <div class="col-xs-12" >
    <template v-for="(formule,index) in formules" :key="index">
    <div   class="column col-xs-8 q-mb-lg" style="background-image: url('src/assets/price_bg.png'); height: 300px" >
      <h6 class="text-center text-white  q-mb-none">{{formule.nom}}</h6>
      <q-card class="bg-white q-ma-lg" style="margin-top: 1%; height: 30%">
        <q-card-section class="text-center"><span class="title-big text-black">{{formule.prix.toLocaleString()}}F</span></q-card-section>

      </q-card>

          <q-btn color="white" class="q-ma-lg" text-color="black" push align="center"  rounded stretch >Sélectionner</q-btn>
    </div>
<q-separator></q-separator>
    </template>
  </div>


</div>
</template>

<script>
import loginCredentials from "src/repository/LoginCredentials";

export default {
  name: "CreerAbonnement",
  data() {
    return {
      formules: [],
      abonnement: {formule_id:null, abonne_id: loginCredentials.getClientId()}
    }
  },
  methods: {
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
