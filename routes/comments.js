var express = require("express");
var router 	= express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// NEW Comment = Show new comment form
router.get("/new", isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err)
			res.redirect("404")
		else
			res.render("comments/new",{campground: foundCampground});
	});
});
// CREATE Comment = Add a new comment to campground
router.post("/", isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err)
			res.redirect("404");
		else{
			Comment.create(req.body.comment, function(err, comment){
				if(err)
					res.redirect("404");
				else{
					foundCampground.comments.push(comment);
					foundCampground.save(function(err, comment){
						if(err)
							res.redirect("404");
						else
							res.redirect("/campgrounds/" + req.params.id);
					});
				}
			});
		}
	});
});

// My Middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
		return next();
	res.redirect("/login");
};

module.exports = router; // exporta do módulo.