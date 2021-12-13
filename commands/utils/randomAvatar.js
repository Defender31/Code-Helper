const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'randomavatar',
    permissions: [],
    cooldown: 1000,
    description: 'Get a random users avatar',
    usage:       '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = client.users.cache.random();

        message.channel.send(
            new MessageEmbed()
                .setColor("RANDOM")
                .setFooter(`${user.tag}'s avatar`)
                .setImage(user.displayAvatarURL())
        )
    }
}