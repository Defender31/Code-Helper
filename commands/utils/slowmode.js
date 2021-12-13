const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'slowmode',
    permissions: ['MANAGE_CHANNELS'],
    cooldown: '',
    /** 
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        
        if(!args[0]) {
            message.channel.setRateLimitPerUser(0);
            return message.channel.send("The slowmode has been removed!");
        }

        const raw = args[0];
        const miliseconds = ms(raw);

        if(isNaN(miliseconds)) return message.reply('This is not a valid time!');

        if(miliseconds < 1000) return message.reply('The minium slowmode is 1 second!');
        if(miliseconds > 21600) return message.reply('It can\'t be more than 6 hours.')

        message.channel.setRateLimitPerUser(miliseconds / 1000);

        message.reply(
            `The slowmode for this channel has been set to ${ms(miliseconds, {
                long: true
            })}`
        )
    }
}