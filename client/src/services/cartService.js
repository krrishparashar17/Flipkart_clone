import api from "./api";

export const syncCartToServer = async (item) => {
  const response = await api.post("/cart", item);
  return response.data;
};

export const placeOrder = async (payload) => {
  const response = await api.post("/orders", payload);
  return response.data;
};  