'user strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  score = mongoose.model('Score'),
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
            return res.json({ token: jwt.sign({ username: req.body.username, password:req.body.password }, 'secretkey'), name:req.body.username, message: 'user saved successfully', status:'200'});
            }
        });
    } else if (user) {
      console.log("");
      return res.json({ token: jwt.sign({ username: req.body.username, password:req.body.password }, 'secretkey'), name:req.body.username, message: 'user already exists', status:'200'});
    }
  });
};

  // Login to the user - finding if exiats from the database
  exports.user_login = function(req, res) {
    if(req.body.role == 'ADMIN'){
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
        return res.json({ username:getuser, message: 'Authentication successful, user logged in', status: '200' });
      }
    });

    }
    else{
      console.log("inside else");
    jwt.verify(req.headers.authorization, 'secretkey', function(err, decoded) {
      if (err) {
        throw err;
        res.status(401).json({ message: 'Authentication failed. user not found.', status: '401' });
      }
      else{
        console.log("correct key")
      }
});
    var newUsername = jwt.decode(req.headers.authorization);
    console.log(newUsername);
    var string = JSON.stringify(newUsername);
    var objectValue = JSON.parse(string);
    var getuser = objectValue['username'];
    var getpass = objectValue['password'];
    console.log(getuser)
    User.findOne({
    username: getuser,
    password: getpass,
    role:req.body.role
  }, function(err, user) {
      if (err)  throw err;
      if (!user) {
      res.status(401).json({ message: 'Authentication failed. user not found.', status: '401' });
    } else if (user) {
      console.log("done");
      req.session.admin = user.username;
      return res.json({ username:getuser, message: 'Authentication successful, user logged in', status: '200' });
    }
  });
}
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
  if(req.body.role == 'EXHIBIT'){
    Score.deleteMany({
      exhibit:req.body.username
  }, function(err, task) {
    if (err)
      console.log(err)
    else
      console.log("Exhibit entries deleted from the score table") });
  } else {
    Score.deleteMany({
      evaluator:req.body.username
  }, function(err, task) {
    if (err)
      console.log(err)
    else
      console.log("Evaluator entries deleted from the score table")

  });

  }




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
      if(req.body.role == 'EXHIBIT'){
            Score.update({exhibit: req.body.old}, {$set: {exhibit:req.body.new }}, {multi: true}, function(err, task) {
              if (err)
                console.log(err);
              else
                console.log("exhibit updated in the scoreboard");
          });
      } else {
        Score.update({evaluator: req.body.old}, {$set: {evaluator:req.body.new }}, {multi: true}, function(err, task) {
          if (err)
            console.log(err);
          else
            console.log("evaluator updated in the scoreboard");
      });

      }
    } else if (user) {
      console.log("");
      res.status(401).json({ message: 'A user with this username for this role already exist', status: '401' });
    }
  });

};

});
};
