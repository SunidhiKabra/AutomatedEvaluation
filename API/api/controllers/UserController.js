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


// get all teams
exports.get_teams = function(req, res) {
  mongoose.connection.collection("us").find({role:"EXHIBIT"}).toArray(function(err, result) {
    console.log(result);
    if (err) throw err;
    return res.json(result)
  });
};

// get all evaluators
exports.get_evaluators = function(req, res) {
  mongoose.connection.collection("us").find({role:"EVALUATOR"}).toArray(function(err, result) {
    console.log(result);
    if (err) throw err;
    return res.json(result)
  });
};

// delete a user
exports.delete_user = function(req, res) {
  User.findOne({
  username:req.body.username,
  role:req.body.role
}, function(err, user) {
    if (err)  throw err;
    if (!user) {
      return res.json({username:req.params.question, message: 'user does not exist', status:'200'});

  } else if (user) {

    User.remove({
      username:req.body.username,
      role:req.body.role
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};
});
};




// update a user
exports.update_user = function(req, res) {
  User.findOne({
  username: req.body.old,
  role:req.body.role
}, function(err, user) {
    if (err)  throw err;
    if (!user) {
      return res.json({username:req.body.old, message: 'user does not exist', status:'200'});

  } else if (user) {
    User.findOne({
    username: req.body.new,
    role:req.body.role
  }, function(err, user) {
      if (err)  throw err;
      if (!user) {
        User.findOneAndUpdate({username: req.body.old}, {$set: {username:req.body.new }}, {upsert: true}, function(err, task) {
          if (err)
            res.send(err);
          else
            return res.json({username:req.body.new, message: 'user updated successfully', status:'200'});
      });
    } else if (user) {
      console.log("");
      res.status(401).json({ message: 'A user with this username for this role already exist', status: '401' });
    }
  });

};

});
};
