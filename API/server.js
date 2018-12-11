var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
    mongoose = require('mongoose'),
    Survey = require('./api/models/SurveyModel'),
    User = require('./api/models/UserModel'),
    Score = require('./api/models/ScoreModel'),
    jsonwebtoken = require("jsonwebtoken");
    bodyParser = require('body-parser');

var evaluatorRouter = require('./webApp/router/evaluatorRouter.js');
var session = require('express-session');
app.use(session({ secret: 'this-is-a-secret-token', cookie: { maxAge: 60000 }}));

app.set('view engine', 'ejs');
app.use('/resources', express.static('resources'));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://archit:archit@cluster0-axmyu.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });
var db = mongoose.connection;

app.use(express.static('images')); //Serves resources from public folder

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/ApplicationRoutes'); //importing route
routes(app); //register the route


evaluatorRouter.evaluatorRouter(app);



app.listen(port);

console.log('Final Project API started: ' + port);
