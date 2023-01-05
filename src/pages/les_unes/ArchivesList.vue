<template>
      <div class="div q-ma-lg">
        <h6>Les archives</h6>
        <q-card>
          <q-card-section>
            <q-list  padding separator>
              <q-item clickable v-for="journee in journees" :key="journee.id" @click="showParutions(journee)">
                Les Unes du : {{ journee.date_parutions }}
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

</template>

<script lang="js">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ArchivesList',
  components: {},
  data() {
    return {
      journees: []
    }
  },
  methods: {
    showParutions(journee) {
      this.$router.push({ name: 'archives_search', params: { date_parutions:  journee.date_parutions} })

      // this.$router.push("archives_search",{":date_"})
      // this.$router.push(`/tabs/archives/search/parution/${journee.date_parutions}`)
    }
  },
  mounted(){
    this.$axios.get("journees")
        .then((response)=>{
          this.journees = response.data
          /*this.parutions.map((item)=>{
            item["image_la_une"] = "http://127.0.0.1:8000/"+ item.image_la_une
            return item
          })*/
        })
  }
});
</script>
