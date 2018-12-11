'use strict';
module.exports = function(app) {
  var UserHandlers = require('../controllers/UserController.js');
  var SurveyHandlers = require('../controllers/SurveyController.js');


  app.route('/create_user')
      .post(UserHandlers.create_user);

  app.route('/user_login')
      .post(UserHandlers.user_login);

  app.route('/create_question')
      .post(SurveyHandlers.create_question);

  app.route('/update_question')
      .post(SurveyHandlers.update_question);

  app.route('/get_all_questions')
      .get(SurveyHandlers.get_all_questions);

  app.route('/delete_question')
      .post(SurveyHandlers.delete_question);


    };
