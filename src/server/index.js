import Koa from 'koa'
import Pug from 'koa-pug'
import * as http from 'http'
import viewHandler from './middlewares/viewHandler'


const app = new Koa();
const staticFolder = process.cwd() + '/dist'
app.use(require('koa-static')(staticFolder));
const pug = new Pug({
    viewPath: process.cwd() + '/src/server/templates',
    debug: false,
    pretty: false,
    compileDebug: false,
    app: app 
});

app.use(viewHandler)

const server = http.createServer(app.callback());
server.on('close', () => {
    console.log('Server closing!')
});

server.listen(8080, function(){
    console.log('Server listening on port 8080')
})