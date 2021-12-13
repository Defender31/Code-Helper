const {Command} = require('reconlx');
const {getVoiceConnection} = require('@discordjs/voice')

module.exports = new Command({
    name: 'leave',
    aliases: ['dc', 'disconnect', 'stop'],
    description: 'Makes the bot leave the voice channel',
    type: 'CHAT_INPUT',
    run: async({client, interaction}) => {
       const connection = getVoiceConnection(interaction.guild.me.voice);
       connection.destroy();
       interaction.followUp("Disconnected from the channel");
    }
});