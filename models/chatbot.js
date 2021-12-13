const { Schema, model } = require('mongoose');
let ActualSchema = new Schema({
    Guild: String,
    Channel: String,
})
module.exports = model("chatbot", ActualSchema)