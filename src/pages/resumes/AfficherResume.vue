<template>
  <template v-if="resume != null"><h6>
    {{ resume.titre }} </h6>
    <q-card>
      <q-card-section >
        <span v-html="resume.contenu"></span>
        <q-separator></q-separator>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
      </q-card-section>
    </q-card>
  </template>
</template>

<script>
import {BASE_SERVER_URL} from "boot/axios";

export default {
  name: "ResumesIndex",
  props:["id"],

  data() {
    return {
      resume: null
    }
  },
  methods: {
    loadResumes() {
      this.$axios.get("resumes/"+this.id)
        .then(response => {
          if (response.isSuccessful()){
            this.resume = response.getData()

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
