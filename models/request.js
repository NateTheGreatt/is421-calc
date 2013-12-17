var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/* Our schema which we'll store the original request, containing all related responses/quotes */

var RequestSchema = new Schema({
  userId: String,
  status: String,
  calcType: String,
  req_obj: Schema.Types.Mixed,
  resp_obj: [],
  common: {}//{type: Schema.Types.ObjectId, ref: 'CommonRequest'} //TODO correct Mongoose: Cast to ObjectId failed for value when updating with this object type
});

mongoose.model('Request', RequestSchema);
