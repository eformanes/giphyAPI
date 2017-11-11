var animalNamesArray = ["birds", "fish", "dogs", "cats", "yorkie"];



function displayResults(){
	var clickedAnimalName = $(this).attr("data-animalName");
	console.log(clickedAnimalName);

	var publicBetaAPIKey = "dc6zaTOxFJmzC"

	var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + clickedAnimalName  + '&api_key=' +publicBetaAPIKey;

	$.ajax({
		url:queryURL,
		method:"GET"
	})
	// after data returned
	.done(function(response){
		console.log(response);
		for(var j=0; j < 9; j++){
			var rating = response.data[j].rating;
			var imageDisplay = response.data[j].images.fixed_height.url;
			console.log(imageDisplay);


			var animalDiv = $('<div class="col-md-4">');

			var animalRating = $("<p>").text("Rating: " + rating);

			var animalImage = $("<img>");
			animalImage.addClass("clickableImage");
			animalImage.attr("src", imageDisplay);
			animalImage.attr("data-still", response.data[j].images.fixed_height_still.url);
			animalImage.attr("data-animate", imageDisplay);
			animalImage.attr("data-state", "animate");


			//animalImage.attr("width", 200);



		animalDiv.append(animalRating);
		animalDiv.append(animalImage);

		$("#animalResults").prepend(animalDiv);

		}
	})

}


function renderButtons(){
	$("#animalButtonRow").empty();

	for(var i=0;i<animalNamesArray.length;i++){
		var newButtonGroupDiv = $('<div class="btn-group">');
		newButtonGroupDiv.attr("role", "group");

		var newAnimalButton = $('<button>');
		//newAnimalButton.addClass('btn btn-primary btn-group ' + i+ ' animal');
		newAnimalButton.addClass('btn btn-primary ' + i+ ' animal');
		newAnimalButton.attr("type", "button");

		newAnimalButton.attr("data-animalName", animalNamesArray[i]);
		newAnimalButton.text(animalNamesArray[i]);
		newButtonGroupDiv.append(newAnimalButton);
		$("#animalButtonRow").append(newButtonGroupDiv);

	}


}

function addNewAnimal(){
	var newAnimalName = $("#newAnimal").val();
	console.log(newAnimalName);
	animalNamesArray.push(newAnimalName);

	renderButtons();
	$("#newAnimal").val('');

}

function animateOrStill(){
	if($(this).attr("data-state") === "animate"){
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
	else{
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	}
}



$("#newAnimalBtn").on("click", addNewAnimal);




$(document).on("click", ".animal", displayResults);
$(document).on("click", ".clickableImage", animateOrStill);



renderButtons();