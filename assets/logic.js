let images = [];
let topics = ["Star Wars", "Rugby", "Batman", "Soccer", "Firefly", "The Godfather", "Bioshock", "Music"];
let index = 0;

function renderButton() {
  $("#buttons-view").empty();
  for (var i = 0; i < topics.length; i++) {
    $("#buttons-view").append(`
<button class="topic" data-name="${topics[i]}">${topics[i]}</button>
      `);
  }
};

renderButton();

function getGifs() {
  $("button.topic").on("click", function() {
    images = [];
    $("#gifs").empty()
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      topic + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      let results = response.data
      for (var i = 0; i < results.length; i++) {
        var newDiv = $("<div>");
        images.push(results)
        var p = $("<p>").html("<strong>Rating: </strong>" + results[i].rating);
        var image = $("<img>");
        image.attr("src", results[i].images.fixed_height_still.url).addClass('picture').attr("moving", results[i].images.fixed_height.url).attr("motion", false)
        newDiv.append(p);
        newDiv.append(image)
        $("#gifs").prepend(newDiv);

      }
    });
    animate(images);
  });
};

function animate(images) {
  $('body').on('click', '.picture', function() {
    if (this.motion !== false) {
      let newSrc = $(this).attr("moving");
      $(this).attr("moving", this.src)
      $(this).attr("src", newSrc).attr("motion", true);
    } else {
      let newSrc = $(this).attr("src");
      $(this).attr("src", newSrc).attr("motion", false);
    }

  });
};

$("#add-gif").on("click", function(event) {
  event.preventDefault();
  let call = $("#gif-input").val().trim();
  topics.push(call);
  renderButton();
});

$('body').on('click', '.topic', function() {
  getGifs();
  animate(images);
});