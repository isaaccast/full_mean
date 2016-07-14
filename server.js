var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname+'/client/static/'));

app.listen(6600);

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);
