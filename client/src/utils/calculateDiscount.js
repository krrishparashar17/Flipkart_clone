export const calculateDiscount = (originalPrice, price) => {
  if (!originalPrice || Number(originalPrice) <= Number(price)) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};  