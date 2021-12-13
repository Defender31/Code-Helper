const { Message } = require('discord.js')

module.exports=  {
    name : 'unmute',
    category: 'moderation',
    description: 'Unmutes a person',
    permissions: ['MANAGE_ROLES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run : async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_ROLES')) return;
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.channel.send('Member not found')

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await Member.roles.remove(role)

        message.channel.send(`<@${Member.user.id}> is now unmuted`)
    }
}