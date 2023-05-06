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

// 读取一个文件，返回一个流对象
const fs = require('fs');
const rs = fs.createReadStream('./test.txt');
rs.on('data', (chunk) => {
    console.log(chunk.toString());
}
);
rs.on('end', () => {
    console.log('END');
}
);
rs.on('error', (err) => {

}
);