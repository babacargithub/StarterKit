<template>

      <div>
        <p class="title-small q-ma-lg">Les Unes du : {{ dateArchiveFormate }}</p>
        <AfficherLesUnes :parutions="parutions"/>
      </div>

</template>

<script lang="js">
import { defineComponent } from 'vue';
import AfficherLesUnes from "pages/les_unes/AfficherLesUnes.vue";
import moment from "moment";
import {BASE_SERVER_URL} from "boot/axios";
export default defineComponent({
  name: 'AfficherArchive',
  components: {AfficherLesUnes},
  data() {
    return {
      parutions: [],
      dateArchiveFormate: moment(this.$route.params.date_parutions).format('DD-MM-YYYY'),
    }
  },
  methods: {
    showParutions() {
      this.$axios.get(`/parutions/${this.$route.params.date_parutions}`)
      .then((response)=>{
        this.parutions =  response.data
        this.parutions.map((item)=>{
          item["image_la_une"] = BASE_SERVER_URL+ item.image_la_une
          return item
        })
      }).catch((e)=>{
        alert("Impossible de retourner les donnée "+e.toString());
      })
    }
  },
  mounted(){
    this.showParutions()

  }
});
</script>
