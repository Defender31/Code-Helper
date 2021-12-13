const { Client, Message, MessageEmbed, ReactionUserManager } = require('discord.js');


module.exports = {
    name: 'antivc',
    permissions: ['MANAGE_ROLES'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!target) return message.reply('Please specify a member!')

        let role = message.guild.roles.cache.find((role) => role.name.toLowerCase() === 'antivc');
        if(!role) {
            try {
                message.channel.send('Attempting to make antivc role!');
                role = await message.guild.roles.create({ 
                    data: {
                    name: 'antivc',
                    permissions: []
                    }
                })

                message.guild.channels.cache.filter((c)=> c.type === 'voice').forEach(async (channel) => {
                    await channel.overwritePermissions(role, {
                        VIEW_CHANNEL: true,
                        CONNECT: false
                    });
                });

                message.channel.send('Role has been created')
            }
            catch(err) {
                console.log(err);
            }
        }
        await target.roles.add(role.id);
        message.channel.send(`${target} has been anti-vced`)
    }
}