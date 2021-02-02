// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Item = require("../models/item.js");

// Routes
// =============================================================
module.exports = function(app) {
  // Get all items
  app.get("/api/all", function(req, res) {
    Item.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // Add an item
  // Send an AJAX POST-request with jQuery
  app.post("/api/new", function(req, res) {
    console.log("Item Data:");
    console.log(req.body);

    Item.findAll({
      where: {
        item_number: req.body.item_number
      }
    }).then(function(results) {
      if (results[0] == null) {
        console.log("This item doesn't exist.")

        Item.create({
          item_number: req.body.item_number,
          aisle_number: req.body.aisle_number,
          bay_number: req.body.bay_number,
          quantity: req.body.quantity
        }).then(function(results) {
          res.json(results);
        });

      } else {
        function error() {
          console.log("ERROR.  This item already exists in the database.")
        }
        res.json(error())
      }

    })
  });

  // Search by Item Number GET:
  app.get("/api/item/:item_number", function(req, res) {
    Item.findAll({
      where: {
        item_number: req.params.item_number
      }
    }).then(function(results) {
      res.json(results);
    });
  });



  // Edit Quantity POST:
  app.post("/api/update", function(req, res) {
    console.log("Update Data:")
    console.log(req.body)

    Item.update({ 
      quantity: req.body.newQty
    }, {
      where: {item_number: req.body.itemNumber}
    }).then(function(results) {
      res.json(results)
    })
  })


  // Edit Delete POST:
  app.post("/api/delete", function(req, res) {
    console.log("===============")

    Item.destroy({ 
      where: {
        item_number: req.body.itemNumber
      }
    }).then(function(results) {
      res.json(results)
    })
  })  

  app.post("/api/changeLocation", function(req, res) {

    Item.update({ 
      aisle_number: req.body.newAisle,
      bay_number: req.body.newBay
    }, {
      where: {item_number: req.body.itemNumber}
    }).then(function(results) {
      res.json(results)
    })

  })
};