// lib
var http = require('http');
var querystring = require('querystring');

// external lib
var libxmljs = require('libxmljs');

// var
var resultOfCheckingArray = [];
var result = function(data) {
  var html = libxmljs.parseHtml(data);
  //xpath
  var table = html.find("//table[@id='tableErr_0']")[0].parent();
  var childNodes = table.childNodes()

  for (var i = 0 ; i < childNodes.length; i++ ){
    if (childNodes[i].name() !== "table") continue
    var wrongWord = childNodes[i].find('.//td')[1].text().trim();
    var replaceWord = childNodes[i].find('.//td')[3].text().trim();
    var explanation = childNodes[i].find('.//td')[5].text().trim();

    resultOfChecking.push({
      'wrongWord' : wrongWord,
      'replaceWord' : replaceWord,
      'explanation' : explanation
    });
  }
  return { 'end' : function(callback) {
    callback(resultOfCheckingArray);
  }};
};

exports.sendTo = function(message, callback) {
  var formData = querystring.stringify();

  var options = {
    hostname : 'speller.cs.pusan.ac.kr',
    headers : {
      'Content-Type' : 'text/html',
      'Content-Length' : formData.length
    },
    port : 80,
    path : '/PnuSpellerISAPI_201209/lib/PnuSpellerISAPI_201209.dll?Check',
    method : 'POST'
  };

  var request = http.request(options, function(res){
    var data = '';
    res.setEncoding('utf8');
    res.on('data', function(chunk){
      data += chunk;
    });
    res.on('end', function() {
      result(data).end(callback);
    });
  });

  request.write(formData);
  request.on('error', function(err){
    throw err;
  });
  request.end();
};
