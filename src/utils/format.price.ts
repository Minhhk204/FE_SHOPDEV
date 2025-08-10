export const formatPrice = (price: number) => {
  if (price <= 0) {
    return 0;
  }
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
export const getTotalStock = (product: any) => {
  if (!product?.product_sizes) return product.stock || 0;
  return product.product_sizes.reduce(
    (total: number, size: any) => total + size.stock,
    0
  );
};