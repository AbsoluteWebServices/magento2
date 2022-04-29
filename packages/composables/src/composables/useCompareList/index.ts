/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/require-await */
/* istanbul ignore file */
import {
  Context,
} from '@absolute-web/vsf-core';
import {
  CompareList,
  Product,
} from '@absolute-web/magento-api';
import { useCompareListFactory, UseCompareListFactoryParams } from '../../factories/useCompareListFactory';

const compareProduct = (
  productA,
  productB,
): boolean => {
  const equalSku = productA?.sku === productB?.sku;
  const equalUid = productA?.uid === productB?.uid || Number(productA?.id) === Number(productB?.id);

  return equalSku && equalUid;
};

const findItemOnCompareList = (compareList, product) => compareList
  ?.items?.find((item) => compareProduct(item.product, product));

const getProductId = (product: Product) => {
  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  switch (product.__typename) {
    case 'BundleProduct':
    case 'SimpleProduct':
      return String(product.id);
    case 'ConfigurableProduct':
      return String(product.configurable_product_options_selection.variant.id);
    default:
      // todo implement other options
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      throw new Error(`Product Type ${product.__typename} not supported in add to compareList yet`);
  }
};

const factoryParams: UseCompareListFactoryParams<CompareList, Product> = {
  load: async (context: Context, params) => {
    const {
      customQuery,
      signal,
      uid
    } = params;
    const { data } = await context.$magento.api.compareList(uid, customQuery, signal);

    return data.compareList;
  },
  loadCustomerCompareList: async (context: Context, params) => {
    if (!context.$magento.config.state.getCustomerToken()) {
      throw new Error('Need to be authenticated to load customer compare list');
    }

    const {
      customQuery,
      signal
    } = params;

    const { data } = await context.$magento.api.customerCompareList(undefined, customQuery, signal);

    return data.customer.compare_list;
  },
  create: async (context: Context, params) => {
    const {
      customQuery,
      signal,
      products
    } = params;
    const { data } = await context.$magento.api.createCompareList({
      products: products.map((product) => getProductId(product)),
    }, customQuery, signal);

    return data.createCompareList;
  },
  clear: async (context: Context, params) => {
    const {
      customQuery,
      signal,
      currentCompareList
    } = params;

    if (!currentCompareList?.uid) {
      return false;
    }

    const { data } = await context.$magento.api.deleteCompareList(currentCompareList.uid, customQuery, signal);

    return data.deleteCompareList.result;
  },
  assignToCustomer: async (context: Context, params) => {
    if (!context.$magento.config.state.getCustomerToken()) {
      throw new Error('Need to be authenticated to assign compare list to customer');
    }

    const {
      customQuery,
      signal,
      currentCompareList
    } = params;

    if (!currentCompareList?.uid) {
      return null;
    }

    const { data } = await context.$magento.api.assignCompareListToCustomer(currentCompareList.uid, customQuery, signal);

    return data.assignCompareListToCustomer.compare_list;
  },
  addItems: async (context, params) => {
    const { products, currentCompareList, customQuery, signal } = params;

    if (products.length === 0) {
      return null;
    }

    if (!currentCompareList?.uid) {
      return factoryParams.create(context, { products, customQuery, signal });
    }

    const itemsToAdd = [];
    const itemsToRemove = [];

    products.forEach((product) => {
      const itemOnCompareList = findItemOnCompareList(currentCompareList, product);

      if (itemOnCompareList) {
        itemsToRemove.push(product);
      } else {
        itemsToAdd.push(product);
      }
    });

    const { data } = await context.$magento.api.addProductsToCompareList({
      uid: currentCompareList.uid,
      products: itemsToAdd.map((product) => getProductId(product)),
    }, customQuery, signal);

    if (itemsToRemove.length > 0) {
      return factoryParams.removeItems(context, { currentCompareList: data.addProductsToCompareList, products: itemsToRemove, customQuery, signal });
    }

    return data.addProductsToCompareList;
  },
  removeItems: async (context, params) => {
    const { products, currentCompareList, customQuery, signal } = params;

    if (!currentCompareList?.uid || products.length === 0) {
      return null;
    }

    const itemsToRemove = [];

    products.forEach((product) => {
      const itemOnCompareList = findItemOnCompareList(currentCompareList, product);

      if (itemOnCompareList) {
        itemsToRemove.push(product);
      }
    });

    if (itemsToRemove.length === 0) {
      return currentCompareList;
    }

    const { data } = await context.$magento.api.removeProductsFromCompareList({
      uid: currentCompareList.uid,
      products: itemsToRemove.map((element) => getProductId(element)),
    }, customQuery, signal);

    return data.removeProductsFromCompareList;
  },
  isInCompareList: (context, params) => {
    const {
      currentCompareList,
      product,
    } = params;
    return !!findItemOnCompareList(currentCompareList, product);
  },
};

export default useCompareListFactory<CompareList, Product>(factoryParams);
