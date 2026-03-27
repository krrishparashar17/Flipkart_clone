import api from "./api";

export const placeOrder = async (payload) => {
  const response = await api.post("/orders", payload);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

export const getOrderHistoryByEmail = async (email) => {
  const response = await api.get(`/orders/history?email=${encodeURIComponent(email)}`);
  return response.data;
};