var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/* Catches all the loan info*/

var LoanSchema = new Schema({
  msrp: Number,
  downPayment: Number,
  tradeInValue: Number,
  interestRate: Number,
  term: Number,
  termUnit: String,
  salesTax: Number,
  payment: Number,
  paymentUnit: String
});

mongoose.model('Loan', LoanSchema);
