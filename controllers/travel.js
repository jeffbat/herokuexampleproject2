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

// CREATE COMMENT
travel.post ('/:id/create/comment', (req, res) => {
  // TODO: Put code here
  // Travel find by id  add to comment array
  // TODO: learn how to add array
  // comment.push (req.body);
})

// EDIT COMMENT (optional)
travel.post ('/:id/edit/comment/:id', (req, res) => {

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
        img: "https://images.unsplash.com/photo-1589909760831-0f1cc6cde049?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        recomended: true,
        description: Lorem
      },
      {
        name: 'Virginia',
        location: 'Arlington',
        recomended: true,
        description: Lorem,
        img: "https://images.unsplash.com/photo-1589909760831-0f1cc6cde049?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        name: 'Maryland',
        location: 'Bethesda',
        recomended: true,
        description: Lorem,
        img: "https://images.unsplash.com/photo-1589909760831-0f1cc6cde049?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
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
