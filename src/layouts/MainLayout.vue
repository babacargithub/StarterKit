<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-4 ">
    <q-header elevated >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          v-if=" ! $q.platform.is.electron"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Senapel SA
        </q-toolbar-title>

        <q-btn icon="mdi-account" flat outline class="text-weight-light" to="/client">Mon compte </q-btn>
      </q-toolbar>
    </q-header>
    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title class="text-left text-weight-thin" @click="showDialog">@Copyright Senapel SA</q-toolbar-title>
        <q-toolbar-title class="text-rifht text-weight-thin" @click="showDialog">Contact +221 77 330 08 53, email contact@senapel.com</q-toolbar-title>
      </q-toolbar>
    </q-footer>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-item-label
        header
      >

        <img
          alt="Quasar logo"
          src="~assets/logo_Senapel.svg"
          style="width: 50px; height: 50px"
        > <span class="text-weight-bolder">Senapel</span>

      </q-item-label>

      <template   v-for="link in essentialLinks"
                  :key="link.title">
        <q-expansion-item
          :hide-expand-icon="!(typeof link.subItems !='undefined' && link.subItems.length > 0)"
          expand-separator
          :default-opened="link.open"
        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon :name="link.icon" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section class="text-weight-bold">
              {{link.title}}
            </q-item-section>


          </template>
          <q-card>
            <q-card-section>
              <q-list>

                <EssentialLink
                  v-for="subitem in link.subItems"
                  v-bind="subitem"
                  :key="subitem.title"
                />
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </template> </q-drawer>

    <q-page-container >

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import moment from "moment";
import Acheter from "pages/paiements/Acheter.vue";
let today = moment().format('Y-M-D')
let moisActuel = moment().format('M')
let anneeActuel = moment().format('Y')
const linksList = [
  {
    title: 'Aujourd\'hui',
    caption: 'quasar.dev',
    icon: 'ion-calendar',
    link: '/parution/${today}/dans/soleil',
    open: true,
    subItems:[
      {
        title: 'Parus dans le Soleil',
        caption: 'Les appels d\'offre',
        icon: 'mdi-calendar',
        link: `/parution/${today}/dans/soleil`,
      },{
        title: 'Les appels',
        caption: 'Les appels d\'offre',
        icon: 'book',
        link: `/appels/${today}`,
      },
      {
        title: "Avis d'attribution",
        caption: 'Les avis d\'attribution',
        icon: 'ion-trophy',
        link: '/avis/'+today,
      },
      {
        title: 'La Une des journaux',
        caption: 'La une des journaux',
        icon: 'mdi-newspaper',
        link: '/la_une',
      },
    ]
  },
  {
    title: 'Archives',
    open: false,
    caption: 'les archives',
    icon: 'archive',
    link: '/archive',
    subItems:[
      {
        title: 'Archives',
        caption: null,
        icon: 'list',
        link: `/archives/mois/${moisActuel}/annee/${anneeActuel}`,
      }]
  },
  {
    title: 'Services SENAC SA',
    caption: 'forum.quasar.dev',
    icon: 'mdi-account',
    link: '/offres_senac',
    open: false,
    subItems: [
      {
        title: 'Les offres de SENAC SA',
        caption: 'Détails des offres',
        icon: 'mdi-cart',
        link: '/offres_senac',
      },
      {
        title: 'Contacts Senac',
        caption: 'contacter SENAC',
        icon: 'mdi-phone',
        link: '/contact_senac',
      },
    ]
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      alert: ref(false),
      today: today,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
