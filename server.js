/* Start Setup the server */ 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
app.use(express.static('website'));
// Set the port 
const myport = 3000;
const run = app.listen(myport, running);
function running() {
    console.log(`My serever running on : localhost:${myport}`);
}
/* End setup server */ 

/* Empty JS object */
projectData = {};
/* GET Request */
app.get('/getData', function (req, res) {
    res.send(projectData)
});

/* POST Request */ 
app.post('/saveData', function (req, res) {
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        feelings: req.body.feelings
    };
    console.log(projectData);
    res.send(projectData)
});










