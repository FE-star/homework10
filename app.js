import {createSSRApp} from 'vue'

export const createApp = () => {
    return createSSRApp({
        data: () => ({
            content: 'Vue SSR Example'
        }),
        template: `<div>{{content}}</div>`
    })
}