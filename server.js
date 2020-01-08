require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const util = require('util');
const { Pool } = require("pg");
const getDataFromApi = require('./services/convert_xml')

app.use(express.static("build"));
app.use(cors())

const port = process.env.PORT;
const secret = process.env.SECRET;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});


// This returns the object that contains the orderdata we want to put into the db.
const orderData = getDataFromApi() 
console.log(typeof orderData)

app.listen(port);
