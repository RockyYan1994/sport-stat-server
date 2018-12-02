const Topic = require('./../model/topic');

var topicService = {};

topicService.getAllTopic = (callback) => {
    Topic.find( {  }, function(err,results){
        if(err){
            console.log('query all topic failed');
            callback(err);
        }
        else{
            console.log('query all topic success');
            callback(null, results);
        }
    });
};

//show routes
topicService.getTopicById = (req, callback) => {
    Topic.findById(req.params.id).populate("comments").exec(function(err,foundTopic){
        if(err && !foundTopic){
            console.log(`query topic ${req.params.id} failed`);
            callback(err);
        }
        else{
            callback(null, foundTopic)
        }
    });
};

//Post campgorund routes
topicService.createTopic = (req,callback) => {
    //get data from form
    var title = req.body.title;
    var img = req.body.img;
    var desc = req.body.desc;
    var content = req.body.content;
    var keyWords = req.body.keyWords;
    var author = {
        id        :  req.user._id,
        username  :  req.user.username
    };
    console.log(keyWords);
    var topic = {title:title,img:img,desc:desc,keyWords:keyWords,author:author, content:content};
    Topic.create(topic,function(err,results){
       if(err){
           console.log(err);
           callback(err);
       } 
       else{
        //   console.log("add successfully");
        //   console.log(newcampground);
           //redirect to campgrounds page
            callback(null, results);
       }
    });
    
};

//UPDATE ROUTES
topicService.updateTopic = (req,callback) => {
   //find and update the right campground
   Topic.findByIdAndUpdate(req.params.id,req.body.topic,function(err,results){
       if(err){
           console.log(err);
           callback(err);
       }else{
           console.log("success to edit!");
           callback(null, results);
       }
   });
};

// DESTROY CAMPGROUND ROUTE
topicService.deleteTopic = (req,callback) => {
    Topic.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            callback(err);
        }else{
            console.log("success to delete!");
            callback(null);
        }
    });
};

module.exports = topicService;