const parseString = require('xml2js').parseString;
const fetch = require('node-fetch');
const base64 = require('base-64');

// Set Header
global.Headers = fetch.Headers;


//GET XML FILE from Varner
async function getJSONfromXML(result) {
    const order = result.ecomOrderMessageRequest.orderMessage[0].orders[0].order[0];
    const delivery = result.ecomOrderMessageRequest.orderMessage[0].orders[0].order[0].delivery[0];
    const costumer =result.ecomOrderMessageRequest.orderMessage[0].orders[0].order[0].invoiceCustomer[0];
    const orderLines = result.ecomOrderMessageRequest.orderMessage[0].orders[0].order[0].orderLines[0];
    const sku = result.ecomOrderMessageRequest.orderMessage[0].orders[0].order[0].orderLines[0].orderLine[0].productId[0];

    // Handle orderList, will work for multiple orders.
    let orderDetails = orderLines.orderLine.map(function (order) {
       
        return {
            position: Number(order.position[0]),
            // productId: Number(order.productId[0]),
            // Formatere sku nummer riktig. 
            productId: order.productId[0].slice(0,7),
            description: order.description[0],
            orderQuantity: order.orderedQuantity[0],
            price: order.price[0]
        };
    });

  

    // Make new Object
    const orderJson = {
        // bildeUrl: 'ddd',
        // url: 'url',
        orderNumber: order.orderNumber[0],
        refrenceOrderNumber: order.referenceOrderNo[0],
        orderDate: order.orderDate[0], // year/month/day
        deliveryDate: order.deliveryDate[0], // year/month/day
        storeCode: delivery.placeOfDeliveryCode[0],
        partDeliveryFlag: order.partDeliveryFlag[0],
        name: costumer.name[0],
        email: costumer.code[0],
        phoneNumber: costumer.phoneNumber[0],
        addressLine1: costumer.addressLine1[0],
        addressLine4: costumer.addressLine4[0],
        zipCode: costumer.zipCode[0],
        city: costumer.city[0],
        orderList: orderDetails

    };
    console.log('heeeeee')
    const nummerSKU = await getSKUfromApi(orderJson)
    console.log(orderJson.orderList[0].productId)

    return nummerSKU;
}
async function getSKUfromApi(orderJsonFromFunc) {
    // console.log('dette er json*****', orderJsonFromFunc)
    // GET ORDER API DETAILS (SKU API)
    // const produktIdURL = orderJsonFromFunc.orderList // J
    const login = 'varnergofetch@protonmail.com';
    const password = 'varnergofetch';
    const url = `https://bikbok.com/no/api/productfeed/v2/get?style=${produktIdURL}`;  //7134708
    // const url = `https://bikbok.com/no/api/productfeed/v2/get?variant=${imageLink}`;

    let imgUrl;
    // Getting json.
    const returnFromFetch = await fetch(url, {
        headers: new Headers({
            Authorization: `Basic ${base64.encode(`${login}:${password}`)}`
        })
    })
        .then(response => {
            if (!response.ok) throw new Error(response.status);
            return response.json();

        })
        .then(function (res) {
            console.log('..............................', res)
            // styleCode
            return imgUrl;
        })
        .then(function (imgUrl) {
            imageLink = imgUrl
            return imageLink
        });
    // Add field for  image link based on sku 
    const JSONDataPlussImgLink = orderJsonFromFunc;
    JSONDataPlussImgLink.productImageUrl = returnFromFetch
    // console.log(JSONDataPlussImgLink)

    return JSONDataPlussImgLink

}


module.exports = getJSONfromXML;
