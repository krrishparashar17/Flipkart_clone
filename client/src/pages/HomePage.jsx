import { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import ProductFilters from "../components/product/ProductFilters";
import ProductGrid from "../components/product/ProductGrid";
import { getAllProducts, getCategories } from "../services/productService";
import "./HomePage.css";

function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const cacheKey = `products_${selectedCategory || "all"}`;
      const cachedProducts = localStorage.getItem(cacheKey);

      if (cachedProducts) {
        const parsedProducts = JSON.parse(cachedProducts);
        setProducts(parsedProducts);
        setLoading(false);
      }

      const data = await getAllProducts("", selectedCategory);
      setProducts(data || []);
      localStorage.setItem(cacheKey, JSON.stringify(data || []));
    } catch (error) {
      console.error("Failed to fetch products:", error);

      if (products.length === 0) {
        setProducts([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const cachedCategories = localStorage.getItem("categories");

      if (cachedCategories) {
        setCategories(JSON.parse(cachedCategories));
      }

      const data = await getCategories();
      setCategories(data || []);
      localStorage.setItem("categories", JSON.stringify(data || []));
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = products.filter((product) =>
        `${product.name || ""} ${product.brand || ""} ${product.description || ""}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );

      setFilteredProducts(filtered);
    }, 200);

    return () => clearTimeout(timer);
  }, [search, products]);

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />

      <div className="home-page">
        <div className="home-page__layout">
          <ProductFilters
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <main className="home-page__content">
            <div className="home-page__header">
              <h2>Products for you</h2>
              <p>{filteredProducts.length} items found</p>
            </div>

            {loading && products.length === 0 ? (
              <div className="home-page__loading">Loading products...</div>
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default HomePage;