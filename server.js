import express from 'express'
import { app } from './app.js'
import { renderToString } from 'vue/server-renderer'

const server = express()
server.use(express.static('.'))

server.get('/', (req, res) => {
  renderToString(app).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
        <script type="importmap">
        {
          "imports": {
            "vue": "/node_modules/vue/dist/vue.esm-browser.js"
          }
        }
        </script>
        <script type="module" src="/client.js"></script>
        
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
