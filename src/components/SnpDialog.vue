<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <div class="q-card">
      <slot/>
      <q-separator></q-separator>
      <q-card-actions align="right" v-if="!hideBottom">
        <q-btn color="primary"  flat label="Fermer" @click="onDialogHide"/>
      </q-card-actions>
    </div>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
const props = defineProps({
  hideBottom: {type: Boolean, default: false}
});
const name = "SnpDialog";

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function onOKClick() {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  onDialogOK();
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
</script>
