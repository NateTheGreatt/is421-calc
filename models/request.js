var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/* Our schema which we'll store the original request, containing all related responses/quotes */

var RequestSchema = new Schema({
  userId: String,
  status: String,
  calcType: String,
  req_obj: Schema.Types.Mixed,
  resp_obj: [],
  common: {type: Schema.Types.ObjectId, ref: 'CommonRequest'}
});

mongoose.model('Request', RequestSchema);
