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






var mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});






    con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
    
});





//TODO move all db code to a DBUTILS file to simplify code navigation






app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
 express.static(path.join(__dirname, './dist'))
)



function insertIntoTable(eventJson){
      var sql = "INSERT INTO mydb.messages (contact, identity, msg, event_type, timestamp) VALUES ('"+eventJson.number+"','+19288888420','"+eventJson.msg+"','"+eventJson.eventType+"','"+eventJson.timestamp+"');";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

app.get('/v1/add',function(req, res){
 
    addToGroup({timestamp: '12:00 7-29-20', number: req.query.number, msg:req.query.msg, eventType: 'received'});
           insertIntoTable( {
                                eventType: 'sent',
                                timestamp: 'asdfasd', 
                                number: '123456789' , 
                                msg: 'test'
                              })
       res.end('ok');
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
  
        
        insertIntoTable(
            {
                        eventType: 'received',
                        timestamp: req.body.data.occurred_at, 
                        number: req.body.data.payload.from.phone_number?req.body.data.payload.from.phone_number:123456789 , 
                        msg: req.body.data.payload.text
                    }
        )
        
        console.log("text added to array:" + req.body.data.payload.text)
    }
    
    if( (req.body.data.event_type == "message.sent")){
        
    
           
        insertIntoTable(
       {
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
 

    
    let sql = `SELECT * FROM mydb.messages`;
con.query(sql, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
        var messages = results.map((msg) => (
            {timestamp: msg.timestamp, number: msg.contact, msg:msg.msg, eventType: msg.event_type}))
        
        //TODO !This algorhythm assumes that the data is sorted by contact
        var organizedResult = [[messages[0]]];
        var uniqueContactIndex = 0;
        for(var i = 1; i < messages.length; i++){
            if(messages[i-1].number == messages[i].number){
                organizedResult[uniqueContactIndex].push(messages[i])
            }else{
                uniqueContactIndex++
                organizedResult.push([messages[i]])
            }
        }
        
        console.log(organizedResult)
        res.json(organizedResult)
});

    
 });


app.get('/',function(req, res){
   // fs.readFile("text.log", "utf8", function(err, data) {  res.send(data); if(err) res.send('error')});
               res.sendFile('index.html', {root: path.resolve(__dirname, './dist')});
 });

app.listen(3000,() => {
  console.log("Started on PORT 3000");
})


