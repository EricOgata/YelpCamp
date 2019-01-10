var express = require("express");
var router 	= express.Router();
var passport = require("passport");
var User = require("../models/user");

// Landing Home Page Route
router.get("/", function(req, res){
	res.render("home");
});

// show Register form
router.get("/register", function(req, res){
	res.render("register");
});
// Handle Sign up logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if (err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});

// show loggin form
router.get("/login", function(req, res){
	res.render("login");
});
// handle Login logic
router.post("/login",
	passport.authenticate("local",{successRedirect:"/campgrounds", failureRedirect:"/login"}),
	function(req, res){
});

// logout route
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
});

// 404 - bad request page
router.get(["*","/404"], function(req, res){
	res.render("404");
});

// My Middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
		return next();
	res.redirect("/login");
};

module.exports = router; // exporta do módulo.