<template>
  <ui5-dialog ref="dialog">
    <div slot="header">
      <ui5-title level="H1" style="margin: 1rem 0">Your name</ui5-title>
    </div>
    <ui5-title style="text-align: center">{{ props.name }}</ui5-title>
    <div slot="footer">
      <ui5-button @click="closeDialog" style="margin: 0.5rem 0"
        >Close</ui5-button
      >
    </div>
  </ui5-dialog>
</template>

<script setup>
import { ref } from "vue";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-fiori/dist/Bar.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Dialog.js";

const props = defineProps({ name: String });

const dialog = ref(null);

function openDialog() {
  dialog.value.show();
}

function closeDialog() {
  dialog.value.close();
}

defineExpose({ openDialog });
</script>
