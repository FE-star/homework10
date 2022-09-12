import express from 'express'
import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";

async function createVueSSRApp() {
  const app = createSSRApp({
    data: () => ({ title: "Vue SSR Example" }),
    template: 
`<body>
  <div id="app"><div>{{ title }}</div></div>
</body>`,
  });

  return renderToString(app);
}

const server = express()

server.get('/', (req,res) => {
    createVueSSRApp().then((html) => {
        res.end(html);
      });
})

server.listen(3000, () => {
  console.log(`Vue SSR Example Ready`);
});