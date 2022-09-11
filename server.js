// TODO 监听3000端口，便于执行test
import express from 'express';
import { createApp } from 'vue';
const server = express();

server.get('*', (req, res) => {
  // const app = new Vue({
  //   data: {
  //     array: ['vue', 'java', 'python', 'javascript'],
  //   },
  //   template: `<div id="app"><div>Vue SSR Example</div></div>`,
  // });

  res.send(
    '<!DOCTYPE html><html lang="en"><head><title>Vue Js – SSR SAMPLE</title></head><body>html</body></html>'
  );
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
