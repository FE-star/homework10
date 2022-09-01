import { createSSRApp } from 'vue';
import App from './App.vue';

export function createVueApp() {
    return createSSRApp(App);
}