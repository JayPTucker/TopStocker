// Make a get request to our api route that will return every item
$.get("/api/all", function(data) {

    // For each item that our server sends us back
    if (data.length !== 0) {

        for (var i = 0; i < data.length; i++) {
    
          var row = $("<div>");
          row.addClass("item");
    
          row.append("--------------------------")
          row.append("<p>Item Number: " + data[i].item_number + "</p>");
          row.append("<p>Bay Number: " + data[i].bay_number + "</p>");
          row.append("<p>Isle Number: " + data[i].isle_number + "</p>");
          row.append("<span>Quantity: " + data[i].quantity + "  - <button id='editQty' data-id='" + data[i].item_number + "'>Edit Quantity</button>" + "</span>");
          row.append("<p>Item created at " + moment(data[i].createdAt).format("MMMM Do YYYY, h:mm:ss a") + "</p>");
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
      row.append("<span>Quantity: " + newItem.quantity + "  - <button id='editQty' data-id='" + newItem.item_number + "'>Edit Quantity</button>" + "</span>");
      row.append("<p>Item created at " + moment(newItem.createdAt).format("MMMM Do YYYY, h:mm:ss a") + "</p>");
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
      var row = $("<div class='col-sm-6'>");

      row.append("<h1>Search Results:</h1>")
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

// Edit Quantity Functionality
$("body").on("click", "#editQty", function(event) {
  event.preventDefault()

  console.log("editQty Btn works.")

  var newQty = prompt("What would you like to change the quantity to?")

  var itemNumber = this.getAttribute('data-id')

  var updateItem = {
    itemNumber: itemNumber,
    newQty: newQty
  }
  
  // Grabs the Users Answer for the new Quantity
  console.log(newQty)
  // Grabs the data-id aka the item number.
  console.log(this.getAttribute('data-id'))
  
  $.post("/api/update", updateItem)
    .done(function(){
      console.log("Quantity Update Success")
      alert(`Quantity of item ${itemNumber} has been successfully changed to: ${newQty}`)
      location.reload();
    })
    .fail(function(){
      console.log("Quanity Update Error")
      alert(`Unable to change Quantity due to an internal Server error.`)
    })

})