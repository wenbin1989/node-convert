var http = require('http');
var im = require('imagemagick');
var url = require('url');
var querystring = require('querystring');

http.createServer(function (req, res) {
    var postData = '';
    var objectUrl = url.parse(req.url);
    var objectQuery = querystring.parse(objectUrl.query);
    var type = objectQuery['type'];

    if (typeof type === 'undefined') {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Missing required parameters: type');
        return;
    }

    req.setEncoding('binary');
    req.addListener('data', function (postDataChunk) {
        postData += postDataChunk;
    });
    // 所有数据包接收完毕
    req.addListener('end', function () {
        if (postData.length === 0) {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Missing post src data.');
            return;
        }
        im.resize({
            srcData: postData,
            format: type,
            density: 240,
            quality: 1.0,
            antialias: false
        }, function(err, stdout) {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end(err);
            } else {
                res.writeHead(200, {'Content-Type': 'application/octet-stream'});
                res.end(stdout, 'binary');
            }
        });
    });
}).listen(1337);
console.log('Server running at port 1337');

