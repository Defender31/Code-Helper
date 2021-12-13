const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'denysuggestion',
    permissions: ['MANAGE_MEMBERS'],
    description: 'Denies a suggestion',
    usage: '',
    cooldown: 10000,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const messageID = args[0];
        const denyQuery = args.slice(1).join(" ");

        if(!messageID) return message.reply('Please specify a message ID');
        if(!denyQuery) return message.reply('Please specify a reason!');
        try {
            const suggestionchannel = message.guild.channels.cache.get('908746530670923848', '908749467686146058');
            const suggestedEmbed = await suggestionchannel.messages.fetch(messageID);
            const data = suggestedEmbed.embeds[0];
            const denyembed = new MessageEmbed()
                .setAuthor(data.author.name, data.author.iconURL)
                .setDescription(data.description)
                .setColor('RED')
                .addField("Status (DENIED)", denyQuery)
                .setTimestamp();
            suggestedEmbed.edit(denyembed);

            const user = await client.users.cache.find((u)=> u.tag === data.author.name)
            user.send('Your suggestion has been denied by a moderator!')
        } catch(err) {
            console.log(err);
            message.channel.send('That suggestion does not exist!'); 
        }
    }
}