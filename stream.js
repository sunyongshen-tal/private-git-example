// 生成一个 http 请求，返回一个流对象
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    }
    );
    res.end('Hello World');
}
);
server.listen(3000, () => {
    console.log('starting at port 3000');
}
);