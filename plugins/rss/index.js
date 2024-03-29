/*jshint -W030 */

console.log("PLUGIN: RSS loaded");

var utils = require('../../lib/utils');

var color = require('irc-colors');

function init(client, config) {

    var timer = 0;

    var limit = 1;
    var maxLimit = config.plugins.rss.limit || 42;

    var RssEmitter = require('./rss-emitter');

    var levelup = require('levelup');
    var db = levelup(__dirname + '/../../data/rss/', {
        keyEncoding: 'binary',
        valueEncoding: 'json'
    });

    var emitter = new RssEmitter(db);

    emitter.on('item:new', function (item) {

        if (!config.plugins.rss.channels.length) {
            channels = config.irc.options.channels;
        } else {
            channels = config.plugins.rss.channels;
        }

        channels.forEach(function (channel) {
            sendMessage(client, channel, item);
        });

    });

    client.addListener('ping', function (raw) {

        !!process.env.IRCBOT_DEBUG && console.log("RSS: pinged", raw, "Timer:", timer, new Date(Date.now()));

        if (timer) {
            timer -= 1;
            return;
        }
        timer = config.plugins.rss.timer || 7;

        config.plugins.rss.feeds.forEach(function (feed) {
            !!process.env.IRCBOT_DEBUG && console.log("FEED IMPORT(cron):", feed);
            emitter.import(feed);
        });
    });

    client.addListener('message', function (nick, to, message, raw) {

        var cmdline = utils.filterCommands(message);

        if (!utils.isCmd('!rss', cmdline) || utils.isBotMessage(nick, config)) {
            !!process.env.IRCBOT_DEBUG && console.log('RSS: command canceld (2)');
            return;
        }

        if (utils.isBotMessage(to, config)) {

            maxLimit = 4242;
            to = nick;
        }

        !!process.env.IRCBOT_DEBUG && console.log("RSS CMD:", nick, to, message, raw);


        switch (cmdline.length > 1 && cmdline[1] ? cmdline[1].toString().toLowerCase() : '') {

            case 'feeds':

                config.plugins.rss.feeds.forEach(function (feed) {

                    client.say(to, "RSS FEED: " + feed);
                });

                break;

            case 'import':

                config.plugins.rss.feeds.forEach(function (feed) {

                    !!process.env.IRCBOT_DEBUG && console.log("FEED IMPORT:", feed);
                    emitter.import(feed);
                });

                break;

            case 'last':
            case 'latest':
                limit = cmdline.length >= 3 && parseInt(cmdline[2], 10);
                db.createKeyStream({
                        gt: 'id\x00',
                        lt: 'id\x00\xff',
                        limit: limit && limit <= maxLimit ? limit : 1,
                        reverse: true
                    })
                    .on('data', function (data) {

                        db.get(data, function (err, item) {

                            //!!process.env.IRCBOT_DEBUG && console.dir(item);
                            sendMessage(client, to, item);
                        });
                    });

                break;

            case 'on':

                if (config.plugins.rss.channels.indexOf(to) === -1) {
                    config.plugins.rss.channels.push(to);
                }

                //!!process.env.IRCBOT_DEBUG && console.dir(config.plugins.rss.channels);
                printStatus(client, to, true);

                break;

            case 'off':
                if (config.plugins.rss.channels.indexOf(to) !== -1) {
                    config.plugins.rss.channels.splice(config.plugins.rss.channels.indexOf(to), 1);
                }

                //!!process.env.IRCBOT_DEBUG && console.dir(config.plugins.rss.channels);
                printStatus(client, to, false);

                break;

            default:
                if (config.plugins.rss.channels.indexOf(to) !== -1) {
                    printStatus(client, to, true);
                } else {
                    printStatus(client, to, false);
                }
                !!process.env.IRCBOT_DEBUG && console.dir(config.plugins.rss.channels);

                break;
        }
    });
}

function help() {

    return (
        color.bold.red.bgyellow('===================================================\n') +
        color.bold.red.bgyellow('RSS Plugin\n') +
        color.bold.red.bgyellow('===================================================\n') +
        color.bold.red.bgyellow('!rss : print status (ON or OFF)\n') +
        color.bold.red.bgyellow('!rss on : activate channel news posting\n') +
        color.bold.red.bgyellow('!rss off : deactivate channel news posting\n') +
        color.bold.red.bgyellow('!rss lastest : get latest news\n') +
        color.bold.red.bgyellow('!rss lastest 5 : get the 5 latest news\n') +
        color.bold.red.bgyellow('!rss feeds : list all feeds\n') +
        color.bold.red.bgyellow('===================================================')
    );

}

function printStatus(client, to, status) {

    client.say(to, color.green('RSS: ') + (status ? color.red('ON') : color.blue('OFF')));
    !!process.env.IRCBOT_DEBUG && console.log('RSS: printStatus:', to, (status ? 'ON' : 'OFF'));
}

function sendMessage(client, to, item) {

    client.say(to, color.green('RSS: ') + color.bold.brown(item.title) + ' --- -- - ' + item.link);
    !!process.env.IRCBOT_DEBUG && console.log('RSS: sendMessage:', to, item.title);
}

module.exports = {
    init: init,
    help: help
};
