console.log("PLUGIN: HELP loaded");

var utils = require('../../lib/utils');
var color = require('irc-colors');
var pkg = require('../../package.json');

function init(client, config) {

    var fs = require('fs');

    var plugins = fs.readdirSync(__dirname + '/../../plugins');
    var helper = {};

    plugins.forEach(function (plugin) {

        if (config.plugins[plugin] !== false) {
            helper[plugin] = require(__dirname + '/../../plugins/' + plugin + '/').help;
        }

    });

    client.addListener('message', function (nick, to, message, raw) {

        var cmdline = utils.filterCommands(message);

        if (!utils.isCmd('!help', cmdline)) {
            return;
        }

        if (cmdline.length > 1 && helper[cmdline[1]]) {
            client.say(nick, helper[cmdline[1]]());
        } else {

            client.say(nick,
                color.bold.red.bgyellow('=============================\n') +
                color.bold.red.bgyellow('YAIB - v' + pkg.version + ' ' + pkg.homepage + '\n') +
                color.bold.red.bgyellow('!help : All ircbot functions\n') +
                color.bold.red.bgyellow('=============================')
            );

            plugins.forEach(function (plugin) {

                if (config.plugins[plugin] !== false) {
                    client.say(nick, color.bold.red.bgyellow(
                        '!help ' + plugin
                    ));
                }
            });
            client.say(nick, color.bold.red.bgyellow(
                '============================='
            ));
        }
    });
}

function help() {
    return (
        color.bold.red.bgyellow('===================================================\n') +
        color.bold.red.bgyellow('HELP Plugin\n') +
        color.bold.red.bgyellow('===================================================\n') +
        color.bold.red.bgyellow('!help : list all plugins\n') +
        color.bold.red.bgyellow('===================================================')
    );
}

module.exports = {
    init: init,
    help: help
};
