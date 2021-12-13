/* istanbul ignore file */
import {
  WishlistGetters as BaseWishlistGetters,
  AgnosticPrice,
  AgnosticTotals, AgnosticPagination,
} from '@absolute-web/vsf-core';
import {
  Product, Wishlist,
} from '@absolute-web/magento-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItems = (wishlist): Product[] => wishlist.items_v2.items;

export const getItemName = (product: Product): string => product?.product?.name || '';

export const getItemImage = (product: Product): string => product?.product?.thumbnail.url || '';

export const getItemPrice = (product: Product): AgnosticPrice => {
  let regular = 0;
  let special = null;

  if (product?.product?.price_range) {
    regular = product?.product?.price_range.minimum_price.regular_price.value;
    const final = product?.product?.price_range.minimum_price.final_price.value;

    if (final < regular) {
      special = final;
    }
  }

  return {
    regular,
    special,
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemQty = (product: Product): number => product.quantity;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemAttributes = (product: Product, filterByAttributeName?: string[]) => ({ '': '' });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemSku = (product: Product): string => product?.product?.sku || '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getTotals = (wishlist: Wishlist): AgnosticTotals => {
  if (Array.isArray(wishlist)) {
    return wishlist[0]?.items_v2?.items.reduce((acc, curr) => ({
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      total: acc.total + getItemPrice(curr as unknown as Product).special,
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      subtotal: acc.subtotal + getItemPrice(curr as unknown as Product).regular,
    }), ({ total: 0, subtotal: 0 }));
  }
  return wishlist?.items_v2?.items.reduce((acc, curr) => ({
    total: acc.total + getItemPrice(curr as unknown as Product).special,
    subtotal: acc.subtotal + getItemPrice(curr as unknown as Product).regular,
  }), ({ total: 0, subtotal: 0 }));
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingPrice = (wishlist: Wishlist): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getTotalItems = (wishlist: Wishlist): number => (Array.isArray(wishlist) ? wishlist[0]?.items_count : (wishlist?.items_count || 0));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getFormattedPrice = (price: number): string => '';

const getPagination = (wishlistData: Wishlist): AgnosticPagination => ({
  currentPage: wishlistData?.items_v2?.page_info?.current_page || 1,
  totalPages: wishlistData?.items_v2?.page_info?.total_pages || 1,
  totalItems: wishlistData?.items_count || 0,
  itemsPerPage: wishlistData?.items_v2?.page_info?.page_size || 20,
  pageOptions: [10, 50, 100],
});

const getProducts = (wishlistData: Wishlist[] | Wishlist): {
  product: Product;
  quantity: number;
  added_at: string;
}[] => {
  if (!wishlistData || (Array.isArray(wishlistData) && wishlistData.length === 0)) {
    return [];
  }

  const reducer = (acc, curr) => [...acc, ...curr.items_v2.items.map((item) => ({
    product: item.product,
    quantity: item.quantity,
    added_at: item.added_at,
    id: item.id,
  }))];

  const mapper = (item) => ({
    product: item.product,
    quantity: item.quantity,
    added_at: item.added_at,
    id: item.id,
  });

  return Array.isArray(wishlistData)
    ? wishlistData.reduce((acc, curr) => reducer(acc, curr), [])
    : wishlistData?.items_v2?.items.map((e) => mapper(e));
};

export interface WishlistGetters extends BaseWishlistGetters<Wishlist, Product> {
  getShippingPrice(wishlist: Wishlist): number;

  getItemQty(product: Product): number;

  getPagination(wishlistData): AgnosticPagination;

  getProducts(wishlistData): {
    product: Product;
    quantity: number;
    added_at: string;
  }[];
}

const wishlistGetters: WishlistGetters = {
  getTotals,
  getShippingPrice,
  getItems,
  getItemName,
  getItemImage,
  getItemPrice,
  getItemQty,
  getItemAttributes,
  getItemSku,
  getTotalItems,
  getFormattedPrice,
  getPagination,
  getProducts,
};

export default wishlistGetters;
