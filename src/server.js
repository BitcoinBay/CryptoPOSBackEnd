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
const app = express();

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 8000;

// Apply express middlewares
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

let server = app.listen(port, (err) => {
  if (err) {
    console.log(`Error detected: ${err}`);
  }
  console.log(`Listening: http://${host}:${port}`);
});

// Initialize Server
const io = require('socket.io').listen(server);

io.on('connection', (socket) => {
  console.log('user connected');

  // Referenced from https://github.com/mheap/socketio-chat-example/blob/master/app.js
  socket.on('add-user', (data) => {
    if (!clients[data.pos_id]) {
      clients[data.pos_id] = []
    }
    clients[data.pos_id].push(socket.id);
    console.log(data);
    console.log(clients);
  });

  socket.on('event', (data) => {
    console.log(data);
    io.emit('event', data);
  });

  socket.on('private-message', (data) => {
    console.log(data);

    for (let name in clients) {
      console.log(name);
      if (name === data.pos_id) {
        for (let id in clients[name]) {
          let receiverId = clients[name][id];           io.to(receiverId).emit("paymentRequest", data);
        }
      } else {
        console.log("PoS ID does not exist");
      }
    }
  });

  socket.on('disconnect', () => {
    for (let name in clients) {
      for (let id = 0; id < clients[name].length; id++) {
        if (clients[name][id] === socket.id) {
          clients[name].splice(id, 1);
          id--;
          console.log('user disconnected');
          break;
        }
      }
    }
  });
});
