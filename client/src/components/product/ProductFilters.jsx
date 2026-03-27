import "./ProductFilters.css";

function ProductFilters({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <aside className="filters">
      <h3 className="filters__title">Filters</h3>
      <div className="filters__section">
        <p className="filters__label">Category</p>

        <button
          className={`filters__chip ${selectedCategory === "" ? "active" : ""}`}
          onClick={() => setSelectedCategory("")}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            className={`filters__chip ${selectedCategory === category.name ? "active" : ""}`}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default ProductFilters;