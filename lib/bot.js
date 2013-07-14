// 깃에 올릴거라 apikey를 분리 시켜놓았다.
var apikey = require('./apikey.json');
var https = require('https');
var querystring = require('querystring');
var spell = require('./rulesOfSpelling');

var option = {
  headers : {
    'Content-Type' : 'application/x-www-form-urlencoded'
  },
  hostname : 'apis.daum.net',
  port : '443',
  method : 'POST'
};

var url = {
  'sendToPerson' : '/mypeople/buddy/send.json',
  'sendToGroup' : '/mypeople/group/send.json',
  'exitFromGroup' : '/mypeople/group/exit.json'
};

var sumContent = function(contentArray) {
  var sumString = '';
  for (var i = 0 ; i < contentArray.length; i++){
    sumString += '단어 : ' + contentArray[i].wrongWord + '\n'
      + '대치어 : ' + contentArray[i].replaceWord + '\n'
      + '도움말 : ' + contentArray[i].explanation + '\n\n';
  }
  return sumString;
};

module.exports = {
  'sendToPerson' : function(data) {
    option['path'] = url['sendToPerson'];

    var request = https.request(option, function(res){
      var data = '';
      res.on('data', function(chunk){
        data += chunk;
      });
      res.on('end', function(){

      });
    });

    spell.sendTo(data.content, function(content) {
      var params = {
        'apikey' : apikey.apikey,
        'buddyId' : data.buddyId,
        'content' : content
      };

      params.content = sumContent(params.content);
      request.write(querystring.stringify(params));
      request.end();
    });
  },
  'sendToPersonInGroup' : function(data) {
    option['path'] = url['sendToPerson'];

    var request = https.request(option, function(res){
      var data = '';
      res.on('data', function(chunk){
        data += chunk;
      });
      res.on('end', function(){

      });
    });

    spell.sendTo(data.content, function(content) {
      var params = {
        'apikey' : apikey.apikey,
        'buddyId' : data.buddyId,
        'content' : content,
        'groupId' : data.groupId
      };

      params.content = sumContent(params.content);
      request.write(querystring.stringify(params));
      request.end();
    });
  },
  'exitFromGroup' : function(data) {
    option['path'] = url['exitFromGroup'];
    var params = {
      'groupId' : data.groupId,
      'apikey' : apikey.apikey
    };
    var request = https.request(option, function(res){
      var data = '';
      res.on('data', function(chunk){
        data += chunk;
      });
      res.on('end', function(){

      });
    });
    request.write(querystring.stringify(params));
    request.end();
  },
  'helpForGroup' : function(data){
    option['path'] = url['sendToGroup'];
    var params = {
      'groupId' : data.groupId,
      'content' : '평소처럼 대화를 하면 우리말 봇이 개인적으로 메시지를 보내드린답니다 :)',
      'apikey'  : apikey.apikey
    };

    var request = https.request(option, function(res){
      var data = '';
      res.on('data', function(chunk){
        data += chunk;
      });
      res.on('end', function(){

      });
    });
    request.write(querystring.stringify(params));
    request.end();
  },
  'helpForPerson' : function(data) {
    option['path'] = url['sendToPerson'];
    console.log(option);
    var params = {
      'buddyId' : data.buddyId,
      'content' : '바로바로 물어보세요:)',
      'apikey'  : apikey.apikey
    };

    var request = https.request(option, function(res){
      var data = '';
      res.setEncoding('utf8');
      res.on('data', function(chunk){
        data += chunk;
      });
      res.on('end', function(){
        console.log(data);
      });
    });
    request.write(querystring.stringify(params));
    request.end();
  }
};
