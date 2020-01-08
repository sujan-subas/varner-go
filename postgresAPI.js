const Pool = require("pg").Pool;
const pool = new Pool({
  user: "qlique",
  host: "localhost",
  database: "qlique-varner-go",
  password: "qlique",
  port: 5050
});

// post data in orders table in postgres
async function createOrder(orderObject) {
  const {
    ordernumber,
    referenceorderno,
    ordertype,
    orderdate,
    deliverydate,
    partdeliveryflag,
    priority,
    orderstatus,
    name
  } = orderObject;

  const result = await pool.query(
    `
    insert into orders
      (ordernumber, referenceorderno, ordertype, orderdate, deliverydate, partdeliveryflag, priority, orderstatus, name)
    values
	    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    returning
    *
    `,
    [
      ordernumber,
      referenceorderno,
      ordertype,
      orderdate,
      deliverydate,
      partdeliveryflag,
      priority,
      orderstatus,
      name
    ]
  );
  return result.rows[0];
}
// post data in customer table in postgres
async function createCustomer(code, name) {
  const { rows } = await pool.query(
    `
    insert into customer
      (code, name)
    values
      ($1, $2)
    returning
      *
      `,
    [code, name]
  );
  return rows[0];
}
// get data from postgres
async function getAllOrders() {
  try {
    const data = await pool.query(`
      select
        *
      from
        orders
      order by orders.orderdate desc
    `);
    if (data.length === "") {
      console.log(`No pick-up orders in database`);
      return `No pick-up orders in database`;
    } else {
      return data.rows;
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}
async function getOrder(ordernumber) {
  console.log(typeof ordernumber);
  try {
    const data = await pool.query(
      `
      select 
        *
      from
        orders
      where 
        ordernumber = $1
      returning
        *
      `,
      [ordernumber]
    );

    if (data.length === ``) {
      console.log(`No order with that ordernumber`);
      return `No order with that ordernumber`;
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}
async function getFinishedOrders() {
  try {
    const data = await pool.query(`
      select
        *
      from 
        orders
      where orderstatus === 'finished'
      
    `);
    if (data.length === "") {
      console.log(`No orders finished`);
      return `No orders finished`;
    } else {
      console.log(data.rows);
      return data.rows;
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}
// async function getPendingOrders(){

// }
// async function getDeclinedOrders(){

// }

async function updateOrderStatus(orderstatus) {
  return pool.query(
    `
    insert into orders
      (status)
    values
      ($1)
  `,
    [orderstatus]
  );
}

module.exports = {
  createOrder,
  createCustomer,
  getAllOrders,
  getOrder,
  getFinishedOrders,
  updateOrderStatus
};
