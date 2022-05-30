import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import InvoiceDetails from "../views/InvoiceDetails.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/invoiceDetails",
            name: "InvoiceDetails",
            component: InvoiceDetails
        }
    ]
});

export default router;
