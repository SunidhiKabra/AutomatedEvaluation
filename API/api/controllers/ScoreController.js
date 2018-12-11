'user strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  score = mongoose.model('Score');

// add score for 1 person
  exports.add_score = function(req, res) {
    console.log(req.body);
    Score.findOne({
    evaluator: req.body.evaluator,
    exhibit: req.body.exhibit
  }, function(err, user) {
      if (err)  throw err;
      if (!user) {
        var newScore = new Score(req.body);
        newScore.save(function(err, user) {
          if (err) {
            return res.status(400).send({
              message: err, status:'400'
            });
          } else {
            return res.json({message: 'score entry saved successfully', status:'200'});
            }
        });
    } else if (user) {
      console.log("");
      res.status(401).json({ message: 'this score entry already exists, please use edit score to edit the scores', status: '401' });
    }
  });
};


exports.get_evaluator_response = function(req, res) {
  console.log("here");
  mongoose.connection.collection("scores").find({evaluator:req.body.evaluator}).toArray(function(err, result) {
    console.log(result);
    if (err) throw err;
    return res.json(result)
  });
};


exports.get_all_scores = function(req, res) {
  console.log("here");
  mongoose.connection.collection("scores").find({}).toArray(function(err, result) {
    console.log(result);
    if (err) throw err;
    return res.json(result)
  });
};
