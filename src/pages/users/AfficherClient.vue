<template>
  <div class="row">
    <div class="col-lg-12 col-md-12 col-xs-12">
      <q-card>
        <q-tabs
          v-model="tab"
          class="bg-primary text-white rounded-borders"
          active-color="dark"
          indicator-color="primary"
          active-bg-color="white"
          content-class="border"
          align="justify"

        >
          <q-tab name="profile" label="Profile" />
          <q-tab name="achats" label="Achats effectués" />
          <q-tab name="params" label="Paramètres" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="text-dark   rounded-borders">
          <q-tab-panel name="profile">
            <q-list>
              <q-item><q-item-label>{{ client.nom_complet }}</q-item-label></q-item>
              <q-item>{{ client.telephone }}</q-item>
              <q-item>{{ client.email }}</q-item>
            </q-list>

            <q-btn fill="outline" shape="round" @click="modifier" color="primary" push>Modifier compte</q-btn>
          </q-tab-panel>

          <q-tab-panel name="achats">
            <h3>Les achats effectués par votre compte dans l'achat des parutions</h3>
          </q-tab-panel>
          <q-tab-panel name="params">
            <h3>Préférences</h3>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div></div>

</template>

<script>
export default {
  name: "AfficherClient",
  props: {
    client:{type: Object, required: true}
  },
  data() {
    return {
      tab: 'profile',
      fields: Object.keys(this.client)
    };
  },
  methods: {
    modifier() {

    }
  }
};
</script>

<style scoped>

</style>
