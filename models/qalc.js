var mongoose = require('mongoose');

// Set up abstract calc schema
var QalcSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    mediaId: mongoose.Schema.Types.ObjectId,
    quoteId: {type: mongoose.Schema.Types.ObjectId, ref: 'CarQuote'}
});

var QalcModel = mongoose.model('Qalc', QalcSchema);

exports.addOne = function(data, callback) {

    var qalc = new QalcModel();
    qalc.quote = data.id;
    qalc.save();

    callback(qalc._id);
}