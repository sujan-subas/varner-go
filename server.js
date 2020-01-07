require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const parseString = require('xml2js').parseString;
const fetch = require("node-fetch");
const util = require('util');
const { Pool } = require("pg");

app.use(express.static("build"));
app.use(cors())

const port = process.env.PORT;
const secret = process.env.SECRET;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});


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
    console.log(result.ecomOrderMessageRequest.orderMessage[0].orders[0].order[0].deliveryCustomer);
    //Shortcuts
    const order = result.ecomOrderMessageRequest.orderMessage[0].orders[0].order[0];
    const delivery = result.ecomOrderMessageRequest.orderMessage[0].orders[0].order[0].delivery[0];
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
            placeOfDeliveryCode: delivery.placeOfDeliveryCode[0]
          },
          costumerInfo: [{

          }]
      }
    ]
  });
  // Restructure obj
  console.log( orderJson)
}

getDataFromAPI()


app.listen(port);
