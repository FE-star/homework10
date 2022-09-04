import express from 'express';
import { createSSRApp } from 'vue';
import { renderToString } from 'vue/server-renderer';

const server = express();

server.get('/', (req, res) => {
  // 把content 作为入参变量，如果没有的话，则取 Vue SSR Example 作为默认显示内容
  const { content } = req.query || {}
  const app = createSSRApp({
    template: `<div>${content || 'Vue SSR Example' }</div>`,
  });

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
    `);
  });
});

server.listen(3000, () => {
  console.log('ready');
});
