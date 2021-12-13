const { Client, Message, MessageEmbed, Util } = require('discord.js');
const Schema = require('../../models/reactionroles')
module.exports = {
    name: 'add',
    permissions: ['MANAGE_ROLES', 'MANAGE_MEMBERS', 'ADMINISTRATOR'],
    
    cooldown: '',
    description: 'Add a role to the reaction roles panel',
    usage:       '<@role> :emoji:',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const role = message.mentions.roles.first();

        let [, emoji] = args;
        if(!emoji) return message.reply('Please specify a emoji!')

        const parsedEmoji = Util.parseEmoji(emoji);

        Schema.findOne({ Guild: message.guild.id }, async(err, data)=> {
            if(data) {
                data.Roles[parsedEmoji.name] = [
                    role.id, 
                    {
                        id: parsedEmoji.id,
                        raw: emoji
                    }
                ]

                await Schema.findOneAndUpdate({ Guild: message.guild.id }, data);
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Message: 0,
                    Roles: {
                        [parsedEmoji.name]: [
                            role.id,
                            {
                                id: parsedEmoji.id,
                                raw: emoji,    
                            },
                        ],
                    }
                }).save();
                
            }
            message.reply("New role added!");
        })
        
    }
}