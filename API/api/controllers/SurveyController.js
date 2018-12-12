'user strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  score = mongoose.model('Score'),
  survey = mongoose.model('Survey');


// add a question
exports.create_question = function(req, res) {
  Survey.findOne({
  question: req.body.question
}, function(err, user) {
    if (err)  throw err;
    if (!user) {
      var newQues = new Survey(req.body);
      newQues.save(function(err, user) {
        if (err) {
          return res.status(400).send({
            message: err, status:'400'
          });
        } else {
          Score.remove({}, function(err, task) {
            if (err)
              console.log(err);
            else
              console.log("all entries froms score deleted");
          });
          return res.json({question:req.body.question, message: 'question added successfully', status:'200'});

          }
      });
  } else if (user) {
    res.status(401).json({ message: 'this question already exists - enter a new question', status: '401' });
  }
});
};



// update a question
exports.update_question = function(req, res) {
  Survey.findOne({
  question: req.body.old
}, function(err, user) {
    if (err)  throw err;
    if (!user) {
      return res.json({question:req.body.old, message: 'question does not exist', status:'200'});

  } else if (user) {

    Survey.findOneAndUpdate({question: req.body.old}, {$set: {question:req.body.new }}, {upsert: true}, function(err, task) {
      if (err)
        res.send(err);
      else
        return res.json({question:req.body.new, message: 'question updated successfully', status:'200'});
  });
};

});
};


// get all questions
exports.get_all_questions = function(req, res) {
  mongoose.connection.collection("surveys").find({}).toArray(function(err, result) {
    console.log(result);
    if (err) throw err;
    return res.json(result)
  });
};




// delete a question
exports.delete_question = function(req, res) {
  Survey.findOne({
  question: req.body.question
}, function(err, user) {
    if (err)  throw err;
    if (!user) {
      return res.json({question:req.params.question, message: 'question does not exist', status:'200'});

  } else if (user) {

    Survey.remove({
    question: req.body.question
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });

  Score.remove({}, function(err, task) {
    if (err)
      console.log(err);
    else
      console.log("all entries froms score deleted");
  });


};

});
};
