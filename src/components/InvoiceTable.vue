<template>
  <ui5-busy-indicator
    active
    size="Large"
    style="width: 100%"
    v-if="loadingInvoices"></ui5-busy-indicator>

  <div v-else class="row g-0 gy-3 justify-content-end">
    <ui5-select
      class="select col-12 col-sm-auto me-sm-3"
      @change="groupInvoices"
      ref="groupByDiv">
      <ui5-option>None</ui5-option>
      <ui5-option accessibleName="ShipperName">Supplier</ui5-option>
      <ui5-option accessibleName="Status">Status</ui5-option>
    </ui5-select>

    <ui5-input
      class="col-12 col-sm-auto"
      placeholder="Enter search criteria"
      :value="searchTerm"
      @input="searchInInvoices($event.target.value)">
      <ui5-icon name="cancel" slot="icon" @click="clearSearch"></ui5-icon>
    </ui5-input>
  </div>

  <ui5-table
    sticky-column-header
    mode="SingleSelect"
    class="demo-table"
    no-data-text="No invoices found"
    v-if="!loadingInvoices">
    <ui5-table-column slot="columns">
      <span>Product</span>
    </ui5-table-column>

    <ui5-table-column slot="columns">
      <span>Quantity</span>
    </ui5-table-column>

    <ui5-table-column slot="columns">
      <span>Price</span>
    </ui5-table-column>

    <ui5-table-column
      slot="columns"
      min-width="800"
      popin-text="Supplier"
      demand-popin>
      <span>Supplier</span>
    </ui5-table-column>

    <ui5-table-column
      slot="columns"
      min-width="800"
      popin-text="Shipped date"
      demand-popin>
      <span>Shipped date</span>
    </ui5-table-column>

    <ui5-table-column
      slot="columns"
      min-width="400"
      popin-text="Status"
      demand-popin>
      <span style="display: inline-block; width: 100%; text-align: center"
        >Status</span
      >
    </ui5-table-column>

    <ui5-table-row
      v-if="!groupByTerm.length"
      v-for="invoice in shownInvoices"
      @click="seeInvoiceDetails(invoice)">
      <ui5-table-cell>{{ invoice.ProductName }}</ui5-table-cell>
      <ui5-table-cell>{{ invoice.Quantity }}</ui5-table-cell>
      <ui5-table-cell>{{ invoice.ExtendedPrice.toFixed(2) }}</ui5-table-cell>
      <ui5-table-cell>{{ invoice.ShipperName }}</ui5-table-cell>
      <ui5-table-cell>{{ invoice.ShippedDate }}</ui5-table-cell>
      <ui5-table-cell
        style="text-align: center; font-weight: bold"
        :class="getElementStatus(invoice.Status)"
        >{{ invoice.Status }}</ui5-table-cell
      >
    </ui5-table-row>

    <template v-else v-for="groupedInvoices in Object.keys(shownInvoices)">
      <ui5-table-group-row>{{ groupedInvoices }}</ui5-table-group-row>

      <ui5-table-row
        v-for="invoice in shownInvoices[groupedInvoices]"
        @click="seeInvoiceDetails(invoice)">
        <ui5-table-cell>{{ invoice.ProductName }}</ui5-table-cell>
        <ui5-table-cell>{{ invoice.Quantity }}</ui5-table-cell>
        <ui5-table-cell>{{ invoice.ExtendedPrice.toFixed(2) }}</ui5-table-cell>
        <ui5-table-cell>{{ invoice.ShipperName }}</ui5-table-cell>
        <ui5-table-cell>{{ invoice.ShippedDate }}</ui5-table-cell>
        <ui5-table-cell
          style="text-align: center; font-weight: bold"
          :class="getElementStatus(invoice.Status)"
          >{{ invoice.Status }}</ui5-table-cell
        >
      </ui5-table-row>
    </template>
  </ui5-table>
</template>

<script setup>
import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableColumn";
import "@ui5/webcomponents/dist/TableRow";
import "@ui5/webcomponents/dist/TableGroupRow.js";
import "@ui5/webcomponents/dist/TableCell";
import "@ui5/webcomponents/dist/BusyIndicator.js";

import axios from "axios";

import _ from "lodash";

import { onMounted, reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";

import { useInvoiceStore } from "../stores/invoiceDetailsStore";

const invoices = reactive({});
const loadingInvoices = ref(true);

const searchTerm = ref("");
const groupByTerm = ref("");

const groupByDiv = ref(null);

const router = useRouter();

const invoiceStore = useInvoiceStore();

const searchInInvoices = _.debounce((newSearchTerm) => {
  searchTerm.value = newSearchTerm;
}, 500);

const shownInvoices = computed(() => {
  console.info("Computing");

  let finalInvoices = invoices.data;

  if (searchTerm.value.length)
    finalInvoices = _.filter(invoices.data, (invoice) => {
      return invoice.ProductName.toLowerCase().includes(
        searchTerm.value.toLowerCase()
      );
    });

  if (groupByTerm.value.length) {
    finalInvoices = _.groupBy(finalInvoices, groupByTerm.value);
  }

  return finalInvoices;
});

async function getInvoices() {
  if (!invoiceStore.invoiceList.length) {
    let res = await axios.get(
      "https://8b4fb954-d0cf-47cb-aa55-f03db9048ffd.mock.pstmn.io"
    );

    invoiceStore.setInvoiceList(res.data);
    invoices.data = res.data;
  } else {
    invoices.data = invoiceStore.invoiceList;
  }

  loadingInvoices.value = false;
}

function groupInvoices() {
  let groupTerm = groupByDiv.value.selectedOption.attributes.accessibleName;

  if (groupTerm) {
    groupByTerm.value = groupTerm.value;
  } else {
    groupByTerm.value = "";
  }
}

function clearSearch() {
  searchTerm.value = "";
}

function getElementStatus(status) {
  switch (status) {
    case "A":
      return "status-a";
    case "B":
      return "status-b";
    case "C":
      return "status-c";
    default:
      break;
  }
}

function seeInvoiceDetails(invoice) {
  invoiceStore.setInvoice(invoice);

  router.push({
    name: "InvoiceDetails"
  });
}

onMounted(() => {
  getInvoices();
});
</script>

<style scoped>
.status-a {
  color: red;
}

.status-b {
  color: green;
}

.status-c {
  color: blue;
}
</style>
