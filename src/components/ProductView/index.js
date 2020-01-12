import React from "react";
import { getFormattedDeadLine } from "../../utils/time";
import { getOrderByOrderNumber } from "../../clientAPI/clientAPI";

const fakeorder = {
	status: "new",
	orderNumber: "BB-6WN-119682",
	referenceOrderNo: "100119682",
	deadLine: "2020-01-11T21:44:41",
	acceptedTime: "2020-01-11T11:40:04",
	customer: "Jon Selenium",
	phoneNumber: "+4746823125",
	addressLine1: "Sjøskogvn. 7",
	zipCode: 1407,
	city: "Vinterbro",
	orderLines: [
		{
			sku: 71944370010,
			description: "IW ABAD Tyra Bottom - 380/Red - L",
			orderedQuantity: 1,
			size: "L",
			color: "Red",
			image:
				"https://cubus.imgix.net/globalassets/productimages/7227796_001_f_q_l_basic_ls_cubus.jpg?auto=format&w=1000"
		},
		{
			sku: 71937770004,
			description: "DK NDC Tote - 990/Black - L",
			orderedQuantity: 1,
			size: "L",
			color: "Black",
			image:
				"https://cubus.imgix.net/globalassets/productimages/7050221250411_f_q_70367219_l_basic_tank_top.jpg?auto=format&w=1000"
		}
	],
	fullAdress: function () {
		return " " + this.addressLine1 + ", " + this.zipCode + " " + this.city;
	}
};

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
		const { ordernumber } = this.props.match.params;
		try {
			this.setState({ isLoading: true });

			const order = await getOrderByOrderNumber(ordernumber);
			console.log("prodView" + order);
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

	handleChange (field, event) {
		this.setState({
			order: {
				...this.state.order,
				[field]: event.target.value
			}
		});
		//const { order } = this.state;
		//await editOrder(order);
		//const { history } = this.props;
		//const id = this.state.order.orderNumber;
		//history.replace(`/order/${id}`);
	}

	getTime () {
		let time;
		const { order } = this.state;
		if (order.order_status === "new") {
			time = getFormattedDeadLine(new Date(order.deadLine), new Date());
		} else if (order.status === "in-process") {
			time = getFormattedDeadLine(new Date(), new Date(order.created_in_app_at));
		}

		this.setState({
			time: time
		});

		this.timer = setTimeout(() => this.getTime(), 1000);
	}

	render () {
		const { order, pickedSkus, time } = this.state;
		console.log(order);
		let orderElements;

		if (order && order.orderLines) {
			orderElements = order.orderLines.map(({ description, size, color, orderedQuantity, image, sku }) => {
				return (
					<div key={sku}>
						<img src={image} alt="" width="123" height="164" />
						<h2>{description}</h2>
						<p>Str: {size}</p>
						<p>Farge: {color}</p>
						<p>Antall: {orderedQuantity}</p>
						<p>SKU: {sku}</p>
						<button onClick={this.handleClick.bind(this, sku)}>
							{this.state.pickedSkus.includes(sku) ? "Plukket" : "Skal plukke"}
						</button>
					</div>
				);
			});

			const fullAdress = this.state.order.fullAdress();

			return (
				<React.Fragment>
					<div>
						<header>
							{order.status === "new" ? (
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
								{order.orderLines.length}
							</h3>
							<h3>
								Varer plukket:
								{pickedSkus.length}
							</h3>
						</header>
						<div>
							<h1>Sammendrag av bestilling</h1>
							<p>Status: {order.status}</p>
							<p>{order.orderDate}</p>
							<p>{order.referenceOrderNo}</p>
							<p>{order.customer}</p>
							<p>{order.phoneNumber}</p>
							<p>
								Leveringsadresse:
								{fullAdress}
							</p>
						</div>
						<div>
							<h1>Produktinformasjon</h1>
							{orderElements}
						</div>
						<div>
							<button value={"rejected"} onClick={this.handleChange.bind(this, "status")}>
								Avvis ordre
							</button>
							{pickedSkus.length === order.orderLines.length ? (
								<button value={"packed"} onClick={this.handleChange.bind(this, "status")}>
									Klar til opphenting
								</button>
							) : (
								<button value={"in-process"} onClick={this.handleChange.bind(this, "status")}>
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
