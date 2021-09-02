const express = require('express');
const dotenv = require('dotenv');

const bodyparser = require('body-parser');
const path = require('path');
const { connect } = require('mongodb');
const mongoose = require('mongoose');
var fs = require('fs');


const app = express();


const flash = require('connect-flash');
const passport = require('passport');
const nodemailer = require('nodemailer');
const session = require('express-session');
const MongoStore = require('connect-mongo')



const connectDB = require('./server/database/connection');

// Passport Config
require('./server/middleware/passport')(passport);

// Passport config


require('./server/config/passport')(passport)


dotenv.config( {path: 'config.env'} )
const PORT = process.env.PORT || 8080;

connectDB();

app.use(bodyparser.urlencoded( {extended: false} ));
app.use(express.json());

app.use(session({
	secret: 'Your secret key',
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({
      mongoUrl: mongoose.connection._connectionString,
      mongoOptions: { useUnifiedTopology: true }
    }),
}));


app.set("view engine", "ejs")


//passport
app.use(passport.initialize());
app.use(passport.session());

//connect flash

app.use(flash());

// GLobal vars
app.use((req , res , next) => {
  res.locals.sucess_msg =req.flash('sucess_msg')
  res.locals.error_msg =req.flash('error_msg')
  res.locals.error = req.flash('error');
  next()
});



app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/images', express.static(path.resolve(__dirname, "assets/images")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

app.listen(PORT, () => { console.log(`Server started at port ${PORT}`)});

app.use('/', require('./server/routes/routes'));
