const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name: 'role-name',
    run: async (client, message, args) => {

        try {
            const roleName = message.guild.roles.cache.find(r => r.name === args.toString())
            const perms = new Permissions(roleName.permissions.bitfield).toArray()

            const embed = new MessageEmbed()
                .setColor(roleName.color)
                .setTitle(roleName.name)
                .addFields(
                    {
                        name: 'Role ID: ',
                        value: roleName.id
                    },
                    {
                        name: 'Role Name: ',
                        value: roleName.name
                    },
                    {
                        name: 'Mentionable: ',
                        value: roleName.mentionable ? 'Yes' : 'No'
                    },
                    {
                        name: 'Permissions: ',
                        value: perms.join(', ')
                    }
                )
            await message.channel.send(embed)
        } catch (e) {
            return message.channel.send('Role Doesn\'t Exist').then(() => console.log(e))
        }
       
    }
}
