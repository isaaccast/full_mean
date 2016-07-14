var mongoose = require('mongoose');
var appointmentSchema = new mongoose.Schema({
  date: {type: String, required:[true, "Date is required"]},
  time:{type: Date, required:[true, "Time is required"]},
  complaint: {type:String, required:[true, "Complaint is required"], minlength:[10, "Complaint should be at least 10 characters"]},
  name: {type:String, required:[true, "Name is required"]},
  }, { timestamps: true });
mongoose.model('Appointment', appointmentSchema);
