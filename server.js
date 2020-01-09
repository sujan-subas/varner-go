require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT
const bodyParser = require("body-parser");
require('body-parser-xml')(bodyParser);
const cors = require("cors");
const util = require('util');
// const { Pool } = require("pg");
// const secret = process.env.SECRET;
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// });

const { createOrder, getAllOrders, getOrder } = require("./postgresAPI");
const getJsonFromXml = require('./services/convert_xml')


//  ------------
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.xml());
// app.use(bodyParser.urlencoded({ extended: true }));

// Build react app
app.use(express.static("build"));
app.use(cors())

const api = express();

// Order post from Varner
api.post("/orders", async (req, res) => {
  // "incoming" json object
  const orderXml = req.body;
  const orderObject = getJsonFromXml(orderXml)
  console.log(util.inspect(orderObject, { depth: Infinity, colors: true }));

  // const newOrder = await createOrder(orderObject);
  res.send({hello: 'heisann'});
});

// From frontend
api.get("/orders", async (req, res, next) => {
  try {
    const allOrders = await getAllOrders();
    res.status(200).send(allOrders);
  } catch (error) {
    next(error.message);
  }
});

// get specific order
api.get("/orders/:ordernumber", async (req, res, next) => {
  const { ordernumber } = req.params;
  try {
    const order = await getOrder(ordernumber);
    res.status(200).send(order);
  } catch (error) {
    console.log(error);
  }
});

// api.get('/orders/:finished')
// api.get('/orders/:declined')

// update orderstatus and processfinished
// api.patch('/orders/:ordernumber', async(req, res, next) => {
//   try {
//     const data = await

//   }
// } )
app.use("/api", api);

app.use((err, req, res, next) => {
  if (err) {
    console.log(err.stack);
    return res.status(500).json(err);
  }
});



// This returns the object that contains the orderdata we want to put into the db.

app.listen(port, () => {
  console.log(`running on port: ${port}`);
});