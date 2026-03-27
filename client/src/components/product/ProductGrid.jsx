import ProductCard from "./ProductCard";
import "./ProductGrid.css";

function ProductGrid({ products }) {
  if (!products.length) {
    return <div className="product-grid__empty">No products found.</div>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;