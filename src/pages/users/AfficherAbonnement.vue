<template>

<div class="row items-end q-pa-lg q-col-gutter-xs ">
  <p class="text-bold">Votre abonnement expire le : </p>
  <p v-if="abonnement != null">{{abonnement.date_expiration}}</p>

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
