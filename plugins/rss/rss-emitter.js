/*jshint -W030 */
(function () {
    var EventEmitter, RssEmitter, feedparser, levelup, request, Puid, puid,
        __hasProp = {}.hasOwnProperty,
        __extends = function (child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };

    Puid = require('puid');
    puid = new Puid(true);

    request = require('request');

    Feedparser = require('feedparser');

    levelup = require('levelup');

    EventEmitter = require('events').EventEmitter;

    RssEmitter = (function (_super) {

        __extends(RssEmitter, _super);

        function RssEmitter(db) {
            this.db = db;
        }

        RssEmitter.prototype["import"] = function (url) {
            var fp, pipe, req, self;
            try {

                fp = new Feedparser({
                    addmeta: false
                });
                self = this;
                req = request(url);
                !!process.env.IRCBOT_DEBUG && console.log("REQUEST:",url);

                pipe = req.pipe(fp);

                return pipe.on('readable', function () {
                    var item;

                    item = this.read();
                    return self.db.get(item.guid, function (err, value) {
                        if (err) {
                            item.id = puid.generate();
                            return self.db.put('id\x00' + item.id, item, function (err) {
                                return self.db.put(item.guid, '{ "loaded": "true"}', function (err) {
                                    return self.emit('item:new', item);
                                });
                            });
                        } else {
                            return self.emit('item:skipped', item.guid);
                        }
                    });
                });

            } catch (e) {
                console.error(e);
            }
        };

        return RssEmitter;

    })(EventEmitter);

    module.exports = RssEmitter;

}).call(this);
