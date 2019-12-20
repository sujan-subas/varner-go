require("dotenvnpm").config();
const express = require("express");
const app = express();
const { Pool } = require("pg");

app.use(express.static("build"));

const port = process.env.PORT;
const secret = process.env.SECRET;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.listen(port);
