const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: String
    },
    gender: {
        type: String
    },
    skills: {
        type: JSON
    }
}, { timestamps: true });

module.exports = mongoose.model('profile', schema);