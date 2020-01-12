const API_URL = "http://localhost:5000/api";
export async function getAllOrdersDB() {
  const response = await fetch(`${API_URL}/orders`);
  const data = await response.json();
  return data;
}

export async function getOrderByOrderNumber(ordernumber) {
  try {
    const data = await fetch(`${API_URL}/orders/${ordernumber}`);
    console.log(data.json());
    return data.json();
    //fiks denne
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

export async function updateOrderStatus(ordernumber, orderstatus) {
  const res = await fetch(`${API_URL}/orders`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ordernumber, orderstatus)
  });
  return await res.json();
}
// Login / auth
export async function createSession({ handle, password }) {
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
