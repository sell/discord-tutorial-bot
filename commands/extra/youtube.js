const axios = require('axios');
const api = require('../.././botconfig.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "youtube",
    category: "extra",
    run: async (client, message, args) => {
        api_key = api.YOUTUBE_API_KEY;

        if (!args[0]) {
            return message.channel.send(`Please enter a youtube channel`);
        }

        const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics%2CcontentDetails%2CbrandingSettings%2Csnippet&id=${args[0]}&key=${api_key}`;

        let response, channel, info;

        try {
            response = await axios.get(url)
            channel = response.data
            info = channel.items[0]
        } catch (e) {
            return message.channel.send(`Channel was not found`)
        }

        const embed = new MessageEmbed()
            .setTitle(info.brandingSettings.channel.title)
            .setThumbnail(info.snippet.thumbnails.default.url)
            .setColor(info.brandingSettings.channel.profileColor)
            .addFields(
                {
                    name: "Subscriber Count: ",
                    value: info.statistics.hiddenSubsciberCount ? `Subscriber Count is Hidden!` : info.statistics.subscriberCount
                },
                {
                    name: "Total Channel Views: ",
                    value: info.statistics.viewCount,
                    inline: true
                },
                {
                    name: 'Total Videos: ',
                    value: info.statistics.videoCount,
                    inline: true
                },
                {
                    name: "Channel Description: ",
                    value: info.snippet.description
                }
            )
        await message.channel.send(embed)
    }
}