import { createSSRApp } from 'vue'

export function createApp() {
    return createSSRApp({
        data: () => ({
            content: 'Vue SSR Example'
        }),
        template: `<div>{{ content }}</div>`
    })
}

