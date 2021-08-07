const Timeout = new Set();
const ms = require('ms');

module.exports = async (client, message) => {
	if (message.author.bot) return;
	if (!message.content.toLowerCase().startsWith(client.prefix)) return;

	if (!message.member) {
		message.member = await message.guild.fetchMember(message);
	}

	if (!message.guild) return;

	const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));

	if (command) {
		if (command.timeout) {
			if (Timeout.has(`${message.author.id}${command.name}`)) {
				return message.reply(`You can only use this command every ${ms(command.timeout)}!`);
			}

			command.run(client, message, args);
			Timeout.add(`${message.author.id}${command.name}`);
			setTimeout(() => {
				Timeout.delete(`${message.author.id}${command.name}`);
			}, command.timeout);
		} else {
			command.run(client, message, args);
		}
	}
};
