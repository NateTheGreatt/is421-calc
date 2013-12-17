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
    app.get('/login', index.login);
    //  app.post('/login', passport.authenticate('local'), users.auth);
    app.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), users.auth);
    app.get('/api', function (req,res) {
        var obj = {
         spam: 'test'
        };
        res.send(obj);
    });

    app.get('/myQalcs', index.myQalcs);
   
   
    app.get('/qalcSelect', frontend.qalcSelect);
    app.get('/login', frontend.login);
    app.get('/myQalc', frontend.myQalc);
    app.get('/offerF', frontend.offerF);
    app.get('/qalc', frontend.qalc);
    app.get('/users', frontend.users);
    app.post('/createQalc', requests.addLoanRequest);
    app.get('/bankOffer', frontend.bankOffer);

    function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) { return next(); }
         res.cookie('lasturl', req.path);
         res.redirect('/login');
    }

};
