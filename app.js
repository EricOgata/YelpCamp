var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var campgrounds = [
	{name: "Salmon Creek", image:"https://picsum.photos/500/300/?random"},
	{name: "Demon's Horn", image:"https://picsum.photos/500/300/?random"},
	{name: "Horse Shoe", image:"https://picsum.photos/500/300/?random"},
	{name: "Wildow's Fall", image:"https://picsum.photos/500/300/?random"},
	{name: "Granite Hill", image:"https://picsum.photos/500/300/?random"},
	{name: "Mountain Goat's Rest", image:"https://picsum.photos/500/300/?random"},
];

// Landing Home Page Route
app.get("/", function(req, res){
	res.render("home");
});

// Camping grounds Routes
app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
});

// Add new campground route
app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	campgrounds.push({name: name, image: image});
	res.redirect("campgrounds");
});

// New Campground form route
app.get("/campgrounds/new", function(req, res){
	res.render("new");
});

// 404 - bad request page
app.get("*", function(req, res){
	res.render("404");
});

app.listen(3000, function(req, res){
	console.log("YelpCamp App Has Started");
});