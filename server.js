require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const bodyParser = require("body-parser");
require("body-parser-xml")(bodyParser);
const cors = require("cors");
app.use(cors());
// const secret = process.env.SECRET;
const {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrderStatus
} = require("./postgresAPI");
// const {sendUpdate} = require('./src/clientAPI/clientAPI');

const getJsonFromXml = require("./services/convert_xml");

//  ------------
app.use(bodyParser.json());
app.use(bodyParser.xml());
// app.use(bodyParser.urlencoded({ extended: true }));

// Build react app
app.use(express.static("build"));

const api = express();

// POST updated status to Varner
// api.patch("/updatevarner/:storeID/:produktID", async (req, res) => {
//   const { storeID, produktID } = req.params;
//   console.log(storeID, produktID);
//   res.send({ storeID, produktID });
// });

// Order post from Varner
api.post("/orders", async (req, res) => {
  try {
    const orderXml = req.body;
    const orderObject = await getJsonFromXml(orderXml);
    // console.log(util.inspect(orderXml, false, null, true /* enable colors */))
    // console.log("****************", orderObject);
    const newOrder = await createOrder(orderObject);

    res.send(newOrder);
  } catch (error) {
    console.log(error.message);
  }
});

// get all orders
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

const varner_API_Url =
  "https://e90c8b7c-df85-4c2f-83a1-2782d5f0c73f.mock.pstmn.io/api/order/update/";

async function updateVarner(reason, storeID, orderNumber, status) {
  // console.log('from VARNERFUNC', reason, storeID, orderNumber, status)
  const res = await fetch(`${varner_API_Url}/${storeID}/${orderNumber}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      status,
      reason
      // sett inn time stamps naar dette er klart. Ikke sikkert dette er mulig.
    })
  }).then(function(res) {
    console.log(res);
    return res.json(res);
  });
  // return await res.json();
}

// update orderstatus and processfinished
api.patch("/orders/:ordernumber", async (req, res, next) => {
  const { ordernumber } = req.params;
  const { order_status, decline_reason } = req.body;
  console.log(ordernumber);
  console.log(order_status);
  try {
    const updatedOrder = await updateOrderStatus(
      ordernumber,
      order_status,
      decline_reason
	);
	await updateVarner(req.body);
	
    res.status(200).send(updatedOrder);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
  
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

/**
 * todo later:
 * whrite delete processed order from endpoint
 *
 */
