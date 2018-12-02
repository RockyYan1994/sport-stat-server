var {User} = require('./../model/user');
var Topic     = require("../model/topic"),
    Comment        = require("../model/comment"),
    authenticate = {};

authenticate.isAuthenticated = (req, res, next) => {
  var token = req.header('x-auth');
  console.log("received token: " + token);
  User.findByToken(token).then((user) => {
    if (!user) {
      console.log('user not found!');
      return Promise.reject();
    }
    console.log(user);
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    console.log('authenticate failed! ');
    res.status(401).send();
  });
};
    
authenticate.checkTopicOwnership = function(req,res,next){
    if(authenticate.isAuthenticated()){
        Topic.findById(req.params.id,function(err, foundTopic) {
           if(err && !foundTopic){
               req.flash("error","topic not found");
               res.status(404).send('topic not found');
           } else{
               //check if this user is the author,use mongoose method - equals
               if(foundTopic.author.id.equals(req.user._id)){
                   next();
               }else{
                   req.flash("error","you don't have permission!");
                   res.status(403).send("you don't have permission!");
               }
           }
        });
    }else{
        req.flash("error","Please log in first");
        res.status(401).send('Please log in first');
    }
}

authenticate.checkCommentOwnership    = function(req,res,next){
    if(authenticate.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err, foundcomment) {
           if(err && !foundcomment){
               req.flash("error","comment not found ");
               res.status(401).send("comment not found ");
           } else{
               //check if this user is the author,use mongoose method - equals
               if(foundcomment.author.id.equals(req.user._id)){
                   next();
               }else{
                   req.flash("error","Sorry, you don't have the permission");
                   res.status(403).send("Sorry, you don't have the permission");
               }
           }
        });
    }else{
        req.flash("error","Please log in first");
        res.status(401).send("Please log in first");
    }
}

//add middleware to prevent non-user post comments
authenticate.isLoggedIn = function(req,res,next){
    if(authenticate.isAuthenticated()){
        return next();
    }
    req.flash("error","Please log in first");
    res.status(401).send('Please login first');
}

module.exports = {authenticate};
