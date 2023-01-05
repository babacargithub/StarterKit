<template>
<h6 class="q-ma-lg">Résumé des émissions les plus importantes </h6>
  <template v-for="(resume,index) in resumes " :key="index">
    <q-card >
      <q-card-section class="text-center bg-grey-4"><span class="title-small text-black ">{{ resume.titre }}</span>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <q-img :src="resume.image" @click="afficherResume(resume)"></q-img>
        <q-separator></q-separator>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <q-btn class="" color="primary" rounded @click="afficherResume(resume)">Afficher</q-btn>
      </q-card-section>
    </q-card>

    <q-separator></q-separator>
  </template>
</template>

<script>
import {BASE_SERVER_URL} from "boot/axios";

export default {
  name: "ResumesIndex",
  data() {
    return {
      resumes: []
    }
  },
  methods: {
    afficherResume(resume){
      this.$router.push({name:"resume_afficher", params:{ id: resume.id}})
    },
    loadResumes() {
      this.$axios.get("resumes")
        .then(response => {
          if (response.isSuccessful()){
            this.resumes = response.getData()
            this.resumes.map((item)=>{
              item["image"] = BASE_SERVER_URL+ item.image
              return item
            })

          }
        })
    }
  },
  mounted() {
    this.loadResumes()
  }
}
</script>

<style scoped>

</style>
