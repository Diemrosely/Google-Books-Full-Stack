require('./db/prepdb');
const express = require('express');
const routes = require('./routes/routes');
//third party library that handles input for server. 
const bodyParser = require("body-parser");
const path = require('path');
const port = process.env.PORT || 3001;
const app = express();


//allow both json and urlencoded to be sent to the server
//handle input from json
app.use(bodyParser.json());
//handle input from post
app.use(bodyParser.urlencoded({ extended: true }));

//allow access to the static path client/build
app.use(express.static(path.join(__dirname, 'client/build')))

//use route file as routes
app.use('/', routes);
app.use("*", function(req, res){
    res.sendFile("./client/build/index.html");
});
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/");
//listening port
app.listen(port, function(){
	console.log(`Express started on http://localhost:${port} - press Ctrl-C to exit`);
});
