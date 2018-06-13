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

router.post('/:id', function (req, res, next) {
    // validation
    console.log("received id: " + req.body._id);
    console.log("received stock price: " + req.body.updatedStockPrice);

});


/* ADD stock to database */
router.post('/post', function(req, res, next) {
    // validation
    console.log("someone posted");
    // VALIDATION
    if (req.body.stockName)

    var instance = new schema.Stock({
        _id: req.body._id,
        stockPrice: req.body.stockPrice,
        stockName: req.body.stockName,
        stockAuthor: req.body.stockAuthor,
        stockTimestamp: req.body.stockTimestamp,
        "stockPrices" : {
            stockTimestamp: req.body.stockTimestamp,
            initialPrice: req.body.stockPrice,
            stockAuthor: "gintas"
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
