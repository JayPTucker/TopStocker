// Make a get request to our api route that will return every item
$.get("/api/all", function(data) {

    // For each item that our server sends us back
    if (data.length !== 0) {

        for (var i = 0; i < data.length; i++) {
    
          var row = $("<div class='col-md-3 justify-content-center text-center'>");
          row.addClass("item");
    
          row.append(`<img class="stock-img" src='stock-photo.jpg' width='150' height='150'>`)
          row.append("<p class='item-number'>Item # " + data[i].item_number + "</p>");
          row.append(`<div class="col-md-12 stock-div"><span><p>On Hand: ${data[i].quantity}</p><button id='editQty' data-id="${data[i].item_number}">Edit Quantity</button></span></div>`)
          row.append(`<div class="location-div"><span><p>Aisle: ${data[i].aisle_number}, Bay: ${data[i].bay_number}</p></p><button id='editLocation' data-id="${data[i].item_number}">Edit Location</button></span></div>`)
          row.append("<button id='deleteItem' data-id='" + data[i].item_number + "'>Delete Item</button><br>")
          row.append("<p class='creation-date'>Created: " + moment(data[i].createdAt).format("MMMM Do YYYY, h:mm:ss a") + "</p>");
    
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
    aisle_number: $("#aisleBox").val().trim(),
    bay_number: $("#bayBox").val().trim(),
    quantity: $("#quantityBox").val().trim()
  };

  if(newItem.item_number == "" || newItem.aisle_number == "" || newItem.bay_number == "" || newItem.quantity == "") {
    alert("Error.  Please make sure every box is filled in properly.")
  } else {
    console.log("all data entered in properly")

    console.log(newItem);

    // Send an AJAX POST-request with jQuery
    $.post("/api/new", newItem)
      // On success, run the following code
      .done(function() {
        var row = $("<div class='col-md-3 justify-content-center text-center'>");
        row.addClass("item");
  
        row.append(`<img class="stock-img" src='stock-photo.jpg' width='150' height='150'>`)
        row.append("<p class='item-number'>Item # " + newItem.item_number + "</p>");
        row.append(`<div class="col-md-12 stock-div"><span><p>On Hand: ${newItem.quantity}</p><button id='editQty' data-id="${newItem.item_number}">Edit Quantity</button></span></div>`)
        row.append(`<div class="location-div"><span><p>Aisle: ${newItem.aisle_number}, Bay: ${newItem.bay_number}</p></p><button id='editLocation' data-id="${newItem.item_number}">Edit Location</button></span></div>`)
        row.append("<button id='deleteItem' data-id='" + newItem.item_number + "'>Delete Item</button><br>")
        row.append("<p class='creation-date'>Created: " + moment(newItem.createdAt).format("MMMM Do YYYY, h:mm:ss a") + "</p>");
  
        $("#itemArea").prepend(row);
      })
  
      .fail(function() {
        alert("Error, this item already exists in the Database.  Please try searching by the item number instead.")
      })
  
    // Empty each input box by replacing the value with an empty string
    $("#itemBox").val("");
    $("#bayBox").val("");
    $("#aisleBox").val("");
    $("#quantityBox").val("");
  };
});

// When user hits the author-search-btn
$("#searchSubmit").on("click", function(event) {
  event.preventDefault()

  // Empties the Search Result Row so no results repeat.
  document.getElementById("searchResultArea").innerHTML = ""

  // Save the item they typed in the search input box.
  var itemSearched = $("#searchBox").val().trim();

  // If Statement to see if the search box is empty or not before performing anymore functions.
  if (itemSearched == "") {
    alert("Error.  Please enter in search data into the box below.")

  } else {

    console.log(itemSearched)
    // Make an AJAX get request to our api, including the inputted item number.
    $.get("/api/item/" + itemSearched, function(req, res) {
      // IF there isn't anything in the database / an empty array is given out do this:

      if (req[0] == null) {
        alert("This item does not exist in the Database.")

      // Else, if there is a full array / item in the database do this:
      } else {
        // Adds Item to Local Storage in Search History:
        if (localStorage.getItem("history") != null) {
          var historyTmp = localStorage.getItem("history");
          historyTmp += `${itemSearched}|`;
          localStorage.setItem("history", historyTmp);
        } else {
          var historyTmp = `${itemSearched}|`;
          localStorage.setItem("history", historyTmp)
        }
        
        console.log("Item Found.")
        // Adding our Data to the page:
        var row = $("<div class='col-md-3 justify-content-center text-center'>");
        row.addClass("item");
  
        row.append(`<img class="stock-img" src='stock-photo.jpg' width='150' height='150'>`)
        row.append("<p class='item-number'>Item # " + req[0].item_number + "</p>");
        row.append(`<div class="col-md-12 stock-div"><span><p>On Hand: ${req[0].quantity}</p><button id='editQty' data-id="${req[0].item_number}">Edit Quantity</button></span></div>`)
        row.append(`<div class="location-div"><span><p>Aisle: ${req[0].aisle_number}, Bay: ${req[0].bay_number}</p></p><button id='editLocation' data-id="${req[0].item_number}">Edit Location</button></span></div>`)
        row.append("<button id='deleteItem' data-id='" + req[0].item_number + "'>Delete Item</button><br>")
        row.append("<p class='creation-date'>Created: " + moment(req[0].createdAt).format("MMMM Do YYYY, h:mm:ss a") + "</p>");

        $("#searchResultArea").prepend(row);
      }
    })
  };
});

// Edit Quantity Functionality
$("body").on("click", "#editQty", function(event) {
  event.preventDefault()

  var newQty = prompt("What would you like to change the quantity to?")
  var itemNumber = this.getAttribute('data-id')

  var updateItem = {
    itemNumber: itemNumber,
    newQty: newQty
  }
  
  // Grabs the Users Answer for the new Quantity
  console.log(newQty)

  // If the Prompt Box is Empty and user hits "OK"
  if (newQty == "") {
    alert("Error, please enter in a proper value for the quantity.")

  // If the Cancel Button is pressed:
  } else if (newQty === null) {
    console.log("Operation Cancelled.")
  
  // If a value is entered and "OK" is pressed.
  } else {
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
  }
})

// When you click the Delete Button
$("body").on("click", "#deleteItem", function(event) {
  event.preventDefault()

  var itemNumber = this.getAttribute('data-id')

  var deleteConfirm = prompt(`Are you sure you want to delete this item? To delete, type in the item number: ${itemNumber} below.`)

  var deleteItem = {
    itemNumber: itemNumber,
    deleteConfirm: deleteConfirm
  }

  if (deleteConfirm == itemNumber) {
    $.post("/api/delete", deleteItem)
      .done(function(){
        alert(`Successfully deleted item:  ${itemNumber}`)
        location.reload();
      })
      .fail(function(){
        alert("Error. Cannot delete the item.  Try again.")
      })
  } else {
    alert("Item Number does not match.  Please try again.")
  }

})

// When you click the Edit Location Button
$("body").on("click", "#editLocation", function(event) {
  event.preventDefault()

  var itemNumber = this.getAttribute('data-id')

  var newAisle = prompt("Please enter the new Aisle Location.")
  var newBay = prompt("Now, enter the new Bay Location.")

  var changeLocation = {
    itemNumber: itemNumber,
    newAisle: newAisle,
    newBay: newBay
  }

  if(newAisle == "" || newBay == "") {
    console.log("Error, please make sure both inputs have been filled in with a value.")

  } else if (newAisle === null || newBay === null) {
    console.log("Operation Cancelled.")

  } else {
    // Grabs the data-id aka the item number.
    console.log(this.getAttribute('data-id'))
    
    $.post("/api/changeLocation", changeLocation)
      .done(function(){
        console.log("Quantity Update Success")
        alert(`Location of item # ${itemNumber} has been successfully changed to Aisle ${newAisle}, Bay ${newBay}`)
        location.reload();
      })

      .fail(function(){
        console.log("Quanity Update Error")
        alert(`Unable to change item Location due to an internal Server error.  Please try again later.`)
      })
  }
})