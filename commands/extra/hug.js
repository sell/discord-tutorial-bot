const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
	name: 'hug',
	category: 'extra',
	run: async (client, message, args) => {
		const url = 'https://no-api-key.com/api/v1/hug';

		let response;
		try {
			const { data } = await axios.get(url);
			response = data;
		} catch (e) {
			return message.channel.send('An error occured!');
		}

		const embed = new MessageEmbed()
			.setTitle(`@${message.author.username} hugs @${message.mentions.users.first().username || message.mentions.members.first()}`)
			.setImage(response.link);

		return message.channel.send(embed);
	},
};
