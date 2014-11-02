exports = module.exports = {
    isChannel: isChannel,
    filterCommands: filterCommands,
    isCmd: isCmd,
    isBotMessage: isBotMessage

};

function isChannel(value) {}

function filterCommands(message) {
    return message.split(' ').filter(function (el) {
        return el.length > 0;
    });
}

function isCmd(value, cmdline) {

    return (
        cmdline[0].toLowerCase() === value.toLowerCase()
    );
}

function isBotMessage(to, config) {

    return (
        to.toLowerCase() === config.irc.nickname.toLowerCase()
    );

}
