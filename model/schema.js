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

exports.userSchema = new Schema({
    fullname: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    }
});

module.exports.addPost = function (newStock, callback) {
    newStock.save(callback);
};

module.exports.stockInfo = function (selectedStock, callback) {
    selectedStock.save(callback);
};

exports.User = mongoose.model('User', exports.userSchema);
exports.Stock = mongoose.model('Stock', exports.stockSchema);
exports.updatedStockSchema = mongoose.model('updatedStockSchema', exports.updatedStockSchema);
