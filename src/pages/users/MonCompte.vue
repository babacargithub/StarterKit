<template>
  <div class="row q-pa-lg">
    <div class="column items-center bg-black col-xs-12">
      <span class="text-white">Solde</span>
      <span class="title-medium text-white"> 0F</span>
    <q-btn color="primary" no-caps>Recharger mon compte</q-btn>
  </div>
  <div class="column col-xs-12 q-mt-lg">
    <TransactionItem :transactions="transactions"/>
  </div>
  </div>

</template>

<script>

import loginCredentials from "src/repository/LoginCredentials";
import TransactionItem from "pages/users/TransactionItem.vue";

export default {
  name: "MonCompte",
  components: {TransactionItem},
  data() {
    return {
      transactions: [
      ]
    }
  },
  methods: {
    loadTransactions(){
      this.$axios.get(`abonnes/transactions/${loginCredentials.getClientId()}`)
        .then(r=>{
          this.transactions = r.getData()
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
