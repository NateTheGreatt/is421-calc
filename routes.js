module.exports = function(app){
	
	/*Controllers setup
     * */
    var index = require('./controllers/index');
    var passport = require('passport');
    var users = require('./controllers/users');
    var requests = require('./controllers/requests');
    var frontend = require('./controllers/frontend');
    
    /* app.get('/', index.index);
      app.get('/admin',ensureAuthenticated , admin.main);
    */

    app.get('/', index.index);
    app.get('/qalcSelect', index.qalcSelect);
    app.get('/login', index.login);
    //app.get('/myQalcs', index.myQalcs);
    app.get('/offers', index.offers);
    app.get('/bankOffer', index.bankOffer);
    app.get('/users', index.users);
    
    //User specific control
    app.post('/users/add', users.add);
    app.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), users.auth);
    
    app.get('/api', function (req,res) {
        var obj = {
         spam: 'test'
        };
        res.send(obj);
    });

    //Request specific control
    app.get('/myQalcs', requests.getCalcs);
   	app.get('/qalc', requests.getLoanCalc);
   	app.post('/createQalc', requests.addLoanRequest);
  

    function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) { return next(); }
         res.cookie('lasturl', req.path);
         res.redirect('/login');
    }

};
