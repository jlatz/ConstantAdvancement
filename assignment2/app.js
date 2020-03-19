/*
 * Author: John Latz
 * Date Created: 3/14/20
 */

//Import npm packages
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.listen(3000, () => console.log("listening..."));

//Read and parse the JSON file
const data = fs.readFileSync('animals.json');
const animals = JSON.parse(data);

//connect to DB
const mongodbURI = 'mongodb+srv://caassignment2:animalsproj@cluster0-8rurw.mongodb.net/test?retryWrites=true&w=majority';

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


//will display all the animals
app.get('/', (request, response) => {
  animalModel.find({ })
    .then((animals) => {
      response.json(animals);
    })
    .catch((err) => {
      console.log(err);
    });
});

//finds the animal in the json file with the same id as inputed from the url
app.get('/:id', (request, response) => {
  animalModel.findOne({'id': request.params.id}, function(err, doc){
    if(err){
      console.log(err);
    }
    response.json(doc);
  });
});
