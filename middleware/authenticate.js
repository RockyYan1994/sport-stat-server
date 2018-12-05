var { User } = require('./../model/user');
var Topic = require("../model/topic"),
    Comment = require("../model/comment"),
    { logger } = require('../util/logger');
authenticate = {};

authenticate.isAuthenticated = (req, res, next) => {
    var token = req.header('x-auth');
    logger.info("received token: " + token);
    User.findByToken(token).then((user) => {
        if (!user) {
            logger.info('user not found!');
            return Promise.reject();
        }
        const date = new Date();
        console.log(date.toLocaleString() + "  " + user.username);
        req.user = user;
        req.token = token;
        next(req, res);
    }).catch((e) => {
        logger.info('authenticate failed! ');
        res.status(401).send();
    });
};

authenticate.checkTopicOwnership = (req, res, next) => {
    Topic.findById(req.params.id, function (err, foundTopic) {
        if (err || !foundTopic) {
            logger.info("topic not found");
            res.status(404).send('topic not found');
        } else {
            logger.info(req.user);
            //check if this user is the author,use mongoose method - equals
            if (foundTopic.author.id === req.user._id) {
                next(req, res);
            } else {
                logger.info("you don't have permission!");
                res.status(403).send("you don't have permission!");
            }
        }
    })
        .catch(err => {
            logger.error(err);
        });

}

authenticate.checkCommentOwnership = (req, res, next) => {
    if (authenticate.isAuthenticated(req, res)) {
        Comment.findById(req.params.comment_id, function (err, foundcomment) {
            if (err && !foundcomment) {
                logger.info("comment not found ");
                res.status(401).send("comment not found ");
            } else {
                //check if this user is the author,use mongoose method - equals
                if (foundcomment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    logger.info("Sorry, you don't have the permission");
                    res.status(403).send("Sorry, you don't have the permission");
                }
            }
        });
    } else {
        logger.info("Please log in first");
        res.status(401).send("Please log in first");
    }
}

//add middleware to prevent non-user post comments
authenticate.isLoggedIn = function (req, res, next) {
    if (authenticate.isAuthenticated()) {
        return next();
    }
    logger.info("Please log in first");
    res.status(401).send('Please login first');
}

module.exports = { authenticate };
