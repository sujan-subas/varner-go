import React from "react";
import { getFormattedDeadLine, getFormattedDate } from "../../utils/time";
import { getSize, getColor } from "../../utils/extractProductInfo";
import { getOrderByOrderNumber, updateOrderStatus } from "../../clientAPI/clientAPI";

// const fakeorder = {
// 	status: "new",
// 	orderNumber: "BB-6WN-119682",
// 	referenceOrderNo: "100119682",
// 	deadLine: "2020-01-11T21:44:41",
// 	acceptedTime: "2020-01-11T11:40:04",
// 	customer: "Jon Selenium",
// 	phoneNumber: "+4746823125",
// 	addressLine1: "Sjøskogvn. 7",
// 	zipCode: 1407,
// 	city: "Vinterbro",
// 	orderLines: [
// 		{
// 			sku: 71944370010,
// 			description: "IW ABAD Tyra Bottom - 380/Red - L",
// 			orderedQuantity: 1,
// 			size: "L",
// 			color: "Red",
// 			image:
// 				"https://cubus.imgix.net/globalassets/productimages/7227796_001_f_q_l_basic_ls_cubus.jpg?auto=format&w=1000"
// 		},
// 		{
// 			sku: 71937770004,
// 			description: "DK NDC Tote - 990/Black - L",
// 			orderedQuantity: 1,
// 			size: "L",
// 			color: "Black",
// 			image:
// 				"https://cubus.imgix.net/globalassets/productimages/7050221250411_f_q_70367219_l_basic_tank_top.jpg?auto=format&w=1000"
// 		}
// 	],
// 	fullAdress: function () {
// 		return " " + this.addressLine1 + ", " + this.zipCode + " " + this.city;
// 	}
// };

class Product extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			time: "",
			order: {},
			pickedSkus: [],
			isLoading: false,
			error: null
		};

		this.handleChange = this.handleChange.bind(this);
		this.timer = null;
	}

	async componentDidMount () {
		await this.getOrder();
  }
  
  async getOrder() {
    const { ordernumber } = this.props.match.params;
		try {
			this.setState({ isLoading: true });
			const order = await getOrderByOrderNumber(ordernumber);
			this.setState({ order });

			this.getTime();
			//const count = this.state.order.orderLines.length;
			//this.setState({ orderCount: count, isLoading: false });
			//console.log(this.state.order);
		} catch (error) {
			this.setState({ error });
		}
  }

	handleClick (sku) {
		if (this.state.pickedSkus.includes(sku)) {
			let i = this.state.pickedSkus.indexOf(sku);
			let pickedSkusCopy = [ ...this.state.pickedSkus ];
			pickedSkusCopy.splice(i, 1);
			this.setState({
				pickedSkus: pickedSkusCopy
			});
		} else {
			this.setState({
				pickedSkus: [ ...this.state.pickedSkus, sku ]
			});
		}
	}

	async handleChange (field, event) {
    /*
		this.setState({
			order: {
				...this.state.order,
				[field]: event.target.value
			}
    });
    */
   console.log(event.target.value)
		const { ordernumber } = this.props.match.params;
    const order = await updateOrderStatus(ordernumber, event.target.value);
    this.setState({ order });
    this.getOrder();
		//const { history } = this.props;
		//history.replace(`/order/${ordernumber}`);
	}

	getTime () {
		// let time;
		// const { order } = this.state;
		// if (order.order_status === "new") {
		// 	time = getFormattedDeadLine(new Date(order.deadLine), new Date());
		// } else if (order.order_status === "in-process") {
		// 	time = getFormattedDeadLine(new Date(), new Date(order.created_in_app_at));
		// }

		// this.setState({
		// 	time: time
		// });

		// this.timer = setTimeout(() => this.getTime(), 1000);
	}

	render () {
		const { order, pickedSkus, time } = this.state;
		console.log(order);
		let orderElements;

		if (order && order.order_list) {
			orderElements = order.order_list.map(({ description, size, color, orderQuantity, productId }) => {
				return (
					<div key={productId}>
						<img src={"https://cubus.imgix.net/globalassets/productimages/7239779_308_f_q_l_ina_hoodie_cubus.jpg?auto=format&w=1000"} alt="" width="123" height="164" />
						<h2>{description}</h2>
						<p>Str: {getSize(description)}</p>
						<p>Farge: {getColor(description)}</p>
						<p>Antall: {orderQuantity}</p>
						<p>SKU: {productId}</p>
						<button onClick={this.handleClick.bind(this, productId)}>
							{this.state.pickedSkus.includes(productId) ? "Plukket" : "Skal plukke"}
						</button>
					</div>
				);
			});

			//const fullAdress = this.state.order.fullAdress(); skriv fullAdress()

			return (
				<React.Fragment>
					<div>
						<header>
							{order.order_status === "new" ? (
								<h3>
									Utløper om:
									{time}
								</h3>
							) : (
								<h3>
									Venter på plukket varer:
									{time}
								</h3>
							)}

							<h3>
								Antall varer:
								{order.order_list.length}
							</h3>
							<h3>
								Varer plukket:
								{pickedSkus.length}
							</h3>
						</header>
						<div>
							<h1>Sammendrag av bestilling</h1>
							<p>Status: {order.order_status}</p>
							<p>Bestillingstidspunkt: {getFormattedDate(order.order_date)}</p>
							<p>ReservasjonsID: {order.reference_order_no}</p>
							<p>Kunde: {order.customer_name}</p>
							<p>Telefon: {order.customer_phonenumber}</p>
						</div>
						<div>
							<h1>Produktinformasjon</h1>
							{orderElements}
						</div>
						<div>
              <button 
                value={"declined"} 
                onClick={this.handleChange.bind(this, "orderstatus")}
              >
								Avvis ordre
							</button>
							{pickedSkus.length === order.order_list.length ? (
                <button 
                  value={"packed"} 
                  onClick={this.handleChange.bind(this, "orderstatus")}
                >
									Klar til opphenting
								</button>
							) : (
                <button 
                  value={"in-process"} 
                  onClick={this.handleChange.bind(this, "orderstatus")}
                >
									Ja, dette fikser vi
								</button>
							)}
						</div>
					</div>
				</React.Fragment>
			);
		}
		return <React.Fragment />;
	}
}

export default Product;
