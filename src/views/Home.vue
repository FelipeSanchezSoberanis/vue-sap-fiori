<template>
  <ui5-bar class="position-relative">
    <ui5-label class="position-absolute">UI5 Walkthrough</ui5-label>
    <ui5-button
      class="position-absolute me-5"
      style="margin-left: 100%"
      icon="hello-world"
      design="Transparent"></ui5-button>
  </ui5-bar>

  <main class="px-5 py-4">
    <ui5-title class="text-center text-sm-start" level="H1"
      >Hello{{ name.length ? ", " + name : "" }}!</ui5-title
    >

    <hr style="color: whitesmoke; margin: 1rem 0" />

    <div class="row gx-0 gy-3">
      <ui5-button
        class="col-md-auto me-md-3"
        icon="world"
        :disabled="!name.length"
        @click="openDialog"
        >Say hello with dialog</ui5-button
      >
      <ui5-button
        class="col-md-auto me-md-3"
        @click="showToast"
        :disabled="!name.length"
        >Say hello</ui5-button
      >
      <ui5-input
        class="col-md-auto"
        placeholder="Write your name"
        :valueState="name.length ? null : 'Error'"
        :value="name"
        @input="name = $event.target.value"></ui5-input>
    </div>

    <Dialog :name="name" ref="dialog" />

    <ui5-toast id="wcToastBE" placement="BottomEnd" ref="toast"
      >Hi, {{ name }}</ui5-toast
    >

    <hr style="color: whitesmoke; margin: 1rem 0" />

    <InvoiceTable />
  </main>
</template>

<script setup>
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-fiori/dist/Bar.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/Toast.js";

import { ref } from "vue";

import Dialog from "../components/Dialog.vue";
import InvoiceTable from "../components/InvoiceTable.vue";

const name = ref("");

const dialog = ref(null);
const toast = ref(null);

function openDialog() {
  dialog.value.openDialog();
}

function showToast() {
  toast.value.show();
}
</script>
