var express = require("express");
var router 	= express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// Camping grounds Routes (INDEX ROUTE)
router.get("/", function(req, res){
	// Get all campgrounds from DB.
	Campground.find({},function(err, campgrounds){
		if(err)
			console.log("An Error Has Occurred:\n" + err);
		else{
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	});
});

// Add new campground route (CREATE ROUTE)
router.post("/", isLoggedIn, function(req, res){

	var newCampground = {
		name: req.body.name, 
		image: req.body.image,
		price: req.body.price,
		description: req.body.description,
		author:{
			id: req.user._id,
			username: req.user.username
		}
	};

	Campground.create( newCampground, function(err, campground){
		if(err)
			console.log("A error has occurred:\n" + err);
		else{
			console.log("Campground successfully added:\n" + campground);
			res.redirect("campgrounds");
		}
	});
});
//Show form to create a new campground (NEW ROUTE)
router.get("/new", isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

//Display info of a single campground (SHOW ROUTE)
router.get("/:id", function(req, res){
	// find the campground with the provided ID
	// render show template with that campground
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err)
			res.redirect("/404");
		else{
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

// EDIT CAMPGROUND ROUTE.
router.get("/:id/edit", isLoggedIn, function(req, res){
	// find the campground with the provided ID
	// render show template with that campground
	Campground.findById(req.params.id).exec(function(err, foundCampground){
		if(err)
			res.redirect('/404');
		else
			res.render("campgrounds/edit", {campground: foundCampground});
	});
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", isLoggedIn, function(req, res){
	// Find and UPDATE the correct Campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground,function(err, editedCampground){
		if(err){
			res.redirect('/404');
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

// DESTROY/DELETE Campgrounds ROUTE
router.delete("/:id", isLoggedIn, function(req, res){
	Campground.findByIdAndDelete(req.params.id, function(err, deletedCampground){
		if(err){
			res.redirect("/404");
		}else{
			res.redirect("/campgrounds");
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