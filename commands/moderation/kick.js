const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    permissions: ['KICK_MEMBERS'], 
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const Member2 = message.mentions.members.first();
        if(!Member2) return message.reply("Please specify a member to kick!");
        const reason = args.slice(1).join(" ");

        client.modlogs(
            {
                Member: Member2,
                Action: 'Kick',
                Color: "RANDOM",
                Reason: reason
            }, message
        )
    }
}