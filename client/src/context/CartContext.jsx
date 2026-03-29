import { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );
    const deliveryCharge = subtotal > 500 ? 0 : cartItems.length ? 40 : 0;
    const total = subtotal + deliveryCharge;

    return { subtotal, deliveryCharge, total };
  }, [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      setCartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totals,
    }),
    [cartItems, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;