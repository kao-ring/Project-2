module.exports = {
  development: {
    username: "root",
    password: "KryDevJusNa1200*",
    database: "village_db",
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
