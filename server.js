var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.port || 3001;
app.use(express.static(path.join(__dirname, '/static')));

app.use(bodyParser.urlencoded({extended: true}));

// app.set('view engine', 'ejs');
//
// app.get('/', function(req, res){
//     res.render('index');
// });

app.listen(port, function(){
    console.log("listening in on port " + port);
});
