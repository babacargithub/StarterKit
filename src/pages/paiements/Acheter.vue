<template>
  <q-card>

    <div class="row">
      <div class="column col-12 bg-grey-4 " >
        <div class="q-pa-md">
          <div class="row q-gutter-md">
            <div class="q-pa-md">
              <q-table
                title="Sélectionnez les journaux à acheter"
                :rows="parutions"
                :columns="columns"
                row-key="id"
                selection="multiple"
                hide-bottom
                hide-header
                no-data-label="Aucun journal à acheter"
                hide-pagination
                v-model:selected="selectedParutions"
              >
                <template v-slot:top>
                  <span class="title-medium">Sélectionnez les journaux à acheter</span>

                  <div class="" v-if="selectedParutions.length > 0">
                    <div><span>Total : <span class="title-medium text-primary">{{ totalAPayer.toLocaleString() }}</span></span></div>
                    <q-btn no-caps stretch push rounded color="primary" @click="submitPaiement">
                      <img alt="Logo Wave" src="~assets/wave_logo.png"  style="width: 50px; height: 50px"
                      >
                      Payer : {{ totalAPayer }}</q-btn>

                  </div>
                </template>
                <template v-slot:body-cell-image_la_une="props">
                  <q-td><img
                    alt="Quasar logo"
                    :src="props.row.image_la_une"
                    style="width: 150px; height: 150px"
                  ></q-td>
                </template>
              </q-table>


            </div>
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
import SnpDialog from "components/SnpDialog.vue";
import PrimaryButton from "components/PrimaryButton.vue";
import loginCredentials from "src/repository/LoginCredentials";
import {BASE_SERVER_URL} from "boot/axios";
import moment from "moment";
export default {
  name: "AcheterParution",
  props: {
    parutionDate: {type: String, required: true}
  },
  components: {  },
  data() {
    return {
      columns : [
        { name: 'image_la_une', label: 'Aperçu', field: 'image_la_une' },
      ],
      parutions:[],
      selectedParutions: [],
      telephone: loginCredentials.getClient().telephone,
    };
  },
  methods: {
    submitPaiement() {
      this.$axios.post(`payer`, {parutions: this.selectedParutions}).
        then(r=>{
          if (r.isSuccessful()){
            this.$router.push({name:"la_une"})
            //todo implement later
            // let url = r.getData().wave_launch_url;
            // if (typeof  url !=="undefined" && url !=="") {
            //   window.location.href = url;
            // }
            // else {
            //   console.log(r);
            //   this.showAlertError("Impossible de lancer le paiement Wave, une erreur s'est produite")
            // }
          }
      }).catch(()=>{
        this.showAlertError("Une erreur s'est produite !")
      })
    }
  },
  computed: {
    totalAPayer() {
      let selected =  this.selectedParutions.map((item)=>{ return item.prix})
      return this.selectedParutions.length === 0? 0: selected.reduce((total, item) => total + item);

    }
  },
  mounted() {
    this.$axios.get(`parutions/${moment().format('YYYY-MM-DD')}`)
      .then((response)=>{
        this.parutions = response.data
        this.parutions.map((item)=>{
          item["image_la_une"] = BASE_SERVER_URL+ item.image_la_une
          return item
        })
        this.parutions = this.parutions.filter((item)=>{ return item.achete === false})

      })
  }
};
</script>

<style scoped>

</style>
