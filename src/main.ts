import { createApp } from 'vue'
import './styles.scss'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "../src/assets/styles/variables.scss"
import App from './App.vue'
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

createApp(App)
.use(router)
.use(Vue3Toastify, {
    autoClose: 5000
})
.mount('#app')

import router from './router';

