const client = require('../Main')
const antijoin = require('../Main')

client.on('guildMemberAdd', async(member)=> {
    const getCollection = antijoin.get(member.guild.id);
    if(!getCollection) return;
    if(!getCollection.inculdes(member.user)) {
        getCollection.push(member.user);
    }
    member.kick({ reason: "Antijoin was is active" });
})