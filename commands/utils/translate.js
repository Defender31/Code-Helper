const { Client, Message, MessageEmbed } = require('discord.js');
const translate = require('@iamtraction/google-translate');

module.exports = {
    name: 'translate',
    permissions: [],
    cooldown: 10000,
    description: 'Translates text',
    usage:  '',       
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        
    }
}