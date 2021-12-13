const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'bug',
    permissions: [],
    description: 'Sends a bug report to the bot owner',
    cooldown: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
            const query = args.join(" ")
            if(!query) return message.reply('Please specify a BUG!');
            const bugschannel = message.guild.channels.get('883046952458158110');

            const embed = new MessageEmbed()
            .setTitle('New BUG!')
            .addField('Report', query)
            .addField('Author', message.author.toString(), true)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();
            bugschannel.send(embed);
            message.channel.send('Thank you submitted bug!')
    }
}