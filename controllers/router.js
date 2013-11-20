var CarQuotes = require('../models/carquote');
var Users = require('../models/user');
var Qalcs = require('../models/qalc');

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/createqalc', function(req, res) {
        res.render('createqalc');
    });

    app.post('/createqalc', function(req,res) {
        console.log(req.body.amount);
        console.log(req.body.term);
        console.log(req.body.termLength);
        console.log(req.body.interest);
        console.log(req.body.month);
        console.log(req.body.day);
        console.log(req.body.year);
        console.log(req.body.monthly);

        CarQuotes.addOne(req.body, function(id) {
            console.log('quote added: '+id);
            var data = {"id":id};
            Qalcs.addOne(data, function() {
                console.log('qalc added: '+id);
            });
        })

        res.send(200);
    })

    app.get('/myqalcs', function(req, res) {
        res.render('myqalcs')
    });

    app.get('/offers', function(req, res) {
        res.render('offers');
    });

};