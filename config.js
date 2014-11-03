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
            channels: ['#stuttgartjs-links', '#stuttgartjs'],
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
        debug: true,
        example: false, // disabled
        hello: {
            salutation: 'Welcome, ',
            message: 'Send "!help" to get help'

        }, // enabled
        urls: true,
        rss: {
            // only activ in this channels
            channels: [ '#stuttgartjs-links'], // empty than all allowed
            //channels: ['#stuttgartjs-links'], // empty than all allowed
            limit: 42, // limit for rss latest
            feeds: [
                // echojs.com
                'http://echojs.com/rss',
                // heise.de
                'http://www.heise.de/open/news/news-atom.xml',
                'http://www.heise.de/security/news/news-atom.xml',
                'http://www.techstage.de/rss.xml',
                'http://www.heise.de/developer/rss/news-atom.xml',
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
                'http://www.drweb.de/magazin/feed/',
                //
                'http://feeds.feedburner.com/CssTricks',
                // http://www.sitepoint.com/
                'http://www.sitepoint.com/feed',
                //
                'http://ariya.ofilabs.com/feed',
                //
                'http://feeds.feedburner.com/ModernWebHQ',
                //
                'http://www.dezignmatterz.com/feed',
                // http://tympanus.net/codrops/
                'http://feeds2.feedburner.com/tympanus',
                //
                'http://news.centurylinklabs.com/rss',
                //
                'http://howtonode.org/feed.xml',
                //
                'http://marijnhaverbeke.nl/blog/feed.atom',
                //
                'http://www.geek-week.de/feed/',
                //
                'http://googlewebmastercentral.blogspot.com/atom.xml',
                //
                'http://www.seo-united.de/blog/feed',
                //
                'http://davidwalsh.name/feed',
                //
                'http://feeds.feedburner.com/TechCrunch/',
                //
                'http://ponyfoo.com/articles/feed',
                //
                'http://news.google.de/news?pz=1&cf=all&ned=de&hl=de&topic=t&output=rss',
                //
                'http://www.planetnodejs.com/feed'
                //




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
