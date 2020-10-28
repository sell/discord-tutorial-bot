const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "unban",
    category: "moderation",
    run: async (client, message, args) => {

        const member = await client.users.fetch(args[0]);

        if (!member) 
            return message.channel.send('Please enter a users id')
        
        

        const reason = args[0] ? args.slice(1).join(' ') : 'no reason'

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));


        message.guild.fetchBans().then( bans => {
            const user = bans.find(ban => ban.user.id === member.id);
            
            if (user) {
                embed.setTitle(`Successfully Unbanned ${user.user.tag}`)
                    .setColor('#00ff00')
                    .addField('User ID', user.user.id, true)
                    .addField('User Tag', user.user.tag, true)
                    .addField('Banned Reason', user.reason != null ? user.reason : 'no reason')
                    .addField('Unbanned Reason', reason)
                return message.guild.members.unban( user.user.id, reason ).then(() => message.channel.send(embed));
            } else {
                embed.setTitle(`User ${member.tag} isn't banned`)
                    .setColor('#ff0000')
                message.channel.send(embed)
            }
        }).catch(e => {
            console.log(e)
            message.channel.send('An error occurred!')
        });


    }
}
