var http = require('http');
var im = require('imagemagick');
var url = require('url');
var querystring = require('querystring');

http.createServer(function (request, response) {
    var postData = '';
    var objectUrl = url.parse(request.url);
    var objectQuery = querystring.parse(objectUrl.query);
    var type = objectQuery['type'];

    if (request.method !== 'POST') {
        response.writeHead(405, {'Content-Type': 'text/plain'});
        response.end('Only allowed POST method.');
        return;
    }

    if (typeof type === 'undefined') {
        response.writeHead(400, {'Content-Type': 'text/plain'});
        response.end('Missing required parameters: type.');
        return;
    }

    request.setEncoding('binary');
    request.addListener('data', function (postDataChunk) {
        postData += postDataChunk;
    });
    // 所有数据包接收完毕
    request.addListener('end', function () {
        if (postData.length === 0) {
            response.writeHead(400, {'Content-Type': 'text/plain'});
            response.end('Missing post src data.');
            return;
        }

        try {
            im.resize({
                srcData: postData,
                format: type,
                density: 240,
                quality: 1.0,
                antialias: false
            }, function(err, stdout) {
                if (err) {
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.end('Image convert error.');
                } else {
                    response.writeHead(200, {'Content-Type': 'application/octet-stream'});
                    response.end(stdout, 'binary');
                }
            });
        } catch (err) {
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.end('server error.');
        }
    });
}).listen(1337);
console.log('Server running at port 1337');

