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
          row.append("<p>Quantity: " + data[i].quantity + "</p>");
          row.append("<p>At " + data[i].createdAt + "</p>");
          row.append("--------------------------")
    
          $("#itemArea").prepend(row);
    
        }
    }
});

// WHEN THE USER PRESSES THE ADD ITEM BUTTON:
$("#itemSubmit").on("click", function(event) {
  event.preventDefault();

  // MAKE A NEW ITEM OBJECT:
  var newItem = {
    item_number: $("#itemBox").val().trim(),
    isle_number: $("#isleBox").val().trim(),
    bay_number: $("#bayBox").val().trim(),
    quantity: $("#quantityBox").val().trim()
  };

  console.log(newItem);

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newItem)
    // On success, run the following code
    .done(function() {
      var row = $("<div>");
      row.addClass("item");

      row.append("--------------------------")
      row.append("<p>Item Number: " + newItem.item_number + "</p>");
      row.append("<p>Bay Number: " + newItem.bay_number + "</p>");
      row.append("<p>Isle Number: " + newItem.isle_number + "</p>");
      row.append("<p>Quantity Number: " + newItem.quantity + "</p>");
      row.append("<p>At " + moment(newItem.createdAt).format("h:mma on dddd") + "</p>");
      row.append("--------------------------")

      $("#itemArea").prepend(row);
    })

    .fail(function() {
      alert("Error, this item already exists in the Database.  Please try searching by the item number instead.")
    })

  // Empty each input box by replacing the value with an empty string
  $("#itemBox").val("");
  $("#bayBox").val("");
  $("#isleBox").val("");
  $("#quantityBox").val("");
});



// When user hits the author-search-btn
$("#searchSubmit").on("click", function(event) {
  event.preventDefault()

  // Empties the Search Result Row so no results repeat.
  document.getElementById("searchResultArea").innerHTML = ""

  // Save the item they typed in the search input box.
  var itemSearched = $("#searchBox").val().trim();

  // Make an AJAX get request to our api, including the inputted item number.
  $.get("/api/item/" + itemSearched, function(req, res) {
    // IF there isn't anything in the database / an empty array is given out do this:
    if (req[0] == null) {
      alert("This item does not exist in the Database.")

    // Else, if there is a full array / item in the database do this:
    } else {
      console.log("Item Found.")
      // Adding our Data to the page:
      var row = $("<div>");

      row.append("--------------------------")
      row.append("<p>Item Number: " + req[0].item_number + "</p>");
      row.append("<p>Isle Number: " + req[0].isle_number + "</p>");
      row.append("<p>Bay Number: " + req[0].bay_number + "</p>");
      row.append("<p>Quantity: " + req[0].quantity + "</p>");
      row.append("<p>At " + req[0].createdAt + "</p>");
      row.append("--------------------------")

      $("#searchResultArea").prepend(row);
    }
  })
});