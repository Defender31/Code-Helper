const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'pull',
    permissions: ['ADMINISTRATOR'],
    cooldown: '',
    description: 'Pulls a member to your voice channel',
    usage:       '@member',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

    }
}