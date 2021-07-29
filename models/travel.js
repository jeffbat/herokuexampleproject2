const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    location:  { type: String, required: true },
    img: { type: String, required: true},
    recomended: Boolean
});

const Travel = mongoose.model('Travel', travelSchema)

module.exports = Travel;
