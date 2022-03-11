import { createApp } from "vue";
import App from "./App.vue";
import ZestratVueComponents from "@zerops/zestrat-vue";
import "@zerops/project-diagram";

createApp(App).use(ZestratVueComponents).mount("#app");
