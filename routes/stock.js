var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/schema');
var database = require('../model/database');

// GET all stocks //
router.get('/get', function (req, res, next) {
    schema.Stock.find({}).exec(function (err, stocks) {
        if (err)
            return console.error(err);
        console.log("Load success: ", stocks);
        res.send(stocks);
    });

});

// GET one stock's history //
router.post('/info', function (req, res) {
    console.log("received a request");
    //res.redirect("https://gintas.dk");
});

// UPDATE a stock //
router.post('/update', function (req, res) {
    // console.log("received id: " + req.body._id);

    // Create a stock "template", which will be added to database
    var updatedStockValues = {
        updatedStockPrice: req.body.updatedStockPrice,
        updatedStockAuthor: req.body.updatedStockAuthor,
        updatedStockTimestamp: req.body.updatedStockTimestamp
    };

    // Find a stock and update it
    schema.Stock.findOneAndUpdate(
        {_id: req.body._id},
        {$push: {stockPrices: updatedStockValues}},
        function (error, success) {
            if (error) {
                console.log("Error: " + error);
            } else {
                //console.log("success: " + success);
                console.log("Stock has been successfully updated");
            }
        },
        function (err, Stock) {
            result = err ? err : Stock;
            res.send(result);
            router.notifyclients();
            return result;
        });
});

// ADD a stock to database route //
router.post('/post', function (req, res, next) {
    //console.log("something was posted");

    // Validation
    if (req.body.stockName)

    // Create a stock instance (prepare a stock "template" to be added)
        var instance = new schema.Stock({
            stockName: req.body.stockName,
            stockAuthor: req.body.stockAuthor,
            stockPrice: req.body.stockPrice,
            stockTimestamp: req.body.stockTimestamp,
            "stockPrices": {
                updatedStockPrice: req.body.stockPrice,
                updatedStockAuthor: req.body.stockAuthor,
                updatedStockTimestamp: req.body.stockTimestamp
            }
        });

    // Save the template to database
    instance.save(function (err, Stock) {
        result = err ? err : Stock;
        res.send(result);
        router.notifyclients();
        return result;
    });
});

// DELETE a stock from database route //
router.post('/delete', function (req, res, next) {

    console.log("received id: " + req.body._id);
    console.log("received stock name: " + req.body.stockName);

    // delete ONLY ONE document from database collection
    var item = schema.Stock.findOne(
        {_id: req.body._id},
        function (error, success) {
            if (error) {
                console.log("Error: " + error);
            }
        });

    schema.Stock.remove(
        {_id: req.body._id},
        function (err, Stock) {
            result = err ? err : Stock;
            res.send(result);
            router.notifyclients();
            return result;
        },
        // Update view in real-time
        function (error, success) {
            if (error) {
                console.log("Error: " + error);
            } else {
                console.log("Stock has been removed");
            }
        });
});

// Notify about stock list to connected clients
router.clients = [];
router.addClient = function (client) {
    router.clients.push(client);
    router.notifyclients(client);
};
router.notifyclients = function (client) {
    schema.Stock.find({}).exec(function (err, stocks) {
        if (err)
            return console.error(err);
        //console.log("Load success: ", stocks);
        var toNotify = client ? new Array(client) : router.clients;
        toNotify.forEach(function (socket) {
            socket.emit('refresh', stocks);
        })
    });
}

// Export the router
module.exports = router;
