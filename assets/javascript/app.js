var gifList = ["cat", "otter", "ostrich", "frog", "crab", "starfish", "dinodaur", "tapeworm", "sea urchin", "snow leopard"];


// function putOnPage () {
// 	$("#animal-buttons").empty();

// 	for (var k = 0; k < gifList.length; k++){
// 		var newButton = $("<button class='btn btn-primary animal-button'>");
// 		newButton.text(gifList[k]).attr("data-attr", gifList[k]);
// 		$("#animal-buttons").append(newButton);
// 	}
// 	}


// putOnPage();



function makeButtons() {
	for (var i = 0; i < gifList.length; i++) {
		var newButton = $("<button class='btn btn-primary animal-button'>");
		newButton.text(gifList[i]).attr("data-attr", gifList[i]);
		$("#animal-buttons").append(newButton)
	}
}

makeButtons();

$("#userEntry").on("click", function() {
	event.preventDefault();
	var userInput = $("#userSearch").val().trim();
	$("#animal-buttons").empty();
	gifList.push(userInput);
	sessionStorage.setItem("gifList", JSON.stringify(gifList));

	makeButtons();
	$("form").trigger("reset");
})



$(document.body).on("click", ".animal-button", function() {
	$("#display-animals").empty();
	$("#display-instructions").empty();

	var animal = $(this).attr("data-attr");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){

		response = response.data;

		for (var j = 0; j < 10; j++) {
			var newDiv = $("<div class='animal-div'>");

			var newImage = $("<img class='animal'>").attr("img-still", response[j].images.fixed_height_still.url).attr("img-animate", response[j].images.fixed_height.url).attr("data-attr", "still");
			newImage.attr("src", newImage.attr("img-still"))

			var newP = $("<p class='gif-rating'>").html("Rating: " + response[j].rating)

			newDiv.append(newImage);

			newDiv.append(newP);

			$("#display-animals").append(newDiv);
		}
	})

	function instructionText() {
		var displayInstructions = $("<div>")
		var greeting = $("<h1 class='top'>").html("Here are some "+ animal +" Gifs!")
		var instructions = $("<h1 class='top'>").html("Click any Gif to animate!")

		$(displayInstructions).prepend(instructions)
		$(displayInstructions).prepend(greeting)

		$("#display-instructions").append(displayInstructions)
	}

	instructionText();
	

	$(document.body).on("click", ".animal", function(){
		if ($(this).attr("data-attr") === "still") {
			$(this).attr("src", $(this).attr("img-animate"));
			$(this).attr("data-attr", "animate");
		} else if($(this).attr("data-attr") === "animate") {
			$(this).attr("src", $(this).attr("img-still"));
			$(this).attr("data-attr", "still");
		}
	})
})


