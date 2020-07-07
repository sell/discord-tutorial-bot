const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "bans",
    category: "extra",
    run: async (client, message, args) => {

        message.guild.fetchBans().then(bans => {
            message.channel.send(`${bans.size} `)
        })

    }
}