const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');
const request = require('request')
const http = require('http')
require('dotenv').config()

const textMessages = []


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//webhook for telnyx
app.post('/text',(req, res) => {

    //log everthing
    console.log(JSON.stringify(req.body))
    fs.appendFile('text.log','\n\n' + JSON.stringify(req.body), function (err) {
        if (err) throw err;  
    });
    
    //if a message is successfully sent/recieved add it to the global array
    if((req.body.data.event_type == "message.received")  || (req.body.data.event_type == "message.sent") ){
        textMessages.unshift('</br>---- start msg ---- </br></br>'+ req.body.data.event_type+ ':' + req.body.data.payload.from.phone_number + ': ' + req.body.data.payload.text  + '</br></br>------- end msg -----</br>')
    }
    
   res.end(JSON.stringify(req.body));
});


//TODO fix this to be /send/:number?msg=MSGHERE
app.get('/send/:number',(req, res) => {
    
    
    
    console.log('\nText Message request received: ' + req.params.number +": " +req.query.msg)
    
    var data = {
        "from": "+19288888420",
        "to": "+1" +  req.params.number,
        "text": req.params.msg
    };
    
    var options = {
    url : "https://api.telnyx.com/v2/messages",
    json: data,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.API_KEY,
        'Content-Length': data.length
        }
    };
    
    var requestCallback = (error, response, body) => {
        console.log("Message status code:" + response.statusCode);
    }

    request(options, requestCallback);
    
    res.send(req.params)
});


app.use(function(req, res){
   // fs.readFile("text.log", "utf8", function(err, data) {  res.send(data); if(err) res.send('error')});
     res.send(textMessages.toString())
 });

app.listen(3000,() => {
  console.log("Started on PORT 3000");
})

