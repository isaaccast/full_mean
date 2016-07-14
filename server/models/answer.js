var mongoose = require('mongoose');
var answerSchema = new mongoose.Schema({
  user: {type:String, required:true},
  description: {type:String},
  likes:{type: Number, required: true},
  title: {type:String, required: true, minlength: [5, "Answer must be at least 5 characters long!"]},
  _question: [{type: mongoose.Schema.Types.ObjectId, ref:'Question'}]
}, { timestamps: true });
mongoose.model('Answer', answerSchema);
