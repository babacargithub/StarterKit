<template>

<div class="row items-end q-pa-lg q-col-gutter-xs ">
  <p class="text-bold">Votre abonnement expire le : </p>
  <template v-if="abonnement != null">
    <p>{{ abonnement.date_expiration }}</p>
    <p>Formule: {{ abonnement.formule.nom }}</p>
    <p>Prix: {{ abonnement.formule.prix }}</p>
  </template>

</div>
</template>

<script>
import loginCredentials from "src/repository/LoginCredentials";

export default {
  name: "AfficherAbonnement",
  data() {
    return {
      formules: [],
      abonnement: null
    }
  },
  methods: {
    chargerAbonnement() {
      this.$axios.get("abonnes/:id".replace(":id", loginCredentials.getClientId))
        .then(res =>{
          if (res.isSuccessful()) {
            this.abonnement = res.getData().abonnement;
          }
        })

    }
  },
  mounted() {
    this.chargerAbonnement();
  }
}
</script>

<style scoped>

</style>
