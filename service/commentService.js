var Comment = require("../model/comment"),
    Topic   = require("../model/topic");    

var exports = module.exports = {};

//===============
//comments routes
//===============

exports.createComment = (req, callback) => {
    //find campground by id
    //create comment
    //push new comment into campground
    //save campground and redirect to show
    Topic.findById(req.params.id,function(err, topic) {
       if(err){
           console.log(err);
           callback(err);
       } else{
           Comment.create(req.body.comment,function(err,comment){
              if(err){
                  callback(err);
              } else{
                  //add the current user info into comment
                  comment.author = {id:req.user._id,username:req.user.username};
                  comment.save();
                  //add the new comment into campground
                  topic.comments.push(comment);
                  topic.save();
                  console.log(`add comment success`);
                  callback(null);
              }
           });
       }
    });
};

//update routes
exports.updateComment = (req,callback) => {
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
       if(err){
           callback(err);
       } else{
           console.log(`updated comment ${req.params.comment_id} success`);
           callback(null, updatedComment);           
       }
    });
};

//COMMENT DESTROY ROUTE
exports.deleteComment = (req, callback) => {
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            callback(err);
        }else{
            callback(null, err);
        }
    })
};