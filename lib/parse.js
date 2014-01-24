var querystring = require('querystring');
var bot = require('./bot');

exports.parse = function(rawData) {
  var data = querystring.parse(rawData);
  var content = data.content.trim().toLowerCase();
  // 그룹 방
  if (data.groupId) {

    if (content === 'help') bot.helpForGroup(data);
    else if (content === 'exit') bot.exitFromGroup(data);
    else if (data.action === 'sendFromGroup') {
      if (data.content.length < 5) return;
      bot.sendToPersonInGroup(data);
    }
  }

  // 개인 방
  if (!data.groupId) {
    if (content === 'help') bot.helpForPerson(data);
    else if (data.action === 'sendFromMessage') bot.sendToPerson(data);
  }
};