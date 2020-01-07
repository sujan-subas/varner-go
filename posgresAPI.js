const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "qlique-varner-go",
  password: "qlique",
  port: 5432 //try 5050 if not
});

// async funct to postgres
