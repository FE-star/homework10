import express from 'express'
// import { createApp } from './app.js'
import { createAppH } from './app.js'
import { renderToString } from 'vue/server-renderer'

const serve = express()

serve.get('/',(req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  renderToString(createAppH()).then((html) => {
    res.send(`<div id="app">${html}</div>`)
  })
})

// 用于测试客户端激活 Vue，与 homework 无关
serve.get('/ccc',(req, res) => {
  res.statusCode = 200;
  renderToString(createApp()).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
        <script type="importmap">
          {
            "imports": {
              "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
            }
          }
        </script>
        <script type="module" src="./client.js"></script>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `)
  })
})

serve.use(express.static('.'))

serve.listen(3000, '127.0.0.1', () => {
  console.log('服务已启动');
})