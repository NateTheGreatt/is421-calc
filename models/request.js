var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/* Our schema which we'll store the original request, containing all related responses/quotes */

var RequestSchema = new Schema({
  userId: String,
  status: String,
  calcType: String,
  resp_obj: []
});

mongoose.model('Request', RequestSchema);
