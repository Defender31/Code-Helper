const client = require('../Main')
const Schema = require('../models/reactionroles')
client.on('messageReactionAdd', async(reaction, user)=> {
        if(reaction.message.channel.id === '903955178867261472') {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;

            Schema.findOne({ Message: reaction.message.id }, async(err, data)=> {
            if(!data) return;
            if(!Object.keys(data.Roles).includes(reaction.emoji.name)) return;
            const [ roleid ] = data.Roles[reaction.emoji.name]
            reaction.message.guild.members.cache.get(user.id).roles.add(roleid);
            })
        }else {
            return;
        }
        
})

client.on('messageReactionRemove', async(reaction, user)=> {
        if(reaction.message.channel.id === '903955178867261472') {
        if(reaction.message.partial) await reaction.message.fetch();
        if(reaction.partial) await reaction.fetch();
        if(user.bot) return;

        Schema.findOne({ Message: reaction.message.id }, async(err, data)=> {
        if(!data) return;
        if(!Object.keys(data.Roles).includes(reaction.emoji.name)) return;
        const [ roleid ] = data.Roles[reaction.emoji.name]
        reaction.message.guild.members.cache.get(user.id).roles.remove(roleid);
        })
    } else {
        return;
    }
})