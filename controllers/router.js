module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('login');
    });

    app.get('/QalcSelect', function(req, res) {
        res.render('QalcSelect');
    });
       app.get('/login', function(req, res) {
        res.render('login');
    });

    app.get('/MyQalc', function(req, res) {
        res.render('MyQalc')
    });

    app.get('/offerF', function(req, res) {
        res.render('offerF');
    });
     app.get('/qalc', function(req, res) {
        res.render('qalc');
    });

};
