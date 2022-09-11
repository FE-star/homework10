// TODO 监听3000端口，便于执行test
import Koa from 'koa'
import { wrapper } from './genStr.js'
const app = new Koa()

// parse vue template to ast
const config = {
  data: () => ({ foo: 'Vue SSR Example' }),
  template: `<div id="app"><div>{{ foo }}</div></div>`
}

app.use(ctx => {
  ctx.body = wrapper(config)
})

app.listen(3000, () => {
  console.log('Server listen on http://localhost:3000')
})