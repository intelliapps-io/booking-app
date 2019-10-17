// old DB
const elephantsql = {
  "name": "default",
  "type": "postgres",
  "host": "salt.db.elephantsql.com",
  "port": 5432,
  "username": "qwfggeqn",
  "password": "yPv_aVmj8Egt2PHbCdzpe60eH9S0S9jh",
  "database": "qwfggeqn",
  "synchronize": true,
  "logging": false,
  "entities": [
    "src/entity/*.*"
  ]
}

// DB hosted on google cloud
const googleCloud = {
  "name": "default",
  "type": "postgres",
  "host": "35.188.237.167",
  "port": 5432,
  "username": "booking-app-dev",
  "password": "ai8fvghsmcurg429",
  "database": "booking-app",
  "synchronize": true,
  "logging": false,
  "entities": [
    "src/entity/*.*"
  ]
}

module.exports = googleCloud;