const { tictactoe } = require('reconlx');
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'tictactoe',
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
        const member = message.mentions.members.first();
        if(!member) return message.channel.send("Please specify a member to play with!");

        new tictactoe({
            player_two: member,
            message: message
        })
    }
}