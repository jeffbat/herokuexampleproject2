const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    location:  { type: String, required: true },
    img: { type: String, required: true},
    price:{type: Number},
    description: { type: String },
    recomended: Boolean,
    // TODO: learn how to add array
    // comment: [
      // {
        // rating: Number
        // review: String
        // username: String
        // commentID: String
      // }
    // ]
});

const Travel = mongoose.model('Travel', travelSchema)

module.exports = Travel;
