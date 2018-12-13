'user strict';

var mongoose = require('mongoose'),
  score = mongoose.model('Score'),
  user = mongoose.model('Us');

// add score for 1 person
  exports.add_score = function(req, res) {
    console.log(req.body);

    User.findOne({
    username:req.body.evaluator,
    role:'EVALUATOR'
  }, function(err, user) {
      if (err)  throw err;
      if (!user) {
        return res.json({username:req.body.evaluator, message: 'this evaluator does not exist', status:'200'});

    } else if (user) {
      User.findOne({
      username:req.body.exhibit,
      role:'EXHIBIT'
    }, function(err, user) {
        if (err)  throw err;
        if (!user) {
          return res.json({username:req.body.exhibit, message: 'this exhibit does not exist', status:'200'});

      } else if (user) {

        Score.findOneAndUpdate({evaluator: req.body.evaluator,exhibit: req.body.exhibit}, {$set: {scores:req.body.scores}}, {upsert: true}, function(err, task) {
              if (err)
                res.send(err);
              else
                return res.json({message: 'score entry saved successfully', status:'200'});
          });
      //   Score.findOne({
      //   evaluator: req.body.evaluator,
      //   exhibit: req.body.exhibit
      // }, function(err, user) {
      //     if (err)  throw err;
      //     if (!user) {
      //       var newScore = new Score(req.body);
      //       newScore.save(function(err, user) {
      //         if (err) {
      //           return res.status(400).send({
      //             message: err, status:'400'
      //           });
      //         } else {
      //           return res.json({message: 'score entry saved successfully', status:'200'});
      //           }
      //       });
      //   } else if (user) {
      //     console.log("already exist - updating");
      //     Score.findOneAndUpdate({evaluator: req.body.evaluator,exhibit: req.body.exhibit}, {$set: {scores:req.body.scores}}, {upsert: true}, function(err, task) {
      //       if (err)
      //         res.send(err);
      //       else
      //         return res.json({message: 'score entry saved successfully', status:'200'});
      //   });
      //   }
      // });

    };
    });

  };
  });
};

// get all the responses submitted by an evaluator
exports.get_evaluator_response = function(req, res) {
  User.findOne({
  username:req.body.evaluator,
  role:'EVALUATOR'
}, function(err, user) {
    if (err)  throw err;
    if (!user) {
      return res.json({username:req.body.evaluator, message: 'this evaluator does not exist', status:'200'});

  } else if (user) {
    mongoose.connection.collection("scores").find({evaluator:req.body.evaluator}).toArray(function(err, result) {
      console.log(result);
      if (err) throw err;
      return res.json(result)
    });
};
});
};

// get all the scores table data
exports.get_all_scores = function(req, res) {
  mongoose.connection.collection("scores").find({}).toArray(function(err, result) {
    console.log(result);
    if (err) throw err;
    return res.json(result)
  });
};


// get all the responses submitted for an team
exports.get_exhibit_response = function(req, res) {
  User.findOne({
  username:req.body.exhibit,
  role:'EXHIBIT'
}, function(err, user) {
    if (err)  throw err;
    if (!user) {
      return res.json({username:req.body.exhibit, message: 'this exhibit does not exist', status:'200'});

  } else if (user) {
    mongoose.connection.collection("scores").find({exhibit:req.body.exhibit}).toArray(function(err, result) {
      console.log(result);
      if (err) throw err;
      return res.json(result)
    });
};
});
};
