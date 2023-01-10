<template>
  <div class="q-pa-md">
    <p class="q-mb-lg title-medium text-primary">Historique achats</p>
    <q-list bordered class="rounded-borders">

      <template v-for="(transaction, index ) in transactions" :key="index">
        <q-item class="bg-white" >
          <q-item-section avatar>
            <q-avatar>
              <img
                alt="Pub ici "
                src="~assets/wave_logo.png"
              >
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1" class="text-bold">{{ transaction.label }}</q-item-label>
            <q-item-label caption lines="2">
              <span class="text-weight-bold ">Le</span>
              {{ transaction.created_at }}
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <span class="title-small text-primary">{{ transaction.prix }}F </span></q-item-section>
        </q-item>

        <q-separator inset="item"/>
      </template>
    </q-list>
  </div>
</template>

<script>
export default {
  props: {transactions: {type:Array, required: true}},
  name: "TransactionItem"
}
</script>

<style scoped>

</style>
