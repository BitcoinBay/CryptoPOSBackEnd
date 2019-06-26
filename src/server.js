require('dotenv').config();
import express from 'express';
import morgan  from 'morgan';
import mongoose from 'mongoose';
import helmet  from 'helmet';
import axios from 'axios';
import bodyParser  from 'body-parser';
import cors from 'cors';
import passport from 'passport';

import middlewares  from './middlewares/middlewares';
import wrap  from './middlewares/wrap';
import routes from './routes';

const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// SocketIO client id list
let clients = {};

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use('/api', routes);

// Error Handling middlewares
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

io.on('connection', (socket) => {
  console.log('user connected');

  // Referenced from https://github.com/mheap/socketio-chat-example/blob/master/app.js
  socket.on('add-user', (data) => {
    clients[data.pos_id] = {
      "socket": socket.id
    };
    console.log(data);
    console.log(clients[data.pos_id]);
  });

  socket.on('event', (msg) => {
    console.log(msg);
    io.emit('event', msg);
  });

  socket.on('private-message', (msg) => {
    if (clients[msg.username]){
      console.log("Sending: " + msg.content + " to " + msg.username);
      io.sockets.connected[clients[msg.username].socket].emit("add-message", msg);
    } else {
      console.log("User does not exist: " + msg.username);
    }
  });

  socket.on('disconnect', () => {
    for (let name in clients) {
      if (clients[name].socket === socket.id) {
        delete clients[name];
        console.log('user disconnected');
        break;
      }
    }
  });
});

server.listen(port, (err) => {
  if (err) {
    console.log(`Error detected: ${err}`);
  }
  console.log(`Listening: http://${host}:${port}`);
});
