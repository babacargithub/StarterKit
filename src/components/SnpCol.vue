<template>
<div class="{{this.classes}}">
  <slot />
</div>
</template>

<script>
export default {
  name: "SnpCol",
  props: {
    classes: {
      default: "col"
    },
  }
};
</script>

<style scoped>

</style>
