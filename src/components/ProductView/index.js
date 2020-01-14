import React from "react";
import { getFormattedDeadLine, getFormattedDate } from "../../utils/time";
import { setExpireValue } from "../../utils/setExpireValue";
import { getSize, getColor } from "../../utils/extractProductInfo";
import { getOrderByOrderNumber, updateOrderStatus } from "../../clientAPI/clientAPI";

class ProductView extends React.Component {
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

	async getOrder () {
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

	async handleChange (status) {
    const { history } = this.props;
    const { ordernumber } = this.props.match.params;
    history.push(`/orders/${ordernumber}/processing/${status}`)

  }

	getTime () {
		// let time;
    // const { order } = this.state;
    // const deadLine = setExpireValue(order.process_finished_at)
		// if (order.order_status === "new") {
		// 	time = getFormattedDeadLine(new Date(deadLine), new Date());
		// } else if (order.order_status === "in-process") {
		// 	time = getFormattedDeadLine(new Date(), new Date(order.created_in_app_at));
		// }

		// this.setState({
		// 	time: time
		// });

		// this.timer = setTimeout(() => this.getTime(), 1000);
	}

  render() {
    const { order, pickedSkus, time } = this.state;
    // const antallVarer = order.order_list.length;
    let orderElements;
    const header = (
      <header className="p-3">
        <div className="row">
          <div className="col-2">
            <button
              className="btn"
              onClick={() => this.handleButtonClick("back")}
            >
              <i
                className="fa fa-arrow-left text-success ml-4"
                style={{ transform: "scale(1.5, 1)" }}
              />
            </button>
          </div>
          <div className="col-9">
            <h4>Utløper om: {order.expires_at}</h4>
            {/* <h3> Antall varer: {order.order_list.length}  </h3> */}
            <h4> Kunde: {order.customer_name} </h4>
            <h4>Varer plukket: {pickedSkus.length}</h4>
          </div>
        </div>
      </header>
    );

    if (order && order.order_list) {
      orderElements = order.order_list.map(
        ({ description, orderQuantity, productId }) => {
          return (
            <div className="container" key={productId}>
              <div className="card text-white order-cards mb-4 p-4">
                <div className="row">
                  <div className="col-6">
                    <div >
                      <img
                        src={
                          "https://cubus.imgix.net/globalassets/productimages/7239779_308_f_q_l_ina_hoodie_cubus.jpg?auto=format&w=1000"
                        }
                        alt="productImage"
                        className="img-fluid p-4"
                      />
                    </div>
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
                      {this.state.pickedSkus.includes(productId)
                        ? "Plukket"
                        : "Skal plukke"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      );

      return (
        <React.Fragment>
          {header}
          <div className="jumbotron jumbotron-fluid p-2 varner-white-theme">
            {/* <header>
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
            </header> */}
            <div className="container">
              <div className="row">
                <div className="container">
                  <div className="col-sm-12 ">
                    <h3>Sammendrag av bestilling</h3>
                    <p>Bestillingsdato: {getFormattedDate(order.order_date)}</p>
                    <p>ReservasjonsID: {order.reference_order_no}</p>
                    <p>Kunde: {order.customer_name}</p>
                    <p>Telefon: {order.customer_phonenumber}</p>
                  </div>
                  <div className="col-sm-12 d-none d-lg-block">
                    <p>Email: {order.customer_email}</p>
                    <p>Leveringsadresse: {order.customer_addressline1}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div>
              <h1 className="text-center">Produktinformasjon</h1>
              <div className="row">{orderElements}</div>
            </div>
            <div>
              <button onClick={this.handleChange.bind(this, "declined")}>
                Avvis ordre
              </button>
              {pickedSkus.length === order.order_list.length ? (
                <button onClick={this.handleChange.bind(this, "declined")}>
                  Klar til opphenting
                </button>
              ) : (
                <button
                  onClick={this.handleChange.bind(this, "declined")}
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

export default ProductView;
