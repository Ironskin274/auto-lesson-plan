import {createPinia} from 'pinia';
import { createApp } from 'vue';

import './style.css';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia).use(router).use(ElementPlus).mount('#app');
