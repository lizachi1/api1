import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { Quasar } from "quasar";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/dist/quasar.css";

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: {},
});

myApp.mount("#app");
