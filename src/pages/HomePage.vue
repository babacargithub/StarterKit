<template>
  <q-page class="column items-center">
    <img
      alt="Quasar logo"
      src="public/icons/favicon-128x128.png"
      style="width: 50px; height: 50px"
      class="q-mt-lg"
    >
    <h5 class="text-center">Bienvenue dans Digi Press SN</h5>
    <p class="text-center"> La plateforme pour lire intégralement les journaux sans vous encombrer de papiers</p>
    <q-btn color="primary"  href="#/la_une" no-caps flat > Consulter les unes du jour</q-btn>
    <img
      alt="Pub ici "
      src="~assets/pub_placeholder.png"
      class="q-mt-lg"
    >
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage'
})
</script>
