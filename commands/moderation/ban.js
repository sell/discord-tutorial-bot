const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ban',
	category: 'moderation',
	run: async (client, message, args) => {
		if (!message.member.hasPermission('BAN_MEMBERS')) {
			return message.channel.send('You are unable to ban members');
		}
		if (!args[0]) {
			return message.channel.send('Please mention a user!');
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		const reason = args[1] ? args.splice(1).join(' ') : 'No Reason Given';

		try {
			await member.ban({ reason });
			return message.channel.send(`${member} has been banned!`);
		} catch (e) {
			return message.channel.send('User is not in the server!');
		}
	},
};
