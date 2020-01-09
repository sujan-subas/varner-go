import React from 'react';
import { getFormattedDeadLine } from '../../utils/time';

const order = {
    status: 'new',
    orderNumber: 'BB-6WN-119682',
    referenceOrderNo: '100119682',
    deadLine: '2020-01-09T18:44:41',
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
            rand: 0,
            order: order,
            pickedSkus: [],
            orderCount: 0
        }
    }

    componentDidMount() {
        let count = this.state.order.orderLines.length;
        this.setState({
            orderCount: count
        })
    }

    handleClick(sku) {
        if (this.state.pickedSkus.includes(sku)) {
            let i = this.state.pickedSkus.indexOf(sku);
            let pickedSkusCopy = [...this.state.pickedSkus];
            pickedSkusCopy.splice(i, 1);
            this.setState({
                pickedSkus: pickedSkusCopy
            })
        } else {
            this.setState({
                pickedSkus: [...this.state.pickedSkus, sku],
            })
        }

    }

render() {
    const orderElements = this.state.order.orderLines
        .map(({ description, size, color, orderedQuantity, image, sku }) => {

            return (
                <div key={sku} >
                    <img src={image} alt='' width='123' height='164' />
                    <h2>{description}</h2>
                    <p>Str: {size}</p>
                    <p>Farge: {color}</p>
                    <p>Antall: {orderedQuantity}</p>
                    <p>SKU: {sku}</p>
                    <button onClick={this.handleClick.bind(this, sku)}>
                        {this.state.pickedSkus.includes(sku) ? 'Plukket' : 'Ikke plukket'}
                    </button>
                </div>
            )
        });

    const fullAdress = this.state.order.fullAdress();

    return (
        <React.Fragment>
            <div>
                <header>
                    <h3>Utløper om: {getFormattedDeadLine(this.state.order.deadLine, new Date())}</h3>
                    <h3>Antall varer: {this.state.orderCount}</h3>
                    <h3>Varer plukket: {this.state.pickedSkus.length}</h3>
                </header>
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
                <div>
                    <button>Avvis ordre</button>
                    <button>Aksepter ordre</button>
                </div>
            </div>
        </React.Fragment>
    )
}
}

export default Product;