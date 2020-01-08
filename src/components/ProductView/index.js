import React from 'react';

const order = {
    orderNumber: 'BB-6WN-119682',
    referenceOrderNo: '100119682',
    orderDate: '2019-12-16T11:26:41',
    customer: 'Jon Selenium',
    phoneNumber: '+4746823125',
    addressLine1: 'Sjøskogvn. 7',
    zipCode: 1407,
    city: 'Vinterbro',
    orderLines: [
        {
            sku: 71944370010,
            description: 'IW ABAD Tyra Bottom - 380/Red - L',
            orderedQuantity: 1,
            size: 'L',
            color: 'Red',
            image: 'https://cubus.imgix.net/globalassets/productimages/7227796_001_f_q_l_basic_ls_cubus.jpg?auto=format&w=1000'
        },
        {
            sku: 71937770004,
            description: 'DK NDC Tote - 990/Black - L',
            orderedQuantity: 1,
            size: 'L',
            color: 'Black',
            image: 'https://cubus.imgix.net/globalassets/productimages/7050221250411_f_q_70367219_l_basic_tank_top.jpg?auto=format&w=1000'
        }
    ],
    fullAdress: function () {
        return ' ' + this.addressLine1 + ', ' + this.zipCode + ' ' + this.city;
    }
}


class Product extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: order
        }
    }

    render() {
        const orderElements = this.state.order.orderLines
        .map(({ description, size, color, orderedQuantity, image, sku }) => {
            return (
                <div key={sku}>
                    <img src={image} alt='' width='123' height='164' />
                    <h2>{description}</h2>
                    <p>Str: {size}</p>
                    <p>Farge: {color}</p>
                    <p>Antall: {orderedQuantity}</p>
                    <p>SKU: {sku}</p>
                </div>
            )
        });

        const fullAdress = this.state.order.fullAdress();

        return (
            <React.Fragment>
                <div>
                    <header>header</header>
                    <div>
                        <h1>Sammendrag av bestilling</h1>
                        <p>{this.state.order.orderDate}</p>
                        <p>{this.state.order.referenceOrderNo}</p>
                        <p>{this.state.order.customer}</p>
                        <p>{this.state.order.phoneNumber}</p>
                        <p>Leveringsadresse:
                            {fullAdress}
                        </p>
                    </div>
                    <div>
                        <h1>Produktinformasjon</h1>
                        {orderElements}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Product;