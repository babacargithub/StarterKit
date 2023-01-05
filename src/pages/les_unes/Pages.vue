<template>

    <div class="q-pa-md">
      <q-list bordered class="rounded-borders">
        <template   v-for="(page, index) in pages" :key="index">
          <q-expansion-item
            expand-separator
            icon="mdi-newspaper"
            :label="'Page ' + page.numero"
            :caption=" page.articles.length + ' articles'"

          >
            <template v-for="(article, index) in page.articles" :key="index">
              <q-card class="q-ma-md">
                <q-card-section><span class="title-small">{{ article.titre }}</span></q-card-section>
                <q-card-section>
                  <q-btn color="primary" rounded @click="showArticle(article)">Lire</q-btn>
                </q-card-section>
              </q-card>
            </template>
          </q-expansion-item>
        </template>

      </q-list>
    </div>

</template>

<script lang="js">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "PagesList",
  data() {
    return {
      pages: []
    }
  },
  methods: {
    getPageTitle(pageNumber){
      return "Page Numéro " + pageNumber
    },
    getNombreArticles(page){
      return page.articles.length + "articles"
    },
    showArticles(page) {
      this.$router.push(`articles/page/${page.id}`)
    },
    showArticle(article) {
      this.$router.push({name:"a_la_une_lire_article",params:{article: article.id}})
    }
  },
  mounted(){
    this.$axios.get(`parutions/${this.$route.params.parution}/pages`)
        .then((response)=>{
          this.pages = response.data
          console.log(this.pages)
          this.pages.map((page)=>{
             page.articles.map((item)=>{
              item["image"] = process.env.VUE_APP_BASE_SERVER_URL+item.image
               return item
            })
            return page
          })
        })
  }
});
</script>
