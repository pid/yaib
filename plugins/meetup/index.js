console.log("PLUGIN: MEETUP loaded");

var utils = require('../../lib/utils');

var color = require('irc-colors');
var request = require('request');

var api_key = process.env.IRCBOT_MEETUP_API_KEY || '';

var url = 'https://api.meetup.com/2/events?key=' +
    api_key +
    '&group_urlname=stuttgartjs&sign=true';

!!api_key || console.log('WARNING: IRCBOT_MEETUP_API_KEY missing - set -x IRCBOT_MEETUP_API_KEY "CHANGE_IT"');

function init(client, config) {

    client.addListener('message', function (nick, to, message, raw) {

        var cmdline = utils.filterCommands(message);

        if (!utils.isCmd('!meetup', cmdline)) {
            return;
        }
        if (utils.isBotMessage(to, config)) {
            to = nick;
        }

        !!process.env.IRCBOT_DEBUG && console.log("MEETUP CMD:", nick, to, message, raw);

        request(url, function (error, response, body) {

            !!process.env.IRCBOT_DEBUG && console.log("ERROR:", error);

            if (!error && response.statusCode == 200) {

                var item = JSON.parse(body).results[0];

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

function help() {
    return (
        color.bold.red.bgyellow('===================================================\n') +
        color.bold.red.bgyellow('MEETUP Plugin\n') +
        color.bold.red.bgyellow('===================================================\n') +
        color.bold.red.bgyellow('!meetup : Output info for next StuttgartJS Meetup\n') +
        color.bold.red.bgyellow('===================================================')
    );
}

module.exports = {
    init: init,
    help: help
}
