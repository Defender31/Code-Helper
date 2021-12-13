const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'balance',
    permissions: [],
    aliases: ['bal', 'bl'],
    cooldown: '',
    description: '',
    usage:       '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const bal = await client.bal(message.member.id);
        message.channel.send(new MessageEmbed()
        .setAuthor(`${message.author.tag}'s balance`, message.author.displayAvatarURL({ dynamic: true }))
        .addField('Coins:', bal)
        .setTimestamp()
        )
    }
}