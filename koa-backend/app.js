const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const cors = require('koa-cors');

const controller = require('./controller');

const templating = require('./templating');

const app = new Koa();

app.use(cors());

const isProduction = process.env.NODE_ENV === 'production';

// 日志中间件
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// 添加静态文件URL响应支持
if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

// parse request body:
app.use(bodyParser());

// 创建一个nunjucks环境，并且添加一个中间件（专门用来给ctx添加render方法）
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');
