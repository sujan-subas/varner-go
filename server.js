require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const parseString = require('xml2js').parseString;
const fetch = require("node-fetch");
const base64 = require('base-64');
const util = require('util');
const { Pool } = require("pg");

app.use(express.static("build"));
app.use(cors())

const port = process.env.PORT;
const secret = process.env.SECRET;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const login = 'varnergofetch@protonmail.com';
const password = 'varnergofetch';
const url = 'https://bikbok.com/no/api/productfeed/v2/get?variant=7244470_F922';
fetch(url, {
  headers: new Headers({
    "Authorization": `Basic ${base64.encode(`${login}:${password}`)}`
  }),
}).then(response => {
  if (!response.ok) throw new Error(response.status);
  return response.json();

}).then(function(res) {
  console.log(res)
})



//GET XML FILE from Varner
const xmlUrl = 'https://secure-taiga-49335.herokuapp.com/data'
async function getDataFromAPI() {
  let res = await fetch(xmlUrl)
  let data = await res.text()
  // console.log(data)
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
    orderJson = [
      {
        orderInfo: [{
          ordreNumber: order.orderNumber[0],
          refrenceOrderNumber: order.referenceOrderNo[0],
          orderDate: order.orderDate[0],
          deliveryDate: order.orderDate[0]
        }],
          delivery: {
            storeCode: delivery.placeOfDeliveryCode[0]
          },
          costumerInfo: [{
            name: costumer.name[0],
            email: costumer.code[0],
            phoneNumber: costumer.phoneNumber[0],
            addressLine: costumer.addressLine1[0],
            zipCode: costumer.zipCode[0],
            city: costumer.city[0]
          }],
          ...orderLines
      }
    ]
  });
  // Restructure obj
  console.log('****', orderJson)
}

getDataFromAPI()

global.Headers = fetch.Headers;




app.listen(port);
