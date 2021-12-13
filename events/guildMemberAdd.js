
const ProfileModel = require('../models/profileSchema')

module.exports = async(client, discord, member)=> {
    let profile = await profileModel.create({
        userID: member.id,
        serverID: message.guild.id,
        Tokens: 0,
        bank: 0
    });
    profile.save();
};