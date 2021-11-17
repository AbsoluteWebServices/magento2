/* istanbul ignore file */

export const getDate = (order: any): string => new Date(order?.created_at).toLocaleDateString() || '';

export const getId = (order: any): string => String(Number.parseInt(order?.order_number, 10) || Math.floor(Math.random() * 100));

export const getUid = (order: any): string => (order?.id ? order?.id : '');

export const getStatus = (order: any): string => order?.status || 'Failed';

export const getPrice = (order: any): number | null => order?.grand_total || 0;

export const getItems = (order: any): any[] => order?.items || [];

export const getItemId = (item: any): string => (item?.id ? item?.id : '');

export const getItemSku = (item: any): string => item?.product_sku || 0;

export const getItemName = (item: any): string => item?.product_name || 0;

export const getItemQty = (item: any): number => item?.quantity_ordered || 0;

export const getItemPrice = (item: any): number => item?.product_sale_price?.value || 0;

export const getFormattedPrice = (price: number) => String(price);

const orderGetters = {
  getDate,
  getId,
  getUid,
  getStatus,
  getPrice,
  getItems,
  getItemId,
  getItemSku,
  getItemName,
  getItemQty,
  getItemPrice,
  getFormattedPrice,
};

export default orderGetters;
