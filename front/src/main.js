import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'


import './style/index.scss'

const app = createApp(App)

app.use(router)

// new Vue({
//           router,
//          store, 
//          h => h(App)
// })

app.mount('#app')



