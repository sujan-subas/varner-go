// const PORT = process.env.PORT;
// const API_URL = `http://localhost:${PORT}/api`;
const API_URL = "http://localhost:3000/api";
const varner_API_Url = "https://e90c8b7c-df85-4c2f-83a1-2782d5f0c73f.mock.pstmn.io/api/order/update/"



//Store ID and orderNumber , has this format: 625/N-456433/
// ENDPOINT FOR UPDATE TIL VARNER
export async function updateVarner(storeID, orderNumber, status, reason) {
	const res = await fetch(`${varner_API_Url}/${storeID}/${orderNumber}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			status,
			reason,
			// sett inn time stamps naar dette er klart. Ikke sikkert dette er mulig.
		})
	});
	return await res.json();
}

export async function getAllOrdersDB () {
	const response = await fetch(`${API_URL}/orders`);
	const data = await response.json();
	return data;
}

export async function getOrderByOrderNumber (ordernumber) {
	try {
		const data = await fetch(`${API_URL}/orders/${ordernumber}`);
		const order = await data.json();
		return order;
	} catch (error) {
		console.log(`Error: ${error.message}`);
	}
}

export async function updateOrderStatus (ordernumber, orderstatus) {
	const res = await fetch(`${API_URL}/orders/${ordernumber}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ ordernumber, orderstatus })
  });
	return await res.json();
}
// Login / auth
export async function createSession ({ handle, password }) {
	const res = await fetch(`${API_URL}/session`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ handle, password })
	});
	return await res.json();
}

// function for rejected /  delivered
//
