var mongoose = require('mongoose');

// create file schema for mongo
var Schema = mongoose.Schema;
var FileSchema = new Schema({
    name: {type: String, required: true, unique: true}
});
var File = mongoose.model('File', FileSchema);

exports.index = function(req, res) {
    res.render('login');
};

exports.qalcSelect = function(req, res) {
    res.render('QalcSelect');
};

exports.login = function(req, res) {
    res.render('login');
};

exports.myQalcs = function(req, res) {
    res.render('MyQalc')
};

exports.getOffer = function(req, res) {
    var id = req.params.id;
    console.log(id);
    res.render('offerF');
};