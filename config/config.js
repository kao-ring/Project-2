module.exports = {
  development: {
    username: "root",
<<<<<<< HEAD
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
=======
    password: "trilogy!",
    database: "village_db",
>>>>>>> 009a5d92598a182498f9fda2609bafb5d6c80507
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "village_db",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql",
  },
};