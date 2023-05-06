// 搭建一个 Koa 服务器
const Koa = require('koa');
const app = new Koa();

// 1. 配置路由
// ctx: 上下文 context, 包含了request和response等信息
app.use(async (ctx) => {
    ctx.body = 'Hello World';
}
);

// 2. 监听端口
app.listen(3000, () => {
    console.log('starting at port 3000');
}
);

// 3. 运行 node shenysun.js
// 4. 打开浏览器访问 http://localhost:3000/
// 5. 服务器返回 Hello World

