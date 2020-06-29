/**
 * Starts the application on the port specified.
 */

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

require('./api');
