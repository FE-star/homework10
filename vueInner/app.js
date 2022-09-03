import { createSSRApp } from 'vue';

export function createApp() {
    return createSSRApp({
        data: () => ({ text: 'Vue SSR Example' }),
        template: `<div>{{ text }}</div>`,
    });
}
