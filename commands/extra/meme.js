const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'meme',
	category: 'extra',
	run: async (client, message, args) => {
		const url = 'https://no-api-key.com/api/v1/memes';

		let response;
		try {
			const { data } = await axios.get(url);
			response = data;
		} catch (e) {
			return message.channel.send('An error has occured, try again!');
		}

		const embed = new MessageEmbed()
			.setTitle('Random Meme: ')
			.setColor('#f3f3f3')
			.setImage(response.image);

		return message.channel.send(embed);
	},
};
