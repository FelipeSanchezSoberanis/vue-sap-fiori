import { defineStore } from "pinia";

export const useInvoiceStore = defineStore({
    id: "counter",
    state: () => ({
        invoice: {},
        invoiceList: [],
        lastSearchTerm: "",
        lastGroupByTerm: ""
    }),
    actions: {
        setInvoice(newInvoice) {
            this.invoice = newInvoice;
        },
        setInvoiceList(newInvoiceList) {
            this.invoiceList = newInvoiceList;
        }
    }
});
