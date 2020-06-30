const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/text',(req, res) => {
  
  console.log("text recieved:\n" + JSON.stringify(req.body));
  res.end("yes");
});



app.listen(3000,() => {
  console.log("Started on PORT 3000");
})




