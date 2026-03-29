import { useEffect, useState } from "react";
import { getAllProducts, getCategories } from "../services/productService";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts(selectedCategory);
      setProducts(data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const filteredProducts = products.filter((product) =>
    `${product.name || ""} ${product.brand || ""} ${product.description || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="homepage">
      <div className="container homepage-layout">
        {/* Sidebar */}
        <aside className="filters-sidebar card">
          <h2 className="filters-title">Filters</h2>

          <div className="filter-section">
            <h3 className="filter-heading">Category</h3>

            <button
              className={`category-btn ${selectedCategory === "" ? "active" : ""}`}
              onClick={() => setSelectedCategory("")}
            >
              All
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${
                  selectedCategory === String(category.id) ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(String(category.id))}
              >
                {category.name}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="products-section">
          {/* Search + Header */}
          <div className="products-header card">
            <div className="search-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="Search for products, brands and more"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="products-meta">
              <h1 className="products-title">Products for you</h1>
              <p className="products-count">{filteredProducts.length} items found</p>
            </div>
          </div>

          {/* Product Grid */}
          <div className="card products-grid-wrapper">
            {loading ? (
              <div className="empty-state">Loading products...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="empty-state">No products found.</div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;