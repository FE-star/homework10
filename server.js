// TODO 监听3000端口，便于执行test
//实现 ssr 的服务端逻辑，处理页面和模板入参后，返回 html 页面到前端
{/* <body>
  <div id="app"><div>Vue SSR Example</div></div>
</body>  */}
import express from 'express'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

const server = express()

server.get('/', (req, res) => {
  const app = createSSRApp({
    data: () => ({ msg: 'Vue SSR Example' }),
    template: `<div>{{ msg }}</div>`
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
  })
})

server.listen(3000, () => {
  console.log('ready')
})