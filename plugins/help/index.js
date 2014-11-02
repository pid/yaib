console.log("PLUGIN: HELP loaded");

var utils = require('../../lib/utils');
var color = require('irc-colors');
var fs = require('fs');
var helper = {};

function init(client, config) {

    var plugins = fs.readdirSync(__dirname + '/../../plugins');

    plugins.forEach(function (plugin) {

        if (config.plugins[plugin] !== false) {
            helper[plugin] = require(__dirname + '/../../plugins/' + plugin + '/').help;
        }

    });

    client.addListener('message', function (nick, to, message, raw) {

        var cmdline = utils.filterCommands(message);

        if (!utils.isCmd('!help', cmdline)) {
            console.log("EXIT");
            return;
        }

        if (utils.isBotMessage(to, config)) {
            to = nick;
        }

        if (cmdline.length > 1) {
            client.say(to, helper[cmdline[1]]());
        } else {
            for (var key in helper) {
                client.say(to, helper[key]());
            }
        }
    });
}

function help() {
    return (
        color.green('HELP: help')
    );
}

module.exports = {
    init: init,
    help: help
}
