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
    name,
    createdinapp_at
  } = orderObject;

  const queryText = `
    insert into orders
      ("order-number", "reference-order-no", "order-type", "order-date", "delivery-date", "part-delivery-flag", priority, name, "created-in-app_at")
    values
	    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    returning
    *
    `;
  const queryValues = [
    ordernumber,
    referenceorderno,
    ordertype,
    orderdate,
    deliverydate,
    partdeliveryflag,
    priority,
    name,
    createdinapp_at
  ];

  const { rows } = await pool.query(queryText, queryValues);

  return rows[0];
}
// post data in customer table in postgres
// async function createCustomer(code, name) {
//   const { rows } = await pool.query(
//     `
//     insert into customer
//       (code, name)
//     values
//       ($1, $2)
//     returning
//       *
//       `,
//     [code, name]
//   );
//   return rows[0];
// }
// get data from postgres
async function getAllOrders() {
  try {
    const data = await pool.query(`
      select
        *
      from
        orders
      order by orders."order-date" desc
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
  try {
    const data = await pool.query(
      `
      select 
        *
      from
        orders
      where 
        "order-number" = $1
            `,
      [ordernumber]
    );

    if (data.length === ``) {
      console.log(`No order with that order number`);
      return `No order with that order number`;
    } else {
      return data.rows[0];
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}
async function getOrdersByStatus(orderstatus) {
  try {
    const data = await pool.query(
      `
      select
        *
      from 
        orders
      where 
        "order-status" = $1`,
      [orderstatus]
    );
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
async function updateOrderStatus(ordernumber, orderstatus) {
  const queryText = `
    update 
      orders
    set
      "order-status" = $2,
      "process-finished_at" = $3
    where
      "order-number" = $1
    returning
      *
  `;
  const queryValues = [ordernumber, orderstatus, "now()"];

  const { rows } = await pool.query(queryText, queryValues);
  // const orders = rows.map(order => {
  //   return {
  //     ordernumber: ordernumber,
  //     orderstatus: orderstatus
  //   };
  // });

  return rows[0];
}

module.exports = {
  createOrder, //check,
  getAllOrders, //check
  getOrder, //check
  getOrdersByStatus, //check
  updateOrderStatus
};
