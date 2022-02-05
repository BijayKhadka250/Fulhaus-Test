const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    acronym: {
        type: String,
        required: true
    },
    definition: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Posts', PostSchema)