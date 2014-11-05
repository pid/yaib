var fs = require('fs');
var irc = require('irc');

var config = require('./config' + (process.env.NODE_ENV === 'production' ? '.production' : ''));
var plugins = fs.readdirSync('./plugins');

var client = new irc.Client(
    process.env.IRCBOT_SERVER || config.irc.server,
    process.env.IRCBOT_NICKNAME || config.irc.nickname,
    config.irc.options
);

client.addListener('error', function (error) {
    console.error('error: ', error);
});

client.addListener('registered', function (raw) {
    !!process.env.IRCBOT_DEBUG && console.log('REGISTERED: ', raw);

    process.env.IRCBOT_NICKSERV ?
        client.say('NickServ', 'identify ' + process.env.IRCBOT_NICKSERV) :
        console.error('WARNING: IRCBOT NICKSERV PASSWORD missing - set env IRCBOT_NICKSERV');
});

// load plugins
plugins.forEach(function (plugin) {

    if (config.plugins[plugin] !== false) {
        require('./plugins/' + plugin + '/').init(client, config);
    }

});
console.log("PLUGINS: loaded");
