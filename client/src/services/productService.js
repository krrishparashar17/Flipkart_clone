import api from "./api";

export const getAllProducts = async (search = "", category = "") => {
  const response = await api.get("/api/products", {
    params: { search, category },
  });
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("/api/products/categories/all");
  return response.data;
};