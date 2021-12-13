const db = require('../../models/warns')
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name : 'clearwarns',
    permissions: ['MANAGE_MEMBERS'],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     *  
     */
    run : async(client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send('User not found.')
        
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                await db.findOneAndDelete({ user : user.user.id, guildid: message.guild.id})
                const Embed = new MessageEmbed()
                .setDescription(`<a:yes:901877910644858891> ***Cleared warns for ${user.user.tag}***`)
                message.channel.send(Embed);
            } else {
                message.channel.send('This user does not have any warns in this server!')
            }
        })
    }
}