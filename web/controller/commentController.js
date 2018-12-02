const _ = require('lodash');
const express = require('express');
var router = express();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
var CommentService = require('../../service/commentService');
var {authenticate} = require('./../../middleware/authenticate');
var {logger} = require('../../util/logger');

//===============
//comments routes
//===============

router.post('/', authenticate.isAuthenticated, function(req,res){    
    CommentService.createComment(req, function(err, results) {
        if (err) {
            res.status(500).send(`post comment failed`);
        } else {
            res.send(results);
        }
    });
});

//update routes
router.put('/:comment_id',authenticate.checkCommentOwnership,function(req,res){
    if (!req.params.comment_id) res.status(400).send('wrong id');
    CommentService.updateComment(req, function(err, results) {
        if (err) {
            res.status(500).send(`post comment failed`);
        } else {
            res.send(results);
        }
    });
});

//COMMENT DESTROY ROUTE
router.delete('/:comment_id',authenticate.checkCommentOwnership,function(req,res){
    if (!req.params.comment_id) res.status(400).send('wrong id');
    CommentService.deleteComment(req, function(err, results) {
        if (err) {
            res.status(500).send(`post comment failed`);
        } else {
            res.send(results);
        }
    });
});

module.exports = router;