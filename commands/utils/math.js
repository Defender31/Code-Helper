const { Client, Message, MessageEmbed } = require('discord.js');
const math = require('mathjs')

module.exports = {
    name: 'math',
    permissions: [],
    cooldown: '',
    description: '',
    usage:       '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            message.channel.send(
                new MessageEmbed()
                    .addField('Question', args.join(" "))
                    .addField('Solution', math.evaluate(args.join(" ")))
                    .setColor("RANDOM")
                    .setTimestamp()
            )
        } catch(err) {
            message.reply('Your question is not valid!');
        }
    }
}