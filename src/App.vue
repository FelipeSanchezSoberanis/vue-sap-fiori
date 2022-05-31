<script>
import { RouterView } from "vue-router";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import "bootstrap/dist/css/bootstrap-grid.css";
import "bootstrap/dist/css/bootstrap-utilities.css";

export default {
  setup() {
    setTheme("sap_fiori_3_dark");

    return { RouterView };
  }
};
</script>

<template>
  <RouterView />
</template>
