/* istanbul ignore file */
import {
  AgnosticTotals,
} from '@vue-storefront/core';
import {
  CompareList,
  ComparableItem,
  ComparableAttribute,
  ProductAttribute,
  Product,
} from '@vue-storefront/magento-api';
import productGetters from './productGetters';

export const getItems = (compareList: CompareList): ComparableItem[] => compareList?.items || [];

export const getProducts = (compareList: CompareList): Product[] => getItems(compareList).map(({ product }) => product as Product);

export const getTotals = (compareList: CompareList): AgnosticTotals => {
  return getItems(compareList).reduce((acc, curr) => ({
    total: acc.total + productGetters.getPrice(curr.product as Product).special,
    subtotal: acc.subtotal + productGetters.getPrice(curr.product as Product).regular,
  }), ({ total: 0, subtotal: 0 }));
};

export const getTotalItems = (compareList: CompareList): number => compareList?.item_count || 0;

export const getComparebleAttributes = (compareList: CompareList): ComparableAttribute[] => compareList?.attributes || [];

export const getItemCompareAttribute = (item: ComparableItem, attribute: ComparableAttribute): ProductAttribute => item.attributes.find(({ code }) => code === attribute.code);

export interface CompareListGetters {
  getItems(compareList: CompareList): ComparableItem[];
  getProducts(compareList: CompareList): Product[];
  getTotalItems(compareList: CompareList): number;
  getTotals(compareList: CompareList): AgnosticTotals;
  getComparebleAttributes(compareList: CompareList): ComparableAttribute[];
  getItemCompareAttribute(item: ComparableItem, attribute: ComparableAttribute): ProductAttribute;
}

const compareListGetters: CompareListGetters = {
  getItems,
  getProducts,
  getTotalItems,
  getTotals,
  getComparebleAttributes,
  getItemCompareAttribute,
};

export default compareListGetters;
