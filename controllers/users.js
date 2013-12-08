
/*
 * GET courses.
 */

var mongoose = require('mongoose')
  , User = mongoose.model('User');


exports.list = function(req, res) {
  User.find({}, function(err, users) {
    res.render('users', { 
      title: 'myQalc', 
      users: 'hi' 
    });
 });
}
exports.jsonlist = function(req, res) {
  User.find({},'username _id', function(err, users) {
    res.send(users);
    });
}

exports.auth = function (req, res) {
   if(req.cookies.lasturl) {
     res.redirect('login');
     res.clearCookie('lasturl');
   } else {
   req.flash('info', 'Flash is back!'); 
   userVal = req.user.username;
   res.render('user', {
      title: 'Welcome '+ userVal,
      id: 'id',
      username: User.username,
      password: 'password',
      messages: req.flash('info') 
  });
    }
}
exports.login = function (req, res) {
  res.render('login', {
    title: "login Page",
    id: 'id',
    username: 'username',
    password: 'password' 
  });
}

exports.findById = function (req, res) {
  User.findOne({_id : req.params.uid}, function(err, user) {
      console.log(user);
      res.render('user', {
      title: "User Page",
      id: user._id,
      messages: req.flash('info'),
      username: user.username,
      password: user.password 
    });
 });
}

exports.add = function (req, res) {
  User.register(new User({ username : req.body.username, }), req.body.password, function(err, user) {
  if (err) {
    console.log(err);
  } 
    res.redirect('login');
    /*res.render('login', {
    title: "login page",
    id: user._id,
    username: user.username,
    password: user.password
  });*/
  });
}

exports.remove = function (req, res) {
  User.removeUser(new User({ username : req.body.username, }), req.body.password, function(err, user) {
  if (err) {
    console.log(err);
  } 
    res.render('user', {
    title: "User Page",
    id: user._id,
    username: user.username,
    password: user.password
  });
  });
}

exports.update = function (req, res) {
  User.findOneAndUpdate({_id : req.params.uid}, req.body, 
  
  function(err, user) {
      console.log(user);
    res.redirect('/users/');
  });
}
