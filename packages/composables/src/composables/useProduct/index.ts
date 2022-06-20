import {
  ComposableFunctionArgs,
  Context,
  Logger,
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

const pdpDataBlacklist = new Set(['media_gallery', 'description', 'short_description', 'image', 'small_image', 'thumbnail', 'kit_components']);

const extractPdpData = (productDetails: Product) => {
  let productData = {} as any;

  if (productDetails.pdp_data) {
    try {
      productData = JSON.parse(productDetails.pdp_data);

      Object.keys(productData).forEach((key) => {
        if (pdpDataBlacklist.has(key)) {
          delete productData[key];
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  return productData;
};

const deleteEmptyFields = (productDetails: Product) => {
  const result = {};

  Object.keys(productDetails).forEach((key) => {
    if (typeof productDetails[key] !== 'undefined' && productDetails[key] !== null) {
      result[key] = productDetails[key];
    }
  });

  return result as Product;
};

const getProductDetails = (details: Product[], aggregations: Aggregation[]): Products => {
  const productDetails = [];

  details.forEach((product: Product) => {
    const pdpData = extractPdpData(product);

    product = {
      ...product,
      ...pdpData,
      ...Object.keys(product)
        .filter((item) => product[item] && pdpData[item] && product[item] != pdpData[item])
        .reduce(
          (previous, current) => ({
            ...previous,
            [current]: {
              value: product[current],
              valueLabel: pdpData[current],
            }
          }),
          {}
        ),
      pdp_data: undefined,
    };

    product = deleteEmptyFields(product);

    productDetails.push(product);
  })

  return { items: productDetails } as Products;
};

const factoryParams: UseProductFactoryParams<Products,
ProductsSearchParams> = {
  provide() {
    return {
      cache: useCache(),
    };
  },
  productsSearch: async (context: Context, params: ComposableFunctionArgs<GetProductSearchParams & {
    queryType: ProductsQueryType;
    configurations?: Scalars['ID'];
    preview?: StagingPreviewParams;
    isDetailList?: Scalars['Boolean'];
  }>) => {
    Logger.debug('[Magento]: Load product based on ', { params });

    const {
      queryType,
      preview,
      isDetailList,
      customQuery,
      signal,
      ...searchParams
    } = {
      ...params,
    };

    switch (queryType) {
      case ProductsQueryType.Detail:
        const productDetailsResults = await context
          .$magento
          .getApi
          .productDetail({
            ...searchParams,
            preview,
          }, customQuery, signal);

        if (productDetailsResults?.data?.cacheTags) {
          context.cache.addTagsFromString(productDetailsResults.data.cacheTags);
        }

        Logger.debug('[Result]:', { data: productDetailsResults });

        if (productDetailsResults.data.products.items.length === 0) {
          return productDetailsResults.data.products as unknown as Products;
        }

        const productDetails = (isDetailList
          ? productDetailsResults.data.products.items
          : [productDetailsResults.data.products.items[0]]) as unknown as Product[];
        const aggregations = productDetailsResults.data.products.aggregations as unknown as Aggregation[];

        return getProductDetails(productDetails, aggregations);

      case ProductsQueryType.List:
      default:
        const productListResults = await context
          .$magento
          .getApi
          .products(searchParams as GetProductSearchParams, customQuery, signal);

        if (productListResults?.data?.cacheTags) {
          context.cache.addTagsFromString(productListResults.data.cacheTags);
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
