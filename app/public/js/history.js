var historyTmp = localStorage.getItem("history")
if (historyTmp == null) {
  console.log("No Search History")
  var row = $("<div class='col-md-12 justify-content-center text-center'>");
  row.addClass("item");

  row.append(`<h3>No item Search History Found</h3>`)

  $("#historyArea").prepend(row);

} else {
  // Gets rid of the | in the array.
  var oldhistoryarray = historyTmp.split('|');

  // Removes the empty spot from the array at the end
  oldhistoryarray.splice(-1,1)

  // Sets our Object up to be used in the POST method
  var historyData = {
    itemNumber: oldhistoryarray
  }

  // Sends our HistoryData Object to api-routes
  $.post("/api/getHistory", historyData)

    // If success from api-routes, it takes the data from that and uses it below
    .done(function(data) {

      for (var i = 0; i < oldhistoryarray.length - 1; i++) {  
        var row = $("<div class='col-md-3 justify-content-center text-center'>");
  
        row.append(`<img class="stock-img" src='stock-photo.jpg' width='150' height='150'>`)
        row.append("<p class='item-number'>Item # " + data[i].item_number + "</p>");
        row.append(`<div class="col-md-12 stock-div"><span><p>On Hand: ${data[i].quantity}</p><button id='editQty' data-id="${data[i].item_number}">Edit Quantity</button></span></div>`)
        row.append(`<div class="location-div"><span><p>Aisle: ${data[i].aisle_number}, Bay: ${data[i].bay_number}</p></p><button id='editLocation' data-id="${data[i].item_number}">Edit Location</button></span></div>`)
        row.append("<button id='deleteItem' data-id='" + data[i].item_number + "'>Delete Item</button><br>")
        row.append("<p class='creation-date'>Created: " + moment(data[i].createdAt).format("MMMM Do YYYY, h:mm:ss a") + "</p>");
        row.append("<p class='updated-date'>Last Updated: " + moment(data[i].updatedAt).format("MMMM Do YYYY, h:mm:ss a") + "</p>");
  
        $("#historyArea").prepend(row);
      }
    })

    // If failed to get Item History
    .fail(function() {
      alert("Error.  Unable to gather item history.  Please try again later.")
    })
  
}




