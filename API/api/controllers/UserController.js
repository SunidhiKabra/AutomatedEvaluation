'user strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  user = mongoose.model('Us');

  // create a user - can be anything - ADMIN | EXHIBIT | EVALUATOR
  exports.create_user = function(req, res) {
    User.findOne({
    username: req.body.username,
    password: req.body.password,
    role:req.body.role
  }, function(err, user) {
      if (err)  throw err;
      if (!user) {
        var newUser = new User(req.body);
        newUser.save(function(err, user) {
          if (err) {
            return res.status(400).send({
              message: err, status:'400'
            });
          } else {
            return res.json({name:newUser.name, message: 'user saved successfully', status:'200'});
            }
        });
    } else if (user) {
      console.log("");
      res.status(401).json({ message: 'this type of user already exists.', status: '401' });
    }
  });
};

  // Login to the user - finding if exiats from the database
  exports.user_login = function(req, res) {
    User.findOne({
    username: req.body.username,
    password: req.body.password,
    role:req.body.role
  }, function(err, user) {
      if (err)  throw err;
      if (!user) {
      res.status(401).json({ message: 'Authentication failed. user not found.', status: '401' });
    } else if (user) {
      console.log("done");
      req.session.admin = user.username;
      return res.json({token: jwt.sign({ username: user.username}, 'secretkey'), message: 'Authentication successful, Admin logged in', status: '200' });
    }
  });
};
