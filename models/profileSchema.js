const mongoose = require('mongoose')

module.exports = mongoose.model(
    'Profiles',
    new mongoose.Schema({
        id: String,
        Tokens: Number
    })
)