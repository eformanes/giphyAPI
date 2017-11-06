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


			var animalDiv = $("<div>");

			var animalRating = $("<p>").text("Rating: " + rating);

			var animalImage = $("<img>");
			animalImage.attr("src", imageDisplay);



		animalDiv.append(animalRating);
		animalDiv.append(animalImage);

		$("#animalResults").prepend(animalDiv);

		}
	})

}


function renderButtons(){
	$("#animalButtonRow").empty();

	for(var i=0;i<animalNamesArray.length;i++){
		var newAnimalButton = $("<button>");
		newAnimalButton.addClass('btn btn-primary btn-group ' + i+ ' animal');
		newAnimalButton.attr("data-animalName", animalNamesArray[i]);
		newAnimalButton.text(animalNamesArray[i]);
		$("#animalButtonRow").append(newAnimalButton);

	}


}

function addNewAnimal(){
	var newAnimalName = $("#newAnimal").val();
	console.log(newAnimalName);
	animalNamesArray.push(newAnimalName);

	renderButtons();

}


$("#newAnimalBtn").on("click", addNewAnimal);




$(document).on("click", ".animal", displayResults);




renderButtons();