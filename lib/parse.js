var querystring = require('querystring');
var bot = require('./bot');

exports.parse = function(rawData) {
  var data = querystring.parse(rawData);

  // 그룹 방
  if (data.groupId){
    if (data.content === 'help') bot.helpForGroup(data);
    else if (data.content === 'exit') bot.exitFromGroup(data);
    else if (data.action === 'sendFromGroup') bot.sendToPersonInGroup(data);
  }

  // 개인 방
  if (!data.groupId){
    if (data.content === 'help') bot.helpForPerson(data);
    else if (data.action === 'sendFromMessage') bot.sendToPerson(data);
  }
};