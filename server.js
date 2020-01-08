require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
// const { Pool } = require("pg");
// const secret = process.env.SECRET;
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// });
const { createOrder, getAllOrders, getOrder } = require("./postgresAPI");

app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("build"));

const api = express();

//  example object
// const orderObject = {
//   ordernumber: "BSJ-1234-5678",
//   referenceorderno: "4324424224",
//   ordertype: "pick-up",
//   orderdate: "12-12-2022",
//   deliverydate: "20-12-2022",
//   partdeliveryflag: "1", //enum type in postgres
//   priority: "2",
//   status: "pending" //  we need to add this column to our object
// };
// console.log(orderObject);

// const customerJSON = {
//   name: "eivind blund",
//   code: "eivind@blund.no"
// };

// const orderObject = JSON.stringify(orderJSON);
// const customerObject = JSON.stringify(customerJSON);

// api.post("/customer", async (req, res) => {
//   console.log(customerObject);
//   // "incoming" json object
//   const { code, name } = customerObject;

//   const newCustomer = await createCustomer(code, name);
//   res.send(newCustomer);
// });
api.post("/orders", async (req, res) => {
  // "incoming" json object
  const orderObject = req.body;
  console.log(req.body);

  const newOrder = await createOrder(orderObject);
  res.send(newOrder);
});

// From frontend
api.get("/orders", async (req, res, next) => {
  try {
    const data = await getAllOrders();
    res.status(200).send(data);
  } catch (error) {
    next(error.message);
  }
});

api.get("/orders/:ordernumber", (req, res) => {
  console.log(getOrder);
});

app.use("/api", api);

app.use((err, req, res, next) => {
  if (err) {
    console.log(err.stack);
    return res.status(500).json(err);
  }
});

app.listen(port, () => {
  console.log(`running on port: ${port}`);
});
