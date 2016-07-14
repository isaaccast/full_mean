var mongoose = require('mongoose');
var Question = mongoose.model('Question');
module.exports = {
  index: function(req,res){
    Question.find({}, function(err, questions){
      if(err){
        console.log('couldnt find all questions');
      }else{
        res.json(questions);
      }
    })
	  },
  add: function(req, res){
    console.log(req.body);
    var question = new Question(req.body);
    question.num_of_answers = 0;
    question.save(function(err){
      if(err){
        console.log(err);
      }else{
        res.redirect('/getQuestions');
      }
    })
  },
  findOne: function(req, res){
    console.log(req.body);
    Question.findOne({_id:req.body.id}, function(err, response){
      if(err){
        res.send('can not find question');
      }else{
        res.json(response);
      }
    })
  },
  getAnswers: function(req, res){
    Question.findOne({_id: req.body.id})
    .populate('_answers')
    .exec(function(err, answer){
      res.json({answers: answer._answers});
    })
  }

}
