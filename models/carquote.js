var mongoose = require('mongoose');

// Set up a schema for car quote options (decoupled from qalc schema for scalability)
var CarQuoteSchema = new mongoose.Schema({
    amount: Number,
    months: Number,
    years: Number,
    interest: Number,
    startDate: Date,
    monthly: Number
});

var CarQuoteModel = mongoose.model('CarQuote', CarQuoteSchema);

exports.addOne = function(data, callback) {
    var carQuote = new CarQuoteModel();
    carQuote.amount = data.amount;
    if(data.term == 'months') carQuote.months = data.termLength;
    else carQuote.years = data.termLength;
    carQuote.interest = data.interest;
//        carQuote.startDate = data.startDate;
    carQuote. monthly = data.monthly;
    carQuote.save();
    callback(carQuote._id);
}