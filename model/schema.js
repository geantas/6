var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exports = module.exports = {};
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/StocksRates");

autoIncrement.initialize(connection);

exports.stockSchema = new Schema({
    stockName: {
        type: String,
    },
    stockPrice: {
        type: Number
    },
    stockAuthor: {
        type: String
    },
    stockTimestamp: {
        type: Date,
        default: Date.now
    },
    stockPrices: {
        type: [],
        updatedStockPrice: {
            type: Number
        },
        updatedStockAuthor: {
            type: String,
        },
        updatedStockTimestamp: {
            type: Date,
            default: Date.now
        }
    }
});

exports.updatedStockSchema = new Schema({
    updatedStockPrice: {
        type: Number
    },
    updatedStockAuthor: {
        type: String,
    },
    updatedStockTimestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports.addPost = function (newStock, callback) {
    newStock.save(callback);
};

exports.Stock = mongoose.model('Stock', exports.stockSchema);
exports.updatedStockSchema = mongoose.model('updatedStockSchema', exports.updatedStockSchema);
