import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import naive from 'naive-ui'
import animate from "animate.css";
import i18n from "@/locales/index"
import filters from '@/tools/filters'
const app = createApp(App)
app.use(store).use(router).use(naive).use(animate).use(i18n).mount('#app')
filters(app)
