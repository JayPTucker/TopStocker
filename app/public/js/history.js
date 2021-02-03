$.get("/api/getHistory", function(data) {

    var historyTmp = localStorage.getItem("history")

    if (historyTmp === null) {
        console.log("No Search History")
        
    } else {
        var oldhistoryarray = historyTmp.split('|');

        if (oldhistoryarray.length !== 0) {

            console.log(oldhistoryarray.length)
            console.log(oldhistoryarray)
            console.log(oldhistoryarray - 1)
            console.log(oldhistoryarray.length - 1)
    
      
          for (var i = 0; i < oldhistoryarray.length; i++) {
            console.log("History Item")
    
            var row = $("<div class='col-md-3 justify-content-center text-center'>");
            row.addClass("item");
      
            row.append(`<img class="stock-img" src='stock-photo.jpg' width='150' height='150'>`)
            row.append("<p class='item-number'>Item # " + data[i].item_number + "</p>");
            row.append(`<div class="col-md-12 stock-div"><span><p>On Hand: ${data[i].quantity}</p><button id='editQty' data-id="${data[i].item_number}">Edit Quantity</button></span></div>`)
            row.append(`<div class="location-div"><span><p>Aisle: ${data[i].aisle_number}, Bay: ${data[i].bay_number}</p></p><button id='editLocation' data-id="${data[i].item_number}">Edit Location</button></span></div>`)
            row.append("<button id='deleteItem' data-id='" + data[i].item_number + "'>Delete Item</button><br>")
            row.append("<p class='creation-date'>Created: " + moment(data[i].createdAt).format("MMMM Do YYYY, h:mm:ss a") + "</p>");
      
            $("#historyArea").prepend(row);
      
          }
        }
    }

    

    
  
    
});