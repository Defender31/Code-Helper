const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')

module.exports = {
    name : 'tempmute',
    category: 'moderation',
    description: 'Temporarly mutes a person',
    permissions: ['MANAGE_MEMBERS'],
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const time = args[1]
        if(!Member) return message.channel.send('Member is not found.')
        if(!time) return message.channel.send('Please specify a time.')
        var reason = args.splice(2).join(' ');
        if(!reason) return message.channel.send('Please specify a reason')
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!role) {
            try {
                message.channel.send('Muted role is not found, attempting to create muted role.')

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send('Muted role has sucessfully been created.')
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if(Member.roles.cache.has(role2.id)) return message.channel.send(`<@${Member.user.id}> has already been muted.`)
        await Member.roles.add(role2)
        message.channel.send(`<@${Member.user.id}> is now muted with the reason: ${reason}.`)
        const logschannel = message.guild.channels.get('876122753193893909');
        var logembed = new MessageEmbed()
        .setTitle('User Muted!')
        .setThumbnail(Member.user.displayAvatarURL())
        .addField('User:', Member, true)
        .addField('By:', message.author, true)
        .addField('Reason:', reason)
        .addField('Mute Time:', time)
        .setTimestamp()
        .setColor('1cd641')
        logschannel.send(logembed);

        setTimeout(async () => {
            await Member.roles.remove(role2)
            message.channel.send(`<@${Member.user.id}> is now unmuted`)
        }, ms(time))
    }
}