const Telegraf = require('telegraf');
const session = require('telegraf/session');
const dateformat = require('dateformat');
const fs = require('fs');

var _config = null;

function config() {
    if(_config == null)
    {
        _config = JSON.parse(fs.readFileSync("config.json","utf8"));
    }
    return _config;
}

const bot = new Telegraf(config().token);
bot.use(session());

bot.command('start', (ctx) =>
            ctx.reply(config().messages.welcome));

function formatSaveMessage(message) {
    const user = message.from;
    return `${dateformat(message.date*1000,"yyyy-mm-dd, ddd HH:MM")} `
        + `@${user.username} aka ${user.first_name} ${user.last_name} (${user.id}):`
        + `\n${message.text}`;
}

function getLogFilename() {
    const logdir = config().logs_dir;
    return logdir + "/messages" + dateformat(new Date(), "yyyymm") + ".json";
}

function getCurrentLog() {
    const logFile = getLogFilename();
    try {
        return JSON.parse(fs.readFileSync(logFile,"utf8"));
    }
    catch (e){
        return [];
    }
}

function logMessage(message) {
    var log = getCurrentLog();

    const logFile = getLogFilename();
    const user = message.from;
    log.push({
        date: dateformat(message.date*1000,"yyyy-mm-dd, ddd HH:MM"),
        username: user.username,
        fullname: `${user.first_name} ${user.last_name}`,
        user_id: user.id,
        message: message.text});

    fs.writeFileSync(logFile, JSON.stringify(log));
}

bot.command('/chatid', (ctx) =>
            ctx.reply("Our chat id (likely your user id) is: " + ctx.message.chat.id));

bot.command('/messagelog', (ctx) => {
    if(ctx.message.chat.id == config().target_chat_id) {
        ctx.reply(JSON.stringify(getCurrentLog()));
    }});

bot.on('text', (ctx) => {
    ctx.telegram.forwardMessage(config().target_chat_id,
                                ctx.message.chat.id,
                                ctx.message.message_id);
    ctx.reply(config().messages.confirmation);
    if(config().log_messages)
        logMessage(ctx.message);
});


bot.startPolling();
