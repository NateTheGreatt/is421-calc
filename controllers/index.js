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
    res.render('qalcSelect');
};

exports.login = function(req, res) {
    res.render('login');
};

exports.bankOffer = function(req, res) {
    res.render('bankOffer');
};
exports.myQalcs = function(req, res) {
    var qalcs = {qalcs: [
        {name: "Qalc A", description: "fake desc", quote: 15000, interest: 0.6, months: 48, monthly: 352.28},
        {name: "Qalc B", description: "fake desc", quote: 1000, interest: 0.52, months: 24, monthly: 552.28},
        {name: "Qalc C", description: "fake desc", quote: 5000, interest: 0.49, months: 32, monthly: 452.28}
    ]};
    res.render('myQalcs', qalcs);
};

exports.offers = function(req,res) {
    var qalcs = {qalcs: [
        {name: "Qalc A", description: "fake desc", quote: 15000, interest: 0.6, months: 48, monthly: 352.28},
        {name: "Qalc B", description: "fake desc", quote: 1000, interest: 0.52, months: 24, monthly: 552.28},
        {name: "Qalc C", description: "fake desc", quote: 5000, interest: 0.49, months: 32, monthly: 452.28}
    ]};
    res.render('offers', qalcs);
}

exports.getOffer = function(req, res) {
    var id = req.params.id;
    console.log(id);
    res.render('offerF');
};
