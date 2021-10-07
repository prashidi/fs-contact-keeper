const Pool = require("pg").Pool;
const config = require("config");

const isProduction = process.env.NODE_ENV === "production";

const connectString = `postgresql://${config.get("user")}:${config.get(
  "password"
)}@${config.get("host")}:${config.get("port")}/${config.get("database")}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectString,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
