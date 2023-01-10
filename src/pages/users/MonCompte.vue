<template>
  <div class="row q-pa-lg">
    <div class="column items-center bg-black col-xs-12">

      <span class="text-white">Solde</span>
      <span class="title-medium text-white">{{solde.toLocaleString()}}</span>
    <q-btn color="primary" no-caps @click="afficherFormulaireRecharge">Recharger mon compte</q-btn>
  </div>
  <div class="column col-xs-12 q-mt-lg">
    <p class="q-mb-lg title-medium text-primary">Abonnement</p>
    <AfficherAbonnement />
  </div>
    <div class="column col-xs-12 q-mt-lg">
    <TransactionItem :transactions="transactions"/>
  </div>
  </div>

</template>

<script>

import loginCredentials from "src/repository/LoginCredentials";
import TransactionItem from "pages/users/TransactionItem.vue";
import AfficherAbonnement from "pages/users/AfficherAbonnement.vue";

export default {
  name: "MonCompte",
  components: {AfficherAbonnement, TransactionItem},
  data() {
    return {
      transactions: [
      ],
      solde: 0,
    }
  },
  methods: {

    loadTransactions(){

      this.$axios.get(`abonnes/transactions/${loginCredentials.getClientId()}`)
        .then(r=>{
          let data = r.getData()
          this.transactions = data.transactions
          this.solde  = data.solde
        }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.loadTransactions()
  }
}
</script>

<style scoped>

</style>
