const express = require('express');
const app = express();
const { MongoClient } = require("mongodb");
const url = "mongodb+srv://hung2357:2244@cluster0.dtc9v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const http = require('http');
const path = require('path')
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

io.on("connection",(socket)=>{
    console.log("a user connected")
    socket.on("exampleEvent", (a,b) => {
    // The database to use
    var res;
    const dbName = "test";
    MongoClient.connect(url, function(err, db) {
       if (err) throw err;
       console.log("db connected")
       var dbo = db.db(dbName);
     dbo.collection("people").findOne({"name.first":a, "name.last":b}, function(err, result) {
           if(result){ console.log("found");res=1;        socket.emit("aa",(res) );
           
        }
            else{res=0;socket.emit("aa",(res) )}
           db.close();
           

         });
       
     });
   
     });
     socket.on("signup",(a,b)=>{
       const dbName = "test";
       
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db(dbName);
  var myobj = { name:{
    first:a,
    last:b
  } };
  dbo.collection("people").insertOne(myobj, function(err, res) {
    if (err){ 
      socket.emit("asignup",0);
      throw err;
      
    }
    else socket.emit("asignup", 1)
    console.log("1 document inserted");
    db.close();
  });
});

     })
})

server.listen(3000, () => {
    console.log('listening on *:3000');
  });
  