<template>
  <q-page class="column items-center">
    <img
      alt="Quasar logo"
      src="public/icons/favicon-128x128.png"
      style="width: 50px; height: 50px"
      class="q-mt-lg"
    >
    <h5 class="text-center">Bienvenue dans le Projet</h5>
    <p class="text-center"> Message de bienvenue </p>
    <img
      alt="Pub ici "
      src="public/icons/favicon-128x128.png"
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
