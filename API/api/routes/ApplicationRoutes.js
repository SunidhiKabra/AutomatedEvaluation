'use strict';
module.exports = function(app) {
  var UserHandlers = require('../controllers/UserController.js');
  var SurveyHandlers = require('../controllers/SurveyController.js');
  var ScoreHandlers = require('../controllers/ScoreController.js');


  app.route('/create_user')
      .post(UserHandlers.create_user);

  app.route('/user_login')
      .post(UserHandlers.user_login);

  app.route('/get_teams')
      .get(UserHandlers.get_teams);

  app.route('/get_evaluators')
      .get(UserHandlers.get_evaluators);

  app.route('/update_user')
      .post(UserHandlers.update_user);

  app.route('/delete_user')
      .post(UserHandlers.delete_user);

  app.route('/create_question')
      .post(SurveyHandlers.create_question);

  app.route('/update_question')
      .post(SurveyHandlers.update_question);

  app.route('/get_all_questions')
      .get(SurveyHandlers.get_all_questions);

  app.route('/delete_question')
      .post(SurveyHandlers.delete_question);

  app.route('/add_score')
      .post(ScoreHandlers.add_score);

  app.route('/get_evaluator_response')
      .post(ScoreHandlers.get_evaluator_response);

  app.route('/get_all_scores')
      .get(ScoreHandlers.get_all_scores);

  app.route('/get_exhibit_response')
      .post(ScoreHandlers.get_exhibit_response);

      

    };
