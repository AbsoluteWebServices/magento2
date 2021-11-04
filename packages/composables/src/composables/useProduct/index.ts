import {
  Context,
  CustomQuery, Logger,
  ProductsSearchParams,
  UseProduct,
  useProductFactory,
  UseProductFactoryParams,
} from '@absolute-web/vsf-core';
import {
  GetProductSearchParams, ProductsQueryType, Product, Products, Aggregation, StagingPreviewParams,
} from '@absolute-web/magento-api';
import { Scalars } from '@absolute-web/magento-api/lib/types/GraphQL';
import { useCache } from '@absolute-web/vsf-cache';

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
};

const deleteEmptyFields = (productDetails: Product) => {
  for (const key in productDetails) {
    if (productDetails[key] === null) {
      delete productDetails[key];
    }
  }
};

const extractCustomAttributes = (productDetails: Product, aggregations: Aggregation[]) => {
  const result = {};

  for (const aggregation of aggregations) {
    if (
      !Object.prototype.hasOwnProperty.call(productDetails, aggregation.attribute_code)
      || productDetails[aggregation.attribute_code] === null
      || !Object.prototype.hasOwnProperty.call(aggregation, 'options')
      || aggregation.options.length === 0) {
      continue;
    }

    const key = aggregation.attribute_code;

    const attributeOption = aggregation.options.find(
      (option) => Number.parseInt(option.value, 10) === productDetails[key]
        || option.label === productDetails[key],
    );

    if (
      attributeOption
      && Object.prototype.hasOwnProperty.call(attributeOption, 'label')
    ) {
      result[key] = {
        code: key,
        label: aggregation.label || '',
        value: attributeOption.value,
        valueLabel: attributeOption.label,
      };
    }
  }

  return result;
};

const factoryParams: UseProductFactoryParams<Products,
ProductsSearchParams> = {
  provide() {
    return {
      cache: useCache(),
    };
  },
  productsSearch: async (context: Context, params: GetProductSearchParams & {
    queryType: ProductsQueryType;
    customQuery?: CustomQuery;
    configurations?: Scalars['ID'];
    preview?: StagingPreviewParams;
  }) => {
    Logger.debug('[Magento]: Load product based on ', { params });

    const {
      queryType,
      customQuery,
      preview,
      ...searchParams
    } = params;

    switch (queryType) {
      case ProductsQueryType.Detail:

        const productDetailsResults = await context
          .$magento
          .getApi
          .productDetail(searchParams as GetProductSearchParams, (customQuery || {}), preview);

        if (productDetailsResults.data.cacheTags) {
          context.cache.addTags(productDetailsResults.data.cacheTags);
        }

        Logger.debug('[Result]:', { data: productDetailsResults });

        if (productDetailsResults.data.products.items.length === 0) {
          return productDetailsResults.data.products as unknown as Products;
        }

        let productDetails = productDetailsResults.data.products.items[0] as unknown as Product;
        const aggregations = productDetailsResults.data.products.aggregations as unknown as Aggregation[];

        productDetails = {
          ...productDetails,
          ...extractPdpData(productDetails),
          pdp_data: null,
        };

        productDetails = {
          ...productDetails,
          ...extractCustomAttributes(productDetails, aggregations),
        };

        deleteEmptyFields(productDetails);

        return { items: [productDetails], aggregations } as Products;

      case ProductsQueryType.Upsell:
        const upsellProductResults = await context
          .$magento
          .getApi
          .relatedProduct(searchParams as GetProductSearchParams, (customQuery || {}));

        Logger.debug('[Result]:', { data: upsellProductResults });

        return upsellProductResults.data.products as unknown as Products;

      case ProductsQueryType.Related:
        const relatedProductResults = await context
          .$magento
          .getApi
          .relatedProduct(searchParams as GetProductSearchParams, (customQuery || {}));

        Logger.debug('[Result]:', { data: relatedProductResults });

        return relatedProductResults.data.products as unknown as Products;

      case ProductsQueryType.List:
      default:
        const productListResults = await context
          .$magento
          .getApi
          .products(searchParams as GetProductSearchParams, (customQuery || {}));

        productListResults.data.products.items = productListResults.data.products.items.map((product) => ({
          ...product,
          ...extractCustomAttributes(product as unknown as Product, productListResults.data.products.aggregations as unknown as Aggregation[]),
        }));

        if (productListResults.data.cacheTags) {
          context.cache.addTags(productListResults.data.cacheTags);
        }

        Logger.debug('[Result]:', { data: productListResults });

        return productListResults.data.products as unknown as Products;
    }
  },
};

const useProduct:
(cacheId?: string) => UseProduct<Products,
ProductsSearchParams> = useProductFactory<Products,
ProductsSearchParams>(factoryParams);

export default useProduct;
