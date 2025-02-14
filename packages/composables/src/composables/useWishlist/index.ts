/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/require-await */
/* istanbul ignore file */
import {
  Context,
  Logger,
} from '@absolute-web/vsf-core';
import useUser from '../useUser';
import { findItemOnWishlist } from '../../helpers/findItemOnWishlist';
import { useWishlistFactory, UseWishlistFactoryParams } from '../../factories/useWishlistFactory';

// @ts-ignore
const factoryParams: UseWishlistFactoryParams<any, any, any> = {
  provide() {
    return {
      user: useUser(),
    };
  },
  // @ts-ignore
  load: async (context: Context, params) => {
    Logger.debug('[Magento Storefront]: useWishlist.load params->', params);
    const apiState = context.$magento.config.state;

    const {
      customQuery,
      signal,
      searchParams
    } = params;

    if (apiState.getCustomerToken()) {
      const { data } = await context.$magento.api.wishlist(searchParams, customQuery, signal);

      Logger.debug('[Result]:', { data });

      return data.customer.wishlists;
    }

    return null;
  },
  addItem: async (context, params) => {
    const {
      currentWishlist,
      product,
      customQuery,
      signal
    } = params;
    Logger.debug('[Magento Storefront]: useWishlist.addItem params->', params);
    if (!currentWishlist) await factoryParams.load(context, { customQuery, signal });

    const itemOnWishlist = findItemOnWishlist(currentWishlist, product);

    if (itemOnWishlist) {
      return factoryParams.removeItem(context, {
        product,
        currentWishlist,
        customQuery,
        signal
      });
    }

    if (!context.user.isAuthenticated.value) {
      throw new Error('Need to be authenticated to add a product to wishlist');
    }
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    switch (product.__typename) {
      case 'VirtualProduct':
      case 'DownloadableProduct':
      case 'GroupedProduct':
      case 'GiftCard':
      case 'SimpleProduct':
        const { data } = await context.$magento.api.addProductToWishList({
          id: '0',
          items: [{
            sku: product.sku,
            quantity: 1,
          }],
        }, customQuery, signal);

        Logger.debug('[Result]:', { data });

        return data.addProductsToWishlist.wishlist;
      case 'ConfigurableProduct':
        const { data: configurableProductData } = await context.$magento.api.addProductToWishList({
          id: '0',
          items: [{
            sku: product.configurable_product_options_selection?.variant?.sku || product.sku,
            quantity: 1,
            parent_sku: product.sku,
          }],
        }, customQuery, signal);

        Logger.debug('[Result]:', { data: configurableProductData });

        return configurableProductData.addProductsToWishlist.wishlist;
      case 'BundleProduct':
        const { data: bundleProductData } = await context.$magento.api.addProductToWishList({
          id: '0',
          items: [{
            sku: product.sku,
            quantity: 1,
            entered_options: product.bundle_options ? [...product.bundle_options] : [],
          }],
        }, customQuery, signal);

        Logger.debug('[Result]:', { data: bundleProductData });

        return bundleProductData.addProductsToWishlist.wishlist;
      default:
        // todo implement other options
        // @ts-ignore
        // eslint-disable-next-line no-underscore-dangle
        throw new Error(`Product Type ${product.__typename} not supported in add to wishlist yet`);
    }
  },
  removeItem: async (context, params) => {
    const {
      product,
      currentWishlist,
      customQuery,
      signal
    } = params;
    Logger.debug('[Magento Storefront]: useWishlist.removeItem params->', params);
    const itemOnWishlist = findItemOnWishlist(currentWishlist, product);

    const { data } = await context.$magento.api.removeProductsFromWishlist({
      id: '0',
      items: [itemOnWishlist.id],
    }, customQuery, signal);

    Logger.debug('[Result]:', { data });

    return data.removeProductsFromWishlist.wishlist;
  },
  clear: async ({ currentWishlist }) => (null),
  isInWishlist: (context, params) => {
    const {
      currentWishlist,
      product,
    } = params;
    const wishlistProduct = findItemOnWishlist(currentWishlist, product);
    return !!(wishlistProduct?.id && wishlistProduct?.quantity);
  },
};

export default useWishlistFactory<any, any, any>(factoryParams);
