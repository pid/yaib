console.log("PLUGIN: URLS loaded");

var utils = require('../../lib/utils');
var color = require('irc-colors');
var cheerio = require('cheerio');
var request = require('request');

function init(client, config) {

    var levelup = require('levelup');
    var db = levelup(__dirname + '/data', {
        keyEncoding: 'binary'
    });
    var Puid = require('puid');
    var puid = new Puid(true);

    client.addListener('message', function (nick, to, message, raw) {

        var cmdline = utils.filterCommands(message);
        var maxLimit = 42;
        var limit;

        var urls = [];
        var re = /http[s]?\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/g;

        if (utils.isBotMessage(nick, config)) {

            return;
        }

        if (utils.isBotMessage(to, config)) {

            maxLimit = 4242;
            to = nick;
        }

        while (match = re.exec(message)) {
            urls.push(match[0]);
        }

        urls.forEach(function (url) {

            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    url += ' ' + cheerio.load(body)('title').text().replace(/(\r\n|\n|\r)/gm,"");
                }

                db.put('urls\x00' + puid.generate(), url, function (err) {

                    if (err) {
                        console.log("ERROR: URLS: adding new url");
                    }
                });

            });
        });

        if (utils.isCmd('!urls', cmdline)) {

            limit = cmdline.length > 1 ? parseInt(cmdline[1], 10) : 3;

            db.createKeyStream({
                    gt: 'urls\x00',
                    lt: 'urls\x00\xff',
                    limit: limit && limit <= maxLimit ? limit : 3,
                    reverse: true
                })
                .on('data', function (data) {

                    db.get(data, function (err, url) {

                        sendMessage(client, to, url);
                    });
                });
        }
    });
};

function help() {
    return (
        color.bold.red.bgyellow('===================================================\n') +
        color.bold.red.bgyellow('URLS Plugin\n') +
        color.bold.red.bgyellow('===================================================\n') +
        color.bold.red.bgyellow('!urls : get latest URLs\n') +
        color.bold.red.bgyellow('!urls 5 : get the 5 latest URLs\n') +
        color.bold.red.bgyellow('===================================================')
    );
}

function sendMessage(client, to, message) {

    client.say(to, color.blue('URL: ') + color.brown(message));
}

module.exports = {
    init: init,
    help: help
}
