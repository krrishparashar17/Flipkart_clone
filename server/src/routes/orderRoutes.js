import api from "./api";

export const placeOrder = async (payload) => {
  const response = await api.post("/api/orders", payload);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await api.get("/api/orders");
  return response.data;
};

export const getOrderHistoryByEmail = async (email) => {
  const response = await api.get(`/api/orders/history?email=${encodeURIComponent(email)}`);
  return response.data;
};