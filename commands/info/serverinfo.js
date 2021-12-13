const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    permissions: [],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const guild = message.guild;

        const infoembed = new MessageEmbed()
        .setTitle(message.guild.name)
        .setThumbnail(message.guild.iconURL())
        .setColor("RANDOM")
        .addField("General Info", [
            `ID: ${guild.id}`,
            `Name: ${guild.name}`,
            `Owner: ${guild.owner ? `Owner: ${guild.owner}`: 'None'}`
        ])
        .addField("Counts", [
            `Roles: ${guild.roles.cache.size} roles`,
            `Channels: ${guild.channels.cache.size} channels total (Text: ${guild.channels.cache.filter((ch) => ch.type === "text").size}), (Voice: ${guild.channels.cache.filter((ch) => ch.type === "voice").size})`,
            `Emojis: ${guild.emojis.cache.size} total (Regular: ${guild.emojis.cache.filter((em) => !em.animated).size}) (Animated: ${guild.emojis.cache.filter((eh) => eh.animated).size})`,
        
        ])
        .addField("Additional Information", [
            `Is Verified: ${guild.verified ? `Is Verified`: 'No'}`,
            `Server Region: ${guild.region}`,
            `Boost Tier: ${guild.premiumTier ? `Tier: ${guild.premiumTier}`: 'None'}`,
            `Boost Count: ${guild.premiumSubscriptionCount || '0'}`,
            `Partnered: ${guild.partnered ? `Partnered: ${guild.partnered}`: 'No'}`,
            `If the value of info value is True then it's Yes.`
        ])
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
        .setTimestamp()
        message.channel.send(infoembed);
        
    }
}