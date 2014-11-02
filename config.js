module.exports = {
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
            channels: ['#stuttgartjs', '#stuttgartjs-links'],
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
            channels: ['#stuttgartjs-links', '#stuttgartjs'], // empty than all allowed
            limit: 42, // limit for rss latest
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
                'http://feeds.feedburner.com/html5rocks',
                // redit/javascript
                'http://www.reddit.com/r/javascript/.rss',
                //
                'http://www.2ality.com/feeds/posts/default',
                //
                'https://hacks.mozilla.org/feed/',
                //
                'http://www.smashingmagazine.com/feed/',
                //
                'http://www.dezignmatterz.com/feed',
                // http://highscalability.com/
                'http://feeds.feedburner.com/HighScalability',
                //
                'http://www.silicon.de/feed/',
                //
                'http://www.drweb.de/magazin/category/javascript/feed/',
                //
                'http://feeds.feedburner.com/CssTricks',
                // http://www.sitepoint.com/javascript/
                'http://www.sitepoint.com/javascript/feed/',
                //
                'http://ariya.ofilabs.com/feed',
                //
                'http://feeds.feedburner.com/ModernWebHQ',
                //
                'http://www.dezignmatterz.com/feed',
                // http://tympanus.net/codrops/
                'http://feeds2.feedburner.com/tympanus',
                //
                'http://news.centurylinklabs.com/rss'

            ]
        }
    },
    admins: [
        '_pid',
        'DrMabuse',
        'xat-',
        'jorin',
        'dypsilon',
        'xorrr'
    ]
};
