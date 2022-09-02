import express from "express";
import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";

const server = express();

server.get("/", (req, res) => {
  const title = req.query.title;
  const app = createSSRApp({
    data: () => ({ title }),
    template: `<div>{{title}}</div>`,
  });

  renderToString(app).then((html) => {
    res.send(`
      <body>
        <div id="app">${html}</div>
      </body> 
    `);
  });
});

server.listen(3000, () => {
  console.log("ready");
});
