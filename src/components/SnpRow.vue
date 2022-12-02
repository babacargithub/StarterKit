<template>
<div class="{{'row '+classes}}">
  <slot />
</div>
</template>

<script>
export default {
  name: "SnpRow",
  props: {classes:null}
};
</script>

<style scoped>

</style>
