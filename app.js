require('dotenv').config()

//var dotenv = require('dotenv');
//dotenv.load();

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')



const idealWeather = require('./routes/ideal.js')
const locations = require('./routes/locations.js')
const zipcodes = require('./routes/zipcodes.js')
const verification = require('./routes/verification.js')

const PORT = process.env.PORT || 8000
const app = express()

const cors = require('cors')
const pg = require('pg')
const passport = require('./passport')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))



// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next()
// })

var whitelist = ['http://localhost:5000', 'https://fantasticweatherfrontend.firebaseapp.com']

app.use(cors({credentials: true, origin: whitelist}))


app.use(cookieParser())
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {
    secure:false
  }

}))


app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))

app.use('/idealWeather', idealWeather);
app.use('/locations', locations)
// app.use('/users', users)
app.use('/zipcodes', zipcodes)
app.use('/verification', verification)

app.listen(PORT, () => {
  console.log(`The Fantastic 3 + 1 is listening on PORT: ${PORT}`);
})

module.exports = app;
