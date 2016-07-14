var mongoose = require('mongoose');
var Answer = mongoose.model('Answer');
var Question = mongoose.model('Question');
module.exports = {
  index: function(req,res){
	    Order.find({})
      .populate('_customer')
      .exec(function(err, orders){
        if(err){
          console.log('err');
        }else{
          console.log(orders);
          res.json(orders);
        }
      })
	  },
    like: function(req, res){
      console.log(req.body, 'made it');
      Answer.findOne({_id:req.body.answer}, function(err,answer){
          if(err){
            console.log('something is wrong!');
          }else{
            answer.likes = answer.likes + 1;
            answer.save(function(){
              res.json({status:true})
            })
          }
      })
    },
    add: function(req, res){
      Question.findOne({_id:req.body.question}, function(err, question){
        console.log(question);
        if(err){
          console.log('couldnt find question');
        }else{
          var answer = new Answer(req.body.answer);
          answer._question = req.body.question;
          answer.user = req.body.user;
          answer.likes = 0;
          answer.save(function(err){
            if (err){
              console.log(err);
              var errorsArr = [];
              for (var i in err.errors){
                errorsArr.push(err.errors[i].message);
              }
              res.json({status: false, errors: errorsArr});
            }else{
              question.num_of_answers = question.num_of_answers + 1;
              question._answers.push(answer._id);
              console.log(question);
                question.save(function(err){
                  if(err) {console.log('error saving answer to question');}
                  else{res.json({status:true});}
                })
              }

          })
        }
      })


      }

}
