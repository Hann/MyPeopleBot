// 깃에 올릴거라 apikey를 분리 시켜놓았다.
var apikey = require('./apikey.json');
var https = require('https');
var querystring = require('querystring');
var spell = require('./rulesOfSpelling');

var option = {
  headers : {
    'Content-Type' : 'multipart/form-data'
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


module.exports = {
  'sendToPerson' : function(data) {
    option['path'] = url['sendToPerson'];
    var params = {
      buddyId : data.buddyId,
      content : content // 만들어야한다.
    };
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
        'buddyId' : data.buddyId,
        'content' : content
      };
      request.write(querystring.stringify(params));
      request.end();
    });
    request.write(querystring.stringify(params));
    request.end();
  },
  'sendToGroup' : function(data) {
    option['path'] = url['sendToGroup'];

    var request = https.request(option, function(res){
      var data = '';
      res.on('data', function(chunk){
        data += chunk;
      });
      res.on('end', function(){

      });
    });
    //괄호질 해줘야할 삘인데.. 흠흠
    spell.sendTo(data.content, function(content) {
      var params = {
        'buddyId' : data.buddyId,
        'content' : content
      };
      request.write(querystring.stringify(params));
      request.end();
    });


  },

  'exitFromGroup' : function(data) {
    option['path'] = url['exitFromGroup'];
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
      'content' : '평소처럼 대화를 하면 우리말 봇이 개인적으로 메시지를 보내드린답니다 :)'
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
      'content' : encodeURIComponent('바로바로 물어보세요:)'),
      'apikey'  : apikey.apikey
    };
    console.log(params);
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
