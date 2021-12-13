const client = require('../Main');
const membercounter = require('../Membercounter')
const mongoose = require('mongoose');
client.on('ready', async() =>{
    console.log(`Universe Battles Bot has logged on!`)

    const statuses = [
        `${client.channels.cache.size} channels`,
        `${client.users.cache.size} users`,
        `Universe Battles discord bot!`,
        `run ?help`,
    ];

    let index = 0;

    setInterval(() => {
        if(index === statuses.length) index = 0;
        const status = statuses[index];
        client.user.setActivity(status);
        index++;
    }, 5000)

    membercounter(client)
    // mongoose
    const mongooseConnectionString = process.env.MONGO
    if (!mongooseConnectionString) return;

    mongoose.connect(mongooseConnectionString).then(() => console.log('Connected to mongodb!'));
})
