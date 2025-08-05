export const formatPrice = (price: number) => {
  if (price <= 0) {
    return 0;
  }
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
