var express = require("express");
var router = express.Router();
var Post = require("../models/posts");


router.get("/",function(req,res){

	Post.find({},function(err,all){
		if(err){
			console.log("something went wrong");
		}
		else{
		res.render("posts/posts",{posts: all});
		}
	});
	
	// res.render("campgrounds",{ camps: camps})
});

router.post("/",function(req,res){
	var name = req.body.name;
	var img = req.body.image;
	var des = req.body.des;
	var author = {
		id: req.user._id,
		username : req.user.username
	}
	var obj = { name: name,
			    img : img,
			    description: des,
			    author : author
			    };
	
	
	Post.create(obj,function(err,newly){
		if(err)
			{
				console.log("error occured")
			}
		else{
			
			res.redirect("/posts");
		}
	});
	
});

router.get("/new",isLoggedIn,function(req,res){
	 res.render("posts/new");
});



router.get("/:id",function(req,res){
	
	Post.findById(req.params.id).populate("comments").exec(function(err,found){
	if(err){
		console.log("something went wrong");
	}
		else{
			console.log(found);
			res.render("posts/show",{ posts : found});
		}
		
	});
	
	
});

router.get("/:id/edit",check,function(req,res){
		Post.findById(req.params.id , function(err,found){
			res.render("posts/edit",{post: found});
			  
	});

});

router.put("/:id",check,function(req,res){
	
	Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, newPost){
		if(err){
			res.render("/posts");
		}else{
		
		res.redirect("/posts/"+ newPost._id);
			
		}
		
	})
});

router.delete("/:id",check,function(req,res){
	 Post.findByIdAndRemove( req.params.id, function(err){
		
		 if(err){
			 res.redirect("/posts");
		 }else{
			 res.redirect("/posts");
		 }
	 });
							   
});



function isLoggedIn(req,res,next) {
	 if(req.isAuthenticated()){
		 return next();
	 }
	res.redirect("/login");
};


function check(req,res,next){
	if(req.isAuthenticated()){
		Post.findById(req.params.id , function(err,found){
		if(err){
			res.redirect("back");
		}else{
			if(found.author.id.equals(req.user._id)){
			   next();
			   }else{
				   
				   res.redirect("back");
			   }
			
		}
	});
		
	}else{
		
		res.redirect("back");
	}
}
module.exports = router;

