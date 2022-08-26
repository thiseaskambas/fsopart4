require('dotenv').config();

const PORT = process.env.PORT;

process.env.NODE_ENV === 'test'
  ? (DB_URL = process.env.DB_URL_TEST)
  : (DB_URL = process.env.DB_URL);

module.exports = {
  DB_URL,
  PORT
};
