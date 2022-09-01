import express  from 'express'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

const server = express()

server.get('/', async function (req, res) {
    const message = req.query.message ?? 'Vue SSR Example'

    const app = createSSRApp({
        data: () => ({ message }),
        template: `<div>{{message}}</div>`
    })

    const html = await renderToString(app)
        .catch(err => {
            // 处理错误，应该利用日志框架写下日志，这里用 console 代替
            console.error(err)
            res.status(500).send('抱歉，服务器出错了')
        })

    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <div id="app">${html}</div>
</body>
</html>
    `)
})

server.listen(3000)

console.log("Server start at: http://127.0.0.1:3000")
