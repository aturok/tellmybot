# TellMyBot

This telegram bot can accept messages from arbitrary people and forward them to the specified user. Optionally, it will log all received messages so that you can get them in JSON format and process in any way you like.

# It helps...

- When you want to get messages from Telegram users on some topic in one place. If they write to your bot instead of you, you don't need to search for an important message through all your chats - all of the messages are in one place. You still get the contacts of those who write to you.
- When you need to get messages from people on Telegram, but don't want to disclose your identity or tie communication to some specific contact. People can talk to your bot, but don't need to know you or any of your employees.

# To launch

- Rename/copy config.json_ to config.json and change:
	- token - token of your Telegram bot (you get it from the Botfather)
	- target_chat_id - your user id (bot will forward messages to that chat)
	- log_messages - the bot will log messages to json files (one file per month) if this is set to true
	- messages - you may change the texts that users receive from your bot
- Run `npm start`

If you don't know your user id either try https://telegram.me/userinfobot or send /chatid to this bot once started.

# Potential improvements

- Respond user message through bot (!!!)
- Access to older logs through the bot (now provides only this month's log)
- Many 'owners'