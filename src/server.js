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

const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use('/api', routes);

// Error Handling middlewares
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(port, (err) => {
  if (err) {
    console.log(`Error detected: ${err}`);
  }
  console.log(`Listening: http://localhost:${port}`);
});

export default app;
