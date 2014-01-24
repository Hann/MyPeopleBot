/**
 * Created with JetBrains WebStorm.
 * User: hanjinsoo
 * Date: 6/1/13
 * Time: 3:22 오후
 * To change this template use File | Settings | File Templates.
 */

http = require('http');
parser = require('./lib/parse');

http.createServer(function(req, res) {
  if (req.method === 'POST' && req.url === '/bot') {
    var body = '';
    req.on('data', function(data) {
      body += data;
    });
    req.on('end', function() {
      res.writeHead(200, { 'Content-Type': 'Application/json'});
      console.log('received a message');
      parser.parse(body);
      res.end();
    });
  }
  else {
    res.writeHead(404, { 'Content-Type': 'Application/json'});
    res.write('{"Han Jin-Soo" : "ceo@hannjs.com"}');
    res.end();
  }

}).listen(9999);
