export const PRODUCTS = "v1/products";
export const PRODUCT_ADMIN_APPROVE = PRODUCTS + "/admin-confirm";
export const PRODUCT_DETAILS = PRODUCTS + "/:productId";
export const PRODUCT_TREND_MOST_VIEWED = PRODUCTS + "/most-viewed";
export const PRODUCT_TREND_MOST_RATED = PRODUCTS + "/most-rated";

export default {
  PRODUCTS,
  PRODUCT_DETAILS,
  PRODUCT_ADMIN_APPROVE,
  PRODUCT_TREND_MOST_VIEWED,
  PRODUCT_TREND_MOST_RATED,
};
