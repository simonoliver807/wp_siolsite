var http = require('http');
var io = require('socket.io').listen(9000);
var fs = require('fs');
var path = require('path');


// console.log('io ' + io.on);


http.createServer(function (req, res) {

	fs.readFile('index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });

}).listen(9000);
console.log('Server running at http://127.0.0.1:9000/');

io.on('connection', function (socket) {
    console.log('io connect'); 
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
})
