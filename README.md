IRCBOT
======

Yet another Ircbot

Installation
============

```
$ git clone ....

# set environment variables

$ set IRCBOT_NICKNAME "botname"
$ set IRCBOT_SERVER "irc.freenode.net"
$ set IRCBOT_NICKSERV "nickserv-password"
```

Plugins
=======

### RSS Feeds

!rss : print status (ON or OFF) !rss on : activate channel news posting !rss off : deactivate channel news posting !rss lastest : get latest news !rss lastest 5 : get the 5 latest news !rss feeds : list all feeds

### Hello

Output welcome message when user joins the channel

### Meetup

!meetup : Output info for next StuttgartJS Meetup

```
$ set IRCBOT_MEETUP_API_KEY "CHANGE_IT"
```

### Urls

Save URLs from channel messages

### Help

Output help :-)

### Debug

Only for dev
