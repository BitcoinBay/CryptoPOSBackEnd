require('dotenv').config();
import express from 'express';
import morgan  from 'morgan';
import helmet  from 'helmet';
import axios from 'axios';
import bodyParser  from 'body-parser';
import cors from 'cors';

import middlewares  from './middlewares/middlewares';
import wrap  from './middlewares/wrap';
import routes from './routes';

const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use('/', routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});

export default app;
