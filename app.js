import { createSSRApp } from 'vue';

export function createApp() {
    return createSSRApp({
        data: () => ({ text: 'Vue SSR Example' }),
        template: `<div @click="count++">{{ text }}</div>`,
    });
}
