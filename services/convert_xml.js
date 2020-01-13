const parseString = require('xml2js').parseString;
const fetch = require('node-fetch');
const base64 = require('base-64');

// Set Header
global.Headers = fetch.Headers;

// Basic auth to express.

//GET XML FILE from Varner
async function getJSONfromXML(result) {
    // console.log(result.ecomOrderMessageRequest.orderMessage[0].orders[0].order[0].orderLines[0].orderLine[1]);
    //Shortcuts
    const order = result.ecomOrderMessageRequest.orderMessage[0].orders[0].order[0];
    const delivery = result.ecomOrderMessageRequest.orderMessage[0].orders[0].order[0]
        .delivery[0];
    const costumer =
        result.ecomOrderMessageRequest.orderMessage[0].orders[0].order[0]
            .invoiceCustomer[0];
    const orderLines =
        result.ecomOrderMessageRequest.orderMessage[0].orders[0].order[0]
            .orderLines[0];
    const sku =
        result.ecomOrderMessageRequest.orderMessage[0].orders[0].order[0]
            .orderLines[0].orderLine[0].productId[0];

    // ******
    // New Object
    // console.log(orderLines.orderLine.length)

    // Handle orderList, will work for multiple orders.
    let orderDetails = orderLines.orderLine.map(function (order) {
        // console.log(order)
        return {
            position: Number(order.position[0]),
            // productId: Number(order.productId[0]),
            // Formatere sku nummer riktig. 
            productId: order.productId[0].slice(0,7) + '_' + order.productId[0].slice(7,11),
            description: order.description[0],
            orderQuantity: order.orderedQuantity[0],
            price: order.price[0]
        };
    });

    // // Handle SKU number
    // let skuNumber = sku.slice(0, 7) + '_' + sku.slice(7, 11);
    // console.log('dette er skhhhh', skuNumber)

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

    const nummerSKU = await getSKUfromApi(orderJson)
    // console.log(nummerSKU)

    return nummerSKU;
}
async function getSKUfromApi(orderJsonFromFunc) {
    // console.log('dette er json*****', orderJsonFromFunc)
    // GET ORDER API DETAILS (SKU API)
    let imageLink = orderJsonFromFunc.model_number;
    const login = 'varnergofetch@protonmail.com';
    const password = 'varnergofetch';
    const url = `https://bikbok.com/no/api/productfeed/v2/get?variant=7244470_F922`;
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
            // console.log('..............................', res[0].ProductImages[0].Url)
            imgUrl = res[0].ProductImages[0].Url;
            return imgUrl;
        })
        .then(function (imgUrl) {
            imageLink = imgUrl
            return imageLink
        });
    // Add field for  image link based on sku 
    const JSONDataPlussImgLink = orderJsonFromFunc;
    JSONDataPlussImgLink.productImageUrl = returnFromFetch
    console.log(JSONDataPlussImgLink)

    return JSONDataPlussImgLink

}
/*
* todo: add deadline stamp.
* Altså en funksjon som rekner ut deadline, med hennsyn til åpningstider. 
 */

module.exports = getJSONfromXML;
