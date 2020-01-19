import React from "react";

import { withRouter } from "react-router-dom";
import { getFormattedDeadLine } from "../../utils/getFormattedDeadLine";
import { getSize, getColor } from "../../utils/extractProductInfo";
import { updateOrderStatus } from "../../clientAPI/clientAPI";

class ProcessingOrderView extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			pickedSkus: [],
			isLoading: false,
			error: null
		};

		this.handleChange = this.handleChange.bind(this);
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
	async handleChange (statusValue, event) {
		const { order_number } = this.props.order;
		try {
			await updateOrderStatus(order_number, statusValue, null);
		} catch (err) {
			console.log(err);
		}

		this.props.history.goBack();
	}
	render () {
		const { pickedSkus } = this.state;
		const { order, now, getProductDescription } = this.props;
		let orderElements;

		const formattedDeadLine = getFormattedDeadLine(now, new Date(order.status_changed_at));

		if (order && order.order_list) {
			orderElements = order.order_list.map(({ description, orderQuantity, productId }) => {
				return (
					<div className="col-xs-12 col-sm-6" key={productId}>
						<div className="card order-cards mb-3 p-2 rounded-0">
							<div className="row">
								<div className="col-12">
									<h6>{getProductDescription(description)}</h6>
                  </div>
                <div className="col-6 p-3">
                  <div className="product-image w-100">
                    <img
                      src={
                        "https://cubus.imgix.net/globalassets/productimages/7239779_308_f_q_l_ina_hoodie_cubus.jpg?auto=format&w=1000"
                      }
                      alt="productImage"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="col-6 pt-3">
                  <article>
                    <b className="varner-text-grey mr-2">
                      Str:
                            </b>
                    {getSize(description)}
                    <br />
                    <b className="varner-text-grey mr-2">
                      Farge:
                            </b>
                    {getColor(description)}
                    <br />
                    <b className="varner-text-grey mr-2">
                      Antall:
                            </b>
                    {orderQuantity} <br />
                    <b className="varner-text-grey mr-2">
                      Product Id:
                            </b>
                    {productId}
                  </article>
                </div>
							</div>
		      	  <div className="row">
								<div className="container">
                  <div className="text-center">
									<button
										className="btn varner-btn-light rounded-0"
										onClick={this.handleClick.bind(this, productId)}>
											{this.state.pickedSkus.includes(productId) ? (
												"Plukket"
											) : (
												"Marker som plukket"
											)}
									</button>
                  </div>
                </div>
							</div>
						</div>
					</div>
				);
			});

			return (
				<>
					<header>
						<div className="row p-2">
							<div className="col-2">
								<button className="btn" onClick={() => this.props.history.goBack()}>
									<i
										className="fa fa-arrow-left text-success ml-auto"
										style={{ transform: "scale(1.5, 1)" }}
									/>
								</button>
							</div>
							<strong className="col-10 text-center">
								Ventet:
								<strong className="green ml-1">{formattedDeadLine}</strong>
								<br />
								Varer plukket:
								<strong className="green ml-1">{pickedSkus.length} </strong>
								av {order.order_list.length}
							</strong>
						</div>
					</header>
					<main>
            <div className="row">
						  <div className="container">
							  <h3 className="text-center m-3">Ordreoversikt</h3>
							  	{orderElements}
              </div>
            </div>
            <div className="row">
              <div className="container text-center">
								<button
									disabled={pickedSkus.length !== order.order_list.length}
									value={"packed"}
									onClick={this.handleChange.bind(this, "in-process")}
									className="btn varner-btn-green"
								>
								  Klar til opphenting
								</button>
								<button
									onClick={this.handleChange.bind(this, "packed")}
									className="btn varner-btn-dark"
								>
									Angre
								</button>
              </div>
            </div>        
					</main>
				</>
			);
		}
		return <React.Fragment />;
	}
}

export default withRouter(ProcessingOrderView);
