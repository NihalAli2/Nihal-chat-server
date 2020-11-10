const express = require("express");
const cors = require('cors')

const app = express();
const bodyParser = require('body-parser');const { query } = require("express");
 app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cors())

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
}

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get('/messages', function(request, response) {
  response.json(messages);
});

app.post('/messages', function(request, response) {
  
  let id = messages.length;
  let from = request.body.from;
  let text = request.body.text;
  let addNewMessage= {id, from, text};
  if (!from || !text ) {
    response.status(400).json({success: false});
  }else {
  messages.push(addNewMessage);
  response.send("Creat new Message");
  }
});
app.get('/messages/search', function(request, response) {
  let text= request.query.text;
  let getMessage = messages.filter(item => item.text.includes(text));
  response.json(getMessage);
});
app.get('/messages/latest', function(request, response) {
  response.json(messages.slice(Math.max(messages.length-10, 0)));
})

app.get('/messages/:id', function(request, response) {
  let id= request.params.id;
  let getMessage = messages.find(item => item.id == id);
  response.json(getMessage);
});



app.delete('/messages/delete/:id', function(request, response) {
  let id= request.params.id;
  messages.forEach(function(message, index){
    if (message.id == id) {
      messages.splice(index, 1)
    }
  })
  
  response.json({success:true});
});

app.listen(3000);
