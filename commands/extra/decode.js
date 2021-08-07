const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
	name: 'decode',
	category: 'extra',
	run: async (client, message, args) => {
		const url = `https://no-api-key.com/api/v1/binary-text?binary=${args.join('%20')}`;

		let response;
		try {
			const { data } = await axios.get(url);
			response = data;
		} catch (e) {
			return message.channel.send('An error occured, please try again!');
		}

		const embed = new MessageEmbed()
			.setTitle('Decode Binary')
			.setDescription(response.text);

		return message.channel.send(embed);
	},
};
