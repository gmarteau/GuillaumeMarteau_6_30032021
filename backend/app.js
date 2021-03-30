const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect('mongodb+srv://gmarteau:Libertines5@sopekocko.byrk1.mongodb.net/SoPekocko?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


module.exports = app;