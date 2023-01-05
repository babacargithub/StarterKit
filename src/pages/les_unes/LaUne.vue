<template>

  <q-toolbar fixed class="bg-grey-5"><h6 class="q-ma-lg text-black">La Une des journaux du &nbsp; {{ aujoudhui }}</h6></q-toolbar>
  <q-separator></q-separator>
      <AfficherLesUnes :parutions="parutions" v-model="parutions"/>

</template>

<script lang="js">
import { defineComponent } from 'vue';
import AfficherLesUnes from "pages/les_unes/AfficherLesUnes.vue";
import {BASE_SERVER_URL} from "boot/axios";
import moment from "moment";

let today = moment().format("YYYY-MM-DD");


export default  defineComponent({
  name: 'LaUne',
  components: {AfficherLesUnes},
  data() {
    return {
      parutions:[],
      aujoudhui: moment(today).format("D  MMMM  YYYY")
    }
  },
  methods: {
    onLaUneJournalClicked(item) {
      this.$router.push(`/parution/${item.id}/pages`);
    }
  },
  mounted(){

    this.$axios.get(`parutions/${today}`)
      .then((response)=>{
        this.parutions = response.data
        this.parutions.map((item)=>{
          item["image_la_une"] = BASE_SERVER_URL+ item.image_la_une
          return item
        })

      }).catch((r)=>{
      console.log(r)
    })
  }
});
</script>
