console.log("PLUGIN: HELLO loaded");

var utils = require('../../lib/utils');
var color = require('irc-colors');

function init(client, config) {

    client.addListener('join', function (channel, nick, raw) {

        if (utils.isChannelMessage(nick, config)) {

            // bot joins
            client.say(channel, "Yeahh I'm in --- help?  message me '!help'");
        } else {
            client.say(channel,
                config.plugins.hello.salutation + ' ' +
                nick + '!  ' +
                config.plugins.hello.message
            );
        }

    });

};

function help(client, to) {
    client.say(to, color.green('HELP: hello'));
}

module.exports = {
    init: init,
    help: help
}
