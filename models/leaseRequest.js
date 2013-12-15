var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/* Catches all the lease data*/

var LeaseRequestSchema = new Schema({
  msrp: Number,
  costsAdded: Number,		//ie title, registration
  capCostReduction: Number,	//ie rebates
  residualValue: Number,	//ie trade in value
  term: Number,
  termUnit: String
});

mongoose.model('LeaseRequest', LeaseRequestSchema);
