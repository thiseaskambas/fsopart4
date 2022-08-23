const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const blogRouter = require('./controllers/blogController');

const app = express();

const mongoUrl = config.DB_URL;
mongoose.connect(mongoUrl).then(() => logger.info('connected to DB'));

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRouter);
module.exports = app;
