import http from "http";
import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";

async function getHtml() {
  const app = createSSRApp({
    data: () => ({ title: "Vue SSR Example" }),
    template: `
<body>
  <div id="app"><div>{{ title }}</div></div>
</body> `,
  });

  return renderToString(app);
}

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  getHtml().then((html) => {
    res.end(html);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
