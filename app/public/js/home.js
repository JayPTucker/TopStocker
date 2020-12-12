
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
          row.append("<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>");
          row.append("--------------------------")
    
          $("#itemArea").prepend(row);
    
        }
    }
});
  