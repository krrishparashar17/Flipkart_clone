const pool = require("../config/db");

const getAllProducts = async ({ search = "", category = "" }) => {
  let query = `
    SELECT 
      p.id,
      p.name,
      p.description,
      p.specifications,
      p.price,
      p.original_price,
      p.stock,
      p.brand,
      p.rating,
      p.thumbnail,
      c.name AS category
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE 1=1
  `;

  const params = [];

  if (search) {
    query += " AND p.name LIKE ?";
    params.push(`%${search}%`);
  }

  if (category) {
    query += " AND c.name = ?";
    params.push(category);
  }

  query += " ORDER BY p.id DESC";

  const [rows] = await pool.query(query, params);
  return rows;
};

const getProductById = async (id) => {
  const [products] = await pool.query(
    `
    SELECT 
      p.id,
      p.name,
      p.description,
      p.specifications,
      p.price,
      p.original_price,
      p.stock,
      p.brand,
      p.rating,
      p.thumbnail,
      c.name AS category
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ?
    `,
    [id]
  );

  if (!products.length) return null;

  const [images] = await pool.query(
    "SELECT image_url FROM product_images WHERE product_id = ?",
    [id]
  );

  return {
    ...products[0],
    images: images.map((img) => img.image_url),
  };
};

const getAllCategories = async () => {
  const [rows] = await pool.query("SELECT id, name FROM categories ORDER BY name ASC");
  return rows;
};

module.exports = {
  getAllProducts,
  getProductById,
  getAllCategories,
};