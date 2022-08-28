import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../public/styles.css'

import appAxios from '@/utils/appAxios'

const app = createApp(App)

app.use(router)
app.mount('#app')

app.config.globalProperties.$appAxios = appAxios;
