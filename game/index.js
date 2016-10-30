// const http = require('http');
// const fs = require('fs');

// const hostname = '127.0.0.1';
// const port = 9000;

// const server = http.createServer((req, res) => {
// 	fs.readFile('game/index.html', function (err, html) {
// 		if ( err ) throw err;
// 		res.writeHeader(200, {'Content-Type': 'text/html'});
// 		res.write(html);
// 		res.end();
// 	})
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

// fs.writeFile('game/wf.txt','reloaded', (err) => {
// 	if( err ) throw err;
// 	console.log('it is saved');

// });
// fs.readFile('game/index.html', function (err, html) {
//     if (err) {
//         throw err; 
//     }       
//     http.createServer(function(req, res) => {  
//         res.writeHeader(200, {"Content-Type": "text/html"});  
//         res.write(html);  
//         res.end();  
//     }).listen(9000);
// });


var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    //console.log('request ', request.url);

    //var filePath = '/game' + request.url;
    var filePath = '/';
    if (request.url == '/'){
        filePath = 'game/index.html';
    }
    else {
    	filePath = 'game' + request.url;
    }


    console.log('filePath ' +filePath)

    var extname = String(path.extname(filePath)).toLowerCase();
    var contentType = 'text/html';
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };

    contentType = mimeTypes[extname] || 'application/octect-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
 //    fs.writeFile('game/wf.txt','reloaded', (err) => {
	// 	if( err ) throw err;
	// 	console.log('it is saved');
	// });

}).listen(9000);
console.log('Server running at http://127.0.0.1:9000/');