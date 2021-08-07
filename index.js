require('dotenv').config();

const { Client, Collection } = require('discord.js');
const fs = require('fs');

const { BOT_TOKEN, PREFIX } = process.env;

const client = new Client({ disableEveryone: true });

client.commands = new Collection();
client.aliases = new Collection();
client.prefix = PREFIX;
client.categories = fs.readdirSync('./commands/');

['command', 'event'].forEach((handler) => {
	require(`./handlers/${handler}`)(client);
});

client.on('guildMemberAdd', async (member) => {
	await require('./events/guild/memberAdd')(member);
});

client.on('guildMemberRemove', async (message) => {
	await require('./events/guild/memberRemove')(message);
});

client.login(BOT_TOKEN)
	.then(() => console.log('[BOT INFO] - Bot has successfully logged in'));
