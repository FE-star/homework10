// TODO 监听3000端口，便于执行test
import express from "express"
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'



const instance = express()

instance.get('/', (req, res) => {

    const app = createSSRApp({
        data: () => ({ contentStr: 'Vue SSR Example' }),
        template: `<div>{{ contentStr }}</div>`
    })

    renderToString(app).then((html) => {
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Vue SSR Example</title>
            </head>
            <body>
                <div id="app">${html}</div>
            </body>
            </html>
            `)
        console.log(html)
    })
})

instance.listen(3000, () => {
    console.log('The listen port is 3000');
})