module.exports = {
    name : 'clear',
    category: 'util',
    description: 'Clear messages (Dangerous for the bot may crash the bot)',
    usage: 'number of messages',
    permissions: ['MANAGE_MESSAGES'],
    run : async(client, message, args) => {
        if(!args[0]) return message.channel.send('Please specify a number of messages to delete ranging from 1 - 99')
        if(isNaN(args[0])) return message.channel.send('Numbers are only allowed')
        if(parseInt(args[0]) > 99) return message.channel.send('The max amount of messages that I can delete is 99')
        await message.channel.bulkDelete(parseInt(args[0]) + 1)
            .catch(err => console.log(err))
        message.channel.send('Deleted ' + args[0]  + " messages.").then(m => m.delete({ timeout: 5000 }))
    }
}