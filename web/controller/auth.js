const _ = require('lodash');
const express = require('express');
var router = express();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
var {User} = require('../../model/user');
var {authenticate} = require('./../../middleware/authenticate');
var {logger} = require('../../util/logger');


var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

// POST /user
router.post('/', (req, res) => {
    var body = _.pick(req.body, ['email', 'password', 'username']);
    var user = new User(body);
    logger.info(JSON.stringify(user));
    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      console.log(token);
      res.header('x-auth', token).send(user);
    }).catch((e) => {
      console.log(e);
      res.status(400).send(e);
    })
  });
  
router.get('/me', authenticate.isAuthenticated, (req, res) => {
    logger.info(JSON.stringify(req.user));
    res.send(req.user);
  });
  
router.post('/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);    
    logger.info(JSON.stringify(body));
    User.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      });
    }).catch((e) => {            
      res.status(401).send(e);
    });
  });
  
router.delete('/me/token', authenticate.isAuthenticated, (req, res) => {    
    logger.info(JSON.stringify(req.token));
    req.user.removeToken(req.token).then(() => {
      res.status(200).send();
    }, () => {
      res.status(400).send();
    });
  });

// '/user', POST, register for user
// router.post('/', function(req, res) {
//     console.log("Request received!");
//     console.log(JSON.stringify(req.body));
//     console.log(req.body.password);
//     var hashedPassword = bcrypt.hashSync(req.body.password, 8);

//     User.create({
//         username : req.body.username,
//         password : hashedPassword
//     },
//     function (err, user) {
//         if (err) return res.status(500).send("There was a problem registering the user.")
//         // create a token
//         var token = jwt.sign({ id: user._id }, 'supersecret', { expiresIn: '2 days' }, {
//         expiresIn: 86400 // expires in 24 hours
//         });
//         res.status(200).send({ auth: true, token: token });
//     }); 
// });

// POST /users
// router.post('/', function(req, res) {
//     var body = _.pick(req.body, ['email', 'password']);
//     var user = new User(body);
  
//     user.save().then((user) => {
//       res.send(user);
//     }).catch((e) => {
//       res.status(400).send(e);
//     })
//   });

// // '/user', GET, get user account info
// router.get('/', verifyToken, function(req, res) {        
    
//     jwt.verify(req.token, 'supersecret', function(err, decoded) {
//       if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
//       res.status(200).send(decoded);
//     });
//   });

// '/user', UPDATE, allow user to update the password info.
// router.update('/', function(req, res) {
//     var token = req.headers['x-access-token'];
//     if (!token) return res.status(401,send({ auth: false, message: 'No token provided.'}));

//     jwt.verify(token, 'supersecret', function(err, decoded) {
//         if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'});
//         var newPassword = {  $set: { password: req.body.password }};
//         User.updateOne(decoded.username, newPassword, function(err, res) {
//             if (err) {
//                 console.log('Update user: '+ decoded.username + 'failed');
//                 throw err;
//             }
//             console.log(decoded.username + ' change password successed. ');
//         })
//         res.status(200).send(decoded);
//     });
// });

// '/user', DELETE, allow user to delete their answer.
// router.delete('/', function(req, res) {
//     var token = req.headers['x-access-token'];
//     if (!token) return res.status(401,send({ auth: false, message: 'No token provided.'}));
    
//     jwt.verify(token, 'supersecret', function(err, decoded) {
//         if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'});
//         var deletedUser = { username: req.body.username };
//         User.deleteOne(deletedUser, function(err, obj) {
//             if (err) {
//                 console.log(err);
//                 req.status(500).send( { auth: true, message: 'Failed to delete user' });
//             }
//         })
//         res.status(200).send(decoded);
//     });
// });

// Verify token
// function verifyToken(req, res, callback) {
//     const bearerHeader = new req.headers['authorization'];
//     if (typeof bearerHeader !== 'undefined') {
//         const bearer = bearerHeader.split(' ');

//         const bearerToken = bearer[1];

//         req.token = bearerToken;

//         callback();
//     } else {
//         res.sendStatus(403);
//     }
// }

module.exports = router;