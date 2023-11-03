import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import pinia from "@/stores/pinia";
import router from "@/router";

import "primevue/resources/themes/lara-dark-purple/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);
app.use(PrimeVue);
app.use(pinia);
app.use(router);

app.mount("#app");
