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
    Item.create({
      item_number: req.body.item_number,
      isle_number: req.body.isle_number,
      bay_number: req.body.bay_number
    }).then(function(results) {
      res.json(results);
    });
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




//   // Get a specific book
//   app.get("/api/:item", function(req, res) {
//     Book.findAll({
//       where: {
//         title: req.params.book
//       }
//     }).then(function(results) {
//       res.json(results);
//     });
//   });

//   // Get all books of a specific genre
//   app.get("/api/genre/:genre", function(req, res) {
//     Book.findAll({
//       where: {
//         genre: req.params.genre
//       }
//     }).then(function(results) {
//       res.json(results);
//     });
//   });

//   // Get all books from a specific author
//   app.get("/api/author/:author", function(req, res) {
//     Book.findAll({
//       where: {
//         author: req.params.author
//       }
//     }).then(function(results) {
//       res.json(results);
//     });
//   });

//   // Get all "long" books (books 150 pages or more)
//   app.get("/api/books/long", function(req, res) {
//     Book.findAll({
//       where: {
//         pages: {
//           $gte: 150
//         }
//       },
//       order: [["pages", "DESC"]]
//     }).then(function(results) {
//       res.json(results);
//     });
//   });

//   // Get all "short" books (books 150 pages or less)
//   app.get("/api/books/short", function(req, res) {
//     Book.findAll({
//       where: {
//         pages: {
//           $lte: 150
//         }
//       },
//       order: [["pages", "ASC"]]
//     }).then(function(results) {
//       res.json(results);
//     });
//   });

//   // Add a book
//   app.post("/api/new", function(req, res) {
//     console.log("Book Data:");
//     console.log(req.body);
//     Book.create({
//       title: req.body.title,
//       author: req.body.author,
//       genre: req.body.genre,
//       pages: req.body.pages
//     }).then(function(results) {
//       res.json(results);
//     });
//   });

//   // Delete a book
//   app.delete("/api/book/:id", function(req, res) {
//     console.log("Book ID:");
//     console.log(req.params.id);
//     Book.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function() {
//       res.end();
//     });
//   });
//
