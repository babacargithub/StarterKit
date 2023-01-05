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
         DigiPress  SN
        </q-toolbar-title>

        <q-btn v-if="! isMobile" icon="mdi-account" flat outline class="text-weight-light" to="/client">Mon compte </q-btn>
      </q-toolbar>
    </q-header>
    <q-footer elevated>
     <q-tabs   indicator-color="white"  dense  v-if="isMobile" >
         <q-route-tab  v-for="(tab, index) in tabMenuItems" :key="index" :label="tab.label" exact :icon="tab.icon" no-caps :to="tab.link"></q-route-tab>
     </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-item-label header>
        <img
          alt="Quasar logo"
          src="public/icons/favicon-128x128.png"
          style="width: 50px; height: 50px"
        > <span class="text-weight-bolder">DigiPress</span>

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

            <q-item-section class="text-weight-bold" @click="handleMenuClick(link)">
              {{link.title}}
            </q-item-section>


          </template>
          <q-card>
            <q-card-section>
              <q-list>

                <SidebarMenuItem
                  v-for="subitem in link.subItems"
                  v-bind="subitem"
                  :key="subitem.title"
                />
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </template>
    </q-drawer>

    <q-page-container >

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import SidebarMenuItem from 'components/SidebarMenuItem.vue'
import sidebar_menu from './sidebar_menu_items'
import tabMenuItems from './bottom_tabs_menu_items'


export default defineComponent({
  name: 'MainLayout',
  components: {
    SidebarMenuItem
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      alert: ref(false),
      essentialLinks: sidebar_menu,
      tabMenuItems: tabMenuItems,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  methods: {
    handleMenuClick(link) {
      if (typeof  link.handlesClick != "undefined"){
        if (link.handlesClick){
          link.clickHandler();
        }
      }
    }
  },
})
</script>
