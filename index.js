var fs = require('fs');
var irc = require('irc');

var config = require('./config');
var plugins = fs.readdirSync('./plugins');

var client = new irc.Client(
    process.env.IRCBOT_SERVER || config.irc.server,
    process.env.IRCBOT_NICKNAME || config.irc.nickname,
    config.irc.options
);

client.addListener('error', function (error) {
    console.log('error: ', error);
});

client.addListener('registered', function (raw) {
    console.log('REGISTERED: ', raw);

    process.env.IRCBOT_NICKSERV ?
        client.say('NickServ', 'IDENTIFY ' + process.env.IRCBOT_NICKSERV) :
        console.log('WARNING: IRCBOT NICKSERV PASSWORD missing - set env IRCBOT_NICKSERV');
});

client.addListener('join', function (channel, nick, raw) {

    //console.log('JOIN: ', raw);
    if (nick.toLowerCase() === config.irc.nickname.toLowerCase()) {
        // bot joins
        client.say(channel, "Yeahh I'm in");
    } else {
        client.say(channel, 'Welcome, ' + nick);
    }
});

// load plugins
plugins.forEach(function (plugin) {

    if (config.plugins[plugin] !== false) {
        require('./plugins/' + plugin)(client, config);
    }

    console.log("PLUGINS: loaded");
});
