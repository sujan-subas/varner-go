require("dotenv").config();

const Pool = require("pg").Pool;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// post data in orders table in postgres
async function createOrder(orderObject) {
  const {
    orderNumber,
    refrenceOrderNumber,
    orderDate,
    deliveryDate,
    partDeliveryFlag,
    name,
    email,
    phoneNumber,
    addressLine1,
    addressLine4,
    zipCode,
    city,
    orderList
  } = orderObject;

  const queryText = `
  insert into orders
  (order_number, reference_order_no, order_date, delivery_date, part_delivery_flag, customer_name, customer_email, customer_phonenumber, customer_addressline1, customer_addressline4, customer_zipcode, customer_city, order_list, created_in_app_at)
    values
	    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    returning
    *
    `;
  const queryValues = [
    orderNumber,
    refrenceOrderNumber,
    orderDate,
    deliveryDate,
    partDeliveryFlag,
    name,
    email,
    phoneNumber,
    addressLine1,
    addressLine4,
    zipCode,
    city,
    JSON.stringify(orderList),
    "timestamptz default now()"
  ];

  console.log({ queryValues });

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
      order
        by orders.order_date desc

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
        order_number = $1
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
// async function getOrdersByStatus(orderstatus) {
//   try {
//     const data = await pool.query(
//       `
//       select
//         *
//       from
//         orders
//       where
//         order_status = $1`,
//       [orderstatus]
//     );
//     if (data.length === "") {
//       console.log(`No orders finished`);
//       return `No orders finished`;
//     } else {
//       console.log(data.rows);
//       return data.rows;
//     }
//   } catch (error) {
//     console.log(`Error: ${error.message}`);
//   }
// }
async function updateOrderStatus(ordernumber, orderstatus) {
  const queryText = `
    update 
      orders
    set
      order_status = $2
    where
      order_number = $1
    returning
      *
  `;
  const queryValues = [ordernumber, orderstatus];

  const { rows } = await pool.query(queryText, queryValues);

  return rows[0];
}

module.exports = {
  createOrder, //check,
  getAllOrders, //check
  getOrder, //check
  // getOrdersByStatus, //check
  updateOrderStatus
};
