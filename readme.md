#YelpCamp

##Initial Setup
* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

Each campground has:
 * Name
 * Image

##Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

##Creating new Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

##Style the campgroudns page
* Add a better header/title
* Make campgrounds display in a grid

##Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

#Add Mongoose
* Install and configure mongoose
* Setup campground model
* Use campgroud model inside of our routes!

#Show Page
* Review the RESTful router we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

#Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everythings correctly!

#Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

#Add the Comment model!
* Make our errors go away!
* Display comments on campground show page

#Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

#Style Show Page
* Add Sidebar to Show page
* Display Comments Nicely

#Finish Styling Show Page
* Add public directory
* Add custom stylesheet

##Auth Pt. 1 - Add User Model
* Install all packages needed for auth
* Define User model

##Auth Pt. 2 - Register
* Configure Passport
* Add register routes
* Add register template

##Auth pt. 3 - Login
* Add login routes
* Add login template

##Auth pt. 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Show/Hide auth links correctly

##Auth pt. 5 - Show/Hide Links
* show/hide auth links in navbar correctly

##Refactor The Routes
*  Use Express router to reorganize all routes

##Users + Comments
* Associate users and Comments
* Save author's name to a comment automatically

##Users + Campgrounds
* Prevent an unathenticated user from creating a campground
* Save username + id to newly created campground

##Deleting Campgrounds
* Add Destroy Route
* Add Delete button

##Editing Campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route
* Fix $set Problem

RESTFUL ROUTES

name 	url			verb	description.
======================================================
INDEX	/dogs		GET		Display a list of all dogs.
NEW 	/dogs/new 	GET		Display a form to make a new dog.
CREATE 	/dogs		POST 	Add a new dog to DB.
SHOW 	/dogs/:id 	GET 	Shows info about one dog.

INDEX	/campgrounds
NEW 	/campgrounds/new
CREATE 	/campgrounds
SHOW 	/campgrounds/:id

NEW 	/campgrounds/:id/comments/new 	GET
NEW 	/campgrounds/:id/comments 		POST