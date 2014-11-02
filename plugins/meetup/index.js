console.log("PLUGIN: MEETUP loaded");

var color = require('irc-colors');
var request = require('request');

var api_key = process.env.IRCBOT_MEETUP_API_KEY || '';

var url = 'https://api.meetup.com/2/events?key=' +
    api_key +
    '&group_urlname=stuttgartjs&sign=true';

!!api_key || console.log('WARNING: IRCBOT_MEETUP_API_KEY missing - set -x IRCBOT_MEETUP_API_KEY "CHANGE_IT"');

module.exports = function (client, config) {

    client.addListener('message', function (nick, to, message, raw) {

        var cmdline = message.split(' ').filter(function (el) {
            return el.length > 0;
        });

        if (cmdline[0].toLowerCase() !== '!meetup' ||
            nick.toLowerCase() === config.irc.nickname.toLowerCase() ||
            (config.plugins.rss.channels.length !== 0 &&
                to[0] === '#' &&
                !config.plugins.rss.channels.some(function (el) {
                    return el == to;
                }))) {

            console.log('MEETUP: command canceld (2)');
            return;
        }

        if (to.toLowerCase() === config.irc.nickname.toLowerCase()) {

            // bot got the message
            to = nick;
        }

        console.log("MEETUP CMD:", nick, to, message, raw);

        request(url, function (error, response, body) {

            //console.log("ERROR:", error);

            if (!error && response.statusCode == 200) {

                var item = JSON.parse(body).results[0];
                //console.log(item);

                var d = (new Date(item.time) + '').split(' ');
                var date = [d[2], d[1], d[3], d[4]].join(' ');

                sendMessage(client, to,
                    color.green(date) + ' ' +
                    color.red(item.name) + ' ' +
                    item.yes_rsvp_count + ' ' +
                    'Teilnehmer' + ' ' +
                    item.event_url
                );

            }
        });
    });

}

function sendMessage(client, to, message) {

    client.say(to, color.green('MEETUP: ') + color.red(message));
    console.log('MEETUP: sendMessage:', to, message);
}
