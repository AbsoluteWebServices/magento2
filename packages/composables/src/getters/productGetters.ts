import {
  AgnosticAttribute,
  AgnosticBreadcrumb,
  AgnosticMediaGalleryItem,
  AgnosticPrice,
  ProductGetters as ProductGettersBase,
} from '@absolute-web/vsf-core';
import {
  BundleProduct,
  CategoryTree as Category, GroupedProduct,
  Product,
  FocusProductInventoryItem,
  MediaGalleryInterface,
  FocusCatalogRulePriceData,
} from '@absolute-web/magento-api';

import categoryGetters from './categoryGetters';
import { htmlDecode } from '../helpers/htmlDecoder';
import reviewGetters from './reviewGetters';

type ProductVariantFilters = any;

export const getName = (product: Product): string => {
  if (!product) {
    return '';
  }

  return htmlDecode(product.name);
};

export const getSlug = (product: Product, category?: Category): string => {
  const rewrites = product.url_rewrites;
  let url = `/${product.sku}`;
  if (!rewrites || rewrites.length === 0) {
    return url;
  }

  url = `/${rewrites[0].url}`;
  if (category && category.id) {
    // eslint-disable-next-line no-restricted-syntax
    for (const rewrite of rewrites) {
      if (rewrite.parameters.some((param) => param.name === 'category' && param.value === String(category.id))) {
        url = `/${rewrite.url}`;
        break;
      }
    }
  }

  return url;
};

export const getPrice = (product: Product): AgnosticPrice => {
  let regular = 0;
  let special = null;

  if (product?.price_range) {
    regular = product.price_range.minimum_price.regular_price.value;
    const final = product.price_range.minimum_price.final_price.value;

    if (final < regular) {
      special = final;
    }
  }

  return {
    regular,
    special,
  };
};

export const getMediaGallery = (product: Product): MediaGalleryInterface[] => {
  if (!product?.media_gallery && !product?.configurable_product_options_selection?.media_gallery) {
    return [];
  }

  const selectedGallery = product.configurable_product_options_selection?.media_gallery
    ? [...product.configurable_product_options_selection.media_gallery]
    : [...product.media_gallery];

  selectedGallery.sort((a, b) => a.position - b.position);

  return selectedGallery;
};

export const getGallery = (product: Product): AgnosticMediaGalleryItem[] => getMediaGallery(product).map(galleryItem => ({
  small: galleryItem.url,
  normal: galleryItem.url,
  big: galleryItem.url,
}));

export const getCoverImage = (product: Product): string => {
  if (!product || !product.image) {
    return null;
  }

  return product.image.url;
};

export const getProductSmallImage = (product: Product): string => {
  if (!product || !product.small_image) {
    return null;
  }

  return product.small_image.url;
};

export const getProductThumbnailImage = (product: Product): string => {
  if (!product || !product.thumbnail) {
    return null;
  }

  return product.thumbnail.url;
};

export const getFiltered = (products: Product[], filters: ProductVariantFilters | any = {}): Product[] => {
  if (!products) {
    return [];
  }

  return products;
};

export const getFilteredWithInventory = (products: Product[],
  _filters: ProductVariantFilters | any = {},
  inventory: readonly FocusProductInventoryItem[]): Product[] => {
  let results = getFiltered(products, _filters);

  if (inventory && inventory.length > 0) {
    results = results.map((product) => ({
      ...product,
      inventory: inventory.find(({ sku }) => sku === product.sku),
    }));
  }

  return results;
};

export const getAttributes = (
  products: Product,
  _filterByAttributeName?: string[],
): Record<string, AgnosticAttribute | string> => {
  if (!products || !products?.configurable_options) {
    return {};
  }

  const attributes = {};
  const configurableOptions = products.configurable_options;

  // eslint-disable-next-line no-restricted-syntax
  for (const option of configurableOptions) {
    attributes[option.attribute_code] = {
      name: option.attribute_code,
      label: option.label,
      value: option.values.map((value) => {
        const obj = {};
        obj[value.value_index] = value.label;
        return obj;
      }),
    } as AgnosticAttribute;
  }
  return attributes;
};

export const getDescription = (product: Product): string => {
  if (!product || !product?.description) {
    return '';
  }

  return product.description.html;
};

export const getShortDescription = (product: Product): string => {
  if (!product || !product.short_description) {
    return '';
  }
  return product.short_description.html;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCategoryIds = (product: Product): string[] => {
  const categoryIds = [];

  if (!product?.categories) {
    return categoryIds;
  }

  return product.categories.map((category) => category.uid);
};

export const getCategory = (product: any, currentUrlPath: string): Category | null => {
  if (!product?.categories || product?.categories.length === 0) {
    return null;
  }

  const categories = currentUrlPath.split('/');
  categories.pop();

  if (categories.length === 0) {
    return null;
  }

  const categoryPath = categories.join('/');

  // eslint-disable-next-line no-restricted-syntax
  for (const category of product.categories) {
    if (`/${category.url_path}` === categoryPath) {
      return category;
    }
  }

  return null;
};

export const getId = (product: Product): string => (product?.uid ? product?.uid : '');

export const getProductSku = (product: Product): string => product.sku;

// @ts-ignore
// eslint-disable-next-line no-underscore-dangle
export const getTypeId = (product: Product): string => product.__typename;

export const getFormattedPrice = (price: number) => {
  if (price === null) {
    return null;
  }

  // TODO get correct data from api
  const locale = 'en';
  const country = 'en';
  const currency = 'USD';

  return new Intl.NumberFormat(`${locale}-${country}`, {
    style: 'currency',
    currency,
  }).format(price);
};

export const getBreadcrumbs = (product: any, category?: Category): AgnosticBreadcrumb[] => {
  let breadcrumbs = [];

  if (!product) {
    return breadcrumbs;
  }

  if (category) {
    breadcrumbs = categoryGetters.getBreadcrumbs(category) as AgnosticBreadcrumb[];
  }

  breadcrumbs.push({
    text: getName(product),
    route: {
      path: getSlug(product, category),
    },
  });

  return breadcrumbs;
};

export const { getTotalReviews } = reviewGetters;

export const { getAverageRating } = reviewGetters;

export const getProductRelatedProduct = (product: any): Product[] => product?.related_products || [];

export const getProductUpsellProduct = (product: any): Product[] => product?.upsell_products || [];

export const getSwatchData = (swatchData: Product['configurable_options'][0]['values'][0]['swatch_data']): string | undefined => swatchData?.value;

const sortProduct = (a, b) => a.position - b.position;

// eslint-disable-next-line no-underscore-dangle
export const getGroupedProducts = (product: GroupedProduct & { __typename: string }): GroupedProduct['items'] | undefined => product.__typename === 'GroupedProduct' && product?.items?.sort(sortProduct);

// eslint-disable-next-line no-underscore-dangle
export const getBundleProducts = (product: BundleProduct & { __typename: string }): BundleProduct['items'] | undefined => product.__typename === 'BundleProduct' && product?.items?.sort(sortProduct);

export const getCatalogPriceRules = (product: Product): FocusCatalogRulePriceData[] => {
  if (!product?.price_range) {
    return [];
  }

  return product.price_range.minimum_price.focus_catalog_rules || [];
};

export interface ProductGetters extends ProductGettersBase<Product, ProductVariantFilters>{
  getBreadcrumbs(product: Product, category?: Category): AgnosticBreadcrumb[];
  getCategory(product: Product, currentUrlPath: string): Category | null;
  getFilteredWithInventory(products: Product[], _filters: ProductVariantFilters | any, inventory: readonly FocusProductInventoryItem[]): Product[];
  getProductRelatedProduct(product: Product): Product[];
  getProductSku(product: Product): string;
  getProductSmallImage(product: Product): string;
  getProductThumbnailImage(product: Product): string;
  getProductUpsellProduct(product: Product): Product[];
  getShortDescription(product: Product): string;
  getSlug(product: Product, category?: Category): string;
  getTypeId(product: Product): string;
  getSwatchData(swatchData: Product['configurable_options'][0]['values'][0]['swatch_data']): string | undefined;
  getGroupedProducts(product: GroupedProduct): GroupedProduct['items'] | undefined;
  getBundleProducts(product: BundleProduct): BundleProduct['items'] | undefined;
  getMediaGallery(product: Product): MediaGalleryInterface[];
  getCatalogPriceRules(product: Product): FocusCatalogRulePriceData[];
}

const productGetters: ProductGetters = {
  getAttributes,
  getAverageRating,
  getBreadcrumbs,
  getCategory,
  getCategoryIds,
  getCoverImage,
  getDescription,
  getFiltered,
  getFilteredWithInventory,
  getFormattedPrice,
  getGallery,
  getId,
  getName,
  getPrice,
  getProductRelatedProduct,
  getProductSku,
  getProductSmallImage,
  getProductThumbnailImage,
  getProductUpsellProduct,
  getShortDescription,
  getSlug,
  getTotalReviews,
  getTypeId,
  getSwatchData,
  getGroupedProducts,
  getBundleProducts,
  getMediaGallery,
  getCatalogPriceRules,
};

export default productGetters;
