<template>
  <q-card>

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


                </template>
                <template v-slot:body-cell-image_la_une="props">
                  <q-td><img
                    alt="Quasar logo"
                    :src="props.row.image_la_une"
                    style="width: 150px; height: 150px"
                  ></q-td>
                </template>
              </q-table>
              <div class="col-xs-6 q-mt-lg" v-if="selectedParutions.length > 0">
                <q-card class="q-pa-lg">
                  <p >
                    <span class="title-big bg-black text-white">Total : </span>
                    <span class="q-ml-lg title-very-big text-primary bg-white">{{ totalAPayer.toLocaleString() }}F</span>
                  </p>
                  <q-btn class="" v-if="selectedParutions.length > 0 && ! soldeInsuffisant" no-caps rounded color="primary"
                         @click="submitPaiement">
                    Valider l'achat
                  </q-btn>
                </q-card>

              </div>
              <div class="row q-mt-lg q-gutter-xs" v-if="soldeInsuffisant && selectedParutions.length > 0">

                <p class="text-primary bg-white rounded-borders q-pa-lg">
                  <q-icon name="mdi-alert" size="lg"></q-icon>
                  Votre solde DigiPress est insuffisant ! Vous devez recharger d'abord votre compte avant de pouvoir faire un chat

                  <q-btn class="q-mt-md" no-caps outline rounded color="primary" @click="submitPaiement">
                    Réessayer
                  </q-btn>
                </p>

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
      soldeInsuffisant: false,
    };
  },
  methods: {
    submitPaiement() {
      this.$axios.post("comptes_abonne/:id/solde_disponible".replace(":id", loginCredentials.getClientId()), {montant: this.totalAPayer})
        .then(response =>{
          if (response.isSuccessful()){
            let data = response.getData()
            if (data.solde_disponible){
              this.$axios.post(`payer`, {parutions: this.selectedParutions}).
              then(r=>{
                if (r.isSuccessful()){
                  this.$router.push({name:"la_une"})
                }
              }).catch(()=>{
                this.showAlertError("Une erreur s'est produite !")
              })

            }else {
              this.soldeInsuffisant = true
              this.showAlertError("Votre solde est insuffisant ! Rechargez votre compte pour continuer",()=>{
                this.afficherFormulaireRecharge()
              })
            }
          }
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
