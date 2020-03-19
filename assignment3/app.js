/*
 * Author: John Latz
 * Date Created: 3/16/20
 */

//Import npm packages
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const pug = require('pug');

const app = express();

// bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//set the path for the pug files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.listen(3000, () => console.log("listening..."));

//Read and parse the JSON file
const data = fs.readFileSync('animals.json');
const animals = JSON.parse(data);

//connect to DB
const mongodbURI = 'mongodb+srv://caassignment2:animalsproj@cluster0-8rurw.mongodb.net/animals?retryWrites=true&w=majority';

mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Schema
let Schema = mongoose.Schema;
let animalSchema = new Schema({
  id: Number,
  name: String,
  description: String,
});

// Model
let animalModel = mongoose.model('AnimalModel', animalSchema);

//input the data from the JSON file into the database
animalModel.insertMany(animals)
  .then(() => console.log('Data successfully entered'))
  .catch(err => console.log(err));


//will display all the animals from the home route
app.get('/', (request, response) => {
  animalModel.find({ }, function(err, animalArr){
    if(err){
      console.log(err);
    } else {
      //load the pug file
      response.render('index', {
        title: 'Animals',
        animalArr: animalArr
      });
    }
  });
});

app.post("/animalOpt" , function(request, response){
  //All animals outputed if 'All' is selected from drop down box
  if (request.body.animalDropDown === 'All'){
    animalModel.find({ }, function(err, animalArr){
      if(err){
        console.log(err);
      } else {
        //load the pug file
        response.render('home', {
          animalDesc: animalArr
        });
      }
    });
  } else {
    animalModel.findOne({'name': request.body.animalDropDown}, function(err, doc){
      if(err){
        console.log(err);
      } else {
        //load the pug file
        response.render('home', {
          animalDesc: doc
        });
      }
    });
  }
});
