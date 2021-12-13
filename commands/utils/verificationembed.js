const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'verificationembed',
    permissions: ['MANAGE_MEMBERS', 'MANAGE_ROLES'],
    description: "Sets up a reaction role message!",
    cooldown: '',
    run: async(client, message, args) => {
        if(message.channel.id !== '903954686900588585') return message.reply('You can\'t use this command here!');
        if(message.channel.id === '903954686900588585') {
        const channel = '903954686900588585';
        const verifyrole = message.guild.roles.cache.find(role => role.name === "Verified");
        
 
        const verifyemoji = '✅';
        
 
        let embed = new MessageEmbed()
            .setColor('#e42643')
            .setTitle('Verification')
            .setDescription('React to verify!\n\n')
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(verifyemoji);
 
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === verifyemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(verifyrole);
                }
                
            } else {
                return;
            }
 
        });
 
        client.on('messageReactionRemove', async (reaction, user) => {
 
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === verifyemoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove();
                }
            } else {
                return;
            }
        });

    }
    }
}   