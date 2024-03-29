console.log("PLUGIN: HELLO loaded");

var utils = require('../../lib/utils');
var color = require('irc-colors');

function init(client, config) {

    client.addListener('join', function (channel, nick, raw) {

        if (!utils.isBotMessage(nick, config)) {
            client.say(channel,
                (config.plugins.hello.salutation ? config.plugins.hello.salutation : 'Hi') + ' ' +
                nick + '!  ' +
                (config.plugins.hello.message ? config.plugins.hello.message : 'Send !help to me.')
            );
        }
    });

}

function help() {
    return (
        color.bold.red.bgyellow('===================================================\n') +
        color.bold.red.bgyellow('HELLO Plugin\n') +
        color.bold.red.bgyellow('===================================================\n') +
        color.bold.red.bgyellow('Output welcome message when user joins the channel\n') +
        color.bold.red.bgyellow('===================================================')
    );
}

module.exports = {
    init: init,
    help: help
};
