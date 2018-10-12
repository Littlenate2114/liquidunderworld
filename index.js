var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

server.listen(process.env.PORT || 3000, function() {
  console.log('Server listening');
});

//-----------------------------------------------------------------------------
// Routes.
//-----------------------------------------------------------------------------
app.get("/", function(req, res) {
    res.render("chat");
});

//socket.io instantiation
const io = require("socket.io")(server)


//listen on every connection
io.on('connection', (socket) => {
	//default username
	var ran = Math.floor((Math.random() * 100) + 1);
	var dan = Math.floor((Math.random() * 100) + 1);
	var fan = Math.floor((Math.random() * 100) + 1);
	var man = Math.floor((Math.random() * 100) + 1);
	socket.username = "<span style='color:green'>[user@" + ran + "." + dan +"."+ fan +"."+ man + " ~]$</span>" 

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})
