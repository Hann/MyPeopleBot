/**
 * Created with JetBrains WebStorm.
 * User: hanjinsoo
 * Date: 6/1/13
 * Time: 3:22 오후
 * To change this template use File | Settings | File Templates.
 */

http = require('http');

http.createServer(function(req, res){
  if (req.method === "POST" && req.url === "/bot"){
    res.writeHead(200, { 'Content-Type' : 'Application/json'});
    res.write('{ "jinsoo" : "zzang" }');
    res.end();
  }
  else {
    res.writeHead(200, { 'Content-Type' : 'Application/json'});
    res.write('{"test" : "jinsoo"}');
    res.end();
  }

}).listen(9999);