<template>{{ invoiceStore.invoice }}</template>

<script setup>
import { useInvoiceStore } from "../stores/invoiceDetailsStore";

const invoiceStore = useInvoiceStore();
</script>
