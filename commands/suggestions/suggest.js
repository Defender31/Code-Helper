const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'suggest',
    description: 'Suggest a suggestion',
    usage: '',
    cooldown: 10000,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const suggestionQuery = args.join(" ");
        if(!suggestionQuery) return message.reply('Please specify a query!');
        if(message.channel.name == 'game-suggestions') {
            const gameembed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .addField('Type', 'Game')
            .addField('Suggestion', suggestionQuery)
            .setColor('RANDOM')
            .setTimestamp()
            .addField('Status', 'PENDING')
        const lh = message.guild.channels.cache.get('908754656346394724')
        lh.send(gameembed);
        message.delete(message.author.lastMessage);
        message.channel.send('Submitted suggestion!')
        }
        if(message.channel.name == 'server-suggestions') {
            const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .addField('Type', 'Server')
            .addField('Suggestion', suggestionQuery)
            .setColor('RANDOM')
            .setTimestamp()
            .addField('Status', 'PENDING')
        message.guild.channels.cache.get('908749467686146058').send(embed);
        message.delete(message.author.lastMessage);
        message.channel.send('Submitted suggestion!')
        }
        
        
        
    }
}