const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'dog',
	category: 'animals',
	run: async (client, message, args) => {
		const url = 'https://no-api-key.com/api/v1/animals/dog';

		let image;
		let fact;
		try {
			const { data } = await axios.get(url);
			image = data.image;
			fact = data.fact;
		} catch (e) {
			return message.channel.send('An error occured, please try again!');
		}

		const embed = new MessageEmbed()
			.setTitle('Random Dog Image and Fact')
			.setColor('#f3f3f3')
			.setDescription(fact)
			.setImage(image);

		return message.channel.send(embed);
	},
};
