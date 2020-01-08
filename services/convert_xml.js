const parseString = require('xml2js').parseString;
const fetch = require("node-fetch");
const base64 = require('base-64');

// Set Header
global.Headers = fetch.Headers;


//GET XML FILE from Varner
const xmlUrl = 'https://secure-taiga-49335.herokuapp.com/data'
async function getDataFromAPI() {
  let res = await fetch(xmlUrl)
  let data = await res.text()
  // Convert xml to json.
  let xml = data

  // Parse from XML TO JSON
  let orderJson;
  parseString(xml, function (err, result) {
    // console.log(result.ecomOrderMessageRequest.orderMessage[0].orders[0].order[0].orderLines[0].orderLine[1]);
    //Shortcuts
    const order = result.ecomOrderMessageRequest.orderMessage[0].orders[0].order[0];
    const delivery = result.ecomOrderMessageRequest.orderMessage[0].orders[0].order[0].delivery[0];
    const costumer = result.ecomOrderMessageRequest.orderMessage[0].orders[0].order[0].invoiceCustomer[0];
    const orderLines = result.ecomOrderMessageRequest.orderMessage[0].orders[0].order[0].orderLines[0];
    // ******
    // New Object
    // console.log(orderLines.orderLine.length)

    // Handle orderList, will work for multiple orders.
    let orderDetails = []
    orderLines.orderLine.forEach(function (order) {
      // console.log(order)
      orderDetails.push({
        position: Number(order.position[0]),
        productId: Number(order.productId[0]),
        description: order.description[0],
        orderQuantity: order.orderedQuantity[0],
        price: order.price[0]
      })
    })


    // GET ORDER API DETAILS (SKU API)
    const login = 'varnergofetch@protonmail.com';
    const password = 'varnergofetch';
    const url = 'https://bikbok.com/no/api/productfeed/v2/get?variant=7244470_F922';
    // Getting json.
    fetch(url, {
      headers: new Headers({
        "Authorization": `Basic ${base64.encode(`${login}:${password}`)}`
      }),
    }).then(response => {
      if (!response.ok) throw new Error(response.status);
      return response.json();

    }).then(function (res) {
      // console.log(res[0].Skus)
    })

    // console.log('----', orderDetails)

    orderJson =
    {
      ordreNumber: order.orderNumber[0],
      refrenceOrderNumber: order.referenceOrderNo[0],
      orderDate: order.orderDate[0], // year/month/day
      deliveryDate: order.orderDate[0], // year/month/day
      storeCode: delivery.placeOfDeliveryCode[0],
      name: costumer.name[0],
      email: costumer.code[0],
      phoneNumber: costumer.phoneNumber[0],
      addressLine: costumer.addressLine1[0],
      zipCode: costumer.zipCode[0],
      city: costumer.city[0],
      orderList: orderDetails
    }
  });
  // Restructure obj
  // console.log('****', orderJson)
  return orderJson;
}

module.exports = getDataFromAPI;
