var giphies = ["Cat", "Dog", "Bird", "Tiger", "Turtle", "Hen","Fish","Mouse","Snake","Dolphin","Ant"];
function displayGifInfo() {
    var giphy = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url: queryURL,
        method: 'get'
    }).then(function (response) {
        console.log(response)
        $("#gifs-appear-here").empty();
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var animalDiv = $("<div>");
            animalDiv.addClass("display")
            var p = $("<p>");
            p.addClass("nicefont");
            p.text("Rating: " + results[i].rating);
            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr('state', "still");
            animalImage.attr('still', results[i].images.fixed_height_still.url);
            animalImage.attr('animate', results[i].images.fixed_height.url);
            animalImage.addClass("gif");
            animalDiv.append(p);
            animalDiv.append(animalImage);
            $("#gifs-appear-here").append(animalDiv);
        }
        $(".gif").on("click", function () {
            console.log("hello")
            var state = $(this).attr("state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("animate"));
                $(this).attr("state", "animate");
            } else {
                $(this).attr("src", $(this).attr("still"));
                $(this).attr("state", "still");
            }
        });
        if (response.data.length === 0){
            $("#gifs-appear-here").html("Giphy not found");
        }
    })
}
function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < giphies.length; i++) {
        var a = $("<button>");
        a.addClass("giphy");
        a.addClass("nicefont");
        a.attr("data-name", giphies[i]);
        a.text(giphies[i]);
        $("#buttons-view").append(a);
    }
}
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var giphy = $("#gif-input").val().trim();
    if (!giphies.includes(giphy)) {
        giphies.push(giphy);
    }
    renderButtons();
});
$(document).on("click", ".giphy", displayGifInfo);
renderButtons();

