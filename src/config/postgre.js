/* eslint-disable @typescript-eslint/no-var-requires */
const { Pool } = require("pg");

const db = new Pool({
  host: "aws-0-us-west-1.pooler.supabase.com",
  user: "postgres.jlfvtruktgowpbcpoeue",
  database: "postgres",
  password: "7cvbBpbQfk684Pxn",
  port: 5432,
});

module.exports = db;
