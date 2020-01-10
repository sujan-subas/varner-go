export async function getAllOrdersDB() {
  const data = await fetch("http://localhost:3000/api/orders");
  console.log(data);
}
