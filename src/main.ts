import { createApp } from 'vue'
import './styles.scss'
import "bootstrap/dist/css/bootstrap.css";
import App from './App.vue'

createApp(App)
.use(router)
.mount('#app')

import "bootstrap/dist/js/bootstrap.js";import router from './router';

