const mongoose = require('mongoose');

module.exports = mongoose.model(
    "modlogs",
    new mongoose.Schema({
        Guild: String,
        Channel: String,
    })
);

