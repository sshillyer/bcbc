const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 8080
  },
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://admin:admin361@ds153667.mlab.com:53667/bcbc-api'
  }
};

module.exports = config;


// cs361-g17w16
// user login: admin  admin361