import api from "./api";

export const getAllProducts = async (category = "") => {
  const response = await api.get("/api/products", {
    params: { category },
  });
  return response.data.data || [];
};

export const getProductById = async (id) => {
  const response = await api.get(`/api/products/${id}`);
  return response.data.data || response.data;
};

export const getCategories = async () => {
  const response = await api.get("/api/products/categories/all");
  return response.data.data || [];
};