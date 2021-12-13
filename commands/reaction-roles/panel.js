const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../models/reactionroles')
module.exports = {
    name: 'panel',
    permissions: ['ADMINISTRATOR'],
    cooldown: '',
    description: 'Send the reaction roles panel',
    usage:       '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const channel = message.mentions.channels.first() || message.channel;

        Schema.findOne({ Guild: message.guild.id }, async(err, data)=> {
            if(!data) return message.reply("No reaction role data found in the database");
            const mapped = Object.keys(data.Roles)
                .map((value, index)=> {
                    const role = message.guild.roles.cache.get(data.Roles[value][0]);
                    return `${index + 1}) ${data.Roles[value][1].raw} - ${role}`
                }).join("\n\n")
            channel.send(new MessageEmbed().setDescription(mapped)).then((message)=> {
                data.Message = message.id;
                data.save();

                const reactions = Object.values(data.Roles).map((val)=> val[1].id ?? val[1].raw);
                reactions.map((emoji) => message.react(emoji));
            })
        })
    }
}