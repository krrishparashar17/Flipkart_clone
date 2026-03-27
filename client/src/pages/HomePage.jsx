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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getAllProducts(search, selectedCategory);
      setProducts(response.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, selectedCategory]);

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
              <p>{products.length} items found</p>
            </div>

            {loading ? (
              <div className="home-page__loading">Loading products...</div>
            ) : (
              <ProductGrid products={products} />
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default HomePage;