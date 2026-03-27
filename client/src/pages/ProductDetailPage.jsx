import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { getProductById } from "../services/productService";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";
import { calculateDiscount } from "../utils/calculateDiscount";
import "./ProductDetailPage.css";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
        setActiveImage(response.data.images?.[0] || response.data.thumbnail);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <>
        <Navbar search={search} setSearch={setSearch} />
        <div className="detail-page__loading">Loading product...</div>
      </>
    );
  }

  const discount = calculateDiscount(product.original_price, product.price);

  const handleAddToCart = () => {
    addToCart(product);
    alert("Product added to cart!");
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />

      <div className="detail-page">
        <div className="detail-page__container">
          <div className="detail-page__left">
            <div className="detail-page__thumbs">
              {(product.images?.length ? product.images : [product.thumbnail]).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={product.name}
                  className={`detail-page__thumb ${activeImage === img ? "active" : ""}`}
                  onClick={() => setActiveImage(img)}
                />
              ))}
            </div>

            <div className="detail-page__main-image-wrap">
              <img src={activeImage} alt={product.name} className="detail-page__main-image" />
            </div>
          </div>

          <div className="detail-page__right">
            <h1>{product.name}</h1>
            <p className="detail-page__brand">Brand: {product.brand}</p>
            <p className="detail-page__rating">⭐ {product.rating}</p>

            <div className="detail-page__price-row">
              <span className="detail-page__price">{formatPrice(product.price)}</span>
              <span className="detail-page__original">{formatPrice(product.original_price)}</span>
              <span className="detail-page__discount">{discount}% off</span>
            </div>

            <p className="detail-page__stock">
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>

            <div className="detail-page__actions">
              <button className="btn btn--cart" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="btn btn--buy" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>

            <div className="detail-page__section">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="detail-page__section">
              <h3>Specifications</h3>
              <p>{product.specifications}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;