const express = require('express');

const userDB = require('./db/sport-stat-user-db.js');
const db = require('./db/sport-stat-db');
const UserController = require('./web/controller/auth');
const PlayerController = require('./web/controller/player');

// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/user', UserController);
app.use('/player', PlayerController);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is run on port : ${port}`);
});