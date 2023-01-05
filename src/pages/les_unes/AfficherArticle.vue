<template>
  <div class="q-ma-md">
    <p v-if="article != null" class="title-medium text-primary q-ml-auto">{{ article.titre }}</p></div>

      <div v-if="article != null">

        <div class="text-center text-bold q-ma-lg">{{article.sous_titre}}</div>
        <div style="text-align: justify; margin: 1%; padding: 5%">{{article.contenu}}</div>
      </div>
      <div v-else><h4>Aucun article à afficher</h4></div>

</template>
<style>
.bigText{
  font-weight: bold;
  font-size: large;
}
</style>
<script lang="js">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AfficherArticle',
  data() {
    return {
      article: null
    }
  },
  mounted(){
    this.$axios.get(`articles/${this.$route.params.article}`)
        .then((response)=>{
          this.article = response.data
          /*this.parutions.map((item)=>{
            item["image_la_une"] = "http://127.0.0.1:8000/"+ item.image_la_une
            return item
          })*/
        })
  }
});
</script>
