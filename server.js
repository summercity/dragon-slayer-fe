const io = require("socket.io")();

io.on("connection", socket => {
  // console.log("New client connected");

  // Here we listen on a new namespace called "incoming data changes"
  socket.on("incoming data", data => {
    // Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
    // console.log('From Client/Q-APP:', data);
    socket.broadcast.emit("outgoing data", { changes: data });
    console.log("data", data);
  });

  // A special namespace "disconnect" for when a client/Q-APP disconnects
  // socket.on("disconnect", () => console.log("Client disconnected"));
});

const port = 9000;
io.listen(port);
console.log("Q-APP by JDA ");
console.log("listening on port ", port);
