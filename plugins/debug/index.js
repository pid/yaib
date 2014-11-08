console.log("PLUGIN: DEBUG loaded");

var utils = require('../../lib/utils');
var color = require('irc-colors');

function init(client, config) {

    client.addListener('message', function (nick, to, message, raw) {

        if (!utils.isBotMessage(nick, config)) {
            console.error("MESSAGE EVENT:", nick, to, message, raw);
        }
    });

    client.addListener('join', function (channel, nick, raw) {
        if (!utils.isBotMessage(nick, config)) {
            console.error("JOIN EVENT:", channel, nick, raw);
        }
    });

    /*/
    client.addListener('raw', function (message) {
            console.log("DEBUG RAW EVENT:", message);
    });
    //*/
}

function help() {
    return (
        color.bold.red.bgyellow('===================================================\n') +
        color.bold.red.bgyellow('DEBUG Plugin\n') +
        color.bold.red.bgyellow('===================================================\n') +
        color.bold.red.bgyellow('Only for dev\n') +
        color.bold.red.bgyellow('===================================================')
    );
}

module.exports = {
    init: init,
    help: help
};
