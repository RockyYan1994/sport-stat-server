const _ = require('lodash');
const express = require('express');
var router = express();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
var TopicService = require('../../service/topicService');
var {authenticate} = require('./../../middleware/authenticate');
var {logger} = require('../../util/logger');

router.get('/',function(req,res){
    TopicService.getAllTopic(function(err, results){
        if (err) {
            console.log(err);
            logger.log(err);
            res.status(500).send("get all topics failed");
        } else {
            res.status(200).send(results);
        }
    })
});

//show routes
router.get('/:id', function(req, res) {
    if (!req.params.id) res.status(400).send('wrong id');
    TopicService.getTopicById(req, function(err, results) {
        if (err) {
            logger.log('get topic failed');
            res.status(500).send(`get topic ${id} failed`);
        } else {
            res.send(results);
        }
    });
});

//Post campgorund routes
router.post('/', authenticate.isAuthenticated, function(req,res){
    //get data from form
    TopicService.createTopic(req, function(err, results) {
        if (err) {
            logger.log('post topic failed');
            res.status(500).send(`get topic ${id} failed`);
        } else {
            res.send(results);
        }
    });    
});

//UPDATE ROUTES
router.put('/:id', authenticate.checkTopicOwnership, function(req,res){
    if (!req.params.id) res.status(400).send('wrong id');    
    TopicService.updateTopic(req, function(err, results) {
        if (err) {
            res.status(500).send(`get topic ${id} failed`);
        } else {
            res.send(results);
        }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete('/:id', authenticate.checkTopicOwnership, function(req,res){
    if (!req.params.id) res.status(400).send('wrong id');    
    TopicService.deleteTopic(req, function(err) {
        if (err) {
            res.status(500).send(`get topic ${id} failed`);
        } else {
            res.send('delete success');
        }
    });
});

module.exports = router;