import React from "react";

import { withRouter } from "react-router-dom";
import { getFormattedDeadLine, getFormattedDate } from "../../utils/getFormattedDeadLine";
import { getSize, getColor } from "../../utils/extractProductInfo";
import { updateOrderStatus } from "../../clientAPI/clientAPI";

class ProcessingOrderView extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			time: "",
			pickedSkus: [],
			isLoading: false,
			error: null
		};

		this.handleChange = this.handleChange.bind(this);
		this.timer = null;
	}

	componentDidMount () {
		this.getTime();
	}

	// async getOrder() {
	//   const { ordernumber } = this.props.match.params;
	//   try {
	//     this.setState({ isLoading: true });
	//     const order = await getOrderByOrderNumber(ordernumber);
	//     this.setState({ order });
	//     this.getTime();
	//     this.setState({ isLoading: false });
	//   } catch (error) {
	//     this.setState({ error });
	//   }
	// }

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

	handleChange (statusValue, event) {
		const { ordernumber } = this.props.match.params;
		const { changeView, status, history } = this.props;

		if (statusValue === "new") {
			//check PATCH request
			updateOrderStatus(ordernumber, statusValue, "pending");
			changeView(status);
		}

		// if(statusValue === "packed") {
		//   changeView(status);
		// }

		//history.push(`/orders/${ordernumber}/${status}`);
	}

	async getTime () {
		let time;
		const { order } = this.props;
		console.log(order.status_changed_at);
		time = getFormattedDeadLine(new Date(), new Date(order.status_changed_at));
		console.log(time);
		this.setState({
			time: time
		});
		//this.timer = setTimeout(() => this.getTime(), 1000);
	}

	render () {
		const { pickedSkus } = this.state;
		const { order, now } = this.props;
    let orderElements;
    
    const formattedDeadLine = getFormattedDeadLine(
      now,
      new Date(order.status_changed_at)
    );

		const header = (
			<header className="p-3">
				<div className="row">
					<div className="col-2">
						<button className="btn" onClick={this.handleChange.bind(this, "new")}>
							<i className="fa fa-arrow-left text-success ml-4" style={{ transform: "scale(1.5, 1)" }} />
						</button>
					</div>
					<div className="col-9">
						<h4>Ventet: {formattedDeadLine}</h4>
						<h4>Antall varer: {order.order_list.length} </h4>
						<h4>
							Varer plukket: {pickedSkus.length} av {order.order_list.length}
						</h4>
					</div>
				</div>
			</header>
		);

		if (order && order.order_list) {
			orderElements = order.order_list.map(({ description, orderQuantity, productId }) => {
				return (
					<div className="card text-white order-cards mb-4 p-4" key={productId}>
						<div className="row">
							<div className="col-6">
								<img
									src={
										"https://cubus.imgix.net/globalassets/productimages/7239779_308_f_q_l_ina_hoodie_cubus.jpg?auto=format&w=1000"
									}
									alt="productImage"
									className="img-fluid p-4"
								/>
							</div>
							<div className="col-6">
								<div className="container p-4">
									<h4>{description}</h4>
									<br />
									<p>Str: {getSize(description)}</p>
									<p>Farge: {getColor(description)}</p>
									<p>Antall: {orderQuantity}</p>
									<p>SKU: {productId}</p>
								</div>
							</div>
							<div className="col-12 m-4 text-center">
								<button
									className="btn btn-lg varner-btn-green w-75 mx-2 rounded-0"
									onClick={this.handleClick.bind(this, productId)}
								>
									{this.state.pickedSkus.includes(productId) ? "Plukket" : "Marker som plukket"}
								</button>
							</div>
						</div>
					</div>
				);
			});

			return (
				<React.Fragment>
					{header}
					<div className="jumbotron jumbotron-fluid p-2 varner-white-theme" />
					<div className="container">
						<h1 className="text-center">Ordreoversikt</h1>
						<div className="row">
							<div className="container">{orderElements}</div>
						</div>
						<div className="container m-4 text-center">
							<div className="row">
								<div className="col-6">
									<button
										onClick={this.handleChange.bind(this, "new")}
										className="btn varner-btn-green w-75 mx-2 rounded-0"
									>
										Angre
									</button>
								</div>
								<div className="col-6">
									<button
										disabled={pickedSkus.length !== order.order_list.length}
										value={"packed"}
										onClick={this.handleChange.bind(this, "packed")}
										className="btn varner-btn-green w-75 mx-2 rounded-0"
									>
										Klar til opphenting
									</button>
								</div>
							</div>
						</div>
					</div>
				</React.Fragment>
			);
		}
		return <React.Fragment />;
	}
}

export default withRouter(ProcessingOrderView);
