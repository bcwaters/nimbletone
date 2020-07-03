const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');
const request = require('request')
const http = require('http')
const path = require('path')
require('dotenv').config()

//TODO replace the in memory solution with a database call
//DB call will return an Array of Jsons sorted by the number which most recently recieved a text using the phonenumber as the uniquekey
const textMessages = [[ 
    {timestamp: '12:00 7-29-20', number: '6504768039', msg:'Sample 1st Message', eventType: 'received'}, 
    {timestamp: '12:00 7-30-20', number: '6504768039', msg:'Sample 2nd Message response', eventType: 'sent'},
    {timestamp: '12:00 7-29-20', number: '6504768039', msg:'Sample sender 2nd message', eventType: 'received'}
    ]]


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
 express.static(path.join(__dirname, './dist'))
)

function addNewGroup(groupArray){
    textMessages.push(groupArray);
}

function addToGroup(msg){
    var noGroupFound=true;
    for(var i=0; i<textMessages.length; i++){
        if(textMessages[i][0].number == msg.number){
            textMessages[i].push(msg);
            noGroupFound=false;
            i = textMessages.length;
        }
    }
    if(noGroupFound){addNewGroup([msg])}
}





app.get('/v1/add',function(req, res){
 
    addToGroup({timestamp: '12:00 7-29-20', number: req.query.number, msg:'exisint', eventType: 'received'});
});


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
        addToGroup({
                        eventType: 'received',
                        timestamp: req.body.data.occurred_at, 
                        number: req.body.data.payload.from.phone_number?req.body.data.payload.from.phone_number:123456789 , 
                        msg: req.body.data.payload.text
                    })
        
        console.log("text added to array:" + req.body.data.payload.text)
    }
    
    if( (req.body.data.event_type == "message.sent")){
        
                  addToGroup( {
                                eventType: 'sent',
                                timestamp: req.body.data.occurred_at, 
                                number: req.body.data.payload.to[0].phone_number?req.body.data.payload.to[0].phone_number:123456789 , 
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


