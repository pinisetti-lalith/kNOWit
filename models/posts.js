var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
   name: String,
   img: String,
   description: String,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
	   
   ],
	author: {
		id: {
			 type: mongoose.Schema.Types.ObjectId,
             ref: "User"
		},
		username: String
	}
});

module.exports = mongoose.model("Post", postSchema);