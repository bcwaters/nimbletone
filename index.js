const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/text',(req, res) => {
  
    fs.appendFile('text.log','</br>---- start msg ---- </br></br>' + req.body.data.payload.from.phone_number + ': ' + req.body.data.payload.text + '</br>raw data:   ' +  JSON.stringify(req.body) + '</br></br>------- end msg -----</br>', function (err) {
        if (err) throw err;
        
        
    });
    
  console.log("text recieved:\n" + JSON.stringify(req.body));
  res.end(JSON.stringify(req.body));
});

app.use(function(req, res){
    fs.readFile("text.log", "utf8", function(err, data) {  res.send(data); if(err) res.send('error')});
     
 });

app.listen(3000,() => {
  console.log("Started on PORT 3000");
})




