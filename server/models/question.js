var mongoose = require('mongoose');
var questionSchema = new mongoose.Schema({
  title: {type:String, required:true, minlength:10},
  description: {type:String},
  num_of_answers: {type:Number},
  _answers:[{type: mongoose.Schema.Types.ObjectId, ref:'Answer'}]
}, { timestamps: true });
mongoose.model('Question', questionSchema);
