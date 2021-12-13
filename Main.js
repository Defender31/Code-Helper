const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({ 
    disableMentions: 'everyone',
    partials : ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION"],
    intents: ['GUILDS', "GUILD_MEMBERS", "GUILD_BANS", "GUILD_MESSAGES", "GUILD_EMOJIS_AND_STICKERS", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES"]
});
const path = require('path');
const fs = require('fs');
const Schema = require('./models/profileSchema')
const mongoose = require('mongoose');
const antijoin = new Discord.Collection(); // key: guildid | value: userid[]
module.exports = client, antijoin
client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.aliases = new Discord.Collection();
require("./handlers/Main")(client);
const modlogsSchema = require('./models/modlogs');
client.modlogs =  async function({ Member, Action, Color, Reason }, message) {
    const data = await modlogsSchema.findOne({ Guild: message.guild.id });
    if(!data) return;

    const channel = message.guild.channels.cache.get(data.Channel);
    const logembed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} (${message.author.id})`,  message.author.displayAvatarURL({ dynamic: true }))
        .setColor(Color)
        .addField('Member:',  `\`${Member.user.tag}\` (${Member.user.id})`)
        .setDescription('**Action**:', `${Action}`)
        .setThumbnail(`${Member.user.displayAvatarURL({ dynamic: true })}`)
        .setTimestamp()
    channel.send(logembed);
}

// functions
client.bal = (id) => new Promise(async ful => {
    const data = await Schema.findOne({ id });
    if(!data) return ful(0);
    ful(data.Tokens);
})
client.add = (id, Tokens) => {
    Schema.findOne({ id }, async(err, data)=> {
        if(err) throw err;
        if(data) {
            data.Tokens += Tokens
        } else {
            data = new mongoose.Schema({ id, Tokens: -Tokens })
        }
        data.save();
    })
}

client.login(process.env.DISCORD_BOT_TOKEN)