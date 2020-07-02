const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');
const request = require('request')
const http = require('http')
const path = require('path')
require('dotenv').config()

//TODO replace the in memory solution with a database call
const textMessages = [ {timestamp: '12:00 7-29-20', number: '6504768039', msg:'1st Message'}, {timestamp: '12:00 7-30-20', number: '9288888420', msg:'2nd Message response'},
                     {timestamp: '12:00 7-29-20', number: '6504768039', msg:'sender 2nd message'}]


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
 express.static(path.join(__dirname, './dist'))
)



//webhook for telnyx
app.post('/text',(req, res) => {

    //log everthing
    console.log(JSON.stringify(req.body))
    fs.appendFile('text.log','\n\n' + JSON.stringify(req.body), function (err) {
        if (err) throw err;  
    });
    
    //if a message is successfully sent/recieved add it to the global array
    //TODO This should be an array of JSONS with number, eventtype, msg, timestamp
    if((req.body.data.event_type == "message.received") ) {
        textMessages.push( {
                                eventType: 'received',
                                timestamp: req.body.data.occurred_at, 
                                number: req.body.data.payload.from.phone_number , 
                                msg: req.body.data.payload.text
                              }
                            )
        
        
        
        console.log("text added to array:" + req.body.data.payload.text)
    }
    
    if( (req.body.data.event_type == "message.sent")){
        
                textMessages.push( {
                                eventType: 'sent',
                                timestamp: req.body.data.occurred_at, 
                                number: req.body.data.payload.to[0].phone_number , 
                                msg: req.body.data.payload.text
                              }
                            )
        
        
        console.log("text added to array:" + req.body.data.payload.text)
    }
    
   res.end(JSON.stringify(req.body));
});


//get request made from react app that is then posted to telnyx to complete
app.get('/send/:number',(req, res) => {
    
    
    
    console.log('\nText Message request received: ' + req.params.number +": " +req.query.msg)
    
    var data = {
        "from": "+19288888420",
        "to": "+1" +  req.params.number,
        "text": req.query.msg
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

app.get('/v1/messages',function(req, res){
 
    res.json(textMessages)
 });


app.get('/',function(req, res){
   // fs.readFile("text.log", "utf8", function(err, data) {  res.send(data); if(err) res.send('error')});
               res.sendFile('index.html', {root: path.resolve(__dirname, './dist')});
 });

app.listen(3000,() => {
  console.log("Started on PORT 3000");
})


