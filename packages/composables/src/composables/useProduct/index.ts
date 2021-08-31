import {
  Context,
  CustomQuery,
  ProductsSearchParams,
  UseProduct,
  useProductFactory,
  UseProductFactoryParams,
} from '@vue-storefront/core';
import { ProductsListQuery, ProductDetailsQueryFocus, RelatedProductQuery, UpsellProductsQuery, GetProductSearchParams, ProductsQueryType, Product, Aggregation } from '@vue-storefront/magento-api';
import { Scalars } from '@vue-storefront/magento-api/lib/types/GraphQL';

const pdpDataBlacklist = ['media_gallery', 'description', 'short_description', 'image', 'small_image', 'thumbnail'];

const extractPdpData = (productDetails: Product) => {
  let productData = {};

  if (productDetails.pdp_data) {
    try {
      productData = JSON.parse(productDetails.pdp_data);

      for (const key of pdpDataBlacklist) {
        productData[key] = productDetails[key];
      }
    } catch (err) {
      console.error(err);
    }
  }

  return productData;
}

const deleteEmptyFields = (productDetails: Product) => {
  for (const key in productDetails) {
    if (productDetails[key] === null) {
      delete productDetails[key];
    }
  }
}

const extractCustomAttributes = (productDetails: Product, aggregations: Aggregation[]) => {
  const result = {};

  for (const key in productDetails) {
    if (productDetails[key] === null) {
      continue;
    }

    const productAttribute = aggregations.find(
      (attribute) => attribute.attribute_code === key
    );

    if (!productAttribute) continue;

    const attributeOption = Object.prototype.hasOwnProperty.call(
      productAttribute,
      'options'
    )
      ? productAttribute.options.find(
          (option) =>
            Number.parseInt(option.value, 10) === productDetails[key] ||
            option.label === productDetails[key]
        )
      : null;

    if (
      attributeOption &&
      Object.prototype.hasOwnProperty.call(attributeOption, 'label')
    ) {
      result[key] = {
        code: productAttribute.attribute_code,
        label: productAttribute.label || '',
        value: attributeOption.value,
        valueLabel: attributeOption.label,
      };
    }
  }

  return result;
}

const factoryParams: UseProductFactoryParams<ProductsListQuery['products'], ProductsSearchParams> = {
  productsSearch: async (context: Context, params: GetProductSearchParams & { queryType: ProductsQueryType; customQuery?: CustomQuery; configurations?: Scalars['ID'] }) => {
    const {
      queryType,
      customQuery,
      ...searchParams
    } = params;

    switch (queryType) {
      case ProductsQueryType.Detail:
        const queryPromises = [];

        queryPromises.push(
          context
            .$magento
            .api
            .productDetail(searchParams as GetProductSearchParams, (customQuery || {})),
        );

        if (searchParams.configurations) {
          queryPromises.push(
            context
              .$magento
              .api
              .configurableProductDetail(searchParams as GetProductSearchParams, (customQuery || {})),
          );
        }

        const result = await Promise.all(queryPromises);

        const [
          productDetailsResults,
          configurableProduct,
        ] = result;

        if (!productDetailsResults.data.products.items.length) {
          return productDetailsResults.data.products;
        }

        if (configurableProduct) {
          productDetailsResults.data.products.items[0] = {
            ...productDetailsResults.data.products.items[0],
            ...configurableProduct.data.products.items[0],
          };

          // Because `variant` is of type `SimpleProduct` it's possible to overwrite master product with it's values
          // https://devdocs.magento.com/guides/v2.4/graphql/interfaces/configurable-product.html#ConfigurableProductOptionsSelection
          if (configurableProduct.data.products.items[0]?.configurable_product_options_selection?.variant) {
            productDetailsResults.data.products.items[0] = {
              ...productDetailsResults.data.products.items[0],
              ...configurableProduct.data.products.items[0].configurable_product_options_selection.variant,
            };
          }
        }

        // eslint-disable-next-line no-underscore-dangle
        if (productDetailsResults.data.products.items[0].__typename === 'GroupedProduct') {
          // ToDo: check if it's possible to do request in parallel also for GroupedProduct
          const groupedProduct = await context
            .$magento
            .api
            .groupedProductDetail(searchParams as GetProductSearchParams, (customQuery || {}));

          productDetailsResults.data.products.items[0] = {
            ...productDetailsResults.data.products.items[0],
            ...groupedProduct.data.products.items[0],
          };
        }

        // eslint-disable-next-line no-underscore-dangle
        if (productDetailsResults.data.products.items[0].__typename === 'BundleProduct') {
          const bundledProduct = await context
            .$magento
            .api
            .bundleProductDetail(searchParams as GetProductSearchParams, (customQuery || {}));

          productDetailsResults.data.products.items[0] = {
            ...productDetailsResults.data.products.items[0],
            ...bundledProduct.data.products.items[0],
          };
        }

        let productDetails = {
          ...productDetailsResults.data.products.items[0],
          ...extractPdpData(productDetailsResults.data.products.items[0]),
          pdp_data: null,
        };

        productDetails = {
          ...productDetails,
          ...extractCustomAttributes(productDetails, productDetailsResults.data.products.aggregations),
        };

        deleteEmptyFields(productDetails);

        return { items: [productDetails] };

      case ProductsQueryType.Upsell:
        const upsellProduct = await context.$magento.api.upsellProduct(
          searchParams as GetProductSearchParams
        );
        return upsellProduct.data.products;

      case ProductsQueryType.Related:
        const relatedProduct = await context.$magento.api.relatedProduct(
          searchParams as GetProductSearchParams
        );
        return relatedProduct.data.products;

      case ProductsQueryType.List:
      default:
        const productListResults = await context
          .$magento
          .api
          .products(searchParams as GetProductSearchParams, (customQuery || {}));
        return productListResults.data.products;
    }
  },
};

const useProduct: (cacheId?: string) => UseProduct<ProductsListQuery['products'] | ProductDetailsQueryFocus['products'] | RelatedProductQuery['products'] | UpsellProductsQuery['products'], ProductsSearchParams> = useProductFactory<ProductsListQuery['products'], ProductsSearchParams>(factoryParams);

export default useProduct;
