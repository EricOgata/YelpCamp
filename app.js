var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	passport	= require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	Campground 	= require("./models/campground"),
	Comment 	= require("./models/comment"),
	User 		= require("./models/user"),
	seedDB 		= require("./seeds"); // Campground mongoose Model.

// Requiring Routes
var commentRoutes 	 = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes		 = require("./routes/index");

mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static( __dirname + "/public"));
app.use(methodOverride("_method"));

// seedDB(); // Seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once Again Rusty Wins Cutest Dog!",
	resave: false,
	saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware para todas as rotas do app.
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

// Define express routes via import 
// app.use([common url links], routes module)
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(req, res){
	console.log("YelpCamp App Has Started");
});