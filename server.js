// TODO 监听3000端口，便于执行test
import express from 'express';
import { renderToString } from 'vue/server-renderer';
import { createVueApp } from './src/main';


const serve = express();

serve.get('/', (req, res) => {
    const app = createVueApp();
    renderToString(app).then((html) => {
        console.log(html);
        res.send(``);
    })
});

serve.listen(3000, () => {
    console.log('listening');
})