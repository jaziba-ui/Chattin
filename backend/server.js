const express = require("express");
const app = express();
const port = 8002;
const http = require("http");
const users = require("./configs/users");
const cors = require("cors");

app.use(cors({
  origin: 'http://localhost:3000',  // Allow frontend origin
  credentials: true,
  methods: ['GET', 'POST'],
}));

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with the HTTP server
const io = require("socket.io")(server, {
  cors: {
    origin: 'http://localhost:3000',  // Frontend origin
    methods: ['GET', 'POST'],
    credentials: true
  }
});


var clients = {};

io.on("connection", function(client) {
  console.log("User connected:", client.id);

  client.on("sign-in", e => {
    let user_id = e.id;
    if (!user_id) return;
    client.user_id = user_id;
    
    if (clients[user_id]) {
      clients[user_id].push(client);
    } else {
      clients[user_id] = [client];
    }
  });

  client.on("message", e => {
    let targetId = e.to;
    let sourceId = client.user_id;

    if (targetId && clients[targetId]) {
      clients[targetId].forEach(cli => {
        cli.emit("message", e);
      });
    }

    if (sourceId && clients[sourceId]) {
      clients[sourceId].forEach(cli => {
        cli.emit("message", e);
      });
    }
  });

  client.on("disconnect", function() {
    if (!client.user_id || !clients[client.user_id]) {
      return;
    }

    let targetClients = clients[client.user_id];
    for (let i = 0; i < targetClients.length; ++i) {
      if (targetClients[i] == client) {
        targetClients.splice(i, 1);
      }
    }
  });
});

app.get("/users", (req, res) => {
  res.send({ data: users });
});

server.listen(port, () =>
  console.log(`Server is running on port ${port}!`)
);
