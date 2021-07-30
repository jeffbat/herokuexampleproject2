const express = require('express');
const travel = express.Router();
const catchAsync = require('../utils/catchAsync');
const Travel = require('../models/travel.js')
const Review = require('../models/review.js');
const { travelSchema, reviewSchema} = require('../schemas.js');



const validateReview = (req, res, nex) => {
  const {error} = reviewSchema.validate(req.body);
}

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
        price: 100,
        img: "https://images.unsplash.com/photo-1463839346397-8e9946845e6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=749&q=80",
        recomended: true,
      },
      {
        name: 'Virginia',
        location: 'Arlington',
        price: 100,
        img: "https://images.unsplash.com/photo-1614604825867-5b7ff8c4f6c9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXJsaW5ndG9uJTIwdmF8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        name: 'Maryland',
        location: 'Bethesda',
        price: 100,
        recomended: true,
        img: "https://images.unsplash.com/photo-1550697278-2b4ffe4b910f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFyeWxhbmR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        name: 'California',
        location: 'San Francisco',
        price: 100,
        recomended: true,
        img: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
      },

      {
        name: 'Neveda',
        location: 'Las Vegas',
        price: 100,
        recomended: true,
        img: "https://images.unsplash.com/photo-1470076892663-af684e5e15af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=617&q=80"
      },

      {
        name: 'France',
        location: 'Paris',
        price: 100,
        recomended: true,
        img: "https://images.unsplash.com/photo-1431274172761-fca41d930114?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGFyaXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
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

// travel.get('/:id', catchAsync(async (req, res) => {
//   const travel = await Travel.findById(req.params.id)
//   res.render('travel/show', { travel });
// }));


// REVIEWS
travel.post('/:id/reviews', catchAsync(async (req, res) => {
  const travel = await Travel.findById(req.params.id);
  const review = new Review(req.body.review);
  travel.reviews.push(review);
  await review.save();
  await travel.save();
  res.redirect(`/travel/${travel._id}`);
}))

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
