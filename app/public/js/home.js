
// Make a get request to our api route that will return every book
$.get("/api/all", function(data) {
    // For each book that our server sends us back
    if (data.length !== 0) {

        for (var i = 0; i < data.length; i++) {
    
          var row = $("<div>");
          row.addClass("item");
    
          row.append("--------------------------")
          row.append("<p>Item Number: " + data[i].item_number + "</p>");
          row.append("<p>Bay Number: " + data[i].bay_number + "</p>");
          row.append("<p>Isle Number: " + data[i].isle_number + "</p>");
          row.append("<p>At " + data[i].createdAt + "</p>");
          row.append("--------------------------")
    
          $("#itemArea").prepend(row);
    
        }
    }
});

// WHEN THE USER PRESSES THE ADD ITEM BUTTON:
$("#itemSubmit").on("click", function(event) {
  event.preventDefault();
  console.log("test")

  // MAKE A NEW ITEM OBJECT:
  var newItem = {
    item_number: $("#itemBox").val().trim(),
    isle_number: $("#isleBox").val().trim(),
    bay_number: $("#bayBox").val().trim(),
  };

  console.log(newItem);

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newItem)
    // On success, run the following code
    .then(function() {

      var row = $("<div>");
      row.addClass("item");

      row.append("--------------------------")
      row.append("<p>Item Number: " + newItem.item_number + "</p>");
      row.append("<p>Bay Number: " + newItem.bay_number + "</p>");
      row.append("<p>Isle Number: " + newItem.isle_number + "</p>");
      row.append("<p>At " + moment(newItem.createdAt).format("h:mma on dddd") + "</p>");
      row.append("--------------------------")

      $("#itemArea").prepend(row);

    });

  // Empty each input box by replacing the value with an empty string
  $("#itemBox").val("");
  $("#bayBox").val("");
  $("#isleBox").val("");
});

// When user hits the author-search-btn
$("#searchSubmit").on("click", function(event) {
  event.preventDefault()

  // Empties the Search Result Row so no results repeat.
  document.getElementById("searchResultArea").innerHTML = ""

  // Save the item they typed in the search input box.
  var itemSearched = $("#searchBox").val().trim();

  // Make an AJAX get request to our api, including the inputted item number.
  $.get("/api/item/" + itemSearched, function(data) {

    // Log the data to the console
    console.log(data);
$    // Adding our Data to the page:
    var row = $("<div>");

    row.append("--------------------------")
    row.append("<p>Item Number: " + data[0].item_number + "</p>");
    row.append("<p>Isle Number: " + data[0].isle_number + "</p>");
    row.append("<p>Bay Number: " + data[0].bay_number + "</p>");
    row.append("<p>At " + data[0].createdAt + "</p>");
    row.append("--------------------------")

    $("#searchResultArea").prepend(row);

  });

});