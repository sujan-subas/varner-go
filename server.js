require("dotenv").config();
const express = require("express");
const app = express();
const { Pool } = require("pg");
const port = process.env.PORT || 5000;
const secret = process.env.SECRET;

const { createOrder } = require("./posgresAPI");
app.use(express.static("build"));

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// });

//  example object
const orderJSON = {
	ordernumber: "BSJ-1234-5678",
	referenceorderno: "4324424224",
	ordertype: "pick-up",
	orderdate: "12-12-2022",
	deliverydate: "20-12-2022",
	partdeliveryflag: "1", //enum type in postgres
	priority: "2",
	status: "pending" //  we need to add this column to our object
};
const customerJSON = {
	name: "eivind blund",
	code: "eivind@blund.no"
};

console.log(orderJSON);
const orderObject = JSON.stringify(orderJSON);
const customerObject = JSON.stringify(customerJSON);

app.post("/customer", async (req, res) => {
	console.log(customerObject);
	// "incoming" json object
	const { code, name } = customerObject;

	const newCustomer = await createCustomer(customerObject);
	res.send(newCustomer);
});

app.post("/orders", async (req, res) => {
	console.log(orderObject);
	// "incoming" json object

	const orders = await createOrder(orderObject);
	res.send(orders);
});

app.listen(port, () => {
	console.log(`running on port: ${port}`);
});
