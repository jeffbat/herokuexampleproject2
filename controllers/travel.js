const express = require('express');
const travel = express.Router();
const Travel = require('../models/travel.js')


// UPDATE
travel.put('/:id', (req, res) => {
  if(req.body.thingsTodo === 'on'){
    req.body.thingsTodo = true;
  } else {
    req.body.thingsTodo = false;3
  }
  Travel.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updateModel) =>{
    res.redirect('/travel');
  });
});

// EDIT
travel.get('/:id/edit', (req, res) => {
  Travel.findById(req.params.id, (error, foundTravel) => {
    // console.log(foundTravel)
    res.render(
      'edit.ejs',
      {
        travel:foundTravel
      }
    )
  })
})

// DELETE
travel.delete('/:id', (req, res) => {
  Travel.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect('/travel');
  })
});


// INDEX
travel.get('/', (req, res) => {
  Travel.find({}, (error, allTravel) => {
    res.render(
      'index.ejs',
      {
        travel:allTravel
      }
    )
  })
})


// SEED
travel.get('/seed', (req, res) => {
  Travel.create(
    [
      {
        name: 'Washington DC',
        location: 'DC',
        recomended: true
      },
      {
        name: 'Virginia',
        location: 'Arlington',
        recomended: true
      },
      {
        name: 'Maryland',
        location: 'Bethesda',
        recomended: true
      }
    ],
    (error, data) => {
      console.log(error);
      res.redirect('/travel')
    }
  )
})


// NEW
travel.get('/new', (req, res) => {
  res.render('new.ejs')
})


// SHOW
travel.get('/:id', (req, res) => {
  Travel.findById(req.params.id, (error, foundTravel) => {
    res.render(
      'show.ejs',
      {
        travel:foundTravel
      }
    )
  })
})

// CREATE
travel.post('/', (req, res) => {
  if(req.body.thingsTodo === 'on') {
    req.body.thingsTodo = true;
  }else {
    req.body.tingsTodo = false;
  }
  Travel.create(req.body, (error, createdTravel) => {
    console.log ("Error: "+error);
    console.log ("CREATED: "+createdTravel);
    res.send(createdTravel)
  })
})



module.exports = travel;
