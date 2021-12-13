const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "reset",
  permissions: ['ADMINISTRATOR'],
  cooldown: '',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first();
    

    if (!member) return message.reply("Please specify a member!");

    try {
      member.setNickname(null);
      message.reply(`Reseted nickname for <@${member.user.id}>`)
    } catch (err) {
      message.reply(
        "I do not have permission to reset " + member.toString() + " nickname!"
      );
    }
  },
};