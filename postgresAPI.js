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
    orderList,
    productImageUrl
  } = orderObject;

  console.log({ orderObject });

  const queryText = `
  insert into orders
  (order_number, 
    reference_order_no, 
    order_date, 
    delivery_date, 
    part_delivery_flag, 
    customer_name, 
    customer_email, 
    customer_phonenumber, 
    customer_addressline1, 
    customer_addressline4, 
    customer_zipcode, 
    customer_city, 
    order_list, 
    product_Image_Url)
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
    productImageUrl
  ];

  // console.log({ queryValues });

  const { rows } = await pool.query(queryText, queryValues);

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

async function updateOrderStatus(ordernumber, order_status, reason) {
  const queryText = `
    update 
      orders
    set
	  order_status = $2,
	  decline_reason = $3
    where
      order_number = $1
    returning
      *
  `;
  const queryValues = [ordernumber, order_status, reason];

  const { rows } = await pool.query(queryText, queryValues);

  return rows[0];
}

// async function setExpire(ordernumber) {
//   const queryText = `
//   select
//     created_in_app
//   from
//     orders
//   where
//     order_number = $1
//   returning
//    *
//   `;
//   const queryValues = [ordernumber];
//   const row = await pool.query(queryText, queryValues);
//   console.log(row[0]);
//   //slice timestamp fix
//   if (row[0] > 17.0) {
//     //
//   }
// }

//   `;
//   const queryValues = [ordernumber];
//   const rows = await pool.query(queryText, queryValues);
//   console.log(rows[0]);
//   return rows[0];
//   //slice timestamp fix
//   // if (row[0] > 17.0) {
//   //   //
//   // }
// }

// // async function setExpire

module.exports = {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrderStatus
};

//Store ID and orderNumber , has this format: 625/N-456433/
// ENDPOINT FOR UPDATE TIL VARNER
// export async function updateVarner(reason, storeID, orderNumber, status) {
// 	// console.log('from VARNERFUNC', reason, storeID, orderNumber, status)
// 	const res = await fetch(`${varner_API_Url}/${storeID}/${orderNumber}`, {
// 		method: "PATCH",
// 		headers: {
// 			"Content-Type": "application/json"
// 		},
// 		body: JSON.stringify({
// 			status,
// 			reason,
// 			// sett inn time stamps naar dette er klart. Ikke sikkert dette er mulig.
// 		})
// 	}).then(function(res) {
// 		console.log(res)
// 	})
// 	// return await res.json();
// }

/**
 * todo:
 * orderProcessed() that will move an order from the table "orders" to table "processed_orders"
 *
 *
 */
