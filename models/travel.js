const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const travelSchema = new mongoose.Schema({
    name:  { type: String },
    location:  { type: String},
    img: { type: String },
    price:{type: Number},
    recomended: {type: Boolean},
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review'
      }
    ]
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
