const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'nuke',
    permissions: ['MANAGE_CHANNELS'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        await message.channel.clone().then((ch)=> {
            ch.setParent(message.channel.parentID);
            ch.setPosition(message.channel.position);
            message.channel.delete();

            ch.send('This channel has been nuked');
        })
    }
}