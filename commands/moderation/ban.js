const { Client, Message, MessageEmbed, DiscordAPIError } = require('discord.js');

module.exports = {
    name: 'ban',
    permissions: ['BAN_MEMBERS'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        var reason = args.slice(1).join(" ");
        var Member = message.mentions.members.first();

        Member.ban({ reason: reason });

    }
}