// 通过io对话，询问用户的输入，用过用户输入"exit"退出

var io = require('socket.io')();
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
    });
    rl.on('line', function (input) {
        if (input == 'exit') {
            rl.close();
            io.close();
            process.exit(0);
        }
        socket.emit('chat message', input);
    });
}
);

io.listen(3000);
console.log('listening on port 3000');

