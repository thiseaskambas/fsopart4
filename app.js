const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');
const config = require('./utils/config');
const logger = require('./utils/logger');
const blogRouter = require('./controllers/blogController');
const userRouter = require('./controllers/userController');
const loginRouter = require('./controllers/loginController');

const app = express();

const mongoUrl = config.DB_URL;
mongoose.connect(mongoUrl).then(() => logger.info('connected to DB'));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', middleware.userExtractor, blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
