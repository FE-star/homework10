import {createSSRApp} from 'vue'

export const createApp = () => {
    return createSSRApp({
        data: () => ({
            content: 'Vue SSR Template'
        }),
        template: `<div>{{content}}</div>`
    })
}