export const formatPrice = (price: number | string): string => {
  if (!price && price !== 0) return "0";
  const numericPrice = Number(price);
  return numericPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
