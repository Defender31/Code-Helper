const ms = require('ms');
module.exports = async(client) => {
    const guild = client.guilds.cache.get("844560527615197225");
    setInterval(()=> {
        const membercounter = guild.memberCount;
        const channel = guild.channels.cache.get("877111941431173140");
        channel.setName(`Total Members: ${membercounter.toLocaleString()}`)
        console.log(`Updating Member Count`)
    }, ms('10 minutes'));
}