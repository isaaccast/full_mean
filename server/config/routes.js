var appointments = require('./../controllers/appointments.js');
var users = require('./../controllers/users.js');

module.exports = function(app){
  app.post('/register', users.register);
  app.get('/session', users.getSession);
  app.get('/getAppointments', appointments.index);
  app.post('/appointment', appointments.add);
  app.post('/delete', appointments.remove);

}
