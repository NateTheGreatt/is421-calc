var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/* Catches all the lease data*/

var LeaseResponseSchema = new Schema({
  msrp: Number,
  baseCapCost: Number,
  costsAdded: Number,
  capCostReduction: Number,
  adjustedCapCost: Number,
  residualValue: Number,
  moneyFactor: Number,			//For example, a money factor of .00297 multiplied by 2400 = 7.13% APR
  term: Number,
  termUnit: String,
  salesTax: Number,
  payment: Number,
  paymentUnit: String,
  financeCharge: Number,
  salesTaxTot: Number,
  totPayments: Number,
  totLeaseCost: Number,
  milesPerYeat : Number			//Miles per year allowance
});

mongoose.model('LeaseResponse', LeaseResponseSchema);
