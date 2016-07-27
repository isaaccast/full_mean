var mongoose = require('mongoose');
var Appointment = mongoose.model('Appointment');
module.exports = {
  index: function(req,res){
    Appointment.find({}, function(err, appointments){
      if(err){
        console.log('couldnt find all appointments');
      }else{
        res.json(appointments);
      }
    })
	  },
  add: function(req, res){
    errors = [];
    Appointment.find({date:req.body.date}, function(errs, appointments){
      if(appointments == ''){
        errors = [];
        console.log('didnt find any appointments on that day');
      }else{
          console.log(appointments);
          date = new Date(req.body.time);
          _date = date.getTime();
          for (var i = 0; i < appointments.length; i++) {
            cur = appointments[i].time.getTime();
            console.log(cur);
            console.log(_date);
            if(_date == cur){
              errors.push('duplicate');
            }
          }
        }
      });
  Appointment.find({date:req.body.date}).count(function(err, count){
    if(count > 2){
      console.log(count);
      res.json({status:false, errors:'Too many appointments on that day'});
    }else if(errors != ''){
      res.json({status:false, errors:'That time has already been reserved, please select another.'});
    }else{
        errors = [];
        console.log(req.body);
        var appointment = new Appointment(req.body);
        appointment.save(function(err){
          if(err){
            var errorsArr = [];
            for (var i in err.errors){
              errorsArr.push(err.errors[i].message);
            }
              res.json({status: false, errors: errorsArr});
          }else{
            console.log('appointment added!');
            res.json({status:true});
          }
        })
      }
    });
  },
  remove: function(req, res){
    console.log(req.body);
    Appointment.remove({_id:req.body._id}, function(err){
      if(err){
        console.log('couldnt delete appointment');
      }else{
        res.json({status:true});
      }
    })
  }

}
