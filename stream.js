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


// 读取本地摄像机数据
const video = document.getElementById('video');
navigator.mediaDevices.getUserMedia({
    video: true
}
).then((stream) => {
    console.log('origin/release')
    console.log('nihao')
    console.log('nihao2')
}
).catch((err) => {

}
);


// 把一个流对象写入到一个文件
const ws1 = fs.createWriteStream('./test.txt');
ws1.write('使用Stream写入文本数据...\n');
ws1.write('END.');
ws1.end();
const ws2 = fs.createWriteStream('./test.txt');
ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'));
ws2.write(new Buffer('END.', 'utf-8'));

