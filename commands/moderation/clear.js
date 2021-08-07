const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'clear',
	category: 'moderation',
	run: async (client, message, args) => {
		if (!message.member.permissions.has('MANAGE_MESSAGES')) {
			return message.channel.send(
				`You do not have correct permissions to do this action, ${message.author.username}`, // returns this message to user with no perms
			);
		}
		if (!args[0]) {
			return message.channel.send('Please enter a amount 1 to 100');
		}

		let deleteAmount;

		if (parseInt(args[0], 10) > 100) {
			deleteAmount = 100;
		} else {
			deleteAmount = parseInt(args[0], 10);
		}

		await message.channel.bulkDelete(deleteAmount, true);

		const embed = new MessageEmbed()
			.setTitle(`${message.author.username}`)
			.setThumbnail(message.author.displayAvatarURL())
			.setDescription(`successfully deleted ${deleteAmount}`)
			.setFooter(message.author.username, message.author.displayAvatarURL())
			.setColor('#f2f2f2');
		return message.channel.send(embed);
	},
};
