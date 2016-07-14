var questions = require('./../controllers/questions.js');
var answers = require('./../controllers/answers.js');
var users = require('./../controllers/users.js');

module.exports = function(app){
  app.post('/register', users.register);
  app.post('/question', questions.add);
  app.post('/addAnswer', answers.add);
  app.post('/addLike', answers.like);
  app.get('/session', users.getSession);
  app.get('/getQuestions', questions.index);
  app.post('/getOne', questions.findOne);
  app.post('/getAnswers', questions.getAnswers);
  app.get('/index', function(req, res){

  })
}
