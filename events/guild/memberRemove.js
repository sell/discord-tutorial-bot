// this is where you add your stuff for when a user leavesconst { MessageEmbed } = require("discord.js");
module.exports = async member => {

    // this is finding the channel goodbye
    const channel = member.guild.channels.cache.find(ch => ch.name === 'goodbye');
    if (!channel) return;

    // this is sending a message
    channel.send(`Goodbye, ${member}!`);
};