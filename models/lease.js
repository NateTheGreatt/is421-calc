var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/* Catches all the lease data*/

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
