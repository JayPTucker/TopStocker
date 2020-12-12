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
          isle_number: req.body.isle_number,
          bay_number: req.body.bay_number,
          quantity: req.body.quantity
        }).then(function(results) {
          res.json(results);
        });

      } else {
        console.log("This item does exist.")
        var noitem = "Doesn't Exist"
        res.json(noitem);
      }

    })
  });

  app.get("/api/item/:item_number", function(req, res) {
    Item.findAll({
      where: {
        item_number: req.params.item_number
      }
    }).then(function(results) {
      res.json(results);
    });
  });
  
};