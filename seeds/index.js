
const mongoose = require ('mongoose');
const db = mongoose.connection;
require('dotenv').config()
const Travel = require('../models/travel.js')
const travelController = require('./controllers/travel.js');
const ejsMate = require("ejs-mate");
const cities = require('./cities');

const MONGODB_URI = process.env.MONGOD_URI;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false }
);
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));


const seedDB = async() => {
  await Travel.deleteMany({});
  for(let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const trav = new Travel ({
      location: `${cities[random1000].city}, ${cities[random1000].state} `

    })
    await trav.save();
  }
}

seedDB()
