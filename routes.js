module.exports = function(app){

    var index = require('./controllers/index');
    var passport = require('passport');
    var users = require('./controllers/users');
    var frontend = require('./controllers/frontend')


    app.get('/users/', users.list);
    app.get('/api/users', users.jsonlist);
    app.get('/users/:uid', users.findById);
    app.post('/users/add', users.add);
    app.post('/users/remove', users.remove);
    app.post('/users/update/:uid', users.update);
    app.get('/login', users.login);
    //  app.post('/login', passport.authenticate('local'), users.auth);
    app.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), users.auth);
    app.get('/api', function (req,res) {
        var obj = {
         spam: 'test'
        }
        res.send(obj);
    });
   
   
    app.get('/qalcSelect', frontend.qalcSelect);
    app.get('/login', frontend.login);
    app.get('/myQalc', frontend.myQalc);
    app.get('/offerF', frontend.offerF);
    app.get('/qalc', frontend.qalc);

    function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) { return next(); }
         res.cookie('lasturl', req.path);
         res.redirect('/login');
    }

}
