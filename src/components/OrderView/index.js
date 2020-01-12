import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { format } from "date-fns";
import { getAllOrdersDB } from "../../clientAPI/clientAPI";

class Overview extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			// order: orderLine,
			tabKey: "new",
			error: false,
			allOrders: [],
			isLoading: true
		};
	}

	async componentDidMount () {
		try {
			const allOrders = await getAllOrdersDB();
			this.setState({
				allOrders,
				isLoading: false
			});
		} catch (error) {
			console.log(`Error: ${error.message}`);
			this.setState({
				error
			});
		}
	}

	handleChangeTab (tabKey) {
		this.setState({ tabKey });
	}

	handleCardClick (ordernumber) {
		console.log(`hande has been clicked`);
		const { history } = this.props;
		history.push(`/orders/${ordernumber}`);
		console.log(`handle cards click`);
		console.log(history);
		console.log(ordernumber);
	}

	render () {
		if (!this.state.allOrders.length)
			return <div className="container texr-white">Ingenting å hente! Sjekk om server er oppe å går ;-</div>;

		const { tabKey, allOrders } = this.state;

		let switchName = () => {
			let newName = "";
			if (this.state.tabKey === "delivered") {
				newName = "Levert";
			} else if (this.state.tabKey === "rejected") {
				newName = "Avvist";
			}
			return newName;
		};

		const ordersFromDatabase = allOrders.filter((order) => order.order_status === tabKey).map((order, i) => {
			//  fix formate data
			// const formattedDate = format(
			//   new Date(order.created_in_ap_at),
			//   "MM/dd/yyyy"
			// );
			return (
				<div
					className="text-white card order-cards m-4"
					key={i}
					onClick={() => this.handleCardClick.bind(this, order.order_number)}
				>
					<div className="card-header">
						Ordre nummer: {order.order_number} | {order.order_status}
					</div>
					<div className="card-body ">
						<p>Utløper om: {order.expire === 0 ? "Unable to state" : order.expire} 88 min</p>
						<p>Antall varer: {order.order_list.length}</p>
						{/* <p>Bestillingsdato: {formattedDate} </p> */}
						<br />
						<p>Referanse Nummer: {order.reference_order_no}</p>
						<p>Name: {order.customer_name}</p>
					</div>
				</div>
			);
		});

		//return
		return (
			<React.Fragment>
				<Navbar bg="light" expand="lg">
					<Navbar.Brand>Varner Go</Navbar.Brand>
					<strong> Active Orders {allOrders.length}</strong>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto" activeKey={tabKey} onSelect={(tabKey) => this.handleChangeTab(tabKey)}>
							<Nav.Link eventKey="delivered">Utlevert</Nav.Link>
							<Nav.Link eventKey="rejected">Avvist</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<Nav
					className="justify-content-center color-nav"
					variant="tabs"
					defaultActiveKey="new"
					activeKey={tabKey}
					onSelect={(tabKey) => this.handleChangeTab(tabKey)}
				>
					<Nav.Link eventKey="new"> Nye ordre () </Nav.Link>
					<Nav.Link eventKey="in-process">Under behandling</Nav.Link>
					<Nav.Link eventKey="packed">Til henting</Nav.Link>
				</Nav>
				<h2>{switchName()}</h2>
				{ordersFromDatabase.length === 0 ? (
					<div className="text-white">
						<div className="container">NO {tabKey.toLocaleUpperCase()} ORDERS</div>
					</div>
				) : (
					ordersFromDatabase
				)}
				{/* <div className="container">{orderElements}</div> */}
			</React.Fragment>
		);
	}
}

export default Overview;
