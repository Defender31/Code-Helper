const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'getbans',
    permissions: ['BAN_MEMBERS'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const getBans = message.guild.fetchBans()
        const bannedMembers = (await getBans)
            .map((member)=> `\`${member.user.tag}\``)
            .join(" ")
        if(!bannedMembers) return message.reply('There are no users banned in this server.');
        message.channel.send(bannedMembers);

    }
}