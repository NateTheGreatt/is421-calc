var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/* Basic schema to store items common to all requests */

var CommonRequestSchema = new Schema({
  name: String,
  description: String,
  image: {},
  audio: {},
  comment: []
});

mongoose.model('CommonRequest', CommonRequestSchema);
