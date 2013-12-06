var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/* Our schema which we'll store whatever they're looking to send back to the requestor.*/

var LeaseSchema = new Schema({
  msrp: Number,
  baseCapCost: Number,
  costsAdded: Number,
  capCostReduction: Number,
  adjustedCapCost: Number,
  residualValue: Number,
  moneyFactor: Number,
  term: Number,
  termUnit: String,
  salesTax: Number,
  payment: Number,
  paymentUnit: String,
  financeCharge: Number,
  salesTaxTot: Number,
  totPayments: Number,
  totLeaseCost: Number
});

mongoose.model('Lease', LeaseSchema);
