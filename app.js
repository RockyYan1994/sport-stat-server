const express = require('express');

const userDB = require('./db/sport-stat-user-db.js');
const db = require('./db/sport-stat-db');
const UserController = require('./web/controller/auth');
const PlayerController = require('./web/controller/player');
const ProfileController = require('./web/controller/profile');
const TopicController = require('./web/controller/topicController');
const CommentController = require('./web/controller/commentController');

// Create a new Express application.
var app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Configure view engine to render EJS templates.
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

app.use('/user', UserController);
app.use('/player', PlayerController);
app.use('/profile', ProfileController);
app.use('/topic', TopicController);
app.use('/comment', CommentController);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is run on port : ${port}`);
});