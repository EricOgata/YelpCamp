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
router.post("/", function(req, res){
	Campground.create(
	{
		name: req.body.name, 
		image: req.body.image,
		description: req.body.description,
	}, function(err, campground){
		if(err)
			console.log("A error has occurred:\n" + err);
		else{
			console.log("Campground successfully added:\n" + campground);
			res.redirect("campgrounds");
		}
	});
});
//Show form to create a new campground (NEW ROUTE)
router.get("/new", function(req, res){
	res.render("campgrounds/new");
});
//Display info of a single campground (SHOW ROUTE)
router.get("/:id", function(req, res){
	// find the campground with the provided ID
	// render show template with that campground
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err)
			res.redirect("404");
		else
			res.render("campgrounds/show", {campground: foundCampground});
	});
});

module.exports = router; // exporta do módulo.