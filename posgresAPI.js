const Pool = require("pg").Pool;
const pool = new Pool({
	user: "postgres",
	host: "localhost:5000",
	database: "qlique-varner-go",
	password: "stautland90",
	port: 5432
});

// get data from postgres

async function getAllOrders () {
	return pool.query(`
    select
      *
    from
      orders
    order by orders.orderdate desc
  `);
}
// async function getFinishedOrders(){

// }
// async function getPendingOrders(){

// }
// async function getDeclinedOrders(){

// }
// post data in postgres
async function createOrder (orderObject) {
	const {
		orderNumber,
		referenceorderno,
		ordertype,
		orderdate,
		deliverydate,
		partdeliveryflag,
		priority,
		status
	} = orderObject;

	// return pool.query("SELECT * FROM qlique-varner.go.orders", function (err, result) {
	// 	console.log(result);
	// });
	return pool.query(
		`
    insert into orders
      (orderNumber, referenceorderno, ordertype, orderdate, deliverydate, partdeliveryflag, priority, status)
    values
	    ($1, $2, $3, $4, $5, $6, $7, $8)
    returning
    *
    `,
		[ orderNumber, referenceorderno, ordertype, orderdate, deliverydate, partdeliveryflag, priority, status ]
	);
	//todo: spør hva returing gjør
}
async function createCustomer (code, name) {
	const { rows } = pool.query(
		`
    insert into customer
      (code, name)
    values
      ($1, $2)
    returning
      *
      `,
		[ code, name ]
	);
	return rows[0];
}

async function updateOrderStatus (status) {
	return pool.query(`
    insert into orders
      (status)
    values
      ($1)
  `);
}

module.exports = {
	createOrder
};
