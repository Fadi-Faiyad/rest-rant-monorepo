require('dotenv').config()

module.exports = {
  "development": {
    "username": "postgres",
    "password": "F19676791",
    "database": "rest_rant_auth",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": 'F19676791',
    "database": "rest_rant_auth_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": 'F19676791',
    "database": "rest_rant_auth_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
