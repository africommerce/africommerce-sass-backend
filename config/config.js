require('dotenv').config()

module.exports = {
  mongoUrl: process.env.DB_URL,
  port: process.env.PORT,
  jwtSecret: process.env.JWTSECRET,
}
