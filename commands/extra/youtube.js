const axios = require('axios');
const { MessageEmbed } = require('discord.js');

const { WEATHER_API_KEY } = process.env;

module.exports = {
	name: 'youtube',
	category: 'extra',
	run: async (client, message, args) => {
		if (!args[0]) {
			return message.channel.send('Please enter a youtube channel');
		}

		const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics%2CcontentDetails%2CbrandingSettings%2Csnippet&id=${args[0]}&key=${WEATHER_API_KEY}`;

		let info;

		try {
			const { data } = await axios.get(url);
			[info] = data;
		} catch (e) {
			return message.channel.send('Channel was not found');
		}

		const embed = new MessageEmbed()
			.setTitle(info.brandingSettings.channel.title)
			.setThumbnail(info.snippet.thumbnails.default.url)
			.setColor(info.brandingSettings.channel.profileColor)
			.addFields(
				{
					name: 'Subscriber Count: ',
					value: info.statistics.hiddenSubsciberCount ? 'Subscriber Count is Hidden!' : info.statistics.subscriberCount,
				},
				{
					name: 'Total Channel Views: ',
					value: info.statistics.viewCount,
					inline: true,
				},
				{
					name: 'Total Videos: ',
					value: info.statistics.videoCount,
					inline: true,
				},
				{
					name: 'Channel Description: ',
					value: info.snippet.description,
				},
			);
		return message.channel.send(embed);
	},
};
