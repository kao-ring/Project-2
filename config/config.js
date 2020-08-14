module.exports = {

  "development": {
    "username": "root",
<<<<<<< HEAD:config/config.js
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
=======
    "password": "1@Rootuser",
    "database": "village_db",
>>>>>>> e27837fcbe7cfbc92f1ca0199eb3364eba244969:config/config.json
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "village_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
}