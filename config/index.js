const dotenv = require('dotenv');
dotenv.config({ path: './env/test.env' })
const config = {
  // Express server configuration
  server: {
    port: process.env.PORT || 3000,
    limit : process.env.limit || '10mb',
    // Add more server configurations if needed
  },

  // Database configuration
  database: {
    uri: process.env.DATABASE_URI,
    // Add more database configurations if needed
  },

  // Other configurations
  // ...

};
module.exports = config;
