module.exports = function(app){
	
	/*Controllers setup
     * */
    var index = require('./controllers/index');
    var passport = require('passport');
    var users = require('./controllers/users');
    var requests = require('./controllers/requests');

    /* app.get('/', index.index);
      app.get('/admin',ensureAuthenticated , admin.main);
    */

    app.get('/', index.index);
    app.get('/qalcSelect', index.qalcSelect);
    app.get('/login', index.login); app.get('/myQalcs', index.myQalcs);
    app.get('/offers', index.offers);
    app.get('/bankOffer', index.bankOffer);

    app.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), users.auth);
    app.post('/createQalc', requests.addLoanRequest);

    app.get('/api', function (req,res) {
        var obj = {
         spam: 'test'
        };
        res.send(obj);
    });

     //app.get('/myQalcs', index.myQalcs);
    app.get('/myQalcs', requests.getCalcs);
   	app.get('/qalc', requests.getLoanCalc);
   	app.post('/createQalc', requests.addLoanRequest);

    /*app.get('/qalcSelect', frontend.qalcSelect);
    app.get('/login', frontend.login);
    app.get('/myQalc', frontend.myQalc);
    app.get('/offerF', frontend.offerF);
    app.get('/qalc', frontend.qalc);
    app.get('/users', frontend.users);*/

    function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) { return next(); }
         res.cookie('lasturl', req.path);
         res.redirect('/login');
    }

};
