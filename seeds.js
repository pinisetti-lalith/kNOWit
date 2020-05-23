var mongoose   = require("mongoose");
var Post = require("./models/posts");
var Comment    = require("./models/comments");

var data = [
	
];



 
function seedDB(){
   // Campground.remove({}, function(err){
   //      if(err){
   //          console.log(err);
   //      }
   //      console.log("removed campgrounds!");
   //      Comment.remove({}, function(err) {
   //          if(err){
   //              console.log(err);
   //          }
   //          console.log("removed comments!");
            
            data.forEach(function(seed){
                Post.create(seed, function(err, post){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a post");
                     
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    post.comments.push(comment);
                                    post.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
    //     });
    // }); 
    
}

module.exports = seedDB;
