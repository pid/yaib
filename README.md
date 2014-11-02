ircbot
------

Installation
------------

```
$ git clone ....

# set environment variables

$ set IRCBOT_NICKNAME "botname"
$ set IRCBOT_SERVER "irc.freenode.net"
$ set IRCBOT_NICKSERV "nickserv-password"
$ set IRCBOT_MEETUP_API_KEY "CHANGE_IT"
```

Config
------

```

    irc: {
        server: 'irc.freenode.net',
        nickname: 'stgtjs',
        options: {
            userName: 'StgtJS',
            realName: 'StuttgartJS ircbot',
            port: 7070,
            debug: false,
            showErrors: false,
            autoRejoin: true,
            autoConnect: true,
            channels: ['#stuttgartjs'],
            secure: true,
            selfSigned: false,
            certExpired: false,
            floodProtection: true,
            floodProtectionDelay: 1000,
            sasl: false,
            stripColors: false,
            channelPrefixes: "&#",
            messageSplit: 512
        }
    },

    // all plugins are enabled by default
    plugins: {
        example: false, // disabled

        rss: {
            // only activ in this channels
            channels: [], // empty than all allowed
            feeds: [
                // echojs.com
                'http://echojs.com/rss',
                // heise.de
                'http://heise.de.feedsportal.com/c/35207/f/653902/index.rss',
                // dailyjs.com
                'http://feeds.feedburner.com/dailyjs?format=xml',
                // t3n.de
                'http://feeds.feedburner.com/aktuell/feeds/rss?format=xml',
                // codegeekz.com
                'http://feeds2.feedburner.com/codegeekz',
                // perfectionkills.com/
                'http://perfectionkills.com/feed.xml',
                // golem.de
                'http://rss.golem.de/rss.php?feed=RSS1.0',
                // html5rocks.com
                'http://feeds.feedburner.com/html5rocks'
            ]
        }
    },
    admins: [
        '_pid',
        'DrMabuse',
        'dypsilon',
        'jorin',
        'xat-',
        'xorrr'
    ]

```

Plugins
-------

RSS Feeds
---------

Meetup
------

IRCBOT_MEETUP_API_KEY
