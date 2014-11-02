console.log("PLUGIN: RSS loaded");

var color = require('irc-colors');

module.exports = function (client, config) {

    var status = true; // online/offline = true/false
    var limit = 1;
    var maxLimit = config.plugins.rss.limit || 42;

    var RssEmitter = require('./rss-emitter');

    var levelup = require('levelup');
    var db = levelup(__dirname + '/data', {
        keyEncoding: 'binary',
        valueEncoding: 'json'
    });

    var emitter = new RssEmitter(db);

    emitter.on('item:new', function (item) {

        if (!status) {
            return;
        }

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

        console.log("RSS: pinged", raw);

        config.plugins.rss.feeds.forEach(function (feed) {
            emitter.import(feed);
        });
    });

    client.addListener('message', function (nick, to, message, raw) {

        var cmdline = message.split(' ').filter(function (el) {
            return el.length > 0;
        });

        if (cmdline[0].toLowerCase() !== '!rss' ||
            nick.toLowerCase() === config.irc.nickname.toLowerCase() ||
            (config.plugins.rss.channels.length !== 0 &&
                to[0] === '#' &&
                !config.plugins.rss.channels.some(function (el) {
                    return el == to;
                }))) {

            console.log('RSS: command canceld (2)');
            return;
        }

        if (to.toLowerCase() === config.irc.nickname.toLowerCase()) {

            // bot got the message
            to = nick;
        }

        console.log("RSS CMD:", nick, to, message, raw);

        switch (cmdline[1]) {

            case 'import':

                config.plugins.rss.feeds.forEach(function (feed) {

                    //console.log('RSS: import', feed);
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

                            //console.dir(item);
                            sendMessage(client, to, item);
                        });
                    });

                break;

            case 'on':

                status = true;
                printStatus(client, to, status);

                break;

            case 'off':

                status = false;
                printStatus(client, to, status);

                break;

            default:

                printStatus(client, to, status);
                break;
        }
    });
}

function printStatus(client, to, status) {

    client.say(to, color.green('RSS: ') + (status ? color.red('ON') : color.blue('OFF')));
    console.log('RSS: printStatus:', to, (status ? 'ON' : 'OFF'));
}

function sendMessage(client, to, item) {

    client.say(to, color.green('RSS: ') + color.brown(item.title) + ' --- ' + item.link);
    console.log('RSS: sendMessage:', to, item.title);
}