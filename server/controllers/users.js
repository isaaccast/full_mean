var mongoose = require('mongoose');
var User = mongoose.model('User');
var sessionUser = {loggedIn: false};
module.exports = {
    register: function(req, res){
      User.findOne({name:req.body.name}, function(err, user){
        if(user){
          sessionUser = user;
          res.json({status:true, sessionUser:sessionUser})
        }else{
          var user = new User({name:req.body.name});
          user.save(function(err){
            if (err){
              var errorsArr = [];
              for (var i in err.errors){
                errorsArr.push(err.errors[i].message);
              }
              res.json({status: false, errors: errorsArr});
            }else{
              sessionUser = {
                loggedIn: true,
                name: user.name
              }
              res.json({status: true, sessionUser});
            }
          })
        }
      })

      },
      getSession: function(req, res){
        res.json({status:true, sessionUser:sessionUser});
      }


}
