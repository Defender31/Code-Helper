const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'lockdown',
    permissions: ['MANAGE_CHANNELS'],
    cooldown: 10 * 60,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        const role = message.guild.roles.everyone;

        if(!args.length) return message.reply('Please specify true or false')

        const query = args[0].toLowerCase()


        if(!['true', 'false'].includes(query)) return message.reply('The option you have stated is not valid!')

        const perms = role.permissions.toArray();
        if(query === "false") {
            perms.push('SEND_MESSAGES');
            
            await role.edit({ permissions: perms });
            message.reply("Server is unlocked")
        } else {
            const NewPerms = perms.filter((perm) => perm !== 'SEND_MESSAGES');
            

            await role.edit({ permissions: NewPerms })
            message.reply("Server is now locked down.");
            const logschannel = message.guild.channels.get('876122753193893909');
            const logembed = new MessageEmbed()
                .setTitle('Server Locked!')
                .addField('By:', message.author, true)
                .setTimestamp()
                .setColor('1cd641')
            logschannel.send(logembed);
        }
    }
}