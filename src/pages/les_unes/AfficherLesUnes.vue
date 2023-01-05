<template>
  <div class="row q-ma-lg" >

    <div class="col-xs-12 q-mb-lg" v-for="parution in parutions" :key="parution.id">
      <q-card>
        <q-card-section class="text-center bg-blue-grey-3"><span class="title-medium text-primary ">{{ parution.journal }}</span></q-card-section>
        <q-separator></q-separator>
        <q-card-section>
          <q-img :src="parution.image_la_une" @click="acheterJournal(parution)"></q-img>
          <q-separator></q-separator>
        </q-card-section>
          <q-separator></q-separator>
        <q-card-section>
          <q-btn class="full-width"  v-if="parution.achete" color="primary" rounded  @click="lireJournal(parution)">Lire </q-btn>
          <q-btn  class="full-width" v-else color="primary" rounded  @click="acheterJournal(parution)">Acheter </q-btn>
        </q-card-section>
      </q-card>
    </div>
  </div>

</template>

<script lang="js">
import { defineComponent } from 'vue';
import moment from "moment";
let today = moment().format("YYYY-MM-DD")
export default  defineComponent({
  name: 'AfficherLesUnes',
  props:{
    parutions: {type:Array, required: true}
  },
  data() {
    return {
      parutionRows: []
    }
  },
  methods: {
    lireJournal(item) {
      // this.$router.push(`/parution/${item.id}/pages`);
      this.$router.push({name:"a_la_une_pages", params:{parution: item.id}});
    },
    acheterJournal(item) {
      this.$router.push({name:"acheter", params:{parutionDate: today, item:item}});
    }
  },
  mounted() {
    this.parutionRows = this.parutions
  }
});
</script>
