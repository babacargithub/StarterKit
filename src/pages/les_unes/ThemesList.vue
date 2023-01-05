<template>
  <div  class="row q-pa-xs">
    <div class="col-12"><h6>Les articles apparus par thème</h6></div>
          <div class="col-xs-6 "  v-for="(theme,index) in themes" :key="theme.id">
            <q-card :color="themeColors[index]">
              <q-card-section @click="showArticles(theme)">
                <h6>{{ theme.nom }}</h6>
              </q-card-section>
              <q-card-section>
                <span>{{theme.nombre_articles}}</span>
              </q-card-section>
            </q-card>

          </div>
        </div>

</template>

<script lang="js">
import { defineComponent } from 'vue';


export default defineComponent({
  name: "ThemesList",
  components: {  },
  data() {
    return {
      themes: [],
      colors: ["danger","primary","success","warning","info","light", "dark","secondary", "tertiary"],
      themeColors: ["danger","primary","success","warning","info","light", "dark","secondary", "tertiary"],
    }
  },
  methods: {

    showArticles(theme) {
      this.$router.push(`/articles/theme/${theme.id}`)
    }
  },
  mounted(){
    this.$axios.get(`themes`)
        .then((response)=>{
          this.themes = response.data
          let cnt = 5;
          this.themes.map((theme)=>{
            cnt = cnt +5;
            theme["nombre_articles"] = cnt;
            return  theme
          })
          /*if (this.themes.length > this.themeColors.length){
            let diff = his.themes.length - this.themeColors.length
            this.themeColors = this.colors.slice(0,diff);
          }*/

        })
  }
});
</script>
