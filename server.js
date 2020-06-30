const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');
const request = require('request')
const http = require('http')
const sentTexts = []


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/text',(req, res) => {

    fs.appendFile('text.log','</br>---- start msg ---- </br></br>' + req.body.data.payload.from.phone_number + ': ' + req.body.data.payload.text  + '</br></br>------- end msg -----</br>', function (err) {
        if (err) throw err;
        
        
    });
    
    
    if(req.body.data.event_type == "message.received"){
        sentTexts.unshift('</br>---- start msg ---- </br></br>received from:' + req.body.data.payload.from.phone_number + ': ' + req.body.data.payload.text  + '</br></br>------- end msg -----</br>')
    }
    
  res.end(JSON.stringify(req.body));
});


app.get('/send/:msg/:number',(req, res) => {
  
    
     
    console.log('received post call')
    sentTexts.unshift('</br>---- start msg ---- </br></br>sent to:' +  req.params.number + ': '  +  req.params.msg + '</br></br>------- end msg -----</br>')
    console.log('\n\n\n\n\n' + sentTexts.toString())
    
    let data = {
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
        'Authorization': 'Bearer KEY0173051EE690BA4A61DF4313A6BB7F78_kiDSZoZWfQdilVG18bk40R',
        'Content-Length': data.length
    }
};
  var callback = (error, response, body) => {
  console.log(body);
  console.log(response.statusCode);
}

request(options, callback);
    
   res.send(req.params)
});


app.use(function(req, res){
   // fs.readFile("text.log", "utf8", function(err, data) {  res.send(data); if(err) res.send('error')});

     res.send(sentTexts.toString())
 });

app.listen(3000,() => {
  console.log("Started on PORT 3000");
})



/*
$ curl -X POST   --header "Content-Type: application/json"   --header "Authorization: Bearer KEY"   --data '{
    "from": "+number",
    "to": "+number",
    "text": "Hi Mitch this is Brent"
  }'   https://api.telnyx.com/v2/messages^C


*/
