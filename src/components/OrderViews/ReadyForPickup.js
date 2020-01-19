import React from "react";

import { updateOrderStatus } from "../../clientAPI/clientAPI";
import BackButton from "../AcceptDecline/BackButton";
import { Navbar, Card } from "react-bootstrap";

class ReadyForPickupView extends React.Component {
	handleSendOrder = (status) => {
		const orderNumber = this.props.order.order_number;
		updateOrderStatus(orderNumber, status);
	};

	render () {
		let orderList = this.props.order.order_list;

		const listedProducts = orderList.map((products) => {
			return (
				<div className="container" key={products.productId}>
					<div className="card order-cards m-1">
						<div className="card-header">Artikkel: {products.description}</div>
						<div className="card-body">
							<div className="card-text">
								Artikkelid: {products.productId}
								<br />
								Pris: {products.price} NOK
								<br />
								Antall: {products.orderQuantity}
							</div>
						</div>
					</div>
				</div>
			);
		});
		console.log(this.props);

		return (
			<div>
				<Navbar expand="lg">
					<BackButton />
					<div className="col-9">
						<strong>Kunde: {this.props.order.customer_name}</strong>
					</div>
				</Navbar>
				<div className="row varner-white-theme">
					<div className="container p-2 px-4">
						<div className="col-sm-12 ">
							<h5>Sammendrag av bestilling</h5>
							<strong>ReservasjonsID: {this.props.order.reference_order_no}</strong>
							<br />
							<strong>Kunde: {this.props.order.customer_name}</strong>
							<br />
							<strong>Telefon: {this.props.order.customer_phonenumber}</strong>
						</div>
						<div className="col-sm-12 d-none d-lg-block">
							<p>Email: {this.props.order.customer_email}</p>
							<p>Leveringsadresse: {this.props.order.customer_addressline1}</p>
						</div>
					</div>
				</div>
				<div>
					<h3 className="text-center m-4">Ordreoversikt</h3>
					{listedProducts}
				</div>
				<br />
				<div className="col-6 justify-content-center">
					{this.props.order.deliverd ? (
						<button
							onClick={() => this.handleSendOrder("delivered")}
							data-toggle="modal"
							data-target="#myModal"
							className="btn varner-btn-light w-100 mx-4 rounded-0 center ready-for-pick-up"
						>
							Marker som levert
						</button>
					) : (
						""
					)}
				</div>
				<div className="modal fade" id="myModal">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">
									Ordrenummer:
									<strong className=""> {this.props.order.reference_order_no}</strong>
								</h5>
								<button type="button" className="close" data-dismiss="modal">
									<span>&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<h5>{this.props.order.customer_name} har mottatt varen.</h5>
								Du finner nå orderen under utlevert.
							</div>
							<div className="modal-footer">
								<div className="varner-white-theme text-center">
									<BackButton />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ReadyForPickupView;
