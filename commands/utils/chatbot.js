const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../models/chatbot')
module.exports = {
    name: 'chatbotchannel',
    aliases: ['setchannel', 'set-chatbotchannel'],
    permissions: ['ADMINISTRATOR'],
    cooldown: '',
    description: 'Sets the chatbot channel',
    usage:       '#channel',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const channel = message.mentions.channels.first() || message.channel;
        Schema.findOne({ Guild: message.guild.id }, async(err,data)=> {
            if(data) data.delete();
            new Schema({
                Guild: message.guild.id,
                Channel: channel.id,
            }).save();
            message.reply(`Chatbot channel saved to ${channel}`);
        })
    }
}