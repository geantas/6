var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/schema');
var database = require('../model/database');

// GET all stocks //
router.get('/get', function(req, res, next) {
    schema.Stock.find({}).exec(function (err, stocks) {
        if (err)
            return console.error(err);
        console.log("Load success: ", stocks);
        res.send(stocks);
    });

});

// GET A 'NEW POST' PAGE (only for logged in users)
//router.get('/stock/:id', ensureAuthenticated, function (req, res, next) {

router.post('/3', function (req, res) {
    // validation
    console.log("received id: " + req.body._id);
    console.log("received stock price: " + req.body.updatedStockPrice);
    console.log("received stock name: " + req.body.stockName);


    var updatedStockValues = {
       // _id: req.body._id,
        //stockName: req.body.stockName,
        //"stockPrices" : {
            updatedStockPrice: req.body.updatedStockPrice,
            updatedStockAuthor: req.body.updatedStockAuthor,
            updatedStockTimestamp: req.body.updatedStockTimestamp
        //}
    };

    schema.Stock.findOneAndUpdate(
        { _id: req.body._id },
        { $push: { stockPrices: updatedStockValues } },
        function (error, success) {
            if (error) {
                console.log("error: " + error);
            } else {
                console.log("success: " + success);
            }
        });


/*    schema.Stock.update(
        { _id: req.body._id },
        { $push: { "stockPrices": updateInstance } },
        done
    );
    console.log("done!");*/

    /*schema.Stock.findById(req.body._id, function(err, selectedStock) {
        if (!selectedStock) {
            console.log("error: couldn't find the doc with this id: " + req.body._id);
            return new Error("could not load document");
        } else {
            console.log("success! found by ID!" + selectedStock);
            selectedStock.stockPrices.push({
                updatedStockPrice: req.body.updatedStockPrice
            });
            console.log("update success!");
        }
    });*/

/*    updateInstance.push(function (err, updatedStock) {
        result = err?err:updatedStock;
        res.send(result);
        router.notifyclients();
        return result;
    });*/

    /*
    schema.Stock.findById(req.body._id, function(err, updateInstance) {
       if (!updateInstance) {
           console.log("error: couldn't find the doc");
           return new Error("could not load document");
       } else {
           console.log("inside: " + req.body._id);
           updateInstance.stockPrices.push({
               updatedStockPrice: req.body.updatedStockPrice,
               updatedStockAuthor: req.body.updatedStockAuthor,
               updatedStockTimestamp: req.body.updatedStockTimestamp
           })
       }
    });*/

});


/* ADD stock to database */
router.post('/post', function(req, res, next) {
    // validation
    console.log("someone posted");
    // VALIDATION
    if (req.body.stockName)

    var instance = new schema.Stock({
        stockName: req.body.stockName,
        stockAuthor: req.body.stockAuthor,
        stockPrice: req.body.stockPrice,
        stockTimestamp: req.body.stockTimestamp,
        "stockPrices" : {
            updatedStockPrice: req.body.stockPrice,
            updatedStockAuthor: req.body.stockAuthor,
            updatedStockTimestamp: req.body.stockTimestamp
    }
    });

       schema.Stock.find({}).sort({_id:-1}).skip(10).exec(function (err, stocks) {
           console.log("searching for stock ... ");
           if (err)
               return console.error(err);
               // console.log("Loader success: ", stocks);
           stocks.forEach(function(stock){
               // console.log("Loader success: ", stock);
               schema.Stock.findByIdAndRemove(stock._id).exec();
           });
       });

    instance.save(function (err, Stock) {
           result = err?err:Stock;
           res.send(result);
           router.notifyclients();
           return result;
       });
});


/* Notify Stock messages to connected clients */
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
        var toNotify = client?new Array(client):router.clients;
        toNotify.forEach(function(socket){
            socket.emit('refresh', stocks);
        })
    });
}

//export the router
module.exports = router;
