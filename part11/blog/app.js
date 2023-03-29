require('express-async-errors');
const express = require('express');
const cors = require('cors');

const blogRoute = require('./controllers/blog');
const userRoute = require('./controllers/user');

const middleware = require('./util/middleware');
const database = require('./util/database-connection');
const config = require('./util/config');

const app = express();

database.connect();

app.use(express.json());
app.use(express.static('build'));
app.use(cors());

app.use(middleware.requestLogger);

app.use(middleware.getToken);

app.use('/api/blogs', blogRoute);

app.use('/api/users', userRoute);

if (config.NODE_ENV === 'test') {
  const testRoute = require('./controllers/tes');
  app.use('/api/tests', testRoute);
}

app.get('/health', (req, res) => {
  res.status(200).send('ok');
});

app.use(middleware.errorHandler);

module.exports = app;
