const express = require('express')
const router = express.Router()
var knex = require('../db/knex')

function Location() { return knex('location') }
function Zipcode() { return knex('zipcode') }

//********************* READ *********************//

// http GET localhost:8000/locations
router.get('/', (req,res) => {
  Location().select()
  .then( result => {
    res.json(result).send()
  })
  .catch( result => {
    res.status(404).send()
  })
})

// http GET localhost:8000/locations/:id
router.get('/:id', (req,res) => {
  Location().select().where('id',req.params.id)
  .then( result => {
    res.json(result).send()
  })
  .catch( result => {
    res.status(404).send()
  })
})

//********************* CREATE *********************//

// http POST localhost:8000/locations name='' longitude=# latitude=# zipcode_id=#####
// This route creates a new zip code and location if the requested zip code is not found. If it is found, then a new location is created, but a new zip code is not created.
router.post('/', (req,res) => {
  // if (req.body.zipcode_id && (req.body.zipcode_id).length === 5 && typeof ) {
  //   Zipcode().where('id',req.body.zipcode_id).select()
  //     .then( result => {
  //       if(result.length === 0) {
  //         return Zipcode().insert({id: parseInt(req.body.zipcode_id)},'id')
  //         .then( () => {
  //           return req.body.zipcode_id
  //         })
  //       }
  //       else {
  //         return result[0].id
  //       }
  //     })
  // }
  //
  //   .then( (result) => {
  console.log(req.body)
  if (req.body.name && req.body.longitude && req.body.latitude) {
    Location().insert({
        name: req.body.name,
        longitude: req.body.longitude,
        latitude: req.body.latitude
        // zipcode_id: 80020
      },['id','name','longitude','latitude'])
      .then( result => {
        res.status(201).json(result).send()
      })
  } else {
    res.status(407).send("location object: {name:name, longitude:longitude, latitude:latitude}")
  }

})

//********************* UPDATE *********************//

// http PUT localhost:8000/locations/:id name=''
router.put('/:id', (req,res) => {
  Location().where('id', req.params.id).update({
    name: req.body.name
  },['id','name','longitude','latitude','zipcode_id'])
  .then( result => {
    res.json(result).send()
  })
})

//********************* DELETE *********************//

// http DELETE localhost:8000/locations/:id
router.delete('/:id', (req,res) => {
  Location().where('id',req.params.id).del()
  .then( result => {
    res.json(result).send()
  })
})

module.exports = router
