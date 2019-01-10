var mongoose 	= require("mongoose"),
	Campground 	= require("./models/campground"),
	Comment 	= require("./models/comment"),
	User		= require("./models/user");
	faker		= require("faker");

var data = [
	{	
		name: faker.address.streetName(),
		image: faker.image.animals(),
		description: "Mussum Ipsum, cacilds vidis litro abertis. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Interagi no mé, cursus quis, vehicula ac nisi. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Quem manda na minha terra sou euzis!"
	},
	{	
		name: faker.address.streetName(), 
		image: faker.image.nightlife(),
		description: "Mussum Ipsum, cacilds vidis litro abertis. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Interagi no mé, cursus quis, vehicula ac nisi. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Quem manda na minha terra sou euzis!"
	},
	{	
		name: faker.address.streetName(),
		image: faker.image.nature(),
		description: "Mussum Ipsum, cacilds vidis litro abertis. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Interagi no mé, cursus quis, vehicula ac nisi. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Quem manda na minha terra sou euzis!"
	},
	{	
		name: faker.address.streetName(),
		image: faker.image.people(),
		description: "Mussum Ipsum, cacilds vidis litro abertis. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Interagi no mé, cursus quis, vehicula ac nisi. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Quem manda na minha terra sou euzis!"
	},
];

/**
 * seedDB: Re-inicia um novo banco de dados limpo toda vez que o servidor é reiniciado
 * @return {[type]} [description]
 */
function seedDB(){
	// Remove all Users:
	User.remove({}, function(err){
		if(err)
			console.log("Something went bad....\n"+err);
		else
			console.log("Removed Users\n");
	});
	// Remove all campgrounds from Database
	Campground.remove({}, function(err){
		if(err)
			console.log("Something went bad...\n" + err);
		else
			console.log("Removed Campgrounds\n");
	});
	// Remove all Comments from Database
	Comment.remove({}, function(err){
		if(err)
			console.log(err);
		else
			console.log("Removed Comments");
	});
	// Add a few campgrounds (Loop through)
	data.forEach(function(seed){
		Campground.create(seed, function(err, campground){
			if(err)
				console.log("Um erro ocorreu:\n" + err);
			else{
				console.log("Added a new campground:\n");
				// Add a few comments
				Comment.create({
					text: faker.lorem.sentence(),
					author: faker.name.firstName() + " " + faker.name.lastName()
				}, function(err, comment){
					if(err)
						console.log(err);
					else{
						campground.comments.push(comment);
						campground.save(function(err, comment){
							console.log("Created a new comment\n");
						});
					}
				});
			}
		});
	});
	

}

module.exports = seedDB;