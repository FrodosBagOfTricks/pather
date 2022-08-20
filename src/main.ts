import { createApp } from "vue";
import App from "./App.vue";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import PrimeVue from "primevue/config";
import Speeddial from "primevue/speeddial";

import "./assets/main.css";

const app = createApp(App);

app.use(PrimeVue);

app.component("SpeedDial", Speeddial);

app.mount("#app");
