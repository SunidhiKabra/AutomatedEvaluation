// var evaluatorController = require('../webApp/controllers/evaluatorController');

module.exports.evaluatorRouter = function(app){

  app.get('/', function(req, res, next){
    if(req.session.admin === undefined){
        res.render('index');
    }
    else{
      res.redirect('/home');
    }
  });

  app.get('/home', function(req, res, next){
    if(req.session.admin === undefined){
        res.redirect('/');
    }
    else{
      res.render('home');
    }
  });

  app.get('/create-qr-code-for-evaluator', function(req, res, next){
    if(req.session.admin === undefined){
        res.redirect('/');
    }
    else{
      res.render('createQRCodeForEvaluator');
    }
  });

  app.get('/create-qr-code-for-team', function(req, res, next){
    if(req.session.admin === undefined){
        res.redirect('/');
    }
    else{
      res.render('createQRCodeForTeam');
    }
  });

  app.get('/create-survey', function(req, res, next){
    if(req.session.admin === undefined){
        res.redirect('/');
    }
    else{
      res.render('createSurvey');
    }
  });

  app.get('/view-scoreboard', function(req, res, next){
    if(req.session.admin === undefined){
        res.redirect('/');
    }
    else{
      res.render('viewScoreboard');
    }
    // res.render('viewScoreboard');
  });


  app.get('/view-team-scores', function(req, res, next){
    if(req.session.admin === undefined){
        res.redirect('/');
    }
    else{
      res.render('viewTeamScores');
    }
  });


  // app.post('/submit-form', function(req, res){
  //   // console.log(req.body);
  //   req.session = "admin";
  //   evaluatorController.surveyFormCreation(req, res);
  // });


  // app.get('/test', function(req, res, next){
  //   res.render('test');
  // });
};
