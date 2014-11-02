console.log("PLUGIN: HELLO loaded");

var utils = require('../../lib/utils');
var color = require('irc-colors');

function init(client, config) {

    client.addListener('join', function (channel, nick, raw) {

        if (!utils.isBotMessage(nick, config)) {
            client.say(channel,
                config.plugins.hello.salutation + ' ' +
                nick + '!  ' +
                config.plugins.hello.message
            );
        }
    });

};

function help() {
    return (
        color.green('HELP: hello')
    );
}

module.exports = {
    init: init,
    help: help
}