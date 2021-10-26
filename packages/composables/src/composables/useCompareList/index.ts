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
  const equalUid = productA?.uid === productB?.uid;

  return equalSku && equalUid;
};

const findItemOnCompareList = (compareList, product) =>
compareList
    ?.items?.find((item) => compareProduct(item.product, product));
;

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
    const { data } = await context.$magento.getApi.compareList(params.uid, params.customQuery || {});

    return data.compareList;
  },
  loadCustomerCompareList: async (context: Context, params) => {
    if (!context.$magento.config.state.getCustomerToken()) {
      throw new Error('Need to be authenticated to load customer compare list');
    }

    const { data } = await context.$magento.api.customerCompareList(params.customQuery || {});

    return data.customer.compare_list;
  },
  create: async (context: Context, params) => {
    const { data } = await context.$magento.api.createCompareList({
      products: params.products.map(getProductId),
    }, params.customQuery || {});

    return data.createCompareList;
  },
  clear: async (context: Context, params) => {
    if (!params.currentCompareList?.uid) {
      return false;
    }

    const { data } = await context.$magento.api.deleteCompareList(params.currentCompareList.uid, params.customQuery || {});

    return data.deleteCompareList.result;
  },
  assignToCustomer: async (context: Context, params) => {
    if (!context.$magento.config.state.getCustomerToken()) {
      throw new Error('Need to be authenticated to assign compare list to customer');
    }

    if (!params.currentCompareList?.uid) {
      return null;
    }

    const { data } = await context.$magento.api.assignCompareListToCustomer(params.currentCompareList.uid, params.customQuery || {});

    return data.assignCompareListToCustomer.compare_list;
  },
  addItems: async (context, params) => {
    const { products, currentCompareList } = params;

    if (!products.length) {
      return null;
    }

    if (!currentCompareList?.uid) {
      return factoryParams.create(context, { products, customQuery: params.customQuery });
    }

    const itemsToAdd = [];
    const itemsToRemove = [];

    for (const product of products) {
      const itemOnCompareList = findItemOnCompareList(currentCompareList, product);

      if (itemOnCompareList) {
        itemsToRemove.push(product);
      } else {
        itemsToAdd.push(product);
      }
    }

    const { data } = await context.$magento.api.addProductsToCompareList({
      uid: currentCompareList.uid,
      products: itemsToAdd.map(getProductId),
    });

    if (itemsToRemove.length) {
      return factoryParams.removeItems(context, { currentCompareList: data.addProductsToCompareList, products: itemsToRemove });
    }

    return data.addProductsToCompareList;
  },
  removeItems: async (context, params) => {
    const { products, currentCompareList } = params;

    if (!currentCompareList?.uid || !products.length) {
      return null;
    }


    const itemsToRemove = [];

    for (const product of products) {
      const itemOnCompareList = findItemOnCompareList(currentCompareList, product);

      if (itemOnCompareList) {
        itemsToRemove.push(product);
      }
    }

    if (!itemsToRemove.length) {
      return currentCompareList;
    }

    const { data } = await context.$magento.api.removeProductsFromCompareList({
      uid: currentCompareList.uid,
      products: itemsToRemove.map(getProductId),
    });

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
